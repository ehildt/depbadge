# Socket Badges

Display supply chain security scores from [Socket.dev](https://socket.dev/) for npm packages.

### Badge URL Structure

`https://badge.socket.dev/npm/package/{package}/{version}`

### Configuration

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `name` | string | Yes | - | Must be `"socket"` |
| `package` | string | Yes | - | npm package name (e.g., `"express"`, `"@babel/core"`) |
| `version` | string | No | `"*"` | Package version or `"*"` for latest |
| `link` | string | No | npm package URL | Custom link URL |

### What the Badge Shows

Socket analyzes npm packages for supply chain security risks and displays an overall grade:

- **A** - Excellent supply chain security
- **B** - Good supply chain security
- **C** - Moderate risk
- **D** - High risk
- **F** - Critical risk

### Why Not Shields.io?

We attempted to route Socket badges through shields.io's endpoint badge feature to enable consistent styling with other badges. However, this approach was not viable because:

1. **CORS Restrictions**: Socket's API (`socket.dev/api/npm/package-info/score`) does not include CORS headers that allow shields.io's servers to fetch the data directly.

2. **API Response Time**: Socket performs real-time analysis of npm packages which can take 30+ seconds for first-time analysis. Shields.io has strict timeout limits (~3-5 seconds) for endpoint badges.

3. **Native Badge Service**: Socket provides its own badge service (`badge.socket.dev`) that works reliably without external dependencies.

For these reasons, Socket badges use Socket's native badge service directly.

### Examples

#### Basic Usage

```yaml
- name: socket
  package: express
```

#### With Specific Version

```yaml
- name: socket
  package: express
  version: "4.18.2"
```

#### Scoped Package

```yaml
- name: socket
  package: @babel/core
```

#### With Custom Link

```yaml
- name: socket
  package: express
  link: https://socket.dev/npm/package/express
```
