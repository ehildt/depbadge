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



![optional](https://img.shields.io/github/stars/ehildt/depbadge?color=hsl%2827%2C65%25%2C42%25%29&labelColor=%23222222&cacheSeconds=3600&style=for-the-badge&branch=main)
![optional](https://img.shields.io/github/license/ehildt/depbadge?color=hsl%2827%2C65%25%2C42%25%29&labelColor=%23222222&cacheSeconds=3600&style=for-the-badge&branch=main)
![DEPBADGE](https://img.shields.io/docker/pulls/ehildt/myimage?style=for-the-badge)
![optional](https://img.shields.io/codecov/c/github/ehildt/depbadge?style=for-the-badge&branch=main)

![chalk](https://img.shields.io/badge/chalk-v5.6.2-hsl(35%2C63%25%2C43%25).svg?labelColor=%23222222&cacheSeconds=3600&style=for-the-badge)
![js-yaml](https://img.shields.io/badge/js_yaml-v4.1.1-hsl(259%2C68%25%2C54%25).svg?labelColor=%23222222&cacheSeconds=3600&style=for-the-badge)

![depcheck](https://img.shields.io/badge/depcheck-v1.4.7-hsl(145%2C62%25%2C41%25).svg?labelColor=%23222222&cacheSeconds=3600&style=for-the-badge)
![dependency-cruiser](https://img.shields.io/badge/dependency_cruiser-v17.3.8-hsl(355%2C69%25%2C45%25).svg?labelColor=%23222222&cacheSeconds=3600&style=for-the-badge)
![dotenv-cli](https://img.shields.io/badge/dotenv_cli-v11.0.0-hsl(335%2C66%25%2C51%25).svg?labelColor=%23222222&cacheSeconds=3600&style=for-the-badge)
![eslint](https://img.shields.io/badge/eslint-v10.0.1-hsl(249%2C63%25%2C44%25).svg?labelColor=%23222222&cacheSeconds=3600&style=for-the-badge)
![husky](https://img.shields.io/badge/husky-v9.1.7-hsl(204%2C60%25%2C45%25).svg?labelColor=%23222222&cacheSeconds=3600&style=for-the-badge)
![jest](https://img.shields.io/badge/jest-v30.2.0-hsl(228%2C68%25%2C44%25).svg?labelColor=%23222222&cacheSeconds=3600&style=for-the-badge)
![jiti](https://img.shields.io/badge/jiti-v2.6.1-hsl(132%2C63%25%2C44%25).svg?labelColor=%23222222&cacheSeconds=3600&style=for-the-badge)
![lint-staged](https://img.shields.io/badge/lint_staged-v16.2.7-hsl(48%2C74%25%2C51%25).svg?labelColor=%23222222&cacheSeconds=3600&style=for-the-badge)
![npm-check-updates](https://img.shields.io/badge/npm_check_updates-v19.4.1-hsl(131%2C73%25%2C44%25).svg?labelColor=%23222222&cacheSeconds=3600&style=for-the-badge)
![rimraf](https://img.shields.io/badge/rimraf-v6.1.3-hsl(145%2C65%25%2C40%25).svg?labelColor=%23222222&cacheSeconds=3600&style=for-the-badge)
![supertest](https://img.shields.io/badge/supertest-v7.2.2-hsl(317%2C74%25%2C50%25).svg?labelColor=%23222222&cacheSeconds=3600&style=for-the-badge)
![typescript](https://img.shields.io/badge/typescript-v5.9.3-hsl(253%2C60%25%2C45%25).svg?labelColor=%23222222&cacheSeconds=3600&style=for-the-badge)

</div>
<!-- DEPBADGE:END -->

<br>
<br>

<div align="center">
  <a href="mailto:eugen.hildt@gmail.com">EMAIL</a> —
  <a href="#">WIKI</a> —
  <a href="#">DONATE</a>
</div>