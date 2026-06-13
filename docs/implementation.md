# Sellsword Software Website Implementation

## Audience

This document is for maintainers working in the repo today. After reading it, a maintainer should understand how the site is actually built now, what the build step is responsible for, and where complexity has intentionally been removed.

## Current State

The repo now follows a simple HTML-first model:

- public routes are authored as literal HTML files in the repo
- shared CSS and the small enhancement script are authored as normal source files
- the site is served as ordinary static files
- there is no page generation step
- the build is optional and exists only to package an optimized production copy

## Actual Stack

- HTML routes: hand-authored HTML files in the repo
- Styling: NASS plus `assets/site.css`
- Client enhancement: small `assets/theme.js` behavior
- Bundler: esbuild
- Dev server: small custom Node HTTP server
- Dependency layout: NAF and NASS are present as git submodules under `vendor/`

## Build And Development Model

Production build behavior:

- the HTML files are already complete and runnable without a build
- `npm run build` creates a clean `public/` directory for deployment
- during that build, the raw CSS and JS are bundled and minified into `public/dist/`
- the copied HTML files in `public/` are rewritten to use the bundled assets

Local development behavior:

- `npm run dev` starts the local static server
- the server serves the repo root
- the default local URL is `http://127.0.0.1:43556`

## Source Layout

The important source pieces are:

- top-level route HTML files such as `index.html`
- nested route directories such as `about/`, `products/`, and `projects/.../`
- `assets/site.css` for site-specific styles
- `assets/theme.js` for the small enhancement layer
- `assets/optimized-entry.js` as the production-only bundle entrypoint
- `assets/screenshots/` for project media
- `vendor/nass/src/entries/index.css` as the raw NASS stylesheet entrypoint

## Routing Model

Routing is file-based and directory-style.

Current public route families:

- `/`
- `/projects/`
- `/projects/:id/`
- `/products/`
- `/about/`

There is no client-side router in the runtime.

## Theme And Enhancement Model

The current enhancement model is intentionally small:

- NASS provides the theme tokens and base styling
- the site defaults to dark mode
- a small plain JavaScript script toggles light/dark mode
- the selected theme persists in local storage

If a future page needs a small interactive enhancement, it should follow the same pattern:

- HTML owns the document and content
- use plain JavaScript by default
- use `naf-html` only if there is a real reactive enhancement need

## Deployment Shape

The deployment model is simple:

- commit literal HTML route files
- keep the site runnable directly from source files
- use `npm run build` only when you want an optimized deployment package
- package only production files into `public/`
- serve `public/` in production
- no server-side rendering
- no backend runtime

## SEO And Metadata

SEO is handled directly in the HTML files:

- titles
- meta descriptions
- canonical URLs
- Open Graph tags
- Twitter tags
- JSON-LD structured data
- `sitemap.xml`

Because the pages are hand-authored, metadata changes are made directly in the relevant HTML file.

## Remaining Implementation Work

The next meaningful engineering tasks are:

1. Replace placeholder media for NAF, NASS, and JustPeek with final assets.
2. Add the missing contact link in the footer if the public contact address is ready.
3. Decide whether the site should keep system fonts or move to self-hosted typography.
4. Add favicon and optional brand assets.
5. Run browser verification across routes, theme toggle, link targets, and mobile layout.

## Verification Checklist

Use this checklist when touching the site:

- `npm run build` completes successfully if you are using the production optimization path
- `public/` contains route HTML, `assets/screenshots/`, `dist/`, and `sitemap.xml`
- each route renders without console errors
- theme switching updates the page correctly and persists across reloads
- source HTML pages still point at the intended raw asset files
- internal links resolve correctly
- layout remains usable at a mobile viewport width
- new content changes fit the ownership-focused message

## Suggested Next Move

If you are picking up work from here, start with browser-level verification and final content/brand asset polish.
