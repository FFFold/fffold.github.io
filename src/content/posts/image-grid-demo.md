---
title: Image Grid Demo
published: 2024-05-01
updated: 2026-07-15
description: 'A complete guide for using the :::grid gallery feature.'
tags: [Demo, Example, Markdown, Gallery, Image Grid]
category: 'Examples'
draft: true
---

`:::grid` is the blog's image gallery container directive. It turns ordinary Markdown images into a responsive grid with a consistent card ratio and enables Fancybox lightbox viewing. Each `:::grid` becomes its own lightbox group.

## When to Use `:::grid`

Use `:::grid` when you want to present multiple related images as a tidy gallery:

- screenshots from the same tutorial
- photos from the same trip or event
- small portfolios or thumbnail previews
- image sets that should be browsed together in the lightbox

For a single image, keep using normal Markdown `![]()` syntax. Ordinary images outside a grid are not added to any grid gallery and are handled separately by the lightbox.

## Basic Syntax

Wrap Markdown images in a `:::grid` container:

````markdown
:::grid
![Image description](/Images/demos/image-grid-demo/landscape-1.webp)

![Image description](/Images/demos/image-grid-demo/landscape-2.webp)
:::
````

### Syntax Rules

1. Each image must occupy its own paragraph.
2. Leave a blank line between images.
3. Keep only images inside the container.
4. Put paragraphs, lists, code blocks, and other content outside the container.
5. Use `:::` on its own line to close the container.

Here is the result:

:::grid
![Minimal syntax result: first image](/Images/demos/image-grid-demo/landscape-1.webp)

![Minimal syntax result: second image](/Images/demos/image-grid-demo/landscape-2.webp)
:::

## Parameters

Write parameters in braces after the opening directive: `:::grid{parameter="value"}`.

| Parameter | Allowed values | Default | Purpose |
| --- | --- | --- | --- |
| `columns` | Integers from `1` to `6` | `3` | Number of columns per row on desktop. Invalid values fall back to `3`. |
| `aspect` | A positive ratio, such as `16/9`, `3/4`, or `1/1` | `16/10` | The displayed card ratio, not the original image ratio. Invalid values fall back to `16/10`. |
| `fit` | `cover`, `contain` | `cover` | `cover` crops to fill; `contain` preserves the complete image and may leave empty space. |

### Parameter Guidance

- `columns`: `2`–`4` is usually the most readable range. Use `1` for a large detail image, and `5`–`6` for dense thumbnail previews.
- `aspect`: choose a ratio close to the original images to reduce cropping. `16/9` suits landscapes, `3/4` suits portraits/posters, `1/1` suits square thumbnails.
- `fit`: use `cover` for a consistent tidy grid; use `contain` when every edge of the original image must remain visible.

:::grid{columns="3" aspect="16/9" fit="cover"}
![Parameter example: first landscape image](/Images/demos/image-grid-demo/landscape-1.webp "Landscape caption 1")

![Parameter example: second landscape image](/Images/demos/image-grid-demo/landscape-2.webp "Landscape caption 2")

![Parameter example: third landscape image](/Images/demos/image-grid-demo/landscape-3.webp "Landscape caption 3")
:::

## Step-by-Step: Adding a Gallery

1. Start a new paragraph with `:::grid`.
2. Add optional parameters, for example `:::grid{columns="3" aspect="16/9" fit="cover"}`.
3. Write each image as its own Markdown paragraph, with a blank line between images.
4. Close the container with `:::` on a new line.
5. Run the dev server and open the post to check the grid layout.
6. Click an image to verify the Fancybox lightbox opens and navigation stays inside that grid.

## Default Configuration

If you omit all parameters, the grid uses three columns, `16/10` ratio, and `cover` cropping.

````markdown
:::grid
![Image description](./image-1.webp)

![Image description](./image-2.webp)

![Image description](./image-3.webp)
:::
````

:::grid
![Default configuration: square image one](/Images/demos/image-grid-demo/square-1.webp)

![Default configuration: square image two](/Images/demos/image-grid-demo/square-2.webp)

![Default configuration: square image three](/Images/demos/image-grid-demo/square-3.webp)
:::

## Column Counts

### Two Columns

Two columns give larger preview cards. With three images, the third image moves to the next row.

````markdown
:::grid{columns="2" aspect="1/1"}
![Square image description](./square-1.webp)

![Square image description](./square-2.webp)

![Square image description](./square-3.webp)
:::
````

:::grid{columns="2" aspect="1/1"}
![Two-column square one](/Images/demos/image-grid-demo/square-1.webp "Square 1")

