---
path: '/size-label'
title: 'Assign size labels'
github_url: 'https://github.com/pascalgn/size-label-action'
author: 'Pascal'
twitter: '@pascalgn'
tags: ['label', 'assign']
subtitle: 'GitHub action to assign labels based on pull request change sizes.'
---

Labels are taken from https://github.com/kubernetes/kubernetes/labels?q=size

## Usage

Add this to your `.github/main.workflow` file:

```
workflow "on pull request changes, assign size labels" {
  on = "pull_request"
  resolves = ["assign size labels"]
}

action "assign size labels" {
  uses = "pascalgn/size-label-action@6e8642272f404d447c8a912dc095295f70341724"
  secrets = ["GITHUB_TOKEN"]
}
```
