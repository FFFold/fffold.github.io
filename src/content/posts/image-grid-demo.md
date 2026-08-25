---
title: Image Grid Demo
published: 2024-05-01
updated: 2026-07-15
description: 'A minimal sample for testing the :::grid gallery feature.'
tags: [Demo, Example, Markdown, Gallery, Image Grid]
category: 'Examples'
draft: true
---

`:::grid` is the blog's image gallery container directive. It arranges ordinary Markdown images in a responsive grid and enables Fancybox lightbox viewing.

## Minimal Syntax

Write Markdown images directly between `:::grid` and the closing `:::`:

````markdown
:::grid
![Image description](/Images/demos/image-grid-demo/landscape-1.webp)

![Image description](/Images/demos/image-grid-demo/landscape-2.webp)
:::
````

Each image must occupy its own paragraph, with a blank line between images.

:::grid
![Minimal syntax result: first image](/Images/demos/image-grid-demo/landscape-1.webp)

![Minimal syntax result: second image](/Images/demos/image-grid-demo/landscape-2.webp)
:::

## Parameters

| Parameter | Allowed values | Default | Purpose |
| --- | --- | --- | --- |
| `columns` | Integers from `1` to `6` | `3` | Number of columns per row on desktop. |
| `aspect` | A positive ratio, such as `16/9`, `3/4`, or `1/1` | `16/10` | The displayed card ratio. |
| `fit` | `cover`, `contain` | `cover` | `cover` crops to fill; `contain` preserves the complete image. |

:::grid{columns="3" aspect="16/9" fit="cover"}
![Parameter example: first landscape image](/Images/demos/image-grid-demo/landscape-1.webp "Landscape caption 1")

![Parameter example: second landscape image](/Images/demos/image-grid-demo/landscape-2.webp "Landscape caption 2")

![Parameter example: third landscape image](/Images/demos/image-grid-demo/landscape-3.webp "Landscape caption 3")
:::

## Captions and Lightbox

The image alt text is the default caption. When an image has an optional title, the title is used as the caption instead. Clicking any grid image opens Fancybox; navigation is limited to the current `:::grid` container.

:::grid{columns="3" aspect="1/1"}
![This image has no title, so its alt text is the caption](/Images/demos/image-grid-demo/square-1.webp)

![Second square image with accessible alt text](/Images/demos/image-grid-demo/square-2.webp "This title is displayed as the caption")

![Accessible description of a square image](/Images/demos/image-grid-demo/square-3.webp "This is a longer caption for checking bottom alignment")
:::

## Fit Modes

`cover` is the default and crops images to fill the card. `contain` preserves the complete original and may leave theme-background space.

:::grid{columns="3" aspect="16/9" fit="contain"}
![Portrait image one](/Images/demos/image-grid-demo/portrait-1.webp "Contain: preserve the complete original")

![Portrait image two](/Images/demos/image-grid-demo/portrait-2.webp "Contain: empty space may appear")

![Portrait image three](/Images/demos/image-grid-demo/portrait-3.webp "Contain: suitable for edge details")
:::
