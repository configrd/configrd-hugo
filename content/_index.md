---
title: "Configrd"

blocks:
  - title: "Why Configrd"
    description: |-
      * It automatically keeps your local development environment up to date with environment variable changes
      * It keeps all our environments consistent thanks to configuration inheritance
      * You only have to maintain values that differ between environments
      * Is a common place to secure, manage, version and pull environment variables from across build pipelines, services, environments and even tech stacks
      * Encrypt/decrypt secrets on the fly and keep the rest plaintext for easy access and management
    
      With configrd engineers, devops or infosec can access, manage and secure environmnt variables from anywhere in multiple formats such as key-value, json and yaml.

      Variables can be sourced, secured and stored to and from git, file systems, http/s or AWS S3.

      Configrd deploys on-prem as a micro service alongside your apps and infrastructure to serve configurations on demand.

    url: "/homepage/"

  - title: "For Engineers"
    description: |-
      * Always keep your local development environment up to date
      * Access plaintext values & secrets from the same place and in the same way
      * Quickly and easily switch between config profiles for development, testing or debugging purposes
      * Use all the same tools you already know and love. I.e. store configs to yaml file in git, make updates using VSCode, Vim etc
    url: "/homepage/"

  - title: "For CI/CD Pipelines"
    description: |-
      * Keep environment variables and secrets external to CI/CD tools and platforms
      * Pass more builds thanks to fewer out of date or missing config values
      * Manage, secure and access environment variables in a consistent fashion at development, build, test, deploy and run-time
    url: "/homepage/"

  - title: "For Containers"
    description: |-
      * Build and promote a single reusable image between environments thanks to externalized configurations
      * Pass values via ENV at container start, pull config values via script or directly from application at boot
    url: "/homepage/"

  - title: "For DevOps and InfoSec"
    description: |-
      * Single source of truth for all environment variables and application properties
      * Manage config values in a common but flexible hierarchy across different tech stacks, platforms and tools
      * Fight configuration drift
      * Collaborate with application engineers to keep environment settings up to date
      * Reduce or even eliminate duplicate/redundant configs within and across environments
      * Globally enforce encryption of secrets, manage keys through services such as AWS KMS, store values anywhere (i.e. git) and however (i.e. json) you like
    url: "/homepage/"
   
---
