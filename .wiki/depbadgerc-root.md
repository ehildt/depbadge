# Root Configuration

```yaml
# yaml-language-server: $schema=https://raw.githubusercontent.com/ehildt/depbadge/main/depbadgerc.schema.json
integrity: 838e9da83c5b73c2de43b87b950428403a090d7dc926145640c1576d7c313820
target: README.md
manifest: package.json
output: ['json', 'markdown']
```

`# yaml-language-server`
This is a pragma-style comment used by YAML editor tooling. It is recognized by the YAML language server and allows you to provide configuration hints directly inside a YAML file.

`integrity`

A checksum used to verify that the generated output matches the configuration state.
It prevents accidental drift and can be used to detect manual modifications of generated content.

`target`

The file that will receive the generated badges.  
Here: **README.md**.

`manifest`

The dependency source file.
For Node.js projects, this is typically package.json.

Depbadge reads dependency sections from this file:

- dependencies
- devDependencies
- peerDependencies

`output`

Defines which output artifacts Depbadge generates (primarily for previewing and debugging).

* `json` → Generates machine-readable files for each badge under `.depbadge/<section>/<name>.json` (e.g. `.depbadge/dependencies/react.json`). Useful for inspecting resolved configuration and computed badge data.

* `markdown` → Generates rendered badge previews as Markdown under `.depbadge/`. This allows you to verify layout and styling before writing to the target file.


