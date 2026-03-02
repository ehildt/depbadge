import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  target: "node24",
  platform: "node",
  tsconfig: "tsconfig.build.json",
  bundle: true,
  shims: true,
  clean: true,
  outDir: "dist",
  outExtension: () => ({ js: ".mjs" }),
  // Bundle all dependencies so the runner doesn't need a node_modules folder
  noExternal: [/(.*)/],
  banner: {
    js: `
      import { createRequire } from 'module';
      const require = createRequire(import.meta.url);
    `,
  },
  esbuildOptions(options) {
    options.platform = "node";
    options.external = ["node:*", "net", "http", "https", "tls", "crypto", "path", "fs", "os", "url", "child_process"];
  },
  treeshake: true,
});
