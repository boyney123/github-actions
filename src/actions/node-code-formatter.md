---
path: "/node-code-formatter"
title: "node-code-formatter"
github_url: "https://github.com/MarvinJWendt/run-node-formatter"
author: "MarvinJWendt"
subtitle: "Automatically formats your code with your preferred code formatter!"
tags: ["formatter", "format", "linter", "node", "style", "standard", "prettier"]
---
# Node Code Formatter

[![GitHub Action](https://img.shields.io/badge/-GitHub_Action-black?logo=github&style=flat-square)](https://github.com/marketplace/actions/node-code-formatter)
[![GitHub license](https://img.shields.io/github/license/MarvinJWendt/run-node-formatter?style=flat-square)](https://github.com/MarvinJWendt/run-node-formatter/blob/master/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/MarvinJWendt/run-node-formatter)](https://github.com/MarvinJWendt/run-node-formatter/issues)
[![GitHub stars](https://img.shields.io/github/stars/MarvinJWendt/run-node-formatter?style=flat-square)](https://github.com/MarvinJWendt/run-node-formatter/stargazers)

> Automatically formats your code!

## Automatically format pull requests

_Never tell your users to format their code, as we do it on the fly!_

![image](https://user-images.githubusercontent.com/31022056/64829627-6457d300-d5cd-11e9-9bc0-6a35d095ec64.png)

## Usage :pencil2:

1. Create a `formatter.yml` file in `.github/workflows/`
2. Paste this code into the file:

```yml
on: push
name: Node Code Formatter
jobs:
  lint:
    name: Node Code Formatter
    runs-on: ubuntu-latest
    steps:
    - name: Node Code Formatter
      uses: MarvinJWendt/run-node-formatter@1.2.1
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

3. Commit the file :twisted_rightwards_arrows:

## Setup formatter scripts :clipboard:

Simply put your code formatter into a script named `format` or `lint` in your `package.json` (Yarn only supports a `lint` script at the moment).

**Make sure that your code formatter is a dependency of your module!**

### StandardJS

```json
...
"scripts": {
    "format": "standard --fix"
  }
```

### Prettier

```json
...
"scripts": {
    "format": "prettier"
  }
```