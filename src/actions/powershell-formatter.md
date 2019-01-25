---
path: '/powershell-formatter'
title: 'Powershell formatter'
github_url: 'https://github.com/bltavares/actions'
author: 'bltavares'
tags: ['docker']
subtitle: 'This actions will check the formating of the Dockerfiles in the project, using Powershell-Beautiffier.'
---

## Validations on Push

This actions will check the formating of the Dockerfiles in the project, using
[Powershell-Beautiffier](https://github.com/DTW-DanWard/PowerShell-Beautifier)

Action name was changed just to provide a shorter version

## Fixes on Pull Request review

This action provides automated fixes using Pull Request review comments.

If the comment starts with `fix $action_name` or `fix pwshfmt`, a new commit
will be added to the branch with the automated fixes applied.

**Supports**: autofix on push

## Example workflow

```hcl
workflow "on push" {
  on = "push"
  resolves = ["pwshfmt"]
}

workflow "on review" {
  resolves = ["pwshfmt"]
  on = "pull_request_review"
}

action "pwshfmt" {
  uses = "bltavares/actions/pwshfmt@master"
  # Enable autofix on push
  # args = ["autofix"]
  # Used for pushing changes for `fix` comments on review
  secrets = ["GITHUB_TOKEN"]
}
```
