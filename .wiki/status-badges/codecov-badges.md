# Codecov Badges

Display code coverage from Codecov using shields.io.

### Badge URL Structure

`https://img.shields.io/codecov/c/{token}/{user}/{repo}/{branch}`

### Configuration

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | string | Yes | Must be `"codecov"` |
| `user` | string | Yes | Codecov username or organization |
| `repo` | string | Yes | Repository name |
| `branch` | string | No | Branch name |
| `flag` | string | No | Specific coverage flag (e.g., `unit`, `integration`) |
| `token` | string | No | Codecov upload token (required for private repos) |
| `link` | string | No | Custom link URL |
| `style` | string | No | Badge style: `flat`, `flat-square`, `plastic`, `for-the-badge`, `social` |
| `color` | string | No | Badge color (hex or named color) |
| `labelColor` | string | No | Label background color |

### Examples

#### Basic Coverage Badge

```yaml
- name: codecov
  user: ehildt
  repo: depbadge
```

#### With Branch

```yaml
- name: codecov
  user: ehildt
  repo: depbadge
  branch: main
```

#### With Flag

```yaml
- name: codecov
  user: ehildt
  repo: depbadge
  flag: unit
```

#### Private Repository (with token)

```yaml
- name: codecov
  user: ehildt
  repo: depbadge
  token: your-upload-token
  branch: main
```
