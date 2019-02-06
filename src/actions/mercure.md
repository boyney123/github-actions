---
path: "/action-mercure"
title: "action-mercure"
github_url: "https://github.com/Ilshidur/action-mercure"
author: "Ilshidur"
subtitle: "🚀 GitHub Action for Mercure"
tags: ["mercure","server-sent-events","live-updates","push","subscription"]
---
# 🚀 GitHub Action for Mercure

Send a [Mercure](https://mercure.rocks) publish event. Simple as that.

![GitHub Action](https://github.com/Ilshidur/action-mercure/raw/master/action.png "GitHub Action")

<hr/>

## Demo

1) Go to https://demo.mercure.rocks, in the **Subscribe** section.
2) Subscribe for notifications on this *topic* : **`foo`**.
3) 🌟 Star 🌟 this repo !
4) Quickly switch to the Mercure demo page to see a notification in your browser.

## Usage

```hcl
action "Publish notification" {
  uses = "Ilshidur/action-mercure@master"
  secrets = ["MERCURE_HUB_URL", "MERCURE_HUB_JWT"]
  args = "{ \"hello\": \"world\" }"
}
```

**NOTICE :** for stability purposes, it is recommended to use the action with an explicit commit SHA-1 :

`uses = "Ilshidur/action-mercure@eea8db9"` (=> link to the commits list : https://github.com/Ilshidur/action-mercure/commits/master)

### Arguments

The argument is the content of the event to send. It is **RECOMMENDED** to use JSON.

**Environment variables can be interpolated** in the message using brackets (`{{` and `}}`) :

e.g.: `args = "{ \"action\": \"{{ GITHUB_ACTION }}\" }"`

### Environment variables

* **`MERCURE_TOPICS`**: the Mercure topics. **Supports interpolation** using (`{{` and `}}`).

### Secrets

* **`MERCURE_HUB_URL`**: the **public** Mercure hub URL (**required**).
* **`MERCURE_HUB_JWT`**: the publisher JWT (**required**).
* That's all.

## License

GNU GENERAL PUBLIC LICENSE v3.

<hr/>

<p align="center">
  Don't forget to 🌟 Star 🌟 the repo if you like this GitHub Action !<br/>
  <a href="https://github.com/Ilshidur/action-mercure/issues/new">Your feedback is appreciated</a>
</p>
