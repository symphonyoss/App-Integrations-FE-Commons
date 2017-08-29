import { MessageEnricherBase, authorizeUser } from 'symphony-integration-commons';

const name = 'issueState-renderer';
const messageEvents = ['com.symphony.integration.jira.event.v2.issue_commented'];
export default class IssueStateEnricher extends MessageEnricherBase {
  constructor() {
    super(name, messageEvents);
  }

  enrich(type, entity) {
    const result = {
      template: `
        <messageML>
          <action id="assignTo" class="tempo-text-color--link"/>
        </messageML>
      `,
      data: {
        integrationUrl: entity.baseUrl,
        assignTo: {
          service: name,
          label: 'Assign To',
          data: {
            entity,
          },
        },
        frame: {
          src: 'https://localhost:4000/bundle.json',
          height: 200,
        },
      },
    };

    return result;
  }

  action(data) {
    const integrationUrl = data.entity.baseUrl;
    authorizeUser(integrationUrl);
  }
}
