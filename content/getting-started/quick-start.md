---
title: Quick Start
description: Configrd comes with a default configuration to get up and running quickly
lastmod: 2019-05-28
menu:
  sidebar:
    parent: "getting-started"
    weight: 02
weight: 210
aliases: ["/quick-start"]
toc: false
---

## Pull & Run

Pull the docker image and start the service and map a volume to `/srv/configrd` on both container and host

{{< code lang="docker" line-numbers="false" >}}
docker run -d -p 9191:9191 -v /srv/configrd:/srv/configrd configrd/configrd-service:latest
{{< /code >}}

A default `configrd.yaml` file will be created at `/srv/configrd` on your local file system. The service will listen to requests on port 9191.


{{< code file="configrd.yaml" lang="yaml" >}}
service:
  defaults:
    fileName: default.properties
  repos:
    default:
      uri: file:/srv/configrd
      sourceName: file
{{< /code >}}

Now open your favorite browser and navigate to [http://localhost:9191/configrd/v1/](http://localhost:9191/configrd/v1/)