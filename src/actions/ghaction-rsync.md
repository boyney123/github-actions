---
path: '/ghaction-rsync'
title: 'Deploy via rsync and ssh'
github_url: 'https://github.com/maxheld83/ghaction-rsync'
author: 'Maximilian Held'
twitter: '@maxheld'
subtitle: 'Deploy build artefacts the oldschool way.'
---


# Action details

Sometimes, you might want to deploy static assets to some old school webserver over ssh.
This is your action.

It allows you to transfer files *from* your working directory (`/github/workspace`) *to* some server using `rsync` over ssh.
Helpfully, `/github/workspace` includes a copy of your repository *source*, as well as any build artefacts left behind by previous workflow steps (= other actions you ran before).
