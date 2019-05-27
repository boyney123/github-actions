---
path: '/wordpress-pot-generator'
title: 'WordPress Pot Generator'
github_url: 'https://github.com/wpapps/wp-pot-generator'
author: 'Varun Sridharan'
tags: ['wordpress']
subtitle: 'Generate POT Files for your wordpress Plugin / Theme based on the content inside Github Repo'
---

<p align="center">
<img src="https://user-images.githubusercontent.com/1039236/51209809-253a8a80-1937-11e9-9dc1-0267bcb74390.png" />
</p>

<p align="center">
<a href="https://github.com/wpapps/wp-pot-generator"><img src="https://img.shields.io/github/license/wpapps/wp-pot-generator.svg" alt="Licence"></a>
<a href="https://github.com/wpapps/wp-pot-generator"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="PRs"></a>
</p>

# WordPress Pot Generator - ***Github Action***
This Action Generates POT Files for your wordpress Plugin / Theme based on the content inside Github Repo

## Configuration
* `SAVE_PATH` - Location / Path to save POT File **Required**
* `ITEM_SLUG` - Slug of your WordPress Theme / Plugin Slug  **Required**
* `DOMAIN` - WordPress Theme / Plugin ***TextDomain***
* `PACKAGE_NAME` - WordPress Theme / Plugin Name
* `GITHUB_TOKEN` - you do not need to generate one but you do have to explicitly make it available to the Action
* `HEADERS`  - Array in JSON format of custom headers which will be added to the POT file. Defaults to empty array.

## Example Workflow File
```
workflow "Deploy" {
  resolves = ["WordPress Pot Generator"]
  on = "push"
}

action "WordPress Pot Generator" {
  uses = "varunsridharan/wordpress-pot-generator@master"
  env = {
    SAVE_PATH = "langs/filename.pot"
    ITEM_SLUG = "your-textdomain"
  }
  secrets = ["GITHUB_TOKEN"]
}
```
