---
title: Inheritance
description: Inheritance allows an environments to reuse the configuration of another environment while still defining its own values.
menu:
  sidebar:
    parent: "concepts"
    weight: 08
weight: 140
sections_weight: 08
slug:
aliases: [/concepts/inheritance/]
---

**Configrd** serves environment variable values over HTTP/S on demand as plaintext key=value pairs, json or yaml. Accessing environment variables anywhere is as simple as issuing a request to the service and obtaining key value pairs in the response body.

Environment variables can be sourced from a number of locations \(repositories\) as either text, json or yaml files on a local/remote file system, http locations, s3 buckets or git repositories. 

Environment variables can be structured into hierarchies using folders. The folder hierarchy dictates the override order of variables where variable values specified in child folders override values in a parent folder. Each service or app could have one or more folder hierarchies for overrides. The request's URL will be mapped to the folder structure and the override hierarchy applied at request time.

{{% infobox %}}
Inheritance is only supported within a repository, not across repositories.
{{% /infobox %}}

## Example

Let's say we define a repository sourcing environment variables from plain-text files stored in git and our configrd service is accessible at `https://mycorp.com/configrd/v1/`

We defined two environment variables at path `/env/dev` in git

{{< code-yaml file="default.properties" >}}
app.url = https://dev.myservice.com/
support.email = support@myservice.com
{{< /code-yaml >}}

The child path `/env/dev/local` in git contains **only** the variable

{{< code-yaml-no-num file="default.properties" >}}
app.url = http://localhost:8080/
{{< /code-yaml-no-num >}}

If we request the "dev" config profile at `https://mycorp.com/configrd/v1/env/dev/`, configrd returns:

{{< code-plain-yaml >}}
app.url = https://dev.myservice.com/
support.email = support@myservice.com
{{< /code-plain-yaml >}}

Now, if we request the "local" config profile which overrides and inherits from the "dev" profile at `https://mycorp.com/configrd/v1/env/dev/local/`, configrd returns:

{{< code-plain-yaml >}}
app.url = http://localhost:8080 (overriden)
support.email = support@myservice.com (inherited)
{{< /code-plain-yaml >}}

Any environment variable changes are immediately available on the next request.

The above is a simple example how config profiles both inherit and override a parent profiles' values. 

Global environment variables can be defined and shared across config profiles by simply placing them at the root of the folder hierarchy. Different tiers in the folder hierarchy can signify global, service, environment, data center specific etc. config profiles. Each tier will only need to contain variables and values it wishes to either add or override as all others will be inherited.

{{% blockquote %}}
This example does not cover additionally available features such as on the fly encryption/decryption of secrets, named config profiles for direct access, variable and value transformation, secured repositories or variable templating.
{{% /blockquote %}}

