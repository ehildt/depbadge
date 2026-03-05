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

![github](https://img.shields.io/github/release/ehildt/depbadge?labelColor=hsl%280%2C+0%25%2C+20%25%29&style=for-the-badge&cacheSeconds=3600&color=hsl%2827%2C65%25%2C42%25%29&logo=github&logoColor=hsl%2827%2C65%25%2C42%25%29&logoWidth=40&branch=main)
![github](https://img.shields.io/github/stars/ehildt/depbadge?labelColor=hsl%280%2C+0%25%2C+20%25%29&style=for-the-badge&cacheSeconds=3600&color=hsl%2827%2C65%25%2C42%25%29&logo=github&logoColor=hsl%2827%2C65%25%2C42%25%29&logoWidth=40&branch=main)
![github](https://img.shields.io/github/license/ehildt/depbadge?labelColor=hsl%280%2C+0%25%2C+20%25%29&style=for-the-badge&cacheSeconds=3600&color=hsl%2827%2C65%25%2C42%25%29&logo=github&logoColor=hsl%2827%2C65%25%2C42%25%29&logoWidth=40&branch=main)
![codecov](https://img.shields.io/codecov/c/github/ehildt/depbadge?labelColor=hsl%280%2C+0%25%2C+20%25%29&cacheSeconds=3600&logo=npm&logoColor=hsl%28253%2C68%25%2C41%25%29&logoWidth=40&style=for-the-badge&color=hsl%28253%2C68%25%2C41%25%29&branch=main)

</div>

<br>

<div align="center">

[![colord](https://img.shields.io/badge/colord-v2.9.3-hsl(297%2C75%25%2C44%25).svg?labelColor=hsl%280%2C+0%25%2C+20%25%29&cacheSeconds=3600&logo=npm&logoColor=hsl%28297%2C75%25%2C44%25%29&logoWidth=40&style=for-the-badge)](https://www.npmjs.com/package/example_package)
[![js-yaml](https://img.shields.io/badge/js_yaml-v4.1.1-hsl(259%2C68%25%2C54%25).svg?labelColor=hsl%280%2C+0%25%2C+20%25%29&cacheSeconds=3600&logo=npm&logoColor=hsl%28259%2C68%25%2C54%25%29&logoWidth=40&style=for-the-badge)](https://www.npmjs.com/package/example_package)
[![@iarna/toml](https://img.shields.io/badge/_iarna_toml-v2.2.5-hsl(348%2C64%25%2C54%25).svg?labelColor=hsl%280%2C+0%25%2C+20%25%29&cacheSeconds=3600&logo=toml&logoColor=hsl%28348%2C64%25%2C54%25%29&logoWidth=40&style=for-the-badge)](https://www.npmjs.com/package/example_package)

</div>

<br>

<div align="center">

[![@changesets/cli](https://img.shields.io/badge/_changesets_cli-v2.30.0-hsl(82%2C70%25%2C43%25).svg?labelColor=hsl%280%2C+0%25%2C+20%25%29&cacheSeconds=3600&logo=npm&logoColor=hsl%2882%2C70%25%2C43%25%29&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![@eslint/js](https://img.shields.io/badge/_eslint_js-v10.0.1-hsl(279%2C66%25%2C40%25).svg?labelColor=hsl%280%2C+0%25%2C+20%25%29&cacheSeconds=3600&logo=eslint&logoColor=hsl%28279%2C66%25%2C40%25%29&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![@types/eslint](https://img.shields.io/badge/_types_eslint-v9.6.1-hsl(303%2C68%25%2C53%25).svg?labelColor=hsl%280%2C+0%25%2C+20%25%29&cacheSeconds=3600&logo=eslint&logoColor=hsl%28303%2C68%25%2C53%25%29&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![@types/jest](https://img.shields.io/badge/_types_jest-v30.0.0-hsl(218%2C76%25%2C45%25).svg?labelColor=hsl%280%2C+0%25%2C+20%25%29&cacheSeconds=3600&logo=jest&logoColor=hsl%28218%2C76%25%2C45%25%29&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![@types/node](https://img.shields.io/badge/_types_node-v25.3.3-hsl(352%2C78%25%2C47%25).svg?labelColor=hsl%280%2C+0%25%2C+20%25%29&cacheSeconds=3600&logo=node&logoColor=hsl%28352%2C78%25%2C47%25%29&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![@types/supertest](https://img.shields.io/badge/_types_supertest-v7.2.0-hsl(319%2C76%25%2C40%25).svg?labelColor=hsl%280%2C+0%25%2C+20%25%29&cacheSeconds=3600&logo=npm&logoColor=hsl%28319%2C76%25%2C40%25%29&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![depcheck](https://img.shields.io/badge/depcheck-v1.4.7-hsl(145%2C62%25%2C41%25).svg?labelColor=hsl%280%2C+0%25%2C+20%25%29&cacheSeconds=3600&logo=npm&logoColor=hsl%28145%2C62%25%2C41%25%29&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![dependency-cruiser](https://img.shields.io/badge/dependency_cruiser-v17.3.8-hsl(355%2C69%25%2C45%25).svg?labelColor=hsl%280%2C+0%25%2C+20%25%29&cacheSeconds=3600&logo=npm&logoColor=hsl%28355%2C69%25%2C45%25%29&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![dotenv-cli](https://img.shields.io/badge/dotenv_cli-v11.0.0-hsl(335%2C66%25%2C51%25).svg?labelColor=hsl%280%2C+0%25%2C+20%25%29&cacheSeconds=3600&logo=npm&logoColor=hsl%28335%2C66%25%2C51%25%29&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![eslint](https://img.shields.io/badge/eslint-v10.0.2-hsl(249%2C63%25%2C44%25).svg?labelColor=hsl%280%2C+0%25%2C+20%25%29&cacheSeconds=3600&logo=eslint&logoColor=hsl%28249%2C63%25%2C44%25%29&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![eslint-config-prettier](https://img.shields.io/badge/eslint_config_prettier-v10.1.8-hsl(42%2C75%25%2C44%25).svg?labelColor=hsl%280%2C+0%25%2C+20%25%29&cacheSeconds=3600&logo=prettier&logoColor=hsl%2842%2C75%25%2C44%25%29&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![eslint-plugin-prettier](https://img.shields.io/badge/eslint_plugin_prettier-v5.5.5-hsl(41%2C64%25%2C50%25).svg?labelColor=hsl%280%2C+0%25%2C+20%25%29&cacheSeconds=3600&logo=prettier&logoColor=hsl%2841%2C64%25%2C50%25%29&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![eslint-plugin-simple-import-sort](https://img.shields.io/badge/eslint_plugin_simple_import_sort-v12.1.1-hsl(113%2C70%25%2C48%25).svg?labelColor=hsl%280%2C+0%25%2C+20%25%29&cacheSeconds=3600&logo=npm&logoColor=hsl%28113%2C70%25%2C48%25%29&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![eslint-plugin-sonarjs](https://img.shields.io/badge/eslint_plugin_sonarjs-v4.0.0-hsl(334%2C72%25%2C46%25).svg?labelColor=hsl%280%2C+0%25%2C+20%25%29&cacheSeconds=3600&logo=sonar&logoColor=hsl%28334%2C72%25%2C46%25%29&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![globals](https://img.shields.io/badge/globals-v17.4.0-hsl(208%2C65%25%2C42%25).svg?labelColor=hsl%280%2C+0%25%2C+20%25%29&cacheSeconds=3600&logo=npm&logoColor=hsl%28208%2C65%25%2C42%25%29&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![husky](https://img.shields.io/badge/husky-v9.1.7-hsl(204%2C60%25%2C45%25).svg?labelColor=hsl%280%2C+0%25%2C+20%25%29&cacheSeconds=3600&logo=husky&logoColor=hsl%28204%2C60%25%2C45%25%29&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![jest](https://img.shields.io/badge/jest-v30.2.0-hsl(228%2C68%25%2C44%25).svg?labelColor=hsl%280%2C+0%25%2C+20%25%29&cacheSeconds=3600&logo=jest&logoColor=hsl%28228%2C68%25%2C44%25%29&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![jest-extended](https://img.shields.io/badge/jest_extended-v7.0.0-hsl(26%2C75%25%2C49%25).svg?labelColor=hsl%280%2C+0%25%2C+20%25%29&cacheSeconds=3600&logo=jest&logoColor=hsl%2826%2C75%25%2C49%25%29&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![jest-junit](https://img.shields.io/badge/jest_junit-v16.0.0-hsl(93%2C76%25%2C47%25).svg?labelColor=hsl%280%2C+0%25%2C+20%25%29&cacheSeconds=3600&logo=jest&logoColor=hsl%2893%2C76%25%2C47%25%29&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![jiti](https://img.shields.io/badge/jiti-v2.6.1-hsl(132%2C63%25%2C44%25).svg?labelColor=hsl%280%2C+0%25%2C+20%25%29&cacheSeconds=3600&logo=npm&logoColor=hsl%28132%2C63%25%2C44%25%29&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![lint-staged](https://img.shields.io/badge/lint_staged-v16.3.2-hsl(48%2C74%25%2C51%25).svg?labelColor=hsl%280%2C+0%25%2C+20%25%29&cacheSeconds=3600&logo=npm&logoColor=hsl%2848%2C74%25%2C51%25%29&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![npm-check-updates](https://img.shields.io/badge/npm_check_updates-v19.6.3-hsl(131%2C73%25%2C44%25).svg?labelColor=hsl%280%2C+0%25%2C+20%25%29&cacheSeconds=3600&logo=npm&logoColor=hsl%28131%2C73%25%2C44%25%29&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![rimraf](https://img.shields.io/badge/rimraf-v6.1.3-hsl(145%2C65%25%2C40%25).svg?labelColor=hsl%280%2C+0%25%2C+20%25%29&cacheSeconds=3600&logo=npm&logoColor=hsl%28145%2C65%25%2C40%25%29&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![source-map-support](https://img.shields.io/badge/source_map_support-v0.5.21-hsl(124%2C63%25%2C49%25).svg?labelColor=hsl%280%2C+0%25%2C+20%25%29&cacheSeconds=3600&logo=npm&logoColor=hsl%28124%2C63%25%2C49%25%29&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![supertest](https://img.shields.io/badge/supertest-v7.2.2-hsl(317%2C74%25%2C50%25).svg?labelColor=hsl%280%2C+0%25%2C+20%25%29&cacheSeconds=3600&logo=npm&logoColor=hsl%28317%2C74%25%2C50%25%29&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![ts-jest](https://img.shields.io/badge/ts_jest-v29.4.6-hsl(194%2C77%25%2C45%25).svg?labelColor=hsl%280%2C+0%25%2C+20%25%29&cacheSeconds=3600&logo=jest&logoColor=hsl%28194%2C77%25%2C45%25%29&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![ts-loader](https://img.shields.io/badge/ts_loader-v9.5.4-hsl(225%2C73%25%2C43%25).svg?labelColor=hsl%280%2C+0%25%2C+20%25%29&cacheSeconds=3600&logo=npm&logoColor=hsl%28225%2C73%25%2C43%25%29&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![ts-node](https://img.shields.io/badge/ts_node-v10.9.2-hsl(328%2C76%25%2C44%25).svg?labelColor=hsl%280%2C+0%25%2C+20%25%29&cacheSeconds=3600&logo=npm&logoColor=hsl%28328%2C76%25%2C44%25%29&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![ts-unused-exports](https://img.shields.io/badge/ts_unused_exports-v11.0.1-hsl(262%2C67%25%2C45%25).svg?labelColor=hsl%280%2C+0%25%2C+20%25%29&cacheSeconds=3600&logo=npm&logoColor=hsl%28262%2C67%25%2C45%25%29&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![typescript](https://img.shields.io/badge/typescript-v5.9.3-hsl(253%2C60%25%2C45%25).svg?labelColor=hsl%280%2C+0%25%2C+20%25%29&cacheSeconds=3600&logo=typescript&logoColor=hsl%28253%2C60%25%2C45%25%29&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)
[![typescript-eslint](https://img.shields.io/badge/typescript_eslint-v8.56.1-hsl(345%2C71%25%2C52%25).svg?labelColor=hsl%280%2C+0%25%2C+20%25%29&cacheSeconds=3600&logo=eslint&logoColor=hsl%28345%2C71%25%2C52%25%29&logoWidth=40&style=flat-square)](https://www.npmjs.com/package/example_package)

</div>
<!-- DEPBADGE:END -->

<br>


<div align="center">

[E-MAIL](mailto:eugen.hildt@gmail.com) &nbsp;—&nbsp; [WIKI](https://github.com/ehildt/depbadge/wiki) &nbsp;—&nbsp; [ISSUES](https://github.com/ehildt/depbadge/issues) &nbsp;—&nbsp; [DONATE](https://github.com/sponsors/ehildt)


</div>
<br>