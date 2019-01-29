---
path: '/dart-formatter'
title: 'Dart & flutter formatter'
github_url: 'https://github.com/bltavares/actions'
author: 'bltavares'
tags: ['dart', 'flutter', 'dartfmt', 'autofixer']
subtitle: 'This actions will check the formating of a Dart (or Flutter) project, using dartfmt.'
---

## Validations on Push

This actions will check the formating of a Dart (or Flutter) project,
using [dartfmt](https://github.com/dart-lang/dart_style).

## Fixes on Pull Request review

This action provides automated fixes using Pull Request review comments.

If the comment starts with `fix $action_name` or `fix dartfmt`, a new commit
will be added to the branch with the automated fixes applied.

**Supports**: autofix on push

## Example workflow

```hcl
workflow "on push" {
  on = "push"
  resolves = ["dartfmt"]
}

workflow "on review" {
  resolves = ["dartfmt"]
  on = "pull_request_review"
}

action "dartfmt" {
  uses = "bltavares/actions/dartfmt@master"
  # Enable autofix on push
  # args = ["autofix"]
  # Used for pushing changes for `fix` comments on review
  secrets = ["GITHUB_TOKEN"]
}
```
