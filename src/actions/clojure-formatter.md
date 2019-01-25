---
path: '/clojure-formatter'
title: 'Clojure Formatter'
github_url: 'https://github.com/bltavares/actions'
author: 'bltavares'
tags: []
subtitle: 'This actions will check the formating of the project, using cljfmt.'
---

## Validations on Push

This actions will check the formating of the project, using
[cljfmt](https://github.com/weavejester/cljfmt).

`cljfmt` plugin required to be installed on your project,
as well as any variable needed to access all the dependencies of the project.

Given that this plugin uses `lein cljfmt`, it might need extra environment
variable and secrets, such as `AWS_ACCESS_KEY_ID` and `AWS_ACCESS_KEY_KEY`.

## Fixes on Pull Request review

This action provides automated fixes using Pull Request review comments.

If the comment starts with `fix $action_name` or `fix cljfmt`, a new commit will
be added to the branch with the automated fixes applied.

**Supports**: autofix on push

## Example workflow

```hcl
workflow "on push" {
  on = "push"
  resolves = ["cljfmt"]
}

# Used for fix on review
workflow "on review" {
  resolves = ["cljfmt"]
  on = "pull_request_review"
}

action "cljfmt" {
  uses = "bltavares/actions/cljfmt@master"
  # Enable autofix on push
  # args = ["autofix"]
  # Used for pushing changes for `fix` comments on review
  secrets = ["GITHUB_TOKEN"]
}
```
