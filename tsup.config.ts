import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  target: "node24",
  tsconfig: "tsconfig.build.json",
  dts: true,
  clean: true,
  outDir: "dist",
  bundle: true,
  sourcemap: true,
  minify: false,
  outExtension: ({ format }) => (format === "esm" ? { js: ".mjs" } : {}),
  external: ["fs", "path", "crypto", "net", "http", "https", "tls", "url"],
  esbuildOptions(options) {
    options.conditions = ["node", "import"]; // proper ESM resolution
  },
  noExternal: ["@actions/core", "@iarna/toml", "chalk", "colord", "js-yaml"],
});
