import 'babel-polyfill';
import { initUnauthenticatedApp } from 'symphony-integration-commons';
import config from './config.service';

/*
* register                          invokes the register function from App-Commons module
* @param          config            Config object
* @param          enrichers         Array of renderers/enrichers
*/
initUnauthenticatedApp(config, []);
