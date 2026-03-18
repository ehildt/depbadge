---
"@ehildt/depbadge": minor
---

Add Socket badge support for npm packages

- Added Socket badge type with package and version fields
- Uses Socket's native badge service at badge.socket.dev
- Links to npm package page by default
- Supports scoped packages like @babel/core
- Removed unused metric field from Socket badge type
- Created dedicated status-badges documentation for all badge types:
  - github-badges.md
  - codecov-badges.md
  - docker-badges.md
  - tile-badges.md
  - socket-badges.md
