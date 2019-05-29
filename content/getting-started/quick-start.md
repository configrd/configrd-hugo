---
title: Quick Start
description: Configrd comes with a default configuration to get up and running quickly
lastmod: 2019-05-28
menu:
  sidebar:
    parent: "getting-started"
    weight: 02
weight: 210
sections_weight: 02
tags: ["Tag1", "Tag2", "Tag3"]
tags_weight: 22
slug:
aliases: [/getting-started/quick-start/]
toc: false
---

## Pull & Run

Pull the docker image and start the service and map a volume to `/srv/configrd` on both container and host

{{< inline-code-blocks >}}
docker run -d -p 9191:9191 -v /srv/configrd:/srv/configrd configrd/configrd-service:latest
{{< /inline-code-blocks >}}

A default `configrd.yaml` file will be created at `/srv/configrd` on your local file system. The service will listen to requests on port 9191.


{{< code-yaml file="configrd.yaml" >}}
service:
  defaults:
    fileName: default.properties
  repos:
    default:
      uri: file:/srv/configrd
      sourceName: file
{{< /code-yaml >}}

Now open your favorite browser and navigate to [http://localhost:9191/configrd/v1/](http://localhost:9191/configrd/v1/)