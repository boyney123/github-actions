---
path: '/psake-tasks'
title: 'Run psake tasks'
github_url: 'https://github.com/devblackops/psake-github-action'
author: 'devblackops'
subtitle: 'This official psake GitHub Action allow you to run psake tasks as part of your GitHub workflow.'
---

## Actions

### Task

Runs one or more psake tasks defined in a `psakeFile.ps1` in the root of the repository.
The file containing your psake tasks can be overridden via environment variables.

## Success Criteria

This action succeeds if the `psake` task(s) complete without error.

## Usage

```hcl
action "psake test" {
    # Replace <latest tag> with the latest tag from
    # https://github.com/devblackops/psake-github-action/releases
    uses = "devblackops/psake-github-action@<latest tag>"

    # If you need to change the default psakeFile name, PSDepend requirements file,
    # or skip requirements installation entirely, specify here.
    # See Environment Variables below for details.
    env = {
        PSAKE_FILE = "./psakeFile.ps1"
    }

    # The psake task(s) to execute
    args = ["Test"]
}
```

## Environment Variables

| Name          | Default               | Description                                                    |
| ------------- | --------------------- | -------------------------------------------------------------- |
| PSAKE_FILE    | "./psakeFile.ps1"     | The default psake task file to execute                         |
| PSDEPEND_FILE | "./requirements.psd1" | The default PSDepend file to install dependencies from         |
| SKIP_REQS     | "false"               | Set to `"true"` to skip installing dependencies via `PSDepend` |

## Arguments

Arguments to the `Task` action determine what `psake` tasks to execute.
By default, `psake` will execute a task called `Default` that is defined in the psakeFile.

Execute the `test` psake task.

```hcl
action "psake test" {
    ...
    args = ["Test"]
}
```

Execute the `init`, `build`, and `test` psake tasks.

```hcl
action "psake test" {
    ...
    args = ["init, build, test"]
}
```
