---
path: '/dnscontrol-action'
title: 'dnscontrol-action'
github_url: 'https://github.com/koenrh/dnscontrol-action'
author: 'koenrh'
subtitle: 'Deploy your DNS configuration using GitHub Actions using DNSControl.'
tags: ['dns']
---

# DNSControl Action

Deploy your DNS configuration using [GitHub Actions](https://github.com/actions)
using [DNSControl](https://github.com/StackExchange/dnscontrol/).

## Usage

These are the three relevant sub commands to use with this action.

### check

Run the action with the 'check' argument in order to check and validate the `dnscontrol.js`
file. This action does not communicate with the DNS providers, hence does not require
any secrets to be set.

```workflow
action "DNSControl check" {
  uses = "koenrh/dnscontrol-action@master"
  args = "check"
}
```

### preview

Run the action with the 'preview' argument to check what changes need to be made.
It prints out what DNS records are expected to be created, modified or deleted.
This action requires the secrets for the specified DNS providers.

```workflow
action "DNSControl preview" {
  uses = "koenrh/dnscontrol-action@master"
  args = "preview"
  secrets = ["CLOUDFLARE_API_USER", "CLOUDFLARE_API_KEY"]
}
```

This is the action you probably want to run for each branch so that proposed changes
could be verified before an authorized person merges these changes into `master`.

### push

Run the action with the 'push' arugment to publish the changes to the specified
DNS providers.

Running the action with the 'push' argument will publish the changes with the
specified DNS providers. You should probably only use this command combined with
the GitHub [Filters action](https://github.com/actions/bin/tree/master/filter#filters-for-github-actions)
to make sure that only changes in the `master` branch are deployed to production.

```workflow
action "DNSControl push" {
  uses = "koenrh/dnscontrol-action@master"
  args = "push"
  secrets = ["CLOUDFLARE_API_KEY", "CLOUDFLARE_API_USER"]
}
```

You should probably only use this command combined with the GitHub [Filters action](https://github.com/actions/bin/tree/master/filter#filters-for-github-actions)
to make sure that only changes in the `master` branch are deployed to production.

## Secrets

Depending on the DNS providers that are used, this action requires secrets to be
set.

### Cloudflare

[Documentation](https://stackexchange.github.io/dnscontrol/providers/cloudflare)

- `CLOUDFLARE_API_USER`
- `CLOUDFLARE_API_KEY`
- `CLOUDFLARE_ACCOUNT_ID` (optional)
- `CLOUDFLARE_ACCOUNT_NAME` (optional)

### DigitalOcean

[Documentation](https://stackexchange.github.io/dnscontrol/providers/digitalocean)

- `DIGITALOCEAN_OAUTH_TOKEN`

### DNSimple

[Documentation](https://stackexchange.github.io/dnscontrol/providers/dnsimple)

- `DNSIMPLE_ACCOUNT_ACCESS_TOKEN`

### Gandi

[Documentation](https://stackexchange.github.io/dnscontrol/providers/gandi)

- `GANDI_API_KEY`

### Google CLOUD DNS

[Documentation](https://stackexchange.github.io/dnscontrol/providers/gcloud)

- `GOOGLE_CLOUD_PROJECT_ID`
- `GOOGLE_CLOUD_PRIVATE_KEY_ID`
- `GOOGLE_CLOUD_PRIVATE_KEY`
- `GOOGLE_CLOUD_CLIENT_EMAIL`
- `GOOGLE_CLOUD_CLIENT_ID`
- `GOOGLE_CLOUD_CLIENT_X509_CERT_URL`

### Linode

[Documentation](https://stackexchange.github.io/dnscontrol/providers/linode)

- `LINODE_ACCESS_TOKEN`

### Name.com

[Documentation](https://stackexchange.github.io/dnscontrol/providers/name.com)

- `NAME_COM_API_USER`
- `NAME_COM_API_KEY`
- `NAME_COM_API_URL` (optional)

### Namecheap

[Documentation](https://stackexchange.github.io/dnscontrol/providers/namecheap)

- `NAMECHEAP_API_USER`
- `NAMECHEAP_API_KEY`
- `NAMECHEAP_BASE_URL` (optional)

### NS1

[Documentation](https://stackexchange.github.io/dnscontrol/providers/ns1)

- `NSONE_API_KEY`

### OVH

[Documentation](https://stackexchange.github.io/dnscontrol/providers/ovh)

- `OVH_APP_KEY`
- `OVH_APP_SECRET_KEY`
- `OVH_CONSUMER_KEY`

### Amazon Route 53

[Documentation](https://stackexchange.github.io/dnscontrol/providers/route53)

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_SESSION_TOKEN` (optional)

### SoftLayer

[Documentation](https://stackexchange.github.io/dnscontrol/providers/softlayer)

- `SOFTLAYER_USERNAME`
- `SOFTLAYER_API_KEY`

### Vultr

[Documentation](https://stackexchange.github.io/dnscontrol/providers/vultr)

- `VULTR_TOKEN`
