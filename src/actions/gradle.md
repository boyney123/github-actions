---
path: '/gradle'
title: 'gradle'
github_url: 'https://github.com/MrRamych/gradle-actions'
author: 'MrRamych'
subtitle: 'Github Actions for Gradle'
tags: ['github', 'github-actions', 'workflow', 'gradle', 'wrapper']
---

# Github Actions for Gradle

Execute [Gradle](https://github.com/gradle/gradle) task using wrapper.

## Usage

To create action in visual editor use `MrRamych/gradle-actions@master` repo.

The `args` represent the task to be executed.

## Example

An example `main.workflow` file to run tests on push.

```
workflow "Push" {
  on = "push"
  resolves = ["Test"]
}

action "Test" {
  uses = "MrRamych/gradle-actions@master"
  args = "test"
}
```
