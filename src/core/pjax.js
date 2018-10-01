
import { createHyperComponent } from './component';
import { HyperModel } from "./hypermodel";

export function createPjaxComponent(_Class) {

    const _newClass = createHyperComponent(_Class);

    return class PjaxComponent extends _newClass {

        onSuccessPjax(data) {

        }

        onBind(domListen, parentListen) {
            console.log('pjax binding');
            if (typeof super.onBind === 'function') {
                super.onBind(domListen, parentListen);
            }

        }

        onSubscribe(domListen, parentListen) {
            console.log('pjax subscriptions');
            if (typeof super.onBind === 'function') {
                super.onSubscribe(domListen, parentListen);
            }
        }

        onPjaxInit() {
            console.log("Do Init Pjax stuff!");
        }

        _preInit(sandbox) {
            super._preInit(sandbox);
            this.onPjaxInit();
        }

    }
};
