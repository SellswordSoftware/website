import * as esbuild from "esbuild";

const watchMode = process.argv.includes("--watch");

const config = {
  entryPoints: ["src/main.js"],
  bundle: true,
  format: "esm",
  outdir: "dist",
  splitting: false,
  sourcemap: true,
  target: ["es2022"],
  entryNames: "main",
  assetNames: "assets/[name]-[hash]",
  loader: {
    ".png": "file",
    ".jpg": "file",
    ".jpeg": "file",
    ".svg": "file",
    ".webp": "file",
    ".woff": "file",
    ".woff2": "file",
  },
  logLevel: "info",
};

if (watchMode) {
  const ctx = await esbuild.context(config);
  await ctx.watch();
  console.log("Watching for changes...");
} else {
  await esbuild.build(config);
}
