---
path: '/phpqa'
title: 'PHPQA toolsuite'
github_url: 'https://github.com/mickaelandrieu/phpqa-ga'
author: 'mickaelandrieu'
subtitle: 'PHPQA toolsuite action.'
---

## Usage

You can use it as a Github Action like this:

_.github/main.workflow_

```
workflow "Main" {
  on = "push"
  resolves = ["PHPQA"]
}

action "PHPQA" {
  uses = "docker://mickaelandrieu/phpqa-ga"
  secrets = ["GITHUB_TOKEN"]
  args = "--report --output=cli"
}
```

**You can copy/paste the .github folder (under examples/) to your project and thats all!**

## Docker

A Docker-Image is built automatically and located here:
https://cloud.docker.com/u/mickaelandrieu/repository/docker/mickaelandrieu/phpqa-ga

You can run it in any given directory like this:

`docker run --rm -it -w=/app -v ${PWD}:/app mickaelandrieu/phpqa-ga:latest tools`
