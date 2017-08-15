import 'babel-polyfill';
import { register } from 'symphony-integration-commons';
import config from './config.service';
import CardRenderer from '../renderers/cardRenderer';

/*
* register                          invokes the register function from App-Commons module
* @param          SYMPHONY          Global SYMPHONY object
* @param          appTitle          The app title should appear in the title bar
* @params         renderers         array of Renderers to be registered in the application
*/

register(SYMPHONY, config.appTitle, [new CardRenderer()]);
