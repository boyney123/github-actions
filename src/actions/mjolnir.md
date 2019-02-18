---
path: "/gha-mjolnir"
title: "Mjolnir"
github_url: "https://github.com/ldez/gha-mjolnir"
author: "ldez"
subtitle: ":hammer: GitHub Action to close issues related to the merge of a pull request."
tags: ["github-action","issues","pull-requests","close"]
---
# Mjolnir

[![Release](https://img.shields.io/github/release/ldez/gha-mjolnir.svg?style=flat)](https://github.com/ldez/gha-mjolnir/releases)

Closes issues related to the merge of a pull request.

Useful:

- to close multiple issues related to a pull request.
- to close issues related to a pull request not based on the default branch (i.e. `master`).
By example when a branch is related to version (e.g. `v1.5`, `v2.0`, ...)

## Supported syntax

- prefixes (case insensitive): `close`, `closes`, `closed`, `fix`, `fixes`, `fixed`, `resolve`, `resolves`, `resolved`
- issues references separators (can be mixed): ` ` (space), `,` (period)
- prefix and issues references can be separated by: ` ` (space), `:` (colon), on both.

Examples:

```
Fixes #1,#2,#3
close #1, #2, #3
fix #1 #2 #3
resolve #1,#2 #3
Resolves: #1,#2,#3
closed : #1, #2, #3
```

## Usage

```hcl
workflow "Auto close issues" {
  on = "pull_request"
  resolves = ["mjolnir-issues"]
}

action "mjolnir-issues" {
  uses = "docker://ldez/gha-mjolnir"
  secrets = ["GITHUB_TOKEN"]
  args = ""
}
```
