import { Core } from 'scaleapp';
import { Sandbox } from './sandbox';
import { container, singleton, dependencies } from 'needlepoint';

export class InjectionCore extends Core {
    constructor() {
        super(Sandbox);
    }

    _resolveInstance(creator, sb) {
        //creator.prototype.sandbox = sb;
        return container.resolve(creator);
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

        let _Sandbox =
            typeof o.sandbox === 'function' ? o.sandbox
                : this.Sandbox;

        let sb = new _Sandbox(this, id, iOpts, moduleId);

        return this._runSandboxPlugins('init', sb, err => {
            let instance = this._resolveInstance(module.creator, sb);

            if (typeof instance._preInit === "function") {
                instance._preInit(sb);
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
