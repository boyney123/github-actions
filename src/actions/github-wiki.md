---
path: "/github-wiki-action"
title: "github-wiki-action"
github_url: "https://github.com/Andrew-Chen-Wang/github-wiki-action"
author: "Andrew-Chen-Wang"
subtitle: "Updates your GitHub wiki by using rsync"
tags: ["actions","wiki","github-actions"]
---
# Andrew-Chen-Wang/github-wiki-action@v2
Updates your GitHub wiki by using rsync.

This action updates your repository's wiki
based on a single directory that matches with
your Wiki's git. You can use a Wiki directory
from any repository you wish.

_**It is recommended that you still have a Home.md
or whatever extension you want instead of MD.**_ This
is so that GitHub doesn't automatically make a Home.md
for you again.

Take a look at [action.yml](https://github.com/Andrew-Chen-Wang/github-wiki-action/blob/master/action.yml)
for all inputs.

Table of Contents:
- Usage
- Features
- Inspiration
- License
- Non-Affiliation with Github Inc.

---
### Usage

You must have a single wiki page available from the beginning.
It can be blank, but there must be at least one page that exists.
You must also have a directory where all your wiki files will
be located (the default directory is "wiki/"). To include the
mandatory homepage, have a file in your wiki/ directory
called Home.md or with any other extension (e.g. rst).

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
      uses: Andrew-Chen-Wang/github-wiki-action@v2
      env:
        # Make sure you have that / at the end. We use rsync 
        # WIKI_DIR's default is wiki/
        WIKI_DIR: wiki/
        GH_PAT: ${{ secrets.GITHUB_TOKEN }}
        GH_MAIL: ${{ secrets.YOUR_EMAIL }}
        GH_NAME: ${{ github.repository_owner }}
        EXCLUDED_FILES: "a/ b.md"
```

If you plan on having a different repository host your wiki
directory, you're going to need a Personal Access Token instead of the `GITHUB_TOKEN`
with the minimal scopes [seen here.](https://github.com/settings/tokens/new?scopes=repo&description=wiki%20page%20creator%20token)

---
### Features

- rsync all your files from one directory (either from the current or other repository) to your GitHub's repo's wiki.
    - rsyncing from a different repository requires a [GitHub PAT](https://github.com/settings/tokens/new?scopes=repo&description=wiki%20page%20creator%20token)
- Be able to exclude files and directories based on an input of a list.

---
### Inspiration
This intended usage was to avoid hosting a private ReadTheDocs
and instead just use GitHub wiki.

Largely inspired by [wiki-page-creator-action](https://github.com/Decathlon/wiki-page-creator-action)
and the [issue that arose from it](https://github.com/Decathlon/wiki-page-creator-action/issues/11),
this GitHub action tries to update the entire wiki based on a single
directory.

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

---
### Non-Affiliation with GitHub Inc.

This repository/action and its creator is not affiliated with
GitHub Inc.
