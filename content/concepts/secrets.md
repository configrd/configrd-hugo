---
title: Secrets
description: Managing secrets alongside your configurations
lastmod: 2019-05-21
menu:
  sidebar:
    parent: "concepts"
    weight: 09
weight: 130
tags: ["secrets"]
tags_weight: 22
---

# Secrets

Secrets should be kept safe and encrypted but it doesn't mean they need to be siloed away from all your other configurations in some proprietary system. Secrets need to be managed, changed, overriden and promoted just like configs so why not keep, version and manage them together?

As long as secrets are encrypted with strong keys which are rotated frequently there is little risk in storing secrets as cyphertext alongside your other configurations.

Configrd keeps your secrets encrypted at rest and encrypts/decrypts tokens on the fly while keeping your plain text configurations untouched and accessible. 

### Bring your own KMS

It is likely you already have an existing key management system (KMS) within your organization and that your infosec team wants everyone to use it and already has established best practices for key management. Great! Let's use it.

If you don't, get one. You'll use it for more things than just configrd.

Each repository within configrd can be set up to use a different key if needed. Depending on your repository strategy, each service, module or environment could have it's own keys.git

{{< infobox type="info" >}}
AWS KMS is currently the only supported KMS with configrd. Please let us know which KMS you'd like to see integrated.
{{< /infobox >}}

### Pattern based Matching

Configrd selects what variable keys to treat as secrets based on regex patterns you define for your repository. You can choose which variable names to include or exclude from on the fly encryption so that all non secret data can still be stored as plain text for easy editing and transparency.