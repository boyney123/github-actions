---
path: '/slack-message'
title: 'Slack message'
github_url: 'https://github.com/apex/actions'
author: 'apex'
tags: ['slack']
subtitle: 'GitHub Action for sending Slack messages which were defined by previous action(s) in ./slack.json.'
---

## Secrets

- `SLACK_WEBHOOK_URL` - _Required_ The Slack webhook URL.

## Environment Variables

- `SLACK_CHANNEL` - _Optional_ The Slack channel name.
- `SLACK_USERNAME` - _Optional_ The Slack message username.
- `SLACK_ICON` - _Optional_ The Slack message icon.

## Example

This example sends a Slack notification after a deployment is complete. The `apex/actions/up`
action generates a slack.json to provide a message.

```hcl
workflow "Deployment" {
  on = "push"
  resolves = ["Deploy Notification"]
}

action "Build" {
  uses = "apex/actions/go@master"
}

action "Deploy" {
  needs = "Build"
  uses = "apex/actions/up@master"
  secrets = ["AWS_SECRET_ACCESS_KEY", "AWS_ACCESS_KEY_ID"]
  args = "deploy production"
}

action "Deploy Notification" {
  needs = "Deploy"
  uses = "apex/actions/slack@master"
  secrets = ["SLACK_WEBHOOK_URL"]
}
```

## Links

- Message format: https://api.slack.com/docs/messages/builder
