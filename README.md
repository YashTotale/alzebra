<p align="center">
    <a href="https://github.com/YashTotale/alzebra"><img src="https://raw.githubusercontent.com/YashTotale/alzebra/master/static/icon.png" alt="Alzebra" width="200"></img></a>
</p>
<h1 align="center">Alzebra</h1>
<p align="center">The All-In-One Herd of Linear Algebra Functions</p>
<p align="center"><strong><a href="https://alzebra.yashtotale.dev/">View the website for API documentation and more!</a></strong></p>
<p align="center">
<a href="https://www.npmjs.com/package/alzebra"><img src="https://img.shields.io/npm/v/alzebra?logo=npm&logoColor=FFFFFF&labelColor=000000&label=Version&style=flat-square" alt="Version"/></a>&nbsp;
<a href="https://www.npmjs.com/package/alzebra"><img src="https://img.shields.io/npm/dt/alzebra?logo=npm&logoColor=FFFFFF&labelColor=000000&label=Downloads&style=flat-square" alt="Downloads"/></a>&nbsp;
<a href="https://github.com/YashTotale/alzebra/actions?query=workflow%3A%22Node+CI%22"><img src="https://img.shields.io/github/workflow/status/YashTotale/alzebra/Node%20CI?logo=github&logoColor=FFFFFF&labelColor=000000&label=Build&style=flat-square" alt="Build"/></a>&nbsp;
<a href="https://codecov.io/gh/YashTotale/alzebra/"><img src="https://img.shields.io/codecov/c/github/YashTotale/alzebra?style=flat-square&label=Coverage&logo=Codecov&logoColor=FFFFFF&labelColor=000000" alt="Coverage"/></a>&nbsp;
</p>

## Table of Contents

- [Why should you use Alzebra?](#why-should-you-use-alzebra)
- [Installation](#installation)
- [Usage](#usage)
- [Website](#website)
- [Contributors](#contributors)

## Why should you use Alzebra?

- 🚀 [**<2kB** size](https://bundlephobia.com/package/alzebra) (zipped)
- ✨ TypeScript definitions **built in**
- 📖 **Thorough** and **detailed** documentation
- ✅ Tested **end-to-end** with Jest
- 🌟 Code quality **perfected** with linters ([Prettier](https://prettier.io/), [ESLint](https://eslint.org/), [EditorConfig](https://editorconfig.org/), [Markdownlint](https://github.com/DavidAnson/markdownlint)) to reduce **bundle size** and ensure **bug-free code**
- 💫 Automated [GitHub Workflows](https://github.com/YashTotale/alzebra/actions) ensure that every change is **high quality** and **functional**

## Installation

Using [npm](https://www.npmjs.com):

```shell
npm install alzebra
```

Using [yarn](https://yarnpkg.com/):

```shell
yarn add alzebra
```

You can browse the package's files on [unpkg](https://unpkg.com/browse/alzebra/).

## Usage

```javascript
// ESM: import Alzebra from "alzebra";
const Alzebra = require("alzebra");

const matrix = [
  [1, 1, 0],
  [0, 1, 1],
  [2, 1, 1],
];

const result = [10, 15, 25];

const solution = new Alzebra(input).eliminassian(result);

/**
 solution = {
  matrix: [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ],
  result: [5, 5, 10]
 }
*/
```

## Website

[![Website Status](https://img.shields.io/website?url=https%3A%2F%2Falzebra.yashtotale.dev%2F&style=flat-square&logo=github)](https://alzebra.yashtotale.dev/)

**[The website contains all API documentation and information about this package.](https://alzebra.yashtotale.dev/)**

## Contributors

Project Contributors ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://github.com/YashTotale"><img src="https://avatars.githubusercontent.com/u/30784592?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Yash Totale</b></sub></a><br /><a href="https://github.com/YashTotale/alzebra/commits?author=YashTotale" title="Code">💻</a> <a href="#ideas-YashTotale" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/YashTotale/alzebra/commits?author=YashTotale" title="Documentation">📖</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
