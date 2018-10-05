import { Core } from '../core';
import { Sandbox } from '../core/sandbox';
import { createHyperComponent } from './component'
import { createPjaxComponent } from './pjax';
import { createService } from './service'
import { createModule } from './module';
import { createCustomElement, registerTag } from './hyperelement'
import { createPagelet } from './pagelet';
import { Container, resolver } from 'aurelia-dependency-injection';
import { uniqueId, noop } from '../utils/tools';
class Test { }

@resolver()
export class HyperResolver {

    get(container, key) {
        const type = key.type;

        switch (type) {
            case "Component":
                return container.invoke(createHyperComponent(key));
            case "Module":
                return container.invoke(createModule(key));
            case "Pjax":
                return container.invoke(createPjaxComponent(key));
            case "Service":
                return container.invoke(createService(key));
            case "CustomElement":
                return container.invoke(createCustomElement(key));
            case "Pagelet":
                return container.invoke(createPagelet(key));
            // case "Router": //array
            //     return this.state[0].get(container, key);
            default:
                return container.invoke(key)
            //throw new Error('Invalid');
        }
    }
}

export function generateId(type = 'hyper') {
    return type.toLowerCase() + "-" + uniqueId;
}

export class InjectionCore extends Core {
    constructor() {
        super(Sandbox);
        this.container = new Container();
        this._services = {};
        this._elements = {};
        this.log = console;
    }

    register(id, creator, options) {
        const type = creator.type || "generic"

        if (type === "generic" || creator.type === "Service") {
            this.container.registerResolver(creator, new HyperResolver());
            this._services[id] = { creator, options, id, type };
            return this;
        } else if (type === 'CustomElement') {
            this._elements[id] = { creator, options, id };
            const c = createCustomElement(creator)
            registerTag(c.tag, c);
            registerTag(c.tag, c);
            return this;
        } else {
            this.container.registerResolver(creator, new HyperResolver());
            return super.register(id, creator, options)
        }
    }

    _resolveInstance(creator, sb) {
        return this.container.get(creator);
    }

    // updated to accommodate an injector
    _createInstance(moduleId, o, cb) {
        let id = o.instanceId || moduleId;
        let opt = o.options || o.props;

        let module = this._modules[moduleId];

        if (this._instances[id]) { return cb(this._instances[id]); }

        let iOpts = {};
        let iterable = [module.options, opt];
        for (let i = 0; i < iterable.length; i++) {
            let obj = iterable[i];
            if (obj) {
                for (let key in obj) {
                    let val = obj[key]; if (iOpts[key] == null) {
                        iOpts[key] = val;

                    }
                }
            }
            iOpts['domNode'] = iOpts['domNode'] || o.domNode;
        }

        let _Sandbox = typeof o.sandbox === 'function' ? o.sandbox : this.Sandbox;
        let sb = new _Sandbox(this, id, iOpts, moduleId);

        return this._runSandboxPlugins('init', sb, err => {
            let instance = this._resolveInstance(module.creator, sb);
            if (typeof instance._preInit === "function") {
                instance._preInit(sb);
            } else {

            }

            if (typeof instance.init !== "function") {
                return cb(new Error("module has no 'init' method"));
            }
            this._instances[id] = instance;
            this._sandboxes[id] = sb;
            return cb(null, instance, iOpts);
        });
    }
}
