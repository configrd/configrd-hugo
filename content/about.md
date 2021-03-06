---
title: About
description: Sync configurations such as environment variables, application properties and secrets across build pipelines, services and environments.
lastmod: 2019-05-29
layout: "single"
menu:
  sidebar:
    weight: 01
weight: 220
toc: true
isHome: true
---

## Why Configrd

* It automatically keeps your local development environment up to date with environment variable changes
* It keeps all our environments consistent thanks to configuration inheritance
* You only have to maintain values that differ between environments
* Is a common place to secure, manage, version and pull environment variables from across build pipelines, services, environments and even tech stacks
* Encrypt/decrypt secrets on the fly and keep the rest plaintext for easy access and management

With **configrd** engineers, devops or infosec can access, manage and secure environmnt variables from anywhere in multiple formats such as key-value, json and yaml. 

Variables can be sourced, secured and stored to and from git, file systems, http/s or AWS S3.

Configrd deploys on-prem as a micro service alongside your apps and infrastructure to serve configurations on demand.

<!-- Begin Mailchimp Signup Form -->
<link href="//cdn-images.mailchimp.com/embedcode/horizontal-slim-10_7.css" rel="stylesheet" type="text/css">
<style type="text/css">
	#mc_embed_signup{background:#fff; clear:left; font:14px Helvetica,Arial,sans-serif; width:100%;}
</style>
<div id="mc_embed_signup">
<form action="https://configrd.us18.list-manage.com/subscribe/post?u=0ae6d7f5d78e34cb13fe46132&amp;id=86c0f57fc0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
    <div id="mc_embed_signup_scroll">
	<label for="mce-EMAIL">Interested in a hosted Configrd SaaS?</label>
	<input type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" placeholder="email address" required>
    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
    <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_0ae6d7f5d78e34cb13fe46132_86c0f57fc0" tabindex="-1" value=""></div>
    <div class="clear"><input type="submit" value="Yes please!" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
    </div>
</form>
</div>
<!--End mc_embed_signup-->

### For Engineers

* Always keep your local development environment up to date
* Access plaintext values & secrets from the same place and in the same way
* Quickly and easily switch between config profiles for development, testing or debugging purposes
* Use all the same tools you already know and love. I.e. store configs to yaml file in git, make updates using VSCode, Vim etc

### For CI/CD Pipelines

* Keep environment variables and secrets external to CI/CD tools and platforms
* Pass more builds thanks to fewer out of date or missing config values
* Manage, secure and access environment variables in a consistent fashion at development, build, test, deploy and run-time

### For Containers

* Build and promote a single reusable image between environments thanks to externalized configurations
* Pass values via ENV at container start, pull config values via script or directly from application at boot

### For DevOps and InfoSec

* Single source of truth for all environment variables and application properties
* Manage config values in a common but flexible hierarchy across different tech stacks, platforms and tools
* Fight configuration drift
* Collaborate with application engineers to keep environment settings up to date
* Reduce or even eliminate duplicate/redundant configs within and across environments
* Globally enforce encryption of secrets, manage keys through services such as AWS KMS, store values anywhere (i.e. git) and however (i.e. json) you like