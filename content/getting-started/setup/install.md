---
title: Install
description: The easiest way to run configrd
menu:
  sidebar:
    parent: "setup"
    weight: 03
weight: 03
sections_weight: 03
slug:
aliases: [/setup/install]
toc: true
---

Docker images are hosted on [Configrd's Docker Hub](https://hub.docker.com/r/configrd/configrd-service).

Running docker as a container requires the following steps:

1. Pull latest docker image from docker hub
2. Tell the service where to find the `configrd.yaml` file with repository definitions
3. Optionally override basic service parameters such as port and log level

## Pull configrd-service

Pull the configrd-service image from docker hub with the latest features

{{< inline-code-blocks >}}
docker pull configrd/configrd-service
{{< /inline-code-blocks >}}

## Start configrd-service

The most basic way to start the service is by allowing configrd to read/write a default configrd.yaml configuration file to the local file system by binding the container's path `/srv/configrd` to a local volume mount. By default, the service listens on port 9191.

{{< inline-code-blocks >}}
docker run -d -p 9191:9191 -v /srv/configrd:/srv/configrd configrd/configrd-service
{{< /inline-code-blocks >}}

You can map the local volume to any location on disk desirable but the path from within the container should remain beginning with `/srv/configrd`.

{{< inline-code-blocks >}}
docker run -d -p 9191:9191 -v /home/myuser/configrd:/srv/configrd configrd/configrd-service
{{< /inline-code-blocks >}}

Checking the `docker logs` for the container you should see output similar to the below

{{< code-plain-js >}}
00:04:38.462 [main] INFO  io... - Configrd starting on port 9191
00:04:38.480 [main] INFO  io... - Starting configrd...
00:04:38.709 [main] INFO  io... - Attempting to load configrd config file from file:/srv/configrd/configrd.yaml using source file
00:04:38.738 [main] INFO  io... - Loaded configrd config file at file:/srv/configrd/configrd.yaml
00:04:38.977 [main] INFO  io... - Application deployed
00:04:38.977 [main] INFO  io... - Configrd started in 0s
{{< /code-plain-js >}}

## Loading configrd.yaml

There are several sources available for loading the configrd.yaml file on container start and all options are passed as ENV parameters to the container on `docker run`. Some ENV parameters options are source specific.

#### File System

Loading the configrd.yaml file from a local or locally mounted file system is the default approach supported.

| ENV | Required | Default | Description |
| :--- | :---: | :--- | :--- |
| SOURCENAME | Yes | file | Use the "file" source to load the configrd.yaml from the file system |
| CONFIG\_URI | Yes | file:/srv/configrd/configrd.yaml | Absolute path to the configrd.yaml file on the file system. Must start with "file:/srv/configrd/..." |

To load the configrd service configuration from a file named different than configrd.yaml, simply specify the file name in the CONFIG\_URI ENV parameter.

{{< inline-code-blocks >}}
docker run -d -p 9191:9191 -e SOURCENAME=file -e CONFIG_URI=file:/srv/configrd/myconfig.yaml -v /home/myuser/configrd:/srv/configrd configrd/configrd-service
{{< /inline-code-blocks >}}

#### HTTP/S

The configrd.yaml file can be loaded over http/s including endpoints protected by HTTP Basic Authentication with self signed certificates.

| ENV | Required | Default | Description |
| :--- | :--- | :--- | :--- |
| SOURCENAME | Yes |  | Use the "http" source to load configrd.yaml from a http/s location |
| CONFIG\_URI | Yes |  | Absolute path to the configrd.yaml file over http/s. Must start with http:// or https://. |
| TRUSTCERT | No | false | Flag to trust the TLS certificate of the http/s source |
| USER | No |  | Username used for the authorization header with Basic Auth |
| SECRET | No |  | Password used for the authorization header with Basic Auth |

{{< inline-code-blocks >}}
docker run -d -p 9191:9191 -e SOURCENAME=http -e CONFIG_URI=https://myservice.com/configrd/configrd.yaml configrd/configrd-service
{{< /inline-code-blocks >}}

#### AWS S3

AWS S3 block storage is supported as a source. Assuming you are not using a public s3 bucket, configrd can authenticate using static AWS credentials if connecting to an S3 bucket from outside of AWS. 

Configrd instances deployed to AWS services such as EC2, ECS, EKS, LightSail or Elastic Beanstalk can take advantage of the AWS environment's security context.

| ENV | Required | Default | Description |
| :--- | :--- | :--- | :--- |
| SOURCENAME | Yes |  | Use the "s3" source to load configrd.yaml from an s3 bucket |
| CONFIG\_URI | Yes |  | Absolute path to the configrd.yaml file in s3. Only the http/s transport protocol is supported. No s3://. |
| AWS\_ACCESS\_KEY\_ID | No |  | Static AWS credentials to authenticate against s3 bucket. Not required when running from within AWS using roles or security groups |
| AWS\_SECRET\_ACCESS\_KEY | No |  | Static AWS credentials to authenticate against s3 bucket. Not required when running from within AWS using roles or security groups |

{{< inline-code-blocks >}}
docker run -d -p 9191:9191 -e SOURCENAME=s3 -e CONFIG_URI=https://s3.amazonaws.com/mybucket/configrd.yaml configrd/configrd-service
{{< /inline-code-blocks >}}

#### Git, GitHub, AWS CodeCommit

Configrd has been tested with several git repository providers for sourcing the configrd.yaml file from a versioned repository. 

The service supports the most populate authentication methods including static credentials, temporary tokens, ssh private keys and static AWS credentials as well as static AWS git credentials. 

The git repository will be cloned into `/srv/configrd/init` on the container at startup and the configrd.yaml loaded from the local file system. The git repository is only pulled at service start. If you do not bind the `/srv/configrd` container path to a volume mount the files will only live inside the container.

{{% note %}}
AWS roles are not yet supported as an authentication mechanism. AWS does not recommend using IAM credentials or the EC2 security context for CodeCommit authentication since credentials expire.
{{% /note %}}

| ENV | Required | Default | Description |
| :--- | :--- | :--- | :--- |
| SOURCENAME | Yes |  | Use the "git" source to load configrd.yaml from a git repository |
| CONFIG\_URI | Yes |  | Absolute path to the git repository where the configrd.yaml file exists at the root. Ssh, git and https are all supported protocols. |
| AUTH\_METHOD | Yes |  | One of CodeCommitGitCreds, CodeCommitIAMUser, GitHub, GitHubToken, SshPubKey |
| CONFIG\_FILE | No | configrd.yaml | Name of configrd.yaml file in git repo at root |
| USER | No |  | Username, AWS static or AWS git access key |
| SECRET | No |  | Password, AWS static or AWS git secret |
| TOKEN | No |  | GitHub token authentication |
| PK | No |  | Absolute path to ssh **private** key for GitHub ssh or AWS private key authentication |

Sample `docker run` with GitHub username and secret

{{< inline-code-blocks >}}
docker run -d -p 9191:9191 -e AUTH_METHOD=GitHub -e SOURCENAME=git -e CONFIG_URI=git@github.com:myorg/myrepo.git -e USER=$GITHUB_USER -e SECRET=$GITHUB_SECRET configrd/configrd-service
{{< /inline-code-blocks >}}

Sample `docker run` with GitHub SSH public key authentication

{{< inline-code-blocks >}}
docker run -d -p 9191:9191 -e AUTH_METHOD=SshPubKey -e PK=~/.ssh/rsa_id -e SOURCENAME=git -e CONFIG_URI=git@github.com:myorg/myrepo.git configrd/configrd-service
{{< /inline-code-blocks >}}

Sample `docker run` with GtiHub token authentication

{{< inline-code-blocks >}}
docker run -d -p 9191:9191 -e AUTH_METHOD=GitHubToken -e TOKEN=$GITHUB_TOKEN -e SOURCENAME=git -e CONFIG_URI=git@github.com:myorg/myrepo.git configrd/configrd-service
{{< /inline-code-blocks >}}

Sample `docker run` with AWS CodeCommit git credentials

{{< inline-code-blocks >}}
docker run -d -p 9191:9191 -e AUTH_METHOD=CodeCommitGitCreds -e SOURCENAME=git -e CONFIG_URI=git@github.com:myorg/myrepo.git -e USER=$GIT_USER -e SECRET=$GIT_SECRET configrd/configrd-service
{{< /inline-code-blocks >}}

Sample `docker run` with AWS CodeCommit ssh public key authentication and ssh protocol. 

{{% note %}}
Note the AWS git ssh key id must be provided as the username of the ssh URI to the repository.
{{% /note %}}

{{< inline-code-blocks >}}
docker run -d -p 9191:9191 -e AUTH_METHOD=SshPubKey -e PK=~/.ssh/rsa_id -e SOURCENAME=git -e CONFIG_URI=ssh://my-aws-ssh-key-id@git-codecommit.us-west-2.amazonaws.com/v1/repos/myrepo configrd/configrd-service
{{< /inline-code-blocks >}}

