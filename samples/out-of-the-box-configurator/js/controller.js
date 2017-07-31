import 'babel-polyfill';
// import { register } from 'symphony-integration-commons';
import Bootstrap from './bootstrap';
import Renderer from './renderer';
// import config from './config.service';

/*
* register                          invokes the register function from App-Commons module
* @param          SYMPHONY          Global SYMPHONY object
* @param          appTitle          The app title should appear in the title bar
*/
const bootstrap = new Bootstrap();
bootstrap.register();
const renderer = new Renderer();
renderer.register();
bootstrap.start();

// register(SYMPHONY, config.appTitle);
