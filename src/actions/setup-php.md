---
path: "/setup-php"
title: "setup-php"
github_url: "https://github.com/shivammathur/setup-php"
author: "shivammathur"
twitter: '@meshivammathur'
subtitle: "Github action to setup PHP"
tags: ['github','github-actions','php','composer','actions']
---

<p align="center">
  <a href="https://github.com/marketplace/actions/setup-php-action" target="_blank">
    <img src="https://repository-images.githubusercontent.com/206578964/e0a18480-dc65-11e9-8dd3-b9ffbf5575fe" alt="Setup PHP in GitHub Actions" width="400">
  </a>
</p>

<h1 align="center">Setup PHP in GitHub Actions</h1>

<p align="center">
  <a href="https://github.com/shivammathur/setup-php" title="GitHub action to setup PHP"><img alt="GitHub Actions status" src="https://github.com/shivammathur/setup-php/workflows/Main%20workflow/badge.svg"></a>
  <a href="https://codecov.io/gh/shivammathur/setup-php" title="Code coverage"><img alt="Codecov Code Coverage" src="https://codecov.io/gh/shivammathur/setup-php/branch/master/graph/badge.svg"></a>
  <a href="https://github.com/shivammathur/setup-php/blob/master/LICENSE" title="license"><img alt="LICENSE" src="https://img.shields.io/badge/license-MIT-428f7e.svg"></a>
  <a href="https://github.com/shivammathur/setup-php#tada-php-support" title="PHP Versions Supported"><img alt="PHP Versions Supported" src="https://img.shields.io/badge/php-%3E%3D%205.3-8892BF.svg"></a>
</p>

