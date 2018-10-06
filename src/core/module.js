import { InjectionCore } from './injection';
import { uniqueId } from '../utils/tools';
import { ANNOTATIONS, PROP_METADATA } from '../utils/decorators';
import { runParallel } from '../utils/tasks';
import { startRootCore } from '../bootstrap';
import { registerTag } from './hyperelement';
import { listenToRoot, stopListenToRoot, triggerEvent, callMethod } from '../utils/listeners';

import $ from 'jquery';


export function startModule(selector, module, options = {}) {

}

/*
registry: [], // of services and components
bootstrap: [], // 1 or more component trees.
// if communication is necessary module will have to facilitate it via core
// globalResources?
// injection container: parent/child
// routing?
// custom elments creation and manage
// write container for other libs/frameworks: vue, react, aurelia, cycle etc?
*/

export function createModule(_Class) {

    const _metadata = Object.assign(_Class[ANNOTATIONS], {});
    const customElements = _metadata.customElments || [];
    // [tagname, element, associated component]

    const bootstrap = _metadata.bootstrap || [];

    return class HyperModule extends _Class {
        constructor() {
            super()
            this.cores = [];
            this.instances = {};
        }
        _setRootAttributes(domNode) {
            domNode.setAttribute('data-module-id', this.id);
        }

        _removeRootAttributes() {
            $(`[data-module-id="${this.id}"]`).removeAttr('data-module-id');
        }

        _startTags() {
            for (const element of customElements) {
                registerTag(element[0], element[1]);
            }
        }

        init(done = () => { }) {
            triggerEvent.call(this, 'onPreInit');
            this.id = `module-${uniqueId()}`;

            for (const boot of bootstrap) {
                const rootNode = $(boot[1]).get(0);
                const rootComponent = boot[0];
                //const id = rootComponent.name + "-" + this.id;

                // TODO: start in parallel
                const core = startRootCore(rootComponent, rootNode);
                core.startedFromModule = _Class.name
                this.cores.push(core);

                this._setRootAttributes(rootNode);
            }

            for (const core of this.cores) {
                this.instances = Object.assign(this.instances, core._instances);
            }

            callMethod.call(this, "onModuleStarted", ...this.cores);
            console.info("<" + _Class.name + "> created:", this);
        }

        getInstances() {
            return this.instances;
        }

        getCores() {
            return this.cores;
        }

        destroy() {
            for (const core of this.cores) {
                core.stop(); //tasks?
            }
            this._removeRootAttributes();
            callMethod.call(this, "onModuleStopped", ...this.cores);
        }

        start(...args) {
            this.init(...args);
            return this;
        }

        stop(...args) {
            this.destroy(...args);
            return this;
        }

    }
};
