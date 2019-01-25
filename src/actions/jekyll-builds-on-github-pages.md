---
path: '/jekyll-builds-on-github-pages'
title: 'Custom Jekyll Builds on GitHub Pages'
github_url: 'https://github.com/BryanSchuetz/jekyll-deploy-gh-pages'
author: 'BryanSchuetz'
tags: []
subtitle: '
A GitHub Action for building and deploying a Jekyll repo back to its gh-pages branch. Why not just let GitHub Pages build it? Becaues this way we can use our own custom Jekyll plugins and build scripts.'
---

## Secrets

- `GITHUB_TOKEN`: Access key scoped to the repository, we need this to push the site files back to the repo. (specify in workflow)

## Environment Variables

- `GITHUB_ACTOR`: Username of repo owner or object intiating the action (GitHub Provides)
- `GITHUB_REPO`: Owner/Repository (GitHub Provides)

## Examples

```hcl
workflow "Deploy Site" {
  on = "push"
  resolves = ["Build and Deploy Jekyll"]
}

action "Build and Deploy Jekyll" {
  uses = "BryanSchuetz/jekyll-deploy-gh-pages@master"
  secrets = ["GITHUB_TOKEN"]
}
```

Clones the repo, builds the site, and commits it back to the gh-pages branch of the repository.

## Caveats

- Needs a .gemfile
- `destination:` should be set to `./build` in your \_config.yml file—as God demands.
- Be sure that any custom gems needed are included in your Gemfile.
- If you're looking to seperate out the build/deploy steps of this action so you can throw your own actions in between them, look at the limited build and deploy actions in this rpo.
