/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__
 * DS203: Remove `|| {}` from converted for-own loops
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */

import { Mediator } from '../core/mediator';

function __guardMethod__(obj, methodName, transform) {
    if (typeof obj !== 'undefined' && obj !== null && typeof obj[methodName] === 'function') {
        return transform(obj, methodName);
    } else {
        return undefined;
    }
}

export class Model extends Mediator {
    static initClass() {
        this.CHANGED = "changed";
    }

    constructor(obj) {
        super();
        for (let k in obj) { const v = obj[k]; if ((this[k] == null)) { this[k] = v; } }
    }

    set(key, val, silent) {
        let k, v;
        if (silent == null) { silent = false; }
        switch (typeof key) {
            case "object":
                for (k in key) { v = key[k]; this.set(k, v, true); }
                if (!silent) {
                    this.emit(Model.CHANGED, ((() => {
                        const result = [];
                        for (k in key) {
                            v = key[k];
                            result.push(k);
                        }
                        return result;
                    })()));
                }
                break;
            case "string":
                if (!(["set", "get"].includes(key)) && (this[key] !== val)) {
                    this[key] = val;
                    if (!silent) { this.emit(Model.CHANGED, [key]); }
                }
                break;
            default: __guardMethod__(console, 'error', o => o.error("key is not a string"));
        }
        return this;
    }

    change(cb, context) {
        if (typeof cb === "function") {
            return this.on(Model.CHANGED, cb, context);
        } else if (arguments.length === 0) {
            return this.emit(Model.CHANGED);
        }
    }

    notify() { return this.change(); }

    get(key) { return this[key]; }

    toJSON() {
        const json = {};
        for (let k of Object.keys(this || {})) {
            const v = this[k]; json[k] = v;
        }
        return json;
    }
}
Model.initClass();

export class View {
    constructor(model) {
        if (model) {
            this.setModel(model);
        }
    }

    setModel(model) {
        this.model = model;
        return this.model.change(() => { return this.render(); }, this);
    }

    render() { }
};

export class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }
};


