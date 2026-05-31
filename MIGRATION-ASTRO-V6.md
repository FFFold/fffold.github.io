# Astro v5 → v6 升级迁移计划

> 生成日期：2026-05-31
> 当前版本：Astro 5.18.1 → 目标版本：Astro 6.4.2
> 项目：fffold.github.io (Fuwari 博客模板)

---

## 目录

1. [升级概览](#1-升级概览)
2. [前置条件检查](#2-前置条件检查)
3. [Phase 1：依赖升级与配置更新](#3-phase-1依赖升级与配置更新)
4. [Phase 2：Content Collections 迁移到 Content Layer API](#4-phase-2content-collections-迁移到-content-layer-api)
5. [Phase 3：Tailwind CSS 集成迁移](#5-phase-3tailwind-css-集成迁移)
6. [Phase 4：Zod 4 适配](#6-phase-4zod-4-适配)
7. [Phase 5：集成与插件兼容性更新](#7-phase-5集成与插件兼容性更新)
8. [Phase 6：CI/CD 与部署配置更新](#8-phase-6cicd-与部署配置更新)
9. [验证清单](#9-验证清单)
10. [回滚方案](#10-回滚方案)
11. [附录：受影响文件清单](#11-附录受影响文件清单)

---

## 1. 升级概览

### 版本变更一览

| 包 | 当前版本 | 目标版本 | 说明 |
|---|---|---|---|
| astro | 5.18.1 | 6.x | 核心框架 |
| @astrojs/mdx | 4 | 6.x | MDX 集成 |
| @astrojs/svelte | 7.2.5 | 8.x | Svelte 集成 |
| @astrojs/tailwind | 6.0.2 | **移除** | 已废弃，改用 @tailwindcss/vite |
| @astrojs/check | 0.9.9 | 最新 | 类型检查 |
| @astrojs/rss | 4.0.18 | 最新 | RSS |
| @astrojs/sitemap | 3.7.3 | 最新 | 站点地图 |
| astro-expressive-code | 0.41.7 | 0.42.x | 代码块高亮 |
| @swup/astro | 1.7.0 | 1.8.x | 页面过渡 |
| tailwindcss | 3.x | 4.x | CSS 框架 |
| @tailwindcss/typography | 0.5.x | **移除** | v4 内置 |
| zod | (Astro 内置) | v4 | 随 Astro 6 升级 |

### Breaking Changes 影响评估

| 变更项 | 影响程度 | 说明 |
|---|---|---|
| Content Collections → Content Layer API | **高** | 需迁移配置文件、修改 render/slug 用法 |
| Tailwind v3 → v4 | **高** | 配置方式完全不同，需重写 |
| Zod 4 | **低** | 本项目 schema 简单，影响小 |
| Vite 7 | **低** | 自定义配置少 |
| Shiki 4.0 | **低** | 由 expressive-code 内部处理 |
| Node 22+ | **无** | 当前已是 v24 |

---

## 2. 前置条件检查

### 2.1 环境确认

```bash
# 确认 Node.js 版本 >= 22.12.0
node -v
# 当前：v24.12.0 ✓

# 确认 pnpm 版本
pnpm --version
# 当前：9.14.4 ✓
```

### 2.2 创建升级分支

```bash
git checkout -b feat/astro-v6-migration
```

### 2.3 备份当前状态

```bash
# 确保当前代码已提交
git add . && git commit -m "chore: snapshot before astro v6 migration"
```

---

## 3. Phase 1：依赖升级与配置更新

### 3.1 使用官方升级工具（推荐）

```bash
pnpm dlx @astrojs/upgrade
```

此命令会自动升级 `astro` 及所有 `@astrojs/*` 官方集成到兼容的最新版本。

### 3.2 手动升级第三方依赖

```bash
# 升级 astro-expressive-code 及其插件
pnpm add astro-expressive-code@latest \
  @expressive-code/core@latest \
  @expressive-code/plugin-collapsible-sections@latest \
  @expressive-code/plugin-line-numbers@latest

# 升级 swup
pnpm add @swup/astro@latest

# 升级 sharp
pnpm add sharp@latest

# 升级其他依赖
pnpm add pagefind@latest katex@latest
```

### 3.3 更新 astro.config.mjs

主要变更点：

- 移除 `@astrojs/tailwind` 集成（Phase 3 详述）
- Vite 7 兼容性检查（当前配置影响小）
- 确认 expressive-code 配置兼容性

**注意**：此阶段先不改配置内容，仅升级包版本。配置变更在后续 Phase 中进行。

---

## 4. Phase 2：Content Collections 迁移到 Content Layer API

这是**工作量最大**的改动。

### 4.1 移动配置文件

```
# 旧位置
src/content/config.ts

# 新位置
src/content.config.ts (项目根目录下的 src/ 下)
```

操作：
```bash
mv src/content/config.ts src/content.config.ts
```

### 4.2 重写集合定义

**当前代码** (`src/content/config.ts`)：
```ts
import { defineCollection, z } from "astro:content";

const postsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    published: z.date(),
    updated: z.date().optional(),
    draft: z.boolean().optional().default(false),
    description: z.string().optional().default(""),
    image: z.string().optional().default(""),
    tags: z.array(z.string()).optional().default([]),
    category: z.string().optional().nullable().default(""),
    lang: z.string().optional().default(""),
    pinned: z.boolean().optional().default(false),
    prevTitle: z.string().default(""),
    prevSlug: z.string().default(""),
    nextTitle: z.string().default(""),
    nextSlug: z.string().default(""),
  }),
});

const specCollection = defineCollection({
  schema: z.object({}),
});

export const collections = {
  posts: postsCollection,
  spec: specCollection,
};
```

**迁移后代码** (`src/content.config.ts`)：
```ts
import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const postsCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    published: z.date(),
    updated: z.date().optional(),
    draft: z.boolean().optional().default(false),
    description: z.string().optional().default(""),
    image: z.string().optional().default(""),
    tags: z.array(z.string()).optional().default([]),
    category: z.string().optional().nullable().default(""),
    lang: z.string().optional().default(""),
    pinned: z.boolean().optional().default(false),
    prevTitle: z.string().default(""),
    prevSlug: z.string().default(""),
    nextTitle: z.string().default(""),
    nextSlug: z.string().default(""),
  }),
});

const specCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/spec" }),
  schema: z.object({}),
});

export const collections = {
  posts: postsCollection,
  spec: specCollection,
};
```

**关键变更**：
- `z` 的导入从 `"astro:content"` 改为 `"astro/zod"`
- 添加 `loader: glob(...)` 替代隐式的 `type: 'content'`
- glob pattern `**/*.{md,mdx}` 同时匹配子目录中的文件（如 `250826/TAR1.md`）

### 4.3 修改 entry.render() → render(entry)

涉及 3 个文件：

**文件 1：`src/pages/posts/[...slug].astro`**

```diff
+ import { render } from "astro:content";
  // ... 其他 import

  export async function getStaticPaths() {
    const blogEntries = await getSortedPosts();
    return blogEntries.map((entry) => ({
-     params: { slug: entry.slug },
+     params: { slug: entry.id },
      props: { entry },
    }));
  }

  const { entry } = Astro.props;
- const { Content, headings } = await entry.render();
- const { remarkPluginFrontmatter } = await entry.render();
+ const { Content, headings, remarkPluginFrontmatter } = await render(entry);
```

**文件 2：`src/components/PostCard.astro`**

```diff
+ import { render } from "astro:content";

- const { remarkPluginFrontmatter } = await entry.render();
+ const { remarkPluginFrontmatter } = await render(entry);
```

**文件 3：`src/pages/friends.astro`** (已使用新 API，无需修改)

**文件 4：`src/pages/about.astro`** (已使用新 API，无需修改)

### 4.4 修改 entry.slug → entry.id

Content Layer API 中不再有 `slug` 字段，统一使用 `id`。

涉及文件与修改：

**`src/pages/posts/[...slug].astro`**：
- Line 38: `params: { slug: entry.slug }` → `params: { slug: entry.id }`
- Line 149: `getPostUrlBySlug(entry.slug)` → `getPostUrlBySlug(entry.id)`
- Line 161: `slug={entry.slug}` → `slug={entry.id}`

**`src/components/PostPage.astro`**：
- Line 20: `getPostUrlBySlug(entry.slug)` → `getPostUrlBySlug(entry.id)`

**`src/utils/content-utils.ts`**：
- Line 28: `sorted[i].data.nextSlug = sorted[i - 1].slug` → `sorted[i].data.nextSlug = sorted[i - 1].id`
- Line 32: `sorted[i].data.prevSlug = sorted[i + 1].slug` → `sorted[i].data.prevSlug = sorted[i + 1].id`

**注意**：`PostCard.astro` 中已有 `entry.id` 的用法（line 94），无需修改。

### 4.5 处理 entry.id 与 entry.slug 的路径差异

在 Content Layer API 中，`entry.id` 的生成规则与旧版 `entry.slug` 可能不同：
- 旧版 `slug`：基于文件相对路径，如 `250826/TAR1`
- 新版 `id`：基于 glob loader 的匹配结果，通常与旧版一致

**验证点**：升级后检查 `entry.id` 的值是否与旧 `entry.slug` 一致。如果不一致，需要调整 `getStaticPaths` 中的路由参数和 `getPostUrlBySlug` 的调用。

### 4.6 PostCSS 配置更新

当前 `postcss.config.mjs` 依赖 `tailwindcss/nesting`：

```js
import postcssNesting from 'tailwindcss/nesting/index.js';
```

Tailwind v4 不再需要此配置。在 Phase 3 中会一并处理。

---

## 5. Phase 3：Tailwind CSS 集成迁移

### 5.1 背景

- `@astrojs/tailwind` 已废弃，不再维护
- Tailwind CSS v4 使用全新的 CSS-first 配置方式
- Tailwind v4 内置了 typography 插件，不再需要 `@tailwindcss/typography`

### 5.2 移除旧依赖

```bash
pnpm remove @astrojs/tailwind @tailwindcss/typography tailwindcss postcss-import postcss-nesting
```

### 5.3 安装新依赖

```bash
pnpm add tailwindcss@4 @tailwindcss/vite
```

### 5.4 更新 astro.config.mjs

```diff
  import svelte from "@astrojs/svelte";
- import tailwind from "@astrojs/tailwind";
+ import tailwindcss from "@tailwindcss/vite";

  export default defineConfig({
    integrations: [
-     tailwind({
-       nesting: true,
-     }),
      // ... 其他集成不变
    ],
+   vite: {
+     plugins: [tailwindcss()],
+   },
  });
```

### 5.5 删除旧配置文件

```bash
rm tailwind.config.cjs
rm postcss.config.mjs
```

### 5.6 更新 CSS 入口文件

Tailwind v4 使用 `@import "tailwindcss"` 替代旧的 `@tailwind` 指令。

**创建或更新 `src/styles/tailwind.css`**（新文件）：

```css
@import "tailwindcss";

/* 自定义主题 */
@theme {
  --font-sans: "Roboto", sans-serif, ui-sans-serif, system-ui, sans-serif;
}

/* 暗色模式策略 - 保持 class 策略 */
@variant dark (&:where(.dark, .dark *));
```

**更新 `src/styles/main.css`**：

```diff
- @tailwind components;
+ @import "tailwindcss";

  @layer components {
    /* ... 原有组件样式保持不变 ... */
  }
```

**重要**：Tailwind v4 的 `@layer` 语法与 v3 兼容，但需要确保 `@import "tailwindcss"` 在最前面。

### 5.7 处理 @tailwindcss/typography

Tailwind v4 内置了 typography 支持，通过 `@tailwindcss/typography` 插件仍然可用但需更新安装方式：

```bash
# 如果仍需要独立的 typography 插件（推荐继续使用以保持兼容）
pnpm add @tailwindcss/typography@latest
```

在 CSS 中引用：
```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";
```

### 5.8 检查 Tailwind 类名兼容性

本项目使用的 Tailwind 类名大部分是标准类名，v4 中保持兼容。需要特别关注：

- `@apply` 指令：v4 中仍然支持
- `dark:` 前缀：需要通过 `@variant` 声明使用 class 策略
- 自定义 CSS 变量（如 `var(--radius-large)`）：不受影响
- `!important` 后缀 `!important`：v4 中改为 `!` 前缀（如 `!text-red-500`）

**本项目中使用了 `!important` 的位置**（`src/styles/markdown.css`）：
```css
.anchor { @apply ... !important; }
```
需要改为：
```css
.anchor { @apply ... !important; }  /* v4 仍然支持 !important 后缀 */
```

**注意**：Tailwind v4 的 `!important` 语法在 `@apply` 中仍然使用 `!important` 后缀，与 v3 一致。

### 5.9 Stylus 文件兼容性

项目使用 Stylus（`variables.styl`, `markdown-extend.styl`）定义 CSS 变量。这些文件不依赖 Tailwind，迁移不受影响。

---

## 6. Phase 4：Zod 4 适配

### 6.1 影响评估

本项目的 Zod schema 较为简单，主要使用：
- `z.string()`
- `z.boolean()`
- `z.date()`
- `z.array(z.string())`
- `.optional()`, `.default()`, `.nullable()`

这些都是 Zod 4 中**保持兼容**的基础 API，无需修改。

### 6.2 导入路径变更

在 `src/content.config.ts` 中（已在 Phase 2 中处理）：

```diff
- import { defineCollection, z } from "astro:content";
+ import { defineCollection } from "astro:content";
+ import { z } from "astro/zod";
```

### 6.3 需要检查的 Zod 用法

如果项目中有以下用法，需要调整：

| v3 用法 | v4 用法 | 本项目是否涉及 |
|---|---|---|
| `z.string().email()` | `z.email()` | 否 |
| `z.string().url()` | `z.url()` | 否 |
| `.default()` + `.transform()` | 默认值需匹配输出类型 | 否 |
| `{ message: "..." }` | `{ error: "..." }` | 否 |

**结论**：本项目无需额外的 Zod 适配工作。

---

## 7. Phase 5：集成与插件兼容性更新

### 7.1 astro-expressive-code

**当前版本**：0.41.7 → **目标版本**：0.42.x

变更点：
- Shiki 升级到 4.0（由 expressive-code 内部处理）
- 项目自定义的 expressive-code 插件（`language-badge.ts`, `custom-copy-button.ts`）需要检查是否使用了 Shiki 内部 API

**检查项**：
```bash
# 检查自定义插件是否导入了 Shiki 相关 API
grep -r "shiki" src/plugins/expressive-code/
```

如果插件使用了 Shiki API，需要参考 [Shiki 4.0 迁移指南](https://shiki.style/blog/v4) 进行适配。

### 7.2 @swup/astro

**当前版本**：1.7.0 → **目标版本**：1.8.x

`@swup/astro` 1.8.0 支持 Astro 5，但需要确认是否兼容 Astro 6。

**检查项**：
- 查看 [swup/astro CHANGELOG](https://github.com/swup/astro/blob/main/CHANGELOG.md) 确认 Astro 6 支持
- 如果不支持，可暂时保持 1.7.0 或寻找替代方案

### 7.3 astro-icon

**当前版本**：1.1.5

检查 astro-icon 对 Astro 6 的兼容性。如果不兼容，升级到最新版本。

### 7.4 @astrojs/mdx

从 v4 升级到 v6：
- v5 中移除了对旧版 JSX 处理的支持
- v6 适配 Astro 6 的 Vite 7 和 Content Layer API

本项目的 `.mdx` 文件（`draft.mdx`）使用标准语法，应该兼容。

### 7.5 remark/rehype 插件

这些插件与 Astro 版本相对独立，但需要确认与新版 Markdown 处理管线的兼容性：

| 插件 | 风险 | 说明 |
|---|---|---|
| remark-math | 低 | 标准 remark 插件 |
| rehype-katex | 低 | 标准 rehype 插件 |
| rehype-slug | 低 | 标准 rehype 插件 |
| rehype-autolink-headings | 低 | 标准 rehype 插件 |
| remark-directive | 低 | 标准 remark 插件 |
| rehype-components | 低 | 自定义组件处理 |
| remark-sectionize | 低 | 标准 remark 插件 |
| 自定义插件 | 中 | 需检查是否使用了 Astro 内部 API |

**Astro v6 变更**：Markdown heading ID 生成方式有变化（使用 `github-slugger`）。如果项目依赖 heading ID 的特定格式，需要验证。

---

## 8. Phase 6：CI/CD 与部署配置更新

### 8.1 GitHub Actions 更新

**`build.yml`**：

```diff
  strategy:
    matrix:
-     node: [ 22, 23 ]
+     node: [ 22, 24 ]
```

**`deploy.yml`**：

当前使用 `withastro/action@v3`，需要升级到支持 Astro 6 的版本：

```diff
- uses: withastro/action@v3
+ uses: withastro/action@v4  # 或最新版本
```

检查 [withastro/action](https://github.com/withastro/action) 的最新版本和 Astro 6 支持情况。

### 8.2 packageManager 版本

当前 `"packageManager": "pnpm@9.14.4"` 保持不变，兼容 Node 22+。

### 8.3 .nvmrc（可选）

如果需要指定 Node 版本：
```bash
echo "22.12.0" > .nvmrc
```

---

## 9. 验证清单

### 9.1 构建验证

```bash
# 1. 类型检查
pnpm type-check

# 2. Astro 诊断
pnpm check

# 3. Lint
pnpm lint

# 4. 格式化
pnpm format

# 5. 生产构建
pnpm build
```

### 9.2 功能验证

- [ ] 首页正常加载，文章列表正确显示
- [ ] 文章详情页正常渲染（标题、内容、目录、元数据）
- [ ] 文章的上一篇/下一篇导航正常
- [ ] 标签页和分类页正常工作
- [ ] 搜索功能正常（Pagefind）
- [ ] 暗色/亮色主题切换正常
- [ ] 代码块高亮正常（Expressive Code）
- [ ] 数学公式渲染正常（KaTeX）
- [ ] 页面过渡动画正常（Swup）
- [ ] MDX 文件正常渲染（draft.mdx）
- [ ] About 和 Friends 页面正常
- [ ] RSS Feed 生成正常
- [ ] Sitemap 生成正常

### 9.3 视觉验证

- [ ] 所有 Tailwind 样式正常
- [ ] 响应式布局正常（移动端/桌面端）
- [ ] 自定义组件样式正常（card-base, btn-regular 等）
- [ ] 滚动条样式正常
- [ ] 代码块主题正常（仅暗色背景）

### 9.4 性能验证

- [ ] 构建时间无异常增长
- [ ] 页面加载速度无明显下降
- [ ] Pagefind 索引正常生成

---

## 10. 回滚方案

### 10.1 Git 回滚

```bash
# 回滚到迁移前的状态
git checkout main
git branch -D feat/astro-v6-migration
```

### 10.2 部分回滚

如果仅部分功能有问题，可以：
1. 保留 Astro 6 升级
2. 使用 `legacy.collectionsBackwardsCompat` 标志暂时跳过 Content Collections 迁移
3. 保持 Tailwind v3（如果 v4 迁移问题太多）

```js
// astro.config.mjs - 临时兼容配置
export default defineConfig({
  legacy: {
    collectionsBackwardsCompat: true,
  },
});
```

**注意**：`legacy.collectionsBackwardsCompat` 是临时迁移助手，最终仍需完成迁移。

---

## 11. 附录：受影响文件清单

### 需要修改的文件

| 文件 | 改动类型 | Phase |
|---|---|---|
| `package.json` | 依赖版本更新 | 1 |
| `astro.config.mjs` | 移除 tailwind 集成，添加 vite 插件 | 3 |
| `src/content/config.ts` → `src/content.config.ts` | 移动 + 重写 | 2 |
| `src/pages/posts/[...slug].astro` | render() + slug → id | 2 |
| `src/components/PostCard.astro` | render() | 2 |
| `src/components/PostPage.astro` | slug → id | 2 |
| `src/utils/content-utils.ts` | slug → id | 2 |
| `src/styles/main.css` | Tailwind v4 入口 | 3 |
| `tailwind.config.cjs` | 删除 | 3 |
| `postcss.config.mjs` | 删除 | 3 |
| `.github/workflows/build.yml` | Node 版本 | 6 |
| `.github/workflows/deploy.yml` | action 版本 | 6 |

### 需要创建的文件

| 文件 | 说明 | Phase |
|---|---|---|
| `src/content.config.ts` | 新的 content config 位置 | 2 |
| `src/styles/tailwind.css` | Tailwind v4 入口（可选） | 3 |

### 需要删除的文件

| 文件 | 说明 | Phase |
|---|---|---|
| `src/content/config.ts` | 已移动到新位置 | 2 |
| `tailwind.config.cjs` | Tailwind v4 不需要 | 3 |
| `postcss.config.mjs` | Tailwind v4 不需要 | 3 |

### 需要检查但可能不需修改的文件

| 文件 | 检查项 |
|---|---|
| `src/plugins/expressive-code/*.ts` | Shiki 4.0 兼容性 |
| `src/plugins/remark-*.mjs` | Astro v6 Markdown 管线兼容性 |
| `src/plugins/rehype-*.mjs` | Astro v6 Markdown 管线兼容性 |
| `src/styles/*.css` | Tailwind v4 类名兼容性 |
| `src/styles/*.styl` | 不受影响 |
| `src/components/*.svelte` | Svelte 8 兼容性（如果升级） |
| `src/pages/*.astro` | 入口文件的 Tailwind 类名 |
| `src/components/*.astro` | 入口文件的 Tailwind 类名 |

---

## 执行顺序建议

```
1. 创建升级分支
2. Phase 1: 升级所有依赖版本
3. Phase 2: 迁移 Content Collections（最大改动）
4. Phase 4: Zod 4 适配（几乎无改动）
5. 验证：构建 + 基本功能测试
6. Phase 3: Tailwind CSS 迁移（第二大改动）
7. Phase 5: 检查集成插件兼容性
8. Phase 6: 更新 CI/CD
9. 全面验证
10. 合并分支
```

**建议分阶段验证**：每完成一个 Phase 后，运行 `pnpm build` 确认构建通过，再进行下一个 Phase。

---

## 参考链接

- [Astro v6 升级指南](https://docs.astro.build/en/guides/upgrade-to/v6/)
- [Astro v5 升级指南](https://docs.astro.build/en/guides/upgrade-to/v5/)
- [Content Layer API 文档](https://docs.astro.build/en/guides/content-collections/)
- [Tailwind CSS v4 迁移指南](https://tailwindcss.com/docs/upgrade-guide)
- [Zod v4 Changelog](https://zod.dev/v4/changelog)
- [Shiki v4 迁移指南](https://shiki.style/blog/v4)
- [Vite 7 迁移指南](https://vite.dev/guide/migration)
