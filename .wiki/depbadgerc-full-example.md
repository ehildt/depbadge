# Depbadgerc (Full Example)

```yaml
# ==================
# Root Configuration
# ==================

integrity: 838e9da83c5b73c2de43b87b950428403a090d7dc926145640c1576d7c313820
# Checksum to detect manual changes or drift

target: README.md
# File where badges will be written

manifest: package.json
# Dependency source file; usually package.json for Node.js projects

output: ['json', 'markdown']
# 'json' → machine-readable preview for debugging
# 'markdown' → badge-ready preview for verification

# =========================
# Layout Presets (Optional)
# =========================

dependenciesLayout: &DEP_LAYOUT
  position: center     # Alignment of badges: left, center, right
  showHeader: true     # Render a section header

devDependenciesLayout: &DEV_LAYOUT
  <<: *DEP_LAYOUT      # Inherit defaults from DEP_LAYOUT
  position: left
  showHeader: false
  header: Development

peerDependenciesLayout: &PEER_LAYOUT
  <<: *DEP_LAYOUT
  position: right

statusBadgesLayout: &STATUS_LAYOUT
  position: center
  showHeader: true

# ==============================
# Badge Style Presets (Optional)
# ==============================

baseStyle: &BASE_STYLE
  labelColor: '#333'   # Left segment color
  isError: false       # Force error style
  logoSvg: ''          # Optional custom SVG logo
  logoWidth: 40        # Width of logo in pixels
  style: for-the-badge # Shields style: flat, flat-square, for-the-badge
  cacheSeconds: 3600   # CDN cache duration

# ====================
# Dependencies Section
# ====================

dependencies:
  layout:
    <<: *DEP_LAYOUT
  badgeStyle:
    <<: *BASE_STYLE
    namedLogo: npm
  items:
    - name: chalk
      # Uses section-level badgeStyle (npm logo, for-the-badge)
    - name: colord
      labelColor: '#ff4500'  # Override label color per item
    - name: js-yaml
      style: flat-square      # Override style per item
    - name: "@iarna/toml"
      namedLogo: toml         # Use a different logo per item

# =======================
# DevDependencies Section
# =======================

devDependencies:
  layout:
    <<: *DEV_LAYOUT
  badgeStyle:
    <<: *BASE_STYLE
    namedLogo: npm
    style: flat-square
  items:
    - name: jest
      namedLogo: jest          # Override logo for this package
    - name: typescript
      link: https://www.typescriptlang.org/  # Override link
    - name: eslint
      style: for-the-badge     # Override style

# =========================
# Peer Dependencies Section
# =========================

peerDependencies:
  layout:
    <<: *PEER_LAYOUT
  badgeStyle:
    <<: *BASE_STYLE
    style: flat
  items:
    - name: react
      namedLogo: react         # Per-item logo

# ===================================
# Status Badges Section (Independent)
# ===================================

statusBadges:
  layout:
    <<: *STATUS_LAYOUT
    header: Highlights
  badgeStyle:
    <<: *BASE_STYLE
    namedLogo: github
  items:
    - name: github
      metric: release          # Badge shows latest release
      user: ehildt
      repo: depbadge
      branch: main
      # Uses section-level badgeStyle
    - name: github
      metric: stars            # Badge shows stars count
      user: ehildt
      repo: depbadge
      branch: main
      labelColor: '#ffcc00'   # Override label color
    - name: codecov
      user: ehildt
      repo: depbadge
      branch: main
      flag: c
      style: flat-square       # Override style for this badge             # Override style for this badge
```

