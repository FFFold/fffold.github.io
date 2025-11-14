# Project Overview

This is a static blog built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com), based on the Fuwari template. The blog features a modern design with light/dark mode, responsive layout, and various content presentation features.

## Key Technologies

- **Astro 5.15.3**: Static site generator for fast, optimized websites
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Svelte**: Used for interactive UI components
- **TypeScript**: For type-safe development
- **Pagefind**: For search functionality
- **Expressive Code**: Enhanced code block rendering
- **KaTeX**: Mathematical notation rendering
- **Swup**: Page transition animations
- **Biome**: Code formatting and linting

## Project Structure

```
src/
├── assets/           # Static assets (images)
├── components/       # Reusable UI components
├── config.ts         # Site configuration
├── constants/        # Application constants
├── content/          # Blog posts and special pages
│   ├── posts/        # Markdown blog posts
│   └── spec/         # Special pages (about, friends)
├── i18n/             # Internationalization files
├── layouts/          # Page layouts
├── pages/            # Page routes
├── plugins/          # Custom remark/rehype plugins
├── styles/           # CSS stylesheets
├── types/            # TypeScript type definitions
└── utils/            # Utility functions
```

## Configuration Files

- `astro.config.mjs`: Main Astro configuration with integrations
- `package.json`: Dependencies and scripts
- `tsconfig.json`: TypeScript configuration
- `tailwind.config.cjs`: Tailwind CSS configuration
- `biome.json`: Code formatting and linting rules
- `pagefind.yml`: Search configuration

# Building and Running

## Prerequisites

- Node.js >= 20
- pnpm >= 9

## Development Commands

All commands are run from the root of the project:

```bash
# Install dependencies
pnpm install

# Start development server at http://localhost:4321
pnpm dev

# Build production site to ./dist/
pnpm build

# Preview production build locally
pnpm preview

# Create a new blog post
pnpm new-post <filename>

# Check for TypeScript errors
pnpm check

# Format code with Biome
pnpm format

# Lint code with Biome
pnpm lint
```

## Deployment

The site can be deployed to Vercel, Netlify, GitHub Pages, or other static hosting providers. The build command generates static files in the `dist/` directory.

Before deployment, update the `site` property in `astro.config.mjs` with your domain.

# Content Management

## Creating Posts

Use the script to create a new post:

```bash
pnpm new-post <filename>
```

This creates a new Markdown file in `src/content/posts/` with frontmatter.

## Post Frontmatter

```yaml
---
title: My First Blog Post
published: 2023-09-09
description: This is the first post of my new Astro blog.
image: ./cover.jpg
tags: [Foo, Bar]
category: Front-end
draft: false
lang: jp      # Set only if the post's language differs from the site's language
---
```

## Extended Markdown Features

The blog supports several extended Markdown features:

- **Admonitions**: Note, tip, important, caution, warning blocks
- **GitHub repository cards**: Display repository information
- **Enhanced code blocks**: With syntax highlighting, line numbers, collapsible sections
- **Mathematical notation**: Using KaTeX
- **Automatic table of contents**: Generated from headings

# Development Conventions

## Code Style

- Uses Biome for code formatting with tabs for indentation
- Double quotes for strings in JavaScript/TypeScript
- Strict TypeScript with null checks enabled
- Organize imports automatically

## Component Structure

- Components are primarily in Astro and Svelte
- Use Tailwind classes for styling
- Follow the existing component patterns in `src/components/`

## Styling

- Tailwind CSS for utility classes
- Custom CSS variables for theming
- Dark mode support with `dark:` variants
- Responsive design with mobile-first approach

## Internationalization

- Supports multiple languages through `src/i18n/`
- Default language configured in `src/config.ts`
- Language switching available in UI

## Configuration

- Site configuration in `src/config.ts`
- Navigation, profile, and license settings customizable
- Theme color and banner settings configurable
- Expressive Code theme settings available

## Customization Points

1. **Site Identity**: Modify `siteConfig`, `navBarConfig`, and `profileConfig` in `src/config.ts`
2. **Theme Colors**: Adjust the `hue` value in `siteConfig.themeColor`
3. **Banner Image**: Update `siteConfig.banner.src` with your image path
4. **Navigation Links**: Modify `navBarConfig.links` array
5. **Social Links**: Update `profileConfig.links` array
6. **License**: Change `licenseConfig` settings

## Content Organization

- Posts are stored in `src/content/posts/` as Markdown files
- Special pages (About, Friends) in `src/content/spec/`
- Images can be placed alongside posts or in the assets folder
- Tags and categories are automatically generated from frontmatter

## Performance Features

- Static site generation for fast loading
- Image optimization with Sharp
- Code splitting for JavaScript bundles
- Page transition animations with Swup
- Custom scrollbars with OverlayScrollbars
- Search indexing with Pagefind