---
name: creating-blog-post
description: Use when creating or editing a blog post for the fffold.github.io Astro project. Covers frontmatter schema, Chinese content conventions, admonitions, image layouts, MDX patterns, and verification steps.
---

# Creating Blog Posts

## Overview

Blog posts live in `src/content/posts/`. This is a Chinese-language blog — posts use `lang: 'zh-CN'`, Chinese categories, and Chinese tags. Use `pnpm new-post` to scaffold, then fix the auto-generated frontmatter.

## Quick Reference

| Step | Action |
|---|---|
| 1. Scaffold | `pnpm new-post YYMMDD/PostTitle` |
| 2. Fix frontmatter | Script uses filename as `title` — replace with real title |
| 3. Choose format | `.md` for simple, `.mdx` for optimized images / JSX |
| 4. Add content | Write body, add admonitions/images as needed |
| 5. Verify | `pnpm lint && pnpm check && pnpm build` |

## File Placement

**Convention:** Date-prefixed subdirectory with the post file inside.

```
src/content/posts/
├── 250826/
│   └── PostTitle.md          # simple post
├── 250825/
│   ├── WatchAnime.mdx        # MDX post
│   ├── Shirobako_10th.webp   # cover image (flat in date dir)
│   └── 6b2873496b12d079.png  # inline images (flat in date dir)
├── 250901/
│   ├── XiamenArticle.md
│   └── XiamenArticle.assets/ # images in .assets/ subfolder
│       └── IMG_xxx.webp
├── 250828/
│   ├── LRN1.md
│   └── attachments/          # alternative: attachments/ subfolder
│       └── screenshot.png
```

**Three image placement patterns are all acceptable:**
- Flat in date dir (e.g., `250825/photo.png`) — for simple posts with few images
- `.assets/` subfolder (e.g., `250901/XiamenArticle.assets/cover.jpg`) — recommended for posts with many images
- `attachments/` subfolder (e.g., `250828/attachments/img.png`) — alternative convention

## Frontmatter Schema

**Required:**

| Field | Type | Example |
|---|---|---|
| `title` | string | `'厦门漫步随感'` |
| `published` | date | `2025-09-01` or `2026-02-17T21:04:00+08:00` |

**Optional:**

| Field | Type | Default | Notes |
|---|---|---|---|
| `description` | string | `''` | Shown on index page. Can be empty `''` |
| `image` | image | — | Cover image for social cards |
| `tags` | string[] | `[]` | Chinese tags: `['动画', '读后感']` |
| `category` | string | `''` | Chinese category: `'二次元'`, `'见闻'`, `'更新日志'` |
| `draft` | boolean | `false` | `true` hides from listings |
| `pinned` | boolean | `false` | `true` pins to top of listing |
| `lang` | string | `''` | `'zh-CN'` for Chinese posts |
| `updated` | date | — | Last-updated date |

**Do NOT set:** `prevTitle`, `prevSlug`, `nextTitle`, `nextSlug` — auto-populated.

## Frontmatter Templates

### Standard Chinese post

```yaml
---
title: 文章标题
published: 2025-08-26
description: '一句话描述，显示在首页索引中'
image: './PostTitle.assets/cover.jpg'
tags: [标签1, 标签2]
category: '分类名'
draft: false
lang: 'zh-CN'
---
```

### Draft / WIP post

```yaml
---
title: 草稿标题
published: 2050-01-01
draft: true
---
```

### Pinned important post

```yaml
---
title: 重要文章
published: 2025-08-25
pinned: true
lang: 'zh-CN'
---
```

## Common Categories (from real posts)

| Category | Usage |
|---|---|
| `二次元` | Anime, manga, light novels, galgame |
| `见闻` | Travel, personal essays, life updates |
| `更新日志` | Blog/tech update logs |
| `生物医药` | Academic literature notes |

## MD vs MDX

| Use | When |
|---|---|
| `.md` | Simple posts, standard images via `![]()`, admonitions, GitHub cards |
| `.mdx` | Need `<Image />` for WebP optimization, JSX components, `<figure>` layouts |

## Markdown Extensions

### Admonitions

Supported types: `note` `tip` `important` `warning` `caution`

```markdown
:::note
基础 note 块。
:::

:::tip[自定义标题]
带自定义标题的 tip 块。
:::

:::warning
警告信息。
:::
```

Real example from posts:

```markdown
:::note
这篇文字是8月16日写的，现迁移到博客。
:::

:::tip[文章说明]
本文是社刊供稿，同步发布在论坛。
:::
```

### GitHub Repository Cards

```markdown
::github{repo="owner/repo"}
```

### Spoilers

```markdown
这段文字 :spoiler[隐藏内容在这里]!
```

## Image Patterns

### Simple image in `.md`

```markdown
![alt text](./image.webp)
```

### Side-by-side images in MDX (with `<Image />`)

```mdx
---
title: Post Title
---

import { Image } from 'astro:assets';
import photo1 from './PostTitle.assets/photo1.jpg';
import photo2 from './PostTitle.assets/photo2.jpg';

<figure style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
  <Image src={photo1} alt="图一" style={{width: '48%', minWidth: '240px'}} />
  <Image src={photo2} alt="图二" style={{width: '48%', minWidth: '240px'}} />
  <figcaption style={{width: '100%', textAlign: 'center', marginTop: '0.5rem'}}>
    并排图片说明文字
  </figcaption>
</figure>
```

### Cover image (`image` field)

Three source types:

| Prefix | Source | Example |
|---|---|---|
| `http://` / `https://` | Web URL | `https://example.com/cover.jpg` |
| `/` | `public/` dir | `/images/cover.jpg` |
| *(none)* | Relative to file | `./cover.jpeg` or `./PostTitle.assets/cover.jpg` |

No cover image: omit the field or use `image: ''`

## Admonition with Links

```markdown
:::tip[外部链接]
[弹弹play官网](https://www.dandanplay.com/)
:::
```

## Verification

**Before committing, always run:**

```bash
pnpm lint          # Biome check + auto-fix
pnpm check         # Astro diagnostics
pnpm build         # Full build + Pagefind index
```

## Common Mistakes

- **Not fixing `title` from `pnpm new-post`** — the script uses the filename as title, always replace with real title
- **Using wrong date format** — use `YYYY-MM-DD`, not `YYYY/MM/DD`
- **Forgetting `lang: 'zh-CN'`** on Chinese posts
- **Setting internal fields** — never set `prevTitle`, `prevSlug`, `nextTitle`, `nextSlug`
- **Using `<img>` in `.md`** — use `![]()` syntax; use `.mdx` with `<Image />` for optimized images
- **Forgetting `draft: true`** on WIP posts
- **Not running `pnpm build`** — `pnpm check` alone doesn't catch all build errors
