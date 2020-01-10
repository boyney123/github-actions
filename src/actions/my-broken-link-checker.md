---
path: "/action-my-broken-link-checker"
title: "My Broken Link Checker"
github_url: "https://github.com/ruzickap/action-my-broken-link-checker"
author: "ruzickap"
subtitle: "A GitHub Action for checking broken links."
tags: ["broken-links","github-actions","github-action","actions","website","checker","links","link-checker","url-checker"]
---

# GitHub Actions: My Broken Link Checker ✔

[![GitHub Marketplace](https://img.shields.io/badge/Marketplace-My%20Broken%20Link%20Checker-blue.svg?colorA=24292e&colorB=0366d6&style=flat&longCache=true&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAM6wAADOsB5dZE0gAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAERSURBVCiRhZG/SsMxFEZPfsVJ61jbxaF0cRQRcRJ9hlYn30IHN/+9iquDCOIsblIrOjqKgy5aKoJQj4O3EEtbPwhJbr6Te28CmdSKeqzeqr0YbfVIrTBKakvtOl5dtTkK+v4HfA9PEyBFCY9AGVgCBLaBp1jPAyfAJ/AAdIEG0dNAiyP7+K1qIfMdonZic6+WJoBJvQlvuwDqcXadUuqPA1NKAlexbRTAIMvMOCjTbMwl1LtI/6KWJ5Q6rT6Ht1MA58AX8Apcqqt5r2qhrgAXQC3CZ6i1+KMd9TRu3MvA3aH/fFPnBodb6oe6HM8+lYHrGdRXW8M9bMZtPXUji69lmf5Cmamq7quNLFZXD9Rq7v0Bpc1o/tp0fisAAAAASUVORK5CYII=)](https://github.com/marketplace/actions/my-broken-link-checker)
[![license](https://img.shields.io/github/license/ruzickap/action-my-broken-link-checker.svg)](https://github.com/ruzickap/action-my-broken-link-checker/blob/master/LICENSE)
[![release](https://img.shields.io/github/release/ruzickap/action-my-broken-link-checker.svg)](https://github.com/ruzickap/action-my-broken-link-checker/releases/latest)
[![GitHub release date](https://img.shields.io/github/release-date/ruzickap/action-my-broken-link-checker.svg)](https://github.com/ruzickap/action-my-broken-link-checker/releases)
![GitHub Actions status](https://github.com/ruzickap/action-my-broken-link-checker/workflows/docker-image/badge.svg)
[![Docker Hub Build Status](https://img.shields.io/docker/cloud/build/peru/my-broken-link-checker.svg)](https://hub.docker.com/r/peru/my-broken-link-checker)

This is a GitHub Action to check broken link in your static files or web pages.
The [muffet](https://github.com/raviqqe/muffet) is used for URL checking task.

See the basic GitHub Action example to run periodic checks (weekly)
against [google.com](https://google.com):

```yaml
on:
  schedule:
    - cron: '0 0 * * 0'

name: Check markdown links
jobs:
  my-broken-link-checker:
    name: Check broken links
    runs-on: ubuntu-18.04
    steps:
      - name: Check
        uses: ruzickap/action-my-broken-link-checker@v1
        with:
          url: https://www.google.com
          cmd_params: "--one-page-only"  # Check just one page
```

This deploy action can be combined with [Static Site Generators](https://www.staticgen.com/)
(Hugo, MkDocs, Gatsby, GitBook, mdBook, etc.). The following examples expects
to have the web page stored in `./build` directory. There is a [caddy](https://caddyserver.com/)
web server started during the tests which is using the hostname from the `URL`
parameter and serving the web pages (see the details in [entrypoint.sh](./entrypoint.sh)).

```yaml
- name: Check
  uses: ruzickap/action-my-broken-link-checker@v1
  with:
    url: https://www.example.com/test123
    pages_path: ./build/
    cmd_params: --buffer-size=8192 --concurrency=10 --skip-tls-verification --limit-redirections=5 --timeout=20  # muffet parameters
    run_timeout: 600  # maximum amount of time to run muffet (default is set to 300 seconds)
```

Do you want to skip the docker build step? OK, the script mode is also available:

```yaml
- name: Check
  env:
    INPUT_URL: https://www.example.com/test123
    INPUT_PAGES_PATH: ./build/
    INPUT_CMD_PARAMS: --buffer-size=8192 --concurrency=10 --skip-tls-verification  # --skip-tls-verification is mandatory parameter when using https and "PAGES_PATH"
  run: wget -qO- https://raw.githubusercontent.com/ruzickap/action-my-broken-link-checker/v1/entrypoint.sh | bash
```

## Parameters

Environment variables used by `./entrypoint.sh` script.

| Variable            | Default                               | Description                                                                                                                                                              |
| ------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `INPUT_CMD_PARAMS`  | `--buffer-size=8192 --concurrency=10` | Command line parameters for URL checker [muffet](https://github.com/raviqqe/muffet) - details [here](https://github.com/raviqqe/muffet/blob/master/arguments.go#L16-L34) |
| `INPUT_DEBUG`       | false                                 | Enable debug mode for the `./entrypoint.sh` script (`set -x`)                                                                                                            |
| `INPUT_PAGES_PATH`  |                                       | Relative path to the directory with local web pages                                                                                                                      |
| `INPUT_RUN_TIMEOUT` | 300                                   | Maximum number of seconds that URL checker can be running                                                                                                                |
| `INPUT_URL`         | (**Mandatory / Required**)            | URL which will be checked                                                                                                                                                |

## Full example

GitHub Action example:

```yaml
name: Checks

on:
  push:
    branches:
      - master

jobs:
  build-deploy:
    runs-on: ubuntu-18.04
    steps:
      - name: Create web page
        run: |
          mkdir -v public
          cat > public/index.html << EOF
          <!DOCTYPE html>
          <html>
            <head>
              My page which will be stored on my-testing-domain.com domain
            </head>
            <body>
              Links:
              <ul>
                <li><a href="https://my-testing-domain.com">https://my-testing-domain.com</a></li>
                <li><a href="https://my-testing-domain.com:443">https://my-testing-domain.com:443</a></li>
              </ul>
            </body>
          </html>
          EOF

      - name: Check links using script
        env:
          INPUT_URL: https://my-testing-domain.com
          INPUT_PAGES_PATH: ./public/
          INPUT_CMD_PARAMS: "--skip-tls-verification --verbose"
          INPUT_RUN_TIMEOUT: 100
          INPUT_DEBUG: true
        run: wget -qO- https://raw.githubusercontent.com/ruzickap/action-my-broken-link-checker/v1/entrypoint.sh | bash

      - name: Check links using container
        uses: ruzickap/action-my-broken-link-checker@v1
        with:
          url: https://my-testing-domain.com
          pages_path: ./public/
          cmd_params: "--skip-tls-verification --verbose"
          run_timeout: 10
          debug: true
```

## Best practices

Let's try to automate the creating the web pages as much as possible.

The ideal situation require the repository naming convention, where the name of
the GitHub repository should match the URL where it will be hosted.

### GitHub Pages with custom domain

The mandatory part is the repository name `awsug.cz` which is the same as the
domain:

* Repository name: [awsugcz/awsug.cz](https://github.com/awsugcz/awsug.cz)
  \-> Web pages: [https://awsug.cz](https://awsug.cz)

The web pages will be stored as GitHub Pages on it's [own domain](https://help.github.com/en/github/working-with-github-pages/configuring-a-custom-domain-for-your-github-pages-site).

The GH Action file may looks like:

```yaml
name: hugo-build

on:
  pull_request:
    types: [opened, synchronize]
  push:

jobs:
  hugo-build:
    runs-on: ubuntu-18.04
    steps:
      - uses: actions/checkout@v2

      - name: Checkout submodules
        shell: bash
        run: |
          auth_header="$(git config --local --get http.https://github.com/.extraheader)"
          git submodule sync --recursive
          git -c "http.extraheader=$auth_header" -c protocol.version=2 submodule update --init --force --recursive --depth=1

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2.3.2
        with:
          hugo-version: '0.62.0'

      - name: Build
        run: |
          hugo --gc
          cp LICENSE README.md public/
          echo "${{ github.event.repository.name }}" > public/CNAME

      - name: Check broken links
        env:
          INPUT_URL: https://${{ github.event.repository.name }}
          INPUT_PAGES_PATH: public
          INPUT_CMD_PARAMS: --verbose --buffer-size=8192 --concurrency=10 --skip-tls-verification --exclude=linkedin.com
        run: |
          wget -qO- https://raw.githubusercontent.com/ruzickap/action-my-broken-link-checker/v1/entrypoint.sh | bash

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v2.8.0
        if: github.event_name == 'push' && github.ref == 'refs/heads/master'
        env:
          ACTIONS_DEPLOY_KEY: ${{ secrets.ACTIONS_DEPLOY_KEY }}
          PUBLISH_BRANCH: gh-pages
          PUBLISH_DIR: public
        with:
          forceOrphan: true
```

The example is using [Hugo](https://gohugo.io/).

### GitHub Pages with [github.io](https://github.io) domain

The mandatory part is the repository name `k8s-harbor` which is the directory
part at the and of `ruzickap.github.io`:

* Repository name: [ruzickap/k8s-harbor](https://github.com/ruzickap/k8s-harbor)
  \-> Web pages: [https://ruzickap.github.io/k8s-harbor](https://ruzickap.github.io/k8s-harbor)

In the example the web pages will be using GitHub's domain [github.io](https://github.io).

```yaml
name: vuepress-build-check-deploy

on:
  pull_request:
    types: [opened, synchronize]
    paths:
      - .github/workflows/vuepress-build-check-deploy.yml
      - docs/**
      - package.json
      - package-lock.json
  push:
    paths:
      - .github/workflows/vuepress-build-check-deploy.yml
      - docs/**
      - package.json
      - package-lock.json

jobs:
  vuepress-build-check-deploy:
    runs-on: ubuntu-18.04
    steps:
      - uses: actions/checkout@v2

      - name: Install Node.js 12
        uses: actions/setup-node@v1
        with:
          node-version: 12.x

      - name: Install VuePress and build the document
        run: |
          npm install
          npm run build
          cp LICENSE docs/.vuepress/dist
          sed -e "s@(part-@(https://github.com/${GITHUB_REPOSITORY}/tree/master/docs/part-@" -e 's@.\/.vuepress\/public\/@./@' docs/README.md > docs/.vuepress/dist/README.md

      - name: Check broken links
        env:
          INPUT_URL: https://${{ github.event.repository.owner.name }}.github.io/${{ github.event.repository.name }}
          INPUT_PAGES_PATH: .
          INPUT_CMD_PARAMS: --buffer-size=8192 --concurrency=10 --skip-tls-verification
        run: |
          ln -s docs/.vuepress/dist ${{ github.event.repository.name }}
          wget -qO- https://raw.githubusercontent.com/ruzickap/action-my-broken-link-checker/v1/entrypoint.sh | bash

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v2.8.0
        if: github.event_name == 'push' && github.ref == 'refs/heads/master'
        env:
          ACTIONS_DEPLOY_KEY: ${{ secrets.ACTIONS_DEPLOY_KEY }}
          PUBLISH_BRANCH: gh-pages
          PUBLISH_DIR: ./docs/.vuepress/dist
        with:
          forceOrphan: true
```

In this case I'm using [VuePress](https://vuepress.vuejs.org/) to create my
page.

---

Both examples can be used as a **generic template**, and you do not need to
change them for your projects.

## Running locally

It's possible to use the checking script locally. It will install [caddy](https://caddyserver.com/)
and [muffet](https://github.com/raviqqe/muffet) binaries if they
are not already installed on your system.

```bash
export INPUT_URL="https://google.com"
export INPUT_CMD_PARAMS="--ignore-fragments --one-page-only --concurrency=10 --verbose"
./entrypoint.sh
```

Output:

```text
*** INFO: [2019-12-30 14:53:54] Start checking: "https://google.com"
https://www.google.com/
        200     http://www.google.cz/history/optout?hl=cs
        200     http://www.google.cz/intl/cs/services/
        200     https://accounts.google.com/ServiceLogin?hl=cs&passive=true&continue=https://www.google.com/
        200     https://drive.google.com/?tab=wo
        200     https://mail.google.com/mail/?tab=wm
        200     https://maps.google.cz/maps?hl=cs&tab=wl
        200     https://news.google.cz/nwshp?hl=cs&tab=wn
        200     https://play.google.com/?hl=cs&tab=w8
        200     https://www.google.com/advanced_search?hl=cs&authuser=0
        200     https://www.google.com/images/branding/googlelogo/1x/googlelogo_white_background_color_272x92dp.png
        200     https://www.google.com/intl/cs/about.html
        200     https://www.google.com/intl/cs/ads/
        200     https://www.google.com/intl/cs/policies/privacy/
        200     https://www.google.com/intl/cs/policies/terms/
        200     https://www.google.com/language_tools?hl=cs&authuser=0
        200     https://www.google.com/preferences?hl=cs
        200     https://www.google.com/setprefdomain?prefdom=CZ&prev=https://www.google.cz/&sig=K_WmKyDZc24PJiXFyTjsUeLLrG-P4%3D
        200     https://www.google.com/textinputassistant/tia.png
        200     https://www.google.cz/imghp?hl=cs&tab=wi
        200     https://www.google.cz/intl/cs/about/products?tab=wh
        200     https://www.youtube.com/?gl=CZ&tab=w1
*** INFO: [2019-12-30 14:53:55] Checks completed...
```

You can also use the advantage of the container to run the checks locally
without touching your system:

```bash
export INPUT_URL="https://google.com"
export INPUT_CMD_PARAMS="--ignore-fragments --one-page-only --concurrency=10 --verbose"
docker run --rm -t -e INPUT_URL -e INPUT_CMD_PARAMS peru/my-broken-link-checker
```

Another example when checking the the web page locally stored on your disk.
In this case I'm using the web page created in the `./tests/` directory from
this git repository:

```bash
export INPUT_URL="https://my-testing-domain.com"
export INPUT_PAGES_PATH="${PWD}/tests/"
export INPUT_CMD_PARAMS="--skip-tls-verification --verbose"
./entrypoint.sh
```

Output:

```text
*** INFO: Using path "/home/pruzicka/git/action-my-broken-link-checker/tests/" as domain "my-testing-domain.com" with URI "https://my-testing-domain.com"
*** INFO: [2019-12-30 14:54:22] Start checking: "https://my-testing-domain.com"
https://my-testing-domain.com/
        200     https://my-testing-domain.com
        200     https://my-testing-domain.com/run_tests.sh
        200     https://my-testing-domain.com:443
        200     https://my-testing-domain.com:443/run_tests.sh
https://my-testing-domain.com:443/
        200     https://my-testing-domain.com
        200     https://my-testing-domain.com/run_tests.sh
        200     https://my-testing-domain.com:443
        200     https://my-testing-domain.com:443/run_tests.sh
*** INFO: [2019-12-30 14:54:22] Checks completed...
```

The same example as above, but in this case I'm using the container:

```bash
export INPUT_URL="https://my-testing-domain.com"
export INPUT_PAGES_PATH="${PWD}/tests/"
export INPUT_CMD_PARAMS="--skip-tls-verification --verbose"
docker run --rm -t -e INPUT_URL -e INPUT_CMD_PARAMS -e INPUT_PAGES_PATH -v "$INPUT_PAGES_PATH:$INPUT_PAGES_PATH" peru/my-broken-link-checker
```

## Examples

Some other examples of building and checking web pages using [Static Site Generators](https://www.staticgen.com/)
and GitHub Actions can be found here: [https://github.com/peaceiris/actions-gh-pages/](https://github.com/peaceiris/actions-gh-pages/)

The following links contains real examples of My Broken Link Checker:

* Go to "Actions -> check-broken-links" in this repository

* Static page generated by [Hugo](https://gohugo.io/)
  with checked links: [example](https://github.com/ruzickap/xvx.cz/blob/e30eca99a13821b6fcf322ef636fd03f5d5ce989/.github/workflows/hugo-build.yml#L34-L40)

* Static page generated by [VuePress](https://vuepress.vuejs.org/)
  with checked links: [example](https://github.com/ruzickap/k8s-harbor/blob/7973e8c2df395999e38271ba863e307a5da07f49/.github/workflows/vuepress-build-check-deploy.yml#L93-L100)
