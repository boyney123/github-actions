---
path: '/wip'
title: 'Work In Progress'
github_url: 'https://github.com/wip/action'
author: 'wip'
subtitle: 'a work in progress action - work in progress'
tags: []
---

<p align=center><a href="https://github.com/wip/app/tree/master/assets"><img src="https://github.com/wip/app/raw/master/assets/wip-logo.png" alt="" width="200" height="200"></a></p>

<h1 align="center">DO NOT MERGE – as an action.</h1>

This GitHub Action sets a pull request status to pending if the title includes "WIP".

An example workflow looks like this (switch to the <kbd>`<> Edit new file`</kbd> tab when creating a new action and paste the code below):

```workflow
workflow "Set status on pull_request" {
  on = "pull_request"
  resolves = ["Set status"]
}

action "Set status" {
  uses = "wip/action@master"
  secrets = ["GITHUB_TOKEN"]
}
```
