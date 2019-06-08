---
title: Profiles
description: A discrete configuration used by your application
lastmod: 2019-05-21
menu:
  sidebar:
    parent: "concepts"
    weight: 10
weight: 120
tags: ["profiles"]
tags_weight: 22
---

# Profiles

A config profile is a specific set of config values your application needs to function.  Configrd lets you construct that set of configurations utilizing a combination of methods including repositories, paths, templates and inheritance but at the end, you will pull a specific set of config values. That is your config profile. 

Config profiles can be constructed on demand by simply querying configrd at a specific path and let configrd assemble the profile. To make this process even simpler, you can define named config profiles in your **configrd.yaml** file.

### Named Profiles

A named config profile is simply a pointer to a path in your repository. Besides being quick and easy to use with a simple query parameter, it also provides the flexibility to change the layout of your repository without breaking dependent applications. If you ever need to reorganize a repository, you can simply change the path of the named profile. How that profile is being consumed doesn't change.

#### Example

Let's say we start off with a flat repository structure without much inheritance between environments. Each environment has it's own set of configs in a dedicated folder hierarchy.

{{< code-old lang="yaml" file="configrd.yaml">}}
```
repos:
  default:
      uri: https://config.appcrossings.net.s3.amazonaws.com/apps
      named:
        dev: env/dev/myapp
        stage: env/stage/myapp
        prod: env/prod/myapp
```
{{< /code-old >}}

To obtain the `dev` config profile for `myapp`, you'd execute the following query

{{< code-old lang="bash" >}}
curl -s -H "Accept: text/plain" https://demo.configrd.io/configrd/v1/?p=dev
{{< /code-old >}}

Now, we'd like to reuse more of our configurations between environments. For example, we'd like to reuse the dev environment's settings for local configuration but with some local overrides. We'd also like to ensure our prod and stage environment align as closely as possible by stage inheriting as many settings from prod as possible so that we can best replicate its behavior during test.

You may change your inheritance hierarchy as follows

{{< code-old lang="yaml" file="configrd.yaml" >}}
```
repos:
  default:
      uri: https://config.appcrossings.net.s3.amazonaws.com/apps
      named:
        local: env/myapp/dev/local
        dev: env/myapp/dev
        stage: env/myapp/prod/stage
        prod: env/myapp/prod
```
{{< /code-old >}}

But we'd still query the `dev` config profile for `myapp` as before, thus braking no exiting references

{{< code-old lang="bash" >}}
curl -s -H "Accept: text/plain" https://demo.configrd.io/configrd/v1/?p=dev
{{< /code-old >}}