export default class Bootstrap {
  constructor() {
    this.serviceName = 'sampleMyApp:bootstrap';
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
      window.alert(this.importServices);
      SYMPHONY.application.register('sampleMyApp', this.importServices, this.exportServices).then((response) => {
        this.userId = response.userReferenceId;
        this.fire('ready');
      });
    }).fail((e) => {
      console.log(e);
    });
  }
}
