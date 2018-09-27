import { InjectionCore } from '../core/injection';
import { Mediator } from '../core/mediator';
import util from '../libs/utils';
import Dom from '../core/plugins/dom';
import Util from '../core/plugins/util';
import Mvc from '../core/plugins/mvc';
import EJS from '../core/plugins/microtemplate';
import Cookies from '../core/plugins/cookie';
import $ from 'jquery';
import { makeClassDecorator, ANNOTATIONS, PROP_METADATA } from './decorators'


export function stopBubbles(event) {
  event.preventDefault();
  event.stopPropagation();
};

export function listenToRoot(rootNode, events, selector, callback, bubbles = true) {
  //var _this = this;
  if (typeof selector === 'function') {
    bubbles = callback;
    callback = selector;
    return $(rootNode).on(events, function (e, ...params) {
      if (!bubbles) stopBubble(e);
      callback(this, e, ...params)
    });

  } else {
    return $(rootNode).on(events, selector, function (e, ...params) {
      if (!bubbles) stopBubble(e);
      callback(this, e, ...params)
    });
  }
};

export function stopListenToRoot(rootNode) {
  $(rootNode).off();
};

export function componentMetaData(options = {}) {
  let template, embedTemplate = false, registry = new Map(), autorun = false;

  if (options.template != null) {
    if (typeof options.template === 'string') {
      template = options.template;
      embedTemplate = true;
    } else {
      template = options.template[0] || null;
      embedTemplate = options.template[1];
    }

  }
  if (options.registry != null) {
    registry = new Map(options.registry);
  }

  if (options.autorun) {
    autorun = options.autorun;
  }

  return {
    template: template,
    embedTemplate: embedTemplate,
    registry: registry,
    autorun: autorun
  }
};

export function Component2(options = {}) {
  return makeClassDecorator(componentMetaData(options));
};

export function createHyperComponent(_Class) {

  let bindings = null;
  if (_Class[PROP_METADATA] && _Class[PROP_METADATA].RootListener) {
    bindings = _Class[PROP_METADATA].RootListener;
  }

  const _metadata = Object.assign(_Class[ANNOTATIONS], { bindings: bindings });

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
      this.$instance.append(a);
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
    }

    // stop listening to Root
    _stopListenToRoot() {
      $(this.domNode).off();
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
      console.log('test', HyperComponent.test)
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
      this.id = `component-${this.core.uniqueId()}`;
      this.domNode.setAttribute('data-component-id', this.id);
      this.domNode.setAttribute('data-instance-id', this.instanceId);
    }

    _removeRootAttributes() {
      this.domNode.removeAttribute('data-component-id');
      this.domNode.removeAttribute('data-instance-id');
    }

    _unbind() {
      this._stopListenToRoot();
      this._stopListenToElements();
      this.eventHub.off();
      if (typeof this.onUnbind === 'function') {
        this.onUnbind();
      }
    }

    _subscribe() {
      this._setupBasicComponentChannels();
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

    _tryEvent(event, done) {
      try {
        this[event](done);
      } catch (err) {
        done(err);
      }
    }

    _onEvent(event, done) {
      if (typeof this[event] === 'function') {
        if (util.getArgumentNames(this[event]).length !== 0) {
          try {
            this[event](done);
          } catch (err) {
            done(err);
          }
        } else {
          try {
            this[event]();
            done();
          } catch (err) {
            done(err);
          }
        }
      } else {
        done();
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

    _preInit(sandbox) { //embedInSandbox
      this.core = new InjectionCore();
      this.core.use([Util, Mvc, EJS, Dom, Cookies]);

      //this._mediator.cascadeChannels = true;
      this.eventHub = new Mediator();
      this.boundElements = this.boundElements || [];
      //if (jQuery == null) {
      //throw "jQuery  not found"
      //}
      this.$ = $;
      $.hyperjs = true;

      this._registerComponents(); //init?

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
    }

    init(options, done) {
      this.props = options || {};
      let errors = [];

      let tasks = [
        (next) => {
          this._onEvent('onPreInit', next);
        },
        (next) => {
          this.core.boot(() => {
            this._onEvent('onBoot', next);
          });
        },
        (next) => {
          this.id = `component-${this.core.uniqueId()}`;
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
          this.id = `component-${this.core.uniqueId()}`;
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

      util.runSeries(tasks, (err) => {
        if (err != null) {
          errors = err;
        }
        this._onEvent('onInit', (err2) => {
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
          this._onEvent('onDestroy', next);
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
        const rand = this.core.uniqueId();
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