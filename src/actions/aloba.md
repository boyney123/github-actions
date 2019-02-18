---
path: "/aloba"
title: "aloba"
github_url: "https://github.com/containous/aloba"
author: "containous"
subtitle: "Myrmica Aloba 🐜: Add labels and milestone on pull requests and issues."
tags: ["labels","milestone","github","pull-requests","issues","assign"]
---

# Myrmica Aloba 🐜: Add labels and milestone on pull requests and issues.

[![Release](https://img.shields.io/github/release/containous/aloba.svg?style=flat)](https://github.com/containous/aloba/releases)
[![Build Status](https://travis-ci.org/containous/aloba.svg?branch=master)](https://travis-ci.org/containous/aloba)
[![Docker Build Status](https://img.shields.io/docker/build/containous/aloba.svg)](https://hub.docker.com/r/containous/aloba/builds/)

- on new issue: adds the label `status/0-needs-triage`
- on new pull request:
    - adds the label `status/0-needs-triage`
    - adds labels based on [rules](#rules).
    - adds a milestone (if a milestone matches the based branch of the PR).
    - adds a label related to the size of the pull request.

## Usage

- `GITHUB_TOKEN`: Github Token.
- `.github/aloba-rules.toml`: the rules to apply.

```
Myrmica Aloba - GitHub Action.

Usage: action [--flag[=true|false| ]] [-f[true|false| ]] ...     set true/false to boolean flag(s)

Flags:
    --debug   Debug mode.                        (default "false")
    --dry-run Dry run mode.                      (default "true")
-h, --help    Print Help (this message) and exit
```

## Examples

```hcl
workflow "Aloba: Issues" {
  on = "issues"
  resolves = ["issue-labels"]
}

action "issue-labels" {
  uses = "docker://containous/aloba"
  secrets = ["GITHUB_TOKEN"]
  args = "action --dry-run=false"
}

workflow "Aloba: Pull Requests" {
  on = "pull_request"
  resolves = ["pull-request-labels"]
}

action "pull-request-labels" {
  uses = "docker://containous/aloba"
  secrets = ["GITHUB_TOKEN"]
  args = "action --dry-run=false"
}
```

## Rules

```toml
[[Rules]]
  Label = "area/vegetable"
  Regex = "(?i).*(tomate|carotte).*"

[[Rules]]
  Label = "area/cheese"
  Regex = "cheese/.*"

[[Rules]]
  Label = "area/infrastructure"
  Regex = "(?i)(\\.github|script/).*"

[Limits]
  [Limits.Small]
    SumLimit = 150
    DiffLimit = 70
    FilesLimit = 20
  [Limits.Medium]
    SumLimit = 400
    DiffLimit = 200
    FilesLimit = 50
```
