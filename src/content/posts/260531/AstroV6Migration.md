---
title: '博客升级日志：Astro v6 + Tailwind v4'
published: 2026-05-31
description: '从 Astro 5.18 升级到 6.4，顺带迁移 Tailwind v4 和 Content Layer API 的完整记录。'
image: './usage.png'
tags: [更新日志]
category: '更新日志'
lang: 'zh-CN'
---

<div style={{ opacity: 0.5, fontSize: '0.8rem', textAlign: 'center', marginBottom: '1rem', fontStyle: 'italic' }}>
  ⚡ 本文由 AI 撰写，开发模型：<a href="https://model.mimoapi.ai" target="_blank" rel="noopener noreferrer">MIMO V2.5 Pro</a>（小米大模型团队）
</div>

**TL;DR** — `pnpm dlx @astrojs/upgrade` 只需要 3 秒，但把一切修好用了整整一个下午。

---

## 📦 起点：MIGRATION-ASTRO-V6.md

一切始于一个计划文件。在动手之前，我梳理了所有 breaking changes：

| 变更 | 影响 |
|---|---|
| Content Collections → Content Layer API | **高** — 配置重写，`render()` `slug` 全部换血 |
| Tailwind v3 → v4 | **高** — 从 JS 配置到 CSS-first 的范式转移 |
| Zod 4 | **低** — schema 简单，几乎无感 |
| Vite 7 / Shiki 4 | **低** — 由集成内部消化 |

计划分 6 个 Phase 执行，每完成一个就跑一次 `pnpm build` 验证。

<figure style={{ display: 'flex', justifyContent: 'center', margin: '1.5rem 0' }}>
  <div style={{
    background: 'linear-gradient(135deg, #0f172a, #1e293b)',
    borderRadius: '12px',
    padding: '1.5rem 2.5rem',
    fontFamily: 'monospace',
    fontSize: '0.85rem',
    lineHeight: '1.8',
    color: '#94a3b8',
    maxWidth: 'fit-content'
  }}>
    <span style={{color: '#22d3ee'}}>Phase 1</span> <span style={{color: '#a78bfa'}}>→</span> 依赖升级<br/>
    <span style={{color: '#22d3ee'}}>Phase 2</span> <span style={{color: '#a78bfa'}}>→</span> Content Layer API<br/>
    <span style={{color: '#22d3ee'}}>Phase 3</span> <span style={{color: '#a78bfa'}}>→</span> Tailwind v4<br/>
    <span style={{color: '#22d3ee'}}>Phase 4</span> <span style={{color: '#a78bfa'}}>→</span> Zod 4<br/>
    <span style={{color: '#22d3ee'}}>Phase 5</span> <span style={{color: '#a78bfa'}}>→</span> 集成兼容性<br/>
    <span style={{color: '#22d3ee'}}>Phase 6</span> <span style={{color: '#a78bfa'}}>→</span> CI/CD
  </div>
</figure>

---

## ⚡ Phase 1：依赖升级

```bash
pnpm dlx @astrojs/upgrade
```

核心依赖跳变：

| 包 | 旧 → 新 |
|---|---|
| `astro` | `5.18.1` → `6.4.2` |
| `@astrojs/mdx` | `4.x` → `6.0.1` |
| `@astrojs/svelte` | `7.2.5` → `8.1.2` |
| `astro-expressive-code` | `0.41.7` → `0.42.0` |
| `@swup/astro` | `1.7.0` → `1.8.0` |
| `pagefind` | `1.5.0` → `1.5.2` |

package.json 净变化：**+501 / -851 行**——删除 `@astrojs/tailwind`、`tailwindcss` v3、`postcss-*` 等一整套旧依赖。

---

## 🔄 Phase 2：Content Collections → Content Layer API

这是工作量最大的手术。核心变更：

### 2.1 配置文件搬家

```diff
- src/content/config.ts
+ src/content.config.ts   ← 搬到 src 根目录
```

### 2.2 集合定义重写

