# BadgeStyle Configuration

The `badgeStyle` defines how an individual badge looks and behaves.
It controls visual appearance, logo handling, linking, and caching. Like layouts, styles are optional and reusable.

### Base Style Example

```yaml
dependenciesStyle: &DEPENDENCIES_STYLE
  labelColor: '#333'
  isError: false
  namedLogo: npm
  logoSvg: ''
  logoWidth: 40
  style: for-the-badge
  cacheSeconds: 3600
  link: https://www.npmjs.com/package/example_package
```

| Property       | Type    | Description                                            |
| -------------- | ------- | ------------------------------------------------------ |
| `labelColor`   | string  | Left segment color                                     |
| `isError`      | boolean | Forces error-style rendering                           |
| `namedLogo`    | string  | Predefined logo identifier                             |
| `logoSvg`      | string  | Custom SVG logo override                               |
| `logoWidth`    | number  | Logo width in pixels                                   |
| `style`        | string  | Shields style (`flat`, `flat-square`, `for-the-badge`) |
| `cacheSeconds` | number  | CDN cache duration                                     |
| `link`         | string  | Target URL when clicking badge                         |


### Applying a Style to a Section

```yaml
dependencies:
  badgeStyle: *DEPENDENCIES_STYLE
    # override style properties below
```

This sets defaults for all items in the section.

### Per-Item Override

Every item may override any badgeStyle property:

```yaml
dependencies:
  items:
    - name: vue
      labelColor: '#42b883'
      namedLogo: vue
      link: https://vuejs.org/
```

Per-item configuration always takes precedence over section-level style.