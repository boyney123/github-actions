---
path: '/nexmo-sms'
title: 'Nexmo SMS'
github_url: 'https://github.com/nexmo-community/nexmo-sms-action'
author: 'nexmo-community'
tags: []
subtitle: 'Send an SMS from GitHub Actions using Nexmo. The passed in args represent the contents of the message.'
---

## Usage

The `args` represent the recipient and the contents of the message.

For example:

```workflow
workflow "Send SMS On Push" {
  on = "push"
  resolves = ["notification"]
}

action "notification" {
    uses = "nexmo-community/nexmo-sms-action@master"
    secrets = [
        "NEXMO_API_KEY",
        "NEXMO_API_SECRET",
        "NEXMO_NUMBER"
    ]
    args = "15551234567 New pull on $GITHUB_REPOSITORY from $GITHUB_ACTOR."
}
```

will send `New pull on $GITHUB_REPOSITORY from $GITHUB_ACTOR` to `15551234567`.

If you don't want to expose your recipient number, you can use secrets.

For example, a new secret called `DEVOPS_NUMBER` could be used inside of `args` as follows:

```workflow
workflow "Send SMS On Push" {
  on = "push"
  resolves = ["notification"]
}

action "notification" {
    uses = "nexmo-community/nexmo-sms-action@master"
    secrets = [
        "NEXMO_API_KEY",
        "NEXMO_API_SECRET",
        "NEXMO_NUMBER",
        "DEVOPS_NUMBER"
    ]
    args = "$DEVOPS_NUMBER New pull on $GITHUB_REPOSITORY from $GITHUB_ACTOR."
}
```

This allows for you to reuse this action to send messages to various recipients.

## Secrets

This action uses the following required secrets:

- `NEXMO_API_KEY` - Your Nexmo API Key.
- `NEXMO_API_SECRET` - Your Nexmo API Secret.
- `NEXMO_NUMBER` - A number on your Nexmo account without any spaces or symbols. Example: 15551231234

## Event Information

GitHub stores the event information in the json file at `$GITHUB_EVENT_PATH`. You can use [jq] to parse this file and send its contents in the SMS:

```sh
jq .issue.html_url $GITHUB_EVENT_PATH --raw-output
```

Here's an example of sending an SMS any time an issue is created with the urgent label:

```workflow
workflow "Send SMS On Urgent Issue" {
  resolves = [
    "Send Urgent Issue Message",
  ]
  on = "issues"
}

action "Has Urgent Label" {
  uses = "actions/bin/filter@8738e95"
  args = "label urgent"
}

action "Label Being Added" {
  uses = "actions/bin/filter@8738e95"
  args = "action labeled"
}

action "Send Urgent Issue Message" {
  needs = ["Label Being Added", "Has Urgent Label"]
  secrets = [
    "NEXMO_API_KEY",
    "NEXMO_API_SECRET",
    "NEXMO_NUMBER",
    "DEVOPS_NUMBER",
  ]
  args = "$DEVOPS_NUMBER This urgent issue needs your attention: `jq .issue.html_url $GITHUB_EVENT_PATH --raw-output`"
  uses = "nexmo-community/nexmo-sms-action@master"
}
```

[github actions]: https://github.com/actions
[nexmo]: https://developer.nexmo.com
[jq]: https://stedolan.github.io/jq/
