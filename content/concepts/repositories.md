---
title: Repositories
description: Repositories are where configuration values are sourced from
menu:
  sidebar:
    parent: "concepts"
    weight: 07
weight: 07
sections_weight: 07
slug:
aliases: [/concepts/repositories/]
---

Repositories are a fundamental storage and configuration concept in configrd. You will have at least one 'default' config repository and most likely more named repositories. You can choose to house all your configurations in one large repository or segment your configurations across multiple repositories, for example, each service in your environment could have its own repository.

A repository defines:

* Where configuration values are stored and how they are accessed. I.e. a git, https, s3
* Manages security for access to and from the repository
* If an how how secrets are secured and encrypted
* Manages a set of named config profiles available in this repository
* Optionally sets filters for how configs should be transformed at read and write

#### Sample Repository Definition

Here is the default repository definition which comes with configrd:

{{< code file="configrd.yaml" >}}
service:
  defaults:
    fileName: default.properties
  repos:
    default:
      uri: file:/srv/configrd
      sourceName: file
{{< /code >}}

This configuration defines only one repository named 'default'. Configurations will be sourced and stored to a file system location at /srv/configrd using the 'file' source. The service will attempt to load a file called default.properties at each path in the hierarchy when queried. This setting is inherited from the 'defaults' section with global values shared by all repositories. 

## Repository Structure

At the early phases of a project, managing all configurations in one repository may be convenient and low maintenance. As your environment and service catalog grows, or as new teams join your organization, it will make sense to segment your configurations into multiple repositories and let different teams manage their own.

Whether to divide your configurations across one or more repositories will greatly depend on what you want to accomplish. 

{{% note %}}
A repository can only refer to one storage location but many repositories can map to the same storage location and different paths within it.
{{% /note %}}

#### The Global Repository

A single repository for all your environments and applications' properties is a great simple way to start. If you already manage all our config files in one location, i.e. an s3 bucket or a git repository, you can simply map the 'default' repository to your current location and start serving variable values. Over time, you may introduce some inheritance structures using subfolders and make finding the right configs easier using named profiles.

#### Repository per Environment

Many organizations require separation between environments for security reasons. A repository per environment with all configurations for all services running within it is a natural fit. For example, each service could managed its configuration as a subfolder with global configurations inherited from the root level.

#### Repository per Module

Managing a single modules or service's configuration per repository works great if you have a micro services strategy or a development team per service. Managing the module's configuration across environments from one location makes access controls, versioning, diffing and promoting values easy.

