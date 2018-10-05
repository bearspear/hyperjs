import { uniqueId } from '../utils/tools';
import { ANNOTATIONS, PROP_METADATA } from '../utils/decorators';
import { runParallel } from '../utils/tasks';
import { listenToRoot, stopListenToRoot, triggerEvent, callMethod } from '../utils/listeners';

import $ from 'jquery';

export function createService(_Class) {

    const _metadata = Object.assign(_Class[ANNOTATIONS], {});

    return class HyperService extends _Class {

        // ???
        init() {
        }

        destroy() {
        }

    }
};
