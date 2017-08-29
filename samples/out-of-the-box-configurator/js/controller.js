import 'babel-polyfill';
import { initUnauthenticatedApp } from 'symphony-integration-commons';
import config from './config.service';
import IssueStateEnricher from '../enrichers/issueStateEnricher';
import IssueAssigned from '../enrichers/issueAssigned';

/*
* register                          invokes the register function from App-Commons module
* @param          SYMPHONY          Global SYMPHONY object
* @param          appTitle          The app title should appear in the title bar
*/
initUnauthenticatedApp(config, [new IssueStateEnricher(), new IssueAssigned()]);
