---
path: '/envato-uploader'
title: 'Envato Uploader'
github_url: 'https://github.com/varunsridharan/action-envato-uploader'
author: 'Varun Sridharan'
tags: ['wordpress','envato','themeforest','codecanyon','ftp']
subtitle: 'Github Action Which Uploads Files Onto Envato FTP'
---

<p align="center">
<img src="https://raw.githubusercontent.com/varunsridharan/action-envato-uploader/master/assets/logo.png" />
</p>


# Envato FTP Uploader - ***Github Action***
Github Action Which Uploads Files Onto Envato FTP

## Configuration
| Argument | Default | Description |
| --- | ------- | ----------- |
|`envato_username` | null | Your Envato Account Username |
|`envato_access_code` | null | Your Envato Access Code `Personal Access Token`. See Blow On How To Get Your Token |
|`envato_dist_path` | ./dist | Local Path From Where Files To Be Copied To Envato FTP |

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
![https://raw.githubusercontent.com/varunsridharan/action-envato-uploader/master/assets/1566526864-182.jpg](https://raw.githubusercontent.com/varunsridharan/action-envato-uploader/master/assets/1566526864-182.jpg)

### Token Permissions
![https://raw.githubusercontent.com/varunsridharan/action-envato-uploader/master/assets/1566526963-120.jpg](https://raw.githubusercontent.com/varunsridharan/action-envato-uploader/master/assets/1566526963-120.jpg)

---

## Example Workflow File
```yaml
name: Envato FTP Uploader

on:
  push:
    branches:
    - refs/tags/*

jobs:
  envatoftp:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v1
    - name: Enavto FTP Uploader
      uses: varunsridharan/action-envato-uploader@master
      with:
        envato_username: ${{ secrets.envato_username }}
        envato_personal_token: ${{ secrets.envato_personal_token }}
        envato_dist_dir: "./dist"
```