Setup PHP with required extensions, php.ini configuration, code-coverage support and various tools like composer in [GitHub Actions](https://github.com/features/actions "GitHub Actions"). This action gives you a cross platform interface to setup the PHP environment you need to test your application. Refer to [Usage](https://github.com/shivammathur/setup-php#memo-usage "How to use this") section and [examples](#examples "Examples of use") to see how to use this.

## Contents

- [PHP Support](https://github.com/shivammathur/setup-php#tada-php-support)
- [OS/Platform Support](https://github.com/shivammathur/setup-php#cloud-osplatform-support)
- [PHP Extension Support](https://github.com/shivammathur/setup-php#heavy_plus_sign-php-extension-support)
- [Tools Support](https://github.com/shivammathur/setup-php#wrench-tools-support)
- [Coverage support](https://github.com/shivammathur/setup-php#signal_strength-coverage-support)
  - [Xdebug](https://github.com/shivammathur/setup-php#xdebug)
  - [PCOV](https://github.com/shivammathur/setup-php#pcov)
  - [Disable Coverage](https://github.com/shivammathur/setup-php#disable-coverage)
- [Usage](https://github.com/shivammathur/setup-php#memo-usage)
  - [Inputs](https://github.com/shivammathur/setup-php#inputs)
  - [Basic Setup](https://github.com/shivammathur/setup-php#basic-setup)
  - [Matrix Setup](https://github.com/shivammathur/setup-php#matrix-setup)
  - [Experimental Setup](https://github.com/shivammathur/setup-php#experimental-setup)  
  - [Thread Safe Setup](https://github.com/shivammathur/setup-php#thread-safe-setup)
  - [Force Update](https://github.com/shivammathur/setup-php#force-update)
  - [Verbose Setup](https://github.com/shivammathur/setup-php#verbose-setup)
  - [Cache Extensions](https://github.com/shivammathur/setup-php#cache-extensions)
  - [Cache Composer Dependencies](https://github.com/shivammathur/setup-php#cache-composer-dependencies)
  - [Problem Matchers](https://github.com/shivammathur/setup-php#problem-matchers)
  - [Examples](https://github.com/shivammathur/setup-php#examples)
- [License](https://github.com/shivammathur/setup-php#scroll-license)
- [Dependencies](https://github.com/shivammathur/setup-php#bookmark-dependencies)
- [Further Reading](https://github.com/shivammathur/setup-php#bookmark_tabs-further-reading)

## PHP Support

|PHP Version|Stability|Release Support|
|--- |--- |--- |
|5.3|`Stable`|`End of life`|
|5.4|`Stable`|`End of life`|
|5.5|`Stable`|`End of life`|
|5.6|`Stable`|`End of life`|
|7.0|`Stable`|`End of life`|
|7.1|`Stable`|`End of life`|
|7.2|`Stable`|`Security fixes only`|
|7.3|`Stable`|`Active`|
|7.4|`Stable`|`Active`|
|8.0|`Experimental`|`In development`|

**Note:** Specifying `8.0` in `php-version` input installs a nightly build of `PHP 8.0.0-dev` with `PHP JIT`, `Union Types v2` and other [new features](https://wiki.php.net/rfc#php_80 "New features implemented in PHP 8"). See [experimental setup](https://github.com/shivammathur/setup-php#experimental-setup) for more information.

## OS/Platform Support

|Virtual environment|matrix.operating-system|
|--- |--- |
|Windows Server 2019|`windows-latest` or `windows-2019`|
|Ubuntu 18.04|`ubuntu-latest` or `ubuntu-18.04`|
|Ubuntu 16.04|`ubuntu-16.04`|
|macOS X Catalina 10.15|`macos-latest` or `macOS-10.15`|

## PHP Extension Support
- On `ubuntu` by default extensions which are available as a package can be installed. If the extension is not available as a package but it is on `PECL`, it can be installed by specifying `pecl` in the tools input.

```yaml
uses: shivammathur/setup-php@v2
with:
  php-version: '7.4'
  tools: pecl
  extensions: swoole
```

- On `windows` extensions which have `windows` binary on `PECL` can be installed.

- On `macOS` extensions which are on `PECL` can be installed.

- Extensions which are installed along with PHP if specified are enabled.

- Specific versions of PECL extensions can be installed by suffixing the extension with the version. This is useful for installing old versions of extensions which support end of life PHP versions.

```yaml
uses: shivammathur/setup-php@v2
with:
  php-version: '7.4'
  tools: pecl
  extensions: pcov-1.0.6
```

- Pre-release versions of PECL extensions can be installed by suffixing the extension with its state i.e `alpha`, `beta`, `devel` or `snapshot`.

```yaml
uses: shivammathur/setup-php@v2
with:
  php-version: '7.4'
  tools: pecl
  extensions: xdebug-beta
```

- Extensions which cannot be installed gracefully leave an error message in the logs, the action is not interrupted.

## Tools Support

These tools can be setup globally using the `tools` input.

`codeception`, `composer`, `composer-prefetcher`, `cs2pr`, `deployer`, `pecl`, `phinx`, `phive`, `phpcbf`, `phpcpd`, `php-config`, `php-cs-fixer`, `phpcs`, `phpize`, `phpmd`, `phpstan`, `phpunit`, `prestissimo`, `psalm`, `symfony`

```yaml
uses: shivammathur/setup-php@v2
with:
  php-version: '7.4'
  tools: php-cs-fixer, phpunit
```

To setup a particular version of a tool, specify it in the form `tool:version`.  
Version should be in semver format and a valid release of the tool.

```yaml
uses: shivammathur/setup-php@v2
with:
  php-version: '7.4'
  tools: php-cs-fixer:2.15.5, phpunit:8.5.1
``` 

**Note**
- `composer` is setup by default.
- Specifying version for `composer` and `pecl` has no effect, latest versions of both tools which are compatible with the PHP version will be setup.
- If the version specified for the tool is not in semver format, latest version of the tool will be setup.
- Tools which cannot be installed gracefully leave an error message in the logs, the action is not interrupted.

## Coverage support

### Xdebug

Specify `coverage: xdebug` to use `Xdebug`.  
Runs on all [PHP versions supported](https://github.com/shivammathur/setup-php#tada-php-support "List of PHP versions supported on this GitHub Action") except `8.0`.

```yaml
uses: shivammathur/setup-php@v2
with:
  php-version: '7.4'
  coverage: xdebug
```

### PCOV

Specify `coverage: pcov` to use `PCOV` and disable `Xdebug`.  
It is much faster than `Xdebug`.  
`PCOV` needs `PHP >= 7.1`.  
If your source code directory is other than `src`, `lib` or, `app`, specify `pcov.directory` using the `ini-values` input.  

```yaml
uses: shivammathur/setup-php@v2
with:
  php-version: '7.4'
  ini-values: pcov.directory=api #optional, see above for usage.
  coverage: pcov
```

### Disable Coverage

Specify `coverage: none` to remove both `Xdebug` and `PCOV`.  
Consider disabling the coverage using this PHP action for these reasons.

- You are not generating coverage reports while testing.
- It will remove `Xdebug`, which will have a positive impact on PHP performance.
- You are using `phpdbg` for running your tests.

```yaml
uses: shivammathur/setup-php@v2
with:
  php-version: '7.4'
  coverage: none
```

## Usage

### Inputs

#### `php-version` (required)

- Specify the PHP version you want to setup.
- Accepts a `string`. For example `'7.4'`.
- See [PHP support](https://github.com/shivammathur/setup-php#tada-php-support) for supported PHP versions.

#### `extensions` (optional)

- Specify the extensions you want to setup.
- Accepts a `string` in csv-format. For example `mbstring, zip`.
- See [PHP extension support](https://github.com/shivammathur/setup-php#heavy_plus_sign-php-extension-support) for more info.

#### `ini-values` (optional)

- Specify the values you want to add to `php.ini`.
- Accepts a `string` in csv-format. For example `post_max_size=256M, short_open_tag=On`.

#### `coverage` (optional)

- Specify the code coverage driver you want to setup.
- Accepts `xdebug`, `pcov` or `none`.
- See [coverage support](https://github.com/shivammathur/setup-php#signal_strength-coverage-support) for more info.

#### `tools` (optional)

- Specify the tools you want to setup.
- Accepts a `string` in csv-format. For example `phpunit, phpcs`
- See [tools Support](https://github.com/shivammathur/setup-php#wrench-tools-support) for tools supported.

See below for more info.

### Basic Setup

> Setup a particular PHP version.

```yaml
steps:
- name: Checkout
  uses: actions/checkout@v2

- name: Setup PHP
  uses: shivammathur/setup-php@v2
  with:
    php-version: '7.4'
    extensions: mbstring, intl
    ini-values: post_max_size=256M, short_open_tag=On
    coverage: xdebug    
    tools: php-cs-fixer, phpunit
```

### Matrix Setup

> Setup multiple PHP versions on multiple operating systems.

```yaml
jobs:
  run:
    runs-on: ${{ matrix.operating-system }}
    strategy:
      matrix:
        operating-system: [ubuntu-latest, windows-latest, macos-latest]
        php-versions: ['5.6', '7.0', '7.1', '7.2', '7.3', '7.4']
    name: PHP ${{ matrix.php-versions }} Test on ${{ matrix.operating-system }}
    steps:
    - name: Checkout
      uses: actions/checkout@v2

    - name: Setup PHP
      uses: shivammathur/setup-php@v2
      with:
        php-version: ${{ matrix.php-versions }}
        extensions: mbstring, intl
        ini-values: post_max_size=256M, short_open_tag=On
        coverage: xdebug        
        tools: php-cs-fixer, phpunit
```

### Experimental Setup

> Setup a nightly build of `PHP 8.0.0-dev` from the [master branch](https://github.com/php/php-src/tree/master "Master branch on PHP source repository") of PHP.

- This version is currently in development and is an experimental feature on this action.
- `PECL` is installed by default with this version on `ubuntu`.
- Some extensions might not support this version currently.
- Refer to this [RFC](https://wiki.php.net/rfc/jit "PHP JIT RFC configuration") for configuring `PHP JIT` on this version.
- Refer to this [list of RFCs](https://wiki.php.net/rfc#php_80 "List of RFCs implemented in PHP8") implemented in this version.

```yaml
steps:
- name: Checkout
  uses: actions/checkout@v2

- name: Setup PHP
  uses: shivammathur/setup-php@v2
  with:
    php-version: '8.0'
    extensions: mbstring
    ini-values: opcache.jit_buffer_size=256M, opcache.jit=1235, pcre.jit=1
    coverage: pcov
    tools: php-cs-fixer, phpunit
```

### Thread Safe Setup

- `NTS` versions are setup by default.
- On `ubuntu` and `macOS` only NTS versions are supported.
- On `windows` both `TS` and `NTS` versions are supported.

```yaml
jobs:
  run:
    runs-on: windows-latest
    name: Setup PHP TS on Windows
    steps:
    - name: Checkout
      uses: actions/checkout@v2

    - name: Setup PHP
      uses: shivammathur/setup-php@v2
      with:
        php-version: '7.4'
      env:
        PHPTS: ts # specify ts or nts
```

### Force Update

- PHP versions which are pre-installed on the GitHub Actions runner are not updated to their latest patch release by default.
- You can specify the `update` environment variable to `true` to force update to the latest release.

```yaml
- name: Setup PHP
  uses: shivammathur/setup-php@v2
  with:
    php-version: '7.4'
  env:
    update: true # specify true or false
```

### Verbose Setup

- To debug any issues, you can use the `verbose` tag instead of `v2`.

```yaml
- name: Setup PHP
  uses: shivammathur/setup-php@verbose
  with:
    php-version: '7.4'
```

### Cache Extensions

You can persist PHP extensions you setup using the [`shivammathur/cache-extensions`](https://github.com/shivammathur/cache-extensions "GitHub Action to cache php extensions") and [`action/cache`](https://github.com/actions/cache "GitHub Action to cache files") GitHub Actions. Extensions which take very long to setup if cached are available in the next workflow run and enabled directly which reduces the workflow execution time.  

```yaml
runs-on: ${{ matrix.operating-system }}
strategy:
  matrix:
    operating-system: [ubuntu-latest, windows-latest, macos-latest]
    php-versions: ['7.2', '7.3', '7.4']
name: PHP ${{ matrix.php-versions }} Test on ${{ matrix.operating-system }}
env:
  extensions: intl, pcov
  key: cache-v1 # can be any string, change to clear the extension cache.
steps:
- name: Checkout
  uses: actions/checkout@v2

- name: Setup cache environment
  id: cache-env
  uses: shivammathur/cache-extensions@v1
  with:
    php-version: ${{ matrix.php-versions }}
    extensions: ${{ env.extensions }}
    key: ${{ env.key }}

- name: Cache extensions
  uses: actions/cache@v1
  with:
    path: ${{ steps.cache-env.outputs.dir }}
    key: ${{ steps.cache-env.outputs.key }}
    restore-keys: ${{ steps.cache-env.outputs.key }}

- name: Setup PHP
  uses: shivammathur/setup-php@v2
  with:
    php-version: ${{ matrix.php-versions }}
    extensions: ${{ env.extensions }}
```

### Cache Composer Dependencies

You can persist composer's internal cache directory using the [`action/cache`](https://github.com/actions/cache "GitHub Action to cache files") GitHub Action. Dependencies cached are loaded directly instead of downloading them while installation. The files cached are available across check-runs and will reduce the workflow execution time.

**Note:** Please do not cache `vendor` directory using `action/cache` as that will have side-effects.

```yaml
- name: Get Composer Cache Directory
  id: composer-cache
  run: echo "::set-output name=dir::$(composer config cache-files-dir)"

- name: Cache dependencies
  uses: actions/cache@v1
  with:
    path: ${{ steps.composer-cache.outputs.dir }}
    key: ${{ runner.os }}-composer-${{ hashFiles('**/composer.lock') }}
    restore-keys: ${{ runner.os }}-composer-

- name: Install Dependencies
  run: composer install --prefer-dist
```

In the above example, if you support a range of `composer` dependencies and do not commit `composer.lock`, you can use the hash of `composer.json` as the key for your cache.

```yaml
key: ${{ runner.os }}-composer-${{ hashFiles('**/composer.json') }} 
``` 

### Problem Matchers

#### PHP

Setup problem matchers for your `PHP` output by adding this step after the `setup-php` step. This will scan the logs for PHP errors and warnings, and surface them prominently in the GitHub Actions UI by creating annotations and log file decorations.

```yaml
- name: Setup Problem Matchers for PHP
  run: echo "::add-matcher::${{ runner.tool_cache }}/php.json"
```

#### PHPUnit

Setup problem matchers for your `PHPUnit` output by adding this step after the `setup-php` step. This will scan the logs for failing tests and surface that information prominently in the GitHub Actions UI by creating annotations and log file decorations.

```yaml
- name: Setup Problem Matchers for PHPUnit
  run: echo "::add-matcher::${{ runner.tool_cache }}/phpunit.json"
```

#### Other Tools

For tools that support `checkstyle` reporting like `phpstan`, `psalm`, `php-cs-fixer` and `phpcs` you can use `cs2pr` to annotate your code.  
For examples refer to [cs2pr documentation](https://github.com/staabm/annotate-pull-request-from-checkstyle).  

> Here is an example with `phpstan`.

```yaml
- name: Setup PHP
  uses: shivammathur/setup-php@v2
  with:
    php-version: '7.4'
    tools: cs2pr, phpstan

- name: PHPStan
  run: phpstan analyse src --error-format=checkstyle | cs2pr
```

### Examples

Check examples for setting up this GitHub Action with different PHP Frameworks/Packages [here](https://github.com/shivammathur/setup-php#examples).

## License

The scripts and documentation in this project are released under the [MIT License](https://github.com/shivammathur/setup-php/blob/master/LICENSE "License for shivammathur/setup-php"). This project has multiple [dependencies](https://github.com/shivammathur/setup-php#bookmark-dependencies "Dependencies for this PHP Action"). Their licenses can be found in their respective repositories.

## Dependencies

- [Node.js dependencies](https://github.com/shivammathur/setup-php/network/dependencies "Node.js dependencies")
- [gplessis/dotdeb-php](https://github.com/gplessis/dotdeb-php "Packaging for end of life PHP versions")
- [mlocati/powershell-phpmanager](https://github.com/mlocati/powershell-phpmanager "Package to handle PHP on windows")
- [ppa:ondrej/php](https://launchpad.net/~ondrej/+archive/ubuntu/php "Packaging active PHP packages")
- [shivammathur/cache-extensions](https://github.com/shivammathur/cache-extensions "GitHub action to help with caching PHP extensions")
- [shivammathur/homebrew-php](https://github.com/shivammathur/homebrew-php "Tap for PHP builds for MacOS")
- [shivammathur/php-builder](https://github.com/shivammathur/php-builder "Nightly PHP package")
- [shivammathur/php5-ubuntu](https://github.com/shivammathur/php5-ubuntu "Scripts to setup PHP5 versions")

## Further Reading

- [About GitHub Actions](https://github.com/features/actions "GitHub Actions")
- [GitHub Actions Syntax](https://help.github.com/en/articles/workflow-syntax-for-github-actions "GitHub Actions Syntax")
- [Other Awesome Actions](https://github.com/sdras/awesome-actions "List of Awesome GitHub Actions")
