import { spawn } from "node:child_process";

const host = process.env.DEV_HOST || "127.0.0.1";
const port = process.env.DEV_PORT || "43556";

const children = [];
let shuttingDown = false;

function spawnChild(label, command, childArgs) {
  const child = spawn(command, childArgs, {
    cwd: process.cwd(),
    env: process.env,
    stdio: "inherit",
  });

  child.on("exit", (code, signal) => {
    if (!shuttingDown) {
      console.log(`${label} exited${signal ? ` from ${signal}` : ` with code ${code ?? 0}`}`);
      shutdown(code ?? 0);
    }
  });

  children.push(child);
  return child;
}

function shutdown(exitCode = 0) {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;

  for (const child of children) {
    if (!child.killed) {
      child.kill("SIGTERM");
    }
  }

  setTimeout(() => {
    for (const child of children) {
      if (!child.killed) {
        child.kill("SIGKILL");
      }
    }
    process.exit(exitCode);
  }, 250).unref();
}

console.log(`Starting dev workflow at http://${host}:${port}`);

spawnChild("builder", process.execPath, ["esbuild.config.js", "--watch"]);
spawnChild("server", process.execPath, ["scripts/dev-server.mjs", "--host", host, "--port", port]);

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));
