[![Build Status](https://travis-ci.org/symphonyoss/App-Integrations-FE-Commons.svg?branch=dev)](https://travis-ci.org/symphonyoss/App-Integrations-FE-Commons)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![bitHound Overall Score](https://www.bithound.io/github/symphonyoss/App-Integrations-FE-Commons/badges/score.svg)](https://www.bithound.io/github/symphonyoss/App-Integrations-FE-Commons)
[![bitHound Dependencies](https://www.bithound.io/github/symphonyoss/App-Integrations-FE-Commons/badges/dependencies.svg)](https://www.bithound.io/github/symphonyoss/App-Integrations-FE-Commons/dev/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/symphonyoss/App-Integrations-FE-Commons/badges/devDependencies.svg)](https://www.bithound.io/github/symphonyoss/App-Integrations-FE-Commons/dev/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/symphonyoss/App-Integrations-FE-Commons/badges/code.svg)](https://www.bithound.io/github/symphonyoss/App-Integrations-FE-Commons)

# Integrations Front-End Commons Documentation

This document provides a brief overview of "Integration Front-End Commons" components and how to build and publish them.

# Overview

Integration FE Commons provides the common components required to build a webhook configurator application for a Symphony Integration. It provides commonly used components to build configurator apps, such as room search, webhook creation, webhook editing etc. It also provides the complete Configurator App workflow for viewing, creating, editing and deleting webhooks.

# Installation instructions for the Javasctipt developer

## What you’ll build
You’ll build the Javascript library that provides some useful services to build new configurator apps for integrations.

## What you’ll need
* Nodejs 6.10
* NPM node-license-validator
* NPM semantic-release

## Build with NPM
To start from scratch, do the following:

1. Clone the source repository using Git: `git clone git@github.com:symphonyoss/App-Integrations-FE-Commons.git`
2. cd into _App-Integrations-FE-Commons_
3. Build using npm: `npm install`

## Publishing
The "Integration Front-End Commons" library is published on npm registry via Travis. In order to publish your changes, submit a Github Pull Request to the "dev" branch bumping the version at [package.json](package.json), and the changes will be publish at https://www.npmjs.com/package/symphony-integration-commons.

## Samples
To understand how to use the componentes provided by the "Integration Front-End Commons", check the following samples: [posting-location-sample](samples/posting-location-sample/README.md) and [out-of-the-box-configurator](samples/out-of-the-box-configurator).

## Contributing

1. Fork it (<https://github.com/symphonyoss/App-Integrations-FE-Commons/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Read our [contribution guidelines](.github/CONTRIBUTING.md) and [Community Code of Conduct](https://www.finos.org/code-of-conduct)
4. Commit your changes (`git commit -am 'Add some fooBar'`)
5. Push to the branch (`git push origin feature/fooBar`)
6. Create a new Pull Request

## License

The code in this repository is distributed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0).

Copyright 2016-2019 Symphony LLC