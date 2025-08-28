# 🍥Fuwari 项目上下文 (IFLOW.md)

## 1. 项目概述

- **项目名称**: 🍥Fuwari
- **项目类型**: 基于 Astro 的静态博客模板
- **主要技术**: Astro, Tailwind CSS, Svelte, Expressive Code, Pagefind, Biome
- **项目描述**: 一个美观、功能丰富的静态博客网站，支持暗色模式、自定义主题、搜索功能、Markdown 扩展语法等。

## 2. 构建和运行

- **依赖安装**: `pnpm install`
- **本地开发**: `pnpm dev` (访问 http://localhost:4321)
- **构建生产**: `pnpm build`
- **本地预览**: `pnpm preview`
- **代码检查**: `pnpm check`
- **代码格式化**: `pnpm format`
- **新建文章**: `pnpm new-post <filename>`

## 3. 开发规范

- **代码风格**: 使用 Biome 进行代码格式化和检查
- **提交信息**: 推荐使用 Conventional Commits 格式
- **贡献流程**: 提交前运行 `pnpm check` 和 `pnpm format`

## 4. 目录结构说明

- `src/`: 源代码目录
  - `config.ts`: 站点配置文件
  - `content/`: 博客文章和页面内容
  - `components/`: UI 组件
  - `layouts/`: 页面布局
  - `pages/`: 页面路由
  - `styles/`: 样式文件
  - `plugins/`: 自定义插件
- `public/`: 静态资源目录
- `scripts/`: 脚本文件