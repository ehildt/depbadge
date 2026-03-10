# DEPBADGE

Depbadge is a CLI tool that automatically generates and maintains dependency and status badges for your project documentation — perfect for keeping your badges consistent and up-to-date.

It reads your project’s manifest and produces Shields-based badges rendered dynamically via Shields.io, fully compatible with GitHub, GitLab, and other platforms. All layout, grouping, styling, and badge composition are defined in a depbadgerc.yml configuration file, making the output deterministic, reproducible, and fully automated.

Depbadge handles both dependency badges and third-party status badges (e.g., releases, container metrics, coverage), injecting them directly into your target documentation file (default README.md) so your badges are always accurate. It also supports generating previews and structured definitions for inspection or CI/CD workflows.

By automating badge generation, Depbadge solves common problems: outdated badges, inconsistent styling, and manual maintenance overhead — keeping your documentation visually consistent and trustworthy.

<br>
<div align="center">

### Official / Extended Support

**`package.json`** – Node.js / JavaScript / TypeScript projects  
**`pyproject.toml`** – Python projects (PEP 621)  
**`Cargo.toml`** – Rust projects   

</div>
<br>
<br>

<!-- DEPBADGE:START -->
<div align="center">

![github](https://img.shields.io/github/release/ehildt/depbadge?labelColor=333&style=for-the-badge&cacheSeconds=3600&color=b16425&logo=github&logoColor=b16425&logoWidth=40&branch=main)
![github](https://img.shields.io/github/stars/ehildt/depbadge?labelColor=333&style=for-the-badge&cacheSeconds=3600&color=b16425&logo=github&logoColor=b16425&logoWidth=40&branch=main)
![github](https://img.shields.io/github/license/ehildt/depbadge?labelColor=333&style=for-the-badge&cacheSeconds=3600&color=b16425&logo=github&logoColor=b16425&logoWidth=40&branch=main)
![codecov](https://img.shields.io/codecov/c/github/ehildt/depbadge?labelColor=333&cacheSeconds=3600&logo=npm&logoColor=4021b0&logoWidth=40&style=for-the-badge&color=4021b0&branch=main)
![I_Love](https://img.shields.io/badge/I_Love-COOKIES-F3A?labelColor=333&cacheSeconds=3600&logo=npm&logoColor=b4cf2a&logoWidth=40&style=for-the-badge)

</div>

<br>

<div align="center">

[![colord](https://img.shields.io/badge/colord-v2.9.3-bc1cc4.svg?labelColor=333&cacheSeconds=3600&logo=npm&logoColor=bc1cc4&logoWidth=40&style=for-the-badge)](https://www.npmjs.com/package/example_package)
[![js-yaml](https://img.shields.io/badge/js_yaml-v4.1.1-6c3ad9.svg?labelColor=333&cacheSeconds=3600&logo=npm&logoColor=6c3ad9&logoWidth=40&style=for-the-badge)](https://www.npmjs.com/package/example_package)
[![@iarna/toml](https://img.shields.io/badge/_iarna_toml-v2.2.5-d53f5d.svg?labelColor=333&cacheSeconds=3600&logo=toml&logoColor=d53f5d&logoWidth=40&style=for-the-badge)](https://www.npmjs.com/package/example_package)

</div>

<br>

<div align="center">

[![@changesets/cli](https://img.shields.io/badge/_changesets_cli-v2.30.0-82ba21.svg?labelColor=333&cacheSeconds=3600&logo=npm&logoColor=82ba21&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![@eslint/js](https://img.shields.io/badge/_eslint_js-v10.0.1-7a23a9.svg?labelColor=333&cacheSeconds=3600&logo=eslint&logoColor=7a23a9&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![@types/eslint](https://img.shields.io/badge/_types_eslint-v9.6.1-d936d0.svg?labelColor=333&cacheSeconds=3600&logo=eslint&logoColor=d936d0&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![@types/jest](https://img.shields.io/badge/_types_jest-v30.0.0-1c5bca.svg?labelColor=333&cacheSeconds=3600&logo=jest&logoColor=1c5bca&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![@types/node](https://img.shields.io/badge/_types_node-v25.3.5-d51a33.svg?labelColor=333&cacheSeconds=3600&logo=node&logoColor=d51a33&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![@types/supertest](https://img.shields.io/badge/_types_supertest-v7.2.0-b41882.svg?labelColor=333&cacheSeconds=3600&logo=npm&logoColor=b41882&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![depcheck](https://img.shields.io/badge/depcheck-v1.4.7-28a95e.svg?labelColor=333&cacheSeconds=3600&logo=npm&logoColor=28a95e&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![dependency-cruiser](https://img.shields.io/badge/dependency_cruiser-v17.3.8-c22431.svg?labelColor=333&cacheSeconds=3600&logo=npm&logoColor=c22431&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![dotenv-cli](https://img.shields.io/badge/dotenv_cli-v11.0.0-d53074.svg?labelColor=333&cacheSeconds=3600&logo=npm&logoColor=d53074&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![eslint](https://img.shields.io/badge/eslint-v10.0.3-3f2ab7.svg?labelColor=333&cacheSeconds=3600&logo=eslint&logoColor=3f2ab7&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![eslint-config-prettier](https://img.shields.io/badge/eslint_config_prettier-v10.1.8-c4921c.svg?labelColor=333&cacheSeconds=3600&logo=prettier&logoColor=c4921c&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![eslint-plugin-prettier](https://img.shields.io/badge/eslint_plugin_prettier-v5.5.5-d19d2e.svg?labelColor=333&cacheSeconds=3600&logo=prettier&logoColor=d19d2e&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![eslint-plugin-simple-import-sort](https://img.shields.io/badge/eslint_plugin_simple_import_sort-v12.1.1-39d025.svg?labelColor=333&cacheSeconds=3600&logo=npm&logoColor=39d025&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![eslint-plugin-sonarjs](https://img.shields.io/badge/eslint_plugin_sonarjs-v4.0.1-ca216a.svg?labelColor=333&cacheSeconds=3600&logo=sonar&logoColor=ca216a&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![globals](https://img.shields.io/badge/globals-v17.4.0-2570b1.svg?labelColor=333&cacheSeconds=3600&logo=npm&logoColor=2570b1&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![husky](https://img.shields.io/badge/husky-v9.1.7-2e81b8.svg?labelColor=333&cacheSeconds=3600&logo=husky&logoColor=2e81b8&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![jest](https://img.shields.io/badge/jest-v30.2.0-2442bc.svg?labelColor=333&cacheSeconds=3600&logo=jest&logoColor=2442bc&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![jest-extended](https://img.shields.io/badge/jest_extended-v7.0.0-db701f.svg?labelColor=333&cacheSeconds=3600&logo=jest&logoColor=db701f&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![jest-junit](https://img.shields.io/badge/jest_junit-v16.0.0-6fd31d.svg?labelColor=333&cacheSeconds=3600&logo=jest&logoColor=6fd31d&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![jiti](https://img.shields.io/badge/jiti-v2.6.1-2ab746.svg?labelColor=333&cacheSeconds=3600&logo=npm&logoColor=2ab746&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![lint-staged](https://img.shields.io/badge/lint_staged-v16.3.2-dfba26.svg?labelColor=333&cacheSeconds=3600&logo=npm&logoColor=dfba26&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![npm-check-updates](https://img.shields.io/badge/npm_check_updates-v19.6.3-1ec23c.svg?labelColor=333&cacheSeconds=3600&logo=npm&logoColor=1ec23c&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![rimraf](https://img.shields.io/badge/rimraf-v6.1.3-24a85b.svg?labelColor=333&cacheSeconds=3600&logo=npm&logoColor=24a85b&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![source-map-support](https://img.shields.io/badge/source_map_support-v0.5.21-2ecc39.svg?labelColor=333&cacheSeconds=3600&logo=npm&logoColor=2ecc39&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![supertest](https://img.shields.io/badge/supertest-v7.2.2-de21a8.svg?labelColor=333&cacheSeconds=3600&logo=npm&logoColor=de21a8&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![ts-jest](https://img.shields.io/badge/ts_jest-v29.4.6-1aa2cb.svg?labelColor=333&cacheSeconds=3600&logo=jest&logoColor=1aa2cb&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![ts-loader](https://img.shields.io/badge/ts_loader-v9.5.4-1e46be.svg?labelColor=333&cacheSeconds=3600&logo=npm&logoColor=1e46be&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![ts-node](https://img.shields.io/badge/ts_node-v10.9.2-c51b76.svg?labelColor=333&cacheSeconds=3600&logo=npm&logoColor=c51b76&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![ts-unused-exports](https://img.shields.io/badge/ts_unused_exports-v11.0.1-5e26c0.svg?labelColor=333&cacheSeconds=3600&logo=npm&logoColor=5e26c0&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![typescript](https://img.shields.io/badge/typescript-v5.9.3-4c2eb8.svg?labelColor=333&cacheSeconds=3600&logo=typescript&logoColor=4c2eb8&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![typescript-eslint](https://img.shields.io/badge/typescript_eslint-v8.56.1-dc2e59.svg?labelColor=333&cacheSeconds=3600&logo=eslint&logoColor=dc2e59&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)

</div>
<!-- DEPBADGE:END -->

<br>


<div align="center">

[E-MAIL](mailto:eugen.hildt@gmail.com) &nbsp;—&nbsp; [WIKI](https://github.com/ehildt/depbadge/wiki) &nbsp;—&nbsp; [ISSUES](https://github.com/ehildt/depbadge/issues) &nbsp;—&nbsp; [DONATE](https://github.com/sponsors/ehildt)


</div>
<br>