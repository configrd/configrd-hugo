---
title: Code Blocks
description: Code Blocks Templates and Shortcodes Experiment
lastmod: 2019-05-27
menu:
  sidebar:
    parent: "setup"
    weight: 03
    identifier: "code"
weight: 190
toc: true
draft: true
---

## inline-code-blocks.html

{{< inline-code-blocks lang="docker" >}}
docker pull configrd/configrd-service
{{< /inline-code-blocks >}}

{{< code lang="docker" line-numbers="false" >}}
docker pull configrd/configrd-service
{{< /code >}}


## code-plain.html lang="js"

{{< code-plain lang="js" >}}
00:04:38.462 [main] INFO  io... - Configrd starting on port 9191
00:04:38.480 [main] INFO  io... - Starting configrd...
00:04:38.709 [main] INFO  io... - Attempting to load configrd config file from file:/srv/configrd/configrd.yaml using source file
00:04:38.738 [main] INFO  io... - Loaded configrd config file at file:/srv/configrd/configrd.yaml
00:04:38.977 [main] INFO  io... - Application deployed
00:04:38.977 [main] INFO  io... - Configrd started in 0s
{{< /code-plain >}}

{{< code lang="js" >}}
00:04:38.462 [main] INFO  io... - Configrd starting on port 9191
00:04:38.480 [main] INFO  io... - Starting configrd...
00:04:38.709 [main] INFO  io... - Attempting to load configrd config file from file:/srv/configrd/configrd.yaml using source file
00:04:38.738 [main] INFO  io... - Loaded configrd config file at file:/srv/configrd/configrd.yaml
00:04:38.977 [main] INFO  io... - Application deployed
00:04:38.977 [main] INFO  io... - Configrd started in 0s
{{< /code >}}


## code-plain.html lang="markup"


{{< code-plain lang="markup" >}}
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
{{< /code-plain >}}


{{< code lang="markup" >}}
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
{{< /code >}}

## code.html lang="yaml" file="configrd.yaml"

{{< code-old lang="yaml" file="configrd.yaml">}}
repos:
  default:
      uri: https://config.appcrossings.net.s3.amazonaws.com/apps
      named:
        dev: env/dev/myapp
        stage: env/stage/myapp
        prod: env/prod/myapp
{{< /code-old >}}

{{< code lang="yaml" file="configrd.yaml">}}
repos:
  default:
      uri: https://config.appcrossings.net.s3.amazonaws.com/apps
      named:
        dev: env/dev/myapp
        stage: env/stage/myapp
        prod: env/prod/myapp
{{< /code >}}

{{< code lang="html" file="configrd.yaml">}}
  <h1>hi</h1>
  <div>hello</div>
{{< /code >}}



## code.html file="default.properties" lang="yaml"


{{< code-old file="default.properties" lang="yaml" >}}
app.url = https://dev.myservice.com/
support.email = support@myservice.com
{{< /code-old >}}

{{< code file="default.properties" lang="yaml" >}}
app.url = https://dev.myservice.com/
support.email = support@myservice.com
{{< /code >}}



## code-yaml-no-num file="default.properties"


{{< code-yaml-no-num file="default.properties" >}}
app.url = http://localhost:8080/
{{< /code-yaml-no-num >}}