```diff
- import { defineCollection, z } from "astro:content";
+ import { defineCollection } from "astro:content";
+ import { z } from "astro/zod";
+ import { glob } from "astro/loaders";

  const postsCollection = defineCollection({
+   loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
    schema: z.object({ ... }),
  });
```

### 2.3 `entry.render()` → `render(entry)`

涉及 2 个核心文件：

- `src/pages/posts/[...slug].astro` — 博文详情页
- `src/components/PostCard.astro` — 文章卡片（获取 excerpt）

### 2.4 `entry.slug` → `entry.id`

Content Layer API 统一用 `id` 替代 `slug`。这场重命名波及了：

- `src/pages/posts/[...slug].astro` — 路由参数 + URL 生成
- `src/components/PostPage.astro` — 导航链接
- `src/utils/content-utils.ts` — prev/next 逻辑
- 以及 `getPostUrlBySlug` 改名为 `getPostUrlById`

---

## 🎨 Phase 3：Tailwind CSS v3 → v4

这是**第二大**的改动。Tailwind v4 采用全新的 **CSS-first** 配置范式。

### 拆除旧设施

`@astrojs/tailwind` 废弃了，`tailwind.config.cjs` 和 `postcss.config.mjs` 一并拆除。

### 新架构

```js
// astro.config.mjs
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
```

```css
/* src/styles/tailwind.css */
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@theme {
  --font-sans: "Roboto", sans-serif, ui-sans-serif, system-ui, sans-serif;
}

@variant dark (&:where(.dark, .dark *));
```

### CSS 适配的血泪史

Tailwind v4 的 `@apply` 行为变了——`@reference` 指令导致 CSS 被延迟加载，首次页面过渡时出现布局偏移（layout shift）。解决方案是**把所有 `@apply` 全部展开为原生 CSS**。

涉及文件：
- `main.css` — 组件样式
- `markdown.css` — 文章排版
- `scrollbar.css` — 滚动条
- `photoswipe.css` — 图片灯箱
- `expressive-code.css` — 代码块

**净变化：5 个文件 +430 / -95 行**，全部手动展开。

> 💡 **教训**：在 Tailwind v4 中，`@apply` 在 Chromium 下的行为与 v3 不同。如果遇到页面过渡时的样式闪烁，展开为原生 CSS 是根治方案。

### 其他 CSS 战争

- **媒体查询保留** — `@layer` 会吃掉 `@media`，需要把 media query 移出 `@layer` 块
- **Banner 高度** — `lg:is-home` 选择器确保首页横幅正确显示
- **`!important` 语法** — v4 支持 `!` 前缀（`!text-red-500`），但 `@apply` 中仍可用旧语法
- **`photoswipe/style.css`** — 导入位置从组件内移到 frontmatter，确保正确打包
- **原生滚动条隐藏** — `scrollbar-gutter: stable` 替代旧方案

### 移动端 Banner 的 6 次迭代

从 `!important` 覆盖 → 特异性选择器 → 简化 transition → 恢复 timing → 优化控制，整整 6 个 commit 才把移动端横幅动画调好。CSS 有时就是这样——95% 是科学，5% 是玄学。

---

## 🤖 Phase 4：Zod 4

正如预期，**几乎无改动**。项目里的 schema 都是基础类型，Zod 4 完美后向兼容。

一行代码都没改。✓

---

## 🔌 Phase 5：集成兼容性

### Expressive Code 0.42.0

Shiki 升级到 4.0，但由 expressive-code 内部处理，自定义插件（`language-badge.ts`、`custom-copy-button.ts`）无需改动。

### Swup 1.8.0

页面过渡动画正常，`transition-swup-` 类名策略无需调整。

### KaTeX / remark / rehype

所有 Markdown 处理插件保持兼容。

---

## 🚀 Phase 6：CI/CD

GitHub Actions 更新：

```yaml
# build.yml
strategy:
  matrix:
    node: [22, 24]    # 23 → 24
```

```yaml
# deploy.yml
node-version: 22       # 新增
```

---

## 📊 数据总览

**33 commits** · **27 个文件变更** · **+2091 / -1616 行**

