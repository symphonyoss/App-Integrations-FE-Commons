import 'babel-polyfill';
import { register, RendererStarter } from 'symphony-integration-commons';
import config from './config.service';

/*
* register                          invokes the register function from App-Commons module
* @param          SYMPHONY          Global SYMPHONY object
* @param          appTitle          The app title should appear in the title bar
*/
register(SYMPHONY, config.appTitle, 'importsToRegister', 'exportToRegister');

const renderer = new RendererStarter();
renderer.start();
