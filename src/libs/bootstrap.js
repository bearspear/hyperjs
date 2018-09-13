import { InjectionCore } from './injection-core';
import { Sandbox } from './sandbox';

let core = new InjectionCore(Sandbox);

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
    core.register('app-root', rootComponent);
    core.start('app-root', rootNode, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log(core);
            console.log('bootstrapped !!!');
        }
    });
    return core;
}

export function createAppCore(sandbox = Sandbox) {
    return new InjectionCore(Sandbox);
}

export function bootstrap(rootComponent, rootNode, options) {
    if (typeof options === 'string') {
        //assume url
    }

    return ready(window).then(doc => {
        const app = startApp(rootComponent, rootNode, options);
        // setTimeout(() => {
        //     app.stop();

        // }, 5000);

        // setTimeout(() => {
        //     app.start('app-root', rootNode);
        // }, 20000);
    });

}
