---
title: Query
description: Getting environment variables from configrd
menu:
  sidebar:
    parent: "getting-started"
    weight: 05
weight: 05
sections_weight: 05
slug:
aliases: [/getting-started/query/]
toc: true
---

{{% note %}}
These examples all utilize the live demo environment available to experiment with at

[http://demo.configrd.io/configrd/v1/](http://demo.configrd.io/configrd/v1/)

Take a look at the configrd.yaml file we use

[https://s3.amazonaws.com/config.appcrossings.net/s3-repos.yaml](https://s3.amazonaws.com/config.appcrossings.net/s3-repos.yaml)

and browse the folder and file structure of the repository

[https://s3.amazonaws.com/config.appcrossings.net/](https://s3.amazonaws.com/config.appcrossings.net/)
{{% /note %}}

Querying configrd can be done from the command line or your programming language of choice over http/s. There are only a few optional query parameters. 

Responses are available as plain text key value, json and yaml.

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| r | String | No | The name of the repository to query. When querying the **default** repository, this parameter is optional. |
| p | String | No | The name of a named profile for the repository you are querying. Optional since repositories are not required to have named profiles. When using a named profile, there is no need to specify a path. |

## Query the Default Repository

The most simple query is to fetch variables form the root of the **default** repository.

```bash
curl -s -H "Accept: text/plain" http://demo.configrd.io/configrd/v1/
```

Since our demo environment has a **default.properties** file at the root of the default repository path, this query will return those base values.

## Query a Named Profile

Next, you can request a specific config profile by naming it in the **p** query parameter. You do not need to specify a path when using named profiles. 

```bash
curl -s -H "Accept: text/plain" http://demo.configrd.io/configrd/v1/?p=custom
```

Here we are querying a profile named **custom** which points at the `/env/dev/simple/` config profile in our **default** repository

## Query a Repository 

You can switch the repository by naming the repository in the **r** query parameter. You can use config profiles in the URL or named profiles in combination with the **r** query parameter.

Query the root path of **apps** repository.

```bash
curl -s -H "Accept: text/plain" http://demo.configrd.io/configrd/v1/?r=apps
```

Query the **myapp-dev** named config profile in the **apps** repository.

```bash
curl -s -H "Accept: text/plain" http://demo.configrd.io/configrd/v1/?r=apps&p=myapp-dev
```

## Inline Filename Override

The default filename configrd seeks at each config profile path is defined in the configrd.yaml file for each repository. In some cases, you may want to override the filename inline as part of the query. This is done by simply appending the desired file name to the URL.

{{% note %}}
File names are only relevant for file based repositories such as http, file or git. Future supported config sources, such as database, may not support this directive.
{{% /note %}}

{{% note %}}
File names must have a suffix. Files without a suffix such as just **env** will be interpreted as folders/directories.
{{% /note %}}

#### Example

Query the default repository for **default.json** files starting at the `/env/dev/json/` config profile even though the default file name setting in the **configrd.yaml** is **default.properties**.

```bash
curl -s -H "Accept: text/plain" http://demo.configrd.io/configrd/v1/env/dev/json/default.json
```

## Response Content Types

Configrd is capable of returning values in the form of plain text key value pair from plain text, json and yaml source files. Requesting a response of a particular content type is possible by setting the correct `Accept` header on the request. 

{{% note %}}
The `Accept` header is mandatory. Requesting a wildcard content type is not guaranteed to always resolve to the same response content type at each request.
{{% /note %}}

| Accept | Description |
| :--- | :--- |
| text/plain | Request values as a plain text |

#### Plain Text

Configrd will return a plain text key value pair response body when requesting values as `plain/text`. 

When requesting a json or yaml source file, the variable names/keys will be flattened. Each hierarchy in a json or yaml source file will be separated by a `.` \(period\) and each array will be flattened into an index `key[index]=value`.

**Samples**

{% tabs %}
{% tab title="from json" %}
Render a [default.json file](https://github.com/configrd/configrd-service/blob/master/src/test/resources/env/dev/json/default.json) as plain text

```bash
curl -s -H "Accept: text/plain" http://demo.configrd.io/configrd/v1/env/dev/json/default.json
```

Plain text response

```text
property.3=simple
log.root.level=DEBUG
array.named2.value4.sub=true
array.named[0]=value1
bonus.1.property=bonus2
property.4.name=simple-${property.3.name}
property.1.name=simple
array.named[2]=value3
property.5.name=classpath
property.2.name=value2
array.named[1]=value2
property.6.name=ENC(NvuRfrVnqL8yDunzmutaCa6imIzh6QFL)
array.named2.value6.sub=value
array.named2.value5.sub=5
```
{% endtab %}

{% tab title="from yaml" %}
Render a [default.yaml file](https://github.com/configrd/configrd-service/blob/master/src/test/resources/env/dev/yaml/default.yaml) as plain text

```bash
curl -s -H "Accept: text/plain" http://demo.configrd.io/configrd/v1/env/dev/yaml/default.yaml
```

Plain text response

```text
property.3=simple
log.root.level=DEBUG
array.named2.value4.sub=true
array.named[0]=value1
bonus.1.property=bonus2
property.4.name=simple-${property.3.name}
property.1.name=simple
array.named[2]=value3
property.5.name=classpath
property.2.name=value2
array.named[1]=value2
property.6.name=ENC(NvuRfrVnqL8yDunzmutaCa6imIzh6QFL)
array.named2.value6.sub=value
array.named2.value5.sub=5
```
{% endtab %}
{% endtabs %}






