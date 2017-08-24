import { Utils } from '../js/utils.service';
import { initEnrichers, registerEnrichers } from './registerEnricher';

const dependencies = [
  'ui',
  'extended-user-service',
  'modules',
  'applications-nav',
  'account',
  'stream-service',
  'integration-config',
  'entity',
  'dialogs'
];

const params = {
   configurationId: Utils.getParameterByName('configurationId'),
   botUserId: Utils.getParameterByName('botUserId'),
   host: `${window.location.protocol}//${window.location.hostname}:${window.location.port}`
};

/*
* registerApplication                       register application on symphony client
* @params       SYMPHONY                    global variable SYMPHONY returned from SYMPHONY api
* @params       config                      app settings
* @params       enrichers                   array of Enrichers to be registered in the application
* @return       SYMPHONY.remote.hello       returns a SYMPHONY remote hello service.
*/
export const registerApplication = (SYMPHONY, config, enrichers) => {
  const controllerName = `${config.appId}:controller`;

  let exportedDependencies = enrichers ? enrichers.map((enricher) => enricher.name) : [];
  exportedDependencies.push(controllerName);

  // create our own service
  const controllerService = SYMPHONY.services.register(controllerName);

  function registerApplication() {
    registerEnrichers(enrichers);

    // system services
    const uiService = SYMPHONY.services.subscribe('ui');
    const modulesService = SYMPHONY.services.subscribe('modules');

    uiService.registerExtension(
      'app-settings',
      config.appId,
      controllerName,
      { label: 'Configure' }
    );

    controllerService.implement({
      trigger() {
        const url = [
          `${params.host}/${config.appContext}/app.html`,
          `?configurationId=${params.configurationId}`,
          `&botUserId=${params.botUserId}`,
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

  function helloController(data) {
    initEnrichers(enrichers);

    SYMPHONY.application.register(
      config.appId,
      dependencies,
      exportedDependencies
    ).then(registerApplication);
  }

  return SYMPHONY.remote.hello().then(helloController);
};