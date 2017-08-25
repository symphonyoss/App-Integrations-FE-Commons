import { registerApplication } from './registerApplication';
import {
  authenticateApp,
  validateTokens,
  validateJwt
} from '../sagas/apiCalls';

/*
* initApp                                   initializes the communication with the Symphony Client
* @params       config                      app settings
* @params       enrichers                   array of Enrichers to be registered in the application
* @return       SYMPHONY.remote.hello       returns a SYMPHONY remote hello service.
*/
export const initApp = (config, enrichers) => {
  let userInfo = {};
  let tokenA = '';

  // create our own service
  SYMPHONY.services.register(`${config.appId}:controller`);

  const authenticateApplication = (podInfo) => {
    return authenticateApp(podInfo.pod);
  }

  const registerAuthenticatedApp = (appTokens) => {
    tokenA = appTokens.data.appToken;

    const appId = config.appId;
    const appData = { appId, tokenA };

    return registerApplication(config, appData, enrichers);
  }

  const validateAppTokens = (symphonyToken) => {
    return validateTokens(tokenA, symphonyToken.tokenS);
  }

  const getJwt = () => {
    const userInfoService = SYMPHONY.services.subscribe('extended-user-info');
    return userInfoService.getJwt();
  }

  const validateJwtToken = (jwt) => {
    userInfo.jwt = jwt;
    return validateJwt(jwt);
  }

  const cacheJwt = (response) => {
    userInfo.userId = response.data;
    // TODO cache JWT
  }

  SYMPHONY.remote.hello()
    .then(authenticateApplication)
    .then(registerAuthenticatedApp)
    .then(validateAppTokens)
    .then(getJwt)
    .then(validateJwtToken)
    .then(cacheJwt)
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