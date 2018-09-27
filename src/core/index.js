/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */

import { Mediator } from './mediator';
import util from '../utils/tasks';

const checkType = function (type, val, name) {
  if (typeof val !== type) { return `${name} has to be a ${type}`; }
};

export class Core {
  static initClass() {

    // define dummy logger
    this.prototype.log = {
      error() { },
      log() { },
      info() { },
      warn() { },
      enable() { }
    };
  }

  constructor(Sandbox) {
    // define private variables

    this.Sandbox = Sandbox;
    this._modules = {};
    this._plugins = [];
    this._instances = {};
    this._sandboxes = {};
    this._running = {};
    this._mediator = new Mediator(this);

    // define public variables

    this.Mediator = Mediator;
    if (this.Sandbox == null) {
      this.Sandbox = function (core, instanceId, options, moduleId) {
        this.instanceId = instanceId;
        if (options == null) { options = {}; }
        this.options = options;
        this.moduleId = moduleId;
        core._mediator.installTo(this);
        return this;
      };
    }
  }

  // register a module
  register(id, creator, options) {
    if (options == null) { options = {}; }
    const err =
      checkType("string", id, "module ID") ||
      checkType("function", creator, "creator") ||
      checkType("object", options, "option parameter");
    if (err) {
      this.log.error(`could not register module '${id}': ${err}`);
      return this;
    }

    if (id in this._modules) {
      this.log.warn(`module ${id} was already registered`);
      return this;
    }

    this._modules[id] = { creator, options, id };
    return this;
  }

  // start a module
  start(moduleId, opt, cb) {

    let node;
    if (opt == null) { opt = {}; }
    if (cb == null) { cb = function () { }; }
    if (arguments.length === 0) { return this._startAll(); }
    if (moduleId instanceof Array) { return this._startAll(moduleId, opt); }
    if (typeof moduleId === "function") { return this._startAll(null, moduleId); }
    if (typeof opt === "function") { cb = opt; opt = {}; }
    if (opt instanceof HTMLElement) { node = opt; opt = {}; }

    const e =
      checkType("string", moduleId, "module ID") ||
      checkType("object", opt, "second parameter") ||
      (!this._modules[moduleId] ? "module doesn't exist" : undefined);

    if (e) { return this._startFail(e, cb); }

    const id = opt.instanceId || moduleId;
    if (node != null) { opt.domNode = node; }

    if (this._running[id] === true) {
      return this._startFail((new Error("module was already started")), cb);
    }

    const initInst = (err, instance, opt) => {
      if (err) { return this._startFail(err, cb); }
      try {
        if (util.hasArgument(instance.init, 2)) {
          // the module wants to init in an asynchronous way
          // therefore define a callback
          return instance.init(opt, err => {
            if (!err) { this._running[id] = true; }
            return cb(err);
          });
        } else {
          // call the callback directly after initialisation
          instance.init(opt);
          this._running[id] = true;
          return cb();
        }
      } catch (e) {
        return this._startFail(e, cb);
      }
    };

    return this.boot(err => {
      if (err) { return this._startFail(err, cb); }
      return this._createInstance(moduleId, opt, initInst);
    });
  }

  _startFail(e, cb) {
    this.log.error(e);
    cb(new Error(`could not start module: ${e.message}`));
    return this;
  }

  _createInstance(moduleId, o, cb) {

    const id = o.instanceId || moduleId;
    const opt = o.options;

    const module = this._modules[moduleId];

    if (this._instances[id]) { return cb(this._instances[id]); }

    const iOpts = {};
    for (let obj of [module.options, opt]) {
      if (obj) {
        for (let key in obj) { const val = obj[key]; if (iOpts[key] == null) { iOpts[key] = val; } }
        iOpts['domNode'] = o.domNode;
      }
    }

    const Sandbox =
      typeof o.sandbox === 'function' ? o.sandbox
        : this.Sandbox;

    const sb = new Sandbox(this, id, iOpts, moduleId);

    return this._runSandboxPlugins('init', sb, err => {
      const instance = new module.creator(sb);
      if (typeof instance.init !== "function") {
        return cb(new Error("module has no 'init' method"));
      }
      this._instances[id] = instance;
      this._sandboxes[id] = sb;
      return cb(null, instance, iOpts);
    });
  }

  _runSandboxPlugins(ev, sb, cb) {
    const tasks =
      Array.from(this._plugins).filter((p) => typeof (p.plugin != null ? p.plugin[ev] : undefined) === "function").map((p) => (function (p) {
        const fn = p.plugin[ev];
        return function (next) {
          if (util.hasArgument(fn, 3)) {
            return fn(sb, p.options, next);
          } else {
            fn(sb, p.options);
            return next();
          }
        };
      })(p));
    return util.runSeries(tasks, cb, true);
  }

  _startAll(mods, cb) {

    //if (mods == null) { mods = m; }
    if (mods == null) {
      mods = (function () {
        var _results = [];
        for (const m in this._modules) {
          _results.push(m);
        }
        return _results;
      }).call(this);
    }

    const startAction = (m, next) => this.start(m, this._modules[m].options, next);

    const done = function (err) {
      let e;
      if ((err != null ? err.length : undefined) > 0) {
        const mdls = ((() => {
          const result = [];
          for (let i = 0; i < err.length; i++) {
            const x = err[i];
            if (x != null) {
              result.push(`'${mods[i]}'`);
            }
          }
          return result;
        })());
        e = new Error(`errors occoured in the following modules: ${mdls}`);
      }
      return (typeof cb === 'function' ? cb(e) : undefined);
    };
    util.doForAll(mods, startAction, done, true);
    return this;
  }

  stop(id, cb) {
    let instance;
    if (cb == null) { cb = function () { }; }
    if ((arguments.length === 0) || (typeof id === "function")) {
      util.doForAll(((() => {
        const result = [];
        for (let x in this._instances) {
          result.push(x);
        }
        return result;
      })()), (function () { return this.stop(...arguments); }.bind(this)), id, true);

    } else if (instance = this._instances[id]) {

      delete this._instances[id];

      this._mediator.off(instance);
      this._runSandboxPlugins('destroy', this._sandboxes[id], err => {
        // if the module wants destroy in an asynchronous way
        if (util.hasArgument(instance.destroy)) {
          return instance.destroy(err2 => {
            delete this._running[id];
            return cb(err || err2);
          });
        } else {
          // else call the callback directly after stopping
          if (typeof instance.destroy === 'function') {
            instance.destroy();
          }
          delete this._running[id];
          return cb(err);
        }
      });
    }
    return this;
  }

  // register a plugin
  use(plugin, opt) {
    if (plugin instanceof Array) {
      for (let p of Array.from(plugin)) {
        switch (typeof p) {
          case "function": this.use(p); break;
          case "object": this.use(p.plugin, p.options); break;
        }
      }
    } else {
      if (typeof plugin !== "function") { return this; }
      this._plugins.push({ creator: plugin, options: opt });
    }
    return this;
  }

  // load plugins
  boot(cb) {
    const core = this;
    const tasks = Array.from(this._plugins).filter((p) => p.booted !== true).map((p) => (function (p) {
      if (util.hasArgument(p.creator, 3)) {
        return function (next) {
          let plugin;
          return plugin = p.creator(core, p.options, function (err) {
            if (!err) {
              p.booted = true;
              p.plugin = plugin;
            }
            return next();
          });
        };
      } else {
        return function (next) {
          p.plugin = p.creator(core, p.options);
          p.booted = true;
          return next();
        };
      }
    })(p));
    util.runSeries(tasks, cb, true);
    return this;
  }
}
Core.initClass();
