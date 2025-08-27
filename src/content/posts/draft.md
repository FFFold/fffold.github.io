---
title: Draft Example
published: 2050-01-01
tags: [Markdown, Blogging, Demo]
category: Examples
draft: false
---

# This Article is a Draft

This article is currently in a draft state and is not published. Therefore, it will not be visible to the general audience. The content is still a work in progress and may require further editing and review.

When the article is ready for publication, you can update the "draft" field to "false" in the Frontmatter:

```markdown
---
title: Draft Example
published: 2024-01-11T04:40:26.381Z
tags: [Markdown, Blogging, Demo]
category: Examples
draft: false
---
```
---
# 图片改色

这是一个普通的句子，其中<span class="text-red-500">这个词是红色</span>，而<span class="text-blue-500 font-bold">这个词是蓝色加粗</span>。

你可以在 [Tailwind 官方颜色表](https://tailwindcss.com/docs/customizing-colors) 中查找更多颜色。

---


# 图片并排显示解决方案

注意要相对public文件夹写路径，斜杠正反都可以

<figure style="display:flex; gap:1rem; justify-content:center; flex-wrap:wrap;">
  <img src="/Images/test-image.jpg" alt="图一" style="width:45%; min-width:240px;">
  <img src="/Images/test-image.jpg" alt="图二" style="width:45%; min-width:240px;"> 
  <figcaption style="width:100%; text-align:center; margin-top:0.5rem;">
    这里写居中的文字
  </figcaption>
</figure>