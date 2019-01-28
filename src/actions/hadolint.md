---
path: '/hadolint'
title: 'Hadolint'
github_url: 'https://github.com/burdzwastaken/hadolint-action'
author: 'burdzwastaken'
tags: ['dockerfile', 'docker', 'hadolint']
subtitle: 'A GitHub action to run hadolint and reports violations given a Dockerfile within a repository on a pull request'
---

## Usage

```
workflow "hadolint action" {
  on = "pull_request"
  resolves = ["hadolint on pr"]
}

action "hadolint on pr" {
  uses = "burdzwastaken/hadolint-action@master"
  secrets = ["GITHUB_TOKEN"]
  env = {
    HADOLINT_ACTION_DOCKERFILE_FOLDER = "."
  }
}
```

## Environment Variables

| Name                                | Default | Description                                                                                             |
| ----------------------------------- | ------- | ------------------------------------------------------------------------------------------------------- |
| `HADOLINT_ACTION_DOCKERFILE_FOLDER` | `.`     | Which directory the `Dockerfile` to run hadolint on resides in. Relative to the root of the repository. |
| `HADOLINT_ACTION_COMMENT`           | `true`  | Set to `false` to disable commenting back on the PR with the violations found in the `Dockerfile`.      |

![demo](images/404-no-beta-access)

## TODO

- Let users supply their own configuration file
- Multiple `Dockerfile` support
