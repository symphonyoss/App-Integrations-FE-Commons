/*
* initEnrichers                             initialize enrichers
* @params       enrichers                   array of Enrichers to be initialized
*/
export const initEnrichers = (enrichers) => {
  if (enrichers !== undefined) {
    enrichers.forEach((enricher) => {
      enricher.init();
    });
  }
};

/*
* registerEnrichers                         register enrichers on symphony client
* @params       enrichers                   array of Enrichers to be registered in the application
*/
export const registerEnrichers = (enrichers) => {
  if (enrichers !== undefined) {
    enrichers.forEach((enricher) => {
      enricher.register();
    });
  }
};