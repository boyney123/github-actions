---
path: '/netlify-cli'
title: 'Netlify: CLI'
github_url: 'https://github.com/netlify/actions'
author: 'netlify'
tags: []
subtitle: 'This Action enables arbitrary actions with the Netlify CLI'
---

## Secrets

- `NETLIFY_AUTH_TOKEN` - _Required_ The token to use for authentication.
  [Obtain one with the UI](https://www.netlify.com/docs/cli/#obtain-a-token-in-the-netlify-ui)
- `NETLIFY_SITE_ID` - _Optional_ API site ID of the site you wanna work on
  [Obtain it from the UI](https://www.netlify.com/docs/cli/#link-with-an-environment-variable)

## Example

```hcl
workflow "Publish on Netlify" {
  on = "push"
  resolves = ["Publish"]
}

action "Publish" {
  uses = "netlify/actions/cli@master"
  args = "deploy --dir=site --functions=functions"
  secrets = ["NETLIFY_AUTH_TOKEN", "NETLIFY_SITE_ID"]
}
```
