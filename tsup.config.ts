import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  target: "node24",
  platform: "node",
  tsconfig: "tsconfig.build.json",
  splitting: false,
  bundle: true,
  // Disable tsup's built-in shims to prevent the first "createRequire" conflict
  shims: false,
  clean: true,
  outDir: "dist",
  outExtension: () => ({ js: ".mjs" }),
  noExternal: [/(.*)/],
  // Keep our banner, but wrap it in a block or check to ensure it's isolated
  banner: {
    js: `
import { createRequire as __createRequire } from 'module';
const require = __createRequire(import.meta.url);
    `,
  },
  esbuildOptions(options) {
    // This helper prevents esbuild from trying to "fix" the require/import
    // variables that are already handled by our banner.
    options.platform = "node";
    options.external = ["node:*", "net", "http", "https", "tls", "crypto", "path", "fs", "os", "url", "child_process"];
  },
  treeshake: true,
});
