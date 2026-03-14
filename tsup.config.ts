import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  target: "node24",
  platform: "node",
  tsconfig: "tsconfig.build.json",
  splitting: true,
  bundle: true,
  shims: true,
  clean: true,
  outDir: "dist",
  outExtension: () => ({ js: ".mjs" }),
  noExternal: [/(.*)/],
  banner: {
    js: `
import { createRequire as __createRequire } from 'module';
const require = __createRequire(import.meta.url);
    `,
  },
  esbuildOptions(options) {
    options.platform = "node";
    options.external = ["node:*", "net", "http", "https", "tls", "crypto", "path", "fs", "os", "url", "child_process"];
  },
  treeshake: true,
});
