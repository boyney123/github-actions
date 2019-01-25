---
path: '/release-archive'
title: 'Release Archive'
github_url: 'https://github.com/lubusIN/actions'
author: 'lubusIN'
subtitle: 'Github action to create release zip archive.'
---

<p align="center">
<img src="https://user-images.githubusercontent.com/1039236/51209746-f6bcaf80-1936-11e9-8d0e-78fb92c06cfd.png" />
</p>

<p align="center">
<a href="https://github.com/lubusIN/actions"><img src="https://img.shields.io/github/license/lubusIN/actions.svg" alt="Licence"></a>
<a href="https://github.com/lubusIN/actions"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="PRs"></a>
</p>

<center>
<a href="https://lubus.in/">
<img src="https://user-images.githubusercontent.com/1039236/40877801-3fa8ccf6-66a4-11e8-8f42-19ed4e883ce9.png" />
</a>
</center>

# Archive

Currently action excludes following development/build files/folders:

- node_modules
- .git
- .github
- .wordpress-org
- src
- .gitkeep
- .distignore
- .gitignore
- .editorconfig
- .eslintignore
- .eslintrc
- .nvmrc
- CHANGELOG.md
- CONTRIBUTING.md
- docker-compose.yml
- package-lock.json
- package.json
- README.md
- webpack.config.js
- actions

> _**Note**_:
>
> - To be used as part of workflow where archive can be used for further action like release or publish.

## Environment Variables

- **ARCHIVE_FILENAME**: filename for the zip archive

## Example Workflow

```HCL
    # Workflow to create distribution archive
    workflow "Create Archive" {
        on = "push"
        resolves = ["archive"]
    }

    # Filter for tag
    action "tag" {
        uses = "actions/bin/filter@master"
        args = "tag"
    }

    # Install Dependencies
    action "install" {
        uses = "actions/npm@e7aaefe"
        needs = "tag"
        args = "install"
    }

    # Build
    action "build" {
        uses = "actions/npm@e7aaefe"
        needs = ["install"]
        args = "run build"
    }

    # Create Release ZIP archive
    action "archive" {
        uses = "lubusIN/actions/archive@master"
        needs = ["build"]
        env = {
                ZIP_FILENAME = "archive-filename"
            }
    }
```

## Feedback / Suggestions

If you have any suggestions/feature request that you would like to see, feel free to let us know in the [issues section](https://github.com/lubusIN/actions/issues)

## Credits

[Ajit Bohra](https://twitter.com/ajitbohra)

## Support Us

<a href="https://www.patreon.com/lubus">
<img src="https://c5.patreon.com/external/logo/become_a_patron_button.png" alt="Become A Patron"/>
</a>

[LUBUS](http://lubus.in) is a web design agency based in Mumbai, India.

You can pledge on [patreon](https://www.patreon.com/lubus) to support the development & maintenance of various [opensource](https://github.com/lubusIN/) stuff we are building.

## License

`archive action` is open-sourced software licensed under the [MIT](LICENSE)
