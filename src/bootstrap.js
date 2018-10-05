import { InjectionCore } from './core/injection';
import { createModule } from './core/module';
import {initialize} from 'aurelia-pal-browser';
initialize();
function ready(global) {
    return new Promise((resolve, reject) => {
        if (global.document.readyState === 'complete') {
            resolve(global.document);
        } else {
            global.document.addEventListener('DOMContentLoaded', completed);
            global.addEventListener('load', completed);
        }

        function completed() {
            global.document.removeEventListener('DOMContentLoaded', completed);
            global.removeEventListener('load', completed);
            resolve(global.document);
        }
    });
}

function startApp(rootComponent, rootNode, options) {
    if (rootComponent.type === 'Module') {
        const Module =  createModule(rootComponent);
        const module = new Module();
        return module.start();
    } else {
        return startRootCore(rootComponent, rootNode);
    }
}

export function createAppCore(sandbox = Sandbox) {
    return new InjectionCore();
}

export function startRootCore(rootComponent, rootNode, done = () => { }) {
    let core = new InjectionCore();
    core.register('app-root', rootComponent);
    core.start('app-root', rootNode, (err) => {
        if (err) {
            console.error(err);
            done(err);
        } else {
            console.log(core);
            console.log('bootstrapped');
            done();
        }
    });
    return core;
}

export function bootstrap(rootComponent, rootNode, options) {
    if (typeof options === 'string') {
        //assume url
    }

    return ready(window).then(doc => {
        const app = startApp(rootComponent, rootNode, options);
        window.app = app;
        app.restart = () => {
            app.start('app-root', rootNode);
        };
        // setTimeout(() => {
        //     app.stop();
        // }, 5000);

        // setTimeout(() => {
        //     app.start('app-root', rootNode);
        // }, 20000);
    });

}
