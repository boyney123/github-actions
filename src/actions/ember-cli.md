---
path: '/ember-cli'
title: 'Ember Cli'
github_url: 'https://github.com/NuckChorris/ember-cli-actions'
author: 'NuckChorris'
tags: ['github']
subtitle: 'This Action for ember-cli enables arbitrary actions with the ember-cli command-line client, including deploying ember applications with ember-cl-deploy.'
---

## Usage

An example workflow to build, test, and publish an ember application follows:

```hcl
workflow "Build, Test, and Publish" {
  on = "push"
  resolves = ["Deploy"]
}

action "Build" {
  uses = "NuckChorris/ember-cli-actions@master"
  args = "install"
}

action "Test" {
  needs = "Build"
  uses = "NuckChorris/ember-cli-actions@master"
  args = "test"
}

action "Publish" {
  needs = "Test"
  uses = "NuckChorris/ember-cli-actions@master"
  args = "deploy --access public"
}
```
