### Static linting for pull requests

This release supports linting pull request titles and descriptions by testing against a regular expression, supplies as action input.

If the linting fails, you can configure the action to automatically leave a comment explaining the rules for pull request structure. You are free to add as many rules as you want.

If the pull request passes, the action will clean up after itself to not clutter your pull request with unnecessary comments. You are also able to supply a set of labels that can be added on success, to allow prefiltering your pull requests and see which are ready for review from a structural perspective.

### Example workflow:

```
name: Lint Pull Request
on:
  pull_request:
    types: [opened, edited]

jobs:
  lint-pull-request:
    name: Lint Pull Request
    runs-on: ubuntu-latest 

    steps:
      - name: Lint Pull Request
        uses: reaction-link/actions-lint-pull-request@v1
        with:
          config-bot-repotoken: ${{secrets.SOME_SECRET}}
          config-bot-login: mybotaccount    
          github-event: ${{toJson(github.event)}}
          use-title-regex: '(Feature|Bugfix|Hotfix|Release)(\/KEY-\d+)?:\s\w+'
          use-approval-labels: '["Good Structure"]'
          use-explanation-title: '["- There must be a title in this format: `Feature|Bugfix|Hotfix|Release: Title`","- If applicable, add your issue ticket (e.g. `REA-100`) with a slash in the title","- Use `Feature` for enhancements or new functionality","- Use `Bugfix` only if you fixed a known bug","- Use `Hotfix` for problems introduced by previous merges","- Use proper capitalization in your title"]'
```

### Result on fail

<img width="1061" alt="Bildschirmfoto 2022-03-25 um 12 16 44" src="https://user-images.githubusercontent.com/5528623/160111357-c1938548-cccc-41ee-9ead-3e02c043012b.png">

### Result on success

<img width="640" alt="Bildschirmfoto 2022-03-25 um 12 35 42" src="https://user-images.githubusercontent.com/5528623/160113810-6e218beb-1e2b-4a23-9e57-44b916058a5c.png">

### Available inputs

```
inputs:
  config-bot-repotoken:
    description: "Token with repo-scope permissions for a GitHub user (bot account for example)"
    required: true
  config-bot-login:
    description: "Username of the GitHub user (bot account for example)"
    required: true
  github-event:
    description: "toJSON of github.event (event triggering the action)"
    required: true
  use-greetings:
    description: "JSON string array to use for randomly selected greetings (used in comment body, runs through JSON.parse)"
    default: '["Hello @{name},\n"]'
  use-approval-labels:
    description: "JSON string array to use for labeling linted pull request (runs through JSON.parse)"
    default: '["Good"]'
  use-title-regex:
    description: "Regex string to use for linting the pull request title"
    default: '\w+'
  use-description-regex:
    description: "Regex string to use for linting the pull request description"
    default: '\w+'
  use-title-regex-flag:
    description: "Regex flag to use for linting the pull request title (Use empty string for none)"
    default: 'g'
  use-description-regex-flag:
    description: "Regex flag to use for linting the pull request description (Use empty string for none)"
    default: 'g'
  use-problem-title:
    description: "Template string to use for highlighting a title that failed to pass (used in comment body). Template-Literals: {title}"
    default: '- The title `{title}` is not the format I expected.'
  use-problem-description:
    description: "Template string to use for highlighting a description that failed to pass (used in comment body). Template-Literals: {body}"
    default: '- The description `{body}` is not the format I expected.'
  use-explanation-title:
    description: "JSON string array to describe rules to pass linting for the pull request title (used in comment body, runs through JSON.parse)"
    default: '["- There must be a title","- Use proper capitalization"]'
  use-explanation-description:
    description: "JSON string array to describe rules to pass linting for the pull request description (used in comment body, runs through JSON.parse)"
    default: '["- There must be a description"]'

```

### Caveats
- You can supply `config-bot-repotoken: ${{secrets.GITHUB_TOKEN}}` and `config-bot-login: github-actions` if you don't have a bot account.
- You can supply your own user-login and a personal access token for your account (stored as a secret in private repositories) to leave comments on your behalf
- Currently linting is limited to the pull request title and its description, other aspects will follow (commit messages, amount of commits, etc.)
- Use the raw regular expression, don't enclose the expression in `\\`
- Supply a flag for the expression with the additional inputs available
- Have a look at the README or the action.yml to see available inputs, their use-cases and what is happening to them (some are JSON parsed and require string escaping for example!)
- Configure the action to be a required action for pull requests against protected branches to enforce your pull request structure rules
- Combine GitHub's ability to auto-link to project management software if it detects an issue key by supplying a regular expression that requires an issue key to be existent (or make it optional like in the example above)


### Happy Linting

![bot-thumbsup](https://user-images.githubusercontent.com/5528623/160114894-6e0684c6-395f-432d-8c0c-99937469eb16.png)


