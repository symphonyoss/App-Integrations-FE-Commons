import 'babel-polyfill';
import React from 'react';
import { register } from 'symphony-integration-commons';
import Bootstrap from './bootstrap';
import RendererContainer from './RendererContainer';
import config from './config.service';


var _utils = require('./utils.service');
var params = {
  appId: _utils.Utils.getParameterByName('id'),
};

export default class RendererStarterAPI {
  constructor() {
    this.serviceName = params.appId + ':renderer';
    this.importServices = 'entity';
    this.implements = ['render', 'action'];
  }

  start() {
        const bootstrap = new Bootstrap();
        bootstrap.register();
        this.register();
        bootstrap.start();
  }

  register() {
    SYMPHONY.services.make(this.serviceName, this, this.implements, true);
    this.bootstrap = SYMPHONY.services.subscribe(params.appId + ':bootstrap');

    this.bootstrap.importService(this.importServices);
    this.bootstrap.exportService(this.serviceName);

    this.bootstrap.listen('ready', this.onReady.bind(this));
  }

  action(data) {
    window.alert(`Hello ${data.user}`);
  }

  render() {
    const result = {
      template: <RendererContainer/>,
      data: {
        // type: entityData.mealType.toLowerCase(),
        // venue: entityData.venue,
        card: {
          icon: 'https://alexandre.symphony.com:4000/img/appstore-logo.png',
          accent: 'tempo-bg-color--green',
        },
        icon: 'https://alexandre.symphony.com:4000/img/appstore-logo.png',
        accent: 'tempo-bg-color--green',
        sayhello: {
          icon: 'https://alexandre.symphony.com:4000/img/appstore-logo.png',
          label: '',
          service: this.serviceName,
          data: {
            user: this.bootstrap.getUserId(),
          },
        },
      },
    };
    console.log('It\'s me');
    return result;
  }

  onReady() {
    this.entity = SYMPHONY.services.subscribe('entity');
    this.entity.registerRenderer('com.symphony.integration.jira.event.v2.state', {}, this.serviceName);
  }
}