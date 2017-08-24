import { registerApplication } from './registerApplication';
import { authenticateApp } from '../sagas/apiCalls';

/*
* bootstrap                                 initializes the communication with the Symphony Client
* @params       config                      app settings
* @params       enrichers                   array of Enrichers to be registered in the application
* @return       SYMPHONY.remote.hello       returns a SYMPHONY remote hello service.
*/
export const bootstrap = (config, enrichers) => {
  const controllerName = `${config.appId}:controller`;

  // create our own service
  const controllerService = SYMPHONY.services.register(controllerName);

  function authenticateApplication(podInfo) {
    return authenticateApp(podInfo.pod);
  }

  function registerAuthenticatedApp(appTokens) {
    const appId = config.appId;
    const tokenA = appTokens.data.appToken;
    const appData = { appId, tokenA };

    return registerApplication(config, appData, enrichers);
  }

  function registerApp() {
    return registerApplication(config, config.appId, enrichers);
  }

  if (config.requiresAuth === true) {
    SYMPHONY.remote.hello()
      .then(authenticateApplication)
      .then(registerAuthenticatedApp)
      .fail(() => {
        console.error(`Fail to register application ${config.appId}`);
      });
  } else {
    SYMPHONY.remote.hello()
      .then(registerApp)
      .fail(() => {
        console.error(`Fail to register application ${config.appId}`);
      });
  }
};