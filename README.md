# Sellsword Software Website

The repo for `sellswordsoftware.com`.

This site is a static vanilla JS SPA built to exercise Sellsword's own stack directly:

- `vendor/naf` is a git submodule for routing and UI composition
- `vendor/nass` is a git submodule for theme and primitive CSS
- `esbuild` bundles the site into plain static assets in `dist/`

## Setup

Clone the repo with submodules:

```bash
git clone --recurse-submodules https://github.com/SellswordSoftware/website.git
cd website
npm install
```

If you already cloned without submodules:

```bash
git submodule update --init --recursive
```

## Local Development

Run the full local workflow:

```bash
npm run dev
```

That starts:

- the `esbuild` watcher
- the built-in static server

Default local URL:

```text
http://127.0.0.1:43556
```

Override the host or port if needed:

```bash
DEV_HOST=0.0.0.0 DEV_PORT=8080 npm run dev
```

Other useful commands:

```bash
npm run build
npm run dev:build
npm run dev:serve
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

## Build Output

Production assets are written to `dist/`.

The repo serves from the project root during development so `index.html` stays top-level and references `./dist/main.js` and `./dist/main.css`, which keeps local structure close to static hosting.
