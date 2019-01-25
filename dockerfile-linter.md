---
path: '/dockerfile-linter'
title: 'Dockerfile linter'
github_url: 'https://github.com/bltavares/actions'
author: 'bltavares'
subtitle: 'This action will check the formating of the Dockerfiles in the project, using hadolint'
---

## Example Workflow

```
workflow "on push" {
  on = "push"
  resolves = ["hadolint"]
}

action "hadolint" {
  uses = "bltavares/actions/hadolint@master"
}
```
