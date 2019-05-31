---
title: Configure
lastmod: 2019-05-26
menu:
  sidebar:
    parent: "setup"
    weight: 04
weight: 180
tags: ["Tag1", "Tag2", "Tag3"]
tags_weight: 22
aliases: [/setup/configure/]
toc: true
---

Running configrd requires a bootstrap configuration on start in the form of a yaml file. The `configrd.yaml` file defines:

* All available repositories from where to fetch environment variables and application properties
* System wide defaults

## Default configrd.yaml

The default configuration loaded by configrd when no specific configrd.yaml file is provided on start looks as follows:

{{< code-yaml file="configrd.yaml" >}}
service:
  defaults:
    fileName: default.properties
  repos:
    default:
      uri: file:/srv/configrd
      sourceName: file
{{< /code-yaml >}}

The above configrd.yaml states:

* There is only one repository and it's named **default**
* Configurations are located on the local file system at `/srv/configrd` \(and its sub-folders\)
* Load environment variable values from files named `default.properties`

#### Service

`Service` is the mandatory configrd.yaml root element.

#### Defaults

The `defaults` section defines global values inherited by all `repos`. Repository configurations can override these default values with more specific ones. The properties from the defaults section are literally copied down as is to each repo definition. Properties defined in defaults which do not apply to a repository's source type are ignored.

Here, the repository named **default** would inherit the parameter `fileName` with value `default.properties`. FileName defines the name of the file configrd will look for on each path in the repository when queried. In this case, your environment variable values should be stored in a file called `default.properties`.

#### Repos

All available repositories are defined by name in the repos section. There must always be **at least one** repository defined in the repos section of configrd.yaml. The repository name **default** is a reserved name with special meaning to configrd but if you choose to define only one repository, it does not need to be named **default** but there are benefits to this naming explained later.

## Repositories

A repository is a location from where environment variables and application settings are served as well as additional settings for how to access, secure and process those config values. 

* You can have one or many repositories serving your configurations
* Each repository must have a unique name
* One repository may be the **default** repository but it's not required
* Each repository must point to a uri where environment variables are stored
* Each repository must have a config source
* More than one repository can point to the same uri storage location

{{% infobox type1="info" %}}
Each config source below uses a different repository configuration example in order to illustrate additional features and capabilities of the service. Even if you don't intend to use configrd with the particular config source, it may still be helpful to read through the examples for additional understanding.
{{% /infobox %}}

## Config Sources

A config source connects a repository definition to the storage location where you keep your configurations. Each repository must have exactly one config source name defined. The repository's `uri` must match the config source chosen. Different config sources require different configuration parameters.

Some config source support both read and write operations via API. 

| Source | Description | API |
| :--- | :--- | :--- |
| file | Loads environment variable files from a local or mounted file system.  | GET |
| http | Load environment variable files over http and https | GET |
| s3 | Loads environment variables from AWS s3 buckets | GET, PUT |
| git | Loads environment variables from Git, GitHub or AWS CodeCommit | GET, PUT |

## File Config Source

Pull configuration files from the local file system or mounted volumes using the **file** config source. 

{{% infobox type1="info" %}}
The `uri` absolute path should start with `file:/srv/configrd/` when running from within a docker container
{{% /infobox %}}

| Property | Type | Required | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| uri | String | Yes |  | Absolute path to the root directory of configurations. Must begin with file:/ |
| fileName | String | Yes | default.properties | Name of file in directory structure where environment variables are stored. Should be .properties, .json or .yaml file |
| sourceName | String | Yes |  | Must be **file** |
| named | Named | No |  | See Named Profiles |

#### Example

This example employs the one repository per application pattern. Environments have been modeled using named profiles for direct access. 

The below configrd.yaml file assumes the following directory structure in order to achieve the desired inheritance behavior.

{{< code-yaml file="sample directory structure" >}}
srv/
└── configrd/
    └── apps/
        └── myapp/
            └── env/
                ├── default.properties
                ├── dev/
                │   ├── default.properties
                │   └── local/
                │       ├── default.properties
                │       └── johnny/
                │           └── default.properties
                ├── qa/
                │   └── default.properties
                └── prod/
                    ├── default.properties
                    └── stage/
                        └── default.properties
{{< /code-yaml >}}

{{< code-yaml file="configrd.yaml" >}}
service:
 repos:
    myapp:
      uri: file:/srv/configrd/apps/myapp
      fileName: default.properties
      sourceName: file
      named:
        local: env/dev/local
        johnny: env/dev/local/johnny
        dev: env/dev
        qa: env/qa
        stage: env/prod/stage
        prod: env/prod
{{< /code-yaml >}}

The above file based repository named **myapp** has the following configuration:

* The root of the repository is located at `file:/srv/configrd/apps/myapp` 
* The files in the repository are named **default.properties**
* Files will be loaded using the **file** config source
* There are several named config profiles
  * A **local** config profile which inherits and overrides the configurations of dev
  * **Johnny's local** config profile which inherits and overrides the default local settings
  * A **dev** config profile
  * A **qa** config profile
  * A **stage** profile which inherits from the prod settings
  * A **prod** config profile

{{% infobox type1="info" %}}
A folder does not have to have a config file. It can just contain other folders or be empty.
{{% /infobox %}}

## Http/s Config Source

Pull configurations over http/s with the http config source.

| Property | Type | Required | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| uri | String | Yes |  | Absolute path to the root http location of configurations. Must being with http:// or https://. |
| fileName | String | Yes | default.properties | Name of file in directory structure where environment variables are stored. Should be .properties, .json or .yaml file |
| sourceName | String | Yes |  | Must be **http** |
| username | String | No |  | Username when authenticating using Basic Auth |
| password | String | No |  | Password when authentication using Basic Auth |
| authMethod | String | No |  | Must be **UserPass** when authenticating using Basic Auth |
| trustCert | Boolean | No | False | Trust any TLS cert. True, False |

#### Example

This example is modeled using one environment per repository pattern. Accessing a specific application's configurations is done via named profiles. 

The below configrd.yaml file assumes the following path structure in order to achieve the desired inheritance behavior.

{{< code-plain-yaml >}}
srv/
└── configrd/
    └── apps/
        └── myapp/
            └── env/
                ├── env.yaml
                ├── dev/
                │   ├── env.yaml
                │   └── local/
                │       ├── env.yaml
                │       └── johnny/
                │           └── env.yaml
                ├── qa/
                │   └── env.yaml
                └── prod/
                    ├── env.yaml
                    └── stage/
                        └── env.yaml
{{< /code-plain-yaml >}}

{{< code-plain-yaml >}}
service:
 repos:
    myapp:
      uri: https://config.mycorp.com/myapp
      fileName: default.properties
      sourceName: file
      named:
        local: env/dev/local
        johnny: env/dev/local/johnny
        dev: env/dev
        qa: env/qa
        stage: env/prod/stage
        prod: env/prod
{{< /code-plain-yaml >}}