![Two-column square two](/Images/demos/image-grid-demo/square-2.webp "Square 2")

![Two-column square three](/Images/demos/image-grid-demo/square-3.webp "Square 3")
:::

### Four Columns

Four columns are good for thumbnail sets. Desktop displays four in one row; tablet collapses to two columns and mobile to one.

````markdown
:::grid{columns="4" aspect="1/1"}
![Square image description](./square-1.webp)

![Square image description](./square-2.webp)

![Square image description](./square-3.webp)

![Landscape image description](./landscape-1.webp)
:::
````

:::grid{columns="4" aspect="1/1"}
![Four-column image one](/Images/demos/image-grid-demo/square-1.webp "Square 1")

![Four-column image two](/Images/demos/image-grid-demo/square-2.webp "Square 2")

![Four-column image three](/Images/demos/image-grid-demo/square-3.webp "Square 3")

![Four-column image four](/Images/demos/image-grid-demo/landscape-1.webp "Landscape 1")
:::

### Five Columns

Five columns verify a higher supported column count. With fewer images than columns, the final row stays left-aligned instead of stretching.

````markdown
:::grid{columns="5" aspect="1/1"}
![Thumbnail description](./thumb-1.webp)

![Thumbnail description](./thumb-2.webp)

![Thumbnail description](./thumb-3.webp)

![Thumbnail description](./thumb-4.webp)

![Thumbnail description](./thumb-5.webp)
:::
````

:::grid{columns="5" aspect="1/1"}
![Five-column image one](/Images/demos/image-grid-demo/square-1.webp "1")

![Five-column image two](/Images/demos/image-grid-demo/square-2.webp "2")

![Five-column image three](/Images/demos/image-grid-demo/square-3.webp "3")

![Five-column image four](/Images/demos/image-grid-demo/landscape-1.webp "4")

![Five-column image five](/Images/demos/image-grid-demo/landscape-2.webp "5")
:::

### Six Columns

Six columns are the current maximum. They work best for very dense thumbnail previews or portfolios.

````markdown
:::grid{columns="6" aspect="1/1"}
![Image description](./image-1.webp)

![Image description](./image-2.webp)

![Image description](./image-3.webp)

![Image description](./image-4.webp)

![Image description](./image-5.webp)

![Image description](./image-6.webp)
:::
````

:::grid{columns="6" aspect="1/1"}
![Six-column image one](/Images/demos/image-grid-demo/square-1.webp "1")

![Six-column image two](/Images/demos/image-grid-demo/square-2.webp "2")

![Six-column image three](/Images/demos/image-grid-demo/square-3.webp "3")

![Six-column image four](/Images/demos/image-grid-demo/landscape-1.webp "4")

![Six-column image five](/Images/demos/image-grid-demo/landscape-2.webp "5")

![Six-column image six](/Images/demos/image-grid-demo/landscape-3.webp "6")
:::

### Single Column

One column is suitable when an image needs a larger reading size. It stays one column on desktop, tablet, and mobile.

````markdown
:::grid{columns="1" aspect="16/9"}
![Image description](./detail.webp)
:::
````

:::grid{columns="1" aspect="16/9"}
![Single-column test image](/Images/demos/image-grid-demo/landscape-1.webp)
:::

## Aspect Ratios

The `aspect` value controls the card shape, not the original file ratio.

### 16:9

Best for landscapes, screenshots, and video frames.

:::grid{columns="3" aspect="16/9"}
![16:9 test image one](/Images/demos/image-grid-demo/landscape-1.webp "Landscape 1")

![16:9 test image two](/Images/demos/image-grid-demo/landscape-2.webp "Landscape 2")

![16:9 test image three](/Images/demos/image-grid-demo/landscape-3.webp "Landscape 3")
:::

### 3:4

Best for portraits, posters, and mobile screenshots.

:::grid{columns="3" aspect="3/4"}
![3:4 test image one](/Images/demos/image-grid-demo/portrait-1.webp "Portrait 1")

![3:4 test image two](/Images/demos/image-grid-demo/portrait-2.webp "Portrait 2")

![3:4 test image three](/Images/demos/image-grid-demo/portrait-3.webp "Portrait 3")
:::

### 1:1

Best for square thumbnails and avatar-like images.

:::grid{columns="3" aspect="1/1"}
![1:1 test image one](/Images/demos/image-grid-demo/square-1.webp "Square 1")

![1:1 test image two](/Images/demos/image-grid-demo/square-2.webp "Square 2")

