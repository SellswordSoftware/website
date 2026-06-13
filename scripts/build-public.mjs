import { cp, mkdir, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import * as esbuild from "esbuild";

const root = process.cwd();
const publicDir = path.join(root, "public");
const routesToCopy = ["index.html", "about", "products", "projects", "sitemap.xml"];
const staticAssetsToCopy = [path.join("assets", "screenshots")];
const rawAssetBlock = `    <link rel="stylesheet" href="/vendor/nass/src/entries/index.css" />
    <link rel="stylesheet" href="/assets/site.css" />
    <script type="module" src="/assets/theme.js"></script>`;
const bundledAssetBlock = `    <link rel="stylesheet" href="/dist/main.css" />
    <script type="module" src="/dist/main.js"></script>`;

async function copySources() {
  for (const entry of routesToCopy) {
    await cp(path.join(root, entry), path.join(publicDir, entry), { recursive: true });
  }

  for (const entry of staticAssetsToCopy) {
    await cp(path.join(root, entry), path.join(publicDir, entry), { recursive: true });
  }
}

async function bundleAssets() {
  await esbuild.build({
    entryPoints: [path.join(root, "assets", "optimized-entry.js")],
    bundle: true,
    format: "esm",
    outdir: path.join(publicDir, "dist"),
    splitting: false,
    sourcemap: false,
    minify: true,
    target: ["es2022"],
    entryNames: "main",
    assetNames: "assets/[name]-[hash]",
    logLevel: "info",
  });
}

async function rewriteHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      await rewriteHtmlFiles(fullPath);
      continue;
    }

    if (!entry.isFile() || path.extname(entry.name) !== ".html") {
      continue;
    }

    const html = await readFile(fullPath, "utf8");
    if (!html.includes(rawAssetBlock)) {
      continue;
    }

    await writeFile(fullPath, html.replace(rawAssetBlock, bundledAssetBlock));
  }
}

await rm(publicDir, { recursive: true, force: true });
await mkdir(publicDir, { recursive: true });
await copySources();
await bundleAssets();
await rewriteHtmlFiles(publicDir);

const output = await stat(publicDir);
if (!output.isDirectory()) {
  throw new Error("public/ was not created");
}

console.log("Built optimized deployment output in public/");
