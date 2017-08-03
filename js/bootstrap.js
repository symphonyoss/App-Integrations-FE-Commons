var _utils = require('./utils.service');
var params = {
  appId: _utils.Utils.getParameterByName('id'),
};

export default class Bootstrap {
  constructor() {
    this.serviceName = params.appId + ':bootstrap';
    this.exportServices = [this.serviceName];
    this.importServices = [];
    this.implements = ['exportService', 'importService', 'getUserId'];
    this.userId = null;
  }

  register() {
    SYMPHONY.services.make(this.serviceName, this, this.implements, true);
  }

  exportService(name) {
    this.exportServices.push(name);
  }

  importService(name) {
    this.importServices.push(name);
  }

  getUserId() {
    return this.userId;
  }

  start() {
    SYMPHONY.remote.hello()
    .then(() => {
      SYMPHONY.application.register(params.appId, this.importServices, this.exportServices).then((response) => {
        this.userId = response.userReferenceId;
        this.fire('ready');
      });
    }).fail((e) => {
      console.log(e);
    });
  }
}
