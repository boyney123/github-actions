---
path: '/webpack-stats-to-packtracker'
title: 'Webpack stats to packtracker.io'
github_url: 'https://github.com/packtracker/github-action'
author: 'packtracker'
subtitle: 'This GitHub action will upload your webpack build stats to the packtracker.io service.'
---

### Configuration

#### Secrets (Required)

- `PT_PROJECT_TOKEN` - your [packtracker.io](https://packtracker.io/?utm_source=github&utm_medium=action&utm_campaign=links) project token.

#### Environment variables (Optional)

- `WEBPACK_CONFIG_PATH` - the relative path to your webpack configuration (if you have one)

#### Workflow

A sample workflow file might look something like this

```
workflow "packtracker.io" {
  on = "push"
  resolves = ["Report to packtracker.io"]
}

action "Report to packtracker.io" {
  uses = "packtracker/github-action@1.1.2"
  secrets = ["PT_PROJECT_TOKEN"]
  env = {
    "WEBPACK_CONFIG_PATH" = "./config/webpack/production.js"
  }
}
```
