---
title: Simple Guides for Fuwari
published: 2024-04-01
description: "How to use this blog template."
image: "./cover.jpeg"
tags: ["Fuwari", "Blogging", "Customization"]
category: Guides
draft: true
---

> Cover image source: [Source](https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/208fc754-890d-4adb-9753-2c963332675d/width=2048/01651-1456859105-(colour_1.5),girl,_Blue,yellow,green,cyan,purple,red,pink,_best,8k,UHD,masterpiece,male%20focus,%201boy,gloves,%20ponytail,%20long%20hair,.jpeg)

This blog template is built with [Astro](https://astro.build/). For the things that are not mentioned in this guide, you may find the answers in the [Astro Docs](https://docs.astro.build/).

## Front-matter of Posts

```yaml
---
title: My First Blog Post
published: 2023-09-09
description: This is the first post of my new Astro blog.
image: ./cover.jpg
tags: [Foo, Bar]
category: Front-end
draft: false
---
```

| Attribute     | Description                                                                                                                                                                                                 |
|---------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `title`       | The title of the post.                                                                                                                                                                                      |
| `published`   | The date the post was published.                                                                                                                                                                            |
| `description` | A short description of the post. Displayed on index page.                                                                                                                                                   |
| `image`       | The cover image path of the post.<br/>1. Start with `http://` or `https://`: Use web image<br/>2. Start with `/`: For image in `public` dir<br/>3. With none of the prefixes: Relative to the markdown file |
| `tags`        | The tags of the post.                                                                                                                                                                                       |
| `category`    | The category of the post.                                                                                                                                                                                   |
| `draft`        | If this post is still a draft, which won't be displayed.                                                                                                                                                    |

## Where to Place the Post Files



Your post files should be placed in `src/content/posts/` directory. You can also create sub-directories to better organize your posts and assets.

```
src/content/posts/
├── post-1.md
├── post-2.mdx
└── post-2/
    ├── cover.png
    └── index.md
```

## Using MDX for Complex Image Layouts

The blog supports `.mdx` files which allow you to use Astro's `<Image />` component for optimized images in complex layouts.

**When to use `.mdx`:**
- Side-by-side images
- Custom HTML layouts with images
- When you need automatic webp optimization for all images

**Example `.mdx` file:**
```mdx
---
title: Post with Side-by-Side Images
published: 2025-01-01
---

import { Image } from 'astro:assets';
import photo1 from './post.assets/photo1.jpg';
import photo2 from './post.assets/photo2.jpg';

<figure style="display:flex; gap:1rem;">
  <Image src={photo1} alt="Photo 1" style="width:45%;" />
  <Image src={photo2} alt="Photo 2" style="width:45%;" />
</figure>
```

**Image directory structure:**
```
src/content/posts/
├── my-post.mdx
└── my-post.assets/
    ├── photo1.jpg
    └── photo2.jpg
```
