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

# Status Badges (Separate from Dependencies)

Status badges are not connected to manifest files.

They represent external metrics such as:
- GitHub releases
- GitHub stars
- License
- Code coverage
- Docker pulls (if enabled)
- Future providers

### Status Badge Section

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

