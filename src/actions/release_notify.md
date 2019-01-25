---
path: '/release-notify-action'
title: 'Release notify'
github_url: 'https://github.com/bitoiu/release-notify-action'
author: 'bitoiu'
subtitle: 'This repo contains a re-usable GitHub Action that when installed sends an e-mail to a distribution list with the release note contents every time a GitHub Release is created for the repository. This Action makes use of SendGrids API to send the e-mails.'
---

## Pre-requisites

To run this action you'll need:

- To be part of the [Actions beta](https://github.com/features/actions). Note that during the beta, Actions will only run on private repositories.
- A [**SendGrid API Key**](https://sendgrid.com/docs/ui/account-and-settings/api-keys/). _SendGrid is [free to up 100 e-mails a day](https://sendgrid.com/pricing/) so feel free to register and get your API KEY._
- **A text file hosted anywhere** with the list of e-mail recipients. _I personally use [GitHub Gists](https://gist.github.com) and get the link of the raw file._

## Setup

### 1. Create the release workflow

Add a new workflow to your `.github/main.workflow` to trigger on `release`.

<img src="https://user-images.githubusercontent.com/1192590/47112721-11578d80-d24f-11e8-8504-4864cd8d0c93.png" alt="new-workflow" width="300" />

### 2. Create the Action

Create an action that uses this repository `bitoiu/release-notify-action@master` or points to Docker Hub at `docker://bitoiu/release-notifiy-action`

<img src="https://user-images.githubusercontent.com/1192590/47112720-11578d80-d24f-11e8-968d-bb3de5831ce8.png" alt="new-action" width="300" />

### 3. Set the SendGrid secret

Using the Visual Editor create a new secret on the action named `SENDGRID_API_TOKEN`. Set the value to your [SendGrid API Key](https://sendgrid.com/docs/ui/account-and-settings/api-keys/).

<img src="https://user-images.githubusercontent.com/1192590/47112718-11578d80-d24f-11e8-8b97-544290ed5910.png" alt="new-secret" width="300" />

### 4. Set the RECIPIENTS secret

Do the same for a secret named `RECIPIENTS` that you need to set to the URI of the text file with the target recipients. The contents of the file should be a list of e-mails separated by newline, for example:

```
mona@github.com
actions_are_awesome@github.com
```

If you don't know where to host this file, just go to [GitHub Gists](https://gist.github.com) and create a new textfile with the e-mails you want to target. After you save the file just click `raw` and get the URI of the file you've just created.

### 5. Commit the changes

Make sure you commit all pending changes. After you've done that your `main.workflow` should look similar to this:

```

workflow "Release Notifier" {
  on = "release"
  resolves = ["Notify Releases"]
}

action "Notify Releases" {
  uses = "bitoiu/release-notify-action@master"
  secrets = ["SENDGRID_API_TOKEN", "RECIPIENTS"]
}

```

On the visual editor it should look similar to this:

![visual editor](https://user-images.githubusercontent.com/1192590/47112717-10bef700-d24f-11e8-86a7-ef28d3d270c8.png)

### 6. Test the workflow!

Create a new release for your repository and verify that the action triggers and that the e-mails were sent. Sometimes it's worth checking the spam inbox.

## Local testing

The main script that does the heavy lifting is a NodeJS file. As such you can simply test it like any other node program, for example, running the following inside the `src` folder:

```
SENDGRID_API_TOKEN=XXX RECIPIENTS=ABSOLUTE_PATH_TO_TXT_FILE_WITH_RECIPIENTS GITHUB_EVENT_PATH=ABSOLUTE_PATH_TO_SAMPLE_PAYLOAD_FILE_PROVIDED node notify.js
```

If you prefer to test the container directly (which is a tiny bit slower but more reliable) you can just run something like:

```
docker build -t release . && docker run --env-file=./env release
```

Be sure to rename `env.template` to `env` and fill it with your environment variables.
