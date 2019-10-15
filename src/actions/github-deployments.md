---
path: "/github-deployment-action"
title: "github-deployment-action"
github_url: "https://github.com/NiklasMerz/github-deployment-action"
author: "NiklasMerz"
subtitle: "Create deployments on Github with actions"
tags: ["actions","github-actions","deployment","github-deployment","github-action"]
---
# Create Github deployments in you actions

> If you have any questions please ping me. This action basically works but has not all features I want it to.

This actions allows you to create a deployment and set a deployment status.

For options please see `deployment.js` and the [Github documentation](https://developer.github.com/v3/repos/deployments/)

First create a deployment and with flag `-f`  create the success status:
````
- name: create deployment
    uses: niklasmerz/github-deployment-action@master
    if: contains(github.ref, 'master')
    env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    with:
    args: -o niklasmerz -r myrepo -c master -e production
- name: set deployment status
    uses: niklasmerz/github-deployment-action@master
    if: contains(github.ref, 'master')
    env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    with:
    args: -o niklasmerz -r myrepo -s success -u https://url.com -f
````
