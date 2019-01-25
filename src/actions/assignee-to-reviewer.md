---
path: '/assignee-to-reviewer'
title: 'Set pull request reviewers based on assignees'
github_url: 'https://github.com/pullreminders/assignee-to-reviewer-action'
author: 'pullreminders'
tags: ['github', 'pull-request']
subtitle: 'If your team currently uses pull request Assignees but would like to switch to Review Requests, having everyone change their workflows can be difficult. This GitHub Action eases the transition by automatically creating and removing review requests based on Assignees.'
---

## Usage

This Action subscribes to [Pull request events](https://developer.github.com/v3/activity/events/types/#pullrequestevent) which fire whenever users are assigned or unassigned to pull requests.

```workflow
workflow "Assign reviewers based on assignees" {
  on = "pull_request"
  resolves = ["Assignee to reviewer"]
}

action "Assignee to reviewer" {
  uses = "pullreminders/assignee-to-reviewer-action@master"
  secrets = [
    "GITHUB_TOKEN"
  ]
}
```

## Demo

<img src="https://github.com/pullreminders/assignee-to-reviewer-action/raw/master/docs/images/example.png" width="540">
