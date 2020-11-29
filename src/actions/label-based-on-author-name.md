---
path: '/label-based-on-author-name'
title: 'Label based on author's name'
github_url: 'https://github.com/JulienKode/team-labeler-action'
author: 'Julien Karst'
twitter: '@julienkarst'
tags: ['PR', 'label']
subtitle: '⚡️ Github action to label your pull requests based on the author name ⚡️'
---

[![Actions Status](https://github.com/JulienKode/team-labeler-action/workflows/build-test/badge.svg)](https://github.com/JulienKode/team-labeler-action/actions)

# GitHub Actions to set a label based on the author name

This repository provides a **GitHub action** to automatically add a **label** on a **pull request** based on the author's name.

![example](https://github.com/JulienKode/team-labeler-action/assets/example.png)

## Configuration

### Create `.github/teams.yml`

You need to provide a yml file that contains members of your labels:

```yaml
LightSide:
  - '@Yoda'
  - '@Luke'

DarkSide:
  - '@DarkVador'
  - '@Palpatine'
```

## Usage

### Create `.github/workflows/team-labeler.yml`

Create a workflow (eg: `.github/workflows/team-labeler.yml` see [Creating a Workflow file](https://help.github.com/en/articles/configuring-a-workflow#creating-a-workflow-file)) to utilize the labeler action.
This action only needs the GITHUB_TOKEN secret as it interacts with the GitHub API to modify labels. The action can be used as such:

```yaml
on: pull-request
name: team-label
jobs:
  team-labeler:
    runs-on: ubuntu-latest
    steps:
    - uses: JulienKode/team-labeler-action@v0.1.0
      with:
        repo-token: "${{ secrets.GITHUB_TOKEN }}"
```
