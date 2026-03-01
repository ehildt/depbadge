# Kickoff

Getting started with Depbadge is straightforward: create a `depbadgerc.yml` file at the root of your project.

Below is a minimal example configuration. In this setup, dependencies defines the source section in your manifest (e.g., package.json). Depbadge will:

- Synchronize only the dependencies explicitly listed under items
- Ignore any manifest dependencies not declared in this list

```yaml
dependencies:
  items:
    - name: chalk
    - name: colord
    - name: js-yaml
    - name: "@iarna/toml"
```

This explicit listing ensures deterministic syncing and prevents unintended dependencies from being processed. Each item in the list accepts all `BadgeStyle` properties as configuration options:

```ts
export type BadgeStyle = {
  color?: string;
  labelColor?: string;
  isError?: boolean;
  namedLogo?: string;
  logoSvg?: string;
  logoColor?: string;
  logoWidth?: number;
  style?: string;
  cacheSeconds?: number;
  link?: string;
};
```

This enables explicit, per-item badge configuration at the item level:

```yaml
dependencies:
  items:
    - name: vue
      labelColor: '#333'
      isError: false
      namedLogo: npm
      logoSvg: ''
      logoWidth: 40
      style: for-the-badge
      cacheSeconds: 3600
      link: https://vuejs.org/
```

The same configuration pattern can be applied to `devDependencies` and `peerDependencies`.
