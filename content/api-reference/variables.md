---
title: Variables
description: API for getting variables from configrd
menu:
  sidebar:
    parent: "api-reference"
    weight: 06
weight: 06
sections_weight: 06
slug:
aliases: [/api-reference/variables/]
---

## Get Variables

{{< path >}}
http://demo.configrd.io/configrd
{{< /path >}}

General endpoint to get variables from configrd. Querying config profiles is done by either specifying the config profile's path as the URL or using the p query parameter to query a named config profile.  
  
Different repositories are queried by specifying the r query parameter. The specified config profile URL or named config profile will then apply to the indicated repository. Omitting a repository name queries the **default** repository if one is defined.  

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="path" type="string" %}
path to config profile
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}

{% api-method-headers %}
{% api-method-parameter name="Accept" type="string" required=true %}
text/plain
{% endapi-method-parameter %}
{% endapi-method-headers %}

{% api-method-query-parameters %}
{% api-method-parameter name="r" type="string" %}
Repository name
{% endapi-method-parameter %}

{% api-method-parameter name="p" type="boolean" %}
Name of config profile defined for the repository
{% endapi-method-parameter %}
{% endapi-method-query-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Variables successfully fetched
{% endapi-method-response-example-description %}

```text
varibale_name=value
...
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=404 %}
{% api-method-response-example-description %}
Query returned no results. Could be result of no variable values being defined at the requested config profile or the repository may not exist.
{% endapi-method-response-example-description %}

```

```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}
