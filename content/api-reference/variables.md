---
title: Variables
description: API for getting variables from configrd
lastmod: 2019-05-28
menu:
  sidebar:
    parent: "api-reference"
    weight: 06
weight: 160
tags: ["Tag1", "Tag2", "Tag3"]
tags_weight: 22
aliases: [/api-reference/variables/]
---

{{< badge >}}
Get Variables
{{< /badge >}}

{{< path >}}
http://demo.configrd.io/configrd
{{< /path >}}

General endpoint to get variables from configrd. Querying config profiles is done by either specifying the config profile's path as the URL or using the p query parameter to query a named config profile.  
  
Different repositories are queried by specifying the r query parameter. The specified config profile URL or named config profile will then apply to the indicated repository. Omitting a repository name queries the **default** repository if one is defined.  

{{< tabs >}}
  {{% tab "Request" %}}
    {{% api-method heading="Path Parameters" %}}
      {{% api-method-headers-parameter heading="Path Parameters" %}}
        {{% api-method-parameter name="path" type="string" optional="Optional" %}}path to config profile
        {{% /api-method-parameter %}}
      {{% /api-method-headers-parameter %}}

      {{% api-method-headers-parameter heading="Headers" %}}
        {{% api-method-parameter name="Accept" type="string" required="Required" %}}text/plain
        {{% /api-method-parameter %}}
      {{% /api-method-headers-parameter %}}

      {{% api-method-headers-parameter heading="Query Parameters" %}}	
        {{% api-method-parameter name="r" type="string" optional="Optional" %}}Repository name
        {{% /api-method-parameter %}}
        {{% api-method-parameter name="p" type="boolean" optional="Optional" %}}Name of config profile defined for the repository
        {{% /api-method-parameter %}}
      {{% /api-method-headers-parameter %}}

    {{% /api-method %}}
  {{% /tab %}}

  {{% tab "Responce" %}}
    {{% api-method %}}
      {{% api-method-headers-response name="success" title="200: OK" %}}
      {{% /api-method-headers-response %}}

Variables successfully fetched

      {{% code-plain lang"yaml" %}}
      varibale_name=value
      `...`
      {{% /code-plain %}}

      {{% api-method-headers-response name="fail" title="404: Not Found" %}}
      {{% /api-method-headers-response %}}

Query returned no results. Could be result of no variable values being defined at the requested config profile or the repository may not exist.

      {{% code-plain lang="yaml" %}}

      

      {{% /code-plain %}}

    {{% /api-method %}}
  {{% /tab %}}

{{< /tabs >}}
