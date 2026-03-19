# @ehildt/depbadge

## 1.3.0

### Minor Changes

- aae9e4e: Replace js-yaml with yaml and yargs with native parseArgs, add resolveYamlMergeKey for YAML 1.1 merge key support

## 1.2.0

### Minor Changes

- 2f513d3: Add Socket badge support for npm packages

  - Added Socket badge type with package and version fields
  - Uses Socket's native badge service at badge.socket.dev
  - Links to npm package page by default
  - Supports scoped packages like @babel/core
  - Removed unused metric field from Socket badge type
  - Created dedicated status-badges documentation for all badge types:
    - github-badges.md
    - codecov-badges.md
    - docker-badges.md
    - tile-badges.md
    - socket-badges.md

## 1.1.4

### Patch Changes

- c3cf920: updated cicd workflows

## 1.1.3

### Patch Changes

- f85787c: extended tsup.config.ts to support yargs
- 1848219: extended depbadge cli, migrated from jest to vitest

## 1.1.2

### Patch Changes

- 87549f0: extended jest.config.ts and tests

## 1.1.1

### Patch Changes

- 360d592: standardize colors to hex strings
- 360d592: extended tests

## 1.1.0

### Minor Changes

- 46eead2: added tile status badge support

### Patch Changes

- 9248c28: updated cicd workflows

## 1.0.11

### Patch Changes

- 43e241d: added pragma-style comment to depbadgerc.yml

## 1.0.10

### Patch Changes

- af6bf15: extended wiki

## 1.0.9

### Patch Changes

- ff93dff: 0001: added lazy loading manifest
- 93a500a: small fixes and perf.

## 1.0.8

### Patch Changes

- 2112b4b: 0001: fixed codecov badge

## 1.0.6

### Patch Changes

- e92d988: 0001: perform qa and tests for rc.1
