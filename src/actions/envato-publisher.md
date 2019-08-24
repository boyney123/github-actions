---
path: '/envato-publisher'
title: 'Envato Publisher'
github_url: 'https://github.com/varunsridharan/action-envato-publisher'
author: 'Varun Sridharan'
tags: ['wordpress','envato','themeforest','codecanyon','ftp']
subtitle: 'Push Source Code To Envato FTP By packing contents into a zipfile'
---

<p align="center">
<img src="https://raw.githubusercontent.com/varunsridharan/action-envato-uploader/master/assets/logo.png" />
</p>


# Envato FTP Uploader - ***Github Action***
Push Source Code To Envato FTP By packing contents into a zipfile

## Configuration
| Argument | Default | Description |
| --- | ------- | ----------- |
|`envato_username` | null | Your Envato Account Username |
|`envato_access_code` | null | Your Envato Access Code `Personal Access Token`. See Blow On How To Get Your Token |
|`custom_command` | null | This can be used to pass custom command which can be used to build plugin assets before files are copied to plugin Eg : `composer install` |
|`exclude_list` | null | Add file / folders that you wish to exclude from final list of files to be sent to envato |

**⚠️ Tips:**

- Don't forget to add build directories in `exclude_list`, Eg. `vendor` for `composer install`.
    - `node_modules` is excluded by default.

---

## Envato Personal Token
1. Navigate To : https://build.envato.com/my-apps
2. Scroll Down To : `Your personal tokens` Heading
3. Click **Create New Token** - Refer Below Image
4. Provide A Token Name
5. Check First 2 Permissions - Refer Below Image
    1. *View and search Envato sites*
    2. *View the user's Envato Account username*
6. Scroll Down & Click Create Token

### Create Token Option
![https://raw.githubusercontent.com/varunsridharan/action-envato-publisher/master/assets/1566526864-182.jpg](https://raw.githubusercontent.com/varunsridharan/action-envato-publisher/master/assets/1566526864-182.jpg)

### Token Permissions
![https://raw.githubusercontent.com/varunsridharan/action-envato-publisher/master/assets/1566526963-120.jpg](https://raw.githubusercontent.com/varunsridharan/action-envato-publisher/master/assets/1566526963-120.jpg)

---

## Example Workflow File
```yaml
name: Enavto Publisher

on:
  push:
    branches:
    - refs/tags/*

jobs:
  envatoftp:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v1
    - name: Enavto Publisher
    - uses: varunsridharan/action-envato-publisher@master
      with:
        envato_username: ${{ secrets.envato_username }}
        envato_personal_token: ${{ secrets.envato_personal_token }}
        custom_command: "composer install --no-dev"
        exclude_list: "vendor/*/*/README.md vendor/*/*/.gitignore"
```
