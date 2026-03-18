# AGENTS.md

This document provides guidelines and commands for agents working in this repository.

## Project Overview

This is a TypeScript project that generates shield.io badges from package manifests (package.json, pyproject.toml, Cargo.toml).

## Build Commands

| Command               | Description                                          |
| --------------------- | ---------------------------------------------------- |
| `pnpm install`        | Install dependencies (use `--frozen-lockfile` in CI) |
| `pnpm build`          | Build the project (runs tsup)                        |
| `pnpm prepublishOnly` | Build before publishing                              |

## Lint & Format Commands

| Command            | Description                     |
| ------------------ | ------------------------------- |
| `pnpm lint`        | Run ESLint on `./src`           |
| `pnpm format`      | Format all files with Prettier  |
| `pnpm depcruise`   | Run dependency-cruiser analysis |
| `pnpm lint:unused` | Check for unused exports        |
| `pnpm lint-staged` | Run linters on staged files     |

## Test Commands

| Command           | Description                     |
| ----------------- | ------------------------------- |
| `pnpm test`       | Run all tests once (vitest run) |
| `pnpm test:watch` | Run tests in watch mode         |
| `pnpm test:cov`   | Run tests with coverage report  |

### Running a Single Test

Use vitest's filter option:

```bash
pnpm test -- encodeLabel
pnpm test -- "get-dependencies"
pnpm test -- "src/shared/encode-label.spec.ts"
```

## Code Style

### TypeScript Configuration

- Strict mode enabled (`strict: true` in tsconfig.json)
- Module resolution: `nodenext`
- Target: `esnext`
- No implicit `any` (but `any` is allowed with opt-out)

### Formatting (Prettier)

- Print width: 120 characters
- Single quotes: `true`
- Trailing commas: `all`
- Semicolons: `true`
- Use tabs: `false`
- End of line: `lf`
- Bracket spacing: `true`

### ESLint Rules

- `no-console`: warning (use `console.error` for errors in CLI)
- `@typescript-eslint/no-unused-vars`: warn
- `@typescript-eslint/no-floating-promises`: warn
- `sonarjs/cognitive-complexity`: warn
- `sonarjs/no-identical-expressions`: warn

### Import Sorting (simple-import-sort)

Order groups:

1. `node:` imports
2. External packages (`@?\\w`)
3. Internal packages (`@app`, `@modules`, `@services`)
4. Side-effect imports (`\\u0000`)
5. Parent imports (`\\.\\.(?!/?$)`, `\\.\\./?$`)
6. Relative imports (same directory)
7. Type imports
8. CSS/SCSS files

### Naming Conventions

- Files: kebab-case (e.g., `ctx-store.ts`, `get-version.ts`)
- Types/Interfaces: PascalCase with descriptive names
- Functions: camelCase, verb-prefixed (e.g., `getDependencies`, `useCtxStore`)
- Test files: `*.spec.ts` suffix

### Error Handling

- Use try/catch in CLI entry points
- Always handle caught errors:
  ```typescript
  const message = error instanceof Error ? error.message : String(error);
  ```
- Exit with `process.exit(1)` on error
- Use `console.error` with `::error::` prefix for GitHub Actions

### Type Patterns

- Use `type` for simple type aliases
- Use `export type` for types that need to be imported
- Generic types with meaningful names (e.g., `CtxStore<CtxState, CtxMethods>`)
- Optional properties use `?` modifier

### Store Pattern (ctx-store)

The project uses a custom immutable store pattern:

- `useCtxStore<CtxState, CtxMethods>()` - creates frozen store
- `useCtxCallback<CtxState>()` - binds callbacks to store
- All stores are frozen with `Object.freeze()`

## Development Workflow

1. **Before committing**: Run `pnpm lint-staged` (automatically runs on pre-commit via husky)
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
└── store/                # Store implementation
```

## Key Dependencies

- **yargs**: CLI argument parsing
- **js-yaml**: YAML parsing
- **colord**: Color manipulation
- **@iarna/toml**: TOML parsing

## Configuration Files

- `eslint.config.ts` - ESLint configuration
- `prettier.config.mjs` - Prettier configuration
- `vitest.config.ts` - Test configuration
- `tsconfig.json` - TypeScript configuration
- `cspell.config.yml` - Spell checker configuration
- `tsup.config.ts` - Build tool configuration
