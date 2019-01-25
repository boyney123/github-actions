---
path: '/storybook-surge'
title: 'Storybook to Surge'
github_url: 'https://github.com/codeship/storybook-surge-github-action'
author: 'codeship'
tags: ['react']
subtitle: 'This action will take an existing storybook configuration and deploy that storybook to branch specific static surge.sh sites. Intended to be set up on `push`.'
---

### Required Secrets

You can set these up within the workflow editor tool.

- `SURGE_LOGIN`
- `SURGE_TOKEN`

### Behavior

When you push to your repository this action will:

- Start a pending GitHub Deployment for the branch
- Build your storybook
- Deploy your storybook to a public surge.sh site
- Update the pending GitHub Deployment with the URL of the storybook.

The urls follow the pattern:

    https://{repo_owner}-{repo_name}-storybook-{branch_name}.surge.sh

### Example workflow

```
workflow "Storybook" {
  on = "push"
  resolves = ["Publish Storybook to Surge.sh"]
}

action "Publish Storybook to Surge.sh" {
  uses = "codeship/storybook-surge-github-action@0.0.1"
  secrets = [
    "SURGE_LOGIN",
    "SURGE_TOKEN",
    "GITHUB_TOKEN",
  ]
}
```
