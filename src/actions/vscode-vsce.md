---
path: '/vscode-vsce'
title: 'vscode deploying extensions'
github_url: 'https://github.com/lannonbr/vsce-action'
author: 'lannonbr'
tags: ['vscode']
subtitle: 'A GitHub Action to automate deploying VS Code extensions by using vsce. It will enable workflows to easily deploy your VS Code extensions to the marketplace.'
---

# Usage

Here's an example workflow which publishes an extension when you push to the master branch.

```workflow
workflow "Deploy Extension" {
  on = "push"
  resolves = ["Publish"]
}

# Install npm dependencies
# Note: --unsafe-perm is used as GitHub Actions does not run `npm run post-install` without it for some reason.
action "npm install" {
  uses = "actions/npm@33871a7"
  args = ["install", "--unsafe-perm"]
}

# Check for master branch
action "Master" {
  uses = "actions/bin/filter@master"
  args = "branch master"
  needs = ["npm install"]
}

# publish extension
action "Publish" {
  uses = "lannonbr/vsce-action@master"
  args = "publish -p $VSCE_TOKEN"
  needs = ["Master"]
  secrets = ["VSCE_TOKEN"]
}
```

# Secrets

The `VSCE_TOKEN` secret is used to authenticate with Azure DevOps when running the `vsce` CLI. You can find out how to create this token here on the VS Code Docs: [Publishing VS Code Extensions](https://code.visualstudio.com/docs/extensions/publish-extension)

# Example Use Cases

- Deploy nightly builds once a day if the `master` branch has changed since the last build.
- Deploy releases after PRs with a `Release` label are merged into Master.
- Promote new version of extension on social media with additional Actions.

Creating and publishing extensions with `vsce` is already fairly simple, but this will further integrate it into CI workflows with GitHub Actions.
