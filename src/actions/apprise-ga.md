---
path: "/apprise-ga"
title: "apprise-ga"
github_url: "https://github.com/cstuder/apprise-ga"
author: "cstuder"
subtitle: "GitHub Action to send a push notification via a series of different services thanks to the the Apprise library"
tags: ["github-actions","notifications","email","push-notifications","events","apprise","jinja2"]
---
# apprise-ga

GitHub Action to send a push notification via a series of different services thanks to the the [Apprise library](https://github.com/caronc/apprise)

Supports services like Slack, AWS SNS, Discord, IFTTT, Matrix, Microsoft Teams, Telegram, Twitter etc., as well as email and webhooks.

Supports dynamically adding event data to the notification message.

## Action block syntax

```hcl
action "Send push notification" {
  uses = "cstuder/apprise-ga@master"
  secrets = ["APPRISE_URL"]
  args = ["Notification title", "Notification message"]
}
```

## Usage

1. Create a new action in your workflow which uses `cstuder/apprise-ga@master`.
1. Look up the syntax for your push notification URL in the list of [Supported Notifications](https://github.com/caronc/apprise#supported-notifications) by Apprise. (I.e. `protocol://user:password@hostname/channel`)
1. Add this URL as the secret `APPRISE_URL` to the action.
1. Add your message to `args` in the format ["TITLE", "MESSAGE"]. (This might not work in the current version of the visual workflow editor.)

### Inserting event data with templates

For both title and message you can use the [Jinja2](http://jinja.pocoo.org) syntax to insert data from the event trigger (`/github/workflow/event.json`) into your notification.

Find the event data in the list of [GitHub webhook payloads](https://developer.github.com/v3/activity/events/types/).

#### Templating example

For a push event, you might use the following arguments:

`args = ["Push received on {{ ref }}", "Commit by {{ head_commit.author.name }}: {{ head_commit.message | truncate(128) }} ({{ head_commit.id[0:7] }})"]`

## Action configuration

### Environment variables

None.

### Secrets

Key|Value
---|---
`APPRISE_URL`|Notification URL according to [Apprise](https://github.com/caronc/apprise#supported-notifications)

### Required arguments

Position|Value
---|---
1|Notification title
2|Notification message

### Optional arguments

None.

## License

MIT.
