---
path: '/composer'
title: 'Composer'
github_url: 'https://github.com/pxgamer/composer-action'
author: 'Owen Voke'
twitter: '@pxgamer112'
tags: ['php', 'composer']
subtitle: 'GitHub Action for interacting with Composer.'
---

 # Action details 

This Action for [Composer](https://getcomposer.org) enables arbitrary actions with the Composer command-line client.

## Usage

Via GitHub Workflow

```hcl
action "Composer Install" {
  uses = "pxgamer/composer-action"
  args = "install"
}
```

