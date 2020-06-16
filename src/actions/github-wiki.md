---
path: "/github-wiki-action"
title: "github-wiki-action"
github_url: "https://github.com/Andrew-Chen-Wang/github-wiki-action"
author: "Andrew-Chen-Wang"
subtitle: "Updates your GitHub wiki by using rsync"
tags: ["actions","wiki","github-actions"]
---
# github-wiki-action
Updates your GitHub wiki by using rsync.

This action updates your repository's wiki
based on a single directory that matches with
your Wiki's git.

_**It is recommended that you still have a Home.md
or whatever extension you want instead of MD.**_ This
is so that GitHub doesn't automatically make a Home.md
for you again.

Largely inspired by [wiki-page-creator-action](https://github.com/Decathlon/wiki-page-creator-action)
and the [issue that arose from it](https://github.com/Decathlon/wiki-page-creator-action/issues/11),
this GitHub action tries to update the entire wiki based on a single
directory. It is not as rich in functionality, but it addresses
the issue of deleting Wiki pages.

---
### Usage

You must have a single wiki page available from the beginning.
It can be blank, but there must be at least one page that exists.
You must also have a directory where all your wiki files will
be located (the default directory is "wiki/").

```yaml
name: Deploy Wiki

on:
  push:
    paths:
      # Trigger only when wiki directory changes
      - 'wiki/**'
    branches:
      # And only on master branch
      - master

jobs:
  deploy-wiki:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2

    - name: Push Wiki Changes
      uses: Andrew-Chen-Wang/github-wiki-action@v1
      env:
        # Make sure you have that / at the end. We use rsync 
        WIKI_DIR: wiki/
        GH_PAT: ${{ secrets.GH_PAT }}
        GH_MAIL: ${{ secrets.YOUR_EMAIL }}
        GH_NAME: ${{ github.repository_owner }}
```

You're going to need a Personal Access Token with the minimal scopes of
[seen here.](https://github.com/settings/tokens/new?scopes=repo&description=wiki%20page%20creator%20token)

---
### License

```
   Copyright 2020 Andrew Chen Wang

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
```
