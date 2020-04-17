---
path: '/okteto'
title: 'Okteto Deploy'
github_url: 'https://github.com/okteto/actions'
author: 'Luis Vilca'
twitter: '@ferluisxd'
tags: ['okteto','cd','ci','devops','docker','k8s']
subtitle: 'This actions is to automate the deploy of okteto (similar to okteto push from their cli'
---


This repository contains a bunch of actions to behave like the okteto CLI,
you can find more info in their repository

Learn more about okteto [here](https://okteto.com/docs/getting-started/index.html)

## Usage

Below you'll find my script to deploy your app to the cloud (similar to okteto push)

```name: CD

on: 
  push:
    branches:
      - master

jobs:

  devflow:
    runs-on: ubuntu-latest
    steps:
    
    - uses: okteto/actions/login@master
      with:
        token: ${{ secrets.OKTETO_TOKEN }}
    
    - name: "Create devlopment environments namespace"
      uses: okteto/actions/namespace@master
      with:
        name: your-okteto-username

    - name: "Deploy application"
      uses: okteto/actions/apply@master
      with:
        namespace: your-okteto-username
        manifest: k8s.yaml

    - name: "Push changes"
      uses: okteto/actions/namespace@master
      with:
        namespace: your-okteto-username
        name: your-cloud-application-name
        deploy: "true"
```