---
path: '/a-branch-cleanup'
title: 'A Branch Cleanup'
github_url: 'https://github.com/jessfraz/branch-cleanup-action'
author: 'jessfraz'
subtitle: 'A GitHub action to automatically delete the branch after a pull request has been merged.'
---

[![Travis CI](https://img.shields.io/travis/jessfraz/branch-cleanup-action.svg?style=for-the-badge)](https://travis-ci.org/jessfraz/branch-cleanup-action)

> **NOTE:** This will **never** delete the repository's default branch. If the pull request is closed _without_ merging, it will **not** delete it.

**Table of Contents**

<!-- toc -->

- [Usage](#usage)
- [Contributing](#contributing)
  - [Running the tests](#running-the-tests)

<!-- tocstop -->

## Usage

```
workflow "on pull request merge, delete the branch" {
  on = "pull_request"
  resolves = ["branch cleanup"]
}

action "branch cleanup" {
  uses = "jessfraz/branch-cleanup-action@master"
  secrets = ["GITHUB_TOKEN"]
}
```

![demo](https://github.com/jessfraz/branch-cleanup-action/raw/master/demo.png)
