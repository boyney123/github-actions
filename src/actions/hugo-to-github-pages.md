---
path: '/hugo-to-github-pages'
title: 'Build Hugo static content site and publish it to gh-pages branch'
github_url: 'https://github.com/khanhicetea/gh-actions-hugo-deploy-gh-pages'
author: 'khanhicetea'
subtitle: 'GitHub Action for building and publishing Hugo-built site.'
---

Inspired by [BryanSchuetz/jekyll-deploy-gh-pages](https://github.com/BryanSchuetz/jekyll-deploy-gh-pages)

## Secrets

- `GITHUB_TOKEN` - _Required_ for pushing files to gh-pages branch.

## Environment Variables

NOTHING

## Example

**main.workflow**

```hcl
workflow "Deploy to GitHub Pages" {
  on = "push"
  resolves = ["hugo-deploy-gh-pages"]
}

action "hugo-deploy-gh-pages" {
  uses = "khanhicetea/gh-actions-hugo-deploy-gh-pages@master"
  secrets = ["GITHUB_TOKEN"]
}
```

## Example site

- https://github.com/khanhicetea/.com
