(function() {
  var plugin,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  plugin = function(core, options) {
    var $, Container, HyperApp, Page, channels, getBuildPath, getModPath, getViewport, skelMod, _createCore;
    if (options == null) {
      options = {};
    }
    $ = core.$;
    if (core.loadCss == null) {
      console.warn("'HyperApp' plugin requires loadcss plugin");
    }
    getViewport = function() {
      var h, w;
      w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      return {
        width: w,
        height: h,
        isMobile: w <= 480
      };
    };
    core.getViewport = getViewport;
    core.isMobile = getViewport().isMobile;
    if (core.loadCss == null) {
      core.loadCss = function() {};
      core.unloadCss = function() {};
    }
    skelMod = function() {};
    ({
      init: function() {},
      destroy: function() {}
    });
    getBuildPath = function(config, path, main) {
      var release;
      if (main == null) {
        main = '/main.js';
      }
      release = config["release"];
      return "" + local + "/" + path + main;
    };
    getModPath = function(config, path, main) {
      if (main == null) {
        main = '/main.js';
      }
      return "" + config + "/" + path;
    };
    _createCore = function(obj, options, done) {
      var SubSandbox, p, plugins, subCore, _i, _j, _len, _len1, _ref, _ref1;
      if (done == null) {
        done = function() {};
      }
      subCore = new core.constructor;
      subCore.Sandbox = SubSandbox = (function(_super) {
        __extends(SubSandbox, _super);

        function SubSandbox() {
          return SubSandbox.__super__.constructor.apply(this, arguments);
        }

        return SubSandbox;

      })(core.Sandbox);
      subCore._pages = {};
      subCore.config = options;
      if (core.util) {
        subCore.util = core.util;
      }
      plugins = [];
      options.inherit = options.inherit || false;
      if (options.inherit) {
        _ref = core._plugins;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          p = _ref[_i];
          plugins.push({
            plugin: p.creator,
            options: p.options
          });
        }
      }
      if (options.use instanceof Array) {
        _ref1 = options.use;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          p = _ref1[_j];
          plugins.push(p);
        }
      } else if (typeof options.use === "function") {
        plugins.push(options.use);
      }
      subCore.use(plugins).boot(function(err) {
        if (err) {
          return done(err);
        }
        return done;
      });
      return subCore;
    };
    channels = {
      'CHANNEL_URL_CHANGE': "page/change/url",
      'CHANNEL_QUERY_CHANGE': "page/change/query",
      'CHANNEL_STATE_CHANGE': "page/change/state",
      'CHANNEL_PJAX_SUCCESS': "pjax:success"
    };
    if (options.channels) {
      mix(options.channels, channels, true);
    }
    Container = (function() {
      function Container(id, options, force) {
        if (force == null) {
          force = false;
        }
        this._id = id;
        this._data = options;
        this._uid = this._generateId(force);
        this._type = options.type || 'component';
        this._isWrap = false;
        core.mixin(this._data, {
          active: true,
          createdat: Date.now()
        });
        this._ref = this._create();
      }

      Container.prototype._create = function() {
        var c, key, value, _ref;
        if (!this._preexists()) {
          c = this._exits() ? this._id : document.createElement("div");
          c.setAttribute('id', this._uid);
          _ref = this._data;
          for (key in _ref) {
            value = _ref[key];
            c.setAttribute("data-" + key, "" + value);
          }
        }
        return c;
      };

      Container.prototype.destroy = function() {
        if (this._isWrap) {
          return $(this._child).unwrap();
        } else {
          return this.remove;
        }
      };

      Container.prototype._preexists = function() {
        return document.getElementById(this._uid) != null;
      };

      Container.prototype._refreshRef = function() {
        this._ref = document.getElementById(this._uid);
        return this._ref;
      };

      Container.prototype._exits = function() {
        return typeof this._id === 'object';
      };

      Container.prototype._generateId = function(force) {
        if (force == null) {
          force = false;
        }
        if (!this._exits()) {
          if (force) {
            return this._id;
          } else {
            return this._id + "-" + core.uniqueId();
          }
        } else {
          return "container" + "-" + core.uniqueId();
        }
      };

      Container.prototype.update = function(name, value) {
        return this._ref.setAttribute("data-" + name, value);
      };

      Container.prototype.getDomId = function() {
        return this._ref.id;
      };

      Container.prototype.html = function(html) {
        return $(this._ref).html(html);
      };

      Container.prototype.find = function(s) {
        return $(this._ref).find(s);
      };

      Container.prototype.insert = function(parent, prepend) {
        if (prepend == null) {
          prepend = false;
        }
        if (typeof parent === "boolean") {
          prepend = parent;
          parent = void 0;
        }
        this._parent = parent || document.getElementsByTagName("body")[0];
        if (prepend) {
          this._parent.insertBefore(this._ref, this._parent.firstChild);
        } else {
          this._parent.appendChild(this._ref);
        }
        return this._refreshRef();
      };

      Container.prototype.place = function(el, before) {
        if (before == null) {
          before = 'true';
        }
        $(this._ref)[(before ? 'insertBefore' : 'insertAfter')](el);
        return this._refreshRef();
      };

      Container.prototype.wrap = function(child) {
        this._child = child;
        $(child).wrap(this._ref);
        this._isWrap = true;
        return this._refreshRef();
      };

      Container.prototype.remove = function() {
        var el;
        el = this._ref;
        return el && el.parentNode && el.parentNode.removeChild(el);
      };

      Container.prototype.reset = function() {
        return this._ref.innerHTML = '';
      };

      Container.prototype.get = function() {
        return this._ref;
      };

      Container.prototype.fade = function(type, cb) {
        if (cb == null) {
          cb = function() {};
        }
        type = type.toLowerCase() === 'out' ? 'Out' : 'In';
        return $(this._ref)["fade" + type]({
          done: function() {
            return cb();
          }
        });
      };

      Container.prototype.show = function() {
        return this._ref.style.display = 'block';
      };

      Container.prototype.hide = function() {
        return this._ref.style.display = 'none';
      };

      Container.prototype.addClass = function(c) {
        return this._ref.className(c);
      };

      Container.getBlock = function(id) {
        return document.getElementById(id);
      };

      return Container;

    })();
    Page = (function(_super) {
      __extends(Page, _super);

      function Page(options, ready) {
        if (ready == null) {
          ready = function() {};
        }
        this._core = options.core || core;
        this._instanceId = options.id + "-" + core.uniqueId();
        Page.__super__.constructor.call(this, this._instanceId, {
          url: '',
          type: "page",
          createdat: Date.now()
        });
        if (this._core.HyperModel != null) {
          this._model = new this._core.HyperModel({});
        }
        this._options = options;
        this._fadeIn = true;
        this._historyState = this._options.historyState;
        this._builds = this._options.builds || [];
        this._stylesheets = this._options.stylesheets || [];
        this._parent = this._options.parent;
        this._content = this._options.html;
        this._fullPage = this._options.fullPage;
        this._modules = options.page.modules != null ? options.page.modules : [];
        this._appModules = [];
        this._isProd = this._core.config.production;
        this._config = this._core.config;
        this._running = {};
        this._cache = {};
        this._started = false;
        this._paused = false;
        this._pageRef = this._ref;
        this.hide();
        this.insert(this._parent);
        if (this._content != null) {
          this.html(this._content);
        }
        this._findComponents();
        this._register(this._modules, this._builds, (function(_this) {
          return function() {
            return _this._register(_this._appModules, [], ready);
          };
        })(this));
      }

      Page.prototype._register = function(modules, builds, cb) {
        var getBuilds, getModules, tasks;
        if (cb == null) {
          cb = function() {};
        }
        getBuilds = (function(_this) {
          return function(next) {
            var paths;
            paths = builds.map(function(build) {
              return _this._config["appDir"] + "/" + build;
            });
            return require(paths, function() {
              var args;
              args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
              next();
            });
          };
        })(this);
        getModules = (function(_this) {
          return function(next) {
            var paths;
            paths = modules.map(function(module) {
              return module.path;
            });
            return require(paths, function() {
              var args, i, id, _i, _ref;
              args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
              for (i = _i = 0, _ref = modules.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
                id = modules[i].name + "-" + _this._core.uniqueId();
                modules[i].id = id;
                _this._core.register(id, args[i]);
              }
              return next();
            }, function(err) {
              console.error(err);
              return next();
            });
          };
        })(this);
        tasks = [getModules];
        if (this._isProd) {
          tasks.unshift(getBuilds);
        }
        return core.util.runSeries(tasks, cb, true);
      };

      Page.prototype._possibleModules = function() {
        var id, key, mods, module, modules, _ref;
        modules = [];
        _ref = this._options.components;
        for (key in _ref) {
          module = _ref[key];
          if (key.contains("!")) {
            mods = this._prefixModules(key, module);
            modules = modules.concat(mods);
          } else {
            id = key;
            module.prepend = false;
            module.hid = id;
            modules.push(module);
          }
        }
        return modules;
      };

      Page.prototype._prefixModules = function(key, module) {
        var i, modules, s, _i, _ref;
        modules = [];
        s = key.split("!");
        if (!(module instanceof Array)) {
          module = [module];
        }
        for (i = _i = 0, _ref = module.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          module[i].prepend = s[0] === 'before';
          module[i].insert = true;
          module[i].hid = s[1];
          modules.push(module[i]);
        }
        return modules;
      };

      Page.prototype._findComponents = function() {
        var apps, i, id, mods, module, modules, _i, _ref, _results;
        modules = this._possibleModules();
        mods = this._modules;
        apps = this._appModules;
        _results = [];
        for (i = _i = 0, _ref = modules.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          module = modules[i];
          id = module.hid;
          if (id.contains('*')) {
            module.insert = true;
            _results.push(apps.push(module));
          } else if ($(this._pageRef).find("#" + id).length) {
            mods.push(module);
            if (module.builds != null) {
              _results.push(this._builds = this._builds.concat(module.builds));
            } else {
              _results.push(void 0);
            }
          } else if (this._fullPage && $("#" + id).length) {
            _results.push(apps.push(module));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      };

      Page.prototype._createComponent = function() {};

      Page.prototype._destroyComponent = function() {};

      Page.prototype._fireReady = function() {
        return this._core.emit("page/ready", this._options);
      };

      Page.prototype._startComponents = function(modules, domref, done) {
        var e, taskLoadCss, taskStart;
        if (done == null) {
          done = function() {};
        }
        options = {
          page: this._options
        };
        try {
          taskStart = (function(_this) {
            return function(next) {
              return _this._startModules(modules, domref, options, next);
            };
          })(this);
          taskLoadCss = (function(_this) {
            return function(next) {
              return _this._loadCss(modules, next);
            };
          })(this);
          return core.util.runParallel([taskStart, taskLoadCss], done, true);
        } catch (_error) {
          e = _error;
          return done(e);
        }
      };

      Page.prototype._createComponentContainer = function(module, ref) {
        var container, data, hid, id, modRef;
        data = {
          name: module.name,
          type: "component",
          createdat: Date.now()
        };
        id = module.id;
        hid = module.hid;
        container = new Container(id, data, true);
        module.container = container;
        if (hid != null) {
          modRef = Container.getBlock(hid);
          if (module.insert == null) {
            container.wrap(modRef);
          } else {
            container.place((hid === '*' ? ref : modRef), module.prepend);
          }
        } else {
          container.insert(this._parent);
        }
        return container;
      };

      Page.prototype._stopModules = function(modules, done) {
        var stopAction;
        if (done == null) {
          done = function() {};
        }
        stopAction = (function(_this) {
          return function(m, next) {
            return _this._core.stop(m.id, function() {
              m.container.destroy();
              m.container = null;
              return next();
            });
          };
        })(this);
        return core.util.doForAll(modules, stopAction, done, true);
      };

      Page.prototype._startModules = function(modules, domref, options, done) {
        var startAction;
        if (done == null) {
          done = function() {};
        }
        startAction = (function(_this) {
          return function(m, next) {
            _this._createComponentContainer(m, domref);
            _this._setPermissions(m);
            if (m.options != null) {
              _this._core.mixin(options, m.options);
            }
            return _this._core.start(m.id, {
              options: options
            }, next);
          };
        })(this);
        return core.util.doForAll(modules, startAction, done, true);
      };

      Page.prototype._loadCss = function(modules, done) {
        var loadAction, m, stylesheets, _i, _len;
        if (done == null) {
          done = function() {};
        }
        stylesheets = [];
        for (_i = 0, _len = modules.length; _i < _len; _i++) {
          m = modules[_i];
          if (m.stylesheet) {
            stylesheets = stylesheets.concat(m.stylesheet);
          }
        }
        loadAction = (function(_this) {
          return function(stylesheet, next) {
            return _this._core.loadCss(_this._options.root + stylesheet + "?version=" + _this._options.version, next);
          };
        })(this);
        return core.util.doForAll(stylesheets, loadAction, done, true);
      };

      Page.prototype._unloadCss = function(modules) {
        var m, stylesheet, stylesheets, _i, _j, _len, _len1, _results;
        stylesheets = [];
        for (_i = 0, _len = modules.length; _i < _len; _i++) {
          m = modules[_i];
          if (m.stylesheet) {
            stylesheets = stylesheets.concat(m.stylesheet);
          }
        }
        _results = [];
        for (_j = 0, _len1 = stylesheets.length; _j < _len1; _j++) {
          stylesheet = stylesheets[_j];
          _results.push(this._core.unloadCss(options.page.root + stylesheet));
        }
        return _results;
      };

      Page.prototype._showPage = function(fadeIn, cb) {
        if (cb == null) {
          cb = function() {};
        }
        this.update("active", this._started);
        if (fadeIn) {
          return this.fade("in", cb);
        } else {
          return this.show();
        }
      };

      Page.prototype.start = function(opt, done) {
        var e, fadeIn, runFinished, taskAppMods, taskPageMods;
        if (opt == null) {
          opt = {};
        }
        if (done == null) {
          done = function() {};
        }
        if (this._started === true) {
          return;
        }
        fadeIn = opt.fadeIn != null ? opt.fadeIn : true;
        if (opt.html != null) {
          this._content = opt.html;
          this.html(this._content);
        }
        runFinished = function() {};
        try {
          taskAppMods = (function(_this) {
            return function(next) {
              if (_this._fullPage) {
                return _this._startComponents(_this._appModules, document.body, next);
              } else {
                return next();
              }
            };
          })(this);
          taskPageMods = (function(_this) {
            return function(next) {
              return _this._startComponents(_this._modules, _this._pageRef, function(err) {
                _this._started = true;
                _this._showPage(fadeIn, function() {
                  return _this._fireReady;
                });
                return next(err);
              });
            };
          })(this);
          core.util.runParallel([taskAppMods, taskPageMods], done, true);
        } catch (_error) {
          e = _error;
          done(e);
        }
        this._fullPage = false;
      };

      Page.prototype._setPermissions = function(module) {
        var allowed, method, _ref, _results;
        if ((this._core.permission != null) && (module.permissions != null)) {
          _ref = module.permissions;
          _results = [];
          for (method in _ref) {
            allowed = _ref[method];
            if (allowed) {
              _results.push(this._core.permission.add(module.id, method, "*"));
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        }
      };

      Page.prototype.stop = function(cb) {
        var modules, runFinished;
        if (cb == null) {
          cb = function() {};
        }
        if (this._started === true) {
          modules = this._modules.slice(0).reverse();
          runFinished = function() {};
          this._stopModules(modules, (function(_this) {
            return function(err) {
              if (err) {
                return console.log(err);
              }
            };
          })(this));
          this._unloadCss(modules);
        }
        this._started = false;
        this.update("active", this._started);
      };

      Page.prototype.pause = function() {
        this._pageRef.style.display = "none";
      };

      return Page;

    })(Container);
    HyperApp = (function(_super) {
      __extends(HyperApp, _super);

      function HyperApp(options, components, cb) {
        var done, _ref;
        if (components == null) {
          components = {};
        }
        if (cb == null) {
          cb = function() {};
        }
        done = done || function() {};
        this._started = false;
        this._options = core.clone(options);
        this._transition = options.transition != null ? options.transition : true;
        this._container = options.parent;
        this._root = options.root;
        this._version = options.version;
        this._scaffold = options.scaffold;
        this._main = options.main || ".content";
        this._appModPath = ((_ref = options.app) != null ? _ref.path : void 0) != null ? options.app.path : void 0;
        this._core = options.useSubCore ? _createCore(this, options, done) : core;
        this._body = $("body");
        this._core._mediator.installTo(this);
        this._core._pages = {};
        this._running = {};
        this._components = components;
        this._callback = cb;
        HyperApp.__super__.constructor.call(this, "app", {
          type: "app",
          name: name
        });
        if (this._scaffold != null) {
          this.wrap(this._scaffold);
        } else {
          this.insert(true);
        }
        this._core.appDomRef = this._ref;
        this._currentRoute;
        this.hide();
        this._template = {};
        this._handlers = [];
        this._buildRoutes();
      }

      HyperApp.prototype._buildRoutes = function(key) {
        var data, page, _ref, _results;
        if (key == null) {
          key = 'pages';
        }
        _ref = this._core.config[key];
        _results = [];
        for (page in _ref) {
          data = _ref[page];
          _results.push(this._route(this._core.routeToRegExp(page), data));
        }
        return _results;
      };

      HyperApp.prototype._findCache = function(page) {
        var data, matched;
        data = void 0;
        matched = this._handlers.some(function(handler) {
          if (handler.route.test(page)) {
            data = handler.callback;
            return true;
          }
        });
        return data;
      };

      HyperApp.prototype._findPage = function(page) {
        var data, matched;
        data = void 0;
        matched = this._handlers.some((function(_this) {
          return function(handler) {
            if (handler.route.test(page)) {
              data = handler.callback;
              _this.emit("page/" + handler.route, page);
              return true;
            }
          };
        })(this));
        return data;
      };

      HyperApp.prototype._route = function(route, callback) {
        return this._handlers.unshift({
          route: route,
          callback: callback
        });
      };

      HyperApp.prototype._listenStateChange = function() {
        return this.on(channels['CHANNEL_STATE_CHANGE'], (function(_this) {
          return function(data, topic) {
            var e;
            try {

            } catch (_error) {
              e = _error;
              console.log(e);
            }
          };
        })(this));
      };

      HyperApp.prototype._listenQueryChange = function() {
        return this.on(channels['CHANNEL_QUERY_CHANGE'], (function(_this) {
          return function(data, topic) {
            var $el, append, matrix, url;
            $el = $(data.historyState.element);
            matrix = data.historyState.matrix;
            append = data.historyState.append;
            url = (data.uri + "?" + data.search).replace('?', ";" + matrix + "?");
            return _this._core.hyperModel.get({
              url: url,
              success: function(res) {
                if (append) {
                  $el.find(append).after(res.contents);
                } else {
                  $el.html(res.contents);
                }
                $el.trigger("dom:updated");
                return _this.emit("page/queried", data);
              },
              error: function() {
                var args;
                args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
                location.href = data.uri;
                return console.log(args[2]);
              }
            });
          };
        })(this));
      };

      HyperApp.prototype._listenPageChange = function() {
        var _data;
        _data = {};
        return this.on(channels['CHANNEL_URL_CHANGE'], (function(_this) {
          return function(data, topic) {
            var _ref;
            if (((_ref = data.historyState) != null ? _ref.transition : void 0) == null) {
              data.transition = _this._transition;
            } else {
              data.transition = data.historyState.transition;
            }
            if (data.transition) {
              _this._stopPages();
            }
            _this.emit("page/stopped", {
              route: _this._currentRoute,
              state: data
            });
            data.uri = data.uri != null ? data.uri : "";
            _this._setCurrentRoute(data.uri);
            _data = data;
            if ((data.html == null) && !data.load && data.pushState) {
              return _this._core.hyperModel.get({
                url: data.source,
                success: function(data) {
                  _data.html = data.contents;
                  return _this._changePage(_data);
                },
                error: function() {
                  var args;
                  args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
                  if (args[2] !== 'abort') {
                    location.href = data.uri;
                  }
                  return console.log(args[2]);
                }
              });
            } else if (data.load) {
              _data.html = _this._template.main.innerHTML;
              _this._template.main.innerHTML = '';
              return _this._changePage(_data);
            } else {
              return _this._changePage(_data);
            }
          };
        })(this));
      };

      HyperApp.prototype._stopListening = function() {
        return this.off();
      };

      HyperApp.prototype._hideBody = function() {
        return this._body.hide();
      };

      HyperApp.prototype._showBody = function(cb) {
        if (cb == null) {
          cb = function() {};
        }
        return cb();
      };

      HyperApp.prototype._fireReady = function() {
        return this._core.emit("/app/ready", this._options);
      };

      HyperApp.prototype._createComponent = function(comp, name) {
        var component;
        if (name == null) {
          name = 'component';
        }
        component = new Container(name, {
          type: "component",
          mode: "auto",
          component: comp
        });
        this._components[comp] = component;
        return component;
      };

      HyperApp.prototype._setInitalLayout = function(html, cb) {
        if (cb == null) {
          cb = function() {};
        }
        if (html != null) {
          this.html(html);
          cb();
        } else {
          return cb();
        }
      };

      HyperApp.prototype._setCurrentRoute = function(url) {
        var uri;
        uri = url != null ? url.replace("/" + this._root, "") : void 0;
        uri = uri[0] === '/' ? uri.split('/').slice(1).join("/") : uri;
        return this._currentRoute = (uri != null) && uri.length ? uri : this._core.config.home;
      };

      HyperApp.prototype._loadPage = function(data, cb) {
        var page;
        if (cb == null) {
          cb = function() {};
        }
        options = {
          root: this._root,
          page: this._findPage(this._currentRoute) || {
            "nojs": true
          },
          state: data,
          html: data.html,
          parent: this._template.main,
          id: this._currentRoute,
          core: this._core,
          components: this._options.components,
          fullPage: data.load || false,
          version: this._version
        };
        page = this._core._pages[this._currentRoute];
        if (page == null) {
          page = this._core._pages[this._currentRoute] = new Page(options, (function(_this) {
            return function() {
              return page.start({
                fadeIn: data.transition
              }, function(err) {
                if (!data.transition) {
                  _this._stopOthers(_this._currentRoute);
                }
                return cb(page, err);
              });
            };
          })(this));
        } else {
          page.start({
            html: data.html,
            fadeIn: data.transition
          }, (function(_this) {
            return function(err) {
              if (!data.transition) {
                _this._stopOthers(_this._currentRoute);
              }
              return cb(page, err);
            };
          })(this));
        }
        document.title = options.title != null ? options.title : this._currentRoute;
        return this._addPageClasses();
      };

      HyperApp.prototype._addPageClasses = function() {
        var c, classes, pathArray, root, temp, _i, _len;
        root = this._root.replace("/", "");
        pathArray = this._currentRoute.replace(root, "").split('/');
        classes = [];
        temp = '';
        for (_i = 0, _len = pathArray.length; _i < _len; _i++) {
          c = pathArray[_i];
          if (c.length > 0) {
            temp = "" + temp + "-" + c;
            classes.push(temp.slice(1));
          }
        }
        classes.push(root.replace("/", ""));
        this._ref.className = classes.join(' ');
        return document.body.className = classes.join(' ');
      };

      HyperApp.prototype._changePage = function(data) {
        var e;
        try {
          this._loadPage(data, (function(_this) {
            return function(page, err) {
              if (err) {
                console.log(err);
              }
              _this._showBody(function() {
                return _this._fireReady();
              });
              _this.emit("page/started", {
                route: _this._currentRoute,
                state: data,
                page: page
              });
              if (data.pushState && data.hash.length > 0) {
                return _this.emit('hash', data.hash);
              }
            };
          })(this));
        } catch (_error) {
          e = _error;
          console.log(e);
        }
      };

      HyperApp.prototype._startComponents = function() {
        if (this._core.domStart != null) {
          return this._core.domStart();
        } else {
          return console.warn("The 'DomStart' plugin is not present. Embedded components cannot be initialized");
        }
      };

      HyperApp.prototype._stopComponents = function() {
        var component, key, _ref, _results;
        if (this._core.domStart != null) {
          this._core.domStop();
        }
        _ref = this._components;
        _results = [];
        for (key in _ref) {
          component = _ref[key];
          component.update('started', 'false');
          _results.push(component.remove());
        }
        return _results;
      };

      HyperApp.prototype.isStarted = function() {
        return this._started;
      };

      HyperApp.prototype.start = function(opts, cb) {
        var e;
        if (cb == null) {
          cb = function() {};
        }
        if (typeof opts === "function") {
          cb = opts;
          opts = false;
        }
        if (this._started === true) {
          cb();
          return;
        }
        try {
          this._setInitalLayout(opts.html, (function(_this) {
            return function() {
              _this._setMain();
              _this.show();
              _this._startComponents();
              _this._listenPageChange();
              _this._listenQueryChange();
              _this._started = true;
              cb(null, true);
              return _this._core.setPage(location.href, true);
            };
          })(this));
        } catch (_error) {
          e = _error;
          cb(e);
        }
      };

      HyperApp.prototype._setMain = function() {
        this._template.main = $(document.body).find(this._main).get(0);
      };

      HyperApp.prototype.state = function(data, hash) {
        var type;
        if (hash == null) {
          hash = false;
        }
        type = hash ? "#" : "?";
        data = data instanceof Object ? core.serializeQs(data) : data;
        core.router.navigate(location.pathname + type + data);
        return state;
      };

      HyperApp.prototype.stop = function(remove) {
        if (remove == null) {
          remove = true;
        }
        if (this._started === true) {
          this.off(channels['CHANNEL_URL_CHANGE']);
          this._stopPages(remove);
          this._core._pages = {};
          this._stopComponents();
          this._stopListening();
          if (remove) {
            this.hide();
            this.reset();
          }
          return this._started = false;
        }
      };

      HyperApp.prototype._stopPages = function(remove) {
        var k, pages, v, _results;
        if (remove == null) {
          remove = false;
        }
        pages = this._core._pages;
        _results = [];
        for (k in pages) {
          v = pages[k];
          _results.push(this._stopPage(v, remove));
        }
        return _results;
      };

      HyperApp.prototype._stopOthers = function(route, remove) {
        var k, pages, v, _results;
        if (remove == null) {
          remove = false;
        }
        pages = this._core._pages;
        _results = [];
        for (k in pages) {
          v = pages[k];
          if (k !== route) {
            _results.push(this._stopPage(v, remove));
          }
        }
        return _results;
      };

      HyperApp.prototype._stopPage = function(page, remove) {
        if (remove == null) {
          remove = false;
        }
        page.stop();
        if (remove) {
          page.remove();
          page = null;
        } else {
          page.hide();
          page.reset();
        }
      };

      HyperApp.prototype.destroy = function() {};

      return HyperApp;

    })(Container);
    core.HyperApp = HyperApp;
    core.Container = Container;
    core.HyperPage = Page;
    core.restart = function(id, opt, cb) {
      var start, stop;
      if (opt == null) {
        opt = {};
      }
      if (cb == null) {
        cb = function() {};
      }
      if (typeof opt === 'function') {
        cb = opt;
        opt = {};
      }
      stop = function(next) {
        return core.stop(id, next);
      };
      start = function(next) {
        return core.start(id, opt, next);
      };
      return core.util.runSeries([stop, start], cb, true);
    };
    return {
      init: function(sb) {
        sb.config = core.config || {};
        sb.Container = Container;
        return sb.ready = function(cb) {
          var dfd;
          if (cb == null) {
            cb = function() {};
          }
          dfd = core.Deferred();
          core.on(["app/ready", "page/ready"], function() {
            setTimeout((function() {
              cb();
              dfd.resolve();
            }), 1);
          });
          return dfd.promise();
        };
      },
      destroy: function(sb) {
        return delete sb.config;
      }
    };
  };

  module.exports = plugin;

}).call(this);
