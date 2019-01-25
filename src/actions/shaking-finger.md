---
path: '/shaking-finger'
title: 'Shaking Finger'
github_url: 'https://github.com/jessfraz/shaking-finger-action'
author: 'jessfraz'
tags: ['gif', 'fun']
subtitle: 'A GitHub action that displays a gif of Conan O`Brien shaking his finger to a pull request on fail. It will also automatically clean up the comment when the build passes :)'
---

[![Travis CI](https://img.shields.io/travis/jessfraz/shaking-finger-action.svg?style=for-the-badge)](https://travis-ci.org/jessfraz/shaking-finger-action)

A GitHub action that displays a gif of Conan O'Brien shaking his finger to a pull request on fail.

It will also automatically clean up the comment when the build passes :)

**Table of Contents**

<!-- toc -->

- [Usage](#usage)
- [Contributing](#contributing)
  - [Running the tests](#running-the-tests)

<!-- tocstop -->

## Usage

```
workflow "shaking finger action" {
  on = "pull_request"
  resolves = ["post gif on fail"]
}

action "post gif on fail" {
  uses = "jessfraz/shaking-finger-action@master"
  secrets = ["GITHUB_TOKEN"]
}
```

![demo](https://github.com/jessfraz/shaking-finger-action/raw/master/demo.png)

## Contributing

### Running the tests

The tests use [shellcheck](https://github.com/koalaman/shellcheck). You don't
need to install anything. They run in a container.

```console
$ make test
```
