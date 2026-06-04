# AGENTS.md

## Quick reference

- **Stack**: Astro 6.4 + Svelte 5 + Tailwind CSS 4 (Vite plugin, not PostCSS) + Stylus + MDX
- **Package manager**: pnpm — enforced via `preinstall` hook + `.npmrc` `manage-package-manager-versions`
- **Linter/formatter**: Biome 2.4 (not ESLint/Prettier)
- **Site config**: `src/config.ts` (title, nav, profile, banner, announcement, expressive-code theme)
- **Content collections**: `src/content/posts/` (blog posts), `src/content/spec/` (about, friends) — Astro Content Layer API with `glob` loader
- **Deploy**: GitHub Pages (`.github/workflows/deploy.yml`, `withastro/action@v3`, Node 22)


## Commands

| Purpose | Command |
|---|---|
| Dev server | `pnpm dev` (localhost:4321) |
| Production build + Pagefind index | `pnpm build` (runs `astro build` then `pagefind --site dist`) |
| Local preview of build | `pnpm preview` |
| Type check | `pnpm type-check` (`tsc --noEmit --isolatedDeclarations`) — **currently fails, do not rely on** |
| Astro diagnostics | `pnpm check` |
| Lint + auto-fix | `pnpm lint` (`biome check --write ./src`) |
| Format only | `pnpm format` (`biome format --write ./src`) |
| New post | `pnpm new-post <filename>` (creates in `src/content/posts/` root) |

## CI / workflows

Three separate workflows run on push/PR to `main`:

1. **Code quality** (`.github/workflows/biome.yml`): `biome ci ./src --reporter=github`
2. **Build and Check** (`.github/workflows/build.yml`): `pnpm astro check` + `pnpm astro build` on Node **22 and 24**
3. **Deploy** (`.github/workflows/deploy.yml`): `withastro/action@v3` with Node 22, pushes to GitHub Pages

CI uses `pnpm install --frozen-lockfile`. Both build and deploy jobs configure SSH (`secrets.SSH_KEY`) for private dependencies.

**Before committing**: run `pnpm lint` and `pnpm check`. Do **not** rely on `pnpm type-check` (see below).

## Architecture

- **Layouts**: `src/layouts/Layout.astro` (base), `MainGridLayout.astro` (grid with sidebar)
- **Pages**: `src/pages/[...page].astro` (homepage/pagination), `src/pages/posts/[...slug].astro` (post routes)
- **Components**: `src/components/` — Svelte 5 (`.svelte`) for interactive bits (search, light/dark toggle, archive), Astro (`.astro`) for static shells
- **Plugins**: `src/plugins/` — custom remark/rehype for reading time, excerpts, admonitions, GitHub cards, directives, expressive-code extensions
- **i18n**: `src/i18n/` — translation keys
- **Styles**: `src/styles/` — Tailwind v4 (`tailwind.css`), Stylus (`.styl`), plain CSS
- **Types**: `src/types/config.ts` defines all config interfaces

## Path aliases

`@components/*`, `@assets/*`, `@constants/*`, `@utils/*`, `@i18n/*`, `@layouts/*`, `@/*` → `src/*`

## Code style

- **Indentation**: tabs (Biome default)
- **Quotes**: double quotes in JS/TS
- **Svelte/Astro relaxation**: `useConst`, `useImportType`, `noUnusedVariables`, `noUnusedImports` off for `.svelte`/`.astro`/`.vue` (Biome overrides)
- **CSS excluded**: Biome ignores `src/**/*.css`; Stylus unchecked by Biome

## Content authoring

Posts use Astro content collections (`src/content.config.ts`):
- Required: `title` (string), `published` (date)
- Optional: `updated`, `draft`, `description`, `image`, `tags`, `category`, `lang`, `pinned`
- Internal: `prevTitle`, `prevSlug`, `nextTitle`, `nextSlug` — auto-populated, do not set

Post folder convention: date-prefixed subdirs like `250826/PostTitle.md`. `pnpm new-post` creates in root only; nested dirs require manual creation.

### MDX

Use `.mdx` when you need `astro:assets` `<Image />` for optimized WebP images or JSX components. Store images in `{postname}.assets/` alongside the post file. Use plain `.md` with `![]()` for simple posts.

## Build quirks

- `pnpm build` → `astro build` then `pagefind --site dist` (indexes built HTML, not source)
- Pagefind config (`pagefind.yml`) excludes KaTeX elements and `.search-panel` from indexing
- Swup animation class is `transition-swup-` (not default `transition-`) — avoids Tailwind `transition-all` conflict
- Expressive Code theme must be dark (`github-dark`) — only dark code backgrounds supported
- Vite suppresses dynamic/static import duplicate warning in `astro.config.mjs`
- **OverlayScrollbars CSS must be in frontmatter, NOT in `<script>`** — CSS imports in `<script>` are dynamically injected by Vite in dev mode. Swup's `updateHead: true` removes them during navigation, causing native scrollbar. Static CSS (frontmatter imports) is preserved.
- **Never use `data-overlayscrollbars-initialize`** — it auto-initializes on the element, conflicting with manual `initCustomScrollbar()` on `<body>`.
- **Always save/restore `html.style.overflow`** in Swup hooks — `page:view` must restore the saved value (not `''`) to avoid clearing OverlayScrollbars' own `overflow: hidden`.
- **Banner height `--banner-height-extend` needs fallback + recalc** — this CSS variable is computed from `window.innerHeight * 0.30` in an `is:inline` `<head>` script. Edge session restore may load the page in a hidden tab where `innerHeight` is 0, breaking the home-page `translateY` layout. Must `var(..., 30vh)` CSS fallback + `visibilitychange`/`pageshow` listeners for recalculation (see inline script and CSS in `Layout.astro`).

### Known warnings (non-fatal)

- `astro check` / `astro build` emit: "`markdown.remarkPlugins`, `markdown.rehypePlugins`, and `markdown.remarkRehype` are deprecated." — Astro 6 migration artifact; safe to ignore for now.
- Build produces 3 CSS optimization warnings (`Unexpected token Delim('&')`) from generated Tailwind classes — non-fatal, output is correct.

### Type-check failures

`pnpm type-check` currently fails with `--isolatedDeclarations` errors in:
- `src/constants/constants.ts` (missing explicit types)
- `src/content.config.ts` (inferred expression types)
- `src/pages/rss.xml.ts` (missing return type)
- `src/plugins/expressive-code/*.ts` (missing return types)
- `src/utils/*.ts` (missing return types)

These need explicit type annotations before the check can be used in CI. Do not block commits on this command.

## Git / PR

- Conventional Commits format per `CONTRIBUTING.md`
- PRs should be single-purpose; run `pnpm lint` and `pnpm check` before submitting