import { Utils } from '../js/utils.service';
import { initEnrichers, registerEnrichers } from './registerEnricher';

const dependencies = [
  'ui',
  'extended-user-info',
  'modules',
  'entity',
  'dialogs',
];

const params = {
   configurationId: Utils.getParameterByName('configurationId'),
   botUserId: Utils.getParameterByName('botUserId'),
   host: `${window.location.protocol}//${window.location.hostname}:${window.location.port}`
};

const registerExtension = (config) => {
  const controllerName = `${config.appId}:controller`;
  const uiService = SYMPHONY.services.subscribe('ui');

  uiService.registerExtension(
    'app-settings',
    config.appId,
    controllerName,
    { label: 'Configure' }
  );
}

const registerModule = (config) => {
  const controllerName = `${config.appId}:controller`;
  const controllerService = SYMPHONY.services.subscribe(controllerName);
  const modulesService = SYMPHONY.services.subscribe('modules');

  controllerService.implement({
    trigger() {
      const url = [
        `${params.host}/${config.appContext}/app.html`,
        `?configurationId=${params.configurationId}`,
        `&botUserId=${params.botUserId}`,
        `&id=${config.appId}`,
      ];

      // invoke the module service to show our own application in the grid
      modulesService.show(
        config.appId,
        { title: config.appTitle },
        controllerName,
        url.join(''),
        { canFloat: true },
      );
    },
  });
}

/*
* registerApplication                       register application on symphony client
* @params       config                      app settings
* @params       enrichers                   array of Enrichers to be registered in the application
* @return       SYMPHONY.remote.hello       returns a SYMPHONY remote hello service.
*/
export const registerApplication = (config, appData, enrichers) => {
  const controllerName = `${config.appId}:controller`;
  
  let exportedDependencies = initEnrichers(enrichers);
  exportedDependencies.push(controllerName);

  const register = (data) => {
    registerEnrichers(enrichers);
    registerExtension(config);
    registerModule(config);

    return data;
  }

  return SYMPHONY.application.register(
          appData, 
          dependencies, 
          exportedDependencies
        ).then(register);
};