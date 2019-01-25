---
path: '/firebase'
title: 'Firebase'
github_url: 'https://github.com/w9jds/firebase-action'
author: 'w9jds'
subtitle: 'This Action for firebase-tools enables arbitrary actions with the firebase command-line client..'
---

### Secrets

- `FIREBASE_TOKEN` - **Required**. The token to use for authentication. This token can be aquired through the `firebase login:ci` command.

### Environment variables

- `PROJECT_ID` - **Optional**. To specify a specific project to use for all commands, not required if you specify a project in your `.firebaserc` file.

#### Example

To authenticate with Firebase, and deploy to Firebase Hosting:

```hcl
action "Deploy Production Site" {
  uses = "w9jds/firebase-action@master"
  args = "deploy --only hosting:prod"
  env = {
    PROJECT_ID = "new-eden-storage-a5c23"
  }
  secrets = ["FIREBASE_TOKEN"]
}
```
