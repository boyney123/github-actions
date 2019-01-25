---
path: '/send-emails'
title: 'Send Emails'
github_url: 'https://github.com/cirrus-actions/email'
author: 'cirrus-actions'
tags: []
subtitle: 'This is a simple GitHub action that allows to send emails when a GitHub Check Suite completes.'
---

[![Build Status](https://api.cirrus-ci.com/github/cirrus-actions/email.svg)](https://cirrus-ci.com/github/cirrus-actions/email) [![](https://images.microbadger.com/badges/version/cirrusactions/email.svg)](https://microbadger.com/images/cirrusactions/email) [![](https://images.microbadger.com/badges/image/cirrusactions/email.svg)](https://microbadger.com/images/cirrusactions/email)

This requires a few environment variables:

- `APP_NAME` - Name of an application for which to send emails for.
- `MAIL_FROM` - email address to send emails from.
- `MAIL_HOST` - SMTP host to send emails to.
- `MAIL_USERNAME` and `MAIL_PASSWORD` - username and password to authorize with the SMTP server.
- `GITHUB_TOKEN` - is standard environment variable for GitHub actions.
- optional `IGNORED_CONCLUSIONS` to secify conclusions to report. By default only `success` and `neutral` checks are ignored.

Now your action can look liker this in your `.github/main.workflow` workflow file:

```
action "Cirrus CI Email" {
  uses = "docker://cirrusactions/email:latest"
  env = {
    APP_NAME = "Cirrus CI"
  }
  secrets = ["GITHUB_TOKEN", "MAIL_FROM", "MAIL_HOST", "MAIL_USERNAME", "MAIL_PASSWORD"]
}
```
