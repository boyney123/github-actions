---
path: "/pandoc"
title: "pandoc"
github_url: "https://github.com/maxheld83/pandoc"
author: "maxheld83"
subtitle: "GitHub action to run pandoc"
tags: ["github-actions","continuous-delivery","pandoc","latex","markdown","html"]
---
# GitHub Action to Convert Documents via Pandoc

[![Actions Status](https://wdp9fww0r9.execute-api.us-west-2.amazonaws.com/production/badge/maxheld83/pandoc)](https://github.com/maxheld83/pandoc/actions)
[![GitHubActions](https://img.shields.io/badge/as%20seen%20on%20-GitHubActions-blue.svg)](https://github-actions.netlify.com/pandoc)

This action lets you use [pandoc](https://pandoc.org/), the **swiss army knife of document conversion**.

It is based on the [`pandoc/latex`](https://hub.docker.com/r/pandoc/latex/) docker image and thus ships with LaTeX, so you can also convert right through to PDF.
The action currently uses pandoc 2.6 and will be upgrade periodically. 


## Secrets

None.


## Environment Variables

- `OUT_DIR` (optional) a path relative from `workspace/github` (~ your repository root) *without* trailing slash.
  
  It's often useful to have pandoc output to a separate directory, for example for easier deployment.
  You can *create* such a directory using the `OUT_DIR` environment variable.
  
  If you've set it, the directory will be `mkdir`ed.
  Remember to point the output argument of your pandoc call in the `args` section to this new directory.


## Arguments

All arguments get appended to the [`pandoc` command](https://pandoc.org/MANUAL.html).


## Example Usage

This is the action block used to render the website for this action.

```
action "Convert" {
  uses = "maxheld83/pandoc@v0.1.0"
  env = {
    OUT_DIR = "public"
  }
  args = [
    "--standalone",
    "--output=public/index.html",
    "README.md"
  ]
}
```
