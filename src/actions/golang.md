---
path: '/golang'
title: 'Golang'
github_url: 'https://github.com/cedrickring/golang-action'
author: 'cedrickring'
tags: ['golang', 'go']
subtitle: 'This Action allows you to run Go commands with your code. It will automatically setup your workspace (~/go/src/github.com/<your-name>/<repo>) before the command is run.'
---

## How to use

1. Add an Action
2. Enter "cedrickring/golang-action@1.0.0"
3. Add a command in the args section like:
   ```bash
   go build -o my_executable main.go
   ```
   or run your `make` targets with
   ```bash
   make test
   ```
