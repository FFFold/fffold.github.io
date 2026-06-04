---
name: creating-blog-post
description: Use when creating a new blog post for the fffold.github.io Astro project. Guides file placement, frontmatter schema, MDX vs MD choice, and image handling conventions.
---

# Creating Blog Posts

## Overview

Blog posts live in `src/content/posts/`. Use `pnpm new-post` to scaffold, then fill in frontmatter and content following the schema below.

## Quick Reference

| Step | Action |
|---|---|
| 1. Scaffold | `pnpm new-post YYMMDD/PostTitle` |
| 2. Set frontmatter | Fill required + relevant optional fields |
| 3. Choose format | `.md` for simple, `.mdx` for optimized images / JSX |
| 4. Add content | Write body in Markdown |
| 5. Verify | `pnpm lint && pnpm check` |

## File Placement

**Convention:** Date-prefixed subdirectory with the post file inside.

```
src/content/posts/
├── 250826/
│   └── MyPostTitle.md
├── 250827/
│   └── AnotherPost.mdx
│   └── AnotherPost.assets/
│       └── photo.jpg
```

Run `pnpm new-post YYMMDD/PostTitle` — the script auto-creates subdirectories and appends `.md` if no extension given. To create `.mdx`, pass the extension explicitly:

```bash
pnpm new-post 250826/MyPost.mdx
```

## Frontmatter Schema

**Required:**

| Field | Type | Example |
|---|---|---|
| `title` | string | `My First Post` |
| `published` | date | `2025-08-26` |

**Optional:**

| Field | Type | Default | Notes |
|---|---|---|---|
| `description` | string | `""` | Shown on index page |
| `tags` | string[] | `[]` | `["Tag1", "Tag2"]` |
| `category` | string | `""` | Single category |
| `image` | image | — | Cover image (see below) |
| `draft` | boolean | `false` | `true` hides from listings |
| `updated` | date | — | Last-updated date |
| `lang` | string | `""` | Language code |
| `pinned` | boolean | `false` | Pin to top |

**Do NOT set:** `prevTitle`, `prevSlug`, `nextTitle`, `nextSlug` — these are auto-populated.

## Frontmatter Template

```yaml
---
title: Post Title Here
published: 2025-08-26
description: "A short description for the index page."
tags: ["Tag1", "Tag2"]
category: CategoryName
draft: false
pinned: false
---
```

## MD vs MDX

| Use | When |
|---|---|
| `.md` | Simple posts, standard images via `![]()` |
| `.mdx` | Need `astro:assets` `<Image />` for WebP optimization, JSX components, or side-by-side image layouts |

### MDX Image Pattern

Store images in a sibling `.assets/` directory:

```
src/content/posts/250826/MyPost.mdx
src/content/posts/250826/MyPost.assets/photo.jpg
```

```mdx
---
title: Post With Images
published: 2025-08-26
---

import { Image } from 'astro:assets';
import photo from './MyPost.assets/photo.jpg';

<Image src={photo} alt="Description" />
```

## Cover Image (`image` field)

Three source types:

| Prefix | Source | Example |
|---|---|---|
| `http://` / `https://` | Web URL | `https://example.com/cover.jpg` |
| `/` | `public/` dir | `/images/cover.jpg` |
| *(none)* | Relative to file | `./cover.jpeg` |

## Common Mistakes

- **Flat files in posts root** — use `YYMMDD/PostTitle.md` subdirs instead
- **Forgetting `draft: true`** on WIP posts — set it explicitly while drafting
- **Using `.mdx` unnecessarily** — prefer `.md` unless you need optimized images or JSX
- **Setting internal fields** — never set `prevTitle`, `prevSlug`, `nextTitle`, `nextSlug`
- **Wrong date format** — use `YYYY-MM-DD`, not `YYYY/MM/DD` or other formats
