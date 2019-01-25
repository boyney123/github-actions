---
path: '/twitter-action'
title: 'Send a Tweet'
github_url: 'https://github.com/xorilog/twitter-action'
author: 'xorilog'
subtitle: 'Send a tweet with a GitHub Action.'
---

Small action which sends a tweet.

# Auth

About the authentication see: https://developer.twitter.com/en/apps
create an account, create an app
@see https://apps.twitter.com/

# retrieve the access tokens

@see https://developer.twitter.com/en/apps

# Use Action

```
workflow "on push tag, tweet message" {
  on = "push"
  resolves = ["Advertise tweetosphere"]
}

action "Advertise tweetosphere" {
  uses = "xorilog/twitter-action@master"
  args = ["-message", "New version is out ! $GITHUB_REF"]
  secrets = ["TWITTER_CONSUMER_KEY", "TWITTER_CONSUMER_SECRET", "TWITTER_ACCESS_TOKEN", "TWITTER_ACCESS_SECRET"]
}
```

# Build

```
go get .
go build
```

# Usage

```
export TWITTER_CONSUMER_KEY=xxx
export TWITTER_CONSUMER_SECRET=xxx
export TWITTER_ACCESS_TOKEN=xxx
export TWITTER_ACCESS_SECRET=xxx
./twitter-action -message "Hello Twitter :)"

```

# Docker

```
# If building locally
docker build -t xorilog/twitter-action .

# else:
docker run --rm -e TWITTER_CONSUMER_KEY=${TWITTER_CONSUMER_KEY} \
       -e TWITTER_CONSUMER_SECRET=${TWITTER_CONSUMER_SECRET} \
       -e TWITTER_ACCESS_TOKEN=${TWITTER_ACCESS_TOKEN} \
       -e TWITTER_ACCESS_SECRET=${TWITTER_ACCESS_SECRET} \
       xorilog/twitter-action -message "Hello Twitter :)"
```
