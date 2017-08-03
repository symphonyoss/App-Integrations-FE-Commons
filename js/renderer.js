var _utils = require('./utils.service');
var params = {
  appId: _utils.Utils.getParameterByName('id'),
};

export default class Renderer {
  constructor() {
    this.serviceName = params.appId + ':renderer';
    this.importServices = 'entity';
    this.implements = ['render', 'action'];
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
      template: `<entity>
                  <card>
                    <h3>MyApp first custom renderer</h3>
                    Click to say hello
                    <hr/>
                    <action id="sayhello"/>
                  </card>
                </entity>`,
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
    return result;
  }

  onReady() {
    this.entity = SYMPHONY.services.subscribe('entity');
    this.entity.registerRenderer('com.symphony.integration.jira.event.v2.state', {}, this.serviceName);
  }
}
