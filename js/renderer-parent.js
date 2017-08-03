import 'babel-polyfill';
import { register } from 'symphony-integration-commons';
import Bootstrap from './bootstrap';
import Renderer from './renderer';
import config from './config.service';

export const RendererParentComponent = (function rendererParent() {
    var pub = {};
    pub.start = () => {
        const bootstrap = new Bootstrap();
        bootstrap.register();
        const renderer = new Renderer();
        renderer.register();
        bootstrap.start();
    }
    return pub;
}());
