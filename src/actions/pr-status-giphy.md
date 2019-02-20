---
path: "/pr-status-giphy"
title: "Pull Request Status Giphy Action"
github_url: "https://github.com/jzweifel/pr-status-giphy-action"
author: "jzweifel"
subtitle: "A GitHub Action that displays a random thumbs up or thumbs down gif from giphy when pull request checks finish. "
tags: [gif,utility,fun]
---
# Pull Request Status Giphy Action

A GitHub Action that displays a random thumbs up or thumbs down gif from Giphy when all checks on a Pull Request complete.

It will automatically clean up an existing comment before making a new one if checks are re-run.

Works best when used in a workflow that runs on the `pull_request` event.

![thumbs-up-pr](https://github.com/jzweifel/pr-status-giphy-action/raw/master/media/thumbs-up-pr.gif)

![thumbs-down-pr](https://github.com/jzweifel/pr-status-giphy-action/raw/master/media/thumbs-down-pr.gif)

## Usage

```
workflow "Pull Request Status Checks" {
  resolves = "PR Status Giphy"
  on = "pull_request"
}

action "PR Status Giphy" {
  uses = "jzweifel/pr-status-giphy-action@master"
  secrets = ["GITHUB_TOKEN", "GIPHY_API_KEY"]
}
```

### Secrets

- `GITHUB_TOKEN` - **Required**.
- `GIPHY_API_KEY` - **Required**. Your secret Giphy Api Key. You can create this key [here](https://developers.giphy.com/dashboard/?create=true).

## License

The Dockerfile and associated scripts and documentation in this project are released under the [MIT License](LICENSE).

Container images built with this project include third party materials. See [THIRD_PARTY_NOTICE.md](THIRD_PARTY_NOTICE.md) for details.
