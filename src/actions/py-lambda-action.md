---
path: "/py-lambda"
title: "py-lambda"
github_url: "https://github.com/mariamrf/py-lambda-action"
author: "mariamrf"
subtitle: "A Github Action to deploy AWS Lambda functions written in Python with their dependencies in a separate layer."
tags: ["actions","aws","lambda","lambda-layer"]
---
# py-lambda-action
A Github Action to deploy AWS Lambda functions written in Python with their dependencies in a separate layer. For now, only works with Python 3.6.

## Use
Doesn't take any arguments. Deploys everything in the repo as code to the Lambda function, and installs/zips/deploys the dependencies as a separate layer the function can then immediately use.
### Structure
- Lambda code should be structured normally/as Lambda would expect it.
- **Dependencies must be stored in a `requirements.txt`**.
### Environment variables
Stored as secrets or env vars, doesn't matter. But also please don't put your AWS keys outside Secrets.
- **AWS Credentials**  
    That includes the `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, etc. It's used by `awscli`, so the docs for that [can be found here](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html).
- `LAMBDA_LAYER_ARN`  
    The ARN for the Lambda layer the dependencies should be pushed to **without the version** (every push is a new version).
- `LAMBDA_FUNCITON_NAME`  
    The Lambda function name. [From the AWS docs](https://docs.aws.amazon.com/cli/latest/reference/lambda/update-function-code.html), it can be any of the following:
    - Function name - `my-function`  
    - Function ARN - `arn:aws:lambda:us-west-2:123456789012:function:my-function`  
    - Partial ARN - `123456789012:function:my-function`
- `BRANCH` (optional)  
    If the action should only be executed on a certain branch (e.g. `master`).

### Example workflow
```hcl
workflow "Build & deploy" {
  on = "push"
  resolves = ["py-lambda-deploy"]
}

action "py-lambda-deploy" {
  uses = "mariamrf/py-lambda-action@master"
  secrets = [
    "AWS_ACCESS_KEY_ID",
    "AWS_SECRET_ACCESS_KEY",
    "AWS_DEFAULT_REGION",
    "LAMBDA_FUNCTION_NAME",
    "LAMBDA_LAYER_ARN",
  ]
  env = {
    BRANCH = "master"
  }
}
```
