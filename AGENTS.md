# AGENTS.md

## Quick reference

- **Stack**: Astro 6.4 + Svelte 5 + Tailwind CSS 4 (Vite plugin, not PostCSS) + Stylus + MDX
- **Package manager**: pnpm — enforced via `preinstall` hook + `.npmrc` `manage-package-manager-versions`
- **Linter/formatter**: Biome 2.5.9 (not ESLint/Prettier)
- **Site config**: `src/config.ts` (title, nav, profile, banner, announcement, expressive-code theme)
- **Content collections**: `src/content/posts/` (blog posts), `src/content/spec/` (about, friends) — Astro Content Layer API with `glob` loader
- **Deploy**: GitHub Pages (`.github/workflows/deploy.yml`, `withastro/action@v3`, Node 22)

## Branch workflow (IMPORTANT)

- **All code/architecture development happens only on `dev`.** Real blog post content does **not** live on `dev`.
- **`main` is the content branch.** Real posts (date-prefixed dirs like `260531/AstroV6Migration.mdx`) live only here; code reaches `main` solely through periodic one-way merges from `dev`.
- **Never write real post content to `dev`.** `dev` intentionally keeps only framework/sample posts (`draft.mdx`, `markdown.md`, `expressive-code.md`, `guide/`, `video.md`, …) for testing features.
- **Merging is strictly one-way `dev` → `main`.** Never merge `main` back into `dev`; content-only changes on `main` are never pulled down.

## Commands

| Purpose | Command |
|---|---|
| Dev server | `pnpm dev` (localhost:4321) |
| Production build + Pagefind index | `pnpm build` (runs `astro build` then `pagefind --site dist`) |
| Local preview of build | `pnpm preview` |
| Type check | `pnpm type-check` (`astro sync && tsc --noEmit --isolatedDeclarations`) — passes and is enforced in CI |
| Astro diagnostics | `pnpm check` |
| Lint + auto-fix | `pnpm lint` (`biome check --write ./src`) |
| Format only | `pnpm format` (`biome format --write ./src`) |
| New post | `pnpm new-post <path>` (e.g. `pnpm new-post 250826/PostTitle`; creates nested date dirs; frontmatter `title` = filename, fix it) |

## CI / workflows

Three workflows target `main` (push/PR where applicable):

1. **Code quality** (`.github/workflows/biome.yml`): `biome ci ./src --reporter=github` (Biome pinned to 2.5.9)
2. **Build and Check** (`.github/workflows/build.yml`): Node **22 and 24** matrix. The check job runs `pnpm astro check`; the build job runs `pnpm type-check` then `pnpm build` (including Pagefind).
3. **Deploy** (`.github/workflows/deploy.yml`): runs on push/`workflow_dispatch`, `withastro/action@v3` with Node 22, deploys to GitHub Pages

CI uses `pnpm install --frozen-lockfile`. Both build and deploy jobs configure SSH (`secrets.SSH_KEY`) for private dependencies.

**Before committing**: run `pnpm lint`, `pnpm check`, and `pnpm type-check`. Run `pnpm build` for build/content-affecting changes.

## Architecture

- **Layouts**: `src/layouts/Layout.astro` (base), `MainGridLayout.astro` (grid with sidebar)
- **Pages**: `src/pages/[...page].astro` (homepage/pagination), `src/pages/posts/[...slug].astro` (post routes), plus static `about.astro`, `archive.astro`, `friends.astro` and generated `rss.xml.ts`, `robots.txt.ts`. RSS full content is rendered with `astro:content` `render()` + `AstroContainer` (MDX renderer registered in `rss.xml.ts`), then sanitized with `sanitize-html`.
- **Components**: `src/components/` — Svelte 5 (`.svelte`) for interactive bits (search with 250ms debounce + stale-result guard, light/dark toggle, archive/heatmap), Astro (`.astro`) for static shells
- **Plugins**: `src/plugins/` — custom remark/rehype for reading time, excerpts, admonitions, GitHub cards, directives, expressive-code extensions
- **i18n**: `src/i18n/` — translation keys
- **Styles**: `src/styles/` — Tailwind v4 (`tailwind.css`), Stylus (`.styl`), plain CSS; KaTeX CSS is imported statically in `Layout.astro` frontmatter
- **Types**: `src/types/config.ts` defines all config interfaces

## Path aliases

`@components/*`, `@assets/*`, `@constants/*`, `@utils/*`, `@i18n/*`, `@layouts/*`, `@/*` → `src/*`

## Code style

- **Indentation**: tabs (Biome default)
- **Quotes**: double quotes in JS/TS
- **Svelte/Astro relaxation**: `useConst`, `useImportType`, `noUnusedVariables`, `noUnusedImports` off for `.svelte`/`.astro`/`.vue` (Biome overrides)
- **Excluded from Biome**: `src/**/*.css`, `src/public/**/*`, `dist/**/*`, `node_modules/**/*`; Stylus (`.styl`) is unchecked by Biome

## Content authoring

When creating or editing posts, load the repo skill `creating-blog-post` (`.agents/skills/creating-blog-post/`) — it covers frontmatter schema, Chinese content conventions, admonitions, image layouts, and verification. Note: real posts are authored on `main`, not `dev` (see Branch workflow).

Posts use Astro content collections (`src/content.config.ts`):
- Required: `title` (string), `published` (date)
- Optional: `updated`, `draft`, `description`, `image`, `tags`, `category`, `lang`, `pinned`
- Internal: `prevTitle`, `prevSlug`, `nextTitle`, `nextSlug` — auto-populated, do not set

