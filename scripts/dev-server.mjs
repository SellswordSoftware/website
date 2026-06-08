import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";
import { createServer } from "node:http";

const args = process.argv.slice(2);

function readArg(flag, fallback) {
  const index = args.indexOf(flag);
  if (index === -1) {
    return fallback;
  }

  const value = args[index + 1];
  if (!value || value.startsWith("--")) {
    return fallback;
  }

  return value;
}

const host = readArg("--host", "127.0.0.1");
const port = Number.parseInt(readArg("--port", "43556"), 10);
const root = resolve(readArg("--root", process.cwd()));
const indexFile = join(root, "index.html");

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function send(res, statusCode, body, headers = {}) {
  res.writeHead(statusCode, headers);
  res.end(body);
}

function safePathFromUrl(url) {
  const requestUrl = new URL(url, `http://${host}:${port}`);
  const pathname = decodeURIComponent(requestUrl.pathname);
  const resolved = resolve(root, `.${pathname}`);
  const normalizedRoot = normalize(root + "/");

  if (resolved !== root && !resolved.startsWith(normalizedRoot)) {
    return null;
  }

  return resolved;
}

function streamFile(filePath, res) {
  const ext = extname(filePath).toLowerCase();
  const contentType = contentTypes[ext] || "application/octet-stream";
  const stream = createReadStream(filePath);

  res.writeHead(200, { "content-type": contentType });
  stream.pipe(res);

  stream.on("error", () => {
    if (!res.headersSent) {
      send(res, 500, "Internal Server Error", {
        "content-type": "text/plain; charset=utf-8",
      });
    } else {
      res.destroy();
    }
  });
}

const server = createServer((req, res) => {
  if (!req.url) {
    send(res, 400, "Bad Request", { "content-type": "text/plain; charset=utf-8" });
    return;
  }

  const filePath = safePathFromUrl(req.url);
  if (!filePath) {
    send(res, 403, "Forbidden", { "content-type": "text/plain; charset=utf-8" });
    return;
  }

  let candidate = filePath;
  if (existsSync(candidate) && statSync(candidate).isDirectory()) {
    candidate = join(candidate, "index.html");
  }

  if (existsSync(candidate) && statSync(candidate).isFile()) {
    streamFile(candidate, res);
    return;
  }

  const accept = req.headers.accept || "";
  const wantsHtml = req.method === "GET" && accept.includes("text/html");

  if (wantsHtml && existsSync(indexFile)) {
    streamFile(indexFile, res);
    return;
  }

  send(res, 404, "Not Found", { "content-type": "text/plain; charset=utf-8" });
});

server.listen(port, host, () => {
  console.log(`Serving ${root}`);
  console.log(`Local: http://${host}:${port}`);
});

function shutdown(signal) {
  server.close(() => {
    console.log(`Stopped dev server on ${signal}`);
    process.exit(0);
  });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
