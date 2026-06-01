---
title: Markdown Extended Features
published: 2024-05-01
updated: 2026-05-31
description: 'Read more about Markdown features in Fuwari'
tags: [Demo, Example, Markdown, Fuwari]
category: 'Examples'
draft: true 
---

## GitHub Repository Cards
You can add dynamic cards that link to GitHub repositories, on page load, the repository information is pulled from the GitHub API. 

::github{repo="Fabrizz/MMM-OnSpotify"}

Create a GitHub repository card with the code `::github{repo="<owner>/<repo>"}`.

```markdown
::github{repo="saicaca/fuwari"}
```

## Admonitions

Following types of admonitions are supported: `note` `tip` `important` `warning` `caution`

:::note
Highlights information that users should take into account, even when skimming.
:::

:::tip
Optional information to help a user be more successful.
:::

:::important
Crucial information necessary for users to succeed.
:::

:::warning
Critical content demanding immediate user attention due to potential risks.
:::

:::caution
Negative potential consequences of an action.
:::

### Basic Syntax

```markdown
:::note
Highlights information that users should take into account, even when skimming.
:::

:::tip
Optional information to help a user be more successful.
:::
```

### Custom Titles

The title of the admonition can be customized.

:::note[MY CUSTOM TITLE]
This is a note with a custom title.
:::

```markdown
:::note[MY CUSTOM TITLE]
This is a note with a custom title.
:::
```

### GitHub Syntax

> [!TIP]
> [The GitHub syntax](https://github.com/orgs/community/discussions/16925) is also supported.

```
> [!NOTE]
> The GitHub syntax is also supported.

> [!TIP]
> The GitHub syntax is also supported.
```

### Spoiler

You can add spoilers to your text. The text also supports **Markdown** syntax.

The content :spoiler[is hidden **ayyy**]!

```markdown
The content :spoiler[is hidden **ayyy**]!

```

## MDX Image Optimization

For complex layouts requiring optimized images (e.g., side-by-side images), use `.mdx` files with Astro's `<Image />` component.

### Why use MDX for images?

Standard Markdown `![]()` syntax works well for single images, but HTML `<img>` tags in `.md` files are not optimized. MDX allows you to:

- Use Astro's `<Image />` component for automatic WebP conversion
- Create complex layouts with optimized images
- Keep all images in your post directory (no need for `public/`)

### Example: Side-by-side images

```mdx
---
title: My Post
---

import { Image } from 'astro:assets';
import photo1 from './post.assets/photo1.jpg';
import photo2 from './post.assets/photo2.jpg';

<figure style={{display: 'flex', gap: '1rem'}}>
  <Image src={photo1} alt="Photo 1" style={{width: '45%'}} />
  <Image src={photo2} alt="Photo 2" style={{width: '45%'}} />
</figure>
```

### Directory structure

Store images in `{postname}.assets/` directories alongside your `.mdx` file:

```
src/content/posts/
├── my-post.mdx
└── my-post.assets/
    ├── photo1.jpg
    └── photo2.jpg
```