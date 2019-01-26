---
path: '/gatsby-cli'
title: 'Gatsby CLI'
github_url: 'https://github.com/jzweifel/gatsby-cli-github-action'
author: 'Jacob Zweifel'
twitter: '@jacob_zweifel'
tags: [gatsby, cli]
subtitle: 'This Action wraps the Gatsby CLI to enable common Gatsby commands.'
---


# Action details

## Usage

```workflow
workflow "Build Gatsby Site" {
  on = "push"
  resolves = ["build"]
}

action "build" {
    uses = "jzweifel/gatsby-cli-github-action"
    args = "build"
}
```

```workflow
workflow "Build Gatsby Site in Subdirectory" {
  on = "push"
  resolves = ["build"]
}

action "build" {
    uses = "jzweifel/gatsby-cli-github-action"
    env = {
      GATSBY_PROJECT_PATH = "./client"
    }
    args = "build"
}
```

### Environment variables

* `GATSBY_PROJECT_PATH` - **Optional**. Directory from which to execute the Gatsby CLI.
