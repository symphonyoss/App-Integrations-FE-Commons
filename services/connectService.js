/* eslint-disable no-unused-vars */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import factory from '../js/config.service';
import configureStore from '../store/configureStore';

const dependencies = [
  'ui',
  'extended-user-service',
  'extended-user-info',
  'modules',
  'applications-nav',
  'account',
  'stream-service',
  'integration-config',
  'entity',
  'dialogs'
];

/*
* connect         connects the application on symphony client
* @param          SYMPHONY          Global SYMPHONY object (Required)
* @param          config            custom parameters for each integration. (Required)
* @param          Routes            default, or custom, routes file (Required)
* @param          elem              HTML DOM element where to render the configurator (Required)
* @param          Instructions      react dom for custom setup instructions (Optional)
*/
export const connect = (SYMPHONY, config, Routes, elem, Instructions) => {
  function loadApplication() {
    factory.setParams(config);
    factory.setInstructions(Instructions);

    const store = configureStore();

    render(
      <Provider store={store}>
        <Routes />
      </Provider>,
      elem
    );
  }

  let themeColor, themeSize;

  function connectApplication() {
    const uiService = SYMPHONY.services.subscribe('ui');
    loadApplication();
    // UI: Listen for theme change events
    uiService.listen('themeChangeV2', () => {
      SYMPHONY.remote.hello().then((resp) => {
        themeColor = resp.themeV2.name;
        themeSize = resp.themeV2.size;
        document.body.className = `symphony-external-app ${themeColor} ${themeSize}`;
      });
    });
  }

  function helloApplication(data) {
    themeColor = data.themeV2.name;
    themeSize = data.themeV2.size;

    // You must add the symphony-external-app class to the body element
    document.body.className = `symphony-external-app ${themeColor} ${themeSize}`;

    SYMPHONY.application.connect(
      config.appId,
      dependencies,
      [`${config.appId}:app`]
    ).then(connectApplication);
  }
  return SYMPHONY.remote.hello().then(helloApplication);
};