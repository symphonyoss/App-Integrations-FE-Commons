import 'babel-polyfill';
import { register } from 'symphony-integration-commons';
import Bootstrap from './bootstrap';
import RendererComponent from './RendererComponent';
import config from './config.service';

export const RendererStarterAPI = (function rendererStarter() {
    var pub = {};
    pub.start = () => {
        const bootstrap = new Bootstrap();
        bootstrap.register();
        const renderer = new RendererComponent();
        renderer.register();
        bootstrap.start();
    }
    return pub;
}());
