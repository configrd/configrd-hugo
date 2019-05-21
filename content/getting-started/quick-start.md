---
title: Quick Start
description: Configrd comes with a default configuration to get up and running quickly
menu:
  sidebar:
    parent: "getting-started"
    weight: 02
weight: 02
sections_weight: 02
slug:
aliases: [/getting-started/quick-start/]
---

## Pull & Run

Pull the docker image and start the service and map a volume to `/srv/configrd` on both container and host

```bash
docker run -d -p 9191:9191 -v /srv/configrd:/srv/configrd configrd/configrd-service:latest
```

A default `configrd.yaml` file will be created at `/srv/configrd` on your local file system. The service will listen to requests on port 9191.

```
service:
  defaults:
    fileName: default.properties
  repos:
    default:
      uri: file:/srv/configrd
      sourceName: file
```

Now open your favorite browser and navigate to [http://localhost:9191/configrd/v1/](http://localhost:9191/configrd/v1/)