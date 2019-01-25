---
path: '/php-stan'
title: 'PHPStan'
github_url: 'https://github.com/OskarStark/phpstan-ga'
author: 'OskarStark'
tags: []
subtitle: 'PHPStan Static code analyzer Action.'
---

## Usage

You can use it as a Github Action like this:

_.github/main.workflow_

```
workflow "Main" {
  on = "push"
  resolves = ["PHPStan"]
}

action "PHPStan" {
  uses = "docker://oskarstark/phpstan-ga"
  secrets = ["GITHUB_TOKEN"]
  args = "analyse src/"
}
```

_to use a specific level:_

```diff
workflow "Main" {
  on = "push"
  resolves = ["PHPStan"]
}

action "PHPStan" {
  uses = "docker://oskarstark/phpstan-ga"
  secrets = ["GITHUB_TOKEN"]
+  args = "analyse src/ --level=4"
}
```

**You can copy/paste the .github folder (under examples/) to your project and thats all!**

## Docker

A Docker-Image is built automatically and located here:
https://cloud.docker.com/u/oskarstark/repository/docker/oskarstark/phpstan-ga

You can run it in any given directory like this:

`docker run --rm -it -w=/app -v ${PWD}:/app oskarstark/phpstan-ga:latest analyse src/`
