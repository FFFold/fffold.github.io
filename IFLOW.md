# 🍥Fuwari 项目上下文 (IFLOW.md)

## 1. 项目概述

- **项目名称**: 🍥Fuwari (请勿折叠)
- **项目类型**: 基于 Astro 的静态博客模板
- **主要技术**: Astro, Tailwind CSS, Svelte, Expressive Code, Pagefind, Biome
- **项目描述**: 一个美观、功能丰富的静态博客网站，支持暗色模式、自定义主题、搜索功能、Markdown 扩展语法等。该项目基于Fuwari模板进行定制化开发。

## 2. 构建和运行

- **依赖安装**: `pnpm install`
- **本地开发**: `pnpm dev` (访问 http://localhost:4321)
- **构建生产**: `pnpm build`
- **本地预览**: `pnpm preview`
- **代码检查**: `pnpm check`
- **类型检查**: `pnpm type-check`
- **代码格式化**: `pnpm format`
- **代码 lint**: `pnpm lint`
- **新建文章**: `pnpm new-post <filename>`

## 3. 开发规范

- **代码风格**: 使用 Biome 进行代码格式化和检查
- **提交信息**: 推荐使用 Conventional Commits 格式
- **贡献流程**: 提交前运行 `pnpm check` 和 `pnpm format`
- **包管理器**: 使用 pnpm (版本 9.14.4)

## 4. 目录结构说明

- `src/`: 源代码目录
  - `config.ts`: 站点配置文件
  - `content/`: 博客文章和页面内容
  - `components/`: UI 组件
  - `layouts/`: 页面布局
  - `pages/`: 页面路由
  - `styles/`: 样式文件
  - `plugins/`: 自定义插件
  - `assets/`: 静态资源文件
  - `constants/`: 常量定义
  - `i18n/`: 国际化配置
  - `types/`: TypeScript 类型定义
  - `utils/`: 工具函数
- `public/`: 静态资源目录
- `scripts/`: 脚本文件
- `docs/`: 多语言文档

## 5. 核心功能

- **主题定制**: 支持自定义主题颜色和横幅图片
- **多语言支持**: 内置多语言支持 (中、英、日、韩等)
- **Markdown 扩展**: 支持 Admonitions、GitHub 卡片等扩展语法
- **代码高亮**: 使用 Expressive Code 进行代码块渲染
- **搜索功能**: 集成 Pagefind 实现全文搜索
- **响应式设计**: 适配不同屏幕尺寸的设备
- **RSS 订阅**: 自动生成 RSS 订阅源
- **平滑动画**: 页面过渡和交互动画效果

## 6. 配置说明

- **站点配置**: `src/config.ts` 包含站点标题、副标题、语言、主题颜色等配置
- **导航栏**: 在 `src/config.ts` 中配置导航链接
- **个人信息**: 在 `src/config.ts` 中配置头像、姓名、简介和社交链接
- **许可证**: 在 `src/config.ts` 中配置站点内容的许可证信息
- **代码高亮**: 在 `src/config.ts` 中配置 Expressive Code 主题

## 7. 国际化

项目支持多语言，语言文件位于 `src/i18n/languages/` 目录下。可通过 `src/config.ts` 中的 `lang` 配置项设置默认语言。