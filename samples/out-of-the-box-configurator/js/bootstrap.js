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
    window.alert('registrei:');
  }

  exportService(name) {
    this.exportServices.push(name);
    window.alert('exportService:');
  }

  importService(name) {
    this.importServices.push(name);
    window.alert('importtService:');
  }

  getUserId() {
    return this.userId;
  }

  start() {
    SYMPHONY.remote.hello()
    .then(() => {
      window.alert('a', this.importServices);
      SYMPHONY.application.register('sampleMyApp', this.importServices, this.exportServices).then((response) => {
        this.userId = response.userReferenceId;
        this.fire('ready');
      });
    }).fail((e) => {
      console.log(e);
    });
  }
}
