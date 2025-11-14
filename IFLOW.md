# 项目概述

这是一个使用 [Astro](https://astro.build) 和 [Tailwind CSS](https://tailwindcss.com) 构建的静态博客，基于 Fuwari 模板。该博客具有现代化的设计，支持浅色/深色模式、响应式布局和多种内容展示功能。

## 核心技术

- **Astro 5.15.3**: 用于构建快速、优化网站的静态站点生成器
- **Tailwind CSS**: 用于样式的实用优先 CSS 框架
- **Svelte**: 用于交互式 UI 组件
- **TypeScript**: 用于类型安全的开发
- **Pagefind**: 用于搜索功能
- **Expressive Code**: 增强的代码块渲染
- **KaTeX**: 数学符号渲染
- **Swup**: 页面过渡动画
- **Biome**: 代码格式化和 linting
- **Stylus**: CSS 预处理器用于样式
- **Photoswipe**: 图像库功能
- **Overlayscrollbars**: 自定义滚动条
- **Sharp**: 图像优化

## 项目结构

```
src/
├── assets/           # 静态资源 (图像)
├── components/       # 可重用的 UI 组件
├── config.ts         # 站点配置
├── constants/        # 应用程序常量
├── content/          # 博客文章和特殊页面
│   ├── posts/        # Markdown 博客文章
│   └── spec/         # 特殊页面 (关于, 朋友)
├── i18n/             # 国际化文件
├── layouts/          # 页面布局
├── pages/            # 页面路由
├── plugins/          # 自定义 remark/rehype 插件
├── styles/           # CSS 样式表
├── types/            # TypeScript 类型定义
└── utils/            # 工具函数
```

## 配置文件

- `astro.config.mjs`: 主 Astro 配置文件，包含集成
- `package.json`: 依赖项和脚本
- `tsconfig.json`: TypeScript 配置
- `tailwind.config.cjs`: Tailwind CSS 配置
- `biome.json`: 代码格式化和 linting 规则
- `pagefind.yml`: 搜索配置

# 构建和运行

## 先决条件

- Node.js >= 20
- pnpm >= 9

## 开发命令

所有命令都从项目根目录运行：

```bash
# 安装依赖
pnpm install

# 启动开发服务器，地址为 http://localhost:4321
pnpm dev

# 构建生产站点到 ./dist/
pnpm build

# 在本地预览生产构建
pnpm preview

# 创建新博客文章
pnpm new-post <filename>

# 检查 TypeScript 错误
pnpm check

# 使用 Biome 格式化代码
pnpm format

# 使用 Biome lint 代码
pnpm lint
```

## 部署

该站点可以部署到 Vercel、Netlify、GitHub Pages 或其他静态托管提供商。构建命令会在 `dist/` 目录中生成静态文件。

在部署之前，请在 `astro.config.mjs` 中更新 `site` 属性以匹配您的域名。

# 内容管理

## 创建文章

使用脚本创建新文章：

```bash
pnpm new-post <filename>
```

这将在 `src/content/posts/` 中创建一个新的 Markdown 文件，并带有 frontmatter。

## 文章 Frontmatter

```yaml
---
title: My First Blog Post
published: 2023-09-09
description: This is the first post of my new Astro blog.
image: ./cover.jpg
tags: [Foo, Bar]
category: Front-end
draft: false
lang: jp      # 仅当文章的语言与站点语言不同时设置
---
```

## 扩展的 Markdown 功能

博客支持几种扩展的 Markdown 功能：

- **Admonitions**: Note, tip, important, caution, warning 块
- **GitHub 仓库卡片**: 显示仓库信息
- **增强的代码块**: 带有语法高亮、行号、可折叠部分、语言徽章和自定义复制按钮
- **数学符号**: 使用 KaTeX
- **自动生成的目录**: 从标题生成
- **阅读时间估算**: 自动计算
- **文章摘要**: 第一段自动用作摘要
- **图像库**: 与 Photoswipe 集成

# 开发约定

## 代码风格

- 使用 Biome 进行代码格式化，使用制表符进行缩进
- JavaScript/TypeScript 中的字符串使用双引号
- 启用严格 TypeScript 并启用 null 检查
- 自动组织导入

## 组件结构

- 组件主要使用 Astro 和 Svelte 编写
- 使用 Tailwind 类进行样式设计
- 遵循 `src/components/` 中的现有组件模式

## 样式

- Tailwind CSS 用于实用类
- 自定义 CSS 变量用于主题
- 使用 `dark:` 变体支持深色模式
- 响应式设计采用移动优先方法
- Stylus 用于扩展 CSS 功能
- 使用 OverlayScrollbars 自定义滚动条

## 国际化

- 通过 `src/i18n/` 支持多种语言
- 在 `src/config.ts` 中配置默认语言
- UI 中提供语言切换

## 配置

- 站点配置在 `src/config.ts` 中
- 导航、个人资料和许可证设置可自定义
- 主题颜色和横幅设置可配置
- Expressive Code 主题设置可用

## 自定义点

1. **站点标识**: 修改 `src/config.ts` 中的 `siteConfig`、`navBarConfig` 和 `profileConfig`
2. **主题颜色**: 调整 `siteConfig.themeColor` 中的 `hue` 值
3. **横幅图像**: 使用您的图像路径更新 `siteConfig.banner.src`
4. **导航链接**: 修改 `navBarConfig.links` 数组
5. **社交链接**: 更新 `profileConfig.links` 数组
6. **许可证**: 更改 `licenseConfig` 设置

## 内容组织

- 文章存储在 `src/content/posts/` 中，格式为 Markdown 文件
- 特殊页面 (关于, 朋友) 在 `src/content/spec/` 中
- 图像可以与文章一起放置，也可以放在 assets 文件夹中
- 标签和类别会从 frontmatter 自动生成

## 性能特性

- 静态站点生成以实现快速加载
- 使用 Sharp 进行图像优化
- JavaScript 包的代码分割
- 使用 Swup 的页面过渡动画
- 使用 OverlayScrollbars 的自定义滚动条
- 使用 Pagefind 的搜索索引
- 文章的阅读时间估算
- 用于更好 SEO 的文章摘要