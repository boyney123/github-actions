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

```yml
on: push
name: CI
jobs:
  composer:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      # For YAML Actions, use v2 or later
      - uses: pxgamer/composer-action@master
        with:
          command: install --optimize-autoloader --prefer-dist
```
