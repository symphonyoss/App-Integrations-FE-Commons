import { MessageEnricherBase } from 'symphony-integration-commons';

const name = 'issueRendered-renderer';
const messageEvents = ['com.symphony.integration.jira.event.v2.issue_commented'];
export default class IssueAssignedEnricher extends MessageEnricherBase {
  constructor() {
    super(name, messageEvents);
  }

  enrich() {
  }

  action() {
    console.log('Here it comes!');
  }
}
