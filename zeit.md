---
path: '/zeit-now'
title: 'Zeit Now'
github_url: 'https://github.com/actions/zeit-now'
author: 'GitHub'
subtitle: 'This Action wraps the Now CLI to enable common Now commands.'
---

## Usage

```workflow
workflow "Deploy on Now" {
  on = "push"
  resolves = ["alias"]
}

action "deploy" {
  uses = "actions/zeit-now@master"
  secrets = [
    "ZEIT_TOKEN",
  ]
}

action "alias" {
  needs = ["deploy"]
  uses = "actions/zeit-now@master"
  args = "alias"
  secrets = [
    "ZEIT_TOKEN",
  ]
}
```

For more examples, visit: [actions/example-zeit-now](https://github.com/actions/example-zeit-now).

### Secrets

* `ZEIT_TOKEN` - **Required**. The token to use for authentication with the Zeit Now API ([more info](https://zeit.co/blog/introducing-api-tokens-management))

## License

The Dockerfile and associated scripts and documentation in this project are released under the [MIT License](LICENSE).

Container images built with this project include third party materials. See [THIRD_PARTY_NOTICE.md](THIRD_PARTY_NOTICE.md) for details.
