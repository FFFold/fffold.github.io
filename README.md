# 🍥FFFold 博客

基于 [Fuwari](https://fuwari.vercel.app) 模板构建的静态博客项目，模板基于 [Astro](https://astro.build) 和 [Tailwind CSS](https://tailwindcss.com) 。

[**🖥️ 站点地址**](https://fffold.github.io)

![预览图](https://raw.githubusercontent.com/saicaca/resource/main/fuwari/home.png)

## ✨ 功能特性

- [x] 使用 [Astro](https://astro.build) 和 [Tailwind CSS](https://tailwindcss.com) 构建
- [x] 流畅的动画和页面过渡效果
- [x] 浅色 / 深色模式
- [x] 可自定义的主题颜色和横幅
- [x] 响应式设计
- [x] 基于 [Pagefind](https://pagefind.app/) 的搜索功能
- [x] [扩展的 Markdown 功能](https://github.com/FFFold/fffold.github.io?tab=readme-ov-file#-markdown-扩展语法)
- [x] 文章目录
- [x] RSS 订阅
- [x] 代码高亮和行号显示
- [x] 数学公式渲染 (KaTeX)
- [x] 图片库功能 (Photoswipe)

## 🚀 快速开始

1. 克隆项目仓库:
    ```bash
    git clone https://github.com/FFFold/fffold.github.io.git
    cd fffold.github.io
    ```

2. 安装依赖:
    ```bash
    pnpm install
    ```
    如未安装 pnpm，请先运行 `npm install -g pnpm`

3. 启动开发服务器:
    ```bash
    pnpm dev
    ```
    项目将在 `localhost:4321` 上运行

4. 自定义配置:
    - 编辑 `src/config.ts` 来自定义您的博客
    - 修改 `src/content/spec/` 中的 `about.md` 和 `friends.md` 页面

5. 创建新文章:
    ```bash
    pnpm new-post <filename>
    ```
    文章将创建在 `src/content/posts/` 目录下

6. 构建生产版本:
    ```bash
    pnpm build
    ```

7. 部署博客到 Vercel、Netlify、GitHub Pages 等平台，具体请参考 [Astro 部署指南](https://docs.astro.build/zh-cn/guides/deploy/)。部署前请在 `astro.config.mjs` 中编辑站点配置。

## 📝 文章 Frontmatter

```yaml
---
title: 我的第一篇博客文章
published: 2023-09-09
description: 这是我新 Astro 博客的第一篇文章。
image: ./cover.jpg
tags: [Foo, Bar]
category: Front-end
draft: false
lang: zh-CN      # 仅当文章语言与站点语言不同时设置
---
```

## 🧩 Markdown 扩展语法

除了 Astro 默认支持的 [GitHub Flavored Markdown](https://github.github.com/gfm/) 外，还包含以下额外的 Markdown 功能:

- 提示框 (Admonitions) ([预览和使用方法](https://fuwari.vercel.app/posts/markdown-extended/#admonitions))
- GitHub 仓库卡片 ([预览和使用方法](https://fuwari.vercel.app/posts/markdown-extended/#github-repository-cards))
- 增强的代码块 ([预览](https://fuwari.vercel.app/posts/expressive-code/) / [文档](https://expressive-code.com/))
- 数学公式 (KaTeX)
- 图片库 (Photoswipe)

## ⚡ 命令说明

所有命令都在项目根目录下运行:

| 命令                       | 作用                                               |
| :------------------------- | :------------------------------------------------- |
| `pnpm install`             | 安装依赖                                           |
| `pnpm dev`                 | 启动本地开发服务器 `localhost:4321`                |
| `pnpm build`               | 构建生产版本到 `./dist/`                           |
| `pnpm preview`             | 本地预览构建结果                                   |
| `pnpm check`               | 检查代码中的错误                                   |
| `pnpm format`              | 使用 Biome 格式化代码                              |
| `pnpm new-post <filename>` | 创建新文章                                         |
| `pnpm astro ...`           | 运行 Astro CLI 命令，如 `astro add`, `astro check` |
| `pnpm astro --help`        | 获取 Astro CLI 帮助信息                            |

## 🛠️ 技术栈

- **Astro 6.4.2**: 静态站点生成器
- **Svelte**: 交互式 UI 组件
- **TypeScript**: 类型安全开发
- **Tailwind CSS**: 实用优先的 CSS 框架
- **Pagefind**: 本地搜索功能
- **Expressive Code**: 增强代码块渲染
- **KaTeX**: 数学公式渲染
- **Swup**: 页面过渡动画
- **Overlayscrollbars**: 自定义滚动条
- **Photoswipe**: 图片库功能
- **Biome**: 代码格式化和检查
- **Stylus**: CSS 预处理器

## 📄 许可证

本项目基于 MIT 许可证。

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FFFold%2Ffffold.github.io.svg?type=large&issueType=license)](https://app.fossa.com/projects/git%2Bgithub.com%2FFFold%2Ffffold.github.io?ref=badge_large&issueType=license)