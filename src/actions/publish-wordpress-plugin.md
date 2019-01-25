---
path: '/publish-wordpress-plugin'
title: 'Publish WordPress plugin'
github_url: 'https://github.com/lubusIN/actions'
author: 'lubusIN'
tags: []
subtitle: 'Github action to publish your WordPress plugin to wordpress.org plugin repository. Develop plugin on github and once done tag the release, sit back and relax. WordPress action will publish the release to wordpress.org SVN and create SVN tag based on the github release tag.'
---

<p align="center">
<img src="https://user-images.githubusercontent.com/1039236/51209809-253a8a80-1937-11e9-9dc1-0267bcb74390.png" />
</p>

<p align="center">
<a href="https://github.com/lubusIN/actions"><img src="https://img.shields.io/github/license/lubusIN/actions.svg" alt="Licence"></a>
<a href="https://github.com/lubusIN/actions"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="PRs"></a>
</p>

<center>
<a href="https://lubus.in/">
<img src="https://user-images.githubusercontent.com/1039236/40877801-3fa8ccf6-66a4-11e8-8f42-19ed4e883ce9.png" />
</a>
</center>

# WordPress

Github action to publish your WordPress plugin to wordpress.org plugin repository. Develop plugin on github and once done tag the release, sit back and relax. WordPress action will publish the release to wordpress.org SVN and create SVN tag based on the github release tag.

> _**Note**_:
>
> - WordPress action depends on [archive](https://github.com/lubusIN/actions/tree/master/archive) action to build the distibution archive which is published to wordpress.org SVN
> - Keep all assets for plugin repository under `.wordpress-org`
> - Create numeric release tag e.g. `1.0.0` as action uses same name for SVN tag folder

## Environment Variables

- **WP_SLUG**: plugin slug on wordpress.org

## Secrets

- **WP_USERNAME**: your wordpress.org username
- **WP_PASSWORD**: your wordpress.org password

## Example Workflow

```HCL
    # Workflow to publish plugin release to wordpress.org
    workflow "Release Plugin" {
        on = "push"
        resolves = ["wordpress"]
    }

    # Filter for tag
    action "tag" {
        uses = "actions/bin/filter@master"
        args = "tag"
    }

    # Install Dependencies
    action "install" {
        uses = "actions/npm@e7aaefe"
        needs = "tag"
        args = "install"
    }

    # Build Plugin
    action "build" {
        uses = "actions/npm@e7aaefe"
        needs = ["install"]
        args = "run build"
    }

    # Create Release ZIP archive
    action "archive" {
        uses = "lubusIN/actions/archive@master"
        needs = ["build"]
        env = {
                ZIP_FILENAME = "plugin-slug"
            }
    }

    # Publish to wordpress.org repository
    action "wordpress" {
        uses = "lubusIN/actions/wordpress@master"
        needs = ["archive"]
        env = {
            WP_SLUG = "plugin-slug"
        }
        secrets = [
            "WP_USERNAME",
            "WP_PASSWORD"
        ]
    }
```
