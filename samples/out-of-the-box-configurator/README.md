[![Symphony Software Foundation - Incubating](https://cdn.rawgit.com/symphonyoss/contrib-toolbox/master/images/ssf-badge-incubating.svg)](https://symphonyoss.atlassian.net/wiki/display/FM/Incubating) [![Build Status](https://travis-ci.org/symphonyoss/App-Integrations-FE-Commons.svg?branch=dev)](https://travis-ci.org/symphonyoss/App-Integrations-FE-Commons) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

# Out of the box Configurator
This document provides information about how to use the default configurator.

## About this sample
This sample allows you to instantiate a brand new configurator that import components from [symphony-integration-commons][commons] npm repository. With this version you don't need to do anything, except customize the `js/config.service.js` file.
This default configurator allow you to:
* create, edit and/or remove an instance
* choose between create a _chat one on one_ or a _chat rooms_
* generate a webhook url automatically
* shows a table of created instances

## Requirements
In order to run the configurator sample you'll need [Node 6.10.x][node] and [npm][npm] installed.

## Instructions for JavaScript developers 
1. Clone or download the `samples/out-of-the-box-configurator` folder
2. In the `out-of-the-box-configurator` folder root run `npm install`
3. After install the dependencies run `npm run watch`

The samples folder is set up with a development environment built up with [webpack][webpack] and [eslint][eslint]. Every time you change a file and save it, eslint checks your code sintaxe and webpack reloads your browser. This sample is buit up with React and some imported components from this repo.

This sample uses all available components for symphony-integration-commons. These are the available components:

1. ConfigureNew
2. InputDescription
3. InputDescriptionInfo
4. IntegrationHeader
5. MessageBox
6. PostingLocation
7. PostingLocationInfo
8. SetupInstructions
9. Spinner
10. SubmitConfirmation
11. SubmitInstance
12. TableInstance
13. WebHookURLCopy

### Running the sample locally from bundle.json
This sample is deliverid with a *bundle.json* file. This file allows you to run the app directly from your symphony pod. In order to run the app with the bundle.json file you should follow these steps:
1. Add the alias `127.0.0.1         localhost.symphony.com` to your `/etc/hosts` file.
2. run the app with `npm run watch` command
3. Visit `https://localhost.symphony.com/bundle.json` in your browser and accept the certificate.
4. Visit your symphony pod, and, in the address bar, paste the following at the end of the url:  `?bundle=https://localhost.symphony.com/bundle.json`. 
5. Reload the page and you'll see a modal window asking you to allow the appliction to run. Check the _I have verified the app configurations_ checkbox. 
6. Find your application in the _Symphony market_ on your pod, click _Add_, and then, _Configure_.

[commons]: https://www.npmjs.com/package/symphony-integration-commons
[eslint]: http://eslint.org/
[node]: https://nodejs.org/en/
[npm]: https://www.npmjs.com/
[react]: https://facebook.github.io/react/
[redux]: http://redux.js.org/
[webpack]: https://webpack.github.io/
