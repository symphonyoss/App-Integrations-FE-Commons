[![Symphony Software Foundation - Incubating](https://cdn.rawgit.com/symphonyoss/contrib-toolbox/master/images/ssf-badge-incubating.svg)](https://symphonyoss.atlassian.net/wiki/display/FM/Incubating) [![Build Status](https://travis-ci.org/symphonyoss/App-Integrations-FE-Commons.svg?branch=dev)](https://travis-ci.org/symphonyoss/App-Integrations-FE-Commons) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

# Posting Location Sample
This document provides information about how to use this sample integration.

## About this sample
This sample shows how to import __components__ from [symphony-integration-commons][commons] npm repository. Basically, these components allows you to execute several automated operations such as: 
* create, edit and/or remove an instance
* choose between create a _chat one on one_ or a _chat rooms_
* generate a webhook url automatically
* shows a table of created instances

There are also many other features available throught components. These components are built up with [React][react] framework altogether [Redux][redux] architecture pattern. At any moment you can clone the [symphony-integration-commons][commons] repo and create your own components for our own needs.

## What you’ll build
You'll build an integration sample where you can create instances that notifies you whenever a webhook is triggered.

## Requirements
In order to run the configurator sample you'll need [Node 6.10.x][node] and [npm][npm] installed.

## Instructions for Javascript Developers 
1. Clone or download the App-Integrations-FE-Commons repository
2. In the posting-location-sample folder root run `npm install`
3. After installing the dependencies run `npm run watch`

The samples folder is set up with multiple development samples built up with [webpack][webpack] and [eslint][eslint]. Every time you change a file and save it, eslint checks your code sintaxe and webpack bundles it automatically. This sample is buit up with React and some imported components from this repo.

For The components used in the posting-location-sample are:
1. TableInstance - shows a list of configured instances, as well as two action buttons (remove and edit).
2. WebHookURL - shows a configured webhook url where you can copy and configure your integration.
3. InputDescription - shows an input text where you can name, or edit your instance's name.
4. PostingLocation - This is a complex component where you can choose between two types of webhook instances. You can set a _Instant Message_ instance, or choose _one or more rooms_ (you should be owner), to be notified by the webhook.
5. SubmitInstance - This is an automated buttons tool that allows you to create, edit or remove configured instances.

### Running the sample locally from bundle.json
This sample is deliverid with a *bundle.json* file. This file allows you to run the app directly from your symphony pod. In order to run the app with the bundle.json file you should follow these steps:
<<<<<<< Updated upstream
1. Add the alias `127.0.0.1         localhost` to your `/etc/hosts` file.
2. Change directory to the `samples` folder
=======
1. Add the alias `127.0.0.1 localhost` to your `/etc/hosts` file.
2. Change directory to the `samples/posting-location-sample` folder
>>>>>>> Stashed changes
3. Install packages with `npm install`
4. Run the app with `npm run watch` command
5. Visit `https://localhost:4000/bundle.json` in your browser and accept the certificate.
6. Visit your symphony pod, and, in the address bar, paste the following at the end of the url:  `?bundle=https://localhost:4000/bundle.json`. 
7. Reload the page and you'll see an modal window asking you to allow the appliction to run. Check the _I have verified the app configurations_ checkbox. 
8. Find your application in the _Symphony market_ on your pod, click _Add_, and then, _Configure_.

[commons]: https://www.npmjs.com/package/symphony-integration-commons
[eslint]: http://eslint.org/
[node]: https://nodejs.org/en/
[npm]: https://www.npmjs.com/
[react]: https://facebook.github.io/react/
[redux]: http://redux.js.org/
[webpack]: https://webpack.github.io/
