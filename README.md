# DEPBADGE

Depbadge is a tool that generates dependency badges directly from your project’s manifest file.
It generates Markdown that references [Shields.io](https://shields.io/) endpoints, so all badges are rendered on-the-fly by Shields.io. 
This ensures compatibility with [GitHub](https://github.com/), [GitLab](https://about.gitlab.com/), and other Markdown-rendering platforms without needing local SVG generation.
It can be used locally as a CLI utility or integrated into CI/CD pipelines such as GitHub Actions.

> Currently, it supports the `package.json` manifest used by `npm`, `pnpm`, and `Yarn`.   
*Support for additional manifest formats is planned.

Depbadge automatically injects generated badges between the following markers in your Markdown files:

```
<!-- ​DEPBADGE:START -->
<!-- ​DEPBADGE:END -->
```

Optionally, it can also generate a Shields.io-compatible `badges.json` and a `BADGES.md` file for local preview.and inspection
These additional artifacts make it easy to integrate with Shields-based workflows and review badge output independently of your main documentation.

<br/>
<hr style="border: 0px dotted #bbb; height: 1px;">
<br/>
<br/>

<!-- DEPBADGE:START -->
<div align="center">



# Highlights

[![github](https://img.shields.io/github/release/ehildt/depbadge?style=for-the-badge&cacheSeconds=3600&color=%230078D4&logo=npm&logoColor=white&logoWidth=40&branch=main)](https://something.com)
[![docker](https://img.shields.io/docker/pulls/ehildt/myimage?labelColor=%23222222&logoColor=white&logoWidth=40&style=for-the-badge&cacheSeconds=3600&color=%230078D4)](https://something.com)
[![codecov](https://img.shields.io/codecov/c/codecov/ehildt/depbadge?labelColor=%23222222&cacheSeconds=3600&logoColor=white&logoWidth=40&style=for-the-badge&color=%230078D4&branch=main)](https://something.com)

</div>

<div align="center">



# dependencies

[![chalk](https://img.shields.io/badge/chalk-v5.6.2-%23222.svg?labelColor=%23888&cacheSeconds=3600&logo=npm&logoColor=white&logoWidth=40&style=for-the-badge)](https://www.npmjs.com/package/example_package)
[![js-yaml](https://img.shields.io/badge/js_yaml-v4.1.1-%23222.svg?labelColor=%23888&cacheSeconds=3600&logo=npm&logoColor=white&logoWidth=40&style=for-the-badge)](https://www.npmjs.com/package/example_package)

</div>

<div align="left">



# my-new-header-name

[![typescript](https://img.shields.io/badge/typescript-v5.9.3-%23222.svg?labelColor=%23333333&cacheSeconds=3600&logo=npm&logoColor=white&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![eslint](https://img.shields.io/badge/eslint-v10.0.1-%23222.svg?labelColor=%23333333&cacheSeconds=3600&logo=npm&logoColor=white&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)

</div>
<!-- DEPBADGE:END -->

<br>
<br>

<div align="center">
  <a href="mailto:eugen.hildt@gmail.com">EMAIL</a> —
  <a href="#">WIKI</a> —
  <a href="#">DONATE</a>
</div>