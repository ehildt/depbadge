# Tile Badges

Display custom static badges with arbitrary text using shields.io.

### Badge URL Structure

`https://img.shields.io/badge/{label}-{message}-{color}`

### Configuration

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | string | Yes | Must be `"tile"` |
| `label` | string | Yes | Left side text |
| `message` | string | Yes | Right side text |
| `color` | string | No | Badge color (hex or named color like `brightgreen`, `orange`, `red`) |
| `labelColor` | string | No | Label background color |
| `isError` | boolean | No | Force error-style rendering |
| `link` | string | No | Custom link URL |
| `style` | string | No | Badge style: `flat`, `flat-square`, `plastic`, `for-the-badge`, `social` |

### Examples

#### Build Status Badge

```yaml
- name: tile
  label: Build
  message: Passing
  color: brightgreen
```

#### Custom Message Badge

```yaml
- name: tile
  label: I Love
  message: COOKIES
  color: orange
```

#### With Link

```yaml
- name: tile
  label: CI
  message: OK
  color: blue
  link: https://ci.example.com
```

#### Error Style Badge

```yaml
- name: tile
  label: Status
  message: Failed
  color: red
  isError: true
```
