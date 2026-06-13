# Sellsword Software Website

The repo for `sellswordsoftware.com`.

This site is a static HTML site built to exercise Sellsword's own stack directly without turning the site into an application shell:

- route content lives in normal HTML files
- `vendor/naf` is available for future small enhancements, but the current site uses plain JavaScript for its tiny theme toggle
- `vendor/nass` is a git submodule for theme and primitive CSS
- the site can run directly from source files without a build step
- the build exists only to create an optimized production package
- project media lives in top-level `assets/screenshots/`

## Setup

Clone the repo with submodules:

```bash
git clone --recurse-submodules https://github.com/SellswordSoftware/website.git
cd website
```

If you already cloned without submodules:

```bash
git submodule update --init --recursive
```

Install dependencies only if you want the optimized production build:

```bash
npm install
```

## Local Development

Run the full local workflow:

```bash
npm run dev
```

That starts the built-in static server.

Default local URL:

```text
http://127.0.0.1:43556
```

Override the host or port if needed:

```bash
npm run dev -- --host 0.0.0.0 --port 8080
```

Other useful commands:

```bash
npm run build
npm run preview
```

## Submodule Workflow

The website intentionally references `naf` and `nass` as real git submodules so you can:

- use them directly in this repo
- edit them in place while building the site
- commit changes in the upstream library repos when needed
- update the pinned submodule commit in this repo explicitly

Common commands:

```bash
git submodule status
git -C vendor/naf status
git -C vendor/nass status
git -C vendor/naf checkout main
git -C vendor/nass checkout main
git submodule update --remote --merge
```

When you change a submodule and commit inside it, record the new pinned commit in the website repo:

```bash
git add vendor/naf vendor/nass
git commit -m "Update naf and nass submodule refs"
```

## Source Mode

The site does not require a build to run locally. The HTML pages reference:

- `/vendor/nass/src/entries/index.css`
- `/assets/site.css`
- `/assets/theme.js`

That means the source tree is the runnable site. A normal static server pointed at the repo root will work.

## Production Build

For deployment, use:

```bash
npm run build
```

That creates a clean `public/` directory containing only production files. During that step:

- the route HTML files are copied into `public/`
- screenshots are copied into `public/assets/screenshots/`
- esbuild bundles NASS, `assets/site.css`, and `assets/theme.js`
- the copied HTML files are rewritten to use `/dist/main.css` and `/dist/main.js`

The production output contains:

- route HTML files
- `assets/screenshots/`
- `dist/main.css`
- `dist/main.js`
- `sitemap.xml`

Serve `public/` in production, not the repo root.
