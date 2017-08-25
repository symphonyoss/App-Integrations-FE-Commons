import { registerApplication } from './registerApplication';
import { authenticateApp } from '../sagas/apiCalls';

/*
* initApp                                   initializes the communication with the Symphony Client
* @params       config                      app settings
* @params       enrichers                   array of Enrichers to be registered in the application
* @return       SYMPHONY.remote.hello       returns a SYMPHONY remote hello service.
*/
export const initApp = (config, enrichers) => {
  // create our own service
  SYMPHONY.services.register(`${config.appId}:controller`);

  const authenticateApplication = (podInfo) => {
    return authenticateApp(podInfo.pod);
  }

  const registerAuthenticatedApp = (appTokens) => {
    const appId = config.appId;
    const tokenA = appTokens.data.appToken;
    const appData = { appId, tokenA };

    return registerApplication(config, appData, enrichers);
  }

  SYMPHONY.remote.hello()
    .then(authenticateApplication)
    .then(registerAuthenticatedApp)
    .fail(() => {
      console.error(`Fail to register application ${config.appId}`);
    });
};

/*
* initAuthenticatedApp                      initializes the communication with the Symphony Client without authentication
* @params       config                      app settings
* @params       enrichers                   array of Enrichers to be registered in the application
* @return       SYMPHONY.remote.hello       returns a SYMPHONY remote hello service.
*/
export const initUnauthenticatedApp = (config, enrichers) => {
  // create our own service
  SYMPHONY.services.register(`${config.appId}:controller`);

  const registerApp = () => {
    return registerApplication(config, config.appId, enrichers);
  }

  SYMPHONY.remote.hello()
    .then(registerApp)
    .fail(() => {
      console.error(`Fail to register application ${config.appId}`);
    });
};