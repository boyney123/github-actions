---
path: '/wordpress-pot-generator'
title: 'WordPress Pot Generator'
github_url: 'https://github.com/varunsridharan/action-wp-pot-generator'
author: 'Varun Sridharan'
tags: ['wordpress']
subtitle: 'Generates POT Files for your wordpress Plugin / Theme based on the content inside Github Repo'
---

<p align="center">
<img src="https://user-images.githubusercontent.com/1039236/51209809-253a8a80-1937-11e9-9dc1-0267bcb74390.png" />
</p>

<p align="center">
<a href="https://github.com/varunsridharan/action-wp-pot-generator"><img src="https://img.shields.io/github/license/varunsridharan/action-wp-textdomain.svg" alt="Licence"></a>
<a href="https://github.com/varunsridharan/action-wp-pot-generator"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="PRs"></a>
</p>


# WordPress Pot Generator - ***Github Action***
This Action Generates POT Files for your wordpress Plugin / Theme based on the content inside Github Repo

## Configuration
| Key | Default | Description |
| --- | ------- | ----------- |
| `SAVE_PATH` | ./ | Location / Path to save POT File **Required** |
| `ITEM_SLUG` | NULL | Slug of your WordPress Theme / Plugin Slug  **Required** |
| `DOMAIN` | NULL | WordPress Theme / Plugin ***TextDomain*** |
| `PACKAGE_NAME` | NULL | WordPress Theme / Plugin Name |
| `HEADERS`  | NULL | Array in JSON format of custom headers which will be added to the POT file. Defaults to empty array. |
| `GITHUB_TOKEN` | **secret** | you do not need to generate one but you do have to explicitly make it available to the Action |


> **⚠️ Note:** You Should Provide Github Token. If Not No Updated File Will Be Committed & Pushed

## Example Workflow File
```yaml
name: WordPress POT Generator

on:
  push:
    branches:
    - refs/tags/*

jobs:
  envatoftp:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v1
    - name: WordPress POT Generator
      uses: varunsridharan/action-wp-pot-generator@master
      with:
        save_path: './i8n'
        item_slug: 'wponion'
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
