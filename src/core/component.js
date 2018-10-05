import { InjectionCore } from './injection';
import { Mediator } from './mediator';
import { listenToRoot, stopListenToRoot, triggerEvent } from '../utils/listeners';
import Dom from './plugins/dom';
import Util from './plugins/util';
import Mvc from './plugins/mvc';
import EJS from './plugins/microtemplate';
import Cookies from './plugins/cookie';
import $ from 'jquery';
import { ANNOTATIONS, PROP_METADATA } from '../utils/decorators';
import util from '../utils/tasks';
import { uniqueId, noop } from '../utils/tools';


//Todo: attach observable on root for all bubbled events and parent subscription

export function corelessSandbox() {
  this.instanceId = uniqueId;
  this.options = {};
  this.moduleId = this.instanceId;

  this.on = noop;
  this.emit = noop;
  this.off = noop;
  this.attach = noop;
  this.detach = noop;
  this.render = noop;
};

export function startComponent(selector, creator, options = {}) {
  options["domNode"] = $(selector).get(0);
  const inst = new (createHyperComponent(creator))();
  // will be coreless or rather the "core" will that which started it
  inst._preInit();
  return inst.init(options);
}

export function createHyperComponent(_Class) {

  let bindings = null, elements = null, subscriptions = null;

  if (_Class[PROP_METADATA] && _Class[PROP_METADATA].Listen) {
    bindings = _Class[PROP_METADATA].Listen;
  }

  if (_Class[PROP_METADATA] && _Class[PROP_METADATA].Subscribe) {
    subscriptions = _Class[PROP_METADATA].Listen;
  }

  if (_Class[PROP_METADATA] && _Class[PROP_METADATA].Element) {
    elements = _Class[PROP_METADATA].Element;
  }

  const _metadata = Object.assign(_Class[ANNOTATIONS], { bindings: bindings });

  const tag = _metadata.tag || `hyper-${_Class.name.toLowerCase().replace('component', '')}`;

  return class HyperComponent extends _Class {

    find(selector, dom = false) {
      let els = $(this.domNode).find(selector);
      return dom ? els.get() : els;
    }

    findOne(selector, dom = false) {
      let el = this.find(selector);
      return dom ? el.get(0) : el.eq(0);
    }

    html(html) {
      this.$instance.html(html);
    }

    append(a) {
      return this.$instance.append(a);
    }

    getElementById(id) {
      return this.instance.querySelector('#' + id);
    }

    // this might be rare (maybe)
    listenToElement(events, selector, callback, bubbles = true) {
      // selector as array [element, ]
      var _this = this;
      let $els = $(selector).on(events, function (e) {
        if (!bubbles) stopBubble(e);
        callback(this, e)
      });
      this.boundElements.push($els); //WeakMap/Map ?
      return $els;
    }

    _stopListenToElements() {
      for (const $el of this.boundElements) {
        $el.off();
      }
    }

    listenToParent(channel, cb) {
      return this.sandbox.on(`${channel}/${this.instanceId}`, cb);
    }

    listenToChildren(channel, cb) {
      return this.core._mediator.on(channel, cb);
    }

    pipeUp(channel, cb) {
      this.listenToChildren(channel, (data) => {
        this.emitToParent(channel, data.data || data, cb);
      });
    }

    pipeDown(channel, cb) {
      this.listenToParent(channel, (data) => {
        this.emitToChildren('*', channel, data.data || data, cb);
      });
    }
    //internal events
    emit(channel, event, cb) {
      this.eventHub.emit(channel, event, cb)
    }

    listen(channel, event, cb) {
      this.eventHub.on(channel, event, cb)
    }

    off(channel, cb) {
      this.eventHub.off(channel, cb)
    }

    emitToChildren(id, channel, data, cb) {
      if (typeof cb !== 'function') {
        cb = (err) => {
          if (err != null) {
            //throw new Error(err)
            console.error(err);
          }
        };
      }

      let ids = id instanceof Array ? id : [id];
      let event = {
        target: 'child',
        channel: channel,
        data: data
      };
      if (id === '*' || id == null) {
        for (const key of Object.keys(this._running)) {
          this.core._mediator.emit(`${channel}/${key}`, event, cb);
        }
      } else {
        for (const id of ids) {
          event.id = this.instanceId;
          this.core._mediator.emit(`${channel}/${id}`, event, cb);
        }
      }
    }

    emitToParent(channel, data, cb) {
      if (typeof cb !== 'function') {
        cb = (err) => {
          if (err != null) {
            //throw new Error(err)
            console.error(err);
          }
        };
      }

      const id = this.instanceId;
      let event = {
        target: 'parent',
        channel: channel,
        data: data,
        id: id
      };
      this.sandbox.emit(channel, event, cb);

      //TODO: trigger element custom event on root
    }

    createComponentEvent(onEvent) {
      if (this[onEvent]) {
        //console.error(onEvent, ': event or variable already exists')
      } else {
        this[onEvent] = () => { };
      }
    }

    _setupBasicComponentChannels() {
      if (this.sandbox) {
        this.listenToParent(`hide`, () => { this.hide() });
        this.listenToParent(`show`, () => { this.show() });
        this.listenToParent(`data`, (data) => {
          //this.model.set(data)s
        });
        this.pipeUp('broadcast');
        this.pipeDown('broadcast');
        this.createComponentEvent('onBroadcast')
        this.listenToParent(`broadcast`, (event) => this.onBroadcast(event.data, 'down'));
        this.listenToChildren(`broadcast`, (event) => this.onBroadcast(event.data, 'up'));
      }
    }

    _bind() {
      //console.log('test', HyperComponent.test)
      //const bindings = HyperComponent.__prop_metadata__.RootListener;

      if (Array.isArray(_metadata.bindings)) {
        for (const binding of _metadata.bindings) {
          //listenToRoot(this.domNode, ...binding);
          listenToRoot(this.domNode, binding[1][0], binding[1][1], binding[2].bind(this));
        }
      }

      if (typeof this.onBind === 'function') {
        this.onBind(
          (...args) => listenToRoot(this.domNode, ...args), // allow for arrays
          (...args) => this.listenToElement(...args)
        );
      }
    }
    _setRootAttributes() {
      this.id = `component-${uniqueId()}`;
      this.domNode.setAttribute('data-component-id', this.id);
      this.domNode.setAttribute('data-instance-id', this.instanceId);
      this.domNode.setAttribute('data-tag', tag);
    }

    _removeRootAttributes() {
      this.domNode.removeAttribute('data-component-id');
      this.domNode.removeAttribute('data-instance-id');
      this.domNode.removeAttribute('data-tag');
    }

    _unbind() {
      stopListenToRoot(this.domNode);
      this._stopListenToElements();
      this.eventHub.off();
      if (typeof this.onUnbind === 'function') {
        this.onUnbind();
      }
    }

    _subscribe() {
      this._setupBasicComponentChannels();

      // if (Array.isArray(_metadata.subscriptions)) {
      //   for (const sub of _metadata.subscriptions) {
      //     if(sub.dir === 'down')
      //     this.listenToParent(subchannel, cb),
      //     this.listenToChildren(channel, cb)
      //     listenToRoot(this.domNode, binding[1][0], binding[1][1], binding[2].bind(this));
      //   }
      // }

      if (typeof this.onSubscribe === 'function') {
        this.onSubscribe(
          (channel, cb) => this.listenToParent(channel, cb),
          (channel, cb) => this.listenToChildren(channel, cb)
        );
      }
    }

    _unsubscribe() {
      // stop listening to children
      this.core._mediator.off();
      // stop listening to parent
      if (this.sandbox) {
        this.sandbox.off();
      }
      if (typeof this.onUnsubscribe === 'function') {
        this.onUnsubscribe();
      }
    }

    _detach() {
      this.core._mediator.detach();
      if (this.sandbox) {
        this.sandbox.detach();
      }
    }

    _attach() {
      this.core._mediator.attach();
      if (this.sandbox) {
        this.sandbox.attach();
      }
    }

    _render() { //tasks??
      if (this.hasTemplate) {
        if (typeof this.onPreRender === 'function') {
          this.onPreRender();
        }
        if (typeof this.onRender === 'function') {
          this.onRender();
        } else {
          //assume ejs default
          if (!this.embedTemplate) { this.domNode.innerHTML = this.sandbox.render(template, this.props.toJSON() || {}); }
        }
        if (typeof this.onPostRender === 'function') {
          this.onPostRender();
        }
      }
    }

    render() {
      //this._detach();
      this._unbind();
      this._render();
      this._bind()
      //this._attach();
    }

    getInstance(id) {
      return this._instances[id];
    }

    getModuleClass(id) {
      return this._modules[id];
    }

    _registerComponents() {
      const registry = _metadata.registry || new Map();
      //TODO: Dom-based
      for (const [key, value] of registry.entries()) {
        this.core.register(key, value)
      }
    }

    startPage(page, opt, done = () => { }) {
      if (this.page != null) {
        let taskStop = (next) => {
          this.core.stop(this.page, next);
        };

        let taskStart = (next) => {
          this.startComponents(page, opt, next)
          this.page = page;
        };
        util.runSeries([taskStop, taskStart], done, true);
      } else {
        this.core.start(page, opt, done);
        this.page = page;
      }
    }

    broadcast(direction, action, value) {
      // to parent
      if (direction === 'up' || direction === "*") {
        this.emitToParent('broadcast', { action: action, value: value });
      }
      // to children
      if (direction === 'down' || direction === '*') {
        this.emitToChildren('*', 'broadcast', { action: action, value: value });
      } else if (direction !== 'up' || direction !== 'down' || direction !== "*") {
        this.emitToChildren(direction, 'broadcast', { action: action, value: value });
      }
    }

    setProps(props) {
      this.props = new this.core.Model(props);
    }

    activateProps() {
      this.props.change(() => {
        console.log(arguments);
        if (typeof this.onPropsChange === 'function') {
          this.onPropsChange(props);
        }
      });
      this.listenToParent("props", (props) => {
        this.setProps(props);
      })
    }

    setModel(data) {
      this.props = new this.core.Model(data);
      this.props.change(() => {
        this.render();
      }, this);
    };

    update(id, props) {
      if (typeof id === 'object') {
        props = id;
        this.emitToChildren('*', "props", props)
      } else {
        this.emitToChildren(id, "props", props)
      }
    }

    _preInit(sandbox = new corelessSandbox()) { //embedInSandbox
      this.core = new InjectionCore();
      this.core.use([Util, Mvc, EJS, Dom, Cookies]);

      //this._mediator.cascadeChannels = true;
      this.eventHub = new Mediator(); // really needed??
      this.boundElements = this.boundElements || [];
      //if (jQuery == null) {
      //throw "jQuery  not found"
      //}
      this.$ = $;
      $.hyperjs = true;

      

      this.sandbox = sandbox
      this.hasSandbox = this.sandbox != null;
      this.hasTemplate = _metadata.template != null;
      this.embedTemplate = _metadata.embedTemplate || false;

      this.log = console;

      if (this.hasSandbox) {
        this.domNode = this.sandbox.instance;
        this.instance = this.element = this.domNode;
        //console.log('Child component: uses sandbox')
      } else {
        //throw new Error('error', this)
      }

      if (this.instance) {
        this.hasRoot = true;
        this.instance = this.element = this.domNode;
        this.$instance = $(this.instance);
      } else {
        this.hasRoot = false;
      }
      this.instanceId = this.sandbox.instanceId;

      if (this.hasTemplate && this.embedTemplate) {
        this.domNode.innerHTML = _metadata.template;
      }

      this._registerComponents(); //init?
    }

    init(options, done) {
      this.props = options || {};
      let errors = [];

      let tasks = [
        (next) => {
          triggerEvent.call(this, 'onPreInit', next);
        },
        (next) => {
          this.core.boot(() => {
            triggerEvent.call(this, 'onBoot', next);
          });
        },
        (next) => {
          this.id = `component-${uniqueId()}`;
          this._setRootAttributes();
          next()
        },
        (next) => {
          this.data = this.props || {}
          this.setModel(this.data);
          this._render();
          next();
        },
        (next) => {
          this.id = `component-${uniqueId()}`;
          this._setRootAttributes();
          next();
        },
        (next) => {
          this._bind();
          next();
        },
        (next) => {
          this._subscribe();
          next();
        },
        (next) => {
          if (_metadata.autorun) {
            this.startComponents();
          }
          next();
        }
      ];
      let _this = this;
      util.runSeries(tasks, (err) => {
        if (err != null) {
          errors = err;
        }
        triggerEvent.call(this, 'onInit', (err2) => {
          if (err2) {
            errors.concat(err2);
          }
          if (errors.length > 0) console.error(errors);
          done(errors.length > 0 ? errors : null);
        });
      }, false);
      console.info("<" + _Class.name + "> created:", this)
      return this;
    }

    destroy(done) {
      let tasks = [
        (next) => {
          triggerEvent.call(this, 'onDestroy', next);
        },
        (next) => {
          this.core.stop(next);
        },
        (next) => {
          this._unsubscribe();
          next();
        },
        (next) => {
          this._unbind();
          next();
        },
        (next) => {
          if (this.hasTemplate) {
            this.domNode.innerHTML = '';
          }
          next();
        }
      ];
      util.runSeries(tasks, done, true);
      this._removeRootAttributes();
      console.log("destroyed:", this)
    }

    _checkForComponent(node) {
      return !this.find(node).data('component-id') && this.find(node).find('[data-component-id]').length > 0;
    }

    initComponents() {
      for (const id of Object.keys(this._modules)) {
        let el = this.find('#' + id).get(0) || this.find(id).get(0);
        const rand = uniqueId();
        if (el && !this._checkForComponent(el)) {
          this.core.start(id, {
            instanceId: `${id}-${rand}`,
            options: {
              domNode: el
            }
          });
        }
      }
    }

    startChildren(children, initEvent) {
      for (const child of children) {
        this.core.start(child[0], child[1]);
      }
      if (initEvent != null) {
        this.emitToChildren('*', initEvent[0], initEvent[1]);
      }
    }

    // startComponents(id, opts, cb) {
    //   let options = opts;
    //   if (opts instanceof HTMLElement) {
    //     let node = opts;
    //     options = {
    //       domNode: node
    //     };
    //   }
    //   this.core.start(id, options, cb);
    // }

    startComponents(...args) {
      this.core.start(...args);
    }

    stopComponents(id, done) {
      const ids = id instanceof Array ? id : [id];
      let tasks = [];
      for (const id of ids) {
        tasks.push((next) => {
          this.core.stop(id, next);
        })
      }
      util.runParallel(tasks, done);
    }

    show() {
      this.domNode.style.display = "block";
      return this;
    }

    hide() {
      this.domNode.style.display = "none";
      return this;
    }
  };
};