Post folder convention: date-prefixed subdirs like `250826/PostTitle.md`. `pnpm new-post` handles nested paths (e.g. `pnpm new-post 250826/PostTitle`).

### MDX

Use `.mdx` when you need `astro:assets` `<Image />` for optimized WebP images or JSX components. Store images in `{postname}.assets/` alongside the post file. Use plain `.md` with `![]()` for simple posts.

## Build quirks

- `pnpm build` → `astro build` then `pagefind --site dist` (indexes built HTML, not source)
- Pagefind config (`pagefind.yml`) excludes KaTeX elements, `[data-pagefind-ignore]`, `.search-panel`, and `#search-panel` from indexing
- Swup animation class is `transition-swup-` (not default `transition-`) — avoids Tailwind `transition-all` conflict
- Expressive Code theme must be dark (`github-dark`) — only dark code backgrounds supported
- Astro is configured with `trailingSlash: "always"` — internal links should include the trailing slash (e.g. `/about/`, not `/about`)
- Vite suppresses dynamic/static import duplicate warning in `astro.config.mjs`
- **OverlayScrollbars CSS must be in frontmatter, NOT in `<script>`** — CSS imports in `<script>` are dynamically injected by Vite in dev mode. Swup's `updateHead: true` removes them during navigation, causing native scrollbar. Static CSS (frontmatter imports) is preserved.
- **Never use `data-overlayscrollbars-initialize`** — it auto-initializes on the element, conflicting with manual `initCustomScrollbar()` on `<body>`.
- **Always save/restore `html.style.overflow`** in Swup hooks — `page:view` must restore the saved value (not `''`) to avoid clearing OverlayScrollbars' own `overflow: hidden`.
- **Banner height `--banner-height-extend` needs px value, fallback, and transition suppression** — the `is:inline` `<head>` script computes it from `window.innerHeight * (BANNER_HEIGHT_EXTEND / 100)`, rounded down to a multiple of 4. Edge session restore/cold start may first run in a hidden tab (`innerHeight === 0`), so all uses keep a `var(--banner-height-extend, 30vh)` fallback and recalc on `visibilitychange`/`pageshow`/resize. While recalculating, add `html.banner-extend-recalc`, force a reflow before changing the value, then remove the class in `requestAnimationFrame` so the 700ms banner transition is suppressed; otherwise the banner dips/floats on cold start. `#banner-wrapper` top must use `calc(-1 * var(--banner-height-extend, 30vh))`, not a fixed `-30vh` (see inline script and CSS in `Layout.astro`).
- **KaTeX CSS is static, not runtime-injected** — `Layout.astro` imports `katex/dist/katex.min.css` in frontmatter. Do not reintroduce `loadKatexCssIfNeeded()` or duplicate `public/katex.min.css`.
- **PhotoSwipe is lazy-loaded only on gallery pages** — the second `Layout.astro` script dynamically imports `photoswipe/lightbox` + `photoswipe` when `.custom-md img, #post-cover img` exists. On Swup `content:replace` (before hook), destroy the lightbox and reset `photoswipeReady` so a stale lightbox never binds to old DOM.
- **ECharts must stay tree-shaken** — `CalendarHeatmap.svelte` imports only `echarts/core` plus the heatmap/calendar/tooltip/visualMap components and `CanvasRenderer`; do not import the full `echarts` package.
- **`<widget-layout>` is defined once in the `Layout.astro` global module** — the previous `WidgetLayout.astro` inline definition was removed to avoid one copy per widget instance.
- **Run-once inline scripts** must be marked `data-swup-ignore-script`; document-level handlers (code copy, `<widget-layout>` definition) live in the global `Layout.astro` module so Swup navigation does not stack listeners.
- **OG/Twitter image resolution depends on `src/utils/banner-utils.ts`** — `bannerAssetRegistry` maps `src/config.ts` banner source strings to imported `astro:assets` images. Update the registry when changing `siteConfig.banner.src`, or social images break.

### Known warnings/hints (non-fatal)

- `astro check` / `astro sync` / `astro build` emit two Astro 6 deprecations:
  - `markdown.remarkPlugins`, `markdown.rehypePlugins`, and `markdown.remarkRehype` are deprecated.
  - `markdown.gfm` and `markdown.smartypants` are deprecated.
  Both are migration artifacts; safe to ignore for now.
- Build produces 3 CSS optimization warnings (`Unexpected token Delim('&')`) from generated Tailwind classes — non-fatal, output is correct.
- `pnpm check` currently exits 0 with 4 hints: Giscus script `is:inline` hint, `document.execCommand` deprecation in `SocialShare.astro` and `Layout.astro`, and unused `_cssVar` in `language-badge.ts`.

### Type-check notes

`pnpm type-check` runs `astro sync && tsc --noEmit --isolatedDeclarations`, currently passes, and is enforced by the CI build job.

- `src/content.config.ts` must keep the explicit `Record<string, CollectionConfig<any, any>>` annotation — `--isolatedDeclarations` cannot infer an object literal of multiple `defineCollection()` results (TS9013).
- Exported functions/constants across `src/` need explicit types for `--isolatedDeclarations`; add them when writing new code.

## Git / PR

- Conventional Commits format per `CONTRIBUTING.md`
- PRs should be single-purpose; run `pnpm lint`, `pnpm check`, and `pnpm type-check` before submitting (`pnpm build` for build/content-affecting changes)
- Follow the branch workflow above: open PRs against `dev` for code changes; `main` receives real-post content commits directly and code only via `dev` → `main` merges

## Docs

- Root `README.md` (Chinese) is mirrored as translations in `docs/README.*.md` (es, id, ja, ko, th, vi, zh-CN) — keep them in sync when editing the README.