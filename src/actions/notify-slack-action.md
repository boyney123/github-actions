---
path: "/notify-slack-action"
title: "notify-slack-action"
github_url: "https://github.com/ravsamhq/notify-slack-action"
author: "ravsamhq"
subtitle: "Send Github Actions workflow status notifications to Slack regarding failures, warnings, or even success."
tags: ["github-actions","github-action","slack-bot","slack-actions","workflow-status-notifications","slack","workflow","notifications"]
---
![Test](https://github.com/ravsamhq/notify-slack-action/workflows/Test/badge.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Notify Slack Action

Send Github Actions workflow status notifications to Slack regarding failures, warnings or even success.

### Example workflow

```yaml
steps:
  - uses: ravsamhq/notify-slack-action@master
    if: always()
    with:
      status: ${{ job.status }}
      notify_when: 'failure' # default is 'success,failure,warnings'
    env:
      SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }} # required
```

<sub>Made in Python &bull; By [Ravgeet Dhillon](https://github.com/ravgeetdhillon) @ [RavSam Web Solutions](https://www.ravsam.in).</sub>
