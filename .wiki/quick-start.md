# Quick Start
depbadge is a platform-agnostic tool designed to run anywhere JavaScript is available. Whether you're running it locally or integrated into a CI/CD pipeline, setup is designed to be minimal and fast.

## Installation & Usage
### Via npm
You can run depbadge directly using npx or add it to your project's development dependencies.

- Run once without installing   
`npx @ehildt/depbadge`

- Or add to your project   
`npm install -D @ehildt/depbadge`

### Via GitHub Actions
Automate your badge updates by adding this workflow to `.github/workflows/depbadge.yml`. This example uses pnpm and automatically commits changes back to your branch.

```yml
name: DEPBADGE_CI

on:
  push:
    branches:
      - main
      - dev

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

env:
  HUSKY: 0

permissions:
  contents: write
  pull-requests: write

jobs:
  release:
    name: Bump Badges
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
          persist-credentials: true

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 10
          run_install: false

      - name: Setup Node.js (with pnpm cache)
        uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: pnpm

      - name: Install Dependencies
        run: pnpm install --ignore-scripts --frozen-lockfile

      - name: Run Depbadge
        uses: ehildt/depbadge@v1.0.0-rc.2

      - name: Commit Badge Updates
        run: |
          git config user.name "depbadge[bot]"
          git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
          git add -A
          git diff --cached --quiet && echo "No badge changes detected." || (
            git commit -m "DEPBADGE UPDATE [skip ci]"
            git push origin HEAD:${{ github.ref_name }}
          )
```

## Minimal Configuration
To get started, create a `.depbadgerc.yml` file in your project root.    
Define which packages to track by listing them under `dependencies.items`.

```yaml
dependencies:
  items:
    - name: colord
    - name: js-yaml
    - name: "@iarna/toml"
```