![1:1 test image three](/Images/demos/image-grid-demo/square-3.webp "Square 3")
:::

## Fit Modes

### `cover`

`cover` is the default. Images are cropped from the center to fill the card, keeping the grid consistent. Use it when a uniform layout matters more than showing every edge.

:::grid{columns="3" aspect="16/9" fit="cover"}
![Cover portrait image one](/Images/demos/image-grid-demo/portrait-1.webp "Cover: center crop")

![Cover portrait image two](/Images/demos/image-grid-demo/portrait-2.webp "Cover: fill the card")

![Cover portrait image three](/Images/demos/image-grid-demo/portrait-3.webp "Cover: consistent layout")
:::

### `contain`

`contain` preserves the complete original. When the image ratio differs from the card ratio, the theme background remains visible. Use it for edge-critical content such as screenshots with important borders.

:::grid{columns="3" aspect="16/9" fit="contain"}
![Contain portrait image one](/Images/demos/image-grid-demo/portrait-1.webp "Contain: preserve the complete original")

![Contain portrait image two](/Images/demos/image-grid-demo/portrait-2.webp "Contain: empty space may appear")

![Contain portrait image three](/Images/demos/image-grid-demo/portrait-3.webp "Contain: suitable for edge details")
:::

## Captions and Alt Text

The image alt text is the default caption. When an image has an optional title, the title is used as the caption instead.

```markdown
![This text is both alt text and the caption](./image.webp)
![This title overrides the alt text as the caption](./image.webp "Caption shown below the image")
```

Long captions stay bottom-aligned with the other captions in the same row.

:::grid{columns="3" aspect="1/1"}
![This image has no title, so its alt text is the caption](/Images/demos/image-grid-demo/square-1.webp)

![Second square image with accessible alt text](/Images/demos/image-grid-demo/square-2.webp "This title is displayed as the caption")

![Accessible description of a square image](/Images/demos/image-grid-demo/square-3.webp "This is a longer caption for checking that every caption remains aligned to the bottom of its card when it wraps")
:::

## Independent Lightbox Groups

Each `:::grid` is a separate Fancybox group. Clicking an image in one grid only navigates through the images in that grid, not through the other grid.

:::grid{columns="3" aspect="16/9"}
![First group image one](/Images/demos/image-grid-demo/landscape-1.webp "Group A: Landscape 1")

![First group image two](/Images/demos/image-grid-demo/landscape-2.webp "Group A: Landscape 2")

![First group image three](/Images/demos/image-grid-demo/landscape-3.webp "Group A: Landscape 3")
:::

:::grid{columns="3" aspect="1/1"}
![Second group image one](/Images/demos/image-grid-demo/square-1.webp "Group B: Square 1")

![Second group image two](/Images/demos/image-grid-demo/square-2.webp "Group B: Square 2")

![Second group image three](/Images/demos/image-grid-demo/square-3.webp "Group B: Square 3")
:::

## Responsive Behavior

- Below `768px`, grids use at most two columns.
- Below `480px`, grids switch to one column.
- A `columns="1"` grid always stays one column.
- A grid with fewer images than columns keeps the remaining tracks empty; images are not stretched to fill the row.

## Common Mistakes

1. **No blank line between images** — images must be separate paragraphs.
2. **Putting text inside `:::grid`** — only images belong in the container.
3. **Using an invalid `columns` value** — values outside `1`–`6` silently fall back to `3`.
4. **Using `fit="contain"` when a uniform grid is required** — empty background space may appear; this is expected, not a bug.
5. **Forgetting captions matter** — use meaningful alt text; it doubles as the caption and improves accessibility.
6. **Using `/images/...` when the repo actually stores files under `/Images/...`** — paths are case-sensitive on Linux/GitHub Pages; check the actual `public/` directory case.

## Verification Checklist

Use this checklist when testing the gallery feature:

- [ ] Images in each grid have consistent card dimensions.
- [ ] Captions appear below the cards and stay bottom-aligned.
- [ ] `columns` values `1`, `2`, `3`, `4`, `5`, and `6` render correctly on desktop.
- [ ] `aspect` values `16/9`, `3/4`, and `1/1` produce the expected card shapes.
- [ ] `fit="cover"` crops and fills; `fit="contain"` shows the full image with possible empty space.
- [ ] Clicking an image opens Fancybox, and navigation is limited to the current grid.
- [ ] Ordinary images outside grids are not merged into a grid lightbox group.
- [ ] Below `768px`, grids use at most two columns; below `480px`, they use one column.
