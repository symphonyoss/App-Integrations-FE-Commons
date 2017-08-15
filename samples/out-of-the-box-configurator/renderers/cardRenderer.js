import { RendererBase } from 'symphony-integration-commons';

const name = 'card-renderer';
const messageEvents = ['com.symphony.integration.jira.event.v2.state'];
export default class CardRenderer extends RendererBase {
  constructor() {
    super(name, messageEvents);
  }

  render(type, entityData) {
    console.log('Renderer called!');
    const result = {
      template: `
        <entity>
          <card>
          <div className='setup-instructions-content'>
              Hello
          </div>
          <h3>MyApp first custom renderer</h3>
          Click to say hello
          <hr/>
          <action id="sayhello"/>
          </card>
        </entity>
        `,
      data: {
        // type: entityData.mealType.toLowerCase(),
        // venue: entityData.venue,
        card: {
          icon: 'https://alexandre.symphony.com:4000/img/appstore-logo.png',
          accent: `tempo-bg-color--green ${entityData.accent}`,
        },
        icon: 'https://alexandre.symphony.com:4000/img/appstore-logo.png',
        accent: `tempo-bg-color--green ${entityData.accent}`,
        sayhello: {
          icon: 'https://alexandre.symphony.com:4000/img/appstore-logo.png',
          label: '',
          service: name,
          data: {
            entity: entityData,
          },
        },
      },
    };
    return result;
  }

  action(data) {
    console.log(data);
  }
}
