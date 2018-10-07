import { listenToRoot, stopListenToRoot, triggerEvent } from '../utils/listeners';
import $ from 'jquery';
import { ANNOTATIONS, PROP_METADATA } from '../utils/decorators';
import util from '../utils/tasks';
import { uniqueId, noop } from '../utils/tools';
//import { mix } from 'mixwith'

// shim
(function () {
    if (
        // No Reflect, no classes, no need for shim because native custom elements
        // require ES2015 classes or Reflect.
        window.Reflect === undefined ||
        window.customElements === undefined ||
        // The webcomponentsjs custom elements polyfill doesn't require
        // ES2015-compatible construction (`super()` or `Reflect.construct`).
        window.customElements.hasOwnProperty('polyfillWrapFlushCallback')
    ) {
        return;
    }
    const BuiltInHTMLElement = HTMLElement;
    window.HTMLElement = function HTMLElement() {
        return Reflect.construct(BuiltInHTMLElement, [], this.constructor);
    };
    HTMLElement.prototype = BuiltInHTMLElement.prototype;
    HTMLElement.prototype.constructor = HTMLElement;
    Object.setPrototypeOf(HTMLElement, BuiltInHTMLElement);
})();


export function registerTag(name, element) {
    if (!hasDefinedTag(name)) {
        window.customElements.define(name, element);
    } else {
        console.warn(name + " tag is already defined");
    }
}

export function hasDefinedTag(name) {
    return window.customElements.get(name) !== undefined;
}

export function startCustomElement(creator, tag) {
    const c = createCustomElement(creator)
    registerTag(c.tag, c);
    return c;
}

export function createCustomElement(_Class) {
    const _metadata = Object.assign(_Class[ANNOTATIONS], {});
    const tag = _metadata.tag || `hyper-${_Class.name.toLowerCase().replace('component', '')}`;
    const template = _metadata.template || ''; //string|url|#id
    _Class.tag = tag;
    return class HyperElement extends _Class {
        getTemplate() {
            return $(template).get(0).content;
        }
    }
};

