# Dependency Sections

Dependency sections are tied to the manifest file (e.g., package.json).

Supported sections:

- dependencies
- devDependencies
- peerDependencies

### Section Structure

```yaml
dependencies:
  layout:
    <<: *DEPENDENCIES_LAYOUT
  badgeStyle: *DEPENDENCIES_STYLE
  items:
    - name: chalk
```

Behavior

- Only explicitly listed items are rendered.
- Other manifest dependencies are ignored.
- Items must exist in the manifest section.
- Each item may override any style property.

# Status Badges

Status badges are documented in dedicated files:

- [GitHub Badges](./status-badges/github-badges.md)
- [Codecov Badges](./status-badges/codecov-badges.md)
- [Docker Badges](./status-badges/docker-badges.md)
- [Tile Badges](./status-badges/tile-badges.md)
- [Socket Badges](./status-badges/socket-badges.md)

```yaml
statusBadges:
  layout:
    <<: *STATUS_BADGES_LAYOUT
  badgeStyle: *STATUS_BADGES_STYLE
  items:
    - name: github
      metric: stars
      user: ehildt
      repo: depbadge
```
