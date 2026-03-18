# Docker Badges

Display Docker Hub metrics using shields.io.

### Badge URL Structure

`https://img.shields.io/docker/{metric}/{user}/{image}`

### Configuration

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | string | Yes | Must be `"docker"` |
| `metric` | string | Yes | One of: `pulls`, `stars`, `v` |
| `user` | string | Yes | Docker Hub username or organization |
| `image` | string | Yes | Image name |
| `tag` | string | No | Image tag |
| `link` | string | No | Custom link URL |
| `style` | string | No | Badge style: `flat`, `flat-square`, `plastic`, `for-the-badge`, `social` |
| `color` | string | No | Badge color (hex or named color) |
| `labelColor` | string | No | Label background color |

### Metrics

| Metric | Description |
|--------|-------------|
| `pulls` | Number of pulls |
| `stars` | Number of stars |
| `v` | Latest version/tag |

### Examples

#### Pulls Badge

```yaml
- name: docker
  metric: pulls
  user: library
  image: nginx
```

#### Stars Badge

```yaml
- name: docker
  metric: stars
  user: library
  image: nginx
```

#### Version Badge

```yaml
- name: docker
  metric: v
  user: library
  image: nginx
```

#### With Tag

```yaml
- name: docker
  metric: v
  user: library
  image: nginx
  tag: alpine
```