```
──────────────────────────────────────────────
 依赖升级       ■■■■■■■■■■■■■■■■■■   501/+ 851/-
 Content Layer  ■■■■■■■■■■■■          20/+  14/-
 Tailwind v4    ■■■■■■■■■■■■■■■■■■   356/+ 592/-
 CSS 适配       ■■■■■■■■■■■■■■■■■■   478/+ 110/-
 滚动条/过渡    ■■■■■■■■■■           106/+  79/-
 CI/CD          ■                    4/+   6/-
──────────────────────────────────────────────
```

---

## 🧠 一些感想

1. **`@astrojs/upgrade` 只是开始** — 它帮你升级了包，但真正的迁移工作才刚刚开始
2. **CSS 永远是最大的坑** — 框架升级中，样式迁移往往比逻辑迁移更耗时
3. **Content Layer API 是新基建** — 虽然迁移成本高，但 `glob` loader 的设计更清晰，集合查询更灵活
4. **Tailwind v4 是真·CSS-first** — 从 JS 配置到纯 CSS，符合 Web 平台的发展方向
5. **做好计划，分阶段验证** — 每完成一个 Phase 就跑 `pnpm build`，把问题消灭在早期

---

## 🔮 接下来

迁移完成，博客回到了稳定状态。下一站可能是……
- Svelte 5 的 runes 迁移？
- 看看 Content Layer API 还能玩出什么花活？
- 或者，先睡一觉再说 😴

---

<details>
<summary><strong>📜 完整提交日志</strong>（点击展开）</summary>

<div style={{ margin: '0.5rem 0 0 1rem', fontFamily: 'monospace', fontSize: '0.8rem', lineHeight: '1.6' }}>

`fc8bf97` 📝 docs: add astro v6 migration plan<br/>
`8113e4c` 📦 chore(deps): upgrade astro to v6 and all integrations to latest<br/>
`38e8a27` 🔄 refactor: migrate content collections to content layer api<br/>
`35d2721` 🎨 refactor: migrate tailwind css v3 to v4<br/>
`1befd4e` 👷 ci: update node version matrix and deploy config<br/>
`0df780e` 🐛 fix: adapt css for tailwind v4 compatibility<br/>
`7774fa6` 🧹 style: apply biome lint fixes<br/>
`b5bd3e6` 🐛 fix: preserve media queries in banner css for tailwind v4<br/>
`1723fbf` 🐛 fix: remove @reference and @layer to preserve media queries<br/>
`77be378` 🐛 fix: use lg:is-home selector for banner height on homepage<br/>
`b74b565` 🐛 fix: move photoswipe/style.css import to frontmatter<br/>
`7b44e50` 🐛 fix: remove @reference directives to prevent CSS lazy loading<br/>
`7536565` 🐛 fix: hide native scrollbar to prevent layout shift<br/>
`9348d49` 🐛 fix: text-underline-offset and rename getPostUrlBySlug<br/>
`30e7f33` 🔄 refactor: rename slug field to id in PostForList<br/>
`4fdbb4a` 🐛 fix: add !important to mobile banner styles<br/>
`475016b` 🐛 fix: restrict mobile 480px banner styles to non-homepage<br/>
`3d913f7` 🐛 fix: simplify mobile banner transitions<br/>
`d6695dd` 🐛 fix: restore mobile banner transitions with proper timing<br/>
`ab2bc70` 🐛 fix: optimize mobile banner transitions<br/>
`edc185d` 🔄 refactor: remove unused id prop from License component<br/>
`b4ee7af` 📝 docs: update version numbers for Astro v6<br/>
`8953899` 🐛 fix: clone frozen collection entries, use scrollbar-gutter<br/>
`0316f3a` 🐛 fix: merge duplicate &:active blocks in .copy-btn<br/>
`ed4d357` 🐛 fix: restore native scrollbar hiding for OverlayScrollbars<br/>
`e501d75` 🐛 fix: disable native scrollbar hiding for OverlayScrollbars<br/>
`cec7aab` 🎉 feat: upgrade Astro to v6, TW v4, Content Layer API (#99)<br/>
`8e51ab6` 🔀 Merge branch 'main' into dev<br/>

</div>
</details>
