---
path: '/httpie-action'
title: 'Httpie'
github_url: 'https://github.com/swinton/httpie-action'
author: 'swinton'
subtitle: 'A general purpose HTTP client for GitHub Actions, wrapping the HTTPie CLI to enable human-friendly interactions with third-party web services that expose an API over HTTP in your development workflow.'
---

## Why not just use webhooks?

Great question! Webhooks will likely _just work_ in the vast majority of cases :sparkles:

In certain situations though, this may be a better solution, as it provides more fine-grained control over the HTTP request that gets sent, for example you can:

1. Form an entirely custom payload
1. Use a variety of different authentication methods
1. Use a variety of different request methods (`GET`, `POST`, `PATCH`, etc.)
1. Send a variety of different MIME types
1. Follow any redirects
1. Act on the HTTP response
1. Basically, leverage all of [the features of HTTPie](https://github.com/jakubroztocil/httpie/blob/1.0.2/README.rst#main-features) :sparkles:

## Super simple example

To `POST` some `JSON` data, `{"hello": "world"}`, to `https://httpbin.org/anything` on every `push` to the repo:

```hcl
workflow "Call external API" {
  on = "push"
  resolves = ["Call httpbin"]
}

action "Call httpbin" {
  uses = "swinton/httpie-action@master"
  args = ["POST", "httpbin.org/anything", "hello=world"]
}
```

## More examples

### Using output in a downstream action

In this more advanced, but somewhat contrived, example we'll open an issue in the current repository, and then comment and close that issue in subsequent actions.

**Note**, this is made possible since the response body is preserved in a file, `$HOME/$GITHUB_ACTION.response.body` (along with response headers, in `$HOME/$GITHUB_ACTION.response.headers`, and the entire response, in `$HOME/$GITHUB_ACTION.response`). The response can then be parsed in downstream actions using [`jq`](https://stedolan.github.io/jq/), a _command-line JSON processor_, which is _pre-baked_ into the container.

```hcl
action "Issue" {
  uses = "swinton/httpie-action@master"
  args = ["--auth-type=jwt", "--auth=$GITHUB_TOKEN", "POST", "api.github.com/repos/$GITHUB_REPOSITORY/issues", "title=Hello\\ world"]
  secrets = ["GITHUB_TOKEN"]
}

action "Comment on issue" {
  needs = ["Issue"]
  uses = "swinton/httpie-action@master"
  args = ["--auth-type=jwt", "--auth=$GITHUB_TOKEN", "POST", "`jq .comments_url /github/home/Issue.response.body --raw-output`", "body=Thanks\\ for\\ playing\\ :v:"]
  secrets = ["GITHUB_TOKEN"]
}

action "Close issue" {
  needs = ["Issue"]
  uses = "swinton/httpie-action@master"
  args = ["--auth-type=jwt", "--auth=$GITHUB_TOKEN", "PATCH", "`jq .url /github/home/Issue.response.body --raw-output`", "state=closed"]
  secrets = ["GITHUB_TOKEN"]
}
```

### Trigger another workflow

In this example, we'll trigger a separate workflow, via [the repository's dispatches endpoint](https://developer.github.com/actions/creating-workflows/triggering-a-repositorydispatch-webhook/#how-to-trigger-the-repositorydispatch-webhook).

**Note**, `$PAT` refers to a personal access token, [created separately](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/), and [stored as a secret](https://developer.github.com/actions/creating-workflows/storing-secrets/).

```hcl
action "Trigger workflow" {
  uses = "swinton/httpie-action@master"
  args = ["--auth-type=jwt", "--auth=$PAT", "POST", "api.github.com/repos/$GITHUB_REPOSITORY/dispatches", "Accept:application/vnd.github.everest-preview+json", "event_type=demo"]
  secrets = ["PAT"]
}
```

## Presets

Some [HTTPie presets](https://github.com/jakubroztocil/httpie/blob/1.0.2//README.rst#config) are applied by default by the included [`config.json`](config.json), that make sense in the context of GitHub Actions, namely:

1. [`--check-status`](https://github.com/jakubroztocil/httpie/blob/1.0.2//README.rst#scripting): Causes a workflow to exit if the HTTP status is one of `3xx`, `4xx`, or `5xx`
1. [`--ignore-stdin`](https://github.com/jakubroztocil/httpie/blob/1.0.2//README.rst#best-practices): Disables HTTPie's default behaviour of automatically reading STDIN, typically not desirable during non-interactive invocations
1. [`--default-scheme=https`](https://github.com/jakubroztocil/httpie/blob/1.0.2//README.rst#custom-default-scheme): Assumes `https://` is the default prefix for URLs, so you can just say (for example) `api.github.com/zen` as opposed to `https://api.github.com/zen`
1. [`--print=hb`](https://github.com/jakubroztocil/httpie/blob/1.0.2//README.rst#output-options): Prints both response headers _and_ response body in the output

## Plugins

A few [authentication plugins](https://github.com/jakubroztocil/httpie/blob/1.0.2//README.rst#auth-plugins) are included:

1. [`httpie-api-auth`](https://github.com/pd/httpie-api-auth): Provides support for the ApiAuth authentication scheme
1. [`httpie-aws-auth`](https://github.com/httpie/httpie-aws-auth): Provides support AWS authentication
1. [`httpie-hmac-auth`](https://github.com/guardian/httpie-hmac-auth): Provides support for HMAC authentication
1. [`httpie-jwt-auth`](https://github.com/teracyhq/httpie-jwt-auth): Provides support for JSON Web Tokens

## More info

Usage docs for HTTPie are [here](https://github.com/jakubroztocil/httpie).
