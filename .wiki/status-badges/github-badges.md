# GitHub Badges

Display GitHub metrics for repositories using shields.io.

### Badge URL Structure

`https://img.shields.io/github/{metric}/{user}/{repo}`

### Configuration

| Property     | Type   | Required    | Description                                                                     |
| ------------ | ------ | ----------- | ------------------------------------------------------------------------------- |
| `name`       | string | Yes         | Must be `"github"`                                                              |
| `metric`     | string | Yes         | One of: `stars`, `license`, `release`, `issues`, `forks`, `watchers`, `actions` |
| `user`       | string | Yes         | GitHub username or organization                                                 |
| `repo`       | string | Yes         | Repository name                                                                 |
| `branch`     | string | No          | Branch name                                                                     |
| `workflow`   | string | Conditional | Required when `metric` is `actions`                                             |
| `link`       | string | No          | Custom link URL                                                                 |
| `style`      | string | No          | Badge style: `flat`, `flat-square`, `plastic`, `for-the-badge`, `social`        |
| `color`      | string | No          | Badge color (hex or named color)                                                |
| `labelColor` | string | No          | Label background color                                                          |

### Metrics

| Metric     | Description            |
| ---------- | ---------------------- |
| `stars`    | Number of stars        |
| `forks`    | Number of forks        |
| `issues`   | Number of open issues  |
| `watchers` | Number of watchers     |
| `license`  | Repository license     |
| `release`  | Latest release version |
| `actions`  | Workflow status        |

### Examples

#### Stars Badge

```yaml
- name: github
  metric: stars
  user: ehildt
  repo: depbadge
```

#### Latest Release Badge

```yaml
- name: github
  metric: release
  user: ehildt
  repo: depbadge
  branch: main
```

#### License Badge

```yaml
- name: github
  metric: license
  user: ehildt
  repo: depbadge
```

#### Actions Workflow Badge

```yaml
- name: github
  metric: actions
  user: ehildt
  repo: depbadge
  workflow: ci
  branch: main
```
