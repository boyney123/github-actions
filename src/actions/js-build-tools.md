---
path: '/js-build-tools'
title: 'JavaScript Build Tools'
github_url: 'https://github.com/elstudio/actions-js-build'
author: 'elstudio'
tags: []
subtitle: 'Run JS build tasks with Gulp, Grunt or NPM, then commit any changed files and push them back to your original repository. Perfect for Grunt or Gulp tasks that do CSS (or SASS/LESS) compilation or JS transpilation. If your build task changes files, these actions are for you.'
---

This repository contains two actions that may be used independently -- typically one after another:

- **build** (elstudio/actions-js-build/build@master): Looks for a gulpfile.js or Gruntfile.js in the working directory, then installs any required npm packages and runs the appropriate build tool. If it finds neither gulp or grunt, the script runs npm. Set the workflow `args` arguments to run the tasks of your choice.
- **commit** (elstudio/actions-js-build/commit@master): Commits any file changes, and pushes them back to the current branch of the origin repository on GitHub.

## Usage

An example workflow to run `grunt default` task to build, test, then commit and push any changes back to the GitHub origin repository:

```hcl
workflow "Grunt compile" {
  on = "push"
  resolves = ["Commit and Push"]
}

action "Build" {
  uses = "elstudio/actions-js-build/build@master"
  env = {
    WD_PATH = "./web/themes/nw8"
  }
  args = "default"
}

action "Commit and Push" {
  uses = "elstudio/actions-js-build/commit@master"
  needs = ["Build"]
  secrets = ["GITHUB_TOKEN"]
  env = {
    PUSH_BRANCH = "staging"
  }
}
```

### Secrets

- `GITHUB_TOKEN` - **Required**. The token to use for authentication with GitHub to commit and push changes back to the origin repository. ([more info](https://developer.github.com/actions/creating-github-actions/accessing-the-runtime-environment/#environment-variables))

### Environment variables

- `WD_PATH` - **Optional**. To specify a directory other than the repository root where NPM's Package.json and either gulpfile.js or Gruntfile.js may be found.
- `PUSH_BRANCH` - **Optional**. The branch that changes will be pushed to. Default is the currently checked out branch.
