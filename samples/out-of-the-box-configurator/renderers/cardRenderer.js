import { MessageEnricherBase } from 'symphony-integration-commons';

const name = 'card-renderer';
const messageEvents = ['com.symphony.integration.jira.event.v2.state'];
export default class CardRenderer extends MessageEnricherBase {
  constructor() {
    super(name, messageEvents);
  }

  enrich(type, entity) {
    const result = {
      template: `
        <messageML>
          <action id="assignTo" class="button tempo-btn"/>
        </messageML>
      `,
      data: {
        assignTo: {
          service: name,
          label: 'Assign',
          data: {
            entity,
          },
        },
      },
    };

    return result;
  }

  action(data) {
    window.alert(`This will alter the bug ${data.entity.issue.key}`);
    console.log(data);
  }
}
