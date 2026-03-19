# AGENTS.md

This document provides guidelines and commands for agents working in this repository.

## Project Overview

This is a TypeScript project that generates shield.io badges from package manifests (package.json, pyproject.toml, Cargo.toml).

## Build Commands

| Command               | Description                                                  |
| --------------------- | ------------------------------------------------------------ |
| `pnpm install`        | Install dependencies (use `--frozen-lockfile` in CI)         |
| `pnpm prepare`        | Set up husky hooks                                           |
| `pnpm build`          | Build the project (runs tsup, outputs to `dist/`)            |
| `pnpm prepublishOnly` | Build before publishing                                      |
| `pnpm depbadge`       | Run the CLI tool (`rimraf .depbadge && node dist/index.mjs`) |

## Lint & Format Commands

| Command            | Description                     |
| ------------------ | ------------------------------- |
| `pnpm lint`        | Run ESLint on `./src`           |
| `pnpm format`      | Format all files with Prettier  |
| `pnpm depcruise`   | Run dependency-cruiser analysis |
| `pnpm depcheck`    | Check for unused dependencies   |
| `pnpm lint:unused` | Check for unused exports        |
| `pnpm lint-staged` | Run linters on staged files     |

### Pre-commit Hook

Husky runs `pnpm lint-staged` on commit. The pre-commit hook is in `.husky/_/pre-commit`.

## Test Commands

| Command           | Description                     |
| ----------------- | ------------------------------- |
| `pnpm test`       | Run all tests once (vitest run) |
| `pnpm test:watch` | Run tests in watch mode         |
| `pnpm test:cov`   | Run tests with coverage report  |

### Running a Single Test

Use vitest's `--` filter option:

```bash
# By test name (partial match)
pnpm test -- encodeLabel
pnpm test -- "get-dependencies"
pnpm test -- "Status badge markdown mapping"

# By file path
pnpm test -- "src/shared/encode-label.spec.ts"
pnpm test -- "src/store/ctx-store.spec.ts"

# By file name
pnpm test -- "ctx-store.spec.ts"
```

## Code Style

### TypeScript Configuration

- Strict mode enabled (`strict: true` in tsconfig.json)
- Module resolution: `nodenext`
- Target: `esnext`
- No implicit `any` (but `any` is allowed with opt-out via `@ts-ignore` or `eslint-disable`)
- Build config: `tsconfig.build.json` (generates declarations, excludes spec files)

### Formatting (Prettier)

| Option          | Value   |
| --------------- | ------- |
| Print width     | 120     |
| Single quotes   | `true`  |
| Trailing commas | `all`   |
| Semicolons      | `true`  |
| Use tabs        | `false` |
| End of line     | `lf`    |
| Bracket spacing | `true`  |

### ESLint Rules

- `no-console`: warning (use `console.error` for errors in CLI)
- `@typescript-eslint/no-unused-vars`: warn
- `@typescript-eslint/no-floating-promises`: warn
- `@typescript-eslint/no-explicit-any`: off
- `sonarjs/cognitive-complexity`: warn
- `sonarjs/no-identical-expressions`: warn

### Import Sorting (simple-import-sort)

Order groups (strict):

1. `node:` imports (e.g., `node:fs`)
2. External packages (`@?\w`)
3. Internal packages (`@app`, `@modules`, `@services`)
4. Side-effect imports (`\u0000`)
5. Parent imports (`\.\.(?!/?$)`, `\.\./?$`)
6. Relative imports (same directory)
7. Type imports
8. CSS/SCSS files

### Naming Conventions

| Type               | Convention                 | Example                          |
| ------------------ | -------------------------- | -------------------------------- |
| Files              | kebab-case                 | `ctx-store.ts`, `get-version.ts` |
| Test files         | `*.spec.ts` suffix         | `encode-label.spec.ts`           |
| Types/Interfaces   | PascalCase, descriptive    | `CtxStore<CtxState, CtxMethods>` |
| Type aliases       | `type` keyword, PascalCase | `type UserId = string`           |
| Functions          | camelCase, verb-prefixed   | `getDependencies`, `useCtxStore` |
| Methods            | camelCase                  | `increment`, `getDependencies`   |
| Store state types  | `CtxState` suffix          | `DepbadgeRCState`                |
| Store method types | `CtxMethods` suffix        | `DepbadgeRCMethods`              |

### Error Handling

CLI entry points must use try/catch:

```typescript
try {
  // ... main logic
  process.exit(0);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`::error::${message}`);
  process.exit(1);
}
```

### Type Patterns

- Use `type` for simple type aliases
- Use `export type` for types that need to be imported
- Generic types with meaningful names (e.g., `CtxStore<CtxState, CtxMethods>`)
- Optional properties use `?` modifier
- Avoid `any` unless necessary; prefer `unknown` for truly unknown types

### Store Pattern (ctx-store)

The project uses a custom immutable store pattern:

```typescript
import { useCtxCallback, useCtxStore } from "./ctx-store.ts";

// State and methods are separate types
type CtxState = { count: number };
type CtxMethods = { increment: (delta: number) => number };

// Create store with frozen state
const store = useCtxStore<CtxState, CtxMethods>(
  { count: 5 },
  {
    increment: (s) => (delta: number) => s.count + delta,
  }
);

// Stores are frozen (immutable)
Object.isFrozen(store); // true

// Use useCtxCallback to bind callbacks
const callback = useCtxCallback<CtxState>((s) => () => console.log(s.count));
```

## Development Workflow

1. **Before committing**: Run `pnpm lint-staged` (auto-runs on pre-commit via husky)
2. **Before pushing**: Run `pnpm test` and `pnpm build`
3. **CI Pipeline**: Lint → Build → Test (in that order)

## Directory Structure

```
src/
├── index.ts              # CLI entry point
├── depbadgerc/           # Main business logic
│   ├── *.store.ts        # Store definitions
│   └── *.type.ts         # Type definitions
├── manifest/             # Manifest parsers
│   ├── package-json/
│   ├── pyproject-toml/
│   └── cargo.toml/
├── shared/               # Utility functions
│   ├── encode-label.ts
│   ├── find-file.ts
│   └── *.spec.ts
└── store/                # Store implementation
    ├── ctx-store.ts
    └── ctx-store.spec.ts
```

## Key Dependencies

| Package     | Purpose              |
| ----------- | -------------------- |
| yargs       | CLI argument parsing |
| js-yaml     | YAML parsing         |
| colord      | Color manipulation   |
| @iarna/toml | TOML parsing         |
| vitest      | Testing              |
| tsup        | Build tool           |

## Configuration Files

| File                  | Purpose                          |
| --------------------- | -------------------------------- |
| `eslint.config.ts`    | ESLint configuration             |
| `prettier.config.mjs` | Prettier configuration           |
| `vitest.config.ts`    | Test configuration               |
| `tsconfig.json`       | TypeScript configuration         |
| `tsconfig.build.json` | Build-specific TypeScript config |
| `cspell.config.yml`   | Spell checker configuration      |
| `tsup.config.ts`      | Build tool configuration         |
| `.lintstagedrc`       | Lint-staged configuration        |
