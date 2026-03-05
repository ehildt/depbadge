# Layout Configuration

Layout controls how a group of badges is rendered inside the generated Markdown. It affects positioning, grouping, and header rendering — not the badge itself. Layouts are optional and typically defined as reusable YAML anchors.

### Basic Example

```yaml
dependenciesLayout: &DEPENDENCIES_LAYOUT
  position: center
  showHeader: false
  # header: 'My Dependencies'
```


| Property | Type | Description |
| :--- | :--- | :--- |
| **position** | string | Alignment in the document (left, center, right) |
| **showHeader** | boolean | Whether a Markdown header is rendered above the section |
| **header** | string | Optional custom header title (falls back to section name) |

### Reusing Layouts via YAML Anchors

Layouts are designed to be reused and extended:

```yaml
devDependenciesLayout: &DEV_DEPENDENCIES_LAYOUT
  <<: *DEPENDENCIES_LAYOUT
  position: left
  showHeader: true
  header: Development Dependencies
```
YAML merge (<<) allows:
- DRY configuration
- Targeted overrides
- Consistent styling across sections

### Applying a Layout to a Section

```yaml
dependencies:
  layout:
    <<: *DEPENDENCIES_LAYOUT
```

If no layout is provided, Depbadge will fall back to its internal defaults.