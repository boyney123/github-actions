---
path: '/cloudflare-workder'
title: 'Cloudflare worker'
github_url: 'https://github.com/cpilsworth/cloudflare-worker-action'
author: 'cpilsworth'
tags: ['github']
subtitle: 'A GitHub action to deploy a Cloudflare Worker on push to the master branch.'
---

[![Build Status](https://travis-ci.org/cpilsworth/cloudflare-worker-action.svg?branch=master)](https://travis-ci.org/cpilsworth/cloudflare-worker-action)

```hcl
workflow "on push to master, deploy worker to Cloudflare" {
  on = "push"
  resolves = ["worker deploy"]
}

action "worker deploy" {
  uses = "cpilsworth/cloudflare-worker-action@master"
  env = {
    CLOUDFLARE_EMAIL = "you@example.com",
    CLOUDFLARE_ZONE = "diffa.co.uk",
    WORKER_JS = "bin/worker.js",
  }
  secrets = [ "CLOUDFLARE_TOKEN" ]
}
```

_Heavily_ inspired by [Jessie Frazelle's](https://twitter.com/jessfraz) [aws-fargate-action](https://github.com/jessfraz/aws-fargate-action) GitHub action project. :trophy:

### Tests

The tests use [shellcheck](https://github.com/koalaman/shellcheck). You don't
need to install anything. They run in a container.

```console
$ make test
```

### Using the `Makefile`

```console
$ make help
cf-apply                      Run terraform apply for Amazon.
cf-destroy                    Run terraform destroy for Amazon.
cf-plan                       Run terraform plan for Amazon.
shellcheck                     Runs the shellcheck tests on the scripts.
test                           Runs the tests on the repository.
update-terraform               Update terraform binary locally from the docker container.
update                         Update terraform binary locally.
```
