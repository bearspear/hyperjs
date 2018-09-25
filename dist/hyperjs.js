define("hyperjs", [], function() { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.$ = exports.util = exports.inject = exports.error = undefined;
	
	var _bootstrap = __webpack_require__(1);
	
	Object.keys(_bootstrap).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _bootstrap[key];
	    }
	  });
	});
	
	var _core = __webpack_require__(3);
	
	Object.keys(_core).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _core[key];
	    }
	  });
	});
	
	var _mediator = __webpack_require__(4);
	
	Object.keys(_mediator).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _mediator[key];
	    }
	  });
	});
	
	var _component = __webpack_require__(19);
	
	Object.keys(_component).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _component[key];
	    }
	  });
	});
	
	var _hypermodel = __webpack_require__(20);
	
	Object.keys(_hypermodel).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _hypermodel[key];
	    }
	  });
	});
	
	var _router = __webpack_require__(21);
	
	Object.keys(_router).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _router[key];
	    }
	  });
	});
	
	var _component2 = __webpack_require__(8);
	
	Object.keys(_component2).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _component2[key];
	    }
	  });
	});
	
	var _rootListener = __webpack_require__(36);
	
	Object.keys(_rootListener).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _rootListener[key];
	    }
	  });
	});
	
	var _javascriptDecorators = __webpack_require__(37);
	
	Object.defineProperty(exports, 'error', {
	  enumerable: true,
	  get: function get() {
	    return _javascriptDecorators.trycatch;
	  }
	});
	
	var _aureliaDependencyInjection = __webpack_require__(16);
	
	Object.defineProperty(exports, 'inject', {
	  enumerable: true,
	  get: function get() {
	    return _aureliaDependencyInjection.inject;
	  }
	});
	
	var _jquery = __webpack_require__(7);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _utils = __webpack_require__(5);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.util = _utils2.default;
	exports.$ = _jquery2.default;
	
	//window.$ = $;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.createAppCore = createAppCore;
	exports.bootstrap = bootstrap;
	
	var _injection = __webpack_require__(2);
	
	//import { HyperComponent } from './decorators/component';
	
	var core = new _injection.InjectionCore();
	
	function ready(global) {
	    return new Promise(function (resolve, reject) {
	        if (global.document.readyState === 'complete') {
	            resolve(global.document);
	        } else {
	            global.document.addEventListener('DOMContentLoaded', completed);
	            global.addEventListener('load', completed);
	        }
	
	        function completed() {
	            global.document.removeEventListener('DOMContentLoaded', completed);
	            global.removeEventListener('load', completed);
	            resolve(global.document);
	        }
	    });
	}
	
	function startApp(rootComponent, rootNode, options) {
	    core.register('app-root', rootComponent);
	    core.start('app-root', rootNode, function (err) {
	        if (err) {
	            console.error(err);
	        } else {
	            console.log(core);
	            console.log('bootstrapped');
	        }
	    });
	    return core;
	}
	
	function createAppCore() {
	    var sandbox = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Sandbox;
	
	    return new _injection.InjectionCore();
	}
	
	function bootstrap(rootComponent, rootNode, options) {
	    if (typeof options === 'string') {
	        //assume url
	    }
	
	    return ready(window).then(function (doc) {
	        var app = startApp(rootComponent, rootNode, options);
	        window.app = app;
	        app.restart = function () {
	            app.start('app-root', rootNode);
	        };
	        // setTimeout(() => {
	        //     app.stop();
	        // }, 5000);
	
	        // setTimeout(() => {
	        //     app.start('app-root', rootNode);
	        // }, 20000);
	    });
	}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.InjectionCore = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _core = __webpack_require__(3);
	
	var _sandbox = __webpack_require__(6);
	
	var _component = __webpack_require__(8);
	
	var _aureliaDependencyInjection = __webpack_require__(16);
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	//import { container } from 'needlepoint';
	
	
	var A = function A() {
	    _classCallCheck(this, A);
	};
	
	var InjectionCore = exports.InjectionCore = function (_Core) {
	    _inherits(InjectionCore, _Core);
	
	    function InjectionCore() {
	        _classCallCheck(this, InjectionCore);
	
	        return _possibleConstructorReturn(this, (InjectionCore.__proto__ || Object.getPrototypeOf(InjectionCore)).call(this, _sandbox.Sandbox));
	    }
	
	    _createClass(InjectionCore, [{
	        key: '_resolveInstance',
	        value: function _resolveInstance(creator, sb) {
	            if (creator.isComponent) {
	                creator = (0, _component.createHyperComponent)(creator);
	            } else {
	                return new Error("not component class");
	            }
	
	            var container = new _aureliaDependencyInjection.Container();
	            return container.get(creator);
	        }
	
	        // updated to accommodate an injector
	
	    }, {
	        key: '_createInstance',
	        value: function _createInstance(moduleId, o, cb) {
	            var _this2 = this;
	
	            var id = o.instanceId || moduleId;
	            var opt = o.options || o.props;
	
	            var module = this._modules[moduleId];
	
	            if (this._instances[id]) {
	                return cb(this._instances[id]);
	            }
	
	            var iOpts = {};
	            var iterable = [module.options, opt];
	            for (var i = 0; i < iterable.length; i++) {
	                var obj = iterable[i];
	                if (obj) {
	                    for (var key in obj) {
	                        var val = obj[key];if (iOpts[key] == null) {
	                            iOpts[key] = val;
	                        }
	                    }
	                }
	                iOpts['domNode'] = iOpts['domNode'] || o.domNode;
	            }
	
	            var _Sandbox = typeof o.sandbox === 'function' ? o.sandbox : this.Sandbox;
	            var sb = new _Sandbox(this, id, iOpts, moduleId);
	
	            return this._runSandboxPlugins('init', sb, function (err) {
	                var instance = _this2._resolveInstance(module.creator, sb);
	                if (typeof instance._preInit === "function") {
	                    instance._preInit(sb);
	                } else {}
	
	                if (typeof instance.init !== "function") {
	                    return cb(new Error("module has no 'init' method"));
	                }
	                _this2._instances[id] = instance;
	                _this2._sandboxes[id] = sb;
	                return cb(null, instance, iOpts);
	            });
	        }
	    }]);
	
	    return InjectionCore;
	}(_core.Core);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Core = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /*
	                                                                                                                                                                                                                                                                               * decaffeinate suggestions:
	                                                                                                                                                                                                                                                                               * DS101: Remove unnecessary use of Array.from
	                                                                                                                                                                                                                                                                               * DS102: Remove unnecessary code created because of implicit returns
	                                                                                                                                                                                                                                                                               * DS205: Consider reworking code to avoid use of IIFEs
	                                                                                                                                                                                                                                                                               * DS206: Consider reworking classes to avoid initClass
	                                                                                                                                                                                                                                                                               * DS207: Consider shorter variations of null checks
	                                                                                                                                                                                                                                                                               * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
	                                                                                                                                                                                                                                                                               */
	
	var _mediator = __webpack_require__(4);
	
	var _utils = __webpack_require__(5);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var checkType = function checkType(type, val, name) {
	  if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) !== type) {
	    return name + ' has to be a ' + type;
	  }
	};
	
	var Core = exports.Core = function () {
	  _createClass(Core, null, [{
	    key: 'initClass',
	    value: function initClass() {
	
	      // define dummy logger
	      this.prototype.log = {
	        error: function error() {},
	        log: function log() {},
	        info: function info() {},
	        warn: function warn() {},
	        enable: function enable() {}
	      };
	    }
	  }]);
	
	  function Core(Sandbox) {
	    _classCallCheck(this, Core);
	
	    // define private variables
	
	    this.Sandbox = Sandbox;
	    this._modules = {};
	    this._plugins = [];
	    this._instances = {};
	    this._sandboxes = {};
	    this._running = {};
	    this._mediator = new _mediator.Mediator(this);
	
	    // define public variables
	
	    this.Mediator = _mediator.Mediator;
	    if (this.Sandbox == null) {
	      this.Sandbox = function (core, instanceId, options, moduleId) {
	        this.instanceId = instanceId;
	        if (options == null) {
	          options = {};
	        }
	        this.options = options;
	        this.moduleId = moduleId;
	        core._mediator.installTo(this);
	        return this;
	      };
	    }
	  }
	
	  // register a module
	
	
	  _createClass(Core, [{
	    key: 'register',
	    value: function register(id, creator, options) {
	      if (options == null) {
	        options = {};
	      }
	      var err = checkType("string", id, "module ID") || checkType("function", creator, "creator") || checkType("object", options, "option parameter");
	      if (err) {
	        this.log.error('could not register module \'' + id + '\': ' + err);
	        return this;
	      }
	
	      if (id in this._modules) {
	        this.log.warn('module ' + id + ' was already registered');
	        return this;
	      }
	
	      this._modules[id] = { creator: creator, options: options, id: id };
	      return this;
	    }
	
	    // start a module
	
	  }, {
	    key: 'start',
	    value: function start(moduleId, opt, cb) {
	      var _this = this;
	
	      var node = void 0;
	      if (opt == null) {
	        opt = {};
	      }
	      if (cb == null) {
	        cb = function cb() {};
	      }
	      if (arguments.length === 0) {
	        return this._startAll();
	      }
	      if (moduleId instanceof Array) {
	        return this._startAll(moduleId, opt);
	      }
	      if (typeof moduleId === "function") {
	        return this._startAll(null, moduleId);
	      }
	      if (typeof opt === "function") {
	        cb = opt;opt = {};
	      }
	      if (opt instanceof HTMLElement) {
	        node = opt;opt = {};
	      }
	
	      var e = checkType("string", moduleId, "module ID") || checkType("object", opt, "second parameter") || (!this._modules[moduleId] ? "module doesn't exist" : undefined);
	
	      if (e) {
	        return this._startFail(e, cb);
	      }
	
	      var id = opt.instanceId || moduleId;
	      if (node != null) {
	        opt.domNode = node;
	      }
	
	      if (this._running[id] === true) {
	        return this._startFail(new Error("module was already started"), cb);
	      }
	
	      var initInst = function initInst(err, instance, opt) {
	        if (err) {
	          return _this._startFail(err, cb);
	        }
	        try {
	          if (_utils2.default.hasArgument(instance.init, 2)) {
	            // the module wants to init in an asynchronous way
	            // therefore define a callback
	            return instance.init(opt, function (err) {
	              if (!err) {
	                _this._running[id] = true;
	              }
	              return cb(err);
	            });
	          } else {
	            // call the callback directly after initialisation
	            instance.init(opt);
	            _this._running[id] = true;
	            return cb();
	          }
	        } catch (e) {
	          return _this._startFail(e, cb);
	        }
	      };
	
	      return this.boot(function (err) {
	        if (err) {
	          return _this._startFail(err, cb);
	        }
	        return _this._createInstance(moduleId, opt, initInst);
	      });
	    }
	  }, {
	    key: '_startFail',
	    value: function _startFail(e, cb) {
	      this.log.error(e);
	      cb(new Error('could not start module: ' + e.message));
	      return this;
	    }
	  }, {
	    key: '_createInstance',
	    value: function _createInstance(moduleId, o, cb) {
	      var _this2 = this;
	
	      var id = o.instanceId || moduleId;
	      var opt = o.options;
	
	      var module = this._modules[moduleId];
	
	      if (this._instances[id]) {
	        return cb(this._instances[id]);
	      }
	
	      var iOpts = {};
	      var _arr = [module.options, opt];
	      for (var _i = 0; _i < _arr.length; _i++) {
	        var obj = _arr[_i];
	        if (obj) {
	          for (var key in obj) {
	            var val = obj[key];if (iOpts[key] == null) {
	              iOpts[key] = val;
	            }
	          }
	          iOpts['domNode'] = o.domNode;
	        }
	      }
	
	      var Sandbox = typeof o.sandbox === 'function' ? o.sandbox : this.Sandbox;
	
	      var sb = new Sandbox(this, id, iOpts, moduleId);
	
	      return this._runSandboxPlugins('init', sb, function (err) {
	        var instance = new module.creator(sb);
	        if (typeof instance.init !== "function") {
	          return cb(new Error("module has no 'init' method"));
	        }
	        _this2._instances[id] = instance;
	        _this2._sandboxes[id] = sb;
	        return cb(null, instance, iOpts);
	      });
	    }
	  }, {
	    key: '_runSandboxPlugins',
	    value: function _runSandboxPlugins(ev, sb, cb) {
	      var tasks = Array.from(this._plugins).filter(function (p) {
	        return typeof (p.plugin != null ? p.plugin[ev] : undefined) === "function";
	      }).map(function (p) {
	        return function (p) {
	          var fn = p.plugin[ev];
	          return function (next) {
	            if (_utils2.default.hasArgument(fn, 3)) {
	              return fn(sb, p.options, next);
	            } else {
	              fn(sb, p.options);
	              return next();
	            }
	          };
	        }(p);
	      });
	      return _utils2.default.runSeries(tasks, cb, true);
	    }
	  }, {
	    key: '_startAll',
	    value: function _startAll(mods, cb) {
	      var _this3 = this;
	
	      //if (mods == null) { mods = m; }
	      if (mods == null) {
	        mods = function () {
	          var _results = [];
	          for (var m in this._modules) {
	            _results.push(m);
	          }
	          return _results;
	        }.call(this);
	      }
	
	      var startAction = function startAction(m, next) {
	        return _this3.start(m, _this3._modules[m].options, next);
	      };
	
	      var done = function done(err) {
	        var e = void 0;
	        if ((err != null ? err.length : undefined) > 0) {
	          var mdls = function () {
	            var result = [];
	            for (var i = 0; i < err.length; i++) {
	              var x = err[i];
	              if (x != null) {
	                result.push('\'' + mods[i] + '\'');
	              }
	            }
	            return result;
	          }();
	          e = new Error('errors occoured in the following modules: ' + mdls);
	        }
	        return typeof cb === 'function' ? cb(e) : undefined;
	      };
	      _utils2.default.doForAll(mods, startAction, done, true);
	      return this;
	    }
	  }, {
	    key: 'stop',
	    value: function stop(id, cb) {
	      var _this4 = this;
	
	      var instance = void 0;
	      if (cb == null) {
	        cb = function cb() {};
	      }
	      if (arguments.length === 0 || typeof id === "function") {
	        _utils2.default.doForAll(function () {
	          var result = [];
	          for (var x in _this4._instances) {
	            result.push(x);
	          }
	          return result;
	        }(), function () {
	          return this.stop.apply(this, arguments);
	        }.bind(this), id, true);
	      } else if (instance = this._instances[id]) {
	
	        delete this._instances[id];
	
	        this._mediator.off(instance);
	        this._runSandboxPlugins('destroy', this._sandboxes[id], function (err) {
	          // if the module wants destroy in an asynchronous way
	          if (_utils2.default.hasArgument(instance.destroy)) {
	            return instance.destroy(function (err2) {
	              delete _this4._running[id];
	              return cb(err || err2);
	            });
	          } else {
	            // else call the callback directly after stopping
	            if (typeof instance.destroy === 'function') {
	              instance.destroy();
	            }
	            delete _this4._running[id];
	            return cb(err);
	          }
	        });
	      }
	      return this;
	    }
	
	    // register a plugin
	
	  }, {
	    key: 'use',
	    value: function use(plugin, opt) {
	      if (plugin instanceof Array) {
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;
	
	        try {
	          for (var _iterator = Array.from(plugin)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var p = _step.value;
	
	            switch (typeof p === 'undefined' ? 'undefined' : _typeof(p)) {
	              case "function":
	                this.use(p);break;
	              case "object":
	                this.use(p.plugin, p.options);break;
	            }
	          }
	        } catch (err) {
	          _didIteratorError = true;
	          _iteratorError = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	              _iterator.return();
	            }
	          } finally {
	            if (_didIteratorError) {
	              throw _iteratorError;
	            }
	          }
	        }
	      } else {
	        if (typeof plugin !== "function") {
	          return this;
	        }
	        this._plugins.push({ creator: plugin, options: opt });
	      }
	      return this;
	    }
	
	    // load plugins
	
	  }, {
	    key: 'boot',
	    value: function boot(cb) {
	      var core = this;
	      var tasks = Array.from(this._plugins).filter(function (p) {
	        return p.booted !== true;
	      }).map(function (p) {
	        return function (p) {
	          if (_utils2.default.hasArgument(p.creator, 3)) {
	            return function (next) {
	              var plugin = void 0;
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
	        }(p);
	      });
	      _utils2.default.runSeries(tasks, cb, true);
	      return this;
	    }
	  }]);
	
	  return Core;
	}();
	
	Core.initClass();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Mediator = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * decaffeinate suggestions:
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * DS101: Remove unnecessary use of Array.from
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * DS102: Remove unnecessary code created because of implicit returns
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * DS205: Consider reworking code to avoid use of IIFEs
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * DS206: Consider reworking classes to avoid initClass
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * DS207: Consider shorter variations of null checks
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	var _utils = __webpack_require__(5);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Mediator = exports.Mediator = function () {
	    var _getTasks = undefined;
	    exports.Mediator = Mediator = function () {
	        _createClass(Mediator, null, [{
	            key: "initClass",
	            value: function initClass() {
	
	                _getTasks = function _getTasks(data, channel, originalChannel, ctx) {
	                    var subscribers = ctx.channels[channel] || [];
	                    return Array.from(subscribers).map(function (sub) {
	                        return function (sub) {
	                            return function (next) {
	                                try {
	                                    if (_utils2.default.hasArgument(sub.callback, 3)) {
	                                        return sub.callback.apply(sub.context, [data, originalChannel, next]);
	                                    } else {
	                                        return next(null, sub.callback.apply(sub.context, [data, originalChannel]));
	                                    }
	                                } catch (e) {
	                                    return next(e);
	                                }
	                            };
	                        }(sub);
	                    });
	                };
	            }
	        }]);
	
	        function Mediator(obj, cascadeChannels) {
	            _classCallCheck(this, Mediator);
	
	            if (cascadeChannels == null) {
	                cascadeChannels = false;
	            }
	            this.cascadeChannels = cascadeChannels;
	            this.channels = {};
	            if (obj instanceof Object) {
	                this.installTo(obj);
	            } else if (obj === true) {
	                this.cascadeChannels = true;
	            }
	        }
	
	        // ## Subscribe to a topic
	        //
	        // Parameters:
	        //
	        // - (String) topic      - The topic name
	        // - (Function) callback - The function that gets called if an other module
	        //                         publishes to the specified topic
	        // - (Object) context    - The context the function(s) belongs to
	
	
	        _createClass(Mediator, [{
	            key: "on",
	            value: function on(channel, fn, context) {
	                var _this = this;
	
	                if (context == null) {
	                    context = this;
	                }
	                if (this.channels[channel] == null) {
	                    this.channels[channel] = [];
	                }
	                var that = this;
	
	                if (channel instanceof Array) {
	                    return Array.from(channel).map(function (id) {
	                        return _this.on(id, fn, context);
	                    });
	                } else if ((typeof channel === "undefined" ? "undefined" : _typeof(channel)) === "object") {
	                    return function () {
	                        var result = [];
	                        for (var k in channel) {
	                            var v = channel[k];
	                            result.push(_this.on(k, v, fn));
	                        }
	                        return result;
	                    }();
	                } else {
	                    if (typeof channel !== "string") {
	                        return false;
	                    }
	                    var subscription = { context: context, callback: fn || function () {} };
	                    return {
	                        attach: function attach() {
	                            that.channels[channel].push(subscription);return this;
	                        },
	                        detach: function detach() {
	                            Mediator._rm(that, channel, subscription.callback);return this;
	                        },
	                        pipe: function pipe() {
	                            that.pipe.apply(that, [channel].concat(Array.prototype.slice.call(arguments)));return this;
	                        }
	                    }.attach();
	                }
	            }
	
	            // ## Unsubscribe from a topic
	            //
	            // Parameters:
	            //
	            // - (String) topic      - The topic name
	            // - (Function) callback - The function that gets called if an other module
	            //                         publishes to the specified topic
	
	        }, {
	            key: "off",
	            value: function off(ch, cb) {
	                switch (typeof ch === "undefined" ? "undefined" : _typeof(ch)) {
	                    case "string":
	                        if (typeof cb === "function") {
	                            Mediator._rm(this, ch, cb);
	                        }
	                        if (typeof cb === "undefined") {
	                            Mediator._rm(this, ch);
	                        }
	                        break;
	                    case "function":
	                        for (var id in this.channels) {
	                            Mediator._rm(this, id, ch);
	                        }break;
	                    case "undefined":
	                        for (id in this.channels) {
	                            Mediator._rm(this, id);
	                        }break;
	                    case "object":
	                        for (id in this.channels) {
	                            Mediator._rm(this, id, null, ch);
	                        }break;
	                }
	                return this;
	            }
	
	            // ## Publish an event
	            //
	            // Parameters:
	            // - (String) topic             - The topic name
	            // - (Object) data              - The data that gets published
	            // - (Funtction)                - callback method
	
	        }, {
	            key: "emit",
	            value: function emit(channel, data, cb, originalChannel) {
	
	                var chnls = void 0;
	                if (cb == null) {
	                    cb = function cb() {};
	                }
	                if (originalChannel == null) {
	                    originalChannel = channel;
	                }
	                if (typeof data === "function") {
	                    cb = data;
	                    data = undefined;
	                }
	                if (typeof channel !== "string") {
	                    return false;
	                }
	
	                var tasks = _getTasks(data, channel, originalChannel, this);
	
	                _utils2.default.runSeries(tasks, function (errors, results) {
	                    var e = void 0;
	                    if (errors) {
	                        e = new Error(function () {
	                            var result = [];
	                            var _iteratorNormalCompletion = true;
	                            var _didIteratorError = false;
	                            var _iteratorError = undefined;
	
	                            try {
	                                for (var _iterator = Array.from(errors)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                                    var x = _step.value;
	
	                                    if (x != null) {
	                                        result.push(x.message);
	                                    }
	                                }
	                            } catch (err) {
	                                _didIteratorError = true;
	                                _iteratorError = err;
	                            } finally {
	                                try {
	                                    if (!_iteratorNormalCompletion && _iterator.return) {
	                                        _iterator.return();
	                                    }
	                                } finally {
	                                    if (_didIteratorError) {
	                                        throw _iteratorError;
	                                    }
	                                }
	                            }
	
	                            return result;
	                        }().join('; '));
	                    }
	                    return cb(e);
	                }, true);
	
	                if (this.cascadeChannels && (chnls = channel.split('/')).length > 1) {
	                    var o = void 0;
	                    if (this.emitOriginalChannels) {
	                        o = originalChannel;
	                    }
	                    this.emit(chnls.slice(0, -1).join('/'), data, cb, o);
	                }
	                return this;
	            }
	
	            // ## Send a task
	            //
	            // Parameters:
	            // - (String) topic             - The topic name
	            // - (Object) data              - The data that gets published
	            // - (Function)                 - callback method
	
	        }, {
	            key: "send",
	            value: function send(channel, data, cb) {
	
	                if (cb == null) {
	                    cb = function cb() {};
	                }
	                if (typeof data === "function") {
	                    cb = data;
	                    data = undefined;
	                }
	                if (typeof channel !== "string") {
	                    return false;
	                }
	                var tasks = _getTasks(data, channel, channel, this);
	
	                _utils2.default.runFirst(tasks, function (errors, result) {
	                    if (errors) {
	                        var e = new Error(function () {
	                            var result1 = [];
	                            var _iteratorNormalCompletion2 = true;
	                            var _didIteratorError2 = false;
	                            var _iteratorError2 = undefined;
	
	                            try {
	                                for (var _iterator2 = Array.from(errors)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                                    var x = _step2.value;
	
	                                    if (x != null) {
	                                        result1.push(x.message);
	                                    }
	                                }
	                            } catch (err) {
	                                _didIteratorError2 = true;
	                                _iteratorError2 = err;
	                            } finally {
	                                try {
	                                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                                        _iterator2.return();
	                                    }
	                                } finally {
	                                    if (_didIteratorError2) {
	                                        throw _iteratorError2;
	                                    }
	                                }
	                            }
	
	                            return result1;
	                        }().join('; '));
	                        return cb(e);
	                    } else {
	                        return cb(null, result);
	                    }
	                }, true);
	                return this;
	            }
	
	            // ## Install Pub/Sub functions to an object
	
	        }, {
	            key: "installTo",
	            value: function installTo(obj) {
	                var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
	                var props = Object.getOwnPropertyNames(Mediator.prototype).filter(function (x) {
	                    return x !== 'constructor';
	                }).concat(Object.getOwnPropertyNames(this));
	                if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object") {
	                    var _iteratorNormalCompletion3 = true;
	                    var _didIteratorError3 = false;
	                    var _iteratorError3 = undefined;
	
	                    try {
	                        for (var _iterator3 = props[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                            var k = _step3.value;
	
	                            var v = this[k];
	                            if (force) {
	                                obj[k] = v;
	                            } else {
	                                if (obj[k] == null) {
	                                    obj[k] = v;
	                                }
	                            }
	                        }
	                    } catch (err) {
	                        _didIteratorError3 = true;
	                        _iteratorError3 = err;
	                    } finally {
	                        try {
	                            if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                                _iterator3.return();
	                            }
	                        } finally {
	                            if (_didIteratorError3) {
	                                throw _iteratorError3;
	                            }
	                        }
	                    }
	                }
	                //return this;
	            }
	        }, {
	            key: "pipe",
	            value: function pipe(src, target, mediator) {
	
	                if (target instanceof Mediator) {
	                    mediator = target;target = src;
	                }
	
	                if (mediator == null) {
	                    return this.pipe(src, target, this);
	                }
	
	                // prevent cycles
	                if (mediator === this && src === target) {
	                    return this;
	                }
	
	                this.on(src, function () {
	                    return mediator.emit.apply(mediator, [target].concat(Array.prototype.slice.call(arguments)));
	                });
	
	                return this;
	            }
	        }], [{
	            key: "_rm",
	            value: function _rm(o, ch, cb, ctxt) {
	                if (o.channels[ch] == null) {
	                    return;
	                }
	                return o.channels[ch] = function () {
	                    var result = [];
	                    var _iteratorNormalCompletion4 = true;
	                    var _didIteratorError4 = false;
	                    var _iteratorError4 = undefined;
	
	                    try {
	                        for (var _iterator4 = Array.from(o.channels[ch])[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	                            var s = _step4.value;
	
	                            if (cb != null ? s.callback !== cb : ctxt != null ? s.context !== ctxt : s.context !== o) {
	                                result.push(s);
	                            }
	                        }
	                    } catch (err) {
	                        _didIteratorError4 = true;
	                        _iteratorError4 = err;
	                    } finally {
	                        try {
	                            if (!_iteratorNormalCompletion4 && _iterator4.return) {
	                                _iterator4.return();
	                            }
	                        } finally {
	                            if (_didIteratorError4) {
	                                throw _iteratorError4;
	                            }
	                        }
	                    }
	
	                    return result;
	                }();
	            }
	        }]);
	
	        return Mediator;
	    }();
	    Mediator.initClass();
	    return Mediator;
	}();

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	/*
	 * decaffeinate suggestions:
	 * DS101: Remove unnecessary use of Array.from
	 * DS102: Remove unnecessary code created because of implicit returns
	 * DS103: Rewrite code to no longer use __guard__
	 * DS207: Consider shorter variations of null checks
	 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
	 */
	var fnRgx = new RegExp('function[^(]*\\(([^)]*)\\)');
	
	var argRgx = /([^\s,]+)/g;
	
	var getArgumentNames = function getArgumentNames(fn) {
	    return (__guard__(fn != null ? fn.toString().match(fnRgx) : undefined, function (x) {
	        return x[1];
	    }) || '').match(argRgx) || [];
	};
	
	// run asynchronous tasks in parallel
	var runParallel = function runParallel(tasks, cb, force) {
	    if (tasks == null) {
	        tasks = [];
	    }
	    if (cb == null) {
	        cb = function cb() {};
	    }
	    var count = tasks.length;
	    var results = [];
	
	    if (count === 0) {
	        return cb(null, results);
	    }
	
	    var errors = [];var hasErr = false;
	
	    return Array.from(tasks).map(function (t, i) {
	        return function (t, i) {
	            var next = function next(err) {
	                if (err) {
	                    errors[i] = err;
	                    hasErr = true;
	                    if (!force) {
	                        return cb(errors, results);
	                    }
	                } else {
	                    for (var _len = arguments.length, res = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	                        res[_key - 1] = arguments[_key];
	                    }
	
	                    results[i] = res.length < 2 ? res[0] : res;
	                }
	                if (--count <= 0) {
	                    if (hasErr) {
	                        return cb(errors, results);
	                    } else {
	                        return cb(null, results);
	                    }
	                }
	            };
	            try {
	                return t(next);
	            } catch (e) {
	                return next(e);
	            }
	        }(t, i);
	    });
	};
	
	// run asynchronous tasks one after another
	var runSeries = function runSeries(tasks, cb, force) {
	    if (tasks == null) {
	        tasks = [];
	    }
	    if (cb == null) {
	        cb = function cb() {};
	    }
	    var i = -1;
	    var count = tasks.length;
	    var results = [];
	    if (count === 0) {
	        return cb(null, results);
	    }
	
	    var errors = [];var hasErr = false;
	
	    var next = function next(err) {
	        if (err) {
	            errors[i] = err;
	            hasErr = true;
	            if (!force) {
	                return cb(errors, results);
	            }
	        } else {
	            if (i > -1) {
	                for (var _len2 = arguments.length, res = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	                    res[_key2 - 1] = arguments[_key2];
	                }
	
	                // first run
	                results[i] = res.length < 2 ? res[0] : res;
	            }
	        }
	        if (++i >= count) {
	            if (hasErr) {
	                return cb(errors, results);
	            } else {
	                return cb(null, results);
	            }
	        } else {
	            try {
	                return tasks[i](next);
	            } catch (e) {
	                return next(e);
	            }
	        }
	    };
	    return next();
	};
	
	// run asynchronous tasks one after another
	// and pass the argument
	var runWaterfall = function runWaterfall(tasks, cb) {
	    var i = -1;
	    if (tasks.length === 0) {
	        return cb();
	    }
	
	    var next = function next(err) {
	        if (err != null) {
	            return cb(err);
	        }
	
	        for (var _len3 = arguments.length, res = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	            res[_key3 - 1] = arguments[_key3];
	        }
	
	        if (++i >= tasks.length) {
	            return cb.apply(undefined, [null].concat(_toConsumableArray(Array.from(res))));
	        } else {
	            return tasks[i].apply(tasks, _toConsumableArray(Array.from(res)).concat([next]));
	        }
	    };
	    return next();
	};
	
	var doForAll = function doForAll(args, fn, cb, force) {
	    if (args == null) {
	        args = [];
	    }
	    var tasks = Array.from(args).map(function (a) {
	        return function (a) {
	            return function (next) {
	                return fn(a, next);
	            };
	        }(a);
	    });
	    return runParallel(tasks, cb, force);
	};
	
	function __guard__(value, transform) {
	    return typeof value !== 'undefined' && value !== null ? transform(value) : undefined;
	}
	
	function hasArgument(fn, idx) {
	    if (idx == null) {
	        idx = 1;
	    }
	    return getArgumentNames(fn).length >= idx;
	}
	
	function __guard__(value, transform) {
	    return typeof value !== 'undefined' && value !== null ? transform(value) : undefined;
	}
	
	exports.default = {
	    doForAll: doForAll,
	    runParallel: runParallel,
	    runSeries: runSeries,
	    runWaterfall: runWaterfall,
	    getArgumentNames: getArgumentNames,
	    hasArgument: hasArgument
	};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Sandbox = Sandbox;
	
	var _jquery = __webpack_require__(7);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// components are sandbox; the sandbox is the environment is appear of or can safely trust. its window and/or document object
	function Sandbox(core, instanceId, options, moduleId) {
	  var parent = core.instance;
	  this.parent = core.instance;
	  this.options = options != null ? options : {};
	
	  this.instanceId = instanceId || moduleId;
	  this.instance = options.domNode || document.getElementById(instanceId) || parent.querySelector(instanceId);
	  this.$instance = (0, _jquery2.default)(this.instance);
	
	  // if (options.html != null) {
	  //   this.html(options.html);
	  // }
	  this.moduleId = moduleId;
	  this.err = function (err) {
	    if (err) {
	      console.error(err);
	    }
	  };
	  core._mediator.installTo(this);
	  return this;
	};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * jQuery JavaScript Library v3.3.1
	 * https://jquery.com/
	 *
	 * Includes Sizzle.js
	 * https://sizzlejs.com/
	 *
	 * Copyright JS Foundation and other contributors
	 * Released under the MIT license
	 * https://jquery.org/license
	 *
	 * Date: 2018-01-20T17:24Z
	 */
	( function( global, factory ) {
	
		"use strict";
	
		if ( typeof module === "object" && typeof module.exports === "object" ) {
	
			// For CommonJS and CommonJS-like environments where a proper `window`
			// is present, execute the factory and get jQuery.
			// For environments that do not have a `window` with a `document`
			// (such as Node.js), expose a factory as module.exports.
			// This accentuates the need for the creation of a real `window`.
			// e.g. var jQuery = require("jquery")(window);
			// See ticket #14549 for more info.
			module.exports = global.document ?
				factory( global, true ) :
				function( w ) {
					if ( !w.document ) {
						throw new Error( "jQuery requires a window with a document" );
					}
					return factory( w );
				};
		} else {
			factory( global );
		}
	
	// Pass this if window is not defined yet
	} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {
	
	// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
	// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
	// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
	// enough that all such attempts are guarded in a try block.
	"use strict";
	
	var arr = [];
	
	var document = window.document;
	
	var getProto = Object.getPrototypeOf;
	
	var slice = arr.slice;
	
	var concat = arr.concat;
	
	var push = arr.push;
	
	var indexOf = arr.indexOf;
	
	var class2type = {};
	
	var toString = class2type.toString;
	
	var hasOwn = class2type.hasOwnProperty;
	
	var fnToString = hasOwn.toString;
	
	var ObjectFunctionString = fnToString.call( Object );
	
	var support = {};
	
	var isFunction = function isFunction( obj ) {
	
	      // Support: Chrome <=57, Firefox <=52
	      // In some browsers, typeof returns "function" for HTML <object> elements
	      // (i.e., `typeof document.createElement( "object" ) === "function"`).
	      // We don't want to classify *any* DOM node as a function.
	      return typeof obj === "function" && typeof obj.nodeType !== "number";
	  };
	
	
	var isWindow = function isWindow( obj ) {
			return obj != null && obj === obj.window;
		};
	
	
	
	
		var preservedScriptAttributes = {
			type: true,
			src: true,
			noModule: true
		};
	
		function DOMEval( code, doc, node ) {
			doc = doc || document;
	
			var i,
				script = doc.createElement( "script" );
	
			script.text = code;
			if ( node ) {
				for ( i in preservedScriptAttributes ) {
					if ( node[ i ] ) {
						script[ i ] = node[ i ];
					}
				}
			}
			doc.head.appendChild( script ).parentNode.removeChild( script );
		}
	
	
	function toType( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
	
		// Support: Android <=2.3 only (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	}
	/* global Symbol */
	// Defining this global in .eslintrc.json would create a danger of using the global
	// unguarded in another place, it seems safer to define global only for this module
	
	
	
	var
		version = "3.3.1",
	
		// Define a local copy of jQuery
		jQuery = function( selector, context ) {
	
			// The jQuery object is actually just the init constructor 'enhanced'
			// Need init if jQuery is called (just allow error to be thrown if not included)
			return new jQuery.fn.init( selector, context );
		},
	
		// Support: Android <=4.0 only
		// Make sure we trim BOM and NBSP
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
	
	jQuery.fn = jQuery.prototype = {
	
		// The current version of jQuery being used
		jquery: version,
	
		constructor: jQuery,
	
		// The default length of a jQuery object is 0
		length: 0,
	
		toArray: function() {
			return slice.call( this );
		},
	
		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function( num ) {
	
			// Return all the elements in a clean array
			if ( num == null ) {
				return slice.call( this );
			}
	
			// Return just the one element from the set
			return num < 0 ? this[ num + this.length ] : this[ num ];
		},
	
		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function( elems ) {
	
			// Build a new jQuery matched element set
			var ret = jQuery.merge( this.constructor(), elems );
	
			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;
	
			// Return the newly-formed element set
			return ret;
		},
	
		// Execute a callback for every element in the matched set.
		each: function( callback ) {
			return jQuery.each( this, callback );
		},
	
		map: function( callback ) {
			return this.pushStack( jQuery.map( this, function( elem, i ) {
				return callback.call( elem, i, elem );
			} ) );
		},
	
		slice: function() {
			return this.pushStack( slice.apply( this, arguments ) );
		},
	
		first: function() {
			return this.eq( 0 );
		},
	
		last: function() {
			return this.eq( -1 );
		},
	
		eq: function( i ) {
			var len = this.length,
				j = +i + ( i < 0 ? len : 0 );
			return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
		},
	
		end: function() {
			return this.prevObject || this.constructor();
		},
	
		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push: push,
		sort: arr.sort,
		splice: arr.splice
	};
	
	jQuery.extend = jQuery.fn.extend = function() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[ 0 ] || {},
			i = 1,
			length = arguments.length,
			deep = false;
	
		// Handle a deep copy situation
		if ( typeof target === "boolean" ) {
			deep = target;
	
			// Skip the boolean and the target
			target = arguments[ i ] || {};
			i++;
		}
	
		// Handle case when target is a string or something (possible in deep copy)
		if ( typeof target !== "object" && !isFunction( target ) ) {
			target = {};
		}
	
		// Extend jQuery itself if only one argument is passed
		if ( i === length ) {
			target = this;
			i--;
		}
	
		for ( ; i < length; i++ ) {
	
			// Only deal with non-null/undefined values
			if ( ( options = arguments[ i ] ) != null ) {
	
				// Extend the base object
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];
	
					// Prevent never-ending loop
					if ( target === copy ) {
						continue;
					}
	
					// Recurse if we're merging plain objects or arrays
					if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
						( copyIsArray = Array.isArray( copy ) ) ) ) {
	
						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && Array.isArray( src ) ? src : [];
	
						} else {
							clone = src && jQuery.isPlainObject( src ) ? src : {};
						}
	
						// Never move original objects, clone them
						target[ name ] = jQuery.extend( deep, clone, copy );
	
					// Don't bring in undefined values
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}
	
		// Return the modified object
		return target;
	};
	
	jQuery.extend( {
	
		// Unique for each copy of jQuery on the page
		expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),
	
		// Assume jQuery is ready without the ready module
		isReady: true,
	
		error: function( msg ) {
			throw new Error( msg );
		},
	
		noop: function() {},
	
		isPlainObject: function( obj ) {
			var proto, Ctor;
	
			// Detect obvious negatives
			// Use toString instead of jQuery.type to catch host objects
			if ( !obj || toString.call( obj ) !== "[object Object]" ) {
				return false;
			}
	
			proto = getProto( obj );
	
			// Objects with no prototype (e.g., `Object.create( null )`) are plain
			if ( !proto ) {
				return true;
			}
	
			// Objects with prototype are plain iff they were constructed by a global Object function
			Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
			return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
		},
	
		isEmptyObject: function( obj ) {
	
			/* eslint-disable no-unused-vars */
			// See https://github.com/eslint/eslint/issues/6125
			var name;
	
			for ( name in obj ) {
				return false;
			}
			return true;
		},
	
		// Evaluates a script in a global context
		globalEval: function( code ) {
			DOMEval( code );
		},
	
		each: function( obj, callback ) {
			var length, i = 0;
	
			if ( isArrayLike( obj ) ) {
				length = obj.length;
				for ( ; i < length; i++ ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			}
	
			return obj;
		},
	
		// Support: Android <=4.0 only
		trim: function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},
	
		// results is for internal usage only
		makeArray: function( arr, results ) {
			var ret = results || [];
	
			if ( arr != null ) {
				if ( isArrayLike( Object( arr ) ) ) {
					jQuery.merge( ret,
						typeof arr === "string" ?
						[ arr ] : arr
					);
				} else {
					push.call( ret, arr );
				}
			}
	
			return ret;
		},
	
		inArray: function( elem, arr, i ) {
			return arr == null ? -1 : indexOf.call( arr, elem, i );
		},
	
		// Support: Android <=4.0 only, PhantomJS 1 only
		// push.apply(_, arraylike) throws on ancient WebKit
		merge: function( first, second ) {
			var len = +second.length,
				j = 0,
				i = first.length;
	
			for ( ; j < len; j++ ) {
				first[ i++ ] = second[ j ];
			}
	
			first.length = i;
	
			return first;
		},
	
		grep: function( elems, callback, invert ) {
			var callbackInverse,
				matches = [],
				i = 0,
				length = elems.length,
				callbackExpect = !invert;
	
			// Go through the array, only saving the items
			// that pass the validator function
			for ( ; i < length; i++ ) {
				callbackInverse = !callback( elems[ i ], i );
				if ( callbackInverse !== callbackExpect ) {
					matches.push( elems[ i ] );
				}
			}
	
			return matches;
		},
	
		// arg is for internal usage only
		map: function( elems, callback, arg ) {
			var length, value,
				i = 0,
				ret = [];
	
			// Go through the array, translating each of the items to their new values
			if ( isArrayLike( elems ) ) {
				length = elems.length;
				for ( ; i < length; i++ ) {
					value = callback( elems[ i ], i, arg );
	
					if ( value != null ) {
						ret.push( value );
					}
				}
	
			// Go through every key on the object,
			} else {
				for ( i in elems ) {
					value = callback( elems[ i ], i, arg );
	
					if ( value != null ) {
						ret.push( value );
					}
				}
			}
	
			// Flatten any nested arrays
			return concat.apply( [], ret );
		},
	
		// A global GUID counter for objects
		guid: 1,
	
		// jQuery.support is not used in Core but other projects attach their
		// properties to it so it needs to exist.
		support: support
	} );
	
	if ( typeof Symbol === "function" ) {
		jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
	}
	
	// Populate the class2type map
	jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
	function( i, name ) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	} );
	
	function isArrayLike( obj ) {
	
		// Support: real iOS 8.2 only (not reproducible in simulator)
		// `in` check used to prevent JIT error (gh-2145)
		// hasOwn isn't used here due to false negatives
		// regarding Nodelist length in IE
		var length = !!obj && "length" in obj && obj.length,
			type = toType( obj );
	
		if ( isFunction( obj ) || isWindow( obj ) ) {
			return false;
		}
	
		return type === "array" || length === 0 ||
			typeof length === "number" && length > 0 && ( length - 1 ) in obj;
	}
	var Sizzle =
	/*!
	 * Sizzle CSS Selector Engine v2.3.3
	 * https://sizzlejs.com/
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2016-08-08
	 */
	(function( window ) {
	
	var i,
		support,
		Expr,
		getText,
		isXML,
		tokenize,
		compile,
		select,
		outermostContext,
		sortInput,
		hasDuplicate,
	
		// Local document vars
		setDocument,
		document,
		docElem,
		documentIsHTML,
		rbuggyQSA,
		rbuggyMatches,
		matches,
		contains,
	
		// Instance-specific data
		expando = "sizzle" + 1 * new Date(),
		preferredDoc = window.document,
		dirruns = 0,
		done = 0,
		classCache = createCache(),
		tokenCache = createCache(),
		compilerCache = createCache(),
		sortOrder = function( a, b ) {
			if ( a === b ) {
				hasDuplicate = true;
			}
			return 0;
		},
	
		// Instance methods
		hasOwn = ({}).hasOwnProperty,
		arr = [],
		pop = arr.pop,
		push_native = arr.push,
		push = arr.push,
		slice = arr.slice,
		// Use a stripped-down indexOf as it's faster than native
		// https://jsperf.com/thor-indexof-vs-for/5
		indexOf = function( list, elem ) {
			var i = 0,
				len = list.length;
			for ( ; i < len; i++ ) {
				if ( list[i] === elem ) {
					return i;
				}
			}
			return -1;
		},
	
		booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
	
		// Regular expressions
	
		// http://www.w3.org/TR/css3-selectors/#whitespace
		whitespace = "[\\x20\\t\\r\\n\\f]",
	
		// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
		identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
	
		// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
		attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
			// Operator (capture 2)
			"*([*^$|!~]?=)" + whitespace +
			// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
			"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
			"*\\]",
	
		pseudos = ":(" + identifier + ")(?:\\((" +
			// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
			// 1. quoted (capture 3; capture 4 or capture 5)
			"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
			// 2. simple (capture 6)
			"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
			// 3. anything else (capture 2)
			".*" +
			")\\)|)",
	
		// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
		rwhitespace = new RegExp( whitespace + "+", "g" ),
		rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),
	
		rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
		rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),
	
		rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),
	
		rpseudo = new RegExp( pseudos ),
		ridentifier = new RegExp( "^" + identifier + "$" ),
	
		matchExpr = {
			"ID": new RegExp( "^#(" + identifier + ")" ),
			"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
			"TAG": new RegExp( "^(" + identifier + "|[*])" ),
			"ATTR": new RegExp( "^" + attributes ),
			"PSEUDO": new RegExp( "^" + pseudos ),
			"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
				"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
				"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
			"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
			// For use in libraries implementing .is()
			// We use this for POS matching in `select`
			"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
				whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
		},
	
		rinputs = /^(?:input|select|textarea|button)$/i,
		rheader = /^h\d$/i,
	
		rnative = /^[^{]+\{\s*\[native \w/,
	
		// Easily-parseable/retrievable ID or TAG or CLASS selectors
		rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
	
		rsibling = /[+~]/,
	
		// CSS escapes
		// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
		runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
		funescape = function( _, escaped, escapedWhitespace ) {
			var high = "0x" + escaped - 0x10000;
			// NaN means non-codepoint
			// Support: Firefox<24
			// Workaround erroneous numeric interpretation of +"0x"
			return high !== high || escapedWhitespace ?
				escaped :
				high < 0 ?
					// BMP codepoint
					String.fromCharCode( high + 0x10000 ) :
					// Supplemental Plane codepoint (surrogate pair)
					String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
		},
	
		// CSS string/identifier serialization
		// https://drafts.csswg.org/cssom/#common-serializing-idioms
		rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
		fcssescape = function( ch, asCodePoint ) {
			if ( asCodePoint ) {
	
				// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
				if ( ch === "\0" ) {
					return "\uFFFD";
				}
	
				// Control characters and (dependent upon position) numbers get escaped as code points
				return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
			}
	
			// Other potentially-special ASCII characters get backslash-escaped
			return "\\" + ch;
		},
	
		// Used for iframes
		// See setDocument()
		// Removing the function wrapper causes a "Permission Denied"
		// error in IE
		unloadHandler = function() {
			setDocument();
		},
	
		disabledAncestor = addCombinator(
			function( elem ) {
				return elem.disabled === true && ("form" in elem || "label" in elem);
			},
			{ dir: "parentNode", next: "legend" }
		);
	
	// Optimize for push.apply( _, NodeList )
	try {
		push.apply(
			(arr = slice.call( preferredDoc.childNodes )),
			preferredDoc.childNodes
		);
		// Support: Android<4.0
		// Detect silently failing push.apply
		arr[ preferredDoc.childNodes.length ].nodeType;
	} catch ( e ) {
		push = { apply: arr.length ?
	
			// Leverage slice if possible
			function( target, els ) {
				push_native.apply( target, slice.call(els) );
			} :
	
			// Support: IE<9
			// Otherwise append directly
			function( target, els ) {
				var j = target.length,
					i = 0;
				// Can't trust NodeList.length
				while ( (target[j++] = els[i++]) ) {}
				target.length = j - 1;
			}
		};
	}
	
	function Sizzle( selector, context, results, seed ) {
		var m, i, elem, nid, match, groups, newSelector,
			newContext = context && context.ownerDocument,
	
			// nodeType defaults to 9, since context defaults to document
			nodeType = context ? context.nodeType : 9;
	
		results = results || [];
	
		// Return early from calls with invalid selector or context
		if ( typeof selector !== "string" || !selector ||
			nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {
	
			return results;
		}
	
		// Try to shortcut find operations (as opposed to filters) in HTML documents
		if ( !seed ) {
	
			if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
				setDocument( context );
			}
			context = context || document;
	
			if ( documentIsHTML ) {
	
				// If the selector is sufficiently simple, try using a "get*By*" DOM method
				// (excepting DocumentFragment context, where the methods don't exist)
				if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
	
					// ID selector
					if ( (m = match[1]) ) {
	
						// Document context
						if ( nodeType === 9 ) {
							if ( (elem = context.getElementById( m )) ) {
	
								// Support: IE, Opera, Webkit
								// TODO: identify versions
								// getElementById can match elements by name instead of ID
								if ( elem.id === m ) {
									results.push( elem );
									return results;
								}
							} else {
								return results;
							}
	
						// Element context
						} else {
	
							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( newContext && (elem = newContext.getElementById( m )) &&
								contains( context, elem ) &&
								elem.id === m ) {
	
								results.push( elem );
								return results;
							}
						}
	
					// Type selector
					} else if ( match[2] ) {
						push.apply( results, context.getElementsByTagName( selector ) );
						return results;
	
					// Class selector
					} else if ( (m = match[3]) && support.getElementsByClassName &&
						context.getElementsByClassName ) {
	
						push.apply( results, context.getElementsByClassName( m ) );
						return results;
					}
				}
	
				// Take advantage of querySelectorAll
				if ( support.qsa &&
					!compilerCache[ selector + " " ] &&
					(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
	
					if ( nodeType !== 1 ) {
						newContext = context;
						newSelector = selector;
	
					// qSA looks outside Element context, which is not what we want
					// Thanks to Andrew Dupont for this workaround technique
					// Support: IE <=8
					// Exclude object elements
					} else if ( context.nodeName.toLowerCase() !== "object" ) {
	
						// Capture the context ID, setting it first if necessary
						if ( (nid = context.getAttribute( "id" )) ) {
							nid = nid.replace( rcssescape, fcssescape );
						} else {
							context.setAttribute( "id", (nid = expando) );
						}
	
						// Prefix every selector in the list
						groups = tokenize( selector );
						i = groups.length;
						while ( i-- ) {
							groups[i] = "#" + nid + " " + toSelector( groups[i] );
						}
						newSelector = groups.join( "," );
	
						// Expand context for sibling selectors
						newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
							context;
					}
	
					if ( newSelector ) {
						try {
							push.apply( results,
								newContext.querySelectorAll( newSelector )
							);
							return results;
						} catch ( qsaError ) {
						} finally {
							if ( nid === expando ) {
								context.removeAttribute( "id" );
							}
						}
					}
				}
			}
		}
	
		// All others
		return select( selector.replace( rtrim, "$1" ), context, results, seed );
	}
	
	/**
	 * Create key-value caches of limited size
	 * @returns {function(string, object)} Returns the Object data after storing it on itself with
	 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
	 *	deleting the oldest entry
	 */
	function createCache() {
		var keys = [];
	
		function cache( key, value ) {
			// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
			if ( keys.push( key + " " ) > Expr.cacheLength ) {
				// Only keep the most recent entries
				delete cache[ keys.shift() ];
			}
			return (cache[ key + " " ] = value);
		}
		return cache;
	}
	
	/**
	 * Mark a function for special use by Sizzle
	 * @param {Function} fn The function to mark
	 */
	function markFunction( fn ) {
		fn[ expando ] = true;
		return fn;
	}
	
	/**
	 * Support testing using an element
	 * @param {Function} fn Passed the created element and returns a boolean result
	 */
	function assert( fn ) {
		var el = document.createElement("fieldset");
	
		try {
			return !!fn( el );
		} catch (e) {
			return false;
		} finally {
			// Remove from its parent by default
			if ( el.parentNode ) {
				el.parentNode.removeChild( el );
			}
			// release memory in IE
			el = null;
		}
	}
	
	/**
	 * Adds the same handler for all of the specified attrs
	 * @param {String} attrs Pipe-separated list of attributes
	 * @param {Function} handler The method that will be applied
	 */
	function addHandle( attrs, handler ) {
		var arr = attrs.split("|"),
			i = arr.length;
	
		while ( i-- ) {
			Expr.attrHandle[ arr[i] ] = handler;
		}
	}
	
	/**
	 * Checks document order of two siblings
	 * @param {Element} a
	 * @param {Element} b
	 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
	 */
	function siblingCheck( a, b ) {
		var cur = b && a,
			diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
				a.sourceIndex - b.sourceIndex;
	
		// Use IE sourceIndex if available on both nodes
		if ( diff ) {
			return diff;
		}
	
		// Check if b follows a
		if ( cur ) {
			while ( (cur = cur.nextSibling) ) {
				if ( cur === b ) {
					return -1;
				}
			}
		}
	
		return a ? 1 : -1;
	}
	
	/**
	 * Returns a function to use in pseudos for input types
	 * @param {String} type
	 */
	function createInputPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === type;
		};
	}
	
	/**
	 * Returns a function to use in pseudos for buttons
	 * @param {String} type
	 */
	function createButtonPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && elem.type === type;
		};
	}
	
	/**
	 * Returns a function to use in pseudos for :enabled/:disabled
	 * @param {Boolean} disabled true for :disabled; false for :enabled
	 */
	function createDisabledPseudo( disabled ) {
	
		// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
		return function( elem ) {
	
			// Only certain elements can match :enabled or :disabled
			// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
			// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
			if ( "form" in elem ) {
	
				// Check for inherited disabledness on relevant non-disabled elements:
				// * listed form-associated elements in a disabled fieldset
				//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
				//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
				// * option elements in a disabled optgroup
				//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
				// All such elements have a "form" property.
				if ( elem.parentNode && elem.disabled === false ) {
	
					// Option elements defer to a parent optgroup if present
					if ( "label" in elem ) {
						if ( "label" in elem.parentNode ) {
							return elem.parentNode.disabled === disabled;
						} else {
							return elem.disabled === disabled;
						}
					}
	
					// Support: IE 6 - 11
					// Use the isDisabled shortcut property to check for disabled fieldset ancestors
					return elem.isDisabled === disabled ||
	
						// Where there is no isDisabled, check manually
						/* jshint -W018 */
						elem.isDisabled !== !disabled &&
							disabledAncestor( elem ) === disabled;
				}
	
				return elem.disabled === disabled;
	
			// Try to winnow out elements that can't be disabled before trusting the disabled property.
			// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
			// even exist on them, let alone have a boolean value.
			} else if ( "label" in elem ) {
				return elem.disabled === disabled;
			}
	
			// Remaining elements are neither :enabled nor :disabled
			return false;
		};
	}
	
	/**
	 * Returns a function to use in pseudos for positionals
	 * @param {Function} fn
	 */
	function createPositionalPseudo( fn ) {
		return markFunction(function( argument ) {
			argument = +argument;
			return markFunction(function( seed, matches ) {
				var j,
					matchIndexes = fn( [], seed.length, argument ),
					i = matchIndexes.length;
	
				// Match elements found at the specified indexes
				while ( i-- ) {
					if ( seed[ (j = matchIndexes[i]) ] ) {
						seed[j] = !(matches[j] = seed[j]);
					}
				}
			});
		});
	}
	
	/**
	 * Checks a node for validity as a Sizzle context
	 * @param {Element|Object=} context
	 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
	 */
	function testContext( context ) {
		return context && typeof context.getElementsByTagName !== "undefined" && context;
	}
	
	// Expose support vars for convenience
	support = Sizzle.support = {};
	
	/**
	 * Detects XML nodes
	 * @param {Element|Object} elem An element or a document
	 * @returns {Boolean} True iff elem is a non-HTML XML node
	 */
	isXML = Sizzle.isXML = function( elem ) {
		// documentElement is verified for cases where it doesn't yet exist
		// (such as loading iframes in IE - #4833)
		var documentElement = elem && (elem.ownerDocument || elem).documentElement;
		return documentElement ? documentElement.nodeName !== "HTML" : false;
	};
	
	/**
	 * Sets document-related variables once based on the current document
	 * @param {Element|Object} [doc] An element or document object to use to set the document
	 * @returns {Object} Returns the current document
	 */
	setDocument = Sizzle.setDocument = function( node ) {
		var hasCompare, subWindow,
			doc = node ? node.ownerDocument || node : preferredDoc;
	
		// Return early if doc is invalid or already selected
		if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
			return document;
		}
	
		// Update global variables
		document = doc;
		docElem = document.documentElement;
		documentIsHTML = !isXML( document );
	
		// Support: IE 9-11, Edge
		// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
		if ( preferredDoc !== document &&
			(subWindow = document.defaultView) && subWindow.top !== subWindow ) {
	
			// Support: IE 11, Edge
			if ( subWindow.addEventListener ) {
				subWindow.addEventListener( "unload", unloadHandler, false );
	
			// Support: IE 9 - 10 only
			} else if ( subWindow.attachEvent ) {
				subWindow.attachEvent( "onunload", unloadHandler );
			}
		}
	
		/* Attributes
		---------------------------------------------------------------------- */
	
		// Support: IE<8
		// Verify that getAttribute really returns attributes and not properties
		// (excepting IE8 booleans)
		support.attributes = assert(function( el ) {
			el.className = "i";
			return !el.getAttribute("className");
		});
	
		/* getElement(s)By*
		---------------------------------------------------------------------- */
	
		// Check if getElementsByTagName("*") returns only elements
		support.getElementsByTagName = assert(function( el ) {
			el.appendChild( document.createComment("") );
			return !el.getElementsByTagName("*").length;
		});
	
		// Support: IE<9
		support.getElementsByClassName = rnative.test( document.getElementsByClassName );
	
		// Support: IE<10
		// Check if getElementById returns elements by name
		// The broken getElementById methods don't pick up programmatically-set names,
		// so use a roundabout getElementsByName test
		support.getById = assert(function( el ) {
			docElem.appendChild( el ).id = expando;
			return !document.getElementsByName || !document.getElementsByName( expando ).length;
		});
	
		// ID filter and find
		if ( support.getById ) {
			Expr.filter["ID"] = function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					return elem.getAttribute("id") === attrId;
				};
			};
			Expr.find["ID"] = function( id, context ) {
				if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
					var elem = context.getElementById( id );
					return elem ? [ elem ] : [];
				}
			};
		} else {
			Expr.filter["ID"] =  function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					var node = typeof elem.getAttributeNode !== "undefined" &&
						elem.getAttributeNode("id");
					return node && node.value === attrId;
				};
			};
	
			// Support: IE 6 - 7 only
			// getElementById is not reliable as a find shortcut
			Expr.find["ID"] = function( id, context ) {
				if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
					var node, i, elems,
						elem = context.getElementById( id );
	
					if ( elem ) {
	
						// Verify the id attribute
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
	
						// Fall back on getElementsByName
						elems = context.getElementsByName( id );
						i = 0;
						while ( (elem = elems[i++]) ) {
							node = elem.getAttributeNode("id");
							if ( node && node.value === id ) {
								return [ elem ];
							}
						}
					}
	
					return [];
				}
			};
		}
	
		// Tag
		Expr.find["TAG"] = support.getElementsByTagName ?
			function( tag, context ) {
				if ( typeof context.getElementsByTagName !== "undefined" ) {
					return context.getElementsByTagName( tag );
	
				// DocumentFragment nodes don't have gEBTN
				} else if ( support.qsa ) {
					return context.querySelectorAll( tag );
				}
			} :
	
			function( tag, context ) {
				var elem,
					tmp = [],
					i = 0,
					// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
					results = context.getElementsByTagName( tag );
	
				// Filter out possible comments
				if ( tag === "*" ) {
					while ( (elem = results[i++]) ) {
						if ( elem.nodeType === 1 ) {
							tmp.push( elem );
						}
					}
	
					return tmp;
				}
				return results;
			};
	
		// Class
		Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
			if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
				return context.getElementsByClassName( className );
			}
		};
	
		/* QSA/matchesSelector
		---------------------------------------------------------------------- */
	
		// QSA and matchesSelector support
	
		// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
		rbuggyMatches = [];
	
		// qSa(:focus) reports false when true (Chrome 21)
		// We allow this because of a bug in IE8/9 that throws an error
		// whenever `document.activeElement` is accessed on an iframe
		// So, we allow :focus to pass through QSA all the time to avoid the IE error
		// See https://bugs.jquery.com/ticket/13378
		rbuggyQSA = [];
	
		if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
			// Build QSA regex
			// Regex strategy adopted from Diego Perini
			assert(function( el ) {
				// Select is set to empty string on purpose
				// This is to test IE's treatment of not explicitly
				// setting a boolean content attribute,
				// since its presence should be enough
				// https://bugs.jquery.com/ticket/12359
				docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
					"<select id='" + expando + "-\r\\' msallowcapture=''>" +
					"<option selected=''></option></select>";
	
				// Support: IE8, Opera 11-12.16
				// Nothing should be selected when empty strings follow ^= or $= or *=
				// The test attribute must be unknown in Opera but "safe" for WinRT
				// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
				if ( el.querySelectorAll("[msallowcapture^='']").length ) {
					rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
				}
	
				// Support: IE8
				// Boolean attributes and "value" are not treated correctly
				if ( !el.querySelectorAll("[selected]").length ) {
					rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
				}
	
				// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
				if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
					rbuggyQSA.push("~=");
				}
	
				// Webkit/Opera - :checked should return selected option elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				// IE8 throws error here and will not see later tests
				if ( !el.querySelectorAll(":checked").length ) {
					rbuggyQSA.push(":checked");
				}
	
				// Support: Safari 8+, iOS 8+
				// https://bugs.webkit.org/show_bug.cgi?id=136851
				// In-page `selector#id sibling-combinator selector` fails
				if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
					rbuggyQSA.push(".#.+[+~]");
				}
			});
	
			assert(function( el ) {
				el.innerHTML = "<a href='' disabled='disabled'></a>" +
					"<select disabled='disabled'><option/></select>";
	
				// Support: Windows 8 Native Apps
				// The type and name attributes are restricted during .innerHTML assignment
				var input = document.createElement("input");
				input.setAttribute( "type", "hidden" );
				el.appendChild( input ).setAttribute( "name", "D" );
	
				// Support: IE8
				// Enforce case-sensitivity of name attribute
				if ( el.querySelectorAll("[name=d]").length ) {
					rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
				}
	
				// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
				// IE8 throws error here and will not see later tests
				if ( el.querySelectorAll(":enabled").length !== 2 ) {
					rbuggyQSA.push( ":enabled", ":disabled" );
				}
	
				// Support: IE9-11+
				// IE's :disabled selector does not pick up the children of disabled fieldsets
				docElem.appendChild( el ).disabled = true;
				if ( el.querySelectorAll(":disabled").length !== 2 ) {
					rbuggyQSA.push( ":enabled", ":disabled" );
				}
	
				// Opera 10-11 does not throw on post-comma invalid pseudos
				el.querySelectorAll("*,:x");
				rbuggyQSA.push(",.*:");
			});
		}
	
		if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
			docElem.webkitMatchesSelector ||
			docElem.mozMatchesSelector ||
			docElem.oMatchesSelector ||
			docElem.msMatchesSelector) )) ) {
	
			assert(function( el ) {
				// Check to see if it's possible to do matchesSelector
				// on a disconnected node (IE 9)
				support.disconnectedMatch = matches.call( el, "*" );
	
				// This should fail with an exception
				// Gecko does not error, returns false instead
				matches.call( el, "[s!='']:x" );
				rbuggyMatches.push( "!=", pseudos );
			});
		}
	
		rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
		rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );
	
		/* Contains
		---------------------------------------------------------------------- */
		hasCompare = rnative.test( docElem.compareDocumentPosition );
	
		// Element contains another
		// Purposefully self-exclusive
		// As in, an element does not contain itself
		contains = hasCompare || rnative.test( docElem.contains ) ?
			function( a, b ) {
				var adown = a.nodeType === 9 ? a.documentElement : a,
					bup = b && b.parentNode;
				return a === bup || !!( bup && bup.nodeType === 1 && (
					adown.contains ?
						adown.contains( bup ) :
						a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
				));
			} :
			function( a, b ) {
				if ( b ) {
					while ( (b = b.parentNode) ) {
						if ( b === a ) {
							return true;
						}
					}
				}
				return false;
			};
	
		/* Sorting
		---------------------------------------------------------------------- */
	
		// Document order sorting
		sortOrder = hasCompare ?
		function( a, b ) {
	
			// Flag for duplicate removal
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}
	
			// Sort on method existence if only one input has compareDocumentPosition
			var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
			if ( compare ) {
				return compare;
			}
	
			// Calculate position if both inputs belong to the same document
			compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
				a.compareDocumentPosition( b ) :
	
				// Otherwise we know they are disconnected
				1;
	
			// Disconnected nodes
			if ( compare & 1 ||
				(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {
	
				// Choose the first element that is related to our preferred document
				if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
					return -1;
				}
				if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
					return 1;
				}
	
				// Maintain original order
				return sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;
			}
	
			return compare & 4 ? -1 : 1;
		} :
		function( a, b ) {
			// Exit early if the nodes are identical
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}
	
			var cur,
				i = 0,
				aup = a.parentNode,
				bup = b.parentNode,
				ap = [ a ],
				bp = [ b ];
	
			// Parentless nodes are either documents or disconnected
			if ( !aup || !bup ) {
				return a === document ? -1 :
					b === document ? 1 :
					aup ? -1 :
					bup ? 1 :
					sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;
	
			// If the nodes are siblings, we can do a quick check
			} else if ( aup === bup ) {
				return siblingCheck( a, b );
			}
	
			// Otherwise we need full lists of their ancestors for comparison
			cur = a;
			while ( (cur = cur.parentNode) ) {
				ap.unshift( cur );
			}
			cur = b;
			while ( (cur = cur.parentNode) ) {
				bp.unshift( cur );
			}
	
			// Walk down the tree looking for a discrepancy
			while ( ap[i] === bp[i] ) {
				i++;
			}
	
			return i ?
				// Do a sibling check if the nodes have a common ancestor
				siblingCheck( ap[i], bp[i] ) :
	
				// Otherwise nodes in our document sort first
				ap[i] === preferredDoc ? -1 :
				bp[i] === preferredDoc ? 1 :
				0;
		};
	
		return document;
	};
	
	Sizzle.matches = function( expr, elements ) {
		return Sizzle( expr, null, null, elements );
	};
	
	Sizzle.matchesSelector = function( elem, expr ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}
	
		// Make sure that attribute selectors are quoted
		expr = expr.replace( rattributeQuotes, "='$1']" );
	
		if ( support.matchesSelector && documentIsHTML &&
			!compilerCache[ expr + " " ] &&
			( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
			( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {
	
			try {
				var ret = matches.call( elem, expr );
	
				// IE 9's matchesSelector returns false on disconnected nodes
				if ( ret || support.disconnectedMatch ||
						// As well, disconnected nodes are said to be in a document
						// fragment in IE 9
						elem.document && elem.document.nodeType !== 11 ) {
					return ret;
				}
			} catch (e) {}
		}
	
		return Sizzle( expr, document, null, [ elem ] ).length > 0;
	};
	
	Sizzle.contains = function( context, elem ) {
		// Set document vars if needed
		if ( ( context.ownerDocument || context ) !== document ) {
			setDocument( context );
		}
		return contains( context, elem );
	};
	
	Sizzle.attr = function( elem, name ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}
	
		var fn = Expr.attrHandle[ name.toLowerCase() ],
			// Don't get fooled by Object.prototype properties (jQuery #13807)
			val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
				fn( elem, name, !documentIsHTML ) :
				undefined;
	
		return val !== undefined ?
			val :
			support.attributes || !documentIsHTML ?
				elem.getAttribute( name ) :
				(val = elem.getAttributeNode(name)) && val.specified ?
					val.value :
					null;
	};
	
	Sizzle.escape = function( sel ) {
		return (sel + "").replace( rcssescape, fcssescape );
	};
	
	Sizzle.error = function( msg ) {
		throw new Error( "Syntax error, unrecognized expression: " + msg );
	};
	
	/**
	 * Document sorting and removing duplicates
	 * @param {ArrayLike} results
	 */
	Sizzle.uniqueSort = function( results ) {
		var elem,
			duplicates = [],
			j = 0,
			i = 0;
	
		// Unless we *know* we can detect duplicates, assume their presence
		hasDuplicate = !support.detectDuplicates;
		sortInput = !support.sortStable && results.slice( 0 );
		results.sort( sortOrder );
	
		if ( hasDuplicate ) {
			while ( (elem = results[i++]) ) {
				if ( elem === results[ i ] ) {
					j = duplicates.push( i );
				}
			}
			while ( j-- ) {
				results.splice( duplicates[ j ], 1 );
			}
		}
	
		// Clear input after sorting to release objects
		// See https://github.com/jquery/sizzle/pull/225
		sortInput = null;
	
		return results;
	};
	
	/**
	 * Utility function for retrieving the text value of an array of DOM nodes
	 * @param {Array|Element} elem
	 */
	getText = Sizzle.getText = function( elem ) {
		var node,
			ret = "",
			i = 0,
			nodeType = elem.nodeType;
	
		if ( !nodeType ) {
			// If no nodeType, this is expected to be an array
			while ( (node = elem[i++]) ) {
				// Do not traverse comment nodes
				ret += getText( node );
			}
		} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
			// Use textContent for elements
			// innerText usage removed for consistency of new lines (jQuery #11153)
			if ( typeof elem.textContent === "string" ) {
				return elem.textContent;
			} else {
				// Traverse its children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}
		// Do not include comment or processing instruction nodes
	
		return ret;
	};
	
	Expr = Sizzle.selectors = {
	
		// Can be adjusted by the user
		cacheLength: 50,
	
		createPseudo: markFunction,
	
		match: matchExpr,
	
		attrHandle: {},
	
		find: {},
	
		relative: {
			">": { dir: "parentNode", first: true },
			" ": { dir: "parentNode" },
			"+": { dir: "previousSibling", first: true },
			"~": { dir: "previousSibling" }
		},
	
		preFilter: {
			"ATTR": function( match ) {
				match[1] = match[1].replace( runescape, funescape );
	
				// Move the given value to match[3] whether quoted or unquoted
				match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );
	
				if ( match[2] === "~=" ) {
					match[3] = " " + match[3] + " ";
				}
	
				return match.slice( 0, 4 );
			},
	
			"CHILD": function( match ) {
				/* matches from matchExpr["CHILD"]
					1 type (only|nth|...)
					2 what (child|of-type)
					3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
					4 xn-component of xn+y argument ([+-]?\d*n|)
					5 sign of xn-component
					6 x of xn-component
					7 sign of y-component
					8 y of y-component
				*/
				match[1] = match[1].toLowerCase();
	
				if ( match[1].slice( 0, 3 ) === "nth" ) {
					// nth-* requires argument
					if ( !match[3] ) {
						Sizzle.error( match[0] );
					}
	
					// numeric x and y parameters for Expr.filter.CHILD
					// remember that false/true cast respectively to 0/1
					match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
					match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );
	
				// other types prohibit arguments
				} else if ( match[3] ) {
					Sizzle.error( match[0] );
				}
	
				return match;
			},
	
			"PSEUDO": function( match ) {
				var excess,
					unquoted = !match[6] && match[2];
	
				if ( matchExpr["CHILD"].test( match[0] ) ) {
					return null;
				}
	
				// Accept quoted arguments as-is
				if ( match[3] ) {
					match[2] = match[4] || match[5] || "";
	
				// Strip excess characters from unquoted arguments
				} else if ( unquoted && rpseudo.test( unquoted ) &&
					// Get excess from tokenize (recursively)
					(excess = tokenize( unquoted, true )) &&
					// advance to the next closing parenthesis
					(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {
	
					// excess is a negative index
					match[0] = match[0].slice( 0, excess );
					match[2] = unquoted.slice( 0, excess );
				}
	
				// Return only captures needed by the pseudo filter method (type and argument)
				return match.slice( 0, 3 );
			}
		},
	
		filter: {
	
			"TAG": function( nodeNameSelector ) {
				var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
				return nodeNameSelector === "*" ?
					function() { return true; } :
					function( elem ) {
						return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
					};
			},
	
			"CLASS": function( className ) {
				var pattern = classCache[ className + " " ];
	
				return pattern ||
					(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
					classCache( className, function( elem ) {
						return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
					});
			},
	
			"ATTR": function( name, operator, check ) {
				return function( elem ) {
					var result = Sizzle.attr( elem, name );
	
					if ( result == null ) {
						return operator === "!=";
					}
					if ( !operator ) {
						return true;
					}
	
					result += "";
	
					return operator === "=" ? result === check :
						operator === "!=" ? result !== check :
						operator === "^=" ? check && result.indexOf( check ) === 0 :
						operator === "*=" ? check && result.indexOf( check ) > -1 :
						operator === "$=" ? check && result.slice( -check.length ) === check :
						operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
						operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
						false;
				};
			},
	
			"CHILD": function( type, what, argument, first, last ) {
				var simple = type.slice( 0, 3 ) !== "nth",
					forward = type.slice( -4 ) !== "last",
					ofType = what === "of-type";
	
				return first === 1 && last === 0 ?
	
					// Shortcut for :nth-*(n)
					function( elem ) {
						return !!elem.parentNode;
					} :
	
					function( elem, context, xml ) {
						var cache, uniqueCache, outerCache, node, nodeIndex, start,
							dir = simple !== forward ? "nextSibling" : "previousSibling",
							parent = elem.parentNode,
							name = ofType && elem.nodeName.toLowerCase(),
							useCache = !xml && !ofType,
							diff = false;
	
						if ( parent ) {
	
							// :(first|last|only)-(child|of-type)
							if ( simple ) {
								while ( dir ) {
									node = elem;
									while ( (node = node[ dir ]) ) {
										if ( ofType ?
											node.nodeName.toLowerCase() === name :
											node.nodeType === 1 ) {
	
											return false;
										}
									}
									// Reverse direction for :only-* (if we haven't yet done so)
									start = dir = type === "only" && !start && "nextSibling";
								}
								return true;
							}
	
							start = [ forward ? parent.firstChild : parent.lastChild ];
	
							// non-xml :nth-child(...) stores cache data on `parent`
							if ( forward && useCache ) {
	
								// Seek `elem` from a previously-cached index
	
								// ...in a gzip-friendly way
								node = parent;
								outerCache = node[ expando ] || (node[ expando ] = {});
	
								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});
	
								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex && cache[ 2 ];
								node = nodeIndex && parent.childNodes[ nodeIndex ];
	
								while ( (node = ++nodeIndex && node && node[ dir ] ||
	
									// Fallback to seeking `elem` from the start
									(diff = nodeIndex = 0) || start.pop()) ) {
	
									// When found, cache indexes on `parent` and break
									if ( node.nodeType === 1 && ++diff && node === elem ) {
										uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
										break;
									}
								}
	
							} else {
								// Use previously-cached element index if available
								if ( useCache ) {
									// ...in a gzip-friendly way
									node = elem;
									outerCache = node[ expando ] || (node[ expando ] = {});
	
									// Support: IE <9 only
									// Defend against cloned attroperties (jQuery gh-1709)
									uniqueCache = outerCache[ node.uniqueID ] ||
										(outerCache[ node.uniqueID ] = {});
	
									cache = uniqueCache[ type ] || [];
									nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
									diff = nodeIndex;
								}
	
								// xml :nth-child(...)
								// or :nth-last-child(...) or :nth(-last)?-of-type(...)
								if ( diff === false ) {
									// Use the same loop as above to seek `elem` from the start
									while ( (node = ++nodeIndex && node && node[ dir ] ||
										(diff = nodeIndex = 0) || start.pop()) ) {
	
										if ( ( ofType ?
											node.nodeName.toLowerCase() === name :
											node.nodeType === 1 ) &&
											++diff ) {
	
											// Cache the index of each encountered element
											if ( useCache ) {
												outerCache = node[ expando ] || (node[ expando ] = {});
	
												// Support: IE <9 only
												// Defend against cloned attroperties (jQuery gh-1709)
												uniqueCache = outerCache[ node.uniqueID ] ||
													(outerCache[ node.uniqueID ] = {});
	
												uniqueCache[ type ] = [ dirruns, diff ];
											}
	
											if ( node === elem ) {
												break;
											}
										}
									}
								}
							}
	
							// Incorporate the offset, then check against cycle size
							diff -= last;
							return diff === first || ( diff % first === 0 && diff / first >= 0 );
						}
					};
			},
	
			"PSEUDO": function( pseudo, argument ) {
				// pseudo-class names are case-insensitive
				// http://www.w3.org/TR/selectors/#pseudo-classes
				// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
				// Remember that setFilters inherits from pseudos
				var args,
					fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
						Sizzle.error( "unsupported pseudo: " + pseudo );
	
				// The user may use createPseudo to indicate that
				// arguments are needed to create the filter function
				// just as Sizzle does
				if ( fn[ expando ] ) {
					return fn( argument );
				}
	
				// But maintain support for old signatures
				if ( fn.length > 1 ) {
					args = [ pseudo, pseudo, "", argument ];
					return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
						markFunction(function( seed, matches ) {
							var idx,
								matched = fn( seed, argument ),
								i = matched.length;
							while ( i-- ) {
								idx = indexOf( seed, matched[i] );
								seed[ idx ] = !( matches[ idx ] = matched[i] );
							}
						}) :
						function( elem ) {
							return fn( elem, 0, args );
						};
				}
	
				return fn;
			}
		},
	
		pseudos: {
			// Potentially complex pseudos
			"not": markFunction(function( selector ) {
				// Trim the selector passed to compile
				// to avoid treating leading and trailing
				// spaces as combinators
				var input = [],
					results = [],
					matcher = compile( selector.replace( rtrim, "$1" ) );
	
				return matcher[ expando ] ?
					markFunction(function( seed, matches, context, xml ) {
						var elem,
							unmatched = matcher( seed, null, xml, [] ),
							i = seed.length;
	
						// Match elements unmatched by `matcher`
						while ( i-- ) {
							if ( (elem = unmatched[i]) ) {
								seed[i] = !(matches[i] = elem);
							}
						}
					}) :
					function( elem, context, xml ) {
						input[0] = elem;
						matcher( input, null, xml, results );
						// Don't keep the element (issue #299)
						input[0] = null;
						return !results.pop();
					};
			}),
	
			"has": markFunction(function( selector ) {
				return function( elem ) {
					return Sizzle( selector, elem ).length > 0;
				};
			}),
	
			"contains": markFunction(function( text ) {
				text = text.replace( runescape, funescape );
				return function( elem ) {
					return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
				};
			}),
	
			// "Whether an element is represented by a :lang() selector
			// is based solely on the element's language value
			// being equal to the identifier C,
			// or beginning with the identifier C immediately followed by "-".
			// The matching of C against the element's language value is performed case-insensitively.
			// The identifier C does not have to be a valid language name."
			// http://www.w3.org/TR/selectors/#lang-pseudo
			"lang": markFunction( function( lang ) {
				// lang value must be a valid identifier
				if ( !ridentifier.test(lang || "") ) {
					Sizzle.error( "unsupported lang: " + lang );
				}
				lang = lang.replace( runescape, funescape ).toLowerCase();
				return function( elem ) {
					var elemLang;
					do {
						if ( (elemLang = documentIsHTML ?
							elem.lang :
							elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {
	
							elemLang = elemLang.toLowerCase();
							return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
						}
					} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
					return false;
				};
			}),
	
			// Miscellaneous
			"target": function( elem ) {
				var hash = window.location && window.location.hash;
				return hash && hash.slice( 1 ) === elem.id;
			},
	
			"root": function( elem ) {
				return elem === docElem;
			},
	
			"focus": function( elem ) {
				return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
			},
	
			// Boolean properties
			"enabled": createDisabledPseudo( false ),
			"disabled": createDisabledPseudo( true ),
	
			"checked": function( elem ) {
				// In CSS3, :checked should return both checked and selected elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				var nodeName = elem.nodeName.toLowerCase();
				return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
			},
	
			"selected": function( elem ) {
				// Accessing this property makes selected-by-default
				// options in Safari work properly
				if ( elem.parentNode ) {
					elem.parentNode.selectedIndex;
				}
	
				return elem.selected === true;
			},
	
			// Contents
			"empty": function( elem ) {
				// http://www.w3.org/TR/selectors/#empty-pseudo
				// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
				//   but not by others (comment: 8; processing instruction: 7; etc.)
				// nodeType < 6 works because attributes (2) do not appear as children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					if ( elem.nodeType < 6 ) {
						return false;
					}
				}
				return true;
			},
	
			"parent": function( elem ) {
				return !Expr.pseudos["empty"]( elem );
			},
	
			// Element/input types
			"header": function( elem ) {
				return rheader.test( elem.nodeName );
			},
	
			"input": function( elem ) {
				return rinputs.test( elem.nodeName );
			},
	
			"button": function( elem ) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && elem.type === "button" || name === "button";
			},
	
			"text": function( elem ) {
				var attr;
				return elem.nodeName.toLowerCase() === "input" &&
					elem.type === "text" &&
	
					// Support: IE<8
					// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
					( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
			},
	
			// Position-in-collection
			"first": createPositionalPseudo(function() {
				return [ 0 ];
			}),
	
			"last": createPositionalPseudo(function( matchIndexes, length ) {
				return [ length - 1 ];
			}),
	
			"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
				return [ argument < 0 ? argument + length : argument ];
			}),
	
			"even": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 0;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),
	
			"odd": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 1;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),
	
			"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; --i >= 0; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),
	
			"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; ++i < length; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			})
		}
	};
	
	Expr.pseudos["nth"] = Expr.pseudos["eq"];
	
	// Add button/input type pseudos
	for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
		Expr.pseudos[ i ] = createInputPseudo( i );
	}
	for ( i in { submit: true, reset: true } ) {
		Expr.pseudos[ i ] = createButtonPseudo( i );
	}
	
	// Easy API for creating new setFilters
	function setFilters() {}
	setFilters.prototype = Expr.filters = Expr.pseudos;
	Expr.setFilters = new setFilters();
	
	tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
		var matched, match, tokens, type,
			soFar, groups, preFilters,
			cached = tokenCache[ selector + " " ];
	
		if ( cached ) {
			return parseOnly ? 0 : cached.slice( 0 );
		}
	
		soFar = selector;
		groups = [];
		preFilters = Expr.preFilter;
	
		while ( soFar ) {
	
			// Comma and first run
			if ( !matched || (match = rcomma.exec( soFar )) ) {
				if ( match ) {
					// Don't consume trailing commas as valid
					soFar = soFar.slice( match[0].length ) || soFar;
				}
				groups.push( (tokens = []) );
			}
	
			matched = false;
	
			// Combinators
			if ( (match = rcombinators.exec( soFar )) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					// Cast descendant combinators to space
					type: match[0].replace( rtrim, " " )
				});
				soFar = soFar.slice( matched.length );
			}
	
			// Filters
			for ( type in Expr.filter ) {
				if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
					(match = preFilters[ type ]( match ))) ) {
					matched = match.shift();
					tokens.push({
						value: matched,
						type: type,
						matches: match
					});
					soFar = soFar.slice( matched.length );
				}
			}
	
			if ( !matched ) {
				break;
			}
		}
	
		// Return the length of the invalid excess
		// if we're just parsing
		// Otherwise, throw an error or return tokens
		return parseOnly ?
			soFar.length :
			soFar ?
				Sizzle.error( selector ) :
				// Cache the tokens
				tokenCache( selector, groups ).slice( 0 );
	};
	
	function toSelector( tokens ) {
		var i = 0,
			len = tokens.length,
			selector = "";
		for ( ; i < len; i++ ) {
			selector += tokens[i].value;
		}
		return selector;
	}
	
	function addCombinator( matcher, combinator, base ) {
		var dir = combinator.dir,
			skip = combinator.next,
			key = skip || dir,
			checkNonElements = base && key === "parentNode",
			doneName = done++;
	
		return combinator.first ?
			// Check against closest ancestor/preceding element
			function( elem, context, xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						return matcher( elem, context, xml );
					}
				}
				return false;
			} :
	
			// Check against all ancestor/preceding elements
			function( elem, context, xml ) {
				var oldCache, uniqueCache, outerCache,
					newCache = [ dirruns, doneName ];
	
				// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
				if ( xml ) {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							if ( matcher( elem, context, xml ) ) {
								return true;
							}
						}
					}
				} else {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							outerCache = elem[ expando ] || (elem[ expando ] = {});
	
							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});
	
							if ( skip && skip === elem.nodeName.toLowerCase() ) {
								elem = elem[ dir ] || elem;
							} else if ( (oldCache = uniqueCache[ key ]) &&
								oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {
	
								// Assign to newCache so results back-propagate to previous elements
								return (newCache[ 2 ] = oldCache[ 2 ]);
							} else {
								// Reuse newcache so results back-propagate to previous elements
								uniqueCache[ key ] = newCache;
	
								// A match means we're done; a fail means we have to keep checking
								if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
									return true;
								}
							}
						}
					}
				}
				return false;
			};
	}
	
	function elementMatcher( matchers ) {
		return matchers.length > 1 ?
			function( elem, context, xml ) {
				var i = matchers.length;
				while ( i-- ) {
					if ( !matchers[i]( elem, context, xml ) ) {
						return false;
					}
				}
				return true;
			} :
			matchers[0];
	}
	
	function multipleContexts( selector, contexts, results ) {
		var i = 0,
			len = contexts.length;
		for ( ; i < len; i++ ) {
			Sizzle( selector, contexts[i], results );
		}
		return results;
	}
	
	function condense( unmatched, map, filter, context, xml ) {
		var elem,
			newUnmatched = [],
			i = 0,
			len = unmatched.length,
			mapped = map != null;
	
		for ( ; i < len; i++ ) {
			if ( (elem = unmatched[i]) ) {
				if ( !filter || filter( elem, context, xml ) ) {
					newUnmatched.push( elem );
					if ( mapped ) {
						map.push( i );
					}
				}
			}
		}
	
		return newUnmatched;
	}
	
	function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
		if ( postFilter && !postFilter[ expando ] ) {
			postFilter = setMatcher( postFilter );
		}
		if ( postFinder && !postFinder[ expando ] ) {
			postFinder = setMatcher( postFinder, postSelector );
		}
		return markFunction(function( seed, results, context, xml ) {
			var temp, i, elem,
				preMap = [],
				postMap = [],
				preexisting = results.length,
	
				// Get initial elements from seed or context
				elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),
	
				// Prefilter to get matcher input, preserving a map for seed-results synchronization
				matcherIn = preFilter && ( seed || !selector ) ?
					condense( elems, preMap, preFilter, context, xml ) :
					elems,
	
				matcherOut = matcher ?
					// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
					postFinder || ( seed ? preFilter : preexisting || postFilter ) ?
	
						// ...intermediate processing is necessary
						[] :
	
						// ...otherwise use results directly
						results :
					matcherIn;
	
			// Find primary matches
			if ( matcher ) {
				matcher( matcherIn, matcherOut, context, xml );
			}
	
			// Apply postFilter
			if ( postFilter ) {
				temp = condense( matcherOut, postMap );
				postFilter( temp, [], context, xml );
	
				// Un-match failing elements by moving them back to matcherIn
				i = temp.length;
				while ( i-- ) {
					if ( (elem = temp[i]) ) {
						matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
					}
				}
			}
	
			if ( seed ) {
				if ( postFinder || preFilter ) {
					if ( postFinder ) {
						// Get the final matcherOut by condensing this intermediate into postFinder contexts
						temp = [];
						i = matcherOut.length;
						while ( i-- ) {
							if ( (elem = matcherOut[i]) ) {
								// Restore matcherIn since elem is not yet a final match
								temp.push( (matcherIn[i] = elem) );
							}
						}
						postFinder( null, (matcherOut = []), temp, xml );
					}
	
					// Move matched elements from seed to results to keep them synchronized
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) &&
							(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {
	
							seed[temp] = !(results[temp] = elem);
						}
					}
				}
	
			// Add elements to results, through postFinder if defined
			} else {
				matcherOut = condense(
					matcherOut === results ?
						matcherOut.splice( preexisting, matcherOut.length ) :
						matcherOut
				);
				if ( postFinder ) {
					postFinder( null, results, matcherOut, xml );
				} else {
					push.apply( results, matcherOut );
				}
			}
		});
	}
	
	function matcherFromTokens( tokens ) {
		var checkContext, matcher, j,
			len = tokens.length,
			leadingRelative = Expr.relative[ tokens[0].type ],
			implicitRelative = leadingRelative || Expr.relative[" "],
			i = leadingRelative ? 1 : 0,
	
			// The foundational matcher ensures that elements are reachable from top-level context(s)
			matchContext = addCombinator( function( elem ) {
				return elem === checkContext;
			}, implicitRelative, true ),
			matchAnyContext = addCombinator( function( elem ) {
				return indexOf( checkContext, elem ) > -1;
			}, implicitRelative, true ),
			matchers = [ function( elem, context, xml ) {
				var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
					(checkContext = context).nodeType ?
						matchContext( elem, context, xml ) :
						matchAnyContext( elem, context, xml ) );
				// Avoid hanging onto element (issue #299)
				checkContext = null;
				return ret;
			} ];
	
		for ( ; i < len; i++ ) {
			if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
				matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
			} else {
				matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );
	
				// Return special upon seeing a positional matcher
				if ( matcher[ expando ] ) {
					// Find the next relative operator (if any) for proper handling
					j = ++i;
					for ( ; j < len; j++ ) {
						if ( Expr.relative[ tokens[j].type ] ) {
							break;
						}
					}
					return setMatcher(
						i > 1 && elementMatcher( matchers ),
						i > 1 && toSelector(
							// If the preceding token was a descendant combinator, insert an implicit any-element `*`
							tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
						).replace( rtrim, "$1" ),
						matcher,
						i < j && matcherFromTokens( tokens.slice( i, j ) ),
						j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
						j < len && toSelector( tokens )
					);
				}
				matchers.push( matcher );
			}
		}
	
		return elementMatcher( matchers );
	}
	
	function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
		var bySet = setMatchers.length > 0,
			byElement = elementMatchers.length > 0,
			superMatcher = function( seed, context, xml, results, outermost ) {
				var elem, j, matcher,
					matchedCount = 0,
					i = "0",
					unmatched = seed && [],
					setMatched = [],
					contextBackup = outermostContext,
					// We must always have either seed elements or outermost context
					elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
					// Use integer dirruns iff this is the outermost matcher
					dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
					len = elems.length;
	
				if ( outermost ) {
					outermostContext = context === document || context || outermost;
				}
	
				// Add elements passing elementMatchers directly to results
				// Support: IE<9, Safari
				// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
				for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
					if ( byElement && elem ) {
						j = 0;
						if ( !context && elem.ownerDocument !== document ) {
							setDocument( elem );
							xml = !documentIsHTML;
						}
						while ( (matcher = elementMatchers[j++]) ) {
							if ( matcher( elem, context || document, xml) ) {
								results.push( elem );
								break;
							}
						}
						if ( outermost ) {
							dirruns = dirrunsUnique;
						}
					}
	
					// Track unmatched elements for set filters
					if ( bySet ) {
						// They will have gone through all possible matchers
						if ( (elem = !matcher && elem) ) {
							matchedCount--;
						}
	
						// Lengthen the array for every element, matched or not
						if ( seed ) {
							unmatched.push( elem );
						}
					}
				}
	
				// `i` is now the count of elements visited above, and adding it to `matchedCount`
				// makes the latter nonnegative.
				matchedCount += i;
	
				// Apply set filters to unmatched elements
				// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
				// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
				// no element matchers and no seed.
				// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
				// case, which will result in a "00" `matchedCount` that differs from `i` but is also
				// numerically zero.
				if ( bySet && i !== matchedCount ) {
					j = 0;
					while ( (matcher = setMatchers[j++]) ) {
						matcher( unmatched, setMatched, context, xml );
					}
	
					if ( seed ) {
						// Reintegrate element matches to eliminate the need for sorting
						if ( matchedCount > 0 ) {
							while ( i-- ) {
								if ( !(unmatched[i] || setMatched[i]) ) {
									setMatched[i] = pop.call( results );
								}
							}
						}
	
						// Discard index placeholder values to get only actual matches
						setMatched = condense( setMatched );
					}
	
					// Add matches to results
					push.apply( results, setMatched );
	
					// Seedless set matches succeeding multiple successful matchers stipulate sorting
					if ( outermost && !seed && setMatched.length > 0 &&
						( matchedCount + setMatchers.length ) > 1 ) {
	
						Sizzle.uniqueSort( results );
					}
				}
	
				// Override manipulation of globals by nested matchers
				if ( outermost ) {
					dirruns = dirrunsUnique;
					outermostContext = contextBackup;
				}
	
				return unmatched;
			};
	
		return bySet ?
			markFunction( superMatcher ) :
			superMatcher;
	}
	
	compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
		var i,
			setMatchers = [],
			elementMatchers = [],
			cached = compilerCache[ selector + " " ];
	
		if ( !cached ) {
			// Generate a function of recursive functions that can be used to check each element
			if ( !match ) {
				match = tokenize( selector );
			}
			i = match.length;
			while ( i-- ) {
				cached = matcherFromTokens( match[i] );
				if ( cached[ expando ] ) {
					setMatchers.push( cached );
				} else {
					elementMatchers.push( cached );
				}
			}
	
			// Cache the compiled function
			cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
	
			// Save selector and tokenization
			cached.selector = selector;
		}
		return cached;
	};
	
	/**
	 * A low-level selection function that works with Sizzle's compiled
	 *  selector functions
	 * @param {String|Function} selector A selector or a pre-compiled
	 *  selector function built with Sizzle.compile
	 * @param {Element} context
	 * @param {Array} [results]
	 * @param {Array} [seed] A set of elements to match against
	 */
	select = Sizzle.select = function( selector, context, results, seed ) {
		var i, tokens, token, type, find,
			compiled = typeof selector === "function" && selector,
			match = !seed && tokenize( (selector = compiled.selector || selector) );
	
		results = results || [];
	
		// Try to minimize operations if there is only one selector in the list and no seed
		// (the latter of which guarantees us context)
		if ( match.length === 1 ) {
	
			// Reduce context if the leading compound selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {
	
				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;
	
				// Precompiled matchers will still verify ancestry, so step up a level
				} else if ( compiled ) {
					context = context.parentNode;
				}
	
				selector = selector.slice( tokens.shift().value.length );
			}
	
			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];
	
				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
					)) ) {
	
						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}
	
						break;
					}
				}
			}
		}
	
		// Compile and execute a filtering function if one is not provided
		// Provide `match` to avoid retokenization if we modified the selector above
		( compiled || compile( selector, match ) )(
			seed,
			context,
			!documentIsHTML,
			results,
			!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
		);
		return results;
	};
	
	// One-time assignments
	
	// Sort stability
	support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;
	
	// Support: Chrome 14-35+
	// Always assume duplicates if they aren't passed to the comparison function
	support.detectDuplicates = !!hasDuplicate;
	
	// Initialize against the default document
	setDocument();
	
	// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
	// Detached nodes confoundingly follow *each other*
	support.sortDetached = assert(function( el ) {
		// Should return 1, but returns 4 (following)
		return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
	});
	
	// Support: IE<8
	// Prevent attribute/property "interpolation"
	// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
	if ( !assert(function( el ) {
		el.innerHTML = "<a href='#'></a>";
		return el.firstChild.getAttribute("href") === "#" ;
	}) ) {
		addHandle( "type|href|height|width", function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
			}
		});
	}
	
	// Support: IE<9
	// Use defaultValue in place of getAttribute("value")
	if ( !support.attributes || !assert(function( el ) {
		el.innerHTML = "<input/>";
		el.firstChild.setAttribute( "value", "" );
		return el.firstChild.getAttribute( "value" ) === "";
	}) ) {
		addHandle( "value", function( elem, name, isXML ) {
			if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
				return elem.defaultValue;
			}
		});
	}
	
	// Support: IE<9
	// Use getAttributeNode to fetch booleans when getAttribute lies
	if ( !assert(function( el ) {
		return el.getAttribute("disabled") == null;
	}) ) {
		addHandle( booleans, function( elem, name, isXML ) {
			var val;
			if ( !isXML ) {
				return elem[ name ] === true ? name.toLowerCase() :
						(val = elem.getAttributeNode( name )) && val.specified ?
						val.value :
					null;
			}
		});
	}
	
	return Sizzle;
	
	})( window );
	
	
	
	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;
	
	// Deprecated
	jQuery.expr[ ":" ] = jQuery.expr.pseudos;
	jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;
	jQuery.escapeSelector = Sizzle.escape;
	
	
	
	
	var dir = function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;
	
		while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	};
	
	
	var siblings = function( n, elem ) {
		var matched = [];
	
		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}
	
		return matched;
	};
	
	
	var rneedsContext = jQuery.expr.match.needsContext;
	
	
	
	function nodeName( elem, name ) {
	
	  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	
	};
	var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );
	
	
	
	// Implement the identical functionality for filter and not
	function winnow( elements, qualifier, not ) {
		if ( isFunction( qualifier ) ) {
			return jQuery.grep( elements, function( elem, i ) {
				return !!qualifier.call( elem, i, elem ) !== not;
			} );
		}
	
		// Single element
		if ( qualifier.nodeType ) {
			return jQuery.grep( elements, function( elem ) {
				return ( elem === qualifier ) !== not;
			} );
		}
	
		// Arraylike of elements (jQuery, arguments, Array)
		if ( typeof qualifier !== "string" ) {
			return jQuery.grep( elements, function( elem ) {
				return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
			} );
		}
	
		// Filtered directly for both simple and complex selectors
		return jQuery.filter( qualifier, elements, not );
	}
	
	jQuery.filter = function( expr, elems, not ) {
		var elem = elems[ 0 ];
	
		if ( not ) {
			expr = ":not(" + expr + ")";
		}
	
		if ( elems.length === 1 && elem.nodeType === 1 ) {
			return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
		}
	
		return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
	};
	
	jQuery.fn.extend( {
		find: function( selector ) {
			var i, ret,
				len = this.length,
				self = this;
	
			if ( typeof selector !== "string" ) {
				return this.pushStack( jQuery( selector ).filter( function() {
					for ( i = 0; i < len; i++ ) {
						if ( jQuery.contains( self[ i ], this ) ) {
							return true;
						}
					}
				} ) );
			}
	
			ret = this.pushStack( [] );
	
			for ( i = 0; i < len; i++ ) {
				jQuery.find( selector, self[ i ], ret );
			}
	
			return len > 1 ? jQuery.uniqueSort( ret ) : ret;
		},
		filter: function( selector ) {
			return this.pushStack( winnow( this, selector || [], false ) );
		},
		not: function( selector ) {
			return this.pushStack( winnow( this, selector || [], true ) );
		},
		is: function( selector ) {
			return !!winnow(
				this,
	
				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				typeof selector === "string" && rneedsContext.test( selector ) ?
					jQuery( selector ) :
					selector || [],
				false
			).length;
		}
	} );
	
	
	// Initialize a jQuery object
	
	
	// A central reference to the root jQuery(document)
	var rootjQuery,
	
		// A simple way to check for HTML strings
		// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
		// Strict HTML recognition (#11290: must start with <)
		// Shortcut simple #id case for speed
		rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
	
		init = jQuery.fn.init = function( selector, context, root ) {
			var match, elem;
	
			// HANDLE: $(""), $(null), $(undefined), $(false)
			if ( !selector ) {
				return this;
			}
	
			// Method init() accepts an alternate rootjQuery
			// so migrate can support jQuery.sub (gh-2101)
			root = root || rootjQuery;
	
			// Handle HTML strings
			if ( typeof selector === "string" ) {
				if ( selector[ 0 ] === "<" &&
					selector[ selector.length - 1 ] === ">" &&
					selector.length >= 3 ) {
	
					// Assume that strings that start and end with <> are HTML and skip the regex check
					match = [ null, selector, null ];
	
				} else {
					match = rquickExpr.exec( selector );
				}
	
				// Match html or make sure no context is specified for #id
				if ( match && ( match[ 1 ] || !context ) ) {
	
					// HANDLE: $(html) -> $(array)
					if ( match[ 1 ] ) {
						context = context instanceof jQuery ? context[ 0 ] : context;
	
						// Option to run scripts is true for back-compat
						// Intentionally let the error be thrown if parseHTML is not present
						jQuery.merge( this, jQuery.parseHTML(
							match[ 1 ],
							context && context.nodeType ? context.ownerDocument || context : document,
							true
						) );
	
						// HANDLE: $(html, props)
						if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
							for ( match in context ) {
	
								// Properties of context are called as methods if possible
								if ( isFunction( this[ match ] ) ) {
									this[ match ]( context[ match ] );
	
								// ...and otherwise set as attributes
								} else {
									this.attr( match, context[ match ] );
								}
							}
						}
	
						return this;
	
					// HANDLE: $(#id)
					} else {
						elem = document.getElementById( match[ 2 ] );
	
						if ( elem ) {
	
							// Inject the element directly into the jQuery object
							this[ 0 ] = elem;
							this.length = 1;
						}
						return this;
					}
	
				// HANDLE: $(expr, $(...))
				} else if ( !context || context.jquery ) {
					return ( context || root ).find( selector );
	
				// HANDLE: $(expr, context)
				// (which is just equivalent to: $(context).find(expr)
				} else {
					return this.constructor( context ).find( selector );
				}
	
			// HANDLE: $(DOMElement)
			} else if ( selector.nodeType ) {
				this[ 0 ] = selector;
				this.length = 1;
				return this;
	
			// HANDLE: $(function)
			// Shortcut for document ready
			} else if ( isFunction( selector ) ) {
				return root.ready !== undefined ?
					root.ready( selector ) :
	
					// Execute immediately if ready is not present
					selector( jQuery );
			}
	
			return jQuery.makeArray( selector, this );
		};
	
	// Give the init function the jQuery prototype for later instantiation
	init.prototype = jQuery.fn;
	
	// Initialize central reference
	rootjQuery = jQuery( document );
	
	
	var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	
		// Methods guaranteed to produce a unique set when starting from a unique set
		guaranteedUnique = {
			children: true,
			contents: true,
			next: true,
			prev: true
		};
	
	jQuery.fn.extend( {
		has: function( target ) {
			var targets = jQuery( target, this ),
				l = targets.length;
	
			return this.filter( function() {
				var i = 0;
				for ( ; i < l; i++ ) {
					if ( jQuery.contains( this, targets[ i ] ) ) {
						return true;
					}
				}
			} );
		},
	
		closest: function( selectors, context ) {
			var cur,
				i = 0,
				l = this.length,
				matched = [],
				targets = typeof selectors !== "string" && jQuery( selectors );
	
			// Positional selectors never match, since there's no _selection_ context
			if ( !rneedsContext.test( selectors ) ) {
				for ( ; i < l; i++ ) {
					for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {
	
						// Always skip document fragments
						if ( cur.nodeType < 11 && ( targets ?
							targets.index( cur ) > -1 :
	
							// Don't pass non-elements to Sizzle
							cur.nodeType === 1 &&
								jQuery.find.matchesSelector( cur, selectors ) ) ) {
	
							matched.push( cur );
							break;
						}
					}
				}
			}
	
			return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
		},
	
		// Determine the position of an element within the set
		index: function( elem ) {
	
			// No argument, return index in parent
			if ( !elem ) {
				return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
			}
	
			// Index in selector
			if ( typeof elem === "string" ) {
				return indexOf.call( jQuery( elem ), this[ 0 ] );
			}
	
			// Locate the position of the desired element
			return indexOf.call( this,
	
				// If it receives a jQuery object, the first element is used
				elem.jquery ? elem[ 0 ] : elem
			);
		},
	
		add: function( selector, context ) {
			return this.pushStack(
				jQuery.uniqueSort(
					jQuery.merge( this.get(), jQuery( selector, context ) )
				)
			);
		},
	
		addBack: function( selector ) {
			return this.add( selector == null ?
				this.prevObject : this.prevObject.filter( selector )
			);
		}
	} );
	
	function sibling( cur, dir ) {
		while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
		return cur;
	}
	
	jQuery.each( {
		parent: function( elem ) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents: function( elem ) {
			return dir( elem, "parentNode" );
		},
		parentsUntil: function( elem, i, until ) {
			return dir( elem, "parentNode", until );
		},
		next: function( elem ) {
			return sibling( elem, "nextSibling" );
		},
		prev: function( elem ) {
			return sibling( elem, "previousSibling" );
		},
		nextAll: function( elem ) {
			return dir( elem, "nextSibling" );
		},
		prevAll: function( elem ) {
			return dir( elem, "previousSibling" );
		},
		nextUntil: function( elem, i, until ) {
			return dir( elem, "nextSibling", until );
		},
		prevUntil: function( elem, i, until ) {
			return dir( elem, "previousSibling", until );
		},
		siblings: function( elem ) {
			return siblings( ( elem.parentNode || {} ).firstChild, elem );
		},
		children: function( elem ) {
			return siblings( elem.firstChild );
		},
		contents: function( elem ) {
	        if ( nodeName( elem, "iframe" ) ) {
	            return elem.contentDocument;
	        }
	
	        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
	        // Treat the template element as a regular one in browsers that
	        // don't support it.
	        if ( nodeName( elem, "template" ) ) {
	            elem = elem.content || elem;
	        }
	
	        return jQuery.merge( [], elem.childNodes );
		}
	}, function( name, fn ) {
		jQuery.fn[ name ] = function( until, selector ) {
			var matched = jQuery.map( this, fn, until );
	
			if ( name.slice( -5 ) !== "Until" ) {
				selector = until;
			}
	
			if ( selector && typeof selector === "string" ) {
				matched = jQuery.filter( selector, matched );
			}
	
			if ( this.length > 1 ) {
	
				// Remove duplicates
				if ( !guaranteedUnique[ name ] ) {
					jQuery.uniqueSort( matched );
				}
	
				// Reverse order for parents* and prev-derivatives
				if ( rparentsprev.test( name ) ) {
					matched.reverse();
				}
			}
	
			return this.pushStack( matched );
		};
	} );
	var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );
	
	
	
	// Convert String-formatted options into Object-formatted ones
	function createOptions( options ) {
		var object = {};
		jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
			object[ flag ] = true;
		} );
		return object;
	}
	
	/*
	 * Create a callback list using the following parameters:
	 *
	 *	options: an optional list of space-separated options that will change how
	 *			the callback list behaves or a more traditional option object
	 *
	 * By default a callback list will act like an event callback list and can be
	 * "fired" multiple times.
	 *
	 * Possible options:
	 *
	 *	once:			will ensure the callback list can only be fired once (like a Deferred)
	 *
	 *	memory:			will keep track of previous values and will call any callback added
	 *					after the list has been fired right away with the latest "memorized"
	 *					values (like a Deferred)
	 *
	 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
	 *
	 *	stopOnFalse:	interrupt callings when a callback returns false
	 *
	 */
	jQuery.Callbacks = function( options ) {
	
		// Convert options from String-formatted to Object-formatted if needed
		// (we check in cache first)
		options = typeof options === "string" ?
			createOptions( options ) :
			jQuery.extend( {}, options );
	
		var // Flag to know if list is currently firing
			firing,
	
			// Last fire value for non-forgettable lists
			memory,
	
			// Flag to know if list was already fired
			fired,
	
			// Flag to prevent firing
			locked,
	
			// Actual callback list
			list = [],
	
			// Queue of execution data for repeatable lists
			queue = [],
	
			// Index of currently firing callback (modified by add/remove as needed)
			firingIndex = -1,
	
			// Fire callbacks
			fire = function() {
	
				// Enforce single-firing
				locked = locked || options.once;
	
				// Execute callbacks for all pending executions,
				// respecting firingIndex overrides and runtime changes
				fired = firing = true;
				for ( ; queue.length; firingIndex = -1 ) {
					memory = queue.shift();
					while ( ++firingIndex < list.length ) {
	
						// Run callback and check for early termination
						if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
							options.stopOnFalse ) {
	
							// Jump to end and forget the data so .add doesn't re-fire
							firingIndex = list.length;
							memory = false;
						}
					}
				}
	
				// Forget the data if we're done with it
				if ( !options.memory ) {
					memory = false;
				}
	
				firing = false;
	
				// Clean up if we're done firing for good
				if ( locked ) {
	
					// Keep an empty list if we have data for future add calls
					if ( memory ) {
						list = [];
	
					// Otherwise, this object is spent
					} else {
						list = "";
					}
				}
			},
	
			// Actual Callbacks object
			self = {
	
				// Add a callback or a collection of callbacks to the list
				add: function() {
					if ( list ) {
	
						// If we have memory from a past run, we should fire after adding
						if ( memory && !firing ) {
							firingIndex = list.length - 1;
							queue.push( memory );
						}
	
						( function add( args ) {
							jQuery.each( args, function( _, arg ) {
								if ( isFunction( arg ) ) {
									if ( !options.unique || !self.has( arg ) ) {
										list.push( arg );
									}
								} else if ( arg && arg.length && toType( arg ) !== "string" ) {
	
									// Inspect recursively
									add( arg );
								}
							} );
						} )( arguments );
	
						if ( memory && !firing ) {
							fire();
						}
					}
					return this;
				},
	
				// Remove a callback from the list
				remove: function() {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
	
							// Handle firing indexes
							if ( index <= firingIndex ) {
								firingIndex--;
							}
						}
					} );
					return this;
				},
	
				// Check if a given callback is in the list.
				// If no argument is given, return whether or not list has callbacks attached.
				has: function( fn ) {
					return fn ?
						jQuery.inArray( fn, list ) > -1 :
						list.length > 0;
				},
	
				// Remove all callbacks from the list
				empty: function() {
					if ( list ) {
						list = [];
					}
					return this;
				},
	
				// Disable .fire and .add
				// Abort any current/pending executions
				// Clear all callbacks and values
				disable: function() {
					locked = queue = [];
					list = memory = "";
					return this;
				},
				disabled: function() {
					return !list;
				},
	
				// Disable .fire
				// Also disable .add unless we have memory (since it would have no effect)
				// Abort any pending executions
				lock: function() {
					locked = queue = [];
					if ( !memory && !firing ) {
						list = memory = "";
					}
					return this;
				},
				locked: function() {
					return !!locked;
				},
	
				// Call all callbacks with the given context and arguments
				fireWith: function( context, args ) {
					if ( !locked ) {
						args = args || [];
						args = [ context, args.slice ? args.slice() : args ];
						queue.push( args );
						if ( !firing ) {
							fire();
						}
					}
					return this;
				},
	
				// Call all the callbacks with the given arguments
				fire: function() {
					self.fireWith( this, arguments );
					return this;
				},
	
				// To know if the callbacks have already been called at least once
				fired: function() {
					return !!fired;
				}
			};
	
		return self;
	};
	
	
	function Identity( v ) {
		return v;
	}
	function Thrower( ex ) {
		throw ex;
	}
	
	function adoptValue( value, resolve, reject, noValue ) {
		var method;
	
		try {
	
			// Check for promise aspect first to privilege synchronous behavior
			if ( value && isFunction( ( method = value.promise ) ) ) {
				method.call( value ).done( resolve ).fail( reject );
	
			// Other thenables
			} else if ( value && isFunction( ( method = value.then ) ) ) {
				method.call( value, resolve, reject );
	
			// Other non-thenables
			} else {
	
				// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
				// * false: [ value ].slice( 0 ) => resolve( value )
				// * true: [ value ].slice( 1 ) => resolve()
				resolve.apply( undefined, [ value ].slice( noValue ) );
			}
	
		// For Promises/A+, convert exceptions into rejections
		// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
		// Deferred#then to conditionally suppress rejection.
		} catch ( value ) {
	
			// Support: Android 4.0 only
			// Strict mode functions invoked without .call/.apply get global-object context
			reject.apply( undefined, [ value ] );
		}
	}
	
	jQuery.extend( {
	
		Deferred: function( func ) {
			var tuples = [
	
					// action, add listener, callbacks,
					// ... .then handlers, argument index, [final state]
					[ "notify", "progress", jQuery.Callbacks( "memory" ),
						jQuery.Callbacks( "memory" ), 2 ],
					[ "resolve", "done", jQuery.Callbacks( "once memory" ),
						jQuery.Callbacks( "once memory" ), 0, "resolved" ],
					[ "reject", "fail", jQuery.Callbacks( "once memory" ),
						jQuery.Callbacks( "once memory" ), 1, "rejected" ]
				],
				state = "pending",
				promise = {
					state: function() {
						return state;
					},
					always: function() {
						deferred.done( arguments ).fail( arguments );
						return this;
					},
					"catch": function( fn ) {
						return promise.then( null, fn );
					},
	
					// Keep pipe for back-compat
					pipe: function( /* fnDone, fnFail, fnProgress */ ) {
						var fns = arguments;
	
						return jQuery.Deferred( function( newDefer ) {
							jQuery.each( tuples, function( i, tuple ) {
	
								// Map tuples (progress, done, fail) to arguments (done, fail, progress)
								var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];
	
								// deferred.progress(function() { bind to newDefer or newDefer.notify })
								// deferred.done(function() { bind to newDefer or newDefer.resolve })
								// deferred.fail(function() { bind to newDefer or newDefer.reject })
								deferred[ tuple[ 1 ] ]( function() {
									var returned = fn && fn.apply( this, arguments );
									if ( returned && isFunction( returned.promise ) ) {
										returned.promise()
											.progress( newDefer.notify )
											.done( newDefer.resolve )
											.fail( newDefer.reject );
									} else {
										newDefer[ tuple[ 0 ] + "With" ](
											this,
											fn ? [ returned ] : arguments
										);
									}
								} );
							} );
							fns = null;
						} ).promise();
					},
					then: function( onFulfilled, onRejected, onProgress ) {
						var maxDepth = 0;
						function resolve( depth, deferred, handler, special ) {
							return function() {
								var that = this,
									args = arguments,
									mightThrow = function() {
										var returned, then;
	
										// Support: Promises/A+ section 2.3.3.3.3
										// https://promisesaplus.com/#point-59
										// Ignore double-resolution attempts
										if ( depth < maxDepth ) {
											return;
										}
	
										returned = handler.apply( that, args );
	
										// Support: Promises/A+ section 2.3.1
										// https://promisesaplus.com/#point-48
										if ( returned === deferred.promise() ) {
											throw new TypeError( "Thenable self-resolution" );
										}
	
										// Support: Promises/A+ sections 2.3.3.1, 3.5
										// https://promisesaplus.com/#point-54
										// https://promisesaplus.com/#point-75
										// Retrieve `then` only once
										then = returned &&
	
											// Support: Promises/A+ section 2.3.4
											// https://promisesaplus.com/#point-64
											// Only check objects and functions for thenability
											( typeof returned === "object" ||
												typeof returned === "function" ) &&
											returned.then;
	
										// Handle a returned thenable
										if ( isFunction( then ) ) {
	
											// Special processors (notify) just wait for resolution
											if ( special ) {
												then.call(
													returned,
													resolve( maxDepth, deferred, Identity, special ),
													resolve( maxDepth, deferred, Thrower, special )
												);
	
											// Normal processors (resolve) also hook into progress
											} else {
	
												// ...and disregard older resolution values
												maxDepth++;
	
												then.call(
													returned,
													resolve( maxDepth, deferred, Identity, special ),
													resolve( maxDepth, deferred, Thrower, special ),
													resolve( maxDepth, deferred, Identity,
														deferred.notifyWith )
												);
											}
	
										// Handle all other returned values
										} else {
	
											// Only substitute handlers pass on context
											// and multiple values (non-spec behavior)
											if ( handler !== Identity ) {
												that = undefined;
												args = [ returned ];
											}
	
											// Process the value(s)
											// Default process is resolve
											( special || deferred.resolveWith )( that, args );
										}
									},
	
									// Only normal processors (resolve) catch and reject exceptions
									process = special ?
										mightThrow :
										function() {
											try {
												mightThrow();
											} catch ( e ) {
	
												if ( jQuery.Deferred.exceptionHook ) {
													jQuery.Deferred.exceptionHook( e,
														process.stackTrace );
												}
	
												// Support: Promises/A+ section 2.3.3.3.4.1
												// https://promisesaplus.com/#point-61
												// Ignore post-resolution exceptions
												if ( depth + 1 >= maxDepth ) {
	
													// Only substitute handlers pass on context
													// and multiple values (non-spec behavior)
													if ( handler !== Thrower ) {
														that = undefined;
														args = [ e ];
													}
	
													deferred.rejectWith( that, args );
												}
											}
										};
	
								// Support: Promises/A+ section 2.3.3.3.1
								// https://promisesaplus.com/#point-57
								// Re-resolve promises immediately to dodge false rejection from
								// subsequent errors
								if ( depth ) {
									process();
								} else {
	
									// Call an optional hook to record the stack, in case of exception
									// since it's otherwise lost when execution goes async
									if ( jQuery.Deferred.getStackHook ) {
										process.stackTrace = jQuery.Deferred.getStackHook();
									}
									window.setTimeout( process );
								}
							};
						}
	
						return jQuery.Deferred( function( newDefer ) {
	
							// progress_handlers.add( ... )
							tuples[ 0 ][ 3 ].add(
								resolve(
									0,
									newDefer,
									isFunction( onProgress ) ?
										onProgress :
										Identity,
									newDefer.notifyWith
								)
							);
	
							// fulfilled_handlers.add( ... )
							tuples[ 1 ][ 3 ].add(
								resolve(
									0,
									newDefer,
									isFunction( onFulfilled ) ?
										onFulfilled :
										Identity
								)
							);
	
							// rejected_handlers.add( ... )
							tuples[ 2 ][ 3 ].add(
								resolve(
									0,
									newDefer,
									isFunction( onRejected ) ?
										onRejected :
										Thrower
								)
							);
						} ).promise();
					},
	
					// Get a promise for this deferred
					// If obj is provided, the promise aspect is added to the object
					promise: function( obj ) {
						return obj != null ? jQuery.extend( obj, promise ) : promise;
					}
				},
				deferred = {};
	
			// Add list-specific methods
			jQuery.each( tuples, function( i, tuple ) {
				var list = tuple[ 2 ],
					stateString = tuple[ 5 ];
	
				// promise.progress = list.add
				// promise.done = list.add
				// promise.fail = list.add
				promise[ tuple[ 1 ] ] = list.add;
	
				// Handle state
				if ( stateString ) {
					list.add(
						function() {
	
							// state = "resolved" (i.e., fulfilled)
							// state = "rejected"
							state = stateString;
						},
	
						// rejected_callbacks.disable
						// fulfilled_callbacks.disable
						tuples[ 3 - i ][ 2 ].disable,
	
						// rejected_handlers.disable
						// fulfilled_handlers.disable
						tuples[ 3 - i ][ 3 ].disable,
	
						// progress_callbacks.lock
						tuples[ 0 ][ 2 ].lock,
	
						// progress_handlers.lock
						tuples[ 0 ][ 3 ].lock
					);
				}
	
				// progress_handlers.fire
				// fulfilled_handlers.fire
				// rejected_handlers.fire
				list.add( tuple[ 3 ].fire );
	
				// deferred.notify = function() { deferred.notifyWith(...) }
				// deferred.resolve = function() { deferred.resolveWith(...) }
				// deferred.reject = function() { deferred.rejectWith(...) }
				deferred[ tuple[ 0 ] ] = function() {
					deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
					return this;
				};
	
				// deferred.notifyWith = list.fireWith
				// deferred.resolveWith = list.fireWith
				// deferred.rejectWith = list.fireWith
				deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
			} );
	
			// Make the deferred a promise
			promise.promise( deferred );
	
			// Call given func if any
			if ( func ) {
				func.call( deferred, deferred );
			}
	
			// All done!
			return deferred;
		},
	
		// Deferred helper
		when: function( singleValue ) {
			var
	
				// count of uncompleted subordinates
				remaining = arguments.length,
	
				// count of unprocessed arguments
				i = remaining,
	
				// subordinate fulfillment data
				resolveContexts = Array( i ),
				resolveValues = slice.call( arguments ),
	
				// the master Deferred
				master = jQuery.Deferred(),
	
				// subordinate callback factory
				updateFunc = function( i ) {
					return function( value ) {
						resolveContexts[ i ] = this;
						resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
						if ( !( --remaining ) ) {
							master.resolveWith( resolveContexts, resolveValues );
						}
					};
				};
	
			// Single- and empty arguments are adopted like Promise.resolve
			if ( remaining <= 1 ) {
				adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
					!remaining );
	
				// Use .then() to unwrap secondary thenables (cf. gh-3000)
				if ( master.state() === "pending" ||
					isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {
	
					return master.then();
				}
			}
	
			// Multiple arguments are aggregated like Promise.all array elements
			while ( i-- ) {
				adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
			}
	
			return master.promise();
		}
	} );
	
	
	// These usually indicate a programmer mistake during development,
	// warn about them ASAP rather than swallowing them by default.
	var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
	
	jQuery.Deferred.exceptionHook = function( error, stack ) {
	
		// Support: IE 8 - 9 only
		// Console exists when dev tools are open, which can happen at any time
		if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
			window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
		}
	};
	
	
	
	
	jQuery.readyException = function( error ) {
		window.setTimeout( function() {
			throw error;
		} );
	};
	
	
	
	
	// The deferred used on DOM ready
	var readyList = jQuery.Deferred();
	
	jQuery.fn.ready = function( fn ) {
	
		readyList
			.then( fn )
	
			// Wrap jQuery.readyException in a function so that the lookup
			// happens at the time of error handling instead of callback
			// registration.
			.catch( function( error ) {
				jQuery.readyException( error );
			} );
	
		return this;
	};
	
	jQuery.extend( {
	
		// Is the DOM ready to be used? Set to true once it occurs.
		isReady: false,
	
		// A counter to track how many items to wait for before
		// the ready event fires. See #6781
		readyWait: 1,
	
		// Handle when the DOM is ready
		ready: function( wait ) {
	
			// Abort if there are pending holds or we're already ready
			if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
				return;
			}
	
			// Remember that the DOM is ready
			jQuery.isReady = true;
	
			// If a normal DOM Ready event fired, decrement, and wait if need be
			if ( wait !== true && --jQuery.readyWait > 0 ) {
				return;
			}
	
			// If there are functions bound, to execute
			readyList.resolveWith( document, [ jQuery ] );
		}
	} );
	
	jQuery.ready.then = readyList.then;
	
	// The ready event handler and self cleanup method
	function completed() {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );
		jQuery.ready();
	}
	
	// Catch cases where $(document).ready() is called
	// after the browser event has already occurred.
	// Support: IE <=9 - 10 only
	// Older IE sometimes signals "interactive" too soon
	if ( document.readyState === "complete" ||
		( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {
	
		// Handle it asynchronously to allow scripts the opportunity to delay ready
		window.setTimeout( jQuery.ready );
	
	} else {
	
		// Use the handy event callback
		document.addEventListener( "DOMContentLoaded", completed );
	
		// A fallback to window.onload, that will always work
		window.addEventListener( "load", completed );
	}
	
	
	
	
	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			len = elems.length,
			bulk = key == null;
	
		// Sets many values
		if ( toType( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				access( elems, fn, i, key[ i ], true, emptyGet, raw );
			}
	
		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;
	
			if ( !isFunction( value ) ) {
				raw = true;
			}
	
			if ( bulk ) {
	
				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;
	
				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}
	
			if ( fn ) {
				for ( ; i < len; i++ ) {
					fn(
						elems[ i ], key, raw ?
						value :
						value.call( elems[ i ], i, fn( elems[ i ], key ) )
					);
				}
			}
		}
	
		if ( chainable ) {
			return elems;
		}
	
		// Gets
		if ( bulk ) {
			return fn.call( elems );
		}
	
		return len ? fn( elems[ 0 ], key ) : emptyGet;
	};
	
	
	// Matches dashed string for camelizing
	var rmsPrefix = /^-ms-/,
		rdashAlpha = /-([a-z])/g;
	
	// Used by camelCase as callback to replace()
	function fcamelCase( all, letter ) {
		return letter.toUpperCase();
	}
	
	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE <=9 - 11, Edge 12 - 15
	// Microsoft forgot to hump their vendor prefix (#9572)
	function camelCase( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	}
	var acceptData = function( owner ) {
	
		// Accepts only:
		//  - Node
		//    - Node.ELEMENT_NODE
		//    - Node.DOCUMENT_NODE
		//  - Object
		//    - Any
		return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
	};
	
	
	
	
	function Data() {
		this.expando = jQuery.expando + Data.uid++;
	}
	
	Data.uid = 1;
	
	Data.prototype = {
	
		cache: function( owner ) {
	
			// Check if the owner object already has a cache
			var value = owner[ this.expando ];
	
			// If not, create one
			if ( !value ) {
				value = {};
	
				// We can accept data for non-element nodes in modern browsers,
				// but we should not, see #8335.
				// Always return an empty object.
				if ( acceptData( owner ) ) {
	
					// If it is a node unlikely to be stringify-ed or looped over
					// use plain assignment
					if ( owner.nodeType ) {
						owner[ this.expando ] = value;
	
					// Otherwise secure it in a non-enumerable property
					// configurable must be true to allow the property to be
					// deleted when data is removed
					} else {
						Object.defineProperty( owner, this.expando, {
							value: value,
							configurable: true
						} );
					}
				}
			}
	
			return value;
		},
		set: function( owner, data, value ) {
			var prop,
				cache = this.cache( owner );
	
			// Handle: [ owner, key, value ] args
			// Always use camelCase key (gh-2257)
			if ( typeof data === "string" ) {
				cache[ camelCase( data ) ] = value;
	
			// Handle: [ owner, { properties } ] args
			} else {
	
				// Copy the properties one-by-one to the cache object
				for ( prop in data ) {
					cache[ camelCase( prop ) ] = data[ prop ];
				}
			}
			return cache;
		},
		get: function( owner, key ) {
			return key === undefined ?
				this.cache( owner ) :
	
				// Always use camelCase key (gh-2257)
				owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
		},
		access: function( owner, key, value ) {
	
			// In cases where either:
			//
			//   1. No key was specified
			//   2. A string key was specified, but no value provided
			//
			// Take the "read" path and allow the get method to determine
			// which value to return, respectively either:
			//
			//   1. The entire cache object
			//   2. The data stored at the key
			//
			if ( key === undefined ||
					( ( key && typeof key === "string" ) && value === undefined ) ) {
	
				return this.get( owner, key );
			}
	
			// When the key is not a string, or both a key and value
			// are specified, set or extend (existing objects) with either:
			//
			//   1. An object of properties
			//   2. A key and value
			//
			this.set( owner, key, value );
	
			// Since the "set" path can have two possible entry points
			// return the expected data based on which path was taken[*]
			return value !== undefined ? value : key;
		},
		remove: function( owner, key ) {
			var i,
				cache = owner[ this.expando ];
	
			if ( cache === undefined ) {
				return;
			}
	
			if ( key !== undefined ) {
	
				// Support array or space separated string of keys
				if ( Array.isArray( key ) ) {
	
					// If key is an array of keys...
					// We always set camelCase keys, so remove that.
					key = key.map( camelCase );
				} else {
					key = camelCase( key );
	
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					key = key in cache ?
						[ key ] :
						( key.match( rnothtmlwhite ) || [] );
				}
	
				i = key.length;
	
				while ( i-- ) {
					delete cache[ key[ i ] ];
				}
			}
	
			// Remove the expando if there's no more data
			if ( key === undefined || jQuery.isEmptyObject( cache ) ) {
	
				// Support: Chrome <=35 - 45
				// Webkit & Blink performance suffers when deleting properties
				// from DOM nodes, so set to undefined instead
				// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
				if ( owner.nodeType ) {
					owner[ this.expando ] = undefined;
				} else {
					delete owner[ this.expando ];
				}
			}
		},
		hasData: function( owner ) {
			var cache = owner[ this.expando ];
			return cache !== undefined && !jQuery.isEmptyObject( cache );
		}
	};
	var dataPriv = new Data();
	
	var dataUser = new Data();
	
	
	
	//	Implementation Summary
	//
	//	1. Enforce API surface and semantic compatibility with 1.9.x branch
	//	2. Improve the module's maintainability by reducing the storage
	//		paths to a single mechanism.
	//	3. Use the same single mechanism to support "private" and "user" data.
	//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	//	5. Avoid exposing implementation details on user objects (eg. expando properties)
	//	6. Provide a clear path for implementation upgrade to WeakMap in 2014
	
	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		rmultiDash = /[A-Z]/g;
	
	function getData( data ) {
		if ( data === "true" ) {
			return true;
		}
	
		if ( data === "false" ) {
			return false;
		}
	
		if ( data === "null" ) {
			return null;
		}
	
		// Only convert to a number if it doesn't change the string
		if ( data === +data + "" ) {
			return +data;
		}
	
		if ( rbrace.test( data ) ) {
			return JSON.parse( data );
		}
	
		return data;
	}
	
	function dataAttr( elem, key, data ) {
		var name;
	
		// If nothing was found internally, try to fetch any
		// data from the HTML5 data-* attribute
		if ( data === undefined && elem.nodeType === 1 ) {
			name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
			data = elem.getAttribute( name );
	
			if ( typeof data === "string" ) {
				try {
					data = getData( data );
				} catch ( e ) {}
	
				// Make sure we set the data so it isn't changed later
				dataUser.set( elem, key, data );
			} else {
				data = undefined;
			}
		}
		return data;
	}
	
	jQuery.extend( {
		hasData: function( elem ) {
			return dataUser.hasData( elem ) || dataPriv.hasData( elem );
		},
	
		data: function( elem, name, data ) {
			return dataUser.access( elem, name, data );
		},
	
		removeData: function( elem, name ) {
			dataUser.remove( elem, name );
		},
	
		// TODO: Now that all calls to _data and _removeData have been replaced
		// with direct calls to dataPriv methods, these can be deprecated.
		_data: function( elem, name, data ) {
			return dataPriv.access( elem, name, data );
		},
	
		_removeData: function( elem, name ) {
			dataPriv.remove( elem, name );
		}
	} );
	
	jQuery.fn.extend( {
		data: function( key, value ) {
			var i, name, data,
				elem = this[ 0 ],
				attrs = elem && elem.attributes;
	
			// Gets all values
			if ( key === undefined ) {
				if ( this.length ) {
					data = dataUser.get( elem );
	
					if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
						i = attrs.length;
						while ( i-- ) {
	
							// Support: IE 11 only
							// The attrs elements can be null (#14894)
							if ( attrs[ i ] ) {
								name = attrs[ i ].name;
								if ( name.indexOf( "data-" ) === 0 ) {
									name = camelCase( name.slice( 5 ) );
									dataAttr( elem, name, data[ name ] );
								}
							}
						}
						dataPriv.set( elem, "hasDataAttrs", true );
					}
				}
	
				return data;
			}
	
			// Sets multiple values
			if ( typeof key === "object" ) {
				return this.each( function() {
					dataUser.set( this, key );
				} );
			}
	
			return access( this, function( value ) {
				var data;
	
				// The calling jQuery object (element matches) is not empty
				// (and therefore has an element appears at this[ 0 ]) and the
				// `value` parameter was not undefined. An empty jQuery object
				// will result in `undefined` for elem = this[ 0 ] which will
				// throw an exception if an attempt to read a data cache is made.
				if ( elem && value === undefined ) {
	
					// Attempt to get data from the cache
					// The key will always be camelCased in Data
					data = dataUser.get( elem, key );
					if ( data !== undefined ) {
						return data;
					}
	
					// Attempt to "discover" the data in
					// HTML5 custom data-* attrs
					data = dataAttr( elem, key );
					if ( data !== undefined ) {
						return data;
					}
	
					// We tried really hard, but the data doesn't exist.
					return;
				}
	
				// Set the data...
				this.each( function() {
	
					// We always store the camelCased key
					dataUser.set( this, key, value );
				} );
			}, null, value, arguments.length > 1, null, true );
		},
	
		removeData: function( key ) {
			return this.each( function() {
				dataUser.remove( this, key );
			} );
		}
	} );
	
	
	jQuery.extend( {
		queue: function( elem, type, data ) {
			var queue;
	
			if ( elem ) {
				type = ( type || "fx" ) + "queue";
				queue = dataPriv.get( elem, type );
	
				// Speed up dequeue by getting out quickly if this is just a lookup
				if ( data ) {
					if ( !queue || Array.isArray( data ) ) {
						queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
					} else {
						queue.push( data );
					}
				}
				return queue || [];
			}
		},
	
		dequeue: function( elem, type ) {
			type = type || "fx";
	
			var queue = jQuery.queue( elem, type ),
				startLength = queue.length,
				fn = queue.shift(),
				hooks = jQuery._queueHooks( elem, type ),
				next = function() {
					jQuery.dequeue( elem, type );
				};
	
			// If the fx queue is dequeued, always remove the progress sentinel
			if ( fn === "inprogress" ) {
				fn = queue.shift();
				startLength--;
			}
	
			if ( fn ) {
	
				// Add a progress sentinel to prevent the fx queue from being
				// automatically dequeued
				if ( type === "fx" ) {
					queue.unshift( "inprogress" );
				}
	
				// Clear up the last queue stop function
				delete hooks.stop;
				fn.call( elem, next, hooks );
			}
	
			if ( !startLength && hooks ) {
				hooks.empty.fire();
			}
		},
	
		// Not public - generate a queueHooks object, or return the current one
		_queueHooks: function( elem, type ) {
			var key = type + "queueHooks";
			return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
				empty: jQuery.Callbacks( "once memory" ).add( function() {
					dataPriv.remove( elem, [ type + "queue", key ] );
				} )
			} );
		}
	} );
	
	jQuery.fn.extend( {
		queue: function( type, data ) {
			var setter = 2;
	
			if ( typeof type !== "string" ) {
				data = type;
				type = "fx";
				setter--;
			}
	
			if ( arguments.length < setter ) {
				return jQuery.queue( this[ 0 ], type );
			}
	
			return data === undefined ?
				this :
				this.each( function() {
					var queue = jQuery.queue( this, type, data );
	
					// Ensure a hooks for this queue
					jQuery._queueHooks( this, type );
	
					if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
						jQuery.dequeue( this, type );
					}
				} );
		},
		dequeue: function( type ) {
			return this.each( function() {
				jQuery.dequeue( this, type );
			} );
		},
		clearQueue: function( type ) {
			return this.queue( type || "fx", [] );
		},
	
		// Get a promise resolved when queues of a certain type
		// are emptied (fx is the type by default)
		promise: function( type, obj ) {
			var tmp,
				count = 1,
				defer = jQuery.Deferred(),
				elements = this,
				i = this.length,
				resolve = function() {
					if ( !( --count ) ) {
						defer.resolveWith( elements, [ elements ] );
					}
				};
	
			if ( typeof type !== "string" ) {
				obj = type;
				type = undefined;
			}
			type = type || "fx";
	
			while ( i-- ) {
				tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
				if ( tmp && tmp.empty ) {
					count++;
					tmp.empty.add( resolve );
				}
			}
			resolve();
			return defer.promise( obj );
		}
	} );
	var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;
	
	var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );
	
	
	var cssExpand = [ "Top", "Right", "Bottom", "Left" ];
	
	var isHiddenWithinTree = function( elem, el ) {
	
			// isHiddenWithinTree might be called from jQuery#filter function;
			// in that case, element will be second argument
			elem = el || elem;
	
			// Inline style trumps all
			return elem.style.display === "none" ||
				elem.style.display === "" &&
	
				// Otherwise, check computed style
				// Support: Firefox <=43 - 45
				// Disconnected elements can have computed display: none, so first confirm that elem is
				// in the document.
				jQuery.contains( elem.ownerDocument, elem ) &&
	
				jQuery.css( elem, "display" ) === "none";
		};
	
	var swap = function( elem, options, callback, args ) {
		var ret, name,
			old = {};
	
		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}
	
		ret = callback.apply( elem, args || [] );
	
		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}
	
		return ret;
	};
	
	
	
	
	function adjustCSS( elem, prop, valueParts, tween ) {
		var adjusted, scale,
			maxIterations = 20,
			currentValue = tween ?
				function() {
					return tween.cur();
				} :
				function() {
					return jQuery.css( elem, prop, "" );
				},
			initial = currentValue(),
			unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),
	
			// Starting value computation is required for potential unit mismatches
			initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
				rcssNum.exec( jQuery.css( elem, prop ) );
	
		if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {
	
			// Support: Firefox <=54
			// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
			initial = initial / 2;
	
			// Trust units reported by jQuery.css
			unit = unit || initialInUnit[ 3 ];
	
			// Iteratively approximate from a nonzero starting point
			initialInUnit = +initial || 1;
	
			while ( maxIterations-- ) {
	
				// Evaluate and update our best guess (doubling guesses that zero out).
				// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
				jQuery.style( elem, prop, initialInUnit + unit );
				if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
					maxIterations = 0;
				}
				initialInUnit = initialInUnit / scale;
	
			}
	
			initialInUnit = initialInUnit * 2;
			jQuery.style( elem, prop, initialInUnit + unit );
	
			// Make sure we update the tween properties later on
			valueParts = valueParts || [];
		}
	
		if ( valueParts ) {
			initialInUnit = +initialInUnit || +initial || 0;
	
			// Apply relative offset (+=/-=) if specified
			adjusted = valueParts[ 1 ] ?
				initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
				+valueParts[ 2 ];
			if ( tween ) {
				tween.unit = unit;
				tween.start = initialInUnit;
				tween.end = adjusted;
			}
		}
		return adjusted;
	}
	
	
	var defaultDisplayMap = {};
	
	function getDefaultDisplay( elem ) {
		var temp,
			doc = elem.ownerDocument,
			nodeName = elem.nodeName,
			display = defaultDisplayMap[ nodeName ];
	
		if ( display ) {
			return display;
		}
	
		temp = doc.body.appendChild( doc.createElement( nodeName ) );
		display = jQuery.css( temp, "display" );
	
		temp.parentNode.removeChild( temp );
	
		if ( display === "none" ) {
			display = "block";
		}
		defaultDisplayMap[ nodeName ] = display;
	
		return display;
	}
	
	function showHide( elements, show ) {
		var display, elem,
			values = [],
			index = 0,
			length = elements.length;
	
		// Determine new display value for elements that need to change
		for ( ; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}
	
			display = elem.style.display;
			if ( show ) {
	
				// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
				// check is required in this first loop unless we have a nonempty display value (either
				// inline or about-to-be-restored)
				if ( display === "none" ) {
					values[ index ] = dataPriv.get( elem, "display" ) || null;
					if ( !values[ index ] ) {
						elem.style.display = "";
					}
				}
				if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
					values[ index ] = getDefaultDisplay( elem );
				}
			} else {
				if ( display !== "none" ) {
					values[ index ] = "none";
	
					// Remember what we're overwriting
					dataPriv.set( elem, "display", display );
				}
			}
		}
	
		// Set the display of the elements in a second loop to avoid constant reflow
		for ( index = 0; index < length; index++ ) {
			if ( values[ index ] != null ) {
				elements[ index ].style.display = values[ index ];
			}
		}
	
		return elements;
	}
	
	jQuery.fn.extend( {
		show: function() {
			return showHide( this, true );
		},
		hide: function() {
			return showHide( this );
		},
		toggle: function( state ) {
			if ( typeof state === "boolean" ) {
				return state ? this.show() : this.hide();
			}
	
			return this.each( function() {
				if ( isHiddenWithinTree( this ) ) {
					jQuery( this ).show();
				} else {
					jQuery( this ).hide();
				}
			} );
		}
	} );
	var rcheckableType = ( /^(?:checkbox|radio)$/i );
	
	var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );
	
	var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );
	
	
	
	// We have to close these tags to support XHTML (#13200)
	var wrapMap = {
	
		// Support: IE <=9 only
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
	
		// XHTML parsers do not magically insert elements in the
		// same way that tag soup parsers do. So we cannot shorten
		// this by omitting <tbody> or other required elements.
		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
	
		_default: [ 0, "", "" ]
	};
	
	// Support: IE <=9 only
	wrapMap.optgroup = wrapMap.option;
	
	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;
	
	
	function getAll( context, tag ) {
	
		// Support: IE <=9 - 11 only
		// Use typeof to avoid zero-argument method invocation on host objects (#15151)
		var ret;
	
		if ( typeof context.getElementsByTagName !== "undefined" ) {
			ret = context.getElementsByTagName( tag || "*" );
	
		} else if ( typeof context.querySelectorAll !== "undefined" ) {
			ret = context.querySelectorAll( tag || "*" );
	
		} else {
			ret = [];
		}
	
		if ( tag === undefined || tag && nodeName( context, tag ) ) {
			return jQuery.merge( [ context ], ret );
		}
	
		return ret;
	}
	
	
	// Mark scripts as having already been evaluated
	function setGlobalEval( elems, refElements ) {
		var i = 0,
			l = elems.length;
	
		for ( ; i < l; i++ ) {
			dataPriv.set(
				elems[ i ],
				"globalEval",
				!refElements || dataPriv.get( refElements[ i ], "globalEval" )
			);
		}
	}
	
	
	var rhtml = /<|&#?\w+;/;
	
	function buildFragment( elems, context, scripts, selection, ignored ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;
	
		for ( ; i < l; i++ ) {
			elem = elems[ i ];
	
			if ( elem || elem === 0 ) {
	
				// Add nodes directly
				if ( toType( elem ) === "object" ) {
	
					// Support: Android <=4.0 only, PhantomJS 1 only
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );
	
				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );
	
				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement( "div" ) );
	
					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];
	
					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}
	
					// Support: Android <=4.0 only, PhantomJS 1 only
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );
	
					// Remember the top-level container
					tmp = fragment.firstChild;
	
					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}
	
		// Remove wrapper from fragment
		fragment.textContent = "";
	
		i = 0;
		while ( ( elem = nodes[ i++ ] ) ) {
	
			// Skip elements already in the context collection (trac-4087)
			if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
				if ( ignored ) {
					ignored.push( elem );
				}
				continue;
			}
	
			contains = jQuery.contains( elem.ownerDocument, elem );
	
			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );
	
			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}
	
			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( ( elem = tmp[ j++ ] ) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}
	
		return fragment;
	}
	
	
	( function() {
		var fragment = document.createDocumentFragment(),
			div = fragment.appendChild( document.createElement( "div" ) ),
			input = document.createElement( "input" );
	
		// Support: Android 4.0 - 4.3 only
		// Check state lost if the name is set (#11217)
		// Support: Windows Web Apps (WWA)
		// `name` and `type` must use .setAttribute for WWA (#14901)
		input.setAttribute( "type", "radio" );
		input.setAttribute( "checked", "checked" );
		input.setAttribute( "name", "t" );
	
		div.appendChild( input );
	
		// Support: Android <=4.1 only
		// Older WebKit doesn't clone checked state correctly in fragments
		support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;
	
		// Support: IE <=11 only
		// Make sure textarea (and checkbox) defaultValue is properly cloned
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
	} )();
	var documentElement = document.documentElement;
	
	
	
	var
		rkeyEvent = /^key/,
		rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
		rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
	
	function returnTrue() {
		return true;
	}
	
	function returnFalse() {
		return false;
	}
	
	// Support: IE <=9 only
	// See #13393 for more info
	function safeActiveElement() {
		try {
			return document.activeElement;
		} catch ( err ) { }
	}
	
	function on( elem, types, selector, data, fn, one ) {
		var origFn, type;
	
		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
	
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
	
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				on( elem, type, selector, data, types[ type ], one );
			}
			return elem;
		}
	
		if ( data == null && fn == null ) {
	
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
	
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
	
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return elem;
		}
	
		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
	
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
	
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return elem.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		} );
	}
	
	/*
	 * Helper functions for managing events -- not part of the public interface.
	 * Props to Dean Edwards' addEvent library for many of the ideas.
	 */
	jQuery.event = {
	
		global: {},
	
		add: function( elem, types, handler, data, selector ) {
	
			var handleObjIn, eventHandle, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.get( elem );
	
			// Don't attach events to noData or text/comment nodes (but allow plain objects)
			if ( !elemData ) {
				return;
			}
	
			// Caller can pass in an object of custom data in lieu of the handler
			if ( handler.handler ) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}
	
			// Ensure that invalid selectors throw exceptions at attach time
			// Evaluate against documentElement in case elem is a non-element node (e.g., document)
			if ( selector ) {
				jQuery.find.matchesSelector( documentElement, selector );
			}
	
			// Make sure that the handler has a unique ID, used to find/remove it later
			if ( !handler.guid ) {
				handler.guid = jQuery.guid++;
			}
	
			// Init the element's event structure and main handler, if this is the first
			if ( !( events = elemData.events ) ) {
				events = elemData.events = {};
			}
			if ( !( eventHandle = elemData.handle ) ) {
				eventHandle = elemData.handle = function( e ) {
	
					// Discard the second event of a jQuery.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
						jQuery.event.dispatch.apply( elem, arguments ) : undefined;
				};
			}
	
			// Handle multiple events separated by a space
			types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[ t ] ) || [];
				type = origType = tmp[ 1 ];
				namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();
	
				// There *must* be a type, no attaching namespace-only handlers
				if ( !type ) {
					continue;
				}
	
				// If event changes its type, use the special event handlers for the changed type
				special = jQuery.event.special[ type ] || {};
	
				// If selector defined, determine special event api type, otherwise given type
				type = ( selector ? special.delegateType : special.bindType ) || type;
	
				// Update special based on newly reset type
				special = jQuery.event.special[ type ] || {};
	
				// handleObj is passed to all event handlers
				handleObj = jQuery.extend( {
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
					namespace: namespaces.join( "." )
				}, handleObjIn );
	
				// Init the event handler queue if we're the first
				if ( !( handlers = events[ type ] ) ) {
					handlers = events[ type ] = [];
					handlers.delegateCount = 0;
	
					// Only use addEventListener if the special events handler returns false
					if ( !special.setup ||
						special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
	
						if ( elem.addEventListener ) {
							elem.addEventListener( type, eventHandle );
						}
					}
				}
	
				if ( special.add ) {
					special.add.call( elem, handleObj );
	
					if ( !handleObj.handler.guid ) {
						handleObj.handler.guid = handler.guid;
					}
				}
	
				// Add to the element's handler list, delegates in front
				if ( selector ) {
					handlers.splice( handlers.delegateCount++, 0, handleObj );
				} else {
					handlers.push( handleObj );
				}
	
				// Keep track of which events have ever been used, for event optimization
				jQuery.event.global[ type ] = true;
			}
	
		},
	
		// Detach an event or set of events from an element
		remove: function( elem, types, handler, selector, mappedTypes ) {
	
			var j, origCount, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );
	
			if ( !elemData || !( events = elemData.events ) ) {
				return;
			}
	
			// Once for each type.namespace in types; type may be omitted
			types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[ t ] ) || [];
				type = origType = tmp[ 1 ];
				namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();
	
				// Unbind all events (on this namespace, if provided) for the element
				if ( !type ) {
					for ( type in events ) {
						jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
					}
					continue;
				}
	
				special = jQuery.event.special[ type ] || {};
				type = ( selector ? special.delegateType : special.bindType ) || type;
				handlers = events[ type ] || [];
				tmp = tmp[ 2 ] &&
					new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );
	
				// Remove matching events
				origCount = j = handlers.length;
				while ( j-- ) {
					handleObj = handlers[ j ];
	
					if ( ( mappedTypes || origType === handleObj.origType ) &&
						( !handler || handler.guid === handleObj.guid ) &&
						( !tmp || tmp.test( handleObj.namespace ) ) &&
						( !selector || selector === handleObj.selector ||
							selector === "**" && handleObj.selector ) ) {
						handlers.splice( j, 1 );
	
						if ( handleObj.selector ) {
							handlers.delegateCount--;
						}
						if ( special.remove ) {
							special.remove.call( elem, handleObj );
						}
					}
				}
	
				// Remove generic event handler if we removed something and no more handlers exist
				// (avoids potential for endless recursion during removal of special event handlers)
				if ( origCount && !handlers.length ) {
					if ( !special.teardown ||
						special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
	
						jQuery.removeEvent( elem, type, elemData.handle );
					}
	
					delete events[ type ];
				}
			}
	
			// Remove data and the expando if it's no longer used
			if ( jQuery.isEmptyObject( events ) ) {
				dataPriv.remove( elem, "handle events" );
			}
		},
	
		dispatch: function( nativeEvent ) {
	
			// Make a writable jQuery.Event from the native event object
			var event = jQuery.event.fix( nativeEvent );
	
			var i, j, ret, matched, handleObj, handlerQueue,
				args = new Array( arguments.length ),
				handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
				special = jQuery.event.special[ event.type ] || {};
	
			// Use the fix-ed jQuery.Event rather than the (read-only) native event
			args[ 0 ] = event;
	
			for ( i = 1; i < arguments.length; i++ ) {
				args[ i ] = arguments[ i ];
			}
	
			event.delegateTarget = this;
	
			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
				return;
			}
	
			// Determine handlers
			handlerQueue = jQuery.event.handlers.call( this, event, handlers );
	
			// Run delegates first; they may want to stop propagation beneath us
			i = 0;
			while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
				event.currentTarget = matched.elem;
	
				j = 0;
				while ( ( handleObj = matched.handlers[ j++ ] ) &&
					!event.isImmediatePropagationStopped() ) {
	
					// Triggered event must either 1) have no namespace, or 2) have namespace(s)
					// a subset or equal to those in the bound event (both can have no namespace).
					if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {
	
						event.handleObj = handleObj;
						event.data = handleObj.data;
	
						ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
							handleObj.handler ).apply( matched.elem, args );
	
						if ( ret !== undefined ) {
							if ( ( event.result = ret ) === false ) {
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
			}
	
			// Call the postDispatch hook for the mapped type
			if ( special.postDispatch ) {
				special.postDispatch.call( this, event );
			}
	
			return event.result;
		},
	
		handlers: function( event, handlers ) {
			var i, handleObj, sel, matchedHandlers, matchedSelectors,
				handlerQueue = [],
				delegateCount = handlers.delegateCount,
				cur = event.target;
	
			// Find delegate handlers
			if ( delegateCount &&
	
				// Support: IE <=9
				// Black-hole SVG <use> instance trees (trac-13180)
				cur.nodeType &&
	
				// Support: Firefox <=42
				// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
				// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
				// Support: IE 11 only
				// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
				!( event.type === "click" && event.button >= 1 ) ) {
	
				for ( ; cur !== this; cur = cur.parentNode || this ) {
	
					// Don't check non-elements (#13208)
					// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
					if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
						matchedHandlers = [];
						matchedSelectors = {};
						for ( i = 0; i < delegateCount; i++ ) {
							handleObj = handlers[ i ];
	
							// Don't conflict with Object.prototype properties (#13203)
							sel = handleObj.selector + " ";
	
							if ( matchedSelectors[ sel ] === undefined ) {
								matchedSelectors[ sel ] = handleObj.needsContext ?
									jQuery( sel, this ).index( cur ) > -1 :
									jQuery.find( sel, this, null, [ cur ] ).length;
							}
							if ( matchedSelectors[ sel ] ) {
								matchedHandlers.push( handleObj );
							}
						}
						if ( matchedHandlers.length ) {
							handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
						}
					}
				}
			}
	
			// Add the remaining (directly-bound) handlers
			cur = this;
			if ( delegateCount < handlers.length ) {
				handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
			}
	
			return handlerQueue;
		},
	
		addProp: function( name, hook ) {
			Object.defineProperty( jQuery.Event.prototype, name, {
				enumerable: true,
				configurable: true,
	
				get: isFunction( hook ) ?
					function() {
						if ( this.originalEvent ) {
								return hook( this.originalEvent );
						}
					} :
					function() {
						if ( this.originalEvent ) {
								return this.originalEvent[ name ];
						}
					},
	
				set: function( value ) {
					Object.defineProperty( this, name, {
						enumerable: true,
						configurable: true,
						writable: true,
						value: value
					} );
				}
			} );
		},
	
		fix: function( originalEvent ) {
			return originalEvent[ jQuery.expando ] ?
				originalEvent :
				new jQuery.Event( originalEvent );
		},
	
		special: {
			load: {
	
				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true
			},
			focus: {
	
				// Fire native event if possible so blur/focus sequence is correct
				trigger: function() {
					if ( this !== safeActiveElement() && this.focus ) {
						this.focus();
						return false;
					}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function() {
					if ( this === safeActiveElement() && this.blur ) {
						this.blur();
						return false;
					}
				},
				delegateType: "focusout"
			},
			click: {
	
				// For checkbox, fire native event so checked state will be right
				trigger: function() {
					if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
						this.click();
						return false;
					}
				},
	
				// For cross-browser consistency, don't fire native .click() on links
				_default: function( event ) {
					return nodeName( event.target, "a" );
				}
			},
	
			beforeunload: {
				postDispatch: function( event ) {
	
					// Support: Firefox 20+
					// Firefox doesn't alert if the returnValue field is not set.
					if ( event.result !== undefined && event.originalEvent ) {
						event.originalEvent.returnValue = event.result;
					}
				}
			}
		}
	};
	
	jQuery.removeEvent = function( elem, type, handle ) {
	
		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	};
	
	jQuery.Event = function( src, props ) {
	
		// Allow instantiation without the 'new' keyword
		if ( !( this instanceof jQuery.Event ) ) {
			return new jQuery.Event( src, props );
		}
	
		// Event object
		if ( src && src.type ) {
			this.originalEvent = src;
			this.type = src.type;
	
			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = src.defaultPrevented ||
					src.defaultPrevented === undefined &&
	
					// Support: Android <=2.3 only
					src.returnValue === false ?
				returnTrue :
				returnFalse;
	
			// Create target properties
			// Support: Safari <=6 - 7 only
			// Target should not be a text node (#504, #13143)
			this.target = ( src.target && src.target.nodeType === 3 ) ?
				src.target.parentNode :
				src.target;
	
			this.currentTarget = src.currentTarget;
			this.relatedTarget = src.relatedTarget;
	
		// Event type
		} else {
			this.type = src;
		}
	
		// Put explicitly provided properties onto the event object
		if ( props ) {
			jQuery.extend( this, props );
		}
	
		// Create a timestamp if incoming event doesn't have one
		this.timeStamp = src && src.timeStamp || Date.now();
	
		// Mark it as fixed
		this[ jQuery.expando ] = true;
	};
	
	// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
		constructor: jQuery.Event,
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,
		isSimulated: false,
	
		preventDefault: function() {
			var e = this.originalEvent;
	
			this.isDefaultPrevented = returnTrue;
	
			if ( e && !this.isSimulated ) {
				e.preventDefault();
			}
		},
		stopPropagation: function() {
			var e = this.originalEvent;
	
			this.isPropagationStopped = returnTrue;
	
			if ( e && !this.isSimulated ) {
				e.stopPropagation();
			}
		},
		stopImmediatePropagation: function() {
			var e = this.originalEvent;
	
			this.isImmediatePropagationStopped = returnTrue;
	
			if ( e && !this.isSimulated ) {
				e.stopImmediatePropagation();
			}
	
			this.stopPropagation();
		}
	};
	
	// Includes all common event props including KeyEvent and MouseEvent specific props
	jQuery.each( {
		altKey: true,
		bubbles: true,
		cancelable: true,
		changedTouches: true,
		ctrlKey: true,
		detail: true,
		eventPhase: true,
		metaKey: true,
		pageX: true,
		pageY: true,
		shiftKey: true,
		view: true,
		"char": true,
		charCode: true,
		key: true,
		keyCode: true,
		button: true,
		buttons: true,
		clientX: true,
		clientY: true,
		offsetX: true,
		offsetY: true,
		pointerId: true,
		pointerType: true,
		screenX: true,
		screenY: true,
		targetTouches: true,
		toElement: true,
		touches: true,
	
		which: function( event ) {
			var button = event.button;
	
			// Add which for key events
			if ( event.which == null && rkeyEvent.test( event.type ) ) {
				return event.charCode != null ? event.charCode : event.keyCode;
			}
	
			// Add which for click: 1 === left; 2 === middle; 3 === right
			if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
				if ( button & 1 ) {
					return 1;
				}
	
				if ( button & 2 ) {
					return 3;
				}
	
				if ( button & 4 ) {
					return 2;
				}
	
				return 0;
			}
	
			return event.which;
		}
	}, jQuery.event.addProp );
	
	// Create mouseenter/leave events using mouseover/out and event-time checks
	// so that event delegation works in jQuery.
	// Do the same for pointerenter/pointerleave and pointerover/pointerout
	//
	// Support: Safari 7 only
	// Safari sends mouseenter too often; see:
	// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
	// for the description of the bug (it existed in older Chrome versions as well).
	jQuery.each( {
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function( orig, fix ) {
		jQuery.event.special[ orig ] = {
			delegateType: fix,
			bindType: fix,
	
			handle: function( event ) {
				var ret,
					target = this,
					related = event.relatedTarget,
					handleObj = event.handleObj;
	
				// For mouseenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply( this, arguments );
					event.type = fix;
				}
				return ret;
			}
		};
	} );
	
	jQuery.fn.extend( {
	
		on: function( types, selector, data, fn ) {
			return on( this, types, selector, data, fn );
		},
		one: function( types, selector, data, fn ) {
			return on( this, types, selector, data, fn, 1 );
		},
		off: function( types, selector, fn ) {
			var handleObj, type;
			if ( types && types.preventDefault && types.handleObj ) {
	
				// ( event )  dispatched jQuery.Event
				handleObj = types.handleObj;
				jQuery( types.delegateTarget ).off(
					handleObj.namespace ?
						handleObj.origType + "." + handleObj.namespace :
						handleObj.origType,
					handleObj.selector,
					handleObj.handler
				);
				return this;
			}
			if ( typeof types === "object" ) {
	
				// ( types-object [, selector] )
				for ( type in types ) {
					this.off( type, selector, types[ type ] );
				}
				return this;
			}
			if ( selector === false || typeof selector === "function" ) {
	
				// ( types [, fn] )
				fn = selector;
				selector = undefined;
			}
			if ( fn === false ) {
				fn = returnFalse;
			}
			return this.each( function() {
				jQuery.event.remove( this, types, fn, selector );
			} );
		}
	} );
	
	
	var
	
		/* eslint-disable max-len */
	
		// See https://github.com/eslint/eslint/issues/3229
		rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
	
		/* eslint-enable */
	
		// Support: IE <=10 - 11, Edge 12 - 13 only
		// In IE/Edge using regex groups here causes severe slowdowns.
		// See https://connect.microsoft.com/IE/feedback/details/1736512/
		rnoInnerhtml = /<script|<style|<link/i,
	
		// checked="checked" or checked
		rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
		rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
	
	// Prefer a tbody over its parent table for containing new rows
	function manipulationTarget( elem, content ) {
		if ( nodeName( elem, "table" ) &&
			nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {
	
			return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
		}
	
		return elem;
	}
	
	// Replace/restore the type attribute of script elements for safe DOM manipulation
	function disableScript( elem ) {
		elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
		return elem;
	}
	function restoreScript( elem ) {
		if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
			elem.type = elem.type.slice( 5 );
		} else {
			elem.removeAttribute( "type" );
		}
	
		return elem;
	}
	
	function cloneCopyEvent( src, dest ) {
		var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;
	
		if ( dest.nodeType !== 1 ) {
			return;
		}
	
		// 1. Copy private data: events, handlers, etc.
		if ( dataPriv.hasData( src ) ) {
			pdataOld = dataPriv.access( src );
			pdataCur = dataPriv.set( dest, pdataOld );
			events = pdataOld.events;
	
			if ( events ) {
				delete pdataCur.handle;
				pdataCur.events = {};
	
				for ( type in events ) {
					for ( i = 0, l = events[ type ].length; i < l; i++ ) {
						jQuery.event.add( dest, type, events[ type ][ i ] );
					}
				}
			}
		}
	
		// 2. Copy user data
		if ( dataUser.hasData( src ) ) {
			udataOld = dataUser.access( src );
			udataCur = jQuery.extend( {}, udataOld );
	
			dataUser.set( dest, udataCur );
		}
	}
	
	// Fix IE bugs, see support tests
	function fixInput( src, dest ) {
		var nodeName = dest.nodeName.toLowerCase();
	
		// Fails to persist the checked state of a cloned checkbox or radio button.
		if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
			dest.checked = src.checked;
	
		// Fails to return the selected option to the default selected state when cloning options
		} else if ( nodeName === "input" || nodeName === "textarea" ) {
			dest.defaultValue = src.defaultValue;
		}
	}
	
	function domManip( collection, args, callback, ignored ) {
	
		// Flatten any nested arrays
		args = concat.apply( [], args );
	
		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = collection.length,
			iNoClone = l - 1,
			value = args[ 0 ],
			valueIsFunction = isFunction( value );
	
		// We can't cloneNode fragments that contain checked, in WebKit
		if ( valueIsFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return collection.each( function( index ) {
				var self = collection.eq( index );
				if ( valueIsFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				domManip( self, args, callback, ignored );
			} );
		}
	
		if ( l ) {
			fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
			first = fragment.firstChild;
	
			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}
	
			// Require either new content or an interest in ignored elements to invoke the callback
			if ( first || ignored ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;
	
				// Use the original fragment for the last item
				// instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;
	
					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );
	
						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
	
							// Support: Android <=4.0 only, PhantomJS 1 only
							// push.apply(_, arraylike) throws on ancient WebKit
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}
	
					callback.call( collection[ i ], node, i );
				}
	
				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;
	
					// Reenable scripts
					jQuery.map( scripts, restoreScript );
	
					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!dataPriv.access( node, "globalEval" ) &&
							jQuery.contains( doc, node ) ) {
	
							if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {
	
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								DOMEval( node.textContent.replace( rcleanScript, "" ), doc, node );
							}
						}
					}
				}
			}
		}
	
		return collection;
	}
	
	function remove( elem, selector, keepData ) {
		var node,
			nodes = selector ? jQuery.filter( selector, elem ) : elem,
			i = 0;
	
		for ( ; ( node = nodes[ i ] ) != null; i++ ) {
			if ( !keepData && node.nodeType === 1 ) {
				jQuery.cleanData( getAll( node ) );
			}
	
			if ( node.parentNode ) {
				if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
					setGlobalEval( getAll( node, "script" ) );
				}
				node.parentNode.removeChild( node );
			}
		}
	
		return elem;
	}
	
	jQuery.extend( {
		htmlPrefilter: function( html ) {
			return html.replace( rxhtmlTag, "<$1></$2>" );
		},
	
		clone: function( elem, dataAndEvents, deepDataAndEvents ) {
			var i, l, srcElements, destElements,
				clone = elem.cloneNode( true ),
				inPage = jQuery.contains( elem.ownerDocument, elem );
	
			// Fix IE cloning issues
			if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
					!jQuery.isXMLDoc( elem ) ) {
	
				// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
				destElements = getAll( clone );
				srcElements = getAll( elem );
	
				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					fixInput( srcElements[ i ], destElements[ i ] );
				}
			}
	
			// Copy the events from the original to the clone
			if ( dataAndEvents ) {
				if ( deepDataAndEvents ) {
					srcElements = srcElements || getAll( elem );
					destElements = destElements || getAll( clone );
	
					for ( i = 0, l = srcElements.length; i < l; i++ ) {
						cloneCopyEvent( srcElements[ i ], destElements[ i ] );
					}
				} else {
					cloneCopyEvent( elem, clone );
				}
			}
	
			// Preserve script evaluation history
			destElements = getAll( clone, "script" );
			if ( destElements.length > 0 ) {
				setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
			}
	
			// Return the cloned set
			return clone;
		},
	
		cleanData: function( elems ) {
			var data, elem, type,
				special = jQuery.event.special,
				i = 0;
	
			for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
				if ( acceptData( elem ) ) {
					if ( ( data = elem[ dataPriv.expando ] ) ) {
						if ( data.events ) {
							for ( type in data.events ) {
								if ( special[ type ] ) {
									jQuery.event.remove( elem, type );
	
								// This is a shortcut to avoid jQuery.event.remove's overhead
								} else {
									jQuery.removeEvent( elem, type, data.handle );
								}
							}
						}
	
						// Support: Chrome <=35 - 45+
						// Assign undefined instead of using delete, see Data#remove
						elem[ dataPriv.expando ] = undefined;
					}
					if ( elem[ dataUser.expando ] ) {
	
						// Support: Chrome <=35 - 45+
						// Assign undefined instead of using delete, see Data#remove
						elem[ dataUser.expando ] = undefined;
					}
				}
			}
		}
	} );
	
	jQuery.fn.extend( {
		detach: function( selector ) {
			return remove( this, selector, true );
		},
	
		remove: function( selector ) {
			return remove( this, selector );
		},
	
		text: function( value ) {
			return access( this, function( value ) {
				return value === undefined ?
					jQuery.text( this ) :
					this.empty().each( function() {
						if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
							this.textContent = value;
						}
					} );
			}, null, value, arguments.length );
		},
	
		append: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.appendChild( elem );
				}
			} );
		},
	
		prepend: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.insertBefore( elem, target.firstChild );
				}
			} );
		},
	
		before: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this );
				}
			} );
		},
	
		after: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this.nextSibling );
				}
			} );
		},
	
		empty: function() {
			var elem,
				i = 0;
	
			for ( ; ( elem = this[ i ] ) != null; i++ ) {
				if ( elem.nodeType === 1 ) {
	
					// Prevent memory leaks
					jQuery.cleanData( getAll( elem, false ) );
	
					// Remove any remaining nodes
					elem.textContent = "";
				}
			}
	
			return this;
		},
	
		clone: function( dataAndEvents, deepDataAndEvents ) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
	
			return this.map( function() {
				return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
			} );
		},
	
		html: function( value ) {
			return access( this, function( value ) {
				var elem = this[ 0 ] || {},
					i = 0,
					l = this.length;
	
				if ( value === undefined && elem.nodeType === 1 ) {
					return elem.innerHTML;
				}
	
				// See if we can take a shortcut and just use innerHTML
				if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
					!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {
	
					value = jQuery.htmlPrefilter( value );
	
					try {
						for ( ; i < l; i++ ) {
							elem = this[ i ] || {};
	
							// Remove element nodes and prevent memory leaks
							if ( elem.nodeType === 1 ) {
								jQuery.cleanData( getAll( elem, false ) );
								elem.innerHTML = value;
							}
						}
	
						elem = 0;
	
					// If using innerHTML throws an exception, use the fallback method
					} catch ( e ) {}
				}
	
				if ( elem ) {
					this.empty().append( value );
				}
			}, null, value, arguments.length );
		},
	
		replaceWith: function() {
			var ignored = [];
	
			// Make the changes, replacing each non-ignored context element with the new content
			return domManip( this, arguments, function( elem ) {
				var parent = this.parentNode;
	
				if ( jQuery.inArray( this, ignored ) < 0 ) {
					jQuery.cleanData( getAll( this ) );
					if ( parent ) {
						parent.replaceChild( elem, this );
					}
				}
	
			// Force callback invocation
			}, ignored );
		}
	} );
	
	jQuery.each( {
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function( name, original ) {
		jQuery.fn[ name ] = function( selector ) {
			var elems,
				ret = [],
				insert = jQuery( selector ),
				last = insert.length - 1,
				i = 0;
	
			for ( ; i <= last; i++ ) {
				elems = i === last ? this : this.clone( true );
				jQuery( insert[ i ] )[ original ]( elems );
	
				// Support: Android <=4.0 only, PhantomJS 1 only
				// .get() because push.apply(_, arraylike) throws on ancient WebKit
				push.apply( ret, elems.get() );
			}
	
			return this.pushStack( ret );
		};
	} );
	var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );
	
	var getStyles = function( elem ) {
	
			// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
			// IE throws on elements created in popups
			// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
			var view = elem.ownerDocument.defaultView;
	
			if ( !view || !view.opener ) {
				view = window;
			}
	
			return view.getComputedStyle( elem );
		};
	
	var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );
	
	
	
	( function() {
	
		// Executing both pixelPosition & boxSizingReliable tests require only one layout
		// so they're executed at the same time to save the second computation.
		function computeStyleTests() {
	
			// This is a singleton, we need to execute it only once
			if ( !div ) {
				return;
			}
	
			container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
				"margin-top:1px;padding:0;border:0";
			div.style.cssText =
				"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
				"margin:auto;border:1px;padding:1px;" +
				"width:60%;top:1%";
			documentElement.appendChild( container ).appendChild( div );
	
			var divStyle = window.getComputedStyle( div );
			pixelPositionVal = divStyle.top !== "1%";
	
			// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
			reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;
	
			// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
			// Some styles come back with percentage values, even though they shouldn't
			div.style.right = "60%";
			pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;
	
			// Support: IE 9 - 11 only
			// Detect misreporting of content dimensions for box-sizing:border-box elements
			boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;
	
			// Support: IE 9 only
			// Detect overflow:scroll screwiness (gh-3699)
			div.style.position = "absolute";
			scrollboxSizeVal = div.offsetWidth === 36 || "absolute";
	
			documentElement.removeChild( container );
	
			// Nullify the div so it wouldn't be stored in the memory and
			// it will also be a sign that checks already performed
			div = null;
		}
	
		function roundPixelMeasures( measure ) {
			return Math.round( parseFloat( measure ) );
		}
	
		var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
			reliableMarginLeftVal,
			container = document.createElement( "div" ),
			div = document.createElement( "div" );
	
		// Finish early in limited (non-browser) environments
		if ( !div.style ) {
			return;
		}
	
		// Support: IE <=9 - 11 only
		// Style of cloned element affects source element cloned (#8908)
		div.style.backgroundClip = "content-box";
		div.cloneNode( true ).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";
	
		jQuery.extend( support, {
			boxSizingReliable: function() {
				computeStyleTests();
				return boxSizingReliableVal;
			},
			pixelBoxStyles: function() {
				computeStyleTests();
				return pixelBoxStylesVal;
			},
			pixelPosition: function() {
				computeStyleTests();
				return pixelPositionVal;
			},
			reliableMarginLeft: function() {
				computeStyleTests();
				return reliableMarginLeftVal;
			},
			scrollboxSize: function() {
				computeStyleTests();
				return scrollboxSizeVal;
			}
		} );
	} )();
	
	
	function curCSS( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
	
			// Support: Firefox 51+
			// Retrieving style before computed somehow
			// fixes an issue with getting wrong values
			// on detached elements
			style = elem.style;
	
		computed = computed || getStyles( elem );
	
		// getPropertyValue is needed for:
		//   .css('filter') (IE 9 only, #12537)
		//   .css('--customProperty) (#3144)
		if ( computed ) {
			ret = computed.getPropertyValue( name ) || computed[ name ];
	
			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}
	
			// A tribute to the "awesome hack by Dean Edwards"
			// Android Browser returns percentage for some values,
			// but width seems to be reliably pixels.
			// This is against the CSSOM draft spec:
			// https://drafts.csswg.org/cssom/#resolved-values
			if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {
	
				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;
	
				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;
	
				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}
	
		return ret !== undefined ?
	
			// Support: IE <=9 - 11 only
			// IE returns zIndex value as an integer.
			ret + "" :
			ret;
	}
	
	
	function addGetHookIf( conditionFn, hookFn ) {
	
		// Define the hook, we'll check on the first run if it's really needed.
		return {
			get: function() {
				if ( conditionFn() ) {
	
					// Hook not needed (or it's not possible to use it due
					// to missing dependency), remove it.
					delete this.get;
					return;
				}
	
				// Hook needed; redefine it so that the support test is not executed again.
				return ( this.get = hookFn ).apply( this, arguments );
			}
		};
	}
	
	
	var
	
		// Swappable if display is none or starts with table
		// except "table", "table-cell", or "table-caption"
		// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
		rdisplayswap = /^(none|table(?!-c[ea]).+)/,
		rcustomProp = /^--/,
		cssShow = { position: "absolute", visibility: "hidden", display: "block" },
		cssNormalTransform = {
			letterSpacing: "0",
			fontWeight: "400"
		},
	
		cssPrefixes = [ "Webkit", "Moz", "ms" ],
		emptyStyle = document.createElement( "div" ).style;
	
	// Return a css property mapped to a potentially vendor prefixed property
	function vendorPropName( name ) {
	
		// Shortcut for names that are not vendor prefixed
		if ( name in emptyStyle ) {
			return name;
		}
	
		// Check for vendor prefixed names
		var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
			i = cssPrefixes.length;
	
		while ( i-- ) {
			name = cssPrefixes[ i ] + capName;
			if ( name in emptyStyle ) {
				return name;
			}
		}
	}
	
	// Return a property mapped along what jQuery.cssProps suggests or to
	// a vendor prefixed property.
	function finalPropName( name ) {
		var ret = jQuery.cssProps[ name ];
		if ( !ret ) {
			ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
		}
		return ret;
	}
	
	function setPositiveNumber( elem, value, subtract ) {
	
		// Any relative (+/-) values have already been
		// normalized at this point
		var matches = rcssNum.exec( value );
		return matches ?
	
			// Guard against undefined "subtract", e.g., when used as in cssHooks
			Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
			value;
	}
	
	function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
		var i = dimension === "width" ? 1 : 0,
			extra = 0,
			delta = 0;
	
		// Adjustment may not be necessary
		if ( box === ( isBorderBox ? "border" : "content" ) ) {
			return 0;
		}
	
		for ( ; i < 4; i += 2 ) {
	
			// Both box models exclude margin
			if ( box === "margin" ) {
				delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
			}
	
			// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
			if ( !isBorderBox ) {
	
				// Add padding
				delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
	
				// For "border" or "margin", add border
				if ( box !== "padding" ) {
					delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
	
				// But still keep track of it otherwise
				} else {
					extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
	
			// If we get here with a border-box (content + padding + border), we're seeking "content" or
			// "padding" or "margin"
			} else {
	
				// For "content", subtract padding
				if ( box === "content" ) {
					delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
				}
	
				// For "content" or "padding", subtract border
				if ( box !== "margin" ) {
					delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			}
		}
	
		// Account for positive content-box scroll gutter when requested by providing computedVal
		if ( !isBorderBox && computedVal >= 0 ) {
	
			// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
			// Assuming integer scroll gutter, subtract the rest and round down
			delta += Math.max( 0, Math.ceil(
				elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
				computedVal -
				delta -
				extra -
				0.5
			) );
		}
	
		return delta;
	}
	
	function getWidthOrHeight( elem, dimension, extra ) {
	
		// Start with computed style
		var styles = getStyles( elem ),
			val = curCSS( elem, dimension, styles ),
			isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
			valueIsBorderBox = isBorderBox;
	
		// Support: Firefox <=54
		// Return a confounding non-pixel value or feign ignorance, as appropriate.
		if ( rnumnonpx.test( val ) ) {
			if ( !extra ) {
				return val;
			}
			val = "auto";
		}
	
		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = valueIsBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ dimension ] );
	
		// Fall back to offsetWidth/offsetHeight when value is "auto"
		// This happens for inline elements with no explicit setting (gh-3571)
		// Support: Android <=4.1 - 4.3 only
		// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
		if ( val === "auto" ||
			!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) {
	
			val = elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ];
	
			// offsetWidth/offsetHeight provide border-box values
			valueIsBorderBox = true;
		}
	
		// Normalize "" and auto
		val = parseFloat( val ) || 0;
	
		// Adjust for the element's box model
		return ( val +
			boxModelAdjustment(
				elem,
				dimension,
				extra || ( isBorderBox ? "border" : "content" ),
				valueIsBorderBox,
				styles,
	
				// Provide the current computed size to request scroll gutter calculation (gh-3589)
				val
			)
		) + "px";
	}
	
	jQuery.extend( {
	
		// Add in style property hooks for overriding the default
		// behavior of getting and setting a style property
		cssHooks: {
			opacity: {
				get: function( elem, computed ) {
					if ( computed ) {
	
						// We should always get a number back from opacity
						var ret = curCSS( elem, "opacity" );
						return ret === "" ? "1" : ret;
					}
				}
			}
		},
	
		// Don't automatically add "px" to these possibly-unitless properties
		cssNumber: {
			"animationIterationCount": true,
			"columnCount": true,
			"fillOpacity": true,
			"flexGrow": true,
			"flexShrink": true,
			"fontWeight": true,
			"lineHeight": true,
			"opacity": true,
			"order": true,
			"orphans": true,
			"widows": true,
			"zIndex": true,
			"zoom": true
		},
	
		// Add in properties whose names you wish to fix before
		// setting or getting the value
		cssProps: {},
	
		// Get and set the style property on a DOM Node
		style: function( elem, name, value, extra ) {
	
			// Don't set styles on text and comment nodes
			if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
				return;
			}
	
			// Make sure that we're working with the right name
			var ret, type, hooks,
				origName = camelCase( name ),
				isCustomProp = rcustomProp.test( name ),
				style = elem.style;
	
			// Make sure that we're working with the right name. We don't
			// want to query the value if it is a CSS custom property
			// since they are user-defined.
			if ( !isCustomProp ) {
				name = finalPropName( origName );
			}
	
			// Gets hook for the prefixed version, then unprefixed version
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];
	
			// Check if we're setting a value
			if ( value !== undefined ) {
				type = typeof value;
	
				// Convert "+=" or "-=" to relative numbers (#7345)
				if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
					value = adjustCSS( elem, name, ret );
	
					// Fixes bug #9237
					type = "number";
				}
	
				// Make sure that null and NaN values aren't set (#7116)
				if ( value == null || value !== value ) {
					return;
				}
	
				// If a number was passed in, add the unit (except for certain CSS properties)
				if ( type === "number" ) {
					value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
				}
	
				// background-* props affect original clone's values
				if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
					style[ name ] = "inherit";
				}
	
				// If a hook was provided, use that value, otherwise just set the specified value
				if ( !hooks || !( "set" in hooks ) ||
					( value = hooks.set( elem, value, extra ) ) !== undefined ) {
	
					if ( isCustomProp ) {
						style.setProperty( name, value );
					} else {
						style[ name ] = value;
					}
				}
	
			} else {
	
				// If a hook was provided get the non-computed value from there
				if ( hooks && "get" in hooks &&
					( ret = hooks.get( elem, false, extra ) ) !== undefined ) {
	
					return ret;
				}
	
				// Otherwise just get the value from the style object
				return style[ name ];
			}
		},
	
		css: function( elem, name, extra, styles ) {
			var val, num, hooks,
				origName = camelCase( name ),
				isCustomProp = rcustomProp.test( name );
	
			// Make sure that we're working with the right name. We don't
			// want to modify the value if it is a CSS custom property
			// since they are user-defined.
			if ( !isCustomProp ) {
				name = finalPropName( origName );
			}
	
			// Try prefixed name followed by the unprefixed name
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];
	
			// If a hook was provided get the computed value from there
			if ( hooks && "get" in hooks ) {
				val = hooks.get( elem, true, extra );
			}
	
			// Otherwise, if a way to get the computed value exists, use that
			if ( val === undefined ) {
				val = curCSS( elem, name, styles );
			}
	
			// Convert "normal" to computed value
			if ( val === "normal" && name in cssNormalTransform ) {
				val = cssNormalTransform[ name ];
			}
	
			// Make numeric if forced or a qualifier was provided and val looks numeric
			if ( extra === "" || extra ) {
				num = parseFloat( val );
				return extra === true || isFinite( num ) ? num || 0 : val;
			}
	
			return val;
		}
	} );
	
	jQuery.each( [ "height", "width" ], function( i, dimension ) {
		jQuery.cssHooks[ dimension ] = {
			get: function( elem, computed, extra ) {
				if ( computed ) {
	
					// Certain elements can have dimension info if we invisibly show them
					// but it must have a current display style that would benefit
					return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
	
						// Support: Safari 8+
						// Table columns in Safari have non-zero offsetWidth & zero
						// getBoundingClientRect().width unless display is changed.
						// Support: IE <=11 only
						// Running getBoundingClientRect on a disconnected node
						// in IE throws an error.
						( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
							swap( elem, cssShow, function() {
								return getWidthOrHeight( elem, dimension, extra );
							} ) :
							getWidthOrHeight( elem, dimension, extra );
				}
			},
	
			set: function( elem, value, extra ) {
				var matches,
					styles = getStyles( elem ),
					isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					subtract = extra && boxModelAdjustment(
						elem,
						dimension,
						extra,
						isBorderBox,
						styles
					);
	
				// Account for unreliable border-box dimensions by comparing offset* to computed and
				// faking a content-box to get border and padding (gh-3699)
				if ( isBorderBox && support.scrollboxSize() === styles.position ) {
					subtract -= Math.ceil(
						elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
						parseFloat( styles[ dimension ] ) -
						boxModelAdjustment( elem, dimension, "border", false, styles ) -
						0.5
					);
				}
	
				// Convert to pixels if value adjustment is needed
				if ( subtract && ( matches = rcssNum.exec( value ) ) &&
					( matches[ 3 ] || "px" ) !== "px" ) {
	
					elem.style[ dimension ] = value;
					value = jQuery.css( elem, dimension );
				}
	
				return setPositiveNumber( elem, value, subtract );
			}
		};
	} );
	
	jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
		function( elem, computed ) {
			if ( computed ) {
				return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} )
					) + "px";
			}
		}
	);
	
	// These hooks are used by animate to expand properties
	jQuery.each( {
		margin: "",
		padding: "",
		border: "Width"
	}, function( prefix, suffix ) {
		jQuery.cssHooks[ prefix + suffix ] = {
			expand: function( value ) {
				var i = 0,
					expanded = {},
	
					// Assumes a single number if not a string
					parts = typeof value === "string" ? value.split( " " ) : [ value ];
	
				for ( ; i < 4; i++ ) {
					expanded[ prefix + cssExpand[ i ] + suffix ] =
						parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
				}
	
				return expanded;
			}
		};
	
		if ( prefix !== "margin" ) {
			jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
		}
	} );
	
	jQuery.fn.extend( {
		css: function( name, value ) {
			return access( this, function( elem, name, value ) {
				var styles, len,
					map = {},
					i = 0;
	
				if ( Array.isArray( name ) ) {
					styles = getStyles( elem );
					len = name.length;
	
					for ( ; i < len; i++ ) {
						map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
					}
	
					return map;
				}
	
				return value !== undefined ?
					jQuery.style( elem, name, value ) :
					jQuery.css( elem, name );
			}, name, value, arguments.length > 1 );
		}
	} );
	
	
	function Tween( elem, options, prop, end, easing ) {
		return new Tween.prototype.init( elem, options, prop, end, easing );
	}
	jQuery.Tween = Tween;
	
	Tween.prototype = {
		constructor: Tween,
		init: function( elem, options, prop, end, easing, unit ) {
			this.elem = elem;
			this.prop = prop;
			this.easing = easing || jQuery.easing._default;
			this.options = options;
			this.start = this.now = this.cur();
			this.end = end;
			this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
		},
		cur: function() {
			var hooks = Tween.propHooks[ this.prop ];
	
			return hooks && hooks.get ?
				hooks.get( this ) :
				Tween.propHooks._default.get( this );
		},
		run: function( percent ) {
			var eased,
				hooks = Tween.propHooks[ this.prop ];
	
			if ( this.options.duration ) {
				this.pos = eased = jQuery.easing[ this.easing ](
					percent, this.options.duration * percent, 0, 1, this.options.duration
				);
			} else {
				this.pos = eased = percent;
			}
			this.now = ( this.end - this.start ) * eased + this.start;
	
			if ( this.options.step ) {
				this.options.step.call( this.elem, this.now, this );
			}
	
			if ( hooks && hooks.set ) {
				hooks.set( this );
			} else {
				Tween.propHooks._default.set( this );
			}
			return this;
		}
	};
	
	Tween.prototype.init.prototype = Tween.prototype;
	
	Tween.propHooks = {
		_default: {
			get: function( tween ) {
				var result;
	
				// Use a property on the element directly when it is not a DOM element,
				// or when there is no matching style property that exists.
				if ( tween.elem.nodeType !== 1 ||
					tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
					return tween.elem[ tween.prop ];
				}
	
				// Passing an empty string as a 3rd parameter to .css will automatically
				// attempt a parseFloat and fallback to a string if the parse fails.
				// Simple values such as "10px" are parsed to Float;
				// complex values such as "rotate(1rad)" are returned as-is.
				result = jQuery.css( tween.elem, tween.prop, "" );
	
				// Empty strings, null, undefined and "auto" are converted to 0.
				return !result || result === "auto" ? 0 : result;
			},
			set: function( tween ) {
	
				// Use step hook for back compat.
				// Use cssHook if its there.
				// Use .style if available and use plain properties where available.
				if ( jQuery.fx.step[ tween.prop ] ) {
					jQuery.fx.step[ tween.prop ]( tween );
				} else if ( tween.elem.nodeType === 1 &&
					( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
						jQuery.cssHooks[ tween.prop ] ) ) {
					jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
				} else {
					tween.elem[ tween.prop ] = tween.now;
				}
			}
		}
	};
	
	// Support: IE <=9 only
	// Panic based approach to setting things on disconnected nodes
	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function( tween ) {
			if ( tween.elem.nodeType && tween.elem.parentNode ) {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	};
	
	jQuery.easing = {
		linear: function( p ) {
			return p;
		},
		swing: function( p ) {
			return 0.5 - Math.cos( p * Math.PI ) / 2;
		},
		_default: "swing"
	};
	
	jQuery.fx = Tween.prototype.init;
	
	// Back compat <1.8 extension point
	jQuery.fx.step = {};
	
	
	
	
	var
		fxNow, inProgress,
		rfxtypes = /^(?:toggle|show|hide)$/,
		rrun = /queueHooks$/;
	
	function schedule() {
		if ( inProgress ) {
			if ( document.hidden === false && window.requestAnimationFrame ) {
				window.requestAnimationFrame( schedule );
			} else {
				window.setTimeout( schedule, jQuery.fx.interval );
			}
	
			jQuery.fx.tick();
		}
	}
	
	// Animations created synchronously will run synchronously
	function createFxNow() {
		window.setTimeout( function() {
			fxNow = undefined;
		} );
		return ( fxNow = Date.now() );
	}
	
	// Generate parameters to create a standard animation
	function genFx( type, includeWidth ) {
		var which,
			i = 0,
			attrs = { height: type };
	
		// If we include width, step value is 1 to do all cssExpand values,
		// otherwise step value is 2 to skip over Left and Right
		includeWidth = includeWidth ? 1 : 0;
		for ( ; i < 4; i += 2 - includeWidth ) {
			which = cssExpand[ i ];
			attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
		}
	
		if ( includeWidth ) {
			attrs.opacity = attrs.width = type;
		}
	
		return attrs;
	}
	
	function createTween( value, prop, animation ) {
		var tween,
			collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
			index = 0,
			length = collection.length;
		for ( ; index < length; index++ ) {
			if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {
	
				// We're done with this property
				return tween;
			}
		}
	}
	
	function defaultPrefilter( elem, props, opts ) {
		var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
			isBox = "width" in props || "height" in props,
			anim = this,
			orig = {},
			style = elem.style,
			hidden = elem.nodeType && isHiddenWithinTree( elem ),
			dataShow = dataPriv.get( elem, "fxshow" );
	
		// Queue-skipping animations hijack the fx hooks
		if ( !opts.queue ) {
			hooks = jQuery._queueHooks( elem, "fx" );
			if ( hooks.unqueued == null ) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function() {
					if ( !hooks.unqueued ) {
						oldfire();
					}
				};
			}
			hooks.unqueued++;
	
			anim.always( function() {
	
				// Ensure the complete handler is called before this completes
				anim.always( function() {
					hooks.unqueued--;
					if ( !jQuery.queue( elem, "fx" ).length ) {
						hooks.empty.fire();
					}
				} );
			} );
		}
	
		// Detect show/hide animations
		for ( prop in props ) {
			value = props[ prop ];
			if ( rfxtypes.test( value ) ) {
				delete props[ prop ];
				toggle = toggle || value === "toggle";
				if ( value === ( hidden ? "hide" : "show" ) ) {
	
					// Pretend to be hidden if this is a "show" and
					// there is still data from a stopped show/hide
					if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
						hidden = true;
	
					// Ignore all other no-op show/hide data
					} else {
						continue;
					}
				}
				orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
			}
		}
	
		// Bail out if this is a no-op like .hide().hide()
		propTween = !jQuery.isEmptyObject( props );
		if ( !propTween && jQuery.isEmptyObject( orig ) ) {
			return;
		}
	
		// Restrict "overflow" and "display" styles during box animations
		if ( isBox && elem.nodeType === 1 ) {
	
			// Support: IE <=9 - 11, Edge 12 - 15
			// Record all 3 overflow attributes because IE does not infer the shorthand
			// from identically-valued overflowX and overflowY and Edge just mirrors
			// the overflowX value there.
			opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];
	
			// Identify a display type, preferring old show/hide data over the CSS cascade
			restoreDisplay = dataShow && dataShow.display;
			if ( restoreDisplay == null ) {
				restoreDisplay = dataPriv.get( elem, "display" );
			}
			display = jQuery.css( elem, "display" );
			if ( display === "none" ) {
				if ( restoreDisplay ) {
					display = restoreDisplay;
				} else {
	
					// Get nonempty value(s) by temporarily forcing visibility
					showHide( [ elem ], true );
					restoreDisplay = elem.style.display || restoreDisplay;
					display = jQuery.css( elem, "display" );
					showHide( [ elem ] );
				}
			}
	
			// Animate inline elements as inline-block
			if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
				if ( jQuery.css( elem, "float" ) === "none" ) {
	
					// Restore the original display value at the end of pure show/hide animations
					if ( !propTween ) {
						anim.done( function() {
							style.display = restoreDisplay;
						} );
						if ( restoreDisplay == null ) {
							display = style.display;
							restoreDisplay = display === "none" ? "" : display;
						}
					}
					style.display = "inline-block";
				}
			}
		}
	
		if ( opts.overflow ) {
			style.overflow = "hidden";
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	
		// Implement show/hide animations
		propTween = false;
		for ( prop in orig ) {
	
			// General show/hide setup for this element animation
			if ( !propTween ) {
				if ( dataShow ) {
					if ( "hidden" in dataShow ) {
						hidden = dataShow.hidden;
					}
				} else {
					dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
				}
	
				// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
				if ( toggle ) {
					dataShow.hidden = !hidden;
				}
	
				// Show elements before animating them
				if ( hidden ) {
					showHide( [ elem ], true );
				}
	
				/* eslint-disable no-loop-func */
	
				anim.done( function() {
	
				/* eslint-enable no-loop-func */
	
					// The final step of a "hide" animation is actually hiding the element
					if ( !hidden ) {
						showHide( [ elem ] );
					}
					dataPriv.remove( elem, "fxshow" );
					for ( prop in orig ) {
						jQuery.style( elem, prop, orig[ prop ] );
					}
				} );
			}
	
			// Per-property setup
			propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = propTween.start;
				if ( hidden ) {
					propTween.end = propTween.start;
					propTween.start = 0;
				}
			}
		}
	}
	
	function propFilter( props, specialEasing ) {
		var index, name, easing, value, hooks;
	
		// camelCase, specialEasing and expand cssHook pass
		for ( index in props ) {
			name = camelCase( index );
			easing = specialEasing[ name ];
			value = props[ index ];
			if ( Array.isArray( value ) ) {
				easing = value[ 1 ];
				value = props[ index ] = value[ 0 ];
			}
	
			if ( index !== name ) {
				props[ name ] = value;
				delete props[ index ];
			}
	
			hooks = jQuery.cssHooks[ name ];
			if ( hooks && "expand" in hooks ) {
				value = hooks.expand( value );
				delete props[ name ];
	
				// Not quite $.extend, this won't overwrite existing keys.
				// Reusing 'index' because we have the correct "name"
				for ( index in value ) {
					if ( !( index in props ) ) {
						props[ index ] = value[ index ];
						specialEasing[ index ] = easing;
					}
				}
			} else {
				specialEasing[ name ] = easing;
			}
		}
	}
	
	function Animation( elem, properties, options ) {
		var result,
			stopped,
			index = 0,
			length = Animation.prefilters.length,
			deferred = jQuery.Deferred().always( function() {
	
				// Don't match elem in the :animated selector
				delete tick.elem;
			} ),
			tick = function() {
				if ( stopped ) {
					return false;
				}
				var currentTime = fxNow || createFxNow(),
					remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
	
					// Support: Android 2.3 only
					// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
					temp = remaining / animation.duration || 0,
					percent = 1 - temp,
					index = 0,
					length = animation.tweens.length;
	
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( percent );
				}
	
				deferred.notifyWith( elem, [ animation, percent, remaining ] );
	
				// If there's more to do, yield
				if ( percent < 1 && length ) {
					return remaining;
				}
	
				// If this was an empty animation, synthesize a final progress notification
				if ( !length ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
				}
	
				// Resolve the animation and report its conclusion
				deferred.resolveWith( elem, [ animation ] );
				return false;
			},
			animation = deferred.promise( {
				elem: elem,
				props: jQuery.extend( {}, properties ),
				opts: jQuery.extend( true, {
					specialEasing: {},
					easing: jQuery.easing._default
				}, options ),
				originalProperties: properties,
				originalOptions: options,
				startTime: fxNow || createFxNow(),
				duration: options.duration,
				tweens: [],
				createTween: function( prop, end ) {
					var tween = jQuery.Tween( elem, animation.opts, prop, end,
							animation.opts.specialEasing[ prop ] || animation.opts.easing );
					animation.tweens.push( tween );
					return tween;
				},
				stop: function( gotoEnd ) {
					var index = 0,
	
						// If we are going to the end, we want to run all the tweens
						// otherwise we skip this part
						length = gotoEnd ? animation.tweens.length : 0;
					if ( stopped ) {
						return this;
					}
					stopped = true;
					for ( ; index < length; index++ ) {
						animation.tweens[ index ].run( 1 );
					}
	
					// Resolve when we played the last frame; otherwise, reject
					if ( gotoEnd ) {
						deferred.notifyWith( elem, [ animation, 1, 0 ] );
						deferred.resolveWith( elem, [ animation, gotoEnd ] );
					} else {
						deferred.rejectWith( elem, [ animation, gotoEnd ] );
					}
					return this;
				}
			} ),
			props = animation.props;
	
		propFilter( props, animation.opts.specialEasing );
	
		for ( ; index < length; index++ ) {
			result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
			if ( result ) {
				if ( isFunction( result.stop ) ) {
					jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
						result.stop.bind( result );
				}
				return result;
			}
		}
	
		jQuery.map( props, createTween, animation );
	
		if ( isFunction( animation.opts.start ) ) {
			animation.opts.start.call( elem, animation );
		}
	
		// Attach callbacks from options
		animation
			.progress( animation.opts.progress )
			.done( animation.opts.done, animation.opts.complete )
			.fail( animation.opts.fail )
			.always( animation.opts.always );
	
		jQuery.fx.timer(
			jQuery.extend( tick, {
				elem: elem,
				anim: animation,
				queue: animation.opts.queue
			} )
		);
	
		return animation;
	}
	
	jQuery.Animation = jQuery.extend( Animation, {
	
		tweeners: {
			"*": [ function( prop, value ) {
				var tween = this.createTween( prop, value );
				adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
				return tween;
			} ]
		},
	
		tweener: function( props, callback ) {
			if ( isFunction( props ) ) {
				callback = props;
				props = [ "*" ];
			} else {
				props = props.match( rnothtmlwhite );
			}
	
			var prop,
				index = 0,
				length = props.length;
	
			for ( ; index < length; index++ ) {
				prop = props[ index ];
				Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
				Animation.tweeners[ prop ].unshift( callback );
			}
		},
	
		prefilters: [ defaultPrefilter ],
	
		prefilter: function( callback, prepend ) {
			if ( prepend ) {
				Animation.prefilters.unshift( callback );
			} else {
				Animation.prefilters.push( callback );
			}
		}
	} );
	
	jQuery.speed = function( speed, easing, fn ) {
		var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
			complete: fn || !fn && easing ||
				isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !isFunction( easing ) && easing
		};
	
		// Go to the end state if fx are off
		if ( jQuery.fx.off ) {
			opt.duration = 0;
	
		} else {
			if ( typeof opt.duration !== "number" ) {
				if ( opt.duration in jQuery.fx.speeds ) {
					opt.duration = jQuery.fx.speeds[ opt.duration ];
	
				} else {
					opt.duration = jQuery.fx.speeds._default;
				}
			}
		}
	
		// Normalize opt.queue - true/undefined/null -> "fx"
		if ( opt.queue == null || opt.queue === true ) {
			opt.queue = "fx";
		}
	
		// Queueing
		opt.old = opt.complete;
	
		opt.complete = function() {
			if ( isFunction( opt.old ) ) {
				opt.old.call( this );
			}
	
			if ( opt.queue ) {
				jQuery.dequeue( this, opt.queue );
			}
		};
	
		return opt;
	};
	
	jQuery.fn.extend( {
		fadeTo: function( speed, to, easing, callback ) {
	
			// Show any hidden elements after setting opacity to 0
			return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()
	
				// Animate to the value specified
				.end().animate( { opacity: to }, speed, easing, callback );
		},
		animate: function( prop, speed, easing, callback ) {
			var empty = jQuery.isEmptyObject( prop ),
				optall = jQuery.speed( speed, easing, callback ),
				doAnimation = function() {
	
					// Operate on a copy of prop so per-property easing won't be lost
					var anim = Animation( this, jQuery.extend( {}, prop ), optall );
	
					// Empty animations, or finishing resolves immediately
					if ( empty || dataPriv.get( this, "finish" ) ) {
						anim.stop( true );
					}
				};
				doAnimation.finish = doAnimation;
	
			return empty || optall.queue === false ?
				this.each( doAnimation ) :
				this.queue( optall.queue, doAnimation );
		},
		stop: function( type, clearQueue, gotoEnd ) {
			var stopQueue = function( hooks ) {
				var stop = hooks.stop;
				delete hooks.stop;
				stop( gotoEnd );
			};
	
			if ( typeof type !== "string" ) {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined;
			}
			if ( clearQueue && type !== false ) {
				this.queue( type || "fx", [] );
			}
	
			return this.each( function() {
				var dequeue = true,
					index = type != null && type + "queueHooks",
					timers = jQuery.timers,
					data = dataPriv.get( this );
	
				if ( index ) {
					if ( data[ index ] && data[ index ].stop ) {
						stopQueue( data[ index ] );
					}
				} else {
					for ( index in data ) {
						if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
							stopQueue( data[ index ] );
						}
					}
				}
	
				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this &&
						( type == null || timers[ index ].queue === type ) ) {
	
						timers[ index ].anim.stop( gotoEnd );
						dequeue = false;
						timers.splice( index, 1 );
					}
				}
	
				// Start the next in the queue if the last step wasn't forced.
				// Timers currently will call their complete callbacks, which
				// will dequeue but only if they were gotoEnd.
				if ( dequeue || !gotoEnd ) {
					jQuery.dequeue( this, type );
				}
			} );
		},
		finish: function( type ) {
			if ( type !== false ) {
				type = type || "fx";
			}
			return this.each( function() {
				var index,
					data = dataPriv.get( this ),
					queue = data[ type + "queue" ],
					hooks = data[ type + "queueHooks" ],
					timers = jQuery.timers,
					length = queue ? queue.length : 0;
	
				// Enable finishing flag on private data
				data.finish = true;
	
				// Empty the queue first
				jQuery.queue( this, type, [] );
	
				if ( hooks && hooks.stop ) {
					hooks.stop.call( this, true );
				}
	
				// Look for any active animations, and finish them
				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
						timers[ index ].anim.stop( true );
						timers.splice( index, 1 );
					}
				}
	
				// Look for any animations in the old queue and finish them
				for ( index = 0; index < length; index++ ) {
					if ( queue[ index ] && queue[ index ].finish ) {
						queue[ index ].finish.call( this );
					}
				}
	
				// Turn off finishing flag
				delete data.finish;
			} );
		}
	} );
	
	jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
		var cssFn = jQuery.fn[ name ];
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return speed == null || typeof speed === "boolean" ?
				cssFn.apply( this, arguments ) :
				this.animate( genFx( name, true ), speed, easing, callback );
		};
	} );
	
	// Generate shortcuts for custom animations
	jQuery.each( {
		slideDown: genFx( "show" ),
		slideUp: genFx( "hide" ),
		slideToggle: genFx( "toggle" ),
		fadeIn: { opacity: "show" },
		fadeOut: { opacity: "hide" },
		fadeToggle: { opacity: "toggle" }
	}, function( name, props ) {
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return this.animate( props, speed, easing, callback );
		};
	} );
	
	jQuery.timers = [];
	jQuery.fx.tick = function() {
		var timer,
			i = 0,
			timers = jQuery.timers;
	
		fxNow = Date.now();
	
		for ( ; i < timers.length; i++ ) {
			timer = timers[ i ];
	
			// Run the timer and safely remove it when done (allowing for external removal)
			if ( !timer() && timers[ i ] === timer ) {
				timers.splice( i--, 1 );
			}
		}
	
		if ( !timers.length ) {
			jQuery.fx.stop();
		}
		fxNow = undefined;
	};
	
	jQuery.fx.timer = function( timer ) {
		jQuery.timers.push( timer );
		jQuery.fx.start();
	};
	
	jQuery.fx.interval = 13;
	jQuery.fx.start = function() {
		if ( inProgress ) {
			return;
		}
	
		inProgress = true;
		schedule();
	};
	
	jQuery.fx.stop = function() {
		inProgress = null;
	};
	
	jQuery.fx.speeds = {
		slow: 600,
		fast: 200,
	
		// Default speed
		_default: 400
	};
	
	
	// Based off of the plugin by Clint Helfers, with permission.
	// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
	jQuery.fn.delay = function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";
	
		return this.queue( type, function( next, hooks ) {
			var timeout = window.setTimeout( next, time );
			hooks.stop = function() {
				window.clearTimeout( timeout );
			};
		} );
	};
	
	
	( function() {
		var input = document.createElement( "input" ),
			select = document.createElement( "select" ),
			opt = select.appendChild( document.createElement( "option" ) );
	
		input.type = "checkbox";
	
		// Support: Android <=4.3 only
		// Default value for a checkbox should be "on"
		support.checkOn = input.value !== "";
	
		// Support: IE <=11 only
		// Must access selectedIndex to make default options select
		support.optSelected = opt.selected;
	
		// Support: IE <=11 only
		// An input loses its value after becoming a radio
		input = document.createElement( "input" );
		input.value = "t";
		input.type = "radio";
		support.radioValue = input.value === "t";
	} )();
	
	
	var boolHook,
		attrHandle = jQuery.expr.attrHandle;
	
	jQuery.fn.extend( {
		attr: function( name, value ) {
			return access( this, jQuery.attr, name, value, arguments.length > 1 );
		},
	
		removeAttr: function( name ) {
			return this.each( function() {
				jQuery.removeAttr( this, name );
			} );
		}
	} );
	
	jQuery.extend( {
		attr: function( elem, name, value ) {
			var ret, hooks,
				nType = elem.nodeType;
	
			// Don't get/set attributes on text, comment and attribute nodes
			if ( nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}
	
			// Fallback to prop when attributes are not supported
			if ( typeof elem.getAttribute === "undefined" ) {
				return jQuery.prop( elem, name, value );
			}
	
			// Attribute hooks are determined by the lowercase version
			// Grab necessary hook if one is defined
			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
				hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
					( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
			}
	
			if ( value !== undefined ) {
				if ( value === null ) {
					jQuery.removeAttr( elem, name );
					return;
				}
	
				if ( hooks && "set" in hooks &&
					( ret = hooks.set( elem, value, name ) ) !== undefined ) {
					return ret;
				}
	
				elem.setAttribute( name, value + "" );
				return value;
			}
	
			if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
				return ret;
			}
	
			ret = jQuery.find.attr( elem, name );
	
			// Non-existent attributes return null, we normalize to undefined
			return ret == null ? undefined : ret;
		},
	
		attrHooks: {
			type: {
				set: function( elem, value ) {
					if ( !support.radioValue && value === "radio" &&
						nodeName( elem, "input" ) ) {
						var val = elem.value;
						elem.setAttribute( "type", value );
						if ( val ) {
							elem.value = val;
						}
						return value;
					}
				}
			}
		},
	
		removeAttr: function( elem, value ) {
			var name,
				i = 0,
	
				// Attribute names can contain non-HTML whitespace characters
				// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
				attrNames = value && value.match( rnothtmlwhite );
	
			if ( attrNames && elem.nodeType === 1 ) {
				while ( ( name = attrNames[ i++ ] ) ) {
					elem.removeAttribute( name );
				}
			}
		}
	} );
	
	// Hooks for boolean attributes
	boolHook = {
		set: function( elem, value, name ) {
			if ( value === false ) {
	
				// Remove boolean attributes when set to false
				jQuery.removeAttr( elem, name );
			} else {
				elem.setAttribute( name, name );
			}
			return name;
		}
	};
	
	jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
		var getter = attrHandle[ name ] || jQuery.find.attr;
	
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle,
				lowercaseName = name.toLowerCase();
	
			if ( !isXML ) {
	
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ lowercaseName ];
				attrHandle[ lowercaseName ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					lowercaseName :
					null;
				attrHandle[ lowercaseName ] = handle;
			}
			return ret;
		};
	} );
	
	
	
	
	var rfocusable = /^(?:input|select|textarea|button)$/i,
		rclickable = /^(?:a|area)$/i;
	
	jQuery.fn.extend( {
		prop: function( name, value ) {
			return access( this, jQuery.prop, name, value, arguments.length > 1 );
		},
	
		removeProp: function( name ) {
			return this.each( function() {
				delete this[ jQuery.propFix[ name ] || name ];
			} );
		}
	} );
	
	jQuery.extend( {
		prop: function( elem, name, value ) {
			var ret, hooks,
				nType = elem.nodeType;
	
			// Don't get/set properties on text, comment and attribute nodes
			if ( nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}
	
			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
	
				// Fix name and attach hooks
				name = jQuery.propFix[ name ] || name;
				hooks = jQuery.propHooks[ name ];
			}
	
			if ( value !== undefined ) {
				if ( hooks && "set" in hooks &&
					( ret = hooks.set( elem, value, name ) ) !== undefined ) {
					return ret;
				}
	
				return ( elem[ name ] = value );
			}
	
			if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
				return ret;
			}
	
			return elem[ name ];
		},
	
		propHooks: {
			tabIndex: {
				get: function( elem ) {
	
					// Support: IE <=9 - 11 only
					// elem.tabIndex doesn't always return the
					// correct value when it hasn't been explicitly set
					// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
					// Use proper attribute retrieval(#12072)
					var tabindex = jQuery.find.attr( elem, "tabindex" );
	
					if ( tabindex ) {
						return parseInt( tabindex, 10 );
					}
	
					if (
						rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) &&
						elem.href
					) {
						return 0;
					}
	
					return -1;
				}
			}
		},
	
		propFix: {
			"for": "htmlFor",
			"class": "className"
		}
	} );
	
	// Support: IE <=11 only
	// Accessing the selectedIndex property
	// forces the browser to respect setting selected
	// on the option
	// The getter ensures a default option is selected
	// when in an optgroup
	// eslint rule "no-unused-expressions" is disabled for this code
	// since it considers such accessions noop
	if ( !support.optSelected ) {
		jQuery.propHooks.selected = {
			get: function( elem ) {
	
				/* eslint no-unused-expressions: "off" */
	
				var parent = elem.parentNode;
				if ( parent && parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
				return null;
			},
			set: function( elem ) {
	
				/* eslint no-unused-expressions: "off" */
	
				var parent = elem.parentNode;
				if ( parent ) {
					parent.selectedIndex;
	
					if ( parent.parentNode ) {
						parent.parentNode.selectedIndex;
					}
				}
			}
		};
	}
	
	jQuery.each( [
		"tabIndex",
		"readOnly",
		"maxLength",
		"cellSpacing",
		"cellPadding",
		"rowSpan",
		"colSpan",
		"useMap",
		"frameBorder",
		"contentEditable"
	], function() {
		jQuery.propFix[ this.toLowerCase() ] = this;
	} );
	
	
	
	
		// Strip and collapse whitespace according to HTML spec
		// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
		function stripAndCollapse( value ) {
			var tokens = value.match( rnothtmlwhite ) || [];
			return tokens.join( " " );
		}
	
	
	function getClass( elem ) {
		return elem.getAttribute && elem.getAttribute( "class" ) || "";
	}
	
	function classesToArray( value ) {
		if ( Array.isArray( value ) ) {
			return value;
		}
		if ( typeof value === "string" ) {
			return value.match( rnothtmlwhite ) || [];
		}
		return [];
	}
	
	jQuery.fn.extend( {
		addClass: function( value ) {
			var classes, elem, cur, curValue, clazz, j, finalValue,
				i = 0;
	
			if ( isFunction( value ) ) {
				return this.each( function( j ) {
					jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
				} );
			}
	
			classes = classesToArray( value );
	
			if ( classes.length ) {
				while ( ( elem = this[ i++ ] ) ) {
					curValue = getClass( elem );
					cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );
	
					if ( cur ) {
						j = 0;
						while ( ( clazz = classes[ j++ ] ) ) {
							if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
								cur += clazz + " ";
							}
						}
	
						// Only assign if different to avoid unneeded rendering.
						finalValue = stripAndCollapse( cur );
						if ( curValue !== finalValue ) {
							elem.setAttribute( "class", finalValue );
						}
					}
				}
			}
	
			return this;
		},
	
		removeClass: function( value ) {
			var classes, elem, cur, curValue, clazz, j, finalValue,
				i = 0;
	
			if ( isFunction( value ) ) {
				return this.each( function( j ) {
					jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
				} );
			}
	
			if ( !arguments.length ) {
				return this.attr( "class", "" );
			}
	
			classes = classesToArray( value );
	
			if ( classes.length ) {
				while ( ( elem = this[ i++ ] ) ) {
					curValue = getClass( elem );
	
					// This expression is here for better compressibility (see addClass)
					cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );
	
					if ( cur ) {
						j = 0;
						while ( ( clazz = classes[ j++ ] ) ) {
	
							// Remove *all* instances
							while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
								cur = cur.replace( " " + clazz + " ", " " );
							}
						}
	
						// Only assign if different to avoid unneeded rendering.
						finalValue = stripAndCollapse( cur );
						if ( curValue !== finalValue ) {
							elem.setAttribute( "class", finalValue );
						}
					}
				}
			}
	
			return this;
		},
	
		toggleClass: function( value, stateVal ) {
			var type = typeof value,
				isValidValue = type === "string" || Array.isArray( value );
	
			if ( typeof stateVal === "boolean" && isValidValue ) {
				return stateVal ? this.addClass( value ) : this.removeClass( value );
			}
	
			if ( isFunction( value ) ) {
				return this.each( function( i ) {
					jQuery( this ).toggleClass(
						value.call( this, i, getClass( this ), stateVal ),
						stateVal
					);
				} );
			}
	
			return this.each( function() {
				var className, i, self, classNames;
	
				if ( isValidValue ) {
	
					// Toggle individual class names
					i = 0;
					self = jQuery( this );
					classNames = classesToArray( value );
	
					while ( ( className = classNames[ i++ ] ) ) {
	
						// Check each className given, space separated list
						if ( self.hasClass( className ) ) {
							self.removeClass( className );
						} else {
							self.addClass( className );
						}
					}
	
				// Toggle whole class name
				} else if ( value === undefined || type === "boolean" ) {
					className = getClass( this );
					if ( className ) {
	
						// Store className if set
						dataPriv.set( this, "__className__", className );
					}
	
					// If the element has a class name or if we're passed `false`,
					// then remove the whole classname (if there was one, the above saved it).
					// Otherwise bring back whatever was previously saved (if anything),
					// falling back to the empty string if nothing was stored.
					if ( this.setAttribute ) {
						this.setAttribute( "class",
							className || value === false ?
							"" :
							dataPriv.get( this, "__className__" ) || ""
						);
					}
				}
			} );
		},
	
		hasClass: function( selector ) {
			var className, elem,
				i = 0;
	
			className = " " + selector + " ";
			while ( ( elem = this[ i++ ] ) ) {
				if ( elem.nodeType === 1 &&
					( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
						return true;
				}
			}
	
			return false;
		}
	} );
	
	
	
	
	var rreturn = /\r/g;
	
	jQuery.fn.extend( {
		val: function( value ) {
			var hooks, ret, valueIsFunction,
				elem = this[ 0 ];
	
			if ( !arguments.length ) {
				if ( elem ) {
					hooks = jQuery.valHooks[ elem.type ] ||
						jQuery.valHooks[ elem.nodeName.toLowerCase() ];
	
					if ( hooks &&
						"get" in hooks &&
						( ret = hooks.get( elem, "value" ) ) !== undefined
					) {
						return ret;
					}
	
					ret = elem.value;
	
					// Handle most common string cases
					if ( typeof ret === "string" ) {
						return ret.replace( rreturn, "" );
					}
	
					// Handle cases where value is null/undef or number
					return ret == null ? "" : ret;
				}
	
				return;
			}
	
			valueIsFunction = isFunction( value );
	
			return this.each( function( i ) {
				var val;
	
				if ( this.nodeType !== 1 ) {
					return;
				}
	
				if ( valueIsFunction ) {
					val = value.call( this, i, jQuery( this ).val() );
				} else {
					val = value;
				}
	
				// Treat null/undefined as ""; convert numbers to string
				if ( val == null ) {
					val = "";
	
				} else if ( typeof val === "number" ) {
					val += "";
	
				} else if ( Array.isArray( val ) ) {
					val = jQuery.map( val, function( value ) {
						return value == null ? "" : value + "";
					} );
				}
	
				hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];
	
				// If set returns undefined, fall back to normal setting
				if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
					this.value = val;
				}
			} );
		}
	} );
	
	jQuery.extend( {
		valHooks: {
			option: {
				get: function( elem ) {
	
					var val = jQuery.find.attr( elem, "value" );
					return val != null ?
						val :
	
						// Support: IE <=10 - 11 only
						// option.text throws exceptions (#14686, #14858)
						// Strip and collapse whitespace
						// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
						stripAndCollapse( jQuery.text( elem ) );
				}
			},
			select: {
				get: function( elem ) {
					var value, option, i,
						options = elem.options,
						index = elem.selectedIndex,
						one = elem.type === "select-one",
						values = one ? null : [],
						max = one ? index + 1 : options.length;
	
					if ( index < 0 ) {
						i = max;
	
					} else {
						i = one ? index : 0;
					}
	
					// Loop through all the selected options
					for ( ; i < max; i++ ) {
						option = options[ i ];
	
						// Support: IE <=9 only
						// IE8-9 doesn't update selected after form reset (#2551)
						if ( ( option.selected || i === index ) &&
	
								// Don't return options that are disabled or in a disabled optgroup
								!option.disabled &&
								( !option.parentNode.disabled ||
									!nodeName( option.parentNode, "optgroup" ) ) ) {
	
							// Get the specific value for the option
							value = jQuery( option ).val();
	
							// We don't need an array for one selects
							if ( one ) {
								return value;
							}
	
							// Multi-Selects return an array
							values.push( value );
						}
					}
	
					return values;
				},
	
				set: function( elem, value ) {
					var optionSet, option,
						options = elem.options,
						values = jQuery.makeArray( value ),
						i = options.length;
	
					while ( i-- ) {
						option = options[ i ];
	
						/* eslint-disable no-cond-assign */
	
						if ( option.selected =
							jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
						) {
							optionSet = true;
						}
	
						/* eslint-enable no-cond-assign */
					}
	
					// Force browsers to behave consistently when non-matching value is set
					if ( !optionSet ) {
						elem.selectedIndex = -1;
					}
					return values;
				}
			}
		}
	} );
	
	// Radios and checkboxes getter/setter
	jQuery.each( [ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			set: function( elem, value ) {
				if ( Array.isArray( value ) ) {
					return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
				}
			}
		};
		if ( !support.checkOn ) {
			jQuery.valHooks[ this ].get = function( elem ) {
				return elem.getAttribute( "value" ) === null ? "on" : elem.value;
			};
		}
	} );
	
	
	
	
	// Return jQuery for attributes-only inclusion
	
	
	support.focusin = "onfocusin" in window;
	
	
	var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
		stopPropagationCallback = function( e ) {
			e.stopPropagation();
		};
	
	jQuery.extend( jQuery.event, {
	
		trigger: function( event, data, elem, onlyHandlers ) {
	
			var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
				eventPath = [ elem || document ],
				type = hasOwn.call( event, "type" ) ? event.type : event,
				namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];
	
			cur = lastElement = tmp = elem = elem || document;
	
			// Don't do events on text and comment nodes
			if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
				return;
			}
	
			// focus/blur morphs to focusin/out; ensure we're not firing them right now
			if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
				return;
			}
	
			if ( type.indexOf( "." ) > -1 ) {
	
				// Namespaced trigger; create a regexp to match event type in handle()
				namespaces = type.split( "." );
				type = namespaces.shift();
				namespaces.sort();
			}
			ontype = type.indexOf( ":" ) < 0 && "on" + type;
	
			// Caller can pass in a jQuery.Event object, Object, or just an event type string
			event = event[ jQuery.expando ] ?
				event :
				new jQuery.Event( type, typeof event === "object" && event );
	
			// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join( "." );
			event.rnamespace = event.namespace ?
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
				null;
	
			// Clean up the event in case it is being reused
			event.result = undefined;
			if ( !event.target ) {
				event.target = elem;
			}
	
			// Clone any incoming data and prepend the event, creating the handler arg list
			data = data == null ?
				[ event ] :
				jQuery.makeArray( data, [ event ] );
	
			// Allow special events to draw outside the lines
			special = jQuery.event.special[ type ] || {};
			if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
				return;
			}
	
			// Determine event propagation path in advance, per W3C events spec (#9951)
			// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
			if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {
	
				bubbleType = special.delegateType || type;
				if ( !rfocusMorph.test( bubbleType + type ) ) {
					cur = cur.parentNode;
				}
				for ( ; cur; cur = cur.parentNode ) {
					eventPath.push( cur );
					tmp = cur;
				}
	
				// Only add window if we got to document (e.g., not plain obj or detached DOM)
				if ( tmp === ( elem.ownerDocument || document ) ) {
					eventPath.push( tmp.defaultView || tmp.parentWindow || window );
				}
			}
	
			// Fire handlers on the event path
			i = 0;
			while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
				lastElement = cur;
				event.type = i > 1 ?
					bubbleType :
					special.bindType || type;
	
				// jQuery handler
				handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
					dataPriv.get( cur, "handle" );
				if ( handle ) {
					handle.apply( cur, data );
				}
	
				// Native handler
				handle = ontype && cur[ ontype ];
				if ( handle && handle.apply && acceptData( cur ) ) {
					event.result = handle.apply( cur, data );
					if ( event.result === false ) {
						event.preventDefault();
					}
				}
			}
			event.type = type;
	
			// If nobody prevented the default action, do it now
			if ( !onlyHandlers && !event.isDefaultPrevented() ) {
	
				if ( ( !special._default ||
					special._default.apply( eventPath.pop(), data ) === false ) &&
					acceptData( elem ) ) {
	
					// Call a native DOM method on the target with the same name as the event.
					// Don't do default actions on window, that's where global variables be (#6170)
					if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {
	
						// Don't re-trigger an onFOO event when we call its FOO() method
						tmp = elem[ ontype ];
	
						if ( tmp ) {
							elem[ ontype ] = null;
						}
	
						// Prevent re-triggering of the same event, since we already bubbled it above
						jQuery.event.triggered = type;
	
						if ( event.isPropagationStopped() ) {
							lastElement.addEventListener( type, stopPropagationCallback );
						}
	
						elem[ type ]();
	
						if ( event.isPropagationStopped() ) {
							lastElement.removeEventListener( type, stopPropagationCallback );
						}
	
						jQuery.event.triggered = undefined;
	
						if ( tmp ) {
							elem[ ontype ] = tmp;
						}
					}
				}
			}
	
			return event.result;
		},
	
		// Piggyback on a donor event to simulate a different one
		// Used only for `focus(in | out)` events
		simulate: function( type, elem, event ) {
			var e = jQuery.extend(
				new jQuery.Event(),
				event,
				{
					type: type,
					isSimulated: true
				}
			);
	
			jQuery.event.trigger( e, null, elem );
		}
	
	} );
	
	jQuery.fn.extend( {
	
		trigger: function( type, data ) {
			return this.each( function() {
				jQuery.event.trigger( type, data, this );
			} );
		},
		triggerHandler: function( type, data ) {
			var elem = this[ 0 ];
			if ( elem ) {
				return jQuery.event.trigger( type, data, elem, true );
			}
		}
	} );
	
	
	// Support: Firefox <=44
	// Firefox doesn't have focus(in | out) events
	// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
	//
	// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
	// focus(in | out) events fire after focus & blur events,
	// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
	// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
	if ( !support.focusin ) {
		jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {
	
			// Attach a single capturing handler on the document while someone wants focusin/focusout
			var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
			};
	
			jQuery.event.special[ fix ] = {
				setup: function() {
					var doc = this.ownerDocument || this,
						attaches = dataPriv.access( doc, fix );
	
					if ( !attaches ) {
						doc.addEventListener( orig, handler, true );
					}
					dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
				},
				teardown: function() {
					var doc = this.ownerDocument || this,
						attaches = dataPriv.access( doc, fix ) - 1;
	
					if ( !attaches ) {
						doc.removeEventListener( orig, handler, true );
						dataPriv.remove( doc, fix );
	
					} else {
						dataPriv.access( doc, fix, attaches );
					}
				}
			};
		} );
	}
	var location = window.location;
	
	var nonce = Date.now();
	
	var rquery = ( /\?/ );
	
	
	
	// Cross-browser xml parsing
	jQuery.parseXML = function( data ) {
		var xml;
		if ( !data || typeof data !== "string" ) {
			return null;
		}
	
		// Support: IE 9 - 11 only
		// IE throws on parseFromString with invalid input.
		try {
			xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
		} catch ( e ) {
			xml = undefined;
		}
	
		if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	};
	
	
	var
		rbracket = /\[\]$/,
		rCRLF = /\r?\n/g,
		rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
		rsubmittable = /^(?:input|select|textarea|keygen)/i;
	
	function buildParams( prefix, obj, traditional, add ) {
		var name;
	
		if ( Array.isArray( obj ) ) {
	
			// Serialize array item.
			jQuery.each( obj, function( i, v ) {
				if ( traditional || rbracket.test( prefix ) ) {
	
					// Treat each array item as a scalar.
					add( prefix, v );
	
				} else {
	
					// Item is non-scalar (array or object), encode its numeric index.
					buildParams(
						prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
						v,
						traditional,
						add
					);
				}
			} );
	
		} else if ( !traditional && toType( obj ) === "object" ) {
	
			// Serialize object item.
			for ( name in obj ) {
				buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
			}
	
		} else {
	
			// Serialize scalar item.
			add( prefix, obj );
		}
	}
	
	// Serialize an array of form elements or a set of
	// key/values into a query string
	jQuery.param = function( a, traditional ) {
		var prefix,
			s = [],
			add = function( key, valueOrFunction ) {
	
				// If value is a function, invoke it and use its return value
				var value = isFunction( valueOrFunction ) ?
					valueOrFunction() :
					valueOrFunction;
	
				s[ s.length ] = encodeURIComponent( key ) + "=" +
					encodeURIComponent( value == null ? "" : value );
			};
	
		// If an array was passed in, assume that it is an array of form elements.
		if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
	
			// Serialize the form elements
			jQuery.each( a, function() {
				add( this.name, this.value );
			} );
	
		} else {
	
			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for ( prefix in a ) {
				buildParams( prefix, a[ prefix ], traditional, add );
			}
		}
	
		// Return the resulting serialization
		return s.join( "&" );
	};
	
	jQuery.fn.extend( {
		serialize: function() {
			return jQuery.param( this.serializeArray() );
		},
		serializeArray: function() {
			return this.map( function() {
	
				// Can add propHook for "elements" to filter or add form elements
				var elements = jQuery.prop( this, "elements" );
				return elements ? jQuery.makeArray( elements ) : this;
			} )
			.filter( function() {
				var type = this.type;
	
				// Use .is( ":disabled" ) so that fieldset[disabled] works
				return this.name && !jQuery( this ).is( ":disabled" ) &&
					rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
					( this.checked || !rcheckableType.test( type ) );
			} )
			.map( function( i, elem ) {
				var val = jQuery( this ).val();
	
				if ( val == null ) {
					return null;
				}
	
				if ( Array.isArray( val ) ) {
					return jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} );
				}
	
				return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
			} ).get();
		}
	} );
	
	
	var
		r20 = /%20/g,
		rhash = /#.*$/,
		rantiCache = /([?&])_=[^&]*/,
		rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	
		// #7653, #8125, #8152: local protocol detection
		rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		rnoContent = /^(?:GET|HEAD)$/,
		rprotocol = /^\/\//,
	
		/* Prefilters
		 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
		 * 2) These are called:
		 *    - BEFORE asking for a transport
		 *    - AFTER param serialization (s.data is a string if s.processData is true)
		 * 3) key is the dataType
		 * 4) the catchall symbol "*" can be used
		 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
		 */
		prefilters = {},
	
		/* Transports bindings
		 * 1) key is the dataType
		 * 2) the catchall symbol "*" can be used
		 * 3) selection will start with transport dataType and THEN go to "*" if needed
		 */
		transports = {},
	
		// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
		allTypes = "*/".concat( "*" ),
	
		// Anchor tag for parsing the document origin
		originAnchor = document.createElement( "a" );
		originAnchor.href = location.href;
	
	// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	function addToPrefiltersOrTransports( structure ) {
	
		// dataTypeExpression is optional and defaults to "*"
		return function( dataTypeExpression, func ) {
	
			if ( typeof dataTypeExpression !== "string" ) {
				func = dataTypeExpression;
				dataTypeExpression = "*";
			}
	
			var dataType,
				i = 0,
				dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];
	
			if ( isFunction( func ) ) {
	
				// For each dataType in the dataTypeExpression
				while ( ( dataType = dataTypes[ i++ ] ) ) {
	
					// Prepend if requested
					if ( dataType[ 0 ] === "+" ) {
						dataType = dataType.slice( 1 ) || "*";
						( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );
	
					// Otherwise append
					} else {
						( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
					}
				}
			}
		};
	}
	
	// Base inspection function for prefilters and transports
	function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {
	
		var inspected = {},
			seekingTransport = ( structure === transports );
	
		function inspect( dataType ) {
			var selected;
			inspected[ dataType ] = true;
			jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
				var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
				if ( typeof dataTypeOrTransport === "string" &&
					!seekingTransport && !inspected[ dataTypeOrTransport ] ) {
	
					options.dataTypes.unshift( dataTypeOrTransport );
					inspect( dataTypeOrTransport );
					return false;
				} else if ( seekingTransport ) {
					return !( selected = dataTypeOrTransport );
				}
			} );
			return selected;
		}
	
		return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
	}
	
	// A special extend for ajax options
	// that takes "flat" options (not to be deep extended)
	// Fixes #9887
	function ajaxExtend( target, src ) {
		var key, deep,
			flatOptions = jQuery.ajaxSettings.flatOptions || {};
	
		for ( key in src ) {
			if ( src[ key ] !== undefined ) {
				( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
			}
		}
		if ( deep ) {
			jQuery.extend( true, target, deep );
		}
	
		return target;
	}
	
	/* Handles responses to an ajax request:
	 * - finds the right dataType (mediates between content-type and expected dataType)
	 * - returns the corresponding response
	 */
	function ajaxHandleResponses( s, jqXHR, responses ) {
	
		var ct, type, finalDataType, firstDataType,
			contents = s.contents,
			dataTypes = s.dataTypes;
	
		// Remove auto dataType and get content-type in the process
		while ( dataTypes[ 0 ] === "*" ) {
			dataTypes.shift();
			if ( ct === undefined ) {
				ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
			}
		}
	
		// Check if we're dealing with a known content-type
		if ( ct ) {
			for ( type in contents ) {
				if ( contents[ type ] && contents[ type ].test( ct ) ) {
					dataTypes.unshift( type );
					break;
				}
			}
		}
	
		// Check to see if we have a response for the expected dataType
		if ( dataTypes[ 0 ] in responses ) {
			finalDataType = dataTypes[ 0 ];
		} else {
	
			// Try convertible dataTypes
			for ( type in responses ) {
				if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
					finalDataType = type;
					break;
				}
				if ( !firstDataType ) {
					firstDataType = type;
				}
			}
	
			// Or just use first one
			finalDataType = finalDataType || firstDataType;
		}
	
		// If we found a dataType
		// We add the dataType to the list if needed
		// and return the corresponding response
		if ( finalDataType ) {
			if ( finalDataType !== dataTypes[ 0 ] ) {
				dataTypes.unshift( finalDataType );
			}
			return responses[ finalDataType ];
		}
	}
	
	/* Chain conversions given the request and the original response
	 * Also sets the responseXXX fields on the jqXHR instance
	 */
	function ajaxConvert( s, response, jqXHR, isSuccess ) {
		var conv2, current, conv, tmp, prev,
			converters = {},
	
			// Work with a copy of dataTypes in case we need to modify it for conversion
			dataTypes = s.dataTypes.slice();
	
		// Create converters map with lowercased keys
		if ( dataTypes[ 1 ] ) {
			for ( conv in s.converters ) {
				converters[ conv.toLowerCase() ] = s.converters[ conv ];
			}
		}
	
		current = dataTypes.shift();
	
		// Convert to each sequential dataType
		while ( current ) {
	
			if ( s.responseFields[ current ] ) {
				jqXHR[ s.responseFields[ current ] ] = response;
			}
	
			// Apply the dataFilter if provided
			if ( !prev && isSuccess && s.dataFilter ) {
				response = s.dataFilter( response, s.dataType );
			}
	
			prev = current;
			current = dataTypes.shift();
	
			if ( current ) {
	
				// There's only work to do if current dataType is non-auto
				if ( current === "*" ) {
	
					current = prev;
	
				// Convert response if prev dataType is non-auto and differs from current
				} else if ( prev !== "*" && prev !== current ) {
	
					// Seek a direct converter
					conv = converters[ prev + " " + current ] || converters[ "* " + current ];
	
					// If none found, seek a pair
					if ( !conv ) {
						for ( conv2 in converters ) {
	
							// If conv2 outputs current
							tmp = conv2.split( " " );
							if ( tmp[ 1 ] === current ) {
	
								// If prev can be converted to accepted input
								conv = converters[ prev + " " + tmp[ 0 ] ] ||
									converters[ "* " + tmp[ 0 ] ];
								if ( conv ) {
	
									// Condense equivalence converters
									if ( conv === true ) {
										conv = converters[ conv2 ];
	
									// Otherwise, insert the intermediate dataType
									} else if ( converters[ conv2 ] !== true ) {
										current = tmp[ 0 ];
										dataTypes.unshift( tmp[ 1 ] );
									}
									break;
								}
							}
						}
					}
	
					// Apply converter (if not an equivalence)
					if ( conv !== true ) {
	
						// Unless errors are allowed to bubble, catch and return them
						if ( conv && s.throws ) {
							response = conv( response );
						} else {
							try {
								response = conv( response );
							} catch ( e ) {
								return {
									state: "parsererror",
									error: conv ? e : "No conversion from " + prev + " to " + current
								};
							}
						}
					}
				}
			}
		}
	
		return { state: "success", data: response };
	}
	
	jQuery.extend( {
	
		// Counter for holding the number of active queries
		active: 0,
	
		// Last-Modified header cache for next request
		lastModified: {},
		etag: {},
	
		ajaxSettings: {
			url: location.href,
			type: "GET",
			isLocal: rlocalProtocol.test( location.protocol ),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	
			/*
			timeout: 0,
			data: null,
			dataType: null,
			username: null,
			password: null,
			cache: null,
			throws: false,
			traditional: false,
			headers: {},
			*/
	
			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},
	
			contents: {
				xml: /\bxml\b/,
				html: /\bhtml/,
				json: /\bjson\b/
			},
	
			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},
	
			// Data converters
			// Keys separate source (or catchall "*") and destination types with a single space
			converters: {
	
				// Convert anything to text
				"* text": String,
	
				// Text to html (true = no transformation)
				"text html": true,
	
				// Evaluate text as a json expression
				"text json": JSON.parse,
	
				// Parse text as xml
				"text xml": jQuery.parseXML
			},
	
			// For options that shouldn't be deep extended:
			// you can add your own custom options here if
			// and when you create one that shouldn't be
			// deep extended (see ajaxExtend)
			flatOptions: {
				url: true,
				context: true
			}
		},
	
		// Creates a full fledged settings object into target
		// with both ajaxSettings and settings fields.
		// If target is omitted, writes into ajaxSettings.
		ajaxSetup: function( target, settings ) {
			return settings ?
	
				// Building a settings object
				ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :
	
				// Extending ajaxSettings
				ajaxExtend( jQuery.ajaxSettings, target );
		},
	
		ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
		ajaxTransport: addToPrefiltersOrTransports( transports ),
	
		// Main method
		ajax: function( url, options ) {
	
			// If url is an object, simulate pre-1.5 signature
			if ( typeof url === "object" ) {
				options = url;
				url = undefined;
			}
	
			// Force options to be an object
			options = options || {};
	
			var transport,
	
				// URL without anti-cache param
				cacheURL,
	
				// Response headers
				responseHeadersString,
				responseHeaders,
	
				// timeout handle
				timeoutTimer,
	
				// Url cleanup var
				urlAnchor,
	
				// Request state (becomes false upon send and true upon completion)
				completed,
	
				// To know if global events are to be dispatched
				fireGlobals,
	
				// Loop variable
				i,
	
				// uncached part of the url
				uncached,
	
				// Create the final options object
				s = jQuery.ajaxSetup( {}, options ),
	
				// Callbacks context
				callbackContext = s.context || s,
	
				// Context for global events is callbackContext if it is a DOM node or jQuery collection
				globalEventContext = s.context &&
					( callbackContext.nodeType || callbackContext.jquery ) ?
						jQuery( callbackContext ) :
						jQuery.event,
	
				// Deferreds
				deferred = jQuery.Deferred(),
				completeDeferred = jQuery.Callbacks( "once memory" ),
	
				// Status-dependent callbacks
				statusCode = s.statusCode || {},
	
				// Headers (they are sent all at once)
				requestHeaders = {},
				requestHeadersNames = {},
	
				// Default abort message
				strAbort = "canceled",
	
				// Fake xhr
				jqXHR = {
					readyState: 0,
	
					// Builds headers hashtable if needed
					getResponseHeader: function( key ) {
						var match;
						if ( completed ) {
							if ( !responseHeaders ) {
								responseHeaders = {};
								while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
									responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
								}
							}
							match = responseHeaders[ key.toLowerCase() ];
						}
						return match == null ? null : match;
					},
	
					// Raw string
					getAllResponseHeaders: function() {
						return completed ? responseHeadersString : null;
					},
	
					// Caches the header
					setRequestHeader: function( name, value ) {
						if ( completed == null ) {
							name = requestHeadersNames[ name.toLowerCase() ] =
								requestHeadersNames[ name.toLowerCase() ] || name;
							requestHeaders[ name ] = value;
						}
						return this;
					},
	
					// Overrides response content-type header
					overrideMimeType: function( type ) {
						if ( completed == null ) {
							s.mimeType = type;
						}
						return this;
					},
	
					// Status-dependent callbacks
					statusCode: function( map ) {
						var code;
						if ( map ) {
							if ( completed ) {
	
								// Execute the appropriate callbacks
								jqXHR.always( map[ jqXHR.status ] );
							} else {
	
								// Lazy-add the new callbacks in a way that preserves old ones
								for ( code in map ) {
									statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
								}
							}
						}
						return this;
					},
	
					// Cancel the request
					abort: function( statusText ) {
						var finalText = statusText || strAbort;
						if ( transport ) {
							transport.abort( finalText );
						}
						done( 0, finalText );
						return this;
					}
				};
	
			// Attach deferreds
			deferred.promise( jqXHR );
	
			// Add protocol if not provided (prefilters might expect it)
			// Handle falsy url in the settings object (#10093: consistency with old signature)
			// We also use the url parameter if available
			s.url = ( ( url || s.url || location.href ) + "" )
				.replace( rprotocol, location.protocol + "//" );
	
			// Alias method option to type as per ticket #12004
			s.type = options.method || options.type || s.method || s.type;
	
			// Extract dataTypes list
			s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];
	
			// A cross-domain request is in order when the origin doesn't match the current origin.
			if ( s.crossDomain == null ) {
				urlAnchor = document.createElement( "a" );
	
				// Support: IE <=8 - 11, Edge 12 - 15
				// IE throws exception on accessing the href property if url is malformed,
				// e.g. http://example.com:80x/
				try {
					urlAnchor.href = s.url;
	
					// Support: IE <=8 - 11 only
					// Anchor's host property isn't correctly set when s.url is relative
					urlAnchor.href = urlAnchor.href;
					s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
						urlAnchor.protocol + "//" + urlAnchor.host;
				} catch ( e ) {
	
					// If there is an error parsing the URL, assume it is crossDomain,
					// it can be rejected by the transport if it is invalid
					s.crossDomain = true;
				}
			}
	
			// Convert data if not already a string
			if ( s.data && s.processData && typeof s.data !== "string" ) {
				s.data = jQuery.param( s.data, s.traditional );
			}
	
			// Apply prefilters
			inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );
	
			// If request was aborted inside a prefilter, stop there
			if ( completed ) {
				return jqXHR;
			}
	
			// We can fire global events as of now if asked to
			// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
			fireGlobals = jQuery.event && s.global;
	
			// Watch for a new set of requests
			if ( fireGlobals && jQuery.active++ === 0 ) {
				jQuery.event.trigger( "ajaxStart" );
			}
	
			// Uppercase the type
			s.type = s.type.toUpperCase();
	
			// Determine if request has content
			s.hasContent = !rnoContent.test( s.type );
	
			// Save the URL in case we're toying with the If-Modified-Since
			// and/or If-None-Match header later on
			// Remove hash to simplify url manipulation
			cacheURL = s.url.replace( rhash, "" );
	
			// More options handling for requests with no content
			if ( !s.hasContent ) {
	
				// Remember the hash so we can put it back
				uncached = s.url.slice( cacheURL.length );
	
				// If data is available and should be processed, append data to url
				if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
					cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;
	
					// #9682: remove data so that it's not used in an eventual retry
					delete s.data;
				}
	
				// Add or update anti-cache param if needed
				if ( s.cache === false ) {
					cacheURL = cacheURL.replace( rantiCache, "$1" );
					uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
				}
	
				// Put hash and anti-cache on the URL that will be requested (gh-1732)
				s.url = cacheURL + uncached;
	
			// Change '%20' to '+' if this is encoded form body content (gh-2658)
			} else if ( s.data && s.processData &&
				( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
				s.data = s.data.replace( r20, "+" );
			}
	
			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if ( s.ifModified ) {
				if ( jQuery.lastModified[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
				}
				if ( jQuery.etag[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
				}
			}
	
			// Set the correct header, if data is being sent
			if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
				jqXHR.setRequestHeader( "Content-Type", s.contentType );
			}
	
			// Set the Accepts header for the server, depending on the dataType
			jqXHR.setRequestHeader(
				"Accept",
				s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
					s.accepts[ s.dataTypes[ 0 ] ] +
						( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
					s.accepts[ "*" ]
			);
	
			// Check for headers option
			for ( i in s.headers ) {
				jqXHR.setRequestHeader( i, s.headers[ i ] );
			}
	
			// Allow custom headers/mimetypes and early abort
			if ( s.beforeSend &&
				( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {
	
				// Abort if not done already and return
				return jqXHR.abort();
			}
	
			// Aborting is no longer a cancellation
			strAbort = "abort";
	
			// Install callbacks on deferreds
			completeDeferred.add( s.complete );
			jqXHR.done( s.success );
			jqXHR.fail( s.error );
	
			// Get transport
			transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );
	
			// If no transport, we auto-abort
			if ( !transport ) {
				done( -1, "No Transport" );
			} else {
				jqXHR.readyState = 1;
	
				// Send global event
				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
				}
	
				// If request was aborted inside ajaxSend, stop there
				if ( completed ) {
					return jqXHR;
				}
	
				// Timeout
				if ( s.async && s.timeout > 0 ) {
					timeoutTimer = window.setTimeout( function() {
						jqXHR.abort( "timeout" );
					}, s.timeout );
				}
	
				try {
					completed = false;
					transport.send( requestHeaders, done );
				} catch ( e ) {
	
					// Rethrow post-completion exceptions
					if ( completed ) {
						throw e;
					}
	
					// Propagate others as results
					done( -1, e );
				}
			}
	
			// Callback for when everything is done
			function done( status, nativeStatusText, responses, headers ) {
				var isSuccess, success, error, response, modified,
					statusText = nativeStatusText;
	
				// Ignore repeat invocations
				if ( completed ) {
					return;
				}
	
				completed = true;
	
				// Clear timeout if it exists
				if ( timeoutTimer ) {
					window.clearTimeout( timeoutTimer );
				}
	
				// Dereference transport for early garbage collection
				// (no matter how long the jqXHR object will be used)
				transport = undefined;
	
				// Cache response headers
				responseHeadersString = headers || "";
	
				// Set readyState
				jqXHR.readyState = status > 0 ? 4 : 0;
	
				// Determine if successful
				isSuccess = status >= 200 && status < 300 || status === 304;
	
				// Get response data
				if ( responses ) {
					response = ajaxHandleResponses( s, jqXHR, responses );
				}
	
				// Convert no matter what (that way responseXXX fields are always set)
				response = ajaxConvert( s, response, jqXHR, isSuccess );
	
				// If successful, handle type chaining
				if ( isSuccess ) {
	
					// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
					if ( s.ifModified ) {
						modified = jqXHR.getResponseHeader( "Last-Modified" );
						if ( modified ) {
							jQuery.lastModified[ cacheURL ] = modified;
						}
						modified = jqXHR.getResponseHeader( "etag" );
						if ( modified ) {
							jQuery.etag[ cacheURL ] = modified;
						}
					}
	
					// if no content
					if ( status === 204 || s.type === "HEAD" ) {
						statusText = "nocontent";
	
					// if not modified
					} else if ( status === 304 ) {
						statusText = "notmodified";
	
					// If we have data, let's convert it
					} else {
						statusText = response.state;
						success = response.data;
						error = response.error;
						isSuccess = !error;
					}
				} else {
	
					// Extract error from statusText and normalize for non-aborts
					error = statusText;
					if ( status || !statusText ) {
						statusText = "error";
						if ( status < 0 ) {
							status = 0;
						}
					}
				}
	
				// Set data for the fake xhr object
				jqXHR.status = status;
				jqXHR.statusText = ( nativeStatusText || statusText ) + "";
	
				// Success/Error
				if ( isSuccess ) {
					deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
				} else {
					deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
				}
	
				// Status-dependent callbacks
				jqXHR.statusCode( statusCode );
				statusCode = undefined;
	
				if ( fireGlobals ) {
					globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
						[ jqXHR, s, isSuccess ? success : error ] );
				}
	
				// Complete
				completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );
	
				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
	
					// Handle the global AJAX counter
					if ( !( --jQuery.active ) ) {
						jQuery.event.trigger( "ajaxStop" );
					}
				}
			}
	
			return jqXHR;
		},
	
		getJSON: function( url, data, callback ) {
			return jQuery.get( url, data, callback, "json" );
		},
	
		getScript: function( url, callback ) {
			return jQuery.get( url, undefined, callback, "script" );
		}
	} );
	
	jQuery.each( [ "get", "post" ], function( i, method ) {
		jQuery[ method ] = function( url, data, callback, type ) {
	
			// Shift arguments if data argument was omitted
			if ( isFunction( data ) ) {
				type = type || callback;
				callback = data;
				data = undefined;
			}
	
			// The url can be an options object (which then must have .url)
			return jQuery.ajax( jQuery.extend( {
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			}, jQuery.isPlainObject( url ) && url ) );
		};
	} );
	
	
	jQuery._evalUrl = function( url ) {
		return jQuery.ajax( {
			url: url,
	
			// Make this explicit, since user can override this through ajaxSetup (#11264)
			type: "GET",
			dataType: "script",
			cache: true,
			async: false,
			global: false,
			"throws": true
		} );
	};
	
	
	jQuery.fn.extend( {
		wrapAll: function( html ) {
			var wrap;
	
			if ( this[ 0 ] ) {
				if ( isFunction( html ) ) {
					html = html.call( this[ 0 ] );
				}
	
				// The elements to wrap the target around
				wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );
	
				if ( this[ 0 ].parentNode ) {
					wrap.insertBefore( this[ 0 ] );
				}
	
				wrap.map( function() {
					var elem = this;
	
					while ( elem.firstElementChild ) {
						elem = elem.firstElementChild;
					}
	
					return elem;
				} ).append( this );
			}
	
			return this;
		},
	
		wrapInner: function( html ) {
			if ( isFunction( html ) ) {
				return this.each( function( i ) {
					jQuery( this ).wrapInner( html.call( this, i ) );
				} );
			}
	
			return this.each( function() {
				var self = jQuery( this ),
					contents = self.contents();
	
				if ( contents.length ) {
					contents.wrapAll( html );
	
				} else {
					self.append( html );
				}
			} );
		},
	
		wrap: function( html ) {
			var htmlIsFunction = isFunction( html );
	
			return this.each( function( i ) {
				jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
			} );
		},
	
		unwrap: function( selector ) {
			this.parent( selector ).not( "body" ).each( function() {
				jQuery( this ).replaceWith( this.childNodes );
			} );
			return this;
		}
	} );
	
	
	jQuery.expr.pseudos.hidden = function( elem ) {
		return !jQuery.expr.pseudos.visible( elem );
	};
	jQuery.expr.pseudos.visible = function( elem ) {
		return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
	};
	
	
	
	
	jQuery.ajaxSettings.xhr = function() {
		try {
			return new window.XMLHttpRequest();
		} catch ( e ) {}
	};
	
	var xhrSuccessStatus = {
	
			// File protocol always yields status code 0, assume 200
			0: 200,
	
			// Support: IE <=9 only
			// #1450: sometimes IE returns 1223 when it should be 204
			1223: 204
		},
		xhrSupported = jQuery.ajaxSettings.xhr();
	
	support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
	support.ajax = xhrSupported = !!xhrSupported;
	
	jQuery.ajaxTransport( function( options ) {
		var callback, errorCallback;
	
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( support.cors || xhrSupported && !options.crossDomain ) {
			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr();
	
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);
	
					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}
	
					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}
	
					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}
	
					// Set headers
					for ( i in headers ) {
						xhr.setRequestHeader( i, headers[ i ] );
					}
	
					// Callback
					callback = function( type ) {
						return function() {
							if ( callback ) {
								callback = errorCallback = xhr.onload =
									xhr.onerror = xhr.onabort = xhr.ontimeout =
										xhr.onreadystatechange = null;
	
								if ( type === "abort" ) {
									xhr.abort();
								} else if ( type === "error" ) {
	
									// Support: IE <=9 only
									// On a manual native abort, IE9 throws
									// errors on any property access that is not readyState
									if ( typeof xhr.status !== "number" ) {
										complete( 0, "error" );
									} else {
										complete(
	
											// File: protocol always yields status 0; see #8605, #14207
											xhr.status,
											xhr.statusText
										);
									}
								} else {
									complete(
										xhrSuccessStatus[ xhr.status ] || xhr.status,
										xhr.statusText,
	
										// Support: IE <=9 only
										// IE9 has no XHR2 but throws on binary (trac-11426)
										// For XHR2 non-text, let the caller handle it (gh-2498)
										( xhr.responseType || "text" ) !== "text"  ||
										typeof xhr.responseText !== "string" ?
											{ binary: xhr.response } :
											{ text: xhr.responseText },
										xhr.getAllResponseHeaders()
									);
								}
							}
						};
					};
	
					// Listen to events
					xhr.onload = callback();
					errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );
	
					// Support: IE 9 only
					// Use onreadystatechange to replace onabort
					// to handle uncaught aborts
					if ( xhr.onabort !== undefined ) {
						xhr.onabort = errorCallback;
					} else {
						xhr.onreadystatechange = function() {
	
							// Check readyState before timeout as it changes
							if ( xhr.readyState === 4 ) {
	
								// Allow onerror to be called first,
								// but that will not handle a native abort
								// Also, save errorCallback to a variable
								// as xhr.onerror cannot be accessed
								window.setTimeout( function() {
									if ( callback ) {
										errorCallback();
									}
								} );
							}
						};
					}
	
					// Create the abort callback
					callback = callback( "abort" );
	
					try {
	
						// Do send the request (this may raise an exception)
						xhr.send( options.hasContent && options.data || null );
					} catch ( e ) {
	
						// #14683: Only rethrow if this hasn't been notified as an error yet
						if ( callback ) {
							throw e;
						}
					}
				},
	
				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	} );
	
	
	
	
	// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
	jQuery.ajaxPrefilter( function( s ) {
		if ( s.crossDomain ) {
			s.contents.script = false;
		}
	} );
	
	// Install script dataType
	jQuery.ajaxSetup( {
		accepts: {
			script: "text/javascript, application/javascript, " +
				"application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /\b(?:java|ecma)script\b/
		},
		converters: {
			"text script": function( text ) {
				jQuery.globalEval( text );
				return text;
			}
		}
	} );
	
	// Handle cache's special case and crossDomain
	jQuery.ajaxPrefilter( "script", function( s ) {
		if ( s.cache === undefined ) {
			s.cache = false;
		}
		if ( s.crossDomain ) {
			s.type = "GET";
		}
	} );
	
	// Bind script tag hack transport
	jQuery.ajaxTransport( "script", function( s ) {
	
		// This transport only deals with cross domain requests
		if ( s.crossDomain ) {
			var script, callback;
			return {
				send: function( _, complete ) {
					script = jQuery( "<script>" ).prop( {
						charset: s.scriptCharset,
						src: s.url
					} ).on(
						"load error",
						callback = function( evt ) {
							script.remove();
							callback = null;
							if ( evt ) {
								complete( evt.type === "error" ? 404 : 200, evt.type );
							}
						}
					);
	
					// Use native DOM manipulation to avoid our domManip AJAX trickery
					document.head.appendChild( script[ 0 ] );
				},
				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	} );
	
	
	
	
	var oldCallbacks = [],
		rjsonp = /(=)\?(?=&|$)|\?\?/;
	
	// Default jsonp settings
	jQuery.ajaxSetup( {
		jsonp: "callback",
		jsonpCallback: function() {
			var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
			this[ callback ] = true;
			return callback;
		}
	} );
	
	// Detect, normalize options and install callbacks for jsonp requests
	jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {
	
		var callbackName, overwritten, responseContainer,
			jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
				"url" :
				typeof s.data === "string" &&
					( s.contentType || "" )
						.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
					rjsonp.test( s.data ) && "data"
			);
	
		// Handle iff the expected data type is "jsonp" or we have a parameter to set
		if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {
	
			// Get callback name, remembering preexisting value associated with it
			callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
				s.jsonpCallback() :
				s.jsonpCallback;
	
			// Insert callback into url or form data
			if ( jsonProp ) {
				s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
			} else if ( s.jsonp !== false ) {
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
			}
	
			// Use data converter to retrieve json after script execution
			s.converters[ "script json" ] = function() {
				if ( !responseContainer ) {
					jQuery.error( callbackName + " was not called" );
				}
				return responseContainer[ 0 ];
			};
	
			// Force json dataType
			s.dataTypes[ 0 ] = "json";
	
			// Install callback
			overwritten = window[ callbackName ];
			window[ callbackName ] = function() {
				responseContainer = arguments;
			};
	
			// Clean-up function (fires after converters)
			jqXHR.always( function() {
	
				// If previous value didn't exist - remove it
				if ( overwritten === undefined ) {
					jQuery( window ).removeProp( callbackName );
	
				// Otherwise restore preexisting value
				} else {
					window[ callbackName ] = overwritten;
				}
	
				// Save back as free
				if ( s[ callbackName ] ) {
	
					// Make sure that re-using the options doesn't screw things around
					s.jsonpCallback = originalSettings.jsonpCallback;
	
					// Save the callback name for future use
					oldCallbacks.push( callbackName );
				}
	
				// Call if it was a function and we have a response
				if ( responseContainer && isFunction( overwritten ) ) {
					overwritten( responseContainer[ 0 ] );
				}
	
				responseContainer = overwritten = undefined;
			} );
	
			// Delegate to script
			return "script";
		}
	} );
	
	
	
	
	// Support: Safari 8 only
	// In Safari 8 documents created via document.implementation.createHTMLDocument
	// collapse sibling forms: the second one becomes a child of the first one.
	// Because of that, this security measure has to be disabled in Safari 8.
	// https://bugs.webkit.org/show_bug.cgi?id=137337
	support.createHTMLDocument = ( function() {
		var body = document.implementation.createHTMLDocument( "" ).body;
		body.innerHTML = "<form></form><form></form>";
		return body.childNodes.length === 2;
	} )();
	
	
	// Argument "data" should be string of html
	// context (optional): If specified, the fragment will be created in this context,
	// defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	jQuery.parseHTML = function( data, context, keepScripts ) {
		if ( typeof data !== "string" ) {
			return [];
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}
	
		var base, parsed, scripts;
	
		if ( !context ) {
	
			// Stop scripts or inline event handlers from being executed immediately
			// by using document.implementation
			if ( support.createHTMLDocument ) {
				context = document.implementation.createHTMLDocument( "" );
	
				// Set the base href for the created document
				// so any parsed elements with URLs
				// are based on the document's URL (gh-2965)
				base = context.createElement( "base" );
				base.href = document.location.href;
				context.head.appendChild( base );
			} else {
				context = document;
			}
		}
	
		parsed = rsingleTag.exec( data );
		scripts = !keepScripts && [];
	
		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[ 1 ] ) ];
		}
	
		parsed = buildFragment( [ data ], context, scripts );
	
		if ( scripts && scripts.length ) {
			jQuery( scripts ).remove();
		}
	
		return jQuery.merge( [], parsed.childNodes );
	};
	
	
	/**
	 * Load a url into a page
	 */
	jQuery.fn.load = function( url, params, callback ) {
		var selector, type, response,
			self = this,
			off = url.indexOf( " " );
	
		if ( off > -1 ) {
			selector = stripAndCollapse( url.slice( off ) );
			url = url.slice( 0, off );
		}
	
		// If it's a function
		if ( isFunction( params ) ) {
	
			// We assume that it's the callback
			callback = params;
			params = undefined;
	
		// Otherwise, build a param string
		} else if ( params && typeof params === "object" ) {
			type = "POST";
		}
	
		// If we have elements to modify, make the request
		if ( self.length > 0 ) {
			jQuery.ajax( {
				url: url,
	
				// If "type" variable is undefined, then "GET" method will be used.
				// Make value of this field explicit since
				// user can override it through ajaxSetup method
				type: type || "GET",
				dataType: "html",
				data: params
			} ).done( function( responseText ) {
	
				// Save response for use in complete callback
				response = arguments;
	
				self.html( selector ?
	
					// If a selector was specified, locate the right elements in a dummy div
					// Exclude scripts to avoid IE 'Permission Denied' errors
					jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :
	
					// Otherwise use the full result
					responseText );
	
			// If the request succeeds, this function gets "data", "status", "jqXHR"
			// but they are ignored because response was set above.
			// If it fails, this function gets "jqXHR", "status", "error"
			} ).always( callback && function( jqXHR, status ) {
				self.each( function() {
					callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
				} );
			} );
		}
	
		return this;
	};
	
	
	
	
	// Attach a bunch of functions for handling common AJAX events
	jQuery.each( [
		"ajaxStart",
		"ajaxStop",
		"ajaxComplete",
		"ajaxError",
		"ajaxSuccess",
		"ajaxSend"
	], function( i, type ) {
		jQuery.fn[ type ] = function( fn ) {
			return this.on( type, fn );
		};
	} );
	
	
	
	
	jQuery.expr.pseudos.animated = function( elem ) {
		return jQuery.grep( jQuery.timers, function( fn ) {
			return elem === fn.elem;
		} ).length;
	};
	
	
	
	
	jQuery.offset = {
		setOffset: function( elem, options, i ) {
			var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
				position = jQuery.css( elem, "position" ),
				curElem = jQuery( elem ),
				props = {};
	
			// Set position first, in-case top/left are set even on static elem
			if ( position === "static" ) {
				elem.style.position = "relative";
			}
	
			curOffset = curElem.offset();
			curCSSTop = jQuery.css( elem, "top" );
			curCSSLeft = jQuery.css( elem, "left" );
			calculatePosition = ( position === "absolute" || position === "fixed" ) &&
				( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;
	
			// Need to be able to calculate position if either
			// top or left is auto and position is either absolute or fixed
			if ( calculatePosition ) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;
	
			} else {
				curTop = parseFloat( curCSSTop ) || 0;
				curLeft = parseFloat( curCSSLeft ) || 0;
			}
	
			if ( isFunction( options ) ) {
	
				// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
				options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
			}
	
			if ( options.top != null ) {
				props.top = ( options.top - curOffset.top ) + curTop;
			}
			if ( options.left != null ) {
				props.left = ( options.left - curOffset.left ) + curLeft;
			}
	
			if ( "using" in options ) {
				options.using.call( elem, props );
	
			} else {
				curElem.css( props );
			}
		}
	};
	
	jQuery.fn.extend( {
	
		// offset() relates an element's border box to the document origin
		offset: function( options ) {
	
			// Preserve chaining for setter
			if ( arguments.length ) {
				return options === undefined ?
					this :
					this.each( function( i ) {
						jQuery.offset.setOffset( this, options, i );
					} );
			}
	
			var rect, win,
				elem = this[ 0 ];
	
			if ( !elem ) {
				return;
			}
	
			// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
			// Support: IE <=11 only
			// Running getBoundingClientRect on a
			// disconnected node in IE throws an error
			if ( !elem.getClientRects().length ) {
				return { top: 0, left: 0 };
			}
	
			// Get document-relative position by adding viewport scroll to viewport-relative gBCR
			rect = elem.getBoundingClientRect();
			win = elem.ownerDocument.defaultView;
			return {
				top: rect.top + win.pageYOffset,
				left: rect.left + win.pageXOffset
			};
		},
	
		// position() relates an element's margin box to its offset parent's padding box
		// This corresponds to the behavior of CSS absolute positioning
		position: function() {
			if ( !this[ 0 ] ) {
				return;
			}
	
			var offsetParent, offset, doc,
				elem = this[ 0 ],
				parentOffset = { top: 0, left: 0 };
	
			// position:fixed elements are offset from the viewport, which itself always has zero offset
			if ( jQuery.css( elem, "position" ) === "fixed" ) {
	
				// Assume position:fixed implies availability of getBoundingClientRect
				offset = elem.getBoundingClientRect();
	
			} else {
				offset = this.offset();
	
				// Account for the *real* offset parent, which can be the document or its root element
				// when a statically positioned element is identified
				doc = elem.ownerDocument;
				offsetParent = elem.offsetParent || doc.documentElement;
				while ( offsetParent &&
					( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
					jQuery.css( offsetParent, "position" ) === "static" ) {
	
					offsetParent = offsetParent.parentNode;
				}
				if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {
	
					// Incorporate borders into its offset, since they are outside its content origin
					parentOffset = jQuery( offsetParent ).offset();
					parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
					parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
				}
			}
	
			// Subtract parent offsets and element margins
			return {
				top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
				left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
			};
		},
	
		// This method will return documentElement in the following cases:
		// 1) For the element inside the iframe without offsetParent, this method will return
		//    documentElement of the parent window
		// 2) For the hidden or detached element
		// 3) For body or html element, i.e. in case of the html node - it will return itself
		//
		// but those exceptions were never presented as a real life use-cases
		// and might be considered as more preferable results.
		//
		// This logic, however, is not guaranteed and can change at any point in the future
		offsetParent: function() {
			return this.map( function() {
				var offsetParent = this.offsetParent;
	
				while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
					offsetParent = offsetParent.offsetParent;
				}
	
				return offsetParent || documentElement;
			} );
		}
	} );
	
	// Create scrollLeft and scrollTop methods
	jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
		var top = "pageYOffset" === prop;
	
		jQuery.fn[ method ] = function( val ) {
			return access( this, function( elem, method, val ) {
	
				// Coalesce documents and windows
				var win;
				if ( isWindow( elem ) ) {
					win = elem;
				} else if ( elem.nodeType === 9 ) {
					win = elem.defaultView;
				}
	
				if ( val === undefined ) {
					return win ? win[ prop ] : elem[ method ];
				}
	
				if ( win ) {
					win.scrollTo(
						!top ? val : win.pageXOffset,
						top ? val : win.pageYOffset
					);
	
				} else {
					elem[ method ] = val;
				}
			}, method, val, arguments.length );
		};
	} );
	
	// Support: Safari <=7 - 9.1, Chrome <=37 - 49
	// Add the top/left cssHooks using jQuery.fn.position
	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
	// getComputedStyle returns percent when specified for top/left/bottom/right;
	// rather than make the css module depend on the offset module, just check for it here
	jQuery.each( [ "top", "left" ], function( i, prop ) {
		jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
			function( elem, computed ) {
				if ( computed ) {
					computed = curCSS( elem, prop );
	
					// If curCSS returns percentage, fallback to offset
					return rnumnonpx.test( computed ) ?
						jQuery( elem ).position()[ prop ] + "px" :
						computed;
				}
			}
		);
	} );
	
	
	// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
		jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
			function( defaultExtra, funcName ) {
	
			// Margin is only for outerHeight, outerWidth
			jQuery.fn[ funcName ] = function( margin, value ) {
				var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
					extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );
	
				return access( this, function( elem, type, value ) {
					var doc;
	
					if ( isWindow( elem ) ) {
	
						// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
						return funcName.indexOf( "outer" ) === 0 ?
							elem[ "inner" + name ] :
							elem.document.documentElement[ "client" + name ];
					}
	
					// Get document width or height
					if ( elem.nodeType === 9 ) {
						doc = elem.documentElement;
	
						// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
						// whichever is greatest
						return Math.max(
							elem.body[ "scroll" + name ], doc[ "scroll" + name ],
							elem.body[ "offset" + name ], doc[ "offset" + name ],
							doc[ "client" + name ]
						);
					}
	
					return value === undefined ?
	
						// Get width or height on the element, requesting but not forcing parseFloat
						jQuery.css( elem, type, extra ) :
	
						// Set width or height on the element
						jQuery.style( elem, type, value, extra );
				}, type, chainable ? margin : undefined, chainable );
			};
		} );
	} );
	
	
	jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
		"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
		"change select submit keydown keypress keyup contextmenu" ).split( " " ),
		function( i, name ) {
	
		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	} );
	
	jQuery.fn.extend( {
		hover: function( fnOver, fnOut ) {
			return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
		}
	} );
	
	
	
	
	jQuery.fn.extend( {
	
		bind: function( types, data, fn ) {
			return this.on( types, null, data, fn );
		},
		unbind: function( types, fn ) {
			return this.off( types, null, fn );
		},
	
		delegate: function( selector, types, data, fn ) {
			return this.on( types, selector, data, fn );
		},
		undelegate: function( selector, types, fn ) {
	
			// ( namespace ) or ( selector, types [, fn] )
			return arguments.length === 1 ?
				this.off( selector, "**" ) :
				this.off( types, selector || "**", fn );
		}
	} );
	
	// Bind a function to a context, optionally partially applying any
	// arguments.
	// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
	// However, it is not slated for removal any time soon
	jQuery.proxy = function( fn, context ) {
		var tmp, args, proxy;
	
		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}
	
		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !isFunction( fn ) ) {
			return undefined;
		}
	
		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};
	
		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;
	
		return proxy;
	};
	
	jQuery.holdReady = function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	};
	jQuery.isArray = Array.isArray;
	jQuery.parseJSON = JSON.parse;
	jQuery.nodeName = nodeName;
	jQuery.isFunction = isFunction;
	jQuery.isWindow = isWindow;
	jQuery.camelCase = camelCase;
	jQuery.type = toType;
	
	jQuery.now = Date.now;
	
	jQuery.isNumeric = function( obj ) {
	
		// As of jQuery 3.0, isNumeric is limited to
		// strings and numbers (primitives or objects)
		// that can be coerced to finite numbers (gh-2662)
		var type = jQuery.type( obj );
		return ( type === "number" || type === "string" ) &&
	
			// parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			!isNaN( obj - parseFloat( obj ) );
	};
	
	
	
	
	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.
	
	// Note that for maximum portability, libraries that are not jQuery should
	// declare themselves as anonymous modules, and avoid setting a global if an
	// AMD loader is present. jQuery is a special case. For more information, see
	// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon
	
	if ( true ) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return jQuery;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
	
	
	
	
	var
	
		// Map over jQuery in case of overwrite
		_jQuery = window.jQuery,
	
		// Map over the $ in case of overwrite
		_$ = window.$;
	
	jQuery.noConflict = function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}
	
		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}
	
		return jQuery;
	};
	
	// Expose jQuery and $ identifiers, even in AMD
	// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
	// and CommonJS for browser emulators (#13566)
	if ( !noGlobal ) {
		window.jQuery = window.$ = jQuery;
	}
	
	
	
	
	return jQuery;
	} );


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createHyperComponent = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.stopBubbles = stopBubbles;
	exports.listenToRoot = listenToRoot;
	exports.stopListenToRoot = stopListenToRoot;
	exports.componentMetaData = componentMetaData;
	exports.Component2 = Component2;
	
	var _injection = __webpack_require__(2);
	
	var _mediator = __webpack_require__(4);
	
	var _utils = __webpack_require__(5);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	var _dom = __webpack_require__(9);
	
	var _dom2 = _interopRequireDefault(_dom);
	
	var _util = __webpack_require__(10);
	
	var _util2 = _interopRequireDefault(_util);
	
	var _mvc = __webpack_require__(11);
	
	var _mvc2 = _interopRequireDefault(_mvc);
	
	var _microtemplate = __webpack_require__(12);
	
	var _microtemplate2 = _interopRequireDefault(_microtemplate);
	
	var _cookie = __webpack_require__(13);
	
	var _cookie2 = _interopRequireDefault(_cookie);
	
	var _jquery = __webpack_require__(7);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _decorators = __webpack_require__(14);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function stopBubbles(event) {
	  event.preventDefault();
	  event.stopPropagation();
	};
	
	function listenToRoot(rootNode, events, selector, callback) {
	  var bubbles = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
	
	  //var _this = this;
	  if (typeof selector === 'function') {
	    bubbles = callback;
	    callback = selector;
	    return (0, _jquery2.default)(rootNode).on(events, function (e) {
	      if (!bubbles) stopBubble(e);
	
	      for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        params[_key - 1] = arguments[_key];
	      }
	
	      callback.apply(undefined, [this, e].concat(params));
	    });
	  } else {
	    return (0, _jquery2.default)(rootNode).on(events, selector, function (e) {
	      if (!bubbles) stopBubble(e);
	
	      for (var _len2 = arguments.length, params = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	        params[_key2 - 1] = arguments[_key2];
	      }
	
	      callback.apply(undefined, [this, e].concat(params));
	    });
	  }
	};
	
	function stopListenToRoot(rootNode) {
	  (0, _jquery2.default)(rootNode).off();
	}
	
	function componentMetaData() {
	  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	  var template = void 0,
	      embedTemplate = false,
	      registry = new Map(),
	      autorun = false;
	
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
	  };
	}
	
	function Component2() {
	  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	  return (0, _decorators.makeClassDecorator)(componentMetaData(options));
	}
	
	function createHyperComponent(_Class) {
	
	  var bindings = null;
	  if (_Class[_decorators.PROP_METADATA] && _Class[_decorators.PROP_METADATA].RootListener) {
	    bindings = _Class[_decorators.PROP_METADATA].RootListener;
	  }
	
	  var _metadata = Object.assign(_Class[_decorators.ANNOTATIONS], { bindings: bindings });
	
	  return function (_Class2) {
	    _inherits(HyperComponent, _Class2);
	
	    function HyperComponent() {
	      _classCallCheck(this, HyperComponent);
	
	      return _possibleConstructorReturn(this, (HyperComponent.__proto__ || Object.getPrototypeOf(HyperComponent)).apply(this, arguments));
	    }
	
	    _createClass(HyperComponent, [{
	      key: 'find',
	      value: function find(selector) {
	        var dom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
	        var els = (0, _jquery2.default)(this.domNode).find(selector);
	        return dom ? els.get() : els;
	      }
	    }, {
	      key: 'findOne',
	      value: function findOne(selector) {
	        var dom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
	        var el = this.find(selector);
	        return dom ? el.get(0) : el.eq(0);
	      }
	    }, {
	      key: 'html',
	      value: function html(_html) {
	        this.$instance.html(_html);
	      }
	    }, {
	      key: 'append',
	      value: function append(a) {
	        this.$instance.append(a);
	      }
	    }, {
	      key: 'getElementById',
	      value: function getElementById(id) {
	        return this.instance.querySelector('#' + id);
	      }
	
	      //listenToRoot (delegated)
	      // listenToRoot(events, selector, callback, bubbles = true) {
	      //   var _this = this;
	      //   if (typeof selector === 'function') {
	      //     bubbles = callback;
	      //     callback = selector;
	      //     return $(this.domNode).on(events, function (e, ...params) {
	      //       if (!bubbles) _this.sandbox.stopBubble(e);
	      //       callback(this, e, ...params)
	      //     });
	
	      //   } else {
	      //     return $(this.domNode).on(events, selector, function (e, ...params) {
	      //       if (!bubbles) _this.sandbox.stopBubble(e);
	      //       callback(this, e, ...params)
	      //     });
	      //   }
	      // }
	
	      // this might be rare (maybe)
	
	    }, {
	      key: 'listenToElement',
	      value: function listenToElement(events, selector, callback) {
	        var bubbles = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
	
	        // selector as array [element, ]
	        var _this = this;
	        var $els = (0, _jquery2.default)(selector).on(events, function (e) {
	          if (!bubbles) stopBubble(e);
	          callback(this, e);
	        });
	        this.boundElements.push($els); //WeakMap/Map ?
	        return $els;
	      }
	    }, {
	      key: '_stopListenToElements',
	      value: function _stopListenToElements() {
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;
	
	        try {
	          for (var _iterator = this.boundElements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var $el = _step.value;
	
	            $el.off();
	          }
	        } catch (err) {
	          _didIteratorError = true;
	          _iteratorError = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	              _iterator.return();
	            }
	          } finally {
	            if (_didIteratorError) {
	              throw _iteratorError;
	            }
	          }
	        }
	      }
	    }, {
	      key: 'listenToParent',
	      value: function listenToParent(channel, cb) {
	        return this.sandbox.on(channel + '/' + this.instanceId, cb);
	      }
	    }, {
	      key: 'listenToChildren',
	      value: function listenToChildren(channel, cb) {
	        return this.core._mediator.on(channel, cb);
	      }
	    }, {
	      key: 'pipeUp',
	      value: function pipeUp(channel, cb) {
	        var _this3 = this;
	
	        this.listenToChildren(channel, function (data) {
	          _this3.emitToParent(channel, data.data || data, cb);
	        });
	      }
	    }, {
	      key: 'pipeDown',
	      value: function pipeDown(channel, cb) {
	        var _this4 = this;
	
	        this.listenToParent(channel, function (data) {
	          _this4.emitToChildren('*', channel, data.data || data, cb);
	        });
	      }
	      //internal events
	
	    }, {
	      key: 'emit',
	      value: function emit(channel, event, cb) {
	        this.eventHub.emit(channel, event, cb);
	      }
	    }, {
	      key: 'listen',
	      value: function listen(channel, event, cb) {
	        this.eventHub.on(channel, event, cb);
	      }
	    }, {
	      key: 'off',
	      value: function off(channel, cb) {
	        this.eventHub.off(channel, cb);
	      }
	    }, {
	      key: 'emitToChildren',
	      value: function emitToChildren(id, channel, data, cb) {
	        if (typeof cb !== 'function') {
	          cb = function cb(err) {
	            if (err != null) {
	              //throw new Error(err)
	              console.error(err);
	            }
	          };
	        }
	
	        var ids = id instanceof Array ? id : [id];
	        var event = {
	          target: 'child',
	          channel: channel,
	          data: data
	        };
	        if (id === '*' || id == null) {
	          var _iteratorNormalCompletion2 = true;
	          var _didIteratorError2 = false;
	          var _iteratorError2 = undefined;
	
	          try {
	            for (var _iterator2 = Object.keys(this._running)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	              var key = _step2.value;
	
	              this.core._mediator.emit(channel + '/' + key, event, cb);
	            }
	          } catch (err) {
	            _didIteratorError2 = true;
	            _iteratorError2 = err;
	          } finally {
	            try {
	              if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                _iterator2.return();
	              }
	            } finally {
	              if (_didIteratorError2) {
	                throw _iteratorError2;
	              }
	            }
	          }
	        } else {
	          var _iteratorNormalCompletion3 = true;
	          var _didIteratorError3 = false;
	          var _iteratorError3 = undefined;
	
	          try {
	            for (var _iterator3 = ids[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	              var _id = _step3.value;
	
	              event.id = this.instanceId;
	              this.core._mediator.emit(channel + '/' + _id, event, cb);
	            }
	          } catch (err) {
	            _didIteratorError3 = true;
	            _iteratorError3 = err;
	          } finally {
	            try {
	              if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                _iterator3.return();
	              }
	            } finally {
	              if (_didIteratorError3) {
	                throw _iteratorError3;
	              }
	            }
	          }
	        }
	      }
	    }, {
	      key: 'emitToParent',
	      value: function emitToParent(channel, data, cb) {
	        if (typeof cb !== 'function') {
	          cb = function cb(err) {
	            if (err != null) {
	              //throw new Error(err)
	              console.error(err);
	            }
	          };
	        }
	
	        var id = this.instanceId;
	        var event = {
	          target: 'parent',
	          channel: channel,
	          data: data,
	          id: id
	        };
	        this.sandbox.emit(channel, event, cb);
	      }
	
	      // stop listening to Root
	
	    }, {
	      key: '_stopListenToRoot',
	      value: function _stopListenToRoot() {
	        (0, _jquery2.default)(this.domNode).off();
	      }
	    }, {
	      key: 'createComponentEvent',
	      value: function createComponentEvent(onEvent) {
	        if (this[onEvent]) {
	          //console.error(onEvent, ': event or variable already exists')
	        } else {
	          this[onEvent] = function () {};
	        }
	      }
	    }, {
	      key: '_setupBasicComponentChannels',
	      value: function _setupBasicComponentChannels() {
	        var _this5 = this;
	
	        if (this.sandbox) {
	          this.listenToParent('hide', function () {
	            _this5.hide();
	          });
	          this.listenToParent('show', function () {
	            _this5.show();
	          });
	          this.listenToParent('data', function (data) {
	            //this.model.set(data)s
	          });
	          this.pipeUp('broadcast');
	          this.pipeDown('broadcast');
	          this.createComponentEvent('onBroadcast');
	          this.listenToParent('broadcast', function (event) {
	            return _this5.onBroadcast(event.data, 'down');
	          });
	          this.listenToChildren('broadcast', function (event) {
	            return _this5.onBroadcast(event.data, 'up');
	          });
	        }
	      }
	    }, {
	      key: '_bind',
	      value: function _bind() {
	        var _this6 = this;
	
	        console.log('test', HyperComponent.test);
	        //const bindings = HyperComponent.__prop_metadata__.RootListener;
	
	        if (Array.isArray(_metadata.bindings)) {
	          var _iteratorNormalCompletion4 = true;
	          var _didIteratorError4 = false;
	          var _iteratorError4 = undefined;
	
	          try {
	            for (var _iterator4 = _metadata.bindings[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	              var binding = _step4.value;
	
	              //listenToRoot(this.domNode, ...binding);
	              listenToRoot(this.domNode, binding[1][0], binding[1][1], binding[2].bind(this));
	            }
	          } catch (err) {
	            _didIteratorError4 = true;
	            _iteratorError4 = err;
	          } finally {
	            try {
	              if (!_iteratorNormalCompletion4 && _iterator4.return) {
	                _iterator4.return();
	              }
	            } finally {
	              if (_didIteratorError4) {
	                throw _iteratorError4;
	              }
	            }
	          }
	        }
	
	        if (typeof this.onBind === 'function') {
	          this.onBind(function () {
	            for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	              args[_key3] = arguments[_key3];
	            }
	
	            return listenToRoot.apply(undefined, [_this6.domNode].concat(args));
	          }, // allow for arrays
	          function () {
	            return _this6.listenToElement.apply(_this6, arguments);
	          });
	        }
	      }
	    }, {
	      key: '_setRootAttributes',
	      value: function _setRootAttributes() {
	        this.id = 'component-' + this.core.uniqueId();
	        this.domNode.setAttribute('data-component-id', this.id);
	        this.domNode.setAttribute('data-instance-id', this.instanceId);
	      }
	    }, {
	      key: '_removeRootAttributes',
	      value: function _removeRootAttributes() {
	        this.domNode.removeAttribute('data-component-id');
	        this.domNode.removeAttribute('data-instance-id');
	      }
	    }, {
	      key: '_unbind',
	      value: function _unbind() {
	        this._stopListenToRoot();
	        this._stopListenToElements();
	        this.eventHub.off();
	        if (typeof this.onUnbind === 'function') {
	          this.onUnbind();
	        }
	      }
	    }, {
	      key: '_subscribe',
	      value: function _subscribe() {
	        var _this7 = this;
	
	        this._setupBasicComponentChannels();
	        if (typeof this.onSubscribe === 'function') {
	          this.onSubscribe(function (channel, cb) {
	            return _this7.listenToParent(channel, cb);
	          }, function (channel, cb) {
	            return _this7.listenToChildren(channel, cb);
	          });
	        }
	      }
	    }, {
	      key: '_unsubscribe',
	      value: function _unsubscribe() {
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
	    }, {
	      key: '_detach',
	      value: function _detach() {
	        this.core._mediator.detach();
	        if (this.sandbox) {
	          this.sandbox.detach();
	        }
	      }
	    }, {
	      key: '_attach',
	      value: function _attach() {
	        this.core._mediator.attach();
	        if (this.sandbox) {
	          this.sandbox.attach();
	        }
	      }
	    }, {
	      key: '_render',
	      value: function _render() {
	        //tasks??
	        if (this.hasTemplate) {
	          if (typeof this.onPreRender === 'function') {
	            this.onPreRender();
	          }
	          if (typeof this.onRender === 'function') {
	            this.onRender();
	          } else {
	            //assume ejs default
	            if (!this.embedTemplate) {
	              this.domNode.innerHTML = this.sandbox.render(template, this.props.toJSON() || {});
	            }
	          }
	          if (typeof this.onPostRender === 'function') {
	            this.onPostRender();
	          }
	        }
	      }
	    }, {
	      key: 'render',
	      value: function render() {
	        //this._detach();
	        this._unbind();
	        this._render();
	        this._bind();
	        //this._attach();
	      }
	    }, {
	      key: 'getInstance',
	      value: function getInstance(id) {
	        return this._instances[id];
	      }
	    }, {
	      key: 'getModuleClass',
	      value: function getModuleClass(id) {
	        return this._modules[id];
	      }
	    }, {
	      key: '_registerComponents',
	      value: function _registerComponents() {
	        var registry = _metadata.registry || new Map();
	        var _iteratorNormalCompletion5 = true;
	        var _didIteratorError5 = false;
	        var _iteratorError5 = undefined;
	
	        try {
	          for (var _iterator5 = registry.entries()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	            var _step5$value = _slicedToArray(_step5.value, 2),
	                key = _step5$value[0],
	                value = _step5$value[1];
	
	            this.core.register(key, value);
	          }
	        } catch (err) {
	          _didIteratorError5 = true;
	          _iteratorError5 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion5 && _iterator5.return) {
	              _iterator5.return();
	            }
	          } finally {
	            if (_didIteratorError5) {
	              throw _iteratorError5;
	            }
	          }
	        }
	      }
	    }, {
	      key: 'startPage',
	      value: function startPage(page, opt) {
	        var _this8 = this;
	
	        var done = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
	
	        if (this.page != null) {
	          var taskStop = function taskStop(next) {
	            _this8.core.stop(_this8.page, next);
	          };
	
	          var taskStart = function taskStart(next) {
	            _this8.startComponents(page, opt, next);
	            _this8.page = page;
	          };
	          _utils2.default.runSeries([taskStop, taskStart], done, true);
	        } else {
	          this.core.start(page, opt, done);
	          this.page = page;
	        }
	      }
	    }, {
	      key: '_tryEvent',
	      value: function _tryEvent(event, done) {
	        try {
	          this[event](done);
	        } catch (err) {
	          done(err);
	        }
	      }
	    }, {
	      key: '_onEvent',
	      value: function _onEvent(event, done) {
	        if (typeof this[event] === 'function') {
	          if (_utils2.default.getArgumentNames(this[event]).length !== 0) {
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
	    }, {
	      key: 'broadcast',
	      value: function broadcast(direction, action, value) {
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
	    }, {
	      key: 'setProps',
	      value: function setProps(props) {
	        this.props = new this.core.Model(props);
	      }
	    }, {
	      key: 'activateProps',
	      value: function activateProps() {
	        var _arguments = arguments,
	            _this9 = this;
	
	        this.props.change(function () {
	          console.log(_arguments);
	          if (typeof _this9.onPropsChange === 'function') {
	            _this9.onPropsChange(props);
	          }
	        });
	        this.listenToParent("props", function (props) {
	          _this9.setProps(props);
	        });
	      }
	    }, {
	      key: 'setModel',
	      value: function setModel(data) {
	        var _this10 = this;
	
	        this.props = new this.core.Model(data);
	        this.props.change(function () {
	          _this10.render();
	        }, this);
	      }
	    }, {
	      key: 'update',
	      value: function update(id, props) {
	        if ((typeof id === 'undefined' ? 'undefined' : _typeof(id)) === 'object') {
	          props = id;
	          this.emitToChildren('*', "props", props);
	        } else {
	          this.emitToChildren(id, "props", props);
	        }
	      }
	    }, {
	      key: '_preInit',
	      value: function _preInit(sandbox) {
	        //embedInSandbox
	        this.core = new _injection.InjectionCore();
	        this.core.use([_util2.default, _mvc2.default, _microtemplate2.default, _dom2.default, _cookie2.default]);
	
	        //this._mediator.cascadeChannels = true;
	        this.eventHub = new _mediator.Mediator();
	        this.boundElements = this.boundElements || [];
	        //if (jQuery == null) {
	        //throw "jQuery  not found"
	        //}
	        this.$ = _jquery2.default;
	        _jquery2.default.hyperjs = true;
	
	        this._registerComponents(); //init?
	
	        this.sandbox = sandbox;
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
	          this.$instance = (0, _jquery2.default)(this.instance);
	        } else {
	          this.hasRoot = false;
	        }
	        this.instanceId = this.sandbox.instanceId;
	
	        if (this.hasTemplate && this.embedTemplate) {
	          this.domNode.innerHTML = _metadata.template;
	        }
	      }
	    }, {
	      key: 'init',
	      value: function init(options, done) {
	        var _this11 = this;
	
	        this.props = options || {};
	        var errors = [];
	
	        var tasks = [function (next) {
	          _this11._onEvent('onPreInit', next);
	        }, function (next) {
	          _this11.core.boot(function () {
	            _this11._onEvent('onBoot', next);
	          });
	        }, function (next) {
	          _this11.id = 'component-' + _this11.core.uniqueId();
	          _this11._setRootAttributes();
	          next();
	        }, function (next) {
	          _this11.data = _this11.props || {};
	          _this11.setModel(_this11.data);
	          _this11._render();
	          next();
	        }, function (next) {
	          _this11.id = 'component-' + _this11.core.uniqueId();
	          _this11._setRootAttributes();
	          next();
	        }, function (next) {
	          _this11._bind();
	          next();
	        }, function (next) {
	          _this11._subscribe();
	          next();
	        }, function (next) {
	          if (_metadata.autorun) {
	            _this11.startComponents();
	          }
	          next();
	        }];
	
	        _utils2.default.runSeries(tasks, function (err) {
	          if (err != null) {
	            errors = err;
	          }
	          _this11._onEvent('onInit', function (err2) {
	            if (err2) {
	              errors.concat(err2);
	            }
	            if (errors.length > 0) console.error(errors);
	            done(errors.length > 0 ? errors : null);
	          });
	        }, false);
	        console.info("<" + _Class.name + "> created:", this);
	        return this;
	      }
	    }, {
	      key: 'destroy',
	      value: function destroy(done) {
	        var _this12 = this;
	
	        var tasks = [function (next) {
	          _this12._onEvent('onDestroy', next);
	        }, function (next) {
	          _this12.core.stop(next);
	        }, function (next) {
	          _this12._unsubscribe();
	          next();
	        }, function (next) {
	          _this12._unbind();
	          next();
	        }, function (next) {
	          if (_this12.hasTemplate) {
	            _this12.domNode.innerHTML = '';
	          }
	          next();
	        }];
	        _utils2.default.runSeries(tasks, done, true);
	        this._removeRootAttributes();
	        console.log("destroyed:", this);
	      }
	    }, {
	      key: '_checkForComponent',
	      value: function _checkForComponent(node) {
	        return !this.find(node).data('component-id') && this.find(node).find('[data-component-id]').length > 0;
	      }
	    }, {
	      key: 'initComponents',
	      value: function initComponents() {
	        var _iteratorNormalCompletion6 = true;
	        var _didIteratorError6 = false;
	        var _iteratorError6 = undefined;
	
	        try {
	          for (var _iterator6 = Object.keys(this._modules)[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
	            var id = _step6.value;
	
	            var el = this.find('#' + id).get(0) || this.find(id).get(0);
	            var rand = this.core.uniqueId();
	            if (el && !this._checkForComponent(el)) {
	              this.core.start(id, {
	                instanceId: id + '-' + rand,
	                options: {
	                  domNode: el
	                }
	              });
	            }
	          }
	        } catch (err) {
	          _didIteratorError6 = true;
	          _iteratorError6 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion6 && _iterator6.return) {
	              _iterator6.return();
	            }
	          } finally {
	            if (_didIteratorError6) {
	              throw _iteratorError6;
	            }
	          }
	        }
	      }
	    }, {
	      key: 'startChildren',
	      value: function startChildren(children, initEvent) {
	        var _iteratorNormalCompletion7 = true;
	        var _didIteratorError7 = false;
	        var _iteratorError7 = undefined;
	
	        try {
	          for (var _iterator7 = children[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
	            var child = _step7.value;
	
	            this.core.start(child[0], child[1]);
	          }
	        } catch (err) {
	          _didIteratorError7 = true;
	          _iteratorError7 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion7 && _iterator7.return) {
	              _iterator7.return();
	            }
	          } finally {
	            if (_didIteratorError7) {
	              throw _iteratorError7;
	            }
	          }
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
	
	    }, {
	      key: 'startComponents',
	      value: function startComponents() {
	        var _core;
	
	        (_core = this.core).start.apply(_core, arguments);
	      }
	    }, {
	      key: 'stopComponents',
	      value: function stopComponents(id, done) {
	        var _this13 = this;
	
	        var ids = id instanceof Array ? id : [id];
	        var tasks = [];
	        var _iteratorNormalCompletion8 = true;
	        var _didIteratorError8 = false;
	        var _iteratorError8 = undefined;
	
	        try {
	          var _loop = function _loop() {
	            var id = _step8.value;
	
	            tasks.push(function (next) {
	              _this13.core.stop(id, next);
	            });
	          };
	
	          for (var _iterator8 = ids[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
	            _loop();
	          }
	        } catch (err) {
	          _didIteratorError8 = true;
	          _iteratorError8 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion8 && _iterator8.return) {
	              _iterator8.return();
	            }
	          } finally {
	            if (_didIteratorError8) {
	              throw _iteratorError8;
	            }
	          }
	        }
	
	        _utils2.default.runParallel(tasks, done);
	      }
	    }, {
	      key: 'show',
	      value: function show() {
	        this.domNode.style.display = "block";
	        return this;
	      }
	    }, {
	      key: 'hide',
	      value: function hide() {
	        this.domNode.style.display = "none";
	        return this;
	      }
	    }]);
	
	    return HyperComponent;
	  }(_Class);
	}
	exports.createHyperComponent = createHyperComponent;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	(function () {
	  var plugin;
	
	  plugin = function plugin(core) {
	    var cleanHTML, html;
	    cleanHTML = function cleanHTML(str) {
	      return str.replace(/\n/g, "").replace(/[\t ]+\</g, "<").replace(/\>[\t ]+\</g, "><").replace(/\>[\t ]+$/g, ">");
	    };
	    core.html = html = {
	      clean: cleanHTML
	    };
	    return {
	      init: function init(sb) {
	        sb.getContainer = function () {
	          switch (_typeof(sb.options.container)) {
	            case "string":
	              return document.getElementById(sb.options.container);
	            case "object":
	              return sb.options.container;
	            default:
	              return document.getElementById(sb.instanceId);
	          }
	        };
	        return {
	          html: html
	        };
	      }
	    };
	  };
	
	  module.exports = plugin;
	}).call(undefined);

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	(function () {
	  var plugin,
	      __slice = [].slice;
	
	  plugin = function plugin(core) {
	    var escapeRegExp, mix, namedParam, optionalParam, splatParam;
	    mix = function mix(giv, rec, override) {
	      var k, v, _results, _results1;
	      if (override === true) {
	        _results = [];
	        for (k in giv) {
	          v = giv[k];
	          _results.push(rec[k] = v);
	        }
	        return _results;
	      } else {
	        _results1 = [];
	        for (k in giv) {
	          v = giv[k];
	          if (!rec.hasOwnProperty(k)) {
	            _results1.push(rec[k] = v);
	          }
	        }
	        return _results1;
	      }
	    };
	    core.uniqueId = function (length) {
	      var id;
	      if (length == null) {
	        length = 8;
	      }
	      id = "";
	      while (id.length < length) {
	        id += Math.random().toString(36).substr(2);
	      }
	      return id.substr(0, length);
	    };
	    core.clone = function (obj) {
	      var copy, flags, key;
	      if (obj == null || (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') {
	        return obj;
	      }
	      if (obj instanceof Date) {
	        return new Date(obj.getTime());
	      }
	      if (obj instanceof RegExp) {
	        flags = '';
	        if (obj.global != null) {
	          flags += 'g';
	        }
	        if (obj.ignoreCase != null) {
	          flags += 'i';
	        }
	        if (obj.multiline != null) {
	          flags += 'm';
	        }
	        if (obj.sticky != null) {
	          flags += 'y';
	        }
	        return new RegExp(obj.source, flags);
	      }
	      copy = new obj.constructor();
	      for (key in obj) {
	        copy[key] = core.clone(obj[key]);
	      }
	      return copy;
	    };
	    core.countObjectKeys = function (o) {
	      var k, v;
	      if ((typeof o === 'undefined' ? 'undefined' : _typeof(o)) === "object") {
	        return function () {
	          var _results;
	          _results = [];
	          for (k in o) {
	            v = o[k];
	            _results.push(k);
	          }
	          return _results;
	        }().length;
	      }
	    };
	    core.mixin = function (receivingClass, givingClass, override) {
	      if (override == null) {
	        override = false;
	      }
	      switch ("" + (typeof givingClass === 'undefined' ? 'undefined' : _typeof(givingClass)) + "-" + (typeof receivingClass === 'undefined' ? 'undefined' : _typeof(receivingClass))) {
	        case "function-function":
	          return mix(givingClass.prototype, receivingClass.prototype, override);
	        case "function-object":
	          return mix(givingClass.prototype, receivingClass, override);
	        case "object-object":
	          return mix(givingClass, receivingClass, override);
	        case "object-function":
	          return mix(givingClass, receivingClass.prototype, override);
	      }
	    };
	    core.deserializeQs = function (str) {
	      var pair, pairs, result, _i, _len;
	      pairs = str.split('&');
	      result = {};
	      for (_i = 0, _len = pairs.length; _i < _len; _i++) {
	        pair = pairs[_i];
	        pair = pair.split('=');
	        result[pair[0]] = decodeURIComponent(pair[1] || '');
	      }
	      return result;
	    };
	    core.serializeQs = function (obj, prefix) {
	      var k, p, str, v;
	      str = [];
	      for (p in obj) {
	        k = prefix ? prefix + "[" + p + "]" : p;
	        v = obj[p];
	        str.push((typeof v === 'undefined' ? 'undefined' : _typeof(v)) === "object" ? serialize(v, k) : encodeURIComponent(k) + "=" + encodeURIComponent(v));
	      }
	      return str.join("&");
	    };
	    core.mixins = function () {
	      var base, mixin, mixins, name, val, _i;
	      base = arguments[0], mixins = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
	      for (_i = mixins.length - 1; _i >= 0; _i += -1) {
	        mixin = mixins[_i];
	        for (name in mixin) {
	          val = mixin[name];
	          base[name] = val;
	        }
	      }
	      return base;
	    };
	    optionalParam = /\((.*?)\)/g;
	    namedParam = /(\(\?)?:\w+/g;
	    splatParam = /\*\w+/g;
	    escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;
	    core.routeToRegExp = function (route) {
	      route = route.replace(escapeRegExp, '\\$&').replace(optionalParam, '(?:$1)?').replace(namedParam, function (match, optional) {
	        if (optional) {
	          return match;
	        } else {
	          return '([^\/]+)';
	        }
	      }).replace(splatParam, '(.*?)');
	      return new RegExp("^" + route + "$");
	    };
	    core.parseURL = function (url) {
	      var a;
	      a = document.createElement("a");
	      a.href = url;
	      return a;
	    };
	    core["extends"] = function (child, parent) {
	      var __hasProp_;
	      __hasProp_ = {}.hasOwnProperty;
	      return function (child, parent) {
	        var ctor, key;
	        ctor = function ctor() {
	          this.constructor = child;
	        };
	        for (key in parent) {
	          if (__hasProp_.call(parent, key)) {
	            child[key] = parent[key];
	          }
	        }
	        ctor.prototype = parent.prototype;
	        child.prototype = new ctor();
	        child.__super__ = parent.prototype;
	        return child;
	      };
	    };
	    core.fromBase64 = function (str) {
	      var r;
	      return r = window.atob(str);
	    };
	    core.toBase64 = function (str) {
	      return window.btob(str);
	    };
	    core.toJSON = function (str) {
	      str = (typeof str === 'undefined' ? 'undefined' : _typeof(str)) === "object" ? JSON.stringify(str) : str;
	      return JSON.parse(str);
	    };
	    if (core.util) {
	      core.mixin(core, core.util);
	    }
	    return {
	      init: function init(sb) {
	        if (core.util) {
	          core.mixin(sb, core.util);
	        }
	        sb.uniqueId = core.uniqueId;
	        sb.mixin = core.mixin;
	        sb.parseUrl = core.parseURL;
	        return sb.deserializeQs = core.deserializeQs;
	      }
	    };
	  };
	
	  module.exports = plugin;
	}).call(undefined);

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	(function () {
	  var plugin,
	      __hasProp = {}.hasOwnProperty,
	      __extends = function __extends(child, parent) {
	    for (var key in parent) {
	      if (__hasProp.call(parent, key)) child[key] = parent[key];
	    }function ctor() {
	      this.constructor = child;
	    }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
	  };
	
	  plugin = function plugin(core) {
	    var Controller, Model, View;
	    Model = function (_super) {
	      __extends(Model, _super);
	
	      function Model(obj) {
	        var k, v;
	        Model.__super__.constructor.call(this);
	        this._keys = Object.keys(obj);
	        for (k in obj) {
	          v = obj[k];
	          if (this[k] == null) {
	            this[k] = v;
	          }
	        }
	      }
	
	      Model.prototype.set = function (key, val, silent) {
	        var k, v;
	        if (silent == null) {
	          silent = false;
	        }
	        switch (typeof key === "undefined" ? "undefined" : _typeof(key)) {
	          case "object":
	            for (k in key) {
	              v = key[k];
	              this.set(k, v, true);
	            }
	            if (!silent) {
	              this.emit(Model.CHANGED, function () {
	                var _results;
	                _results = [];
	                for (k in key) {
	                  v = key[k];
	                  _results.push(k);
	                }
	                return _results;
	              }());
	            }
	            break;
	          case "string":
	            if (!(key === "set" || key === "get") && this[key] !== val) {
	              this[key] = val;
	              if (!silent) {
	                this.emit(Model.CHANGED, [key]);
	              }
	            }
	            break;
	          default:
	            if (typeof console !== "undefined" && console !== null) {
	              if (typeof console.error === "function") {
	                console.error("key is not a string");
	              }
	            }
	        }
	        return this;
	      };
	
	      Model.prototype.change = function (cb, context) {
	        if (typeof cb === "function") {
	          return this.on(Model.CHANGED, cb, context);
	        } else if (arguments.length === 0) {
	          return this.emit(Model.CHANGED);
	        }
	      };
	
	      Model.prototype.notify = function () {
	        return this.change();
	      };
	
	      Model.prototype.get = function (key) {
	        if (key != null) {
	          return this[key];
	        } else {
	          return this.toJSON();
	        }
	      };
	
	      Model.prototype.toJSON2 = function () {
	        var json, k, v;
	        json = {};
	        for (k in this) {
	          if (!__hasProp.call(this, k)) continue;
	          v = this[k];
	          json[k] = v;
	        }
	        return json;
	      };
	
	      Model.prototype.toJSON = function () {
	        var json, k, _i, _len, _ref;
	        json = {};
	        _ref = this._keys;
	        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	          k = _ref[_i];
	          json[k] = this[k];
	        }
	        return json;
	      };
	
	      Model.CHANGED = "changed";
	
	      return Model;
	    }(core.Mediator);
	    View = function () {
	      function View(model) {
	        if (model) {
	          this.setModel(model);
	        }
	      }
	
	      View.prototype.setModel = function (model) {
	        this.model = model;
	        return this.model.change(function () {
	          return this.render();
	        }, this);
	      };
	
	      View.prototype.render = function () {};
	
	      return View;
	    }();
	    Controller = function () {
	      function Controller(model, view) {
	        this.model = model;
	        this.view = view;
	      }
	
	      return Controller;
	    }();
	    core.Model = Model;
	    core.View = View;
	    return core.Controller = Controller;
	  };
	
	  module.exports = plugin;
	}).call(undefined);

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	"use strict";
	
	(function () {
	  var plugin;
	
	  plugin = function plugin(core) {
	    var cache, _tmpl;
	    cache = {};
	    _tmpl = function tmpl(str, data) {
	      var fn;
	      fn = !/\W/.test(str) ? cache[str] = cache[str] || _tmpl(document.getElementById(str).innerHTML) : new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};" + "with(obj){p.push('" + str.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');");
	      if (data) {
	        return fn(data);
	      } else {
	        return fn;
	      }
	    };
	    core.tmpl = _tmpl;
	    return {
	      init: function init(sb) {
	        sb.tmpl = _tmpl;
	        return sb.render = _tmpl;
	      }
	    };
	  };
	
	  module.exports = plugin;
	}).call(undefined);

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	"use strict";
	
	(function () {
	  var plugin;
	
	  plugin = function plugin(core) {
	    var cookies;
	    cookies = {
	      getItem: function getItem(sKey) {
	        return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
	      },
	      setItem: function setItem(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
	        var sExpires;
	        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
	          return false;
	        }
	        sExpires = "";
	        if (vEnd) {
	          switch (vEnd.constructor) {
	            case Number:
	              sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
	              break;
	            case String:
	              sExpires = "; expires=" + vEnd;
	              break;
	            case Date:
	              sExpires = "; expires=" + vEnd.toUTCString();
	          }
	        }
	        document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
	        return true;
	      },
	      removeItem: function removeItem(sKey, sPath, sDomain) {
	        if (!sKey || !this.hasItem(sKey)) {
	          return false;
	        }
	        document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
	        return true;
	      },
	      hasItem: function hasItem(sKey) {
	        return new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(document.cookie);
	      },
	      keys: function keys() {
	        var aKeys, nIdx;
	        aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
	        nIdx = 0;
	        while (nIdx < aKeys.length) {
	          aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
	          nIdx++;
	        }
	        return aKeys;
	      }
	    };
	    core.cookies = cookies;
	    return {
	      init: function init(sb) {
	        sb.getCookie = cookies.getItem;
	        return sb.hasCookie = cookies.hasItem;
	      }
	    };
	  };
	
	  module.exports = plugin;
	}).call(undefined);

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ANNOTATIONS = exports.PROP_METADATA = exports.METADATA = undefined;
	exports.makeClassDecorator = makeClassDecorator;
	exports.makeParamDecorator = makeParamDecorator;
	exports.makePropDecorator = makePropDecorator;
	
	var _mixins = __webpack_require__(15);
	
	var METADATA = exports.METADATA = '_metadata';
	var PROP_METADATA = exports.PROP_METADATA = '__prop_metadata__';
	var ANNOTATIONS = exports.ANNOTATIONS = '__annotations__';
	
	function makeClassDecorator() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var mixins = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	
	    return function (cls) {
	        options["_name"] = cls.name;
	        var annotations = cls.hasOwnProperty(ANNOTATIONS) ? cls[ANNOTATIONS] : Object.defineProperty(cls, ANNOTATIONS, { value: {}, writable: true })[ANNOTATIONS];
	
	        cls[ANNOTATIONS] = Object.assign(cls[ANNOTATIONS], options);
	        cls.isComponent = true;
	
	        //console.log(cls[ANNOTATIONS])
	
	        return (0, _mixins.classMixin)(mixins)(cls);
	    };
	}
	
	function makeParamDecorator() {
	    throw new Error('not implemeneted yet');
	}
	
	function makePropDecorator(metaName, props) {
	    function PropDecorator(target, name, descriptor) {
	        var constructor = target.constructor;
	        var fn = descriptor.value;
	        var meta = constructor.hasOwnProperty(PROP_METADATA) ? constructor[PROP_METADATA] : Object.defineProperty(constructor, PROP_METADATA, { value: {}, writable: true, configurable: true })[PROP_METADATA];
	
	        meta[metaName] = meta.hasOwnProperty(metaName) && meta[metaName] || [];
	        // meta[name].unshift(decoratorInstance);
	        meta[metaName].push([name, props, fn]);
	
	        return descriptor;
	    }
	    return PropDecorator;
	}

/***/ }),
/* 15 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.classMixin = classMixin;
	exports.mixin = mixin;
	function classMixin(behaviour) {
	    var sharedBehaviour = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	    var instanceKeys = Reflect.ownKeys(behaviour);
	    var sharedKeys = Reflect.ownKeys(sharedBehaviour);
	    var typeTag = Symbol('isa');
	
	    function _mixin(clazz) {
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;
	
	        try {
	            for (var _iterator = instanceKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                var property = _step.value;
	
	                Object.defineProperty(clazz.prototype, property, {
	                    value: behaviour[property],
	                    writable: true
	                });
	            }
	        } catch (err) {
	            _didIteratorError = true;
	            _iteratorError = err;
	        } finally {
	            try {
	                if (!_iteratorNormalCompletion && _iterator.return) {
	                    _iterator.return();
	                }
	            } finally {
	                if (_didIteratorError) {
	                    throw _iteratorError;
	                }
	            }
	        }
	
	        Object.defineProperty(clazz.prototype, typeTag, { value: true });
	        return clazz;
	    }
	    var _iteratorNormalCompletion2 = true;
	    var _didIteratorError2 = false;
	    var _iteratorError2 = undefined;
	
	    try {
	        for (var _iterator2 = sharedKeys[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	            var property = _step2.value;
	
	            Object.defineProperty(_mixin, property, {
	                value: sharedBehaviour[property],
	                enumerable: sharedBehaviour.propertyIsEnumerable(property)
	            });
	        }
	    } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                _iterator2.return();
	            }
	        } finally {
	            if (_didIteratorError2) {
	                throw _iteratorError2;
	            }
	        }
	    }
	
	    Object.defineProperty(_mixin, Symbol.hasInstance, {
	        value: function value(i) {
	            return !!i[typeTag];
	        }
	    });
	    return _mixin;
	}
	
	function mixin(behaviour) {
	    var sharedBehaviour = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	    var instanceKeys = Reflect.ownKeys(behaviour);
	    var sharedKeys = Reflect.ownKeys(sharedBehaviour);
	    var typeTag = Symbol('isa');
	
	    function _mixin(target) {
	        var _iteratorNormalCompletion3 = true;
	        var _didIteratorError3 = false;
	        var _iteratorError3 = undefined;
	
	        try {
	            for (var _iterator3 = instanceKeys[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                var property = _step3.value;
	
	                Object.defineProperty(target, property, { value: behaviour[property] });
	            }
	        } catch (err) {
	            _didIteratorError3 = true;
	            _iteratorError3 = err;
	        } finally {
	            try {
	                if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                    _iterator3.return();
	                }
	            } finally {
	                if (_didIteratorError3) {
	                    throw _iteratorError3;
	                }
	            }
	        }
	
	        Object.defineProperty(target, typeTag, { value: true });
	        return target;
	    }
	    var _iteratorNormalCompletion4 = true;
	    var _didIteratorError4 = false;
	    var _iteratorError4 = undefined;
	
	    try {
	        for (var _iterator4 = sharedKeys[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	            var property = _step4.value;
	
	            Object.defineProperty(_mixin, property, {
	                value: sharedBehaviour[property],
	                enumerable: sharedBehaviour.propertyIsEnumerable(property)
	            });
	        }
	    } catch (err) {
	        _didIteratorError4 = true;
	        _iteratorError4 = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion4 && _iterator4.return) {
	                _iterator4.return();
	            }
	        } finally {
	            if (_didIteratorError4) {
	                throw _iteratorError4;
	            }
	        }
	    }
	
	    Object.defineProperty(_mixin, Symbol.hasInstance, {
	        value: function value(i) {
	            return !!i[typeTag];
	        }
	    });
	    return _mixin;
	}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Container = exports.InvocationHandler = exports._emptyParameters = exports.SingletonRegistration = exports.TransientRegistration = exports.FactoryInvoker = exports.NewInstance = exports.Factory = exports.Parent = exports.Optional = exports.All = exports.Lazy = exports.StrategyResolver = exports.resolver = undefined;
	
	var _dec, _class, _dec2, _class2, _dec3, _class3, _dec4, _class4, _dec5, _class5, _dec6, _class6, _dec7, _class7, _classInvokers;
	
	exports.getDecoratorDependencies = getDecoratorDependencies;
	exports.lazy = lazy;
	exports.all = all;
	exports.optional = optional;
	exports.parent = parent;
	exports.factory = factory;
	exports.newInstance = newInstance;
	exports.invoker = invoker;
	exports.invokeAsFactory = invokeAsFactory;
	exports.registration = registration;
	exports.transient = transient;
	exports.singleton = singleton;
	exports.autoinject = autoinject;
	exports.inject = inject;
	
	var _aureliaMetadata = __webpack_require__(17);
	
	var _aureliaPal = __webpack_require__(18);
	
	
	
	var resolver = exports.resolver = _aureliaMetadata.protocol.create('aurelia:resolver', function (target) {
	  if (!(typeof target.get === 'function')) {
	    return 'Resolvers must implement: get(container: Container, key: any): any';
	  }
	
	  return true;
	});
	
	var StrategyResolver = exports.StrategyResolver = (_dec = resolver(), _dec(_class = function () {
	  function StrategyResolver(strategy, state) {
	    
	
	    this.strategy = strategy;
	    this.state = state;
	  }
	
	  StrategyResolver.prototype.get = function get(container, key) {
	    switch (this.strategy) {
	      case 0:
	        return this.state;
	      case 1:
	        var _singleton = container.invoke(this.state);
	        this.state = _singleton;
	        this.strategy = 0;
	        return _singleton;
	      case 2:
	        return container.invoke(this.state);
	      case 3:
	        return this.state(container, key, this);
	      case 4:
	        return this.state[0].get(container, key);
	      case 5:
	        return container.get(this.state);
	      default:
	        throw new Error('Invalid strategy: ' + this.strategy);
	    }
	  };
	
	  return StrategyResolver;
	}()) || _class);
	var Lazy = exports.Lazy = (_dec2 = resolver(), _dec2(_class2 = function () {
	  function Lazy(key) {
	    
	
	    this._key = key;
	  }
	
	  Lazy.prototype.get = function get(container) {
	    var _this = this;
	
	    return function () {
	      return container.get(_this._key);
	    };
	  };
	
	  Lazy.of = function of(key) {
	    return new Lazy(key);
	  };
	
	  return Lazy;
	}()) || _class2);
	var All = exports.All = (_dec3 = resolver(), _dec3(_class3 = function () {
	  function All(key) {
	    
	
	    this._key = key;
	  }
	
	  All.prototype.get = function get(container) {
	    return container.getAll(this._key);
	  };
	
	  All.of = function of(key) {
	    return new All(key);
	  };
	
	  return All;
	}()) || _class3);
	var Optional = exports.Optional = (_dec4 = resolver(), _dec4(_class4 = function () {
	  function Optional(key) {
	    var checkParent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	
	    
	
	    this._key = key;
	    this._checkParent = checkParent;
	  }
	
	  Optional.prototype.get = function get(container) {
	    if (container.hasResolver(this._key, this._checkParent)) {
	      return container.get(this._key);
	    }
	
	    return null;
	  };
	
	  Optional.of = function of(key) {
	    var checkParent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	
	    return new Optional(key, checkParent);
	  };
	
	  return Optional;
	}()) || _class4);
	var Parent = exports.Parent = (_dec5 = resolver(), _dec5(_class5 = function () {
	  function Parent(key) {
	    
	
	    this._key = key;
	  }
	
	  Parent.prototype.get = function get(container) {
	    return container.parent ? container.parent.get(this._key) : null;
	  };
	
	  Parent.of = function of(key) {
	    return new Parent(key);
	  };
	
	  return Parent;
	}()) || _class5);
	var Factory = exports.Factory = (_dec6 = resolver(), _dec6(_class6 = function () {
	  function Factory(key) {
	    
	
	    this._key = key;
	  }
	
	  Factory.prototype.get = function get(container) {
	    var fn = this._key;
	    var resolver = container.getResolver(fn);
	    if (resolver && resolver.strategy === 3) {
	      fn = resolver.state;
	    }
	
	    return function () {
	      for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
	        rest[_key] = arguments[_key];
	      }
	
	      return container.invoke(fn, rest);
	    };
	  };
	
	  Factory.of = function of(key) {
	    return new Factory(key);
	  };
	
	  return Factory;
	}()) || _class6);
	var NewInstance = exports.NewInstance = (_dec7 = resolver(), _dec7(_class7 = function () {
	  function NewInstance(key) {
	    
	
	    this.key = key;
	    this.asKey = key;
	
	    for (var _len2 = arguments.length, dynamicDependencies = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	      dynamicDependencies[_key2 - 1] = arguments[_key2];
	    }
	
	    this.dynamicDependencies = dynamicDependencies;
	  }
	
	  NewInstance.prototype.get = function get(container) {
	    var dynamicDependencies = this.dynamicDependencies.length > 0 ? this.dynamicDependencies.map(function (dependency) {
	      return dependency['protocol:aurelia:resolver'] ? dependency.get(container) : container.get(dependency);
	    }) : undefined;
	
	    var fn = this.key;
	    var resolver = container.getResolver(fn);
	    if (resolver && resolver.strategy === 3) {
	      fn = resolver.state;
	    }
	
	    var instance = container.invoke(fn, dynamicDependencies);
	    container.registerInstance(this.asKey, instance);
	    return instance;
	  };
	
	  NewInstance.prototype.as = function as(key) {
	    this.asKey = key;
	    return this;
	  };
	
	  NewInstance.of = function of(key) {
	    for (var _len3 = arguments.length, dynamicDependencies = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	      dynamicDependencies[_key3 - 1] = arguments[_key3];
	    }
	
	    return new (Function.prototype.bind.apply(NewInstance, [null].concat([key], dynamicDependencies)))();
	  };
	
	  return NewInstance;
	}()) || _class7);
	function getDecoratorDependencies(target) {
	  autoinject(target);
	
	  return target.inject;
	}
	
	function lazy(keyValue) {
	  return function (target, key, index) {
	    var inject = getDecoratorDependencies(target);
	    inject[index] = Lazy.of(keyValue);
	  };
	}
	
	function all(keyValue) {
	  return function (target, key, index) {
	    var inject = getDecoratorDependencies(target);
	    inject[index] = All.of(keyValue);
	  };
	}
	
	function optional() {
	  var checkParentOrTarget = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	
	  var deco = function deco(checkParent) {
	    return function (target, key, index) {
	      var inject = getDecoratorDependencies(target);
	      inject[index] = Optional.of(inject[index], checkParent);
	    };
	  };
	  if (typeof checkParentOrTarget === 'boolean') {
	    return deco(checkParentOrTarget);
	  }
	  return deco(true);
	}
	
	function parent(target, key, index) {
	  var inject = getDecoratorDependencies(target);
	  inject[index] = Parent.of(inject[index]);
	}
	
	function factory(keyValue) {
	  return function (target, key, index) {
	    var inject = getDecoratorDependencies(target);
	    inject[index] = Factory.of(keyValue);
	  };
	}
	
	function newInstance(asKeyOrTarget) {
	  for (var _len4 = arguments.length, dynamicDependencies = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
	    dynamicDependencies[_key4 - 1] = arguments[_key4];
	  }
	
	  var deco = function deco(asKey) {
	    return function (target, key, index) {
	      var inject = getDecoratorDependencies(target);
	      inject[index] = NewInstance.of.apply(NewInstance, [inject[index]].concat(dynamicDependencies));
	      if (!!asKey) {
	        inject[index].as(asKey);
	      }
	    };
	  };
	  if (arguments.length >= 1) {
	    return deco(asKeyOrTarget);
	  }
	  return deco();
	}
	
	function invoker(value) {
	  return function (target) {
	    _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.invoker, value, target);
	  };
	}
	
	function invokeAsFactory(potentialTarget) {
	  var deco = function deco(target) {
	    _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.invoker, FactoryInvoker.instance, target);
	  };
	
	  return potentialTarget ? deco(potentialTarget) : deco;
	}
	
	var FactoryInvoker = exports.FactoryInvoker = function () {
	  function FactoryInvoker() {
	    
	  }
	
	  FactoryInvoker.prototype.invoke = function invoke(container, fn, dependencies) {
	    var i = dependencies.length;
	    var args = new Array(i);
	
	    while (i--) {
	      args[i] = container.get(dependencies[i]);
	    }
	
	    return fn.apply(undefined, args);
	  };
	
	  FactoryInvoker.prototype.invokeWithDynamicDependencies = function invokeWithDynamicDependencies(container, fn, staticDependencies, dynamicDependencies) {
	    var i = staticDependencies.length;
	    var args = new Array(i);
	
	    while (i--) {
	      args[i] = container.get(staticDependencies[i]);
	    }
	
	    if (dynamicDependencies !== undefined) {
	      args = args.concat(dynamicDependencies);
	    }
	
	    return fn.apply(undefined, args);
	  };
	
	  return FactoryInvoker;
	}();
	
	FactoryInvoker.instance = new FactoryInvoker();
	
	function registration(value) {
	  return function (target) {
	    _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.registration, value, target);
	  };
	}
	
	function transient(key) {
	  return registration(new TransientRegistration(key));
	}
	
	function singleton(keyOrRegisterInChild) {
	  var registerInChild = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
	  return registration(new SingletonRegistration(keyOrRegisterInChild, registerInChild));
	}
	
	var TransientRegistration = exports.TransientRegistration = function () {
	  function TransientRegistration(key) {
	    
	
	    this._key = key;
	  }
	
	  TransientRegistration.prototype.registerResolver = function registerResolver(container, key, fn) {
	    var existingResolver = container.getResolver(this._key || key);
	    return existingResolver === undefined ? container.registerTransient(this._key || key, fn) : existingResolver;
	  };
	
	  return TransientRegistration;
	}();
	
	var SingletonRegistration = exports.SingletonRegistration = function () {
	  function SingletonRegistration(keyOrRegisterInChild) {
	    var registerInChild = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
	    
	
	    if (typeof keyOrRegisterInChild === 'boolean') {
	      this._registerInChild = keyOrRegisterInChild;
	    } else {
	      this._key = keyOrRegisterInChild;
	      this._registerInChild = registerInChild;
	    }
	  }
	
	  SingletonRegistration.prototype.registerResolver = function registerResolver(container, key, fn) {
	    var targetContainer = this._registerInChild ? container : container.root;
	    var existingResolver = targetContainer.getResolver(this._key || key);
	    return existingResolver === undefined ? targetContainer.registerSingleton(this._key || key, fn) : existingResolver;
	  };
	
	  return SingletonRegistration;
	}();
	
	function validateKey(key) {
	  if (key === null || key === undefined) {
	    throw new Error('key/value cannot be null or undefined. Are you trying to inject/register something that doesn\'t exist with DI?');
	  }
	}
	var _emptyParameters = exports._emptyParameters = Object.freeze([]);
	
	_aureliaMetadata.metadata.registration = 'aurelia:registration';
	_aureliaMetadata.metadata.invoker = 'aurelia:invoker';
	
	var resolverDecorates = resolver.decorates;
	
	var InvocationHandler = exports.InvocationHandler = function () {
	  function InvocationHandler(fn, invoker, dependencies) {
	    
	
	    this.fn = fn;
	    this.invoker = invoker;
	    this.dependencies = dependencies;
	  }
	
	  InvocationHandler.prototype.invoke = function invoke(container, dynamicDependencies) {
	    return dynamicDependencies !== undefined ? this.invoker.invokeWithDynamicDependencies(container, this.fn, this.dependencies, dynamicDependencies) : this.invoker.invoke(container, this.fn, this.dependencies);
	  };
	
	  return InvocationHandler;
	}();
	
	function invokeWithDynamicDependencies(container, fn, staticDependencies, dynamicDependencies) {
	  var i = staticDependencies.length;
	  var args = new Array(i);
	  var lookup = void 0;
	
	  while (i--) {
	    lookup = staticDependencies[i];
	
	    if (lookup === null || lookup === undefined) {
	      throw new Error('Constructor Parameter with index ' + i + ' cannot be null or undefined. Are you trying to inject/register something that doesn\'t exist with DI?');
	    } else {
	      args[i] = container.get(lookup);
	    }
	  }
	
	  if (dynamicDependencies !== undefined) {
	    args = args.concat(dynamicDependencies);
	  }
	
	  return Reflect.construct(fn, args);
	}
	
	var classInvokers = (_classInvokers = {}, _classInvokers[0] = {
	  invoke: function invoke(container, Type) {
	    return new Type();
	  },
	
	  invokeWithDynamicDependencies: invokeWithDynamicDependencies
	}, _classInvokers[1] = {
	  invoke: function invoke(container, Type, deps) {
	    return new Type(container.get(deps[0]));
	  },
	
	  invokeWithDynamicDependencies: invokeWithDynamicDependencies
	}, _classInvokers[2] = {
	  invoke: function invoke(container, Type, deps) {
	    return new Type(container.get(deps[0]), container.get(deps[1]));
	  },
	
	  invokeWithDynamicDependencies: invokeWithDynamicDependencies
	}, _classInvokers[3] = {
	  invoke: function invoke(container, Type, deps) {
	    return new Type(container.get(deps[0]), container.get(deps[1]), container.get(deps[2]));
	  },
	
	  invokeWithDynamicDependencies: invokeWithDynamicDependencies
	}, _classInvokers[4] = {
	  invoke: function invoke(container, Type, deps) {
	    return new Type(container.get(deps[0]), container.get(deps[1]), container.get(deps[2]), container.get(deps[3]));
	  },
	
	  invokeWithDynamicDependencies: invokeWithDynamicDependencies
	}, _classInvokers[5] = {
	  invoke: function invoke(container, Type, deps) {
	    return new Type(container.get(deps[0]), container.get(deps[1]), container.get(deps[2]), container.get(deps[3]), container.get(deps[4]));
	  },
	
	  invokeWithDynamicDependencies: invokeWithDynamicDependencies
	}, _classInvokers.fallback = {
	  invoke: invokeWithDynamicDependencies,
	  invokeWithDynamicDependencies: invokeWithDynamicDependencies
	}, _classInvokers);
	
	function getDependencies(f) {
	  if (!f.hasOwnProperty('inject')) {
	    return [];
	  }
	
	  if (typeof f.inject === 'function') {
	    return f.inject();
	  }
	
	  return f.inject;
	}
	
	var Container = exports.Container = function () {
	  function Container(configuration) {
	    
	
	    if (configuration === undefined) {
	      configuration = {};
	    }
	
	    this._configuration = configuration;
	    this._onHandlerCreated = configuration.onHandlerCreated;
	    this._handlers = configuration.handlers || (configuration.handlers = new Map());
	    this._resolvers = new Map();
	    this.root = this;
	    this.parent = null;
	  }
	
	  Container.prototype.makeGlobal = function makeGlobal() {
	    Container.instance = this;
	    return this;
	  };
	
	  Container.prototype.setHandlerCreatedCallback = function setHandlerCreatedCallback(onHandlerCreated) {
	    this._onHandlerCreated = onHandlerCreated;
	    this._configuration.onHandlerCreated = onHandlerCreated;
	  };
	
	  Container.prototype.registerInstance = function registerInstance(key, instance) {
	    return this.registerResolver(key, new StrategyResolver(0, instance === undefined ? key : instance));
	  };
	
	  Container.prototype.registerSingleton = function registerSingleton(key, fn) {
	    return this.registerResolver(key, new StrategyResolver(1, fn === undefined ? key : fn));
	  };
	
	  Container.prototype.registerTransient = function registerTransient(key, fn) {
	    return this.registerResolver(key, new StrategyResolver(2, fn === undefined ? key : fn));
	  };
	
	  Container.prototype.registerHandler = function registerHandler(key, handler) {
	    return this.registerResolver(key, new StrategyResolver(3, handler));
	  };
	
	  Container.prototype.registerAlias = function registerAlias(originalKey, aliasKey) {
	    return this.registerResolver(aliasKey, new StrategyResolver(5, originalKey));
	  };
	
	  Container.prototype.registerResolver = function registerResolver(key, resolver) {
	    validateKey(key);
	
	    var allResolvers = this._resolvers;
	    var result = allResolvers.get(key);
	
	    if (result === undefined) {
	      allResolvers.set(key, resolver);
	    } else if (result.strategy === 4) {
	      result.state.push(resolver);
	    } else {
	      allResolvers.set(key, new StrategyResolver(4, [result, resolver]));
	    }
	
	    return resolver;
	  };
	
	  Container.prototype.autoRegister = function autoRegister(key, fn) {
	    fn = fn === undefined ? key : fn;
	
	    if (typeof fn === 'function') {
	      var _registration = _aureliaMetadata.metadata.get(_aureliaMetadata.metadata.registration, fn);
	
	      if (_registration === undefined) {
	        return this.registerResolver(key, new StrategyResolver(1, fn));
	      }
	
	      return _registration.registerResolver(this, key, fn);
	    }
	
	    return this.registerResolver(key, new StrategyResolver(0, fn));
	  };
	
	  Container.prototype.autoRegisterAll = function autoRegisterAll(fns) {
	    var i = fns.length;
	    while (i--) {
	      this.autoRegister(fns[i]);
	    }
	  };
	
	  Container.prototype.unregister = function unregister(key) {
	    this._resolvers.delete(key);
	  };
	
	  Container.prototype.hasResolver = function hasResolver(key) {
	    var checkParent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
	    validateKey(key);
	
	    return this._resolvers.has(key) || checkParent && this.parent !== null && this.parent.hasResolver(key, checkParent);
	  };
	
	  Container.prototype.getResolver = function getResolver(key) {
	    return this._resolvers.get(key);
	  };
	
	  Container.prototype.get = function get(key) {
	    validateKey(key);
	
	    if (key === Container) {
	      return this;
	    }
	
	    if (resolverDecorates(key)) {
	      return key.get(this, key);
	    }
	
	    var resolver = this._resolvers.get(key);
	
	    if (resolver === undefined) {
	      if (this.parent === null) {
	        return this.autoRegister(key).get(this, key);
	      }
	
	      var _registration2 = _aureliaMetadata.metadata.get(_aureliaMetadata.metadata.registration, key);
	
	      if (_registration2 === undefined) {
	        return this.parent._get(key);
	      }
	
	      return _registration2.registerResolver(this, key, key).get(this, key);
	    }
	
	    return resolver.get(this, key);
	  };
	
	  Container.prototype._get = function _get(key) {
	    var resolver = this._resolvers.get(key);
	
	    if (resolver === undefined) {
	      if (this.parent === null) {
	        return this.autoRegister(key).get(this, key);
	      }
	
	      return this.parent._get(key);
	    }
	
	    return resolver.get(this, key);
	  };
	
	  Container.prototype.getAll = function getAll(key) {
	    validateKey(key);
	
	    var resolver = this._resolvers.get(key);
	
	    if (resolver === undefined) {
	      if (this.parent === null) {
	        return _emptyParameters;
	      }
	
	      return this.parent.getAll(key);
	    }
	
	    if (resolver.strategy === 4) {
	      var state = resolver.state;
	      var i = state.length;
	      var results = new Array(i);
	
	      while (i--) {
	        results[i] = state[i].get(this, key);
	      }
	
	      return results;
	    }
	
	    return [resolver.get(this, key)];
	  };
	
	  Container.prototype.createChild = function createChild() {
	    var child = new Container(this._configuration);
	    child.root = this.root;
	    child.parent = this;
	    return child;
	  };
	
	  Container.prototype.invoke = function invoke(fn, dynamicDependencies) {
	    try {
	      var _handler = this._handlers.get(fn);
	
	      if (_handler === undefined) {
	        _handler = this._createInvocationHandler(fn);
	        this._handlers.set(fn, _handler);
	      }
	
	      return _handler.invoke(this, dynamicDependencies);
	    } catch (e) {
	      throw new _aureliaPal.AggregateError('Error invoking ' + fn.name + '. Check the inner error for details.', e, true);
	    }
	  };
	
	  Container.prototype._createInvocationHandler = function _createInvocationHandler(fn) {
	    var dependencies = void 0;
	
	    if (fn.inject === undefined) {
	      dependencies = _aureliaMetadata.metadata.getOwn(_aureliaMetadata.metadata.paramTypes, fn) || _emptyParameters;
	    } else {
	      dependencies = [];
	      var ctor = fn;
	      while (typeof ctor === 'function') {
	        var _dependencies;
	
	        (_dependencies = dependencies).push.apply(_dependencies, getDependencies(ctor));
	        ctor = Object.getPrototypeOf(ctor);
	      }
	    }
	
	    var invoker = _aureliaMetadata.metadata.getOwn(_aureliaMetadata.metadata.invoker, fn) || classInvokers[dependencies.length] || classInvokers.fallback;
	
	    var handler = new InvocationHandler(fn, invoker, dependencies);
	    return this._onHandlerCreated !== undefined ? this._onHandlerCreated(handler) : handler;
	  };
	
	  return Container;
	}();
	
	function autoinject(potentialTarget) {
	  var deco = function deco(target) {
	    if (!target.hasOwnProperty('inject')) {
	      target.inject = (_aureliaMetadata.metadata.getOwn(_aureliaMetadata.metadata.paramTypes, target) || _emptyParameters).slice();
	    }
	  };
	
	  return potentialTarget ? deco(potentialTarget) : deco;
	}
	
	function inject() {
	  for (var _len5 = arguments.length, rest = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
	    rest[_key5] = arguments[_key5];
	  }
	
	  return function (target, key, descriptor) {
	    if (typeof descriptor === 'number') {
	      autoinject(target);
	      if (rest.length === 1) {
	        target.inject[descriptor] = rest[0];
	      }
	      return;
	    }
	
	    if (descriptor) {
	      var _fn = descriptor.value;
	      _fn.inject = rest;
	    } else {
	      target.inject = rest;
	    }
	  };
	}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Origin = exports.metadata = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports.decorators = decorators;
	exports.deprecated = deprecated;
	exports.mixin = mixin;
	exports.protocol = protocol;
	
	var _aureliaPal = __webpack_require__(18);
	
	
	
	function isObject(val) {
	  return val && (typeof val === 'function' || (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object');
	}
	
	var metadata = exports.metadata = {
	  resource: 'aurelia:resource',
	  paramTypes: 'design:paramtypes',
	  propertyType: 'design:type',
	  properties: 'design:properties',
	  get: function get(metadataKey, target, targetKey) {
	    if (!isObject(target)) {
	      return undefined;
	    }
	    var result = metadata.getOwn(metadataKey, target, targetKey);
	    return result === undefined ? metadata.get(metadataKey, Object.getPrototypeOf(target), targetKey) : result;
	  },
	  getOwn: function getOwn(metadataKey, target, targetKey) {
	    if (!isObject(target)) {
	      return undefined;
	    }
	    return Reflect.getOwnMetadata(metadataKey, target, targetKey);
	  },
	  define: function define(metadataKey, metadataValue, target, targetKey) {
	    Reflect.defineMetadata(metadataKey, metadataValue, target, targetKey);
	  },
	  getOrCreateOwn: function getOrCreateOwn(metadataKey, Type, target, targetKey) {
	    var result = metadata.getOwn(metadataKey, target, targetKey);
	
	    if (result === undefined) {
	      result = new Type();
	      Reflect.defineMetadata(metadataKey, result, target, targetKey);
	    }
	
	    return result;
	  }
	};
	
	var originStorage = new Map();
	var unknownOrigin = Object.freeze({ moduleId: undefined, moduleMember: undefined });
	
	var Origin = exports.Origin = function () {
	  function Origin(moduleId, moduleMember) {
	    
	
	    this.moduleId = moduleId;
	    this.moduleMember = moduleMember;
	  }
	
	  Origin.get = function get(fn) {
	    var origin = originStorage.get(fn);
	
	    if (origin === undefined) {
	      _aureliaPal.PLATFORM.eachModule(function (key, value) {
	        if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
	          for (var name in value) {
	            try {
	              var exp = value[name];
	              if (exp === fn) {
	                originStorage.set(fn, origin = new Origin(key, name));
	                return true;
	              }
	            } catch (e) {}
	          }
	        }
	
	        if (value === fn) {
	          originStorage.set(fn, origin = new Origin(key, 'default'));
	          return true;
	        }
	
	        return false;
	      });
	    }
	
	    return origin || unknownOrigin;
	  };
	
	  Origin.set = function set(fn, origin) {
	    originStorage.set(fn, origin);
	  };
	
	  return Origin;
	}();
	
	function decorators() {
	  for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
	    rest[_key] = arguments[_key];
	  }
	
	  var applicator = function applicator(target, key, descriptor) {
	    var i = rest.length;
	
	    if (key) {
	      descriptor = descriptor || {
	        value: target[key],
	        writable: true,
	        configurable: true,
	        enumerable: true
	      };
	
	      while (i--) {
	        descriptor = rest[i](target, key, descriptor) || descriptor;
	      }
	
	      Object.defineProperty(target, key, descriptor);
	    } else {
	      while (i--) {
	        target = rest[i](target) || target;
	      }
	    }
	
	    return target;
	  };
	
	  applicator.on = applicator;
	  return applicator;
	}
	
	function deprecated(optionsOrTarget, maybeKey, maybeDescriptor) {
	  function decorator(target, key, descriptor) {
	    var methodSignature = target.constructor.name + '#' + key;
	    var options = maybeKey ? {} : optionsOrTarget || {};
	    var message = 'DEPRECATION - ' + methodSignature;
	
	    if (typeof descriptor.value !== 'function') {
	      throw new SyntaxError('Only methods can be marked as deprecated.');
	    }
	
	    if (options.message) {
	      message += ' - ' + options.message;
	    }
	
	    return _extends({}, descriptor, {
	      value: function deprecationWrapper() {
	        if (options.error) {
	          throw new Error(message);
	        } else {
	          console.warn(message);
	        }
	
	        return descriptor.value.apply(this, arguments);
	      }
	    });
	  }
	
	  return maybeKey ? decorator(optionsOrTarget, maybeKey, maybeDescriptor) : decorator;
	}
	
	function mixin(behavior) {
	  var instanceKeys = Object.keys(behavior);
	
	  function _mixin(possible) {
	    var decorator = function decorator(target) {
	      var resolvedTarget = typeof target === 'function' ? target.prototype : target;
	
	      var i = instanceKeys.length;
	      while (i--) {
	        var property = instanceKeys[i];
	        Object.defineProperty(resolvedTarget, property, {
	          value: behavior[property],
	          writable: true
	        });
	      }
	    };
	
	    return possible ? decorator(possible) : decorator;
	  }
	
	  return _mixin;
	}
	
	function alwaysValid() {
	  return true;
	}
	function noCompose() {}
	
	function ensureProtocolOptions(options) {
	  if (options === undefined) {
	    options = {};
	  } else if (typeof options === 'function') {
	    options = {
	      validate: options
	    };
	  }
	
	  if (!options.validate) {
	    options.validate = alwaysValid;
	  }
	
	  if (!options.compose) {
	    options.compose = noCompose;
	  }
	
	  return options;
	}
	
	function createProtocolValidator(validate) {
	  return function (target) {
	    var result = validate(target);
	    return result === true;
	  };
	}
	
	function createProtocolAsserter(name, validate) {
	  return function (target) {
	    var result = validate(target);
	    if (result !== true) {
	      throw new Error(result || name + ' was not correctly implemented.');
	    }
	  };
	}
	
	function protocol(name, options) {
	  options = ensureProtocolOptions(options);
	
	  var result = function result(target) {
	    var resolvedTarget = typeof target === 'function' ? target.prototype : target;
	
	    options.compose(resolvedTarget);
	    result.assert(resolvedTarget);
	
	    Object.defineProperty(resolvedTarget, 'protocol:' + name, {
	      enumerable: false,
	      configurable: false,
	      writable: false,
	      value: true
	    });
	  };
	
	  result.validate = createProtocolValidator(options.validate);
	  result.assert = createProtocolAsserter(name, options.validate);
	
	  return result;
	}
	
	protocol.create = function (name, options) {
	  options = ensureProtocolOptions(options);
	  var hidden = 'protocol:' + name;
	  var result = function result(target) {
	    var decorator = protocol(name, options);
	    return target ? decorator(target) : decorator;
	  };
	
	  result.decorates = function (obj) {
	    return obj[hidden] === true;
	  };
	  result.validate = createProtocolValidator(options.validate);
	  result.assert = createProtocolAsserter(name, options.validate);
	
	  return result;
	};

/***/ }),
/* 18 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.AggregateError = AggregateError;
	exports.initializePAL = initializePAL;
	exports.reset = reset;
	function AggregateError(message, innerError, skipIfAlreadyAggregate) {
	  if (innerError) {
	    if (innerError.innerError && skipIfAlreadyAggregate) {
	      return innerError;
	    }
	
	    var separator = '\n------------------------------------------------\n';
	
	    message += separator + 'Inner Error:\n';
	
	    if (typeof innerError === 'string') {
	      message += 'Message: ' + innerError;
	    } else {
	      if (innerError.message) {
	        message += 'Message: ' + innerError.message;
	      } else {
	        message += 'Unknown Inner Error Type. Displaying Inner Error as JSON:\n ' + JSON.stringify(innerError, null, '  ');
	      }
	
	      if (innerError.stack) {
	        message += '\nInner Error Stack:\n' + innerError.stack;
	        message += '\nEnd Inner Error Stack';
	      }
	    }
	
	    message += separator;
	  }
	
	  var e = new Error(message);
	  if (innerError) {
	    e.innerError = innerError;
	  }
	
	  return e;
	}
	
	var FEATURE = exports.FEATURE = {};
	
	var PLATFORM = exports.PLATFORM = {
	  noop: function noop() {},
	  eachModule: function eachModule() {},
	  moduleName: function (_moduleName) {
	    function moduleName(_x) {
	      return _moduleName.apply(this, arguments);
	    }
	
	    moduleName.toString = function () {
	      return _moduleName.toString();
	    };
	
	    return moduleName;
	  }(function (moduleName) {
	    return moduleName;
	  })
	};
	
	PLATFORM.global = function () {
	  if (typeof self !== 'undefined') {
	    return self;
	  }
	
	  if (typeof global !== 'undefined') {
	    return global;
	  }
	
	  return new Function('return this')();
	}();
	
	var DOM = exports.DOM = {};
	var isInitialized = exports.isInitialized = false;
	function initializePAL(callback) {
	  if (isInitialized) {
	    return;
	  }
	  exports.isInitialized = isInitialized = true;
	  if (typeof Object.getPropertyDescriptor !== 'function') {
	    Object.getPropertyDescriptor = function (subject, name) {
	      var pd = Object.getOwnPropertyDescriptor(subject, name);
	      var proto = Object.getPrototypeOf(subject);
	      while (typeof pd === 'undefined' && proto !== null) {
	        pd = Object.getOwnPropertyDescriptor(proto, name);
	        proto = Object.getPrototypeOf(proto);
	      }
	      return pd;
	    };
	  }
	
	  callback(PLATFORM, FEATURE, DOM);
	}
	function reset() {
	  exports.isInitialized = isInitialized = false;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Component = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _injection = __webpack_require__(2);
	
	var _mediator = __webpack_require__(4);
	
	var _utils = __webpack_require__(5);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	var _dom = __webpack_require__(9);
	
	var _dom2 = _interopRequireDefault(_dom);
	
	var _util = __webpack_require__(10);
	
	var _util2 = _interopRequireDefault(_util);
	
	var _mvc = __webpack_require__(11);
	
	var _mvc2 = _interopRequireDefault(_mvc);
	
	var _microtemplate = __webpack_require__(12);
	
	var _microtemplate2 = _interopRequireDefault(_microtemplate);
	
	var _cookie = __webpack_require__(13);
	
	var _cookie2 = _interopRequireDefault(_cookie);
	
	var _jquery = __webpack_require__(7);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Component = exports.Component = function () {
	  function Component() {
	    _classCallCheck(this, Component);
	  }
	
	  _createClass(Component, [{
	    key: 'find',
	    value: function find(selector) {
	      var dom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
	      var els = (0, _jquery2.default)(this.domNode).find(selector);
	      return dom ? els.get() : els;
	    }
	  }, {
	    key: 'findOne',
	    value: function findOne(selector) {
	      var dom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
	      var el = this.find(selector);
	      return dom ? el.get(0) : el.eq(0);
	    }
	
	    //listenToRoot (delegated)
	
	  }, {
	    key: 'listenToRoot',
	    value: function listenToRoot(events, selector, callback) {
	      var bubbles = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
	
	      var _this = this;
	      if (typeof selector === 'function') {
	        bubbles = callback;
	        callback = selector;
	        return (0, _jquery2.default)(this.domNode).on(events, function (e) {
	          if (!bubbles) _this.sandbox.stopBubble(e);
	
	          for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	            params[_key - 1] = arguments[_key];
	          }
	
	          callback.apply(undefined, [this, e].concat(params));
	        });
	      } else {
	        return (0, _jquery2.default)(this.domNode).on(events, selector, function (e) {
	          if (!bubbles) _this.sandbox.stopBubble(e);
	
	          for (var _len2 = arguments.length, params = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	            params[_key2 - 1] = arguments[_key2];
	          }
	
	          callback.apply(undefined, [this, e].concat(params));
	        });
	      }
	    }
	
	    // this might be rare (maybe)
	
	  }, {
	    key: 'listenToElement',
	    value: function listenToElement(events, selector, callback) {
	      var bubbles = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
	
	      // selector as array [element, ]
	      var _this = this;
	      var $els = (0, _jquery2.default)(selector).on(events, function (e) {
	        if (!bubbles) _this.sandbox.stopBubble(e);
	        callback(this, e);
	      });
	      this.boundElements.push($els); //WeakMap/Map ?
	      return $els;
	    }
	  }, {
	    key: '_stopListenToElements',
	    value: function _stopListenToElements() {
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;
	
	      try {
	        for (var _iterator = this.boundElements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var $el = _step.value;
	
	          $el.off();
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	    }
	  }, {
	    key: 'listenToParent',
	    value: function listenToParent(channel, cb) {
	      return this.sandbox.on(channel + '/' + this.instanceId, cb);
	    }
	  }, {
	    key: 'listenToChildren',
	    value: function listenToChildren(channel, cb) {
	      return this.core._mediator.on(channel, cb);
	    }
	  }, {
	    key: 'pipeUp',
	    value: function pipeUp(channel, cb) {
	      var _this2 = this;
	
	      this.listenToChildren(channel, function (data) {
	        _this2.emitToParent(channel, data.data || data, cb);
	      });
	    }
	  }, {
	    key: 'pipeDown',
	    value: function pipeDown(channel, cb) {
	      var _this3 = this;
	
	      this.listenToParent(channel, function (data) {
	        _this3.emitToChildren('*', channel, data.data || data, cb);
	      });
	    }
	    //internal events
	
	  }, {
	    key: 'emit',
	    value: function emit(channel, event, cb) {
	      this.eventHub.emit(channel, event, cb);
	    }
	  }, {
	    key: 'listen',
	    value: function listen(channel, event, cb) {
	      this.eventHub.on(channel, event, cb);
	    }
	  }, {
	    key: 'off',
	    value: function off(channel, cb) {
	      this.eventHub.off(channel, cb);
	    }
	  }, {
	    key: 'emitToChildren',
	    value: function emitToChildren(id, channel, data, cb) {
	      if (typeof cb !== 'function') {
	        cb = function cb(err) {
	          if (err != null) {
	            //throw new Error(err)
	            console.error(err);
	          }
	        };
	      }
	
	      var ids = id instanceof Array ? id : [id];
	      var event = {
	        target: 'child',
	        channel: channel,
	        data: data
	      };
	      if (id === '*' || id == null) {
	        var _iteratorNormalCompletion2 = true;
	        var _didIteratorError2 = false;
	        var _iteratorError2 = undefined;
	
	        try {
	          for (var _iterator2 = Object.keys(this._running)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	            var key = _step2.value;
	
	            this.core._mediator.emit(channel + '/' + key, event, cb);
	          }
	        } catch (err) {
	          _didIteratorError2 = true;
	          _iteratorError2 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion2 && _iterator2.return) {
	              _iterator2.return();
	            }
	          } finally {
	            if (_didIteratorError2) {
	              throw _iteratorError2;
	            }
	          }
	        }
	      } else {
	        var _iteratorNormalCompletion3 = true;
	        var _didIteratorError3 = false;
	        var _iteratorError3 = undefined;
	
	        try {
	          for (var _iterator3 = ids[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	            var _id = _step3.value;
	
	            event.id = this.instanceId;
	            this.core._mediator.emit(channel + '/' + _id, event, cb);
	          }
	        } catch (err) {
	          _didIteratorError3 = true;
	          _iteratorError3 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion3 && _iterator3.return) {
	              _iterator3.return();
	            }
	          } finally {
	            if (_didIteratorError3) {
	              throw _iteratorError3;
	            }
	          }
	        }
	      }
	    }
	  }, {
	    key: 'emitToParent',
	    value: function emitToParent(channel, data, cb) {
	      if (typeof cb !== 'function') {
	        cb = function cb(err) {
	          if (err != null) {
	            //throw new Error(err)
	            console.error(err);
	          }
	        };
	      }
	
	      var id = this.instanceId;
	      var event = {
	        target: 'parent',
	        channel: channel,
	        data: data,
	        id: id
	      };
	      this.sandbox.emit(channel, event, cb);
	    }
	
	    // stop listening to Root
	
	  }, {
	    key: '_stopListenToRoot',
	    value: function _stopListenToRoot() {
	      (0, _jquery2.default)(this.domNode).off();
	    }
	  }, {
	    key: 'createComponentEvent',
	    value: function createComponentEvent(onEvent) {
	      if (this[onEvent]) {
	        //console.error(onEvent, ': event or variable already exists')
	      } else {
	        this[onEvent] = function () {};
	      }
	    }
	  }, {
	    key: '_setupBasicComponentChannels',
	    value: function _setupBasicComponentChannels() {
	      var _this4 = this;
	
	      if (this.sandbox) {
	        this.listenToParent('hide', function () {
	          _this4.hide();
	        });
	        this.listenToParent('show', function () {
	          _this4.show();
	        });
	        this.listenToParent('data', function (data) {
	          //this.model.set(data)s
	        });
	        this.pipeUp('broadcast');
	        this.pipeDown('broadcast');
	        this.createComponentEvent('onBroadcast');
	        this.listenToParent('broadcast', function (event) {
	          return _this4.onBroadcast(event.data, 'down');
	        });
	        this.listenToChildren('broadcast', function (event) {
	          return _this4.onBroadcast(event.data, 'up');
	        });
	      }
	    }
	  }, {
	    key: '_bind',
	    value: function _bind() {
	      var _this5 = this;
	
	      if (typeof this.onBind === 'function') {
	        this.onBind(function () {
	          return _this5.listenToRoot.apply(_this5, arguments);
	        }, // allow for arrays
	        function () {
	          return _this5.listenToElement.apply(_this5, arguments);
	        });
	      }
	    }
	  }, {
	    key: '_setRootAttributes',
	    value: function _setRootAttributes() {
	      this.id = 'component-' + this.core.uniqueId();
	      this.domNode.setAttribute('data-component-id', this.id);
	      this.domNode.setAttribute('data-instance-id', this.instanceId);
	    }
	  }, {
	    key: '_removeRootAttributes',
	    value: function _removeRootAttributes() {
	      this.domNode.removeAttribute('data-component-id');
	      this.domNode.removeAttribute('data-instance-id');
	    }
	  }, {
	    key: '_unbind',
	    value: function _unbind() {
	      this._stopListenToRoot();
	      this._stopListenToElements();
	      this.eventHub.off();
	      if (typeof this.onUnbind === 'function') {
	        this.onUnbind();
	      }
	    }
	  }, {
	    key: '_subscribe',
	    value: function _subscribe() {
	      var _this6 = this;
	
	      this._setupBasicComponentChannels();
	      if (typeof this.onSubscribe === 'function') {
	        this.onSubscribe(function (channel, cb) {
	          return _this6.listenToParent(channel, cb);
	        }, function (channel, cb) {
	          return _this6.listenToChildren(channel, cb);
	        });
	      }
	    }
	  }, {
	    key: '_unsubscribe',
	    value: function _unsubscribe() {
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
	  }, {
	    key: '_detach',
	    value: function _detach() {
	      this.core._mediator.detach();
	      if (this.sandbox) {
	        this.sandbox.detach();
	      }
	    }
	  }, {
	    key: '_attach',
	    value: function _attach() {
	      this.core._mediator.attach();
	      if (this.sandbox) {
	        this.sandbox.attach();
	      }
	    }
	  }, {
	    key: '_render',
	    value: function _render() {
	      //tasks??
	      if (this.hasTemplate) {
	        if (typeof this.onPreRender === 'function') {
	          this.onPreRender();
	        }
	        if (typeof this.onRender === 'function') {
	          this.onRender();
	        } else {
	          //assume ejs default - this.model.toJSON
	          if (!this.embedTemplate) {
	            this.domNode.innerHTML = this.sandbox.render(this.template, this.model.toJSON() || {});
	          }
	        }
	        if (typeof this.onPostRender === 'function') {
	          this.onPostRender();
	        }
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      //this._detach();
	      this._unbind();
	      this._render();
	      this._bind();
	      //this._attach();
	    }
	  }, {
	    key: 'getInstance',
	    value: function getInstance(id) {
	      return this._instances[id];
	    }
	  }, {
	    key: 'getModuleClass',
	    value: function getModuleClass(id) {
	      return this._modules[id];
	    }
	  }, {
	    key: '_registerComponents',
	    value: function _registerComponents() {
	      this.registry = this.registry || new Map();
	      var _iteratorNormalCompletion4 = true;
	      var _didIteratorError4 = false;
	      var _iteratorError4 = undefined;
	
	      try {
	        for (var _iterator4 = this.registry.entries()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	          var _step4$value = _slicedToArray(_step4.value, 2),
	              key = _step4$value[0],
	              value = _step4$value[1];
	
	          this.core.register(key, value);
	        }
	      } catch (err) {
	        _didIteratorError4 = true;
	        _iteratorError4 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion4 && _iterator4.return) {
	            _iterator4.return();
	          }
	        } finally {
	          if (_didIteratorError4) {
	            throw _iteratorError4;
	          }
	        }
	      }
	    }
	  }, {
	    key: 'startPage',
	    value: function startPage(page, opt) {
	      var _this7 = this;
	
	      var done = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
	
	      if (this.page != null) {
	        var taskStop = function taskStop(next) {
	          _this7.core.stop(_this7.page, next);
	        };
	
	        var taskStart = function taskStart(next) {
	          _this7.startComponents(page, opt, next);
	          _this7.page = page;
	        };
	        _utils2.default.runSeries([taskStop, taskStart], done, true);
	      } else {
	        this.core.start(page, opt, done);
	        this.page = page;
	      }
	    }
	  }, {
	    key: '_tryEvent',
	    value: function _tryEvent(event, done) {
	      try {
	        this[event](done);
	      } catch (err) {
	        done(err);
	      }
	    }
	  }, {
	    key: '_onEvent',
	    value: function _onEvent(event, done) {
	      if (typeof this[event] === 'function') {
	        if (_utils2.default.getArgumentNames(this[event]).length !== 0) {
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
	  }, {
	    key: 'broadcast',
	    value: function broadcast(direction, action, value) {
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
	  }, {
	    key: 'setProps',
	    value: function setProps(props) {
	      this.props = new this.core.Model(props);
	    }
	  }, {
	    key: 'activateProps',
	    value: function activateProps() {
	      var _arguments = arguments,
	          _this8 = this;
	
	      this.props.change(function () {
	        console.log(_arguments);
	        if (typeof _this8.onPropsChange === 'function') {
	          _this8.onPropsChange(props);
	        }
	      });
	      this.listenToParent("props", function (props) {
	        _this8.setProps(props);
	      });
	    }
	  }, {
	    key: 'setModel',
	    value: function setModel(data) {
	      var _this9 = this;
	
	      this.props = new this.core.Model(data);
	      this.props.change(function () {
	        _this9.render();
	      }, this);
	    }
	  }, {
	    key: 'update',
	    value: function update(id, props) {
	      if ((typeof id === 'undefined' ? 'undefined' : _typeof(id)) === 'object') {
	        props = id;
	        this.emitToChildren('*', "props", props);
	      } else {
	        this.emitToChildren(id, "props", props);
	      }
	    }
	  }, {
	    key: '_preInit',
	    value: function _preInit(sandbox) {
	      //embedInSandbox
	      this.core = new _injection.InjectionCore();
	      this.core.use([_util2.default, _mvc2.default, _microtemplate2.default, _dom2.default, _cookie2.default]);
	
	      //this._mediator.cascadeChannels = true;
	      this.eventHub = new _mediator.Mediator();
	      this.boundElements = this.boundElements || [];
	      //if (jQuery == null) {
	      //throw "jQuery  not found"
	      //}
	      this.$ = _jquery2.default;
	      _jquery2.default.hyperjs = true;
	
	      this._registerComponents(); //init?
	
	      this.sandbox = sandbox;
	      this.hasSandbox = this.sandbox != null;
	      this.hasTemplate = this.template != null;
	      //this.embedTemplate = this.embedTemplate ! || false;
	
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
	        this.$instance = (0, _jquery2.default)(this.instance);
	      } else {
	        this.hasRoot = false;
	      }
	      this.instanceId = this.sandbox.instanceId;
	
	      if (this.hasTemplate && this.embedTemplate) {
	        this.domNode.innerHTML = this.template;
	      }
	    }
	  }, {
	    key: 'init',
	    value: function init(options, done) {
	      var _this10 = this;
	
	      this.props = options || {};
	      var errors = [];
	
	      var tasks = [function (next) {
	        _this10._onEvent('onPreInit', next);
	      }, function (next) {
	        _this10.core.boot(function () {
	          _this10._onEvent('onBoot', next);
	        });
	      }, function (next) {
	        _this10.id = 'component-' + _this10.core.uniqueId();
	        _this10._setRootAttributes();
	        next();
	      }, function (next) {
	        _this10.data = _this10.props || {};
	        _this10.setModel(_this10.data);
	        _this10._render();
	        next();
	      }, function (next) {
	        _this10.id = 'component-' + _this10.core.uniqueId();
	        _this10._setRootAttributes();
	        next();
	      }, function (next) {
	        _this10._bind();
	        next();
	      }, function (next) {
	        _this10._subscribe();
	        next();
	      }];
	
	      _utils2.default.runSeries(tasks, function (err) {
	        if (err != null) {
	          errors = err;
	        }
	        _this10._onEvent('onInit', function (err2) {
	          if (err2) {
	            errors.concat(err2);
	          }
	          if (errors.length > 0) console.error(errors);
	          done(errors.length > 0 ? errors : null);
	        });
	      }, false);
	      console.log("created:", this);
	      return this;
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy(done) {
	      var _this11 = this;
	
	      var tasks = [function (next) {
	        _this11._onEvent('onDestroy', next);
	      }, function (next) {
	        _this11.stop(next);
	      }, function (next) {
	        _this11._unsubscribe();
	        next();
	      }, function (next) {
	        _this11._unbind();
	        next();
	      }, function (next) {
	        if (_this11.hasTemplate) {
	          _this11.domNode.innerHTML = '';
	        }
	        next();
	      }];
	      _utils2.default.runSeries(tasks, done, true);
	      this._removeRootAttributes();
	      console.log("destroyed:", this);
	    }
	  }, {
	    key: '_checkForComponent',
	    value: function _checkForComponent(node) {
	      return !this.find(node).data('component-id') && this.find(node).find('[data-component-id]').length > 0;
	    }
	  }, {
	    key: 'initComponents',
	    value: function initComponents() {
	      var _iteratorNormalCompletion5 = true;
	      var _didIteratorError5 = false;
	      var _iteratorError5 = undefined;
	
	      try {
	        for (var _iterator5 = Object.keys(this._modules)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	          var id = _step5.value;
	
	          var el = this.find('#' + id).get(0) || this.find(id).get(0);
	          var rand = this.core.uniqueId();
	          if (el && !this._checkForComponent(el)) {
	            this.core.start(id, {
	              instanceId: id + '-' + rand,
	              options: {
	                domNode: el
	              }
	            });
	          }
	        }
	      } catch (err) {
	        _didIteratorError5 = true;
	        _iteratorError5 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion5 && _iterator5.return) {
	            _iterator5.return();
	          }
	        } finally {
	          if (_didIteratorError5) {
	            throw _iteratorError5;
	          }
	        }
	      }
	    }
	  }, {
	    key: 'startChildren',
	    value: function startChildren(children, initEvent) {
	      var _iteratorNormalCompletion6 = true;
	      var _didIteratorError6 = false;
	      var _iteratorError6 = undefined;
	
	      try {
	        for (var _iterator6 = children[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
	          var child = _step6.value;
	
	          this.core.start(child[0], child[1]);
	        }
	      } catch (err) {
	        _didIteratorError6 = true;
	        _iteratorError6 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion6 && _iterator6.return) {
	            _iterator6.return();
	          }
	        } finally {
	          if (_didIteratorError6) {
	            throw _iteratorError6;
	          }
	        }
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
	
	  }, {
	    key: 'startComponents',
	    value: function startComponents() {
	      var _core;
	
	      (_core = this.core).start.apply(_core, arguments);
	    }
	  }, {
	    key: 'stopComponents',
	    value: function stopComponents(id, done) {
	      var _this12 = this;
	
	      var ids = id instanceof Array ? id : [id];
	      var tasks = [];
	      var _iteratorNormalCompletion7 = true;
	      var _didIteratorError7 = false;
	      var _iteratorError7 = undefined;
	
	      try {
	        var _loop = function _loop() {
	          var id = _step7.value;
	
	          tasks.push(function (next) {
	            _this12.core.stop(id, next);
	          });
	        };
	
	        for (var _iterator7 = ids[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
	          _loop();
	        }
	      } catch (err) {
	        _didIteratorError7 = true;
	        _iteratorError7 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion7 && _iterator7.return) {
	            _iterator7.return();
	          }
	        } finally {
	          if (_didIteratorError7) {
	            throw _iteratorError7;
	          }
	        }
	      }
	
	      _utils2.default.runParallel(tasks, done);
	    }
	  }, {
	    key: 'show',
	    value: function show() {
	      this.domNode.style.display = "block";
	      return this;
	    }
	  }, {
	    key: 'hide',
	    value: function hide() {
	      this.domNode.style.display = "none";
	      return this;
	    }
	  }]);

	  return Component;
	}();

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.HyperModel = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _mediator = __webpack_require__(4);
	
	var _jquery = __webpack_require__(7);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Based originally on jquery.pjax.js
	// copyright chris wanstrath
	// https://github.com/defunkt/jquery-pjax
	
	var defaults = _jquery2.default.extend(true, {}, _jquery2.default.ajaxSettings, {
	    timeout: 120000,
	    push: true,
	    replace: false,
	    type: "GET",
	    dataType: "html",
	    scrollTo: 0,
	    maxCacheLength: 20,
	    data: {}
	});
	
	function parseURL(url) {
	    var a;
	    a = document.createElement("a");
	    a.href = url;
	    return a;
	}
	
	// _pjax: true
	
	var events = {};
	
	var HyperModel = exports.HyperModel = function (_Mediator) {
	    _inherits(HyperModel, _Mediator);
	
	    function HyperModel(options) {
	        _classCallCheck(this, HyperModel);
	
	        // get dom ref
	        // resource url
	        // create ajax object
	        // essentially the constructor binds to a resource
	        // can return a JSON model, another reason for calling it 'Hyper'
	        // check all events on itemprop, itemscope etc when in dom
	
	        // @_ref
	        var _this = _possibleConstructorReturn(this, (HyperModel.__proto__ || Object.getPrototypeOf(HyperModel)).call(this));
	
	        options = options || {};
	        _this._options = {}; //$.extend(true, {}, $.ajaxSettings, defaults, options)}
	        _this._headers = {};
	        var redirect = options.redirectOnError || false;
	
	        _this._hash = parseURL(options.url).hash;
	        // @_options.data = {} unless options.data
	        // @_options.data._pjax = "true"
	        //this._timeoutTimer;
	        _this._successCb = function () {};
	
	        // callbacks
	        _this._options.beforeSend = function (xhr, settings) {
	            // No timeout for non-GET requests
	            // Its not safe to request the resource again with a fallback method.
	            if (settings.type !== "GET") {
	                settings.timeout = 0;
	            }
	
	            xhr.setRequestHeader("X-PJAX", "true");
	
	            if (options.isMobile) {
	                xhr.setRequestHeader("X-Mobile", "true");
	            }
	
	            for (var field in _this._headers) {
	                var value = _this._headers[field];
	                xhr.setRequestHeader(field, value);
	            }
	
	            // xhr.setRequestHeader "X-PJAX-Container", @_context.selector
	
	            if (!_this._fire("pjax:beforeSend", [xhr, settings])) {
	                return false;
	            }
	
	            if (settings.timeout > 0) {
	                _this._timeoutTimer = setTimeout(function () {
	                    if (_this._fire("pjax:timeout", [xhr, options])) {
	                        return xhr.abort("timeout");
	                    }
	                }, settings.timeout);
	
	                // Clear timeout setting so jquerys internal timeout isn't invoked
	                settings.timeout = 0;
	            }
	
	            return _this._requestUrl = parseURL(settings.url).href;
	        };
	
	        _this._options.complete = function (xhr, textStatus) {
	            if (_this._timeoutTimer) {
	                clearTimeout(_this._timeoutTimer);
	            }
	            _this._fire("pjax:complete", [xhr, textStatus, _this._options]);
	            return _this._fire("pjax:end", [xhr, _this._options]);
	        };
	
	        _this._options.success = function (data, status, xhr) {
	            if (xhr.status !== 204 && data != null) {
	                var container = _this._extractContainer(data, xhr, options);
	
	                // TODO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	                // If the new response is missing a body, hard load the page
	                // unless container.contents
	                // @_locationReplace container.url
	                // return
	
	                // @_state =
	                //   id: options.id or core.uniqueId()
	                //   url: container.url
	                //   title: container.title
	                //   container: @_context.selector
	                //   fragment: @_options.fragment
	                //   timeout: @_options.timeout
	
	                // window.history.replaceState @_state, container.title, container.url  if options.push or options.replace
	                // @navigate container.url, { replace: true }, @_state  if @_options.push or @_options.replace
	
	                // Clear out any focused controls before inserting new page contents.
	
	                // document.activeElement.blur()
	                if (container.title) {
	                    document.title = container.title;
	                }
	            }
	
	            // @_context.html container.contents
	
	            // FF bug: Won't autofocus fields that are inserted via JS.
	            // This behavior is incorrect. So if theres no current focus, autofocus
	            // the last field.
	            //
	            // http://www.w3.org/html/wg/drafts/html/master/forms.html
	            // autofocusEl = @_context.find("input[autofocus], textarea[autofocus]").last()[0]
	            // autofocusEl.focus()  if autofocusEl and document.activeElement isnt autofocusEl
	
	            // Scroll to top by default
	            // $(window).scrollTop options.scrollTo if typeof options.scrollTo is "number"
	
	            // If the URL has a hash in it, make sure the browser
	            // knows to navigate to the hash.
	            // if @_hash isnt ""
	
	            // Avoid using simple hash set here. Will add another history
	            // entry. Replace the url with replaceState and scroll to target
	            // by hand.
	            //
	            //   window.location.hash = hash
	            // url = core.parseURL(container.url)
	            // url.hash = @_hash
	            // @_state.url = url.href
	
	            // window.history.replaceState @_state, container.title, url.href
	
	            // @navigate url.href, { replace: true }, @_state
	
	            // target = $(url.hash)
	
	            // $(window).scrollTop target.offset().top  if target.length
	
	            // console.log data
	            _this._fire("pjax:success", [container, status, xhr, _this._options]);
	            return _this._successCb(container, status, xhr, _this._options);
	        };
	
	        _this._options.error = function (xhr, textStatus, errorThrown) {
	            var container = _this._extractContainer("", xhr, _this._options);
	
	            var status = xhr.status;
	
	            _this._errorCb(xhr, textStatus, errorThrown, _this._options);
	            _this._fire("pjax:error", [xhr, textStatus, errorThrown, _this._options]);
	            // reload page
	            // handle this better
	            if (status === 401) {
	                return location.href = xhr.getResponseHeader("X-LOGIN-URL");
	            } else if (redirect && (status === 0 || _this._options.type === "GET" && textStatus !== "abort")) {
	                return _this._locationReplace(container.url);
	            }
	        };
	        return _this;
	    }
	
	    _createClass(HyperModel, [{
	        key: '_pjax',
	        value: function _pjax(options) {
	            options = _jquery2.default.extend(true, {}, options, this._options);
	
	            var xhr = this._xhr;
	
	            // stop current call if any
	            if (xhr && xhr.readyState < 4) {
	                xhr.onreadystatechange = function () {};
	                xhr.abort();
	            }
	
	            xhr = this._xhr = _jquery2.default.ajax(options);
	
	            if (xhr.readyState > 0) {
	                this._fire("pjax:start", [xhr, options]);
	                this._fire("pjax:send", [xhr, options]);
	            }
	            return this._xhr;
	        }
	    }, {
	        key: '_setCallbacks',
	        value: function _setCallbacks(options) {
	            this._successCb = options.success || function () {};
	            this._completeCb = options.complete || function () {};
	            this._errorCb = options.error || function () {};
	
	            // remove callbacks before we merge with global options
	            if (options.success != null) {
	                delete options.success;
	            }
	            if (options.error != null) {
	                delete options.error;
	            }
	            if (options.complete != null) {
	                return delete options.complete;
	            }
	        }
	    }, {
	        key: 'get',
	        value: function get() {
	            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	            var verb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'GET';
	
	            if (options.url == null) {
	                return;
	            }
	            this._setCallbacks(options);
	            options.type = verb;
	            return this._pjax(_jquery2.default.extend({}, defaults, options));
	        }
	    }, {
	        key: 'put',
	        value: function put(options) {
	            if (options.url == null) {
	                return;
	            }
	            this._setCallbacks(options);
	            options.type = "PUT";
	            return this._pjax(_jquery2.default.extend({}, defaults, options));
	        }
	    }, {
	        key: 'post',
	        value: function post(options) {
	            if (options.url == null) {
	                return;
	            }
	            this._setCallbacks(options);
	            options.type = "POST";
	            return this._pjax(_jquery2.default.extend({}, defaults, options));
	        }
	    }, {
	        key: 'detele',
	        value: function detele(form, options) {}
	    }, {
	        key: 'patch',
	        value: function patch(form, options) {
	            return this._handleSubmit(form, "PATCH", options);
	        }
	    }, {
	        key: 'head',
	        value: function head() {
	            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	            return this.get(options, "HEAD");
	        }
	    }, {
	        key: 'submit',
	        value: function submit(form, options) {
	            return this._handleSubmit(form, undefined, options);
	        }
	    }, {
	        key: 'stop',
	        value: function stop(form, options) {
	            return this._xhr.abort();
	        }
	    }, {
	        key: 'toJSON',
	        value: function toJSON() {
	            return {};
	        }
	    }, {
	        key: 'setHeader',
	        value: function setHeader(field, value) {
	            return this._headers[field] = value;
	        }
	    }, {
	        key: 'removeHeader',
	        value: function removeHeader(field) {
	            return delete this._headers[field];
	        }
	    }, {
	        key: '_handleSubmit',
	        value: function _handleSubmit(form, method) {
	            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	
	            form = form.tagName.toUpperCase() === "FORM" ? form : (0, _jquery2.default)(form).find("form").get(0);
	            if ((typeof form === 'undefined' ? 'undefined' : _typeof(form)) !== 'object') {
	                throw "$.pjax.submit requires a form element";
	            }
	
	            var settings = {
	                type: method || form.method.toUpperCase(),
	                url: form.action,
	                data: options.data || (0, _jquery2.default)(form).serializeArray(),
	                // container: $(form).attr("data-pjax")
	                target: form
	            };
	
	            this._setCallbacks(options);
	            return this._pjax(_jquery2.default.extend({}, defaults, settings, options));
	        }
	        // event.preventDefault()
	
	    }, {
	        key: '_fire',
	        value: function _fire(type, args) {
	            return this.emit(type, args);
	        }
	    }, {
	        key: '_locationReplace',
	        value: function _locationReplace(url) {
	            window.history.replaceState(null, "", "#");
	            return window.location.replace(url);
	        }
	    }, {
	        key: '_stripPjaxParam',
	        value: function _stripPjaxParam(url) {
	            return url.replace(/\?_pjax=[^&]+&?/, "?").replace(/_pjax=[^&]+&?/, "").replace(/[\?&]$/, "");
	        }
	    }, {
	        key: 'findAll',
	        value: function findAll(elems, selector) {
	            return elems.filter(selector).add(elems.find(selector));
	        }
	    }, {
	        key: 'parseHTML',
	        value: function parseHTML(html) {
	            return _jquery2.default.parseHTML(html, document, true);
	        }
	    }, {
	        key: '$html',
	        value: function $html(html) {
	            return (0, _jquery2.default)(this.parseHTML(html));
	        }
	    }, {
	        key: '_extractContainer',
	        value: function _extractContainer(data, xhr, options) {
	            var obj = {};
	            var isPjaxSnippet = false;
	            // Prefer X-PJAX-URL header if it was set, otherwise fallback to
	            // using the original requested url.
	            obj.url = this._stripPjaxParam(xhr.getResponseHeader("X-PJAX-URL") || this._requestUrl);
	
	            if (/<div class="pjax/i.test(data)) {
	                isPjaxSnippet = true;
	            }
	
	            if (/<html/i.test(data)) {
	                var $head = (0, _jquery2.default)(this.parseHTML(data.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0]));
	                var $body = (0, _jquery2.default)(this.parseHTML(data.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0]));
	            } else {
	                var $body;
	                var $head = $body = (0, _jquery2.default)(this.parseHTML(data));
	            }
	
	            // $body = data
	
	
	            // If response data is empty, return fast
	            if ($body.length === 0) {
	                return obj;
	            }
	
	            if (options.fragment && !isPjaxSnippet) {
	
	                // If they specified a fragment, look for it in the response
	                // and pull it out.
	                if (options.fragment === "body") {
	                    var $fragment = $body;
	                } else {
	                    var $fragment = this.findAll($body, options.fragment).first();
	                }
	
	                if ($fragment.length) {
	                    obj.contents = $fragment.contents();
	
	                    // If there's no title, look for data-title and title attributes
	                    // on the fragment
	                    if (!obj.title) {
	                        obj.title = $fragment.attr("title") || $fragment.data("title");
	                    }
	                }
	            } else {
	                obj.contents = $body;
	            }
	
	            obj.title = ''; //$.trim(obj.title)  if obj.title
	            if (this._hash !== "") {
	                obj.hash = this._hash;
	            }
	            obj.html = data;
	            return obj;
	        }
	    }]);
	
	    return HyperModel;
	}(_mediator.Mediator);

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.StateMachine = exports.defaultRoutes = exports.defaultRouteOptions = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	exports.Router = Router;
	
	var _router3 = __webpack_require__(22);
	
	var _router4 = _interopRequireDefault(_router3);
	
	var _router5LinkInterceptor = __webpack_require__(32);
	
	var _router5LinkInterceptor2 = _interopRequireDefault(_router5LinkInterceptor);
	
	var _router5History = __webpack_require__(33);
	
	var _router5History2 = _interopRequireDefault(_router5History);
	
	var _router5Listeners = __webpack_require__(35);
	
	var _router5Listeners2 = _interopRequireDefault(_router5Listeners);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var defaultRouteOptions = exports.defaultRouteOptions = {
	  internal: false,
	  internalStateHistory: true,
	  useHash: true,
	  defaultRoute: 'home',
	  defaultParams: { section: '' },
	  base: '',
	  trailingSlash: false,
	  autoCleanUp: true,
	  strictQueryParams: false
	};
	
	var defaultRoutes = exports.defaultRoutes = [{ name: 'home', path: '/' }, { name: 'section', path: '/:section' }];
	
	function Router(routes) {
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	
	  if (!(routes instanceof Array)) {
	    if (routes != null) {
	      options = Object.assign({}, routes);
	    }
	    routes = defaultRoutes;
	  }
	  var d = Object.assign({}, defaultRouteOptions);
	  var mergedOptions = Object.assign(d, options);
	
	  return function (_Class) {
	    return function (_Class2) {
	      _inherits(RouteredComponent, _Class2);
	
	      function RouteredComponent() {
	        _classCallCheck(this, RouteredComponent);
	
	        var _this = _possibleConstructorReturn(this, (RouteredComponent.__proto__ || Object.getPrototypeOf(RouteredComponent)).call(this));
	
	        _this._setupRouter();
	        return _this;
	      }
	
	      // init(options, done) {
	      //   super.init(options, () => {
	      //     this._startRouter();
	      //     done();
	      //   });
	      // }
	
	      _createClass(RouteredComponent, [{
	        key: '_startRouter',
	        value: function _startRouter() {
	          var _this2 = this;
	
	          this.router.start(function (err, state) {
	            if (err) console.error('error ', err);
	            var loadPath = state.path === "/" ? "index" : state.path;
	
	            if (typeof _this2.routerStarted === 'function') {
	              _this2.routerStarted(err, state, _this2.router);
	            }
	            console.log('START_state ', state);
	          });
	        }
	      }, {
	        key: '_bind',
	        value: function _bind() {
	          var _this3 = this;
	
	          _get(RouteredComponent.prototype.__proto__ || Object.getPrototypeOf(RouteredComponent.prototype), '_bind', this).call(this);
	          if (mergedOptions.internal) {
	            this.listenToRoot("click", "a", function (element, event) {
	              event.stopPropagation();
	              event.preventDefault();
	              var hash = element.hash.replace('#/', '');
	              //console.log(hash);
	              _this3.router.navigate('section', { section: hash }, { reload: true });
	            });
	          }
	        }
	      }, {
	        key: '_setRootAttributes',
	        value: function _setRootAttributes() {
	          _get(RouteredComponent.prototype.__proto__ || Object.getPrototypeOf(RouteredComponent.prototype), '_setRootAttributes', this).call(this);
	          this.domNode.setAttribute('data-state', '/');
	        }
	      }, {
	        key: '_removeRootAttributes',
	        value: function _removeRootAttributes() {
	          _get(RouteredComponent.prototype.__proto__ || Object.getPrototypeOf(RouteredComponent.prototype), '_removeRootAttributes', this).call(this);
	          this.domNode.removeAttribute('data-state');
	        }
	      }, {
	        key: 'setState',
	        value: function setState(state) {
	          this.domNode.setAttribute('data-state', state.path);
	          if (mergedOptions.internalStateHistory) {
	            this.history.push(state);
	          }
	        }
	      }, {
	        key: 'navigate',
	        value: function navigate() {
	          var _router;
	
	          (_router = this.router).navigate.apply(_router, arguments);
	        }
	      }, {
	        key: 'addRoute',
	        value: function addRoute() {
	          var _router2;
	
	          (_router2 = this.router).add.apply(_router2, arguments);
	        }
	      }, {
	        key: 'destroy',
	        value: function destroy(done) {
	          this.router.stop();
	          this.routerStopped(this.router);
	          done();
	        }
	      }, {
	        key: '_setupRouter',
	        value: function _setupRouter() {
	          var _this4 = this;
	
	          this.history = [];
	          this.router = new _router4.default(routes, mergedOptions).usePlugin((0, _router3.loggerPlugin)()).usePlugin((0, _router5Listeners2.default)());
	
	          if (!mergedOptions.useHash) {
	            this.router.usePlugin((0, _router5LinkInterceptor2.default)({ reload: true }, function (err) {
	              if (err) {
	                if (err.code === 'SAME_STATES') {
	                  // same route, maybe scroll page to the top?
	                } else {
	                  console.error(err);
	                }
	              }
	            }));
	          }
	
	          if (!mergedOptions.internal) {
	            this.router.usePlugin((0, _router5History2.default)({ forceDeactivate: false }));
	          }
	
	          console.log(this.router);
	
	          this.router.addListener(function (toState, fromState) {
	            var page = toState.params.section || 'reports';
	            _this4.setState(toState);
	            if (typeof _this4.onRouterTransition === 'function') {
	              _this4.onRouterTransition(toState, fromState);
	            }
	          });
	
	          if (typeof this.routerInitialized === 'function') {
	            this.routerInitialized(this.router);
	          }
	        }
	      }]);
	
	      return RouteredComponent;
	    }(_Class);
	  };
	}
	
	exports.StateMachine = Router;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.transitionPath = exports.errCodes = exports.loggerPlugin = exports.RouteNode = exports.Router5 = undefined;
	
	var _router = __webpack_require__(23);
	
	var _router2 = _interopRequireDefault(_router);
	
	var _routeNode = __webpack_require__(24);
	
	var _routeNode2 = _interopRequireDefault(_routeNode);
	
	var _logger = __webpack_require__(31);
	
	var _logger2 = _interopRequireDefault(_logger);
	
	var _router3 = __webpack_require__(28);
	
	var _router4 = _interopRequireDefault(_router3);
	
	var _constants = __webpack_require__(30);
	
	var _constants2 = _interopRequireDefault(_constants);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _router2.default;
	exports.Router5 = _router2.default;
	exports.RouteNode = _routeNode2.default;
	exports.loggerPlugin = _logger2.default;
	exports.errCodes = _constants2.default;
	exports.transitionPath = _router4.default;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _routeNode = __webpack_require__(24);
	
	var _routeNode2 = _interopRequireDefault(_routeNode);
	
	var _transition2 = __webpack_require__(27);
	
	var _transition3 = _interopRequireDefault(_transition2);
	
	var _constants = __webpack_require__(30);
	
	var _constants2 = _interopRequireDefault(_constants);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var noop = function noop() {};
	var ifNot = function ifNot(condition, error) {
	    if (!condition) throw new Error(error);
	};
	
	var makeState = function makeState(name, params, path, _meta) {
	    var state = {};
	    var setProp = function setProp(key, value) {
	        return Object.defineProperty(state, key, { value: value, enumerable: true });
	    };
	    setProp('name', name);
	    setProp('params', params);
	    setProp('path', path);
	    if (_meta) setProp('_meta', _meta);
	    return state;
	};
	
	var addCanActivate = function addCanActivate(router) {
	    return function (route) {
	        if (route.canActivate) router.canActivate(route.name, route.canActivate);
	    };
	};
	
	var toFunction = function toFunction(val) {
	    return typeof val === 'function' ? val : function () {
	        return val;
	    };
	};
	
	/**
	 * Create a new Router5 instance
	 * @class
	 * @param {RouteNode[]|Object[]|RouteNode|Object} routes The router routes
	 * @param {Object} [opts={}] The router options: useHash, defaultRoute and defaultParams can be specified.
	 * @return {Router5} The router instance
	 */
	
	var Router5 = (function () {
	    function Router5(routes) {
	        var _this = this;
	
	        var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	        _classCallCheck(this, Router5);
	
	        this.started = false;
	        this.mware = null;
	        this._cbs = {};
	        this._canAct = {};
	        this._canDeact = {};
	        this.lastStateAttempt = null;
	        this.lastKnownState = null;
	        this.rootNode = routes instanceof _routeNode2.default ? routes : new _routeNode2.default('', '', routes, addCanActivate(this));
	        this.options = {
	            useHash: false,
	            hashPrefix: '',
	            base: false,
	            trailingSlash: 0,
	            autoCleanUp: true,
	            strictQueryParams: true
	        };
	        Object.keys(opts).forEach(function (opt) {
	            return _this.options[opt] = opts[opt];
	        });
	        this.registeredPlugins = {};
	        this._extraArgs = [];
	    }
	
	    /**
	     * Set an option value
	     * @param  {String} opt The option to set
	     * @param  {*}      val The option value
	     * @return {Router5}    The Router5 instance
	     */
	
	    _createClass(Router5, [{
	        key: 'setOption',
	        value: function setOption(opt, val) {
	            this.options[opt] = val;
	            return this;
	        }
	
	        /**
	         * Set additional arguments used in lifecycle functions.
	         * Additional arguments are used in canActivate, canDeactivate and middleware functions in first positions (before `toState`).
	         * @param  {Array} args The additional arguments
	         */
	
	    }, {
	        key: 'setAdditionalArgs',
	        value: function setAdditionalArgs(args) {
	            this._extraArgs = Array.isArray(args) ? args : [args];
	            return this;
	        }
	
	        /**
	         * Return additional arguments used in lifecycle functions
	         */
	
	    }, {
	        key: 'getAdditionalArgs',
	        value: function getAdditionalArgs() {
	            return this._extraArgs;
	        }
	
	        /**
	         * Add route(s)
	         * @param  {RouteNode[]|Object[]|RouteNode|Object} routes Route(s) to add
	         * @return {Router5}  The Router5 instance
	         */
	
	    }, {
	        key: 'add',
	        value: function add(routes) {
	            this.rootNode.add(routes, addCanActivate(this));
	            return this;
	        }
	
	        /**
	         * Add a route to the router.
	         * @param {String}   name          The route name
	         * @param {String}   path          The route path
	         * @param {Function} [canActivate] A function to determine if the route can be activated.
	         *                                 It will be invoked during a transition with `toState`
	         *                                 and `fromState` parameters.
	         * @return {Router5}             The Router5 instance
	         */
	
	    }, {
	        key: 'addNode',
	        value: function addNode(name, path, canActivate) {
	            this.rootNode.addNode(name, path);
	            if (canActivate) this._canAct[name] = canActivate;
	            return this;
	        }
	    }, {
	        key: 'usePlugin',
	        value: function usePlugin(pluginFactory) {
	            var _this2 = this;
	
	            ifNot(typeof pluginFactory === 'function', '[router5.usePlugin] Plugins are now functions, see http://router5.github.io/docs/plugins.html.');
	            var plugin = pluginFactory(this);
	            var name = plugin.name || pluginFactory.name;
	            ifNot(name, '[router5.usePlugin] Tried to register an unamed plugin.');
	
	            var pluginMethods = ['onStart', 'onStop', 'onTransitionSuccess', 'onTransitionStart', 'onTransitionError', 'onTransitionCancel'];
	            var defined = pluginMethods.some(function (method) {
	                return plugin[method] !== undefined;
	            });
	
	            ifNot(defined, '[router5.usePlugin] plugin ' + plugin.name + ' has none of the expected methods implemented');
	            this.registeredPlugins[name] = plugin;
	
	            pluginMethods.forEach(function (method) {
	                if (plugin[method]) {
	                    _this2._addListener(method.toLowerCase().replace(/^on/, '$$').replace(/transition/, '$$'), plugin[method]);
	                }
	            });
	
	            return this;
	        }
	
	        /**
	         * Set a transition middleware function `.useMiddleware(fn1, fn2, fn3, ...)`
	         * @param {Function} fn The middleware function
	         */
	
	    }, {
	        key: 'useMiddleware',
	        value: function useMiddleware() {
	            var _this3 = this;
	
	            this.mware = Array.prototype.slice.call(arguments).map(function (m) {
	                var middlewareFn = m(_this3);
	                ifNot(typeof middlewareFn === 'function', '[router5.usePlugin] Middleware have changed, see http://router5.github.io/docs/middleware.html.');
	                return middlewareFn;
	            });
	            return this;
	        }
	
	        /**
	         * Start the router
	         * @param  {String|Object} [startPathOrState] An optional start path or state
	         *                                            (use it for universal applications)
	         * @param  {Function}      [done]             An optional callback which will be called
	         *                                            when starting is done
	         * @return {Router5}  The router instance
	         */
	
	    }, {
	        key: 'start',
	        value: function start() {
	            var _this4 = this;
	
	            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	                args[_key] = arguments[_key];
	            }
	
	            var lastArg = args.slice(-1)[0];
	            var done = lastArg instanceof Function ? lastArg : noop;
	            var startPath = undefined,
	                startState = undefined;
	
	            if (this.started) {
	                done({ code: _constants2.default.ROUTER_ALREADY_STARTED });
	                return this;
	            }
	
	            this.started = true;
	            this._invokeListeners('$start');
	            var opts = this.options;
	
	            if (args.length > 0) {
	                if (typeof args[0] === 'string') startPath = args[0];
	                if (_typeof(args[0]) === 'object') startState = args[0];
	            }
	
	            // callback
	            var cb = function cb(err, state) {
	                var invokeErrCb = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
	
	                if (!err) _this4._invokeListeners('$$success', state, null, { replace: true });
	                if (err && invokeErrCb) _this4._invokeListeners('$$error', state, null, err);
	                done(err, state);
	            };
	
	            // Get start path
	            if (startPath === undefined && startState === undefined && this.getLocation) {
	                startPath = this.getLocation();
	            }
	
	            if (!startState) {
	                (function () {
	                    // If no supplied start state, get start state
	                    startState = startPath === undefined ? null : _this4.matchPath(startPath);
	                    // Navigate to default function
	                    var navigateToDefault = function navigateToDefault() {
	                        return _this4.navigate(opts.defaultRoute, opts.defaultParams, { replace: true }, done);
	                    };
	                    var redirect = function redirect(route) {
	                        return _this4.navigate(route.name, route.params, { replace: true, reload: true }, done);
	                    };
	                    // If matched start path
	                    if (startState) {
	                        _this4.lastStateAttempt = startState;
	                        _this4._transition(_this4.lastStateAttempt, _this4.lastKnownState, {}, function (err, state) {
	                            if (!err) cb(null, state);else if (err.redirect) redirect(err.redirect);else if (opts.defaultRoute) navigateToDefault();else cb(err, null, false);
	                        });
	                    } else if (opts.defaultRoute) {
	                        // If default, navigate to default
	                        navigateToDefault();
	                    } else {
	                        // No start match, no default => do nothing
	                        cb({ code: _constants2.default.ROUTE_NOT_FOUND, path: startPath }, null);
	                    }
	                })();
	            } else {
	                // Initialise router with provided start state
	                this.lastKnownState = startState;
	                done(null, startState);
	            }
	
	            return this;
	        }
	
	        /**
	         * Stop the router
	         * @return {Router5} The router instance
	         */
	
	    }, {
	        key: 'stop',
	        value: function stop() {
	            if (!this.started) return this;
	            this.lastKnownState = null;
	            this.lastStateAttempt = null;
	            this.started = false;
	            this._invokeListeners('$stop');
	
	            return this;
	        }
	
	        /**
	         * Return the current state object
	         * @return {Object} The current state
	         */
	
	    }, {
	        key: 'getState',
	        value: function getState() {
	            return this.lastKnownState;
	        }
	
	        /**
	         * Whether or not the given route name with specified params is active.
	         * @param  {String}   name             The route name
	         * @param  {Object}   [params={}]      The route parameters
	         * @param  {Boolean}  [strictEquality=false] If set to false (default), isActive will return true
	         *                                           if the provided route name and params are descendants
	         *                                           of the active state.
	         * @param  {Boolean}   [ignoreQueryParams=true] Whether or not to ignore URL query parameters when
	         *                                              comparing the two states together.
	         *                                              query parameters when comparing two states together.
	         * @return {Boolean}                    Whether nor not the route is active
	         */
	
	    }, {
	        key: 'isActive',
	        value: function isActive(name) {
	            var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	            var strictEquality = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
	            var ignoreQueryParams = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];
	
	            var activeState = this.getState();
	
	            if (!activeState) return false;
	
	            if (strictEquality || activeState.name === name) {
	                return this.areStatesEqual(makeState(name, params), activeState, ignoreQueryParams);
	            }
	
	            return this.areStatesDescendants(makeState(name, params), activeState);
	        }
	
	        /**
	         * @private
	         */
	
	    }, {
	        key: 'areStatesEqual',
	        value: function areStatesEqual(state1, state2) {
	            var _this5 = this;
	
	            var ignoreQueryParams = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
	
	            if (state1.name !== state2.name) return false;
	
	            var getUrlParams = function getUrlParams(name) {
	                return _this5.rootNode.getSegmentsByName(name).map(function (segment) {
	                    return segment.parser[ignoreQueryParams ? 'urlParams' : 'params'];
	                }).reduce(function (params, p) {
	                    return params.concat(p);
	                }, []);
	            };
	
	            var state1Params = getUrlParams(state1.name);
	            var state2Params = getUrlParams(state2.name);
	
	            return state1Params.length === state2Params.length && state1Params.every(function (p) {
	                return state1.params[p] === state2.params[p];
	            });
	        }
	
	        /**
	         * Whether two states are descendants
	         * @param  {Object} parentState The parent state
	         * @param  {Object} childState  The child state
	         * @return {Boolean}            Whether the two provided states are related
	         */
	
	    }, {
	        key: 'areStatesDescendants',
	        value: function areStatesDescendants(parentState, childState) {
	            var regex = new RegExp('^' + parentState.name + '\\.(.*)$');
	            if (!regex.test(childState.name)) return false;
	            // If child state name extends parent state name, and all parent state params
	            // are in child state params.
	            return Object.keys(parentState.params).every(function (p) {
	                return parentState.params[p] === childState.params[p];
	            });
	        }
	
	        /**
	         * @private
	         */
	
	    }, {
	        key: '_invokeListeners',
	        value: function _invokeListeners(name) {
	            for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	                args[_key2 - 1] = arguments[_key2];
	            }
	
	            (this._cbs[name] || []).forEach(function (cb) {
	                return cb.apply(undefined, args);
	            });
	        }
	
	        /**
	         * @private
	         */
	
	    }, {
	        key: '_addListener',
	        value: function _addListener(name, cb) {
	            this._cbs[name] = (this._cbs[name] || []).concat(cb);
	            return this;
	        }
	
	        /**
	         * A function to determine whether or not a segment can be deactivated.
	         * @param  {String}  name          The route segment full name
	         * @param  {Boolean} canDeactivate Whether the segment can be deactivated or not
	         * @return {[type]}
	         */
	
	    }, {
	        key: 'canDeactivate',
	        value: function canDeactivate(name, _canDeactivate) {
	            this._canDeact[name] = toFunction(_canDeactivate);
	            return this;
	        }
	
	        /**
	         * A function to determine whether or not a segment can be activated.
	         * @param  {String}   name        The route name to register the canActivate method for
	         * @param  {Function} canActivate The canActivate function. It should return `true`, `false`
	         *                                or a promise
	         * @return {Router5}  The router instance
	         */
	
	    }, {
	        key: 'canActivate',
	        value: function canActivate(name, _canActivate) {
	            this._canAct[name] = toFunction(_canActivate);
	            return this;
	        }
	
	        /**
	         * Generates an URL from a route name and route params.
	         * The generated URL will be prefixed by hash if useHash is set to true
	         * @param  {String} route  The route name
	         * @param  {Object} params The route params (key-value pairs)
	         * @return {String}        The built URL
	         */
	
	    }, {
	        key: 'buildUrl',
	        value: function buildUrl(route, params) {
	            return this._buildUrl(this.buildPath(route, params));
	        }
	
	        /**
	         * @private
	         */
	
	    }, {
	        key: '_buildUrl',
	        value: function _buildUrl(path) {
	            return (this.options.base || '') + (this.options.useHash ? '#' + this.options.hashPrefix : '') + path;
	        }
	
	        /**
	         * Build a path from a route name and route params
	         * The generated URL will be prefixed by hash if useHash is set to true
	         * @param  {String} route  The route name
	         * @param  {Object} params The route params (key-value pairs)
	         * @return {String}        The built Path
	         */
	
	    }, {
	        key: 'buildPath',
	        value: function buildPath(route, params) {
	            return this.rootNode.buildPath(route, params);
	        }
	
	        /**
	         * Build a state object from a route name and route params
	         * @param  {String} route  The route name
	         * @param  {Object} params The route params (key-value pairs)
	         * @return {String}        The built Path
	         */
	
	    }, {
	        key: 'buildState',
	        value: function buildState(route, params) {
	            return this.rootNode.buildState(route, params);
	        }
	
	        /**
	         * Match a path against the route tree.
	         * @param  {String} path   The path to match
	         * @return {Object}        The matched state object (null if no match)
	         */
	
	    }, {
	        key: 'matchPath',
	        value: function matchPath(path) {
	            var _options = this.options;
	            var trailingSlash = _options.trailingSlash;
	            var strictQueryParams = _options.strictQueryParams;
	
	            var match = this.rootNode.matchPath(path, { trailingSlash: trailingSlash, strictQueryParams: strictQueryParams });
	            return match ? makeState(match.name, match.params, path, match._meta) : null;
	        }
	
	        /**
	         * Parse / extract a path from an url
	         * @param  {String} url The URL
	         * @return {String}     The extracted path
	         */
	
	    }, {
	        key: 'urlToPath',
	        value: function urlToPath(url) {
	            var match = url.match(/^(?:http|https)\:\/\/(?:[0-9a-z_\-\.\:]+?)(?=\/)(.*)$/);
	            var path = match ? match[1] : url;
	
	            var pathParts = path.match(/^(.+?)(#.+?)?(\?.+)?$/);
	
	            if (!pathParts) throw new Error('[router5] Could not parse url ' + url);
	
	            var pathname = pathParts[1];
	            var hash = pathParts[2] || '';
	            var search = pathParts[3] || '';
	            var opts = this.options;
	
	            return (opts.useHash ? hash.replace(new RegExp('^#' + opts.hashPrefix), '') : opts.base ? pathname.replace(new RegExp('^' + opts.base), '') : pathname) + search;
	        }
	
	        /**
	         * Parse path from an url and match it against the route tree.
	         * @param  {String} url    The URL to match
	         * @return {Object}        The matched state object (null if no match)
	         */
	
	    }, {
	        key: 'matchUrl',
	        value: function matchUrl(url) {
	            return this.matchPath(this.urlToPath(url));
	        }
	
	        /**
	         * @private
	         */
	
	    }, {
	        key: '_transition',
	        value: function _transition(toState, fromState) {
	            var _this6 = this;
	
	            var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	            var done = arguments.length <= 3 || arguments[3] === undefined ? noop : arguments[3];
	
	            // Cancel current transition
	            this.cancel();
	            this._invokeListeners('$$start', toState, fromState);
	
	            var tr = (0, _transition3.default)(this, toState, fromState, options, function (err, state) {
	                state = state || toState;
	                _this6._tr = null;
	
	                if (err) {
	                    if (err.code === _constants2.default.TRANSITION_CANCELLED) _this6._invokeListeners('$$cancel', toState, fromState);else _this6._invokeListeners('$$error', toState, fromState, err);
	
	                    done(err);
	                    return;
	                }
	
	                _this6.lastKnownState = state; // toState or modified state?
	
	                done(null, state);
	            });
	
	            this._tr = tr;
	            return function () {
	                return !tr || tr();
	            };
	        }
	
	        /**
	         * Undocumented for now
	         * @private
	         */
	
	    }, {
	        key: 'cancel',
	        value: function cancel() {
	            if (this._tr) this._tr();
	        }
	
	        /**
	         * Navigate to a specific route
	         * @param  {String}   name        The route name
	         * @param  {Object}   [params={}] The route params
	         * @param  {Object}   [opts={}]   The route options (replace, reload)
	         * @param  {Function} done        A optional callback(err) to call when transition has been performed
	         *                                either successfully or unsuccessfully.
	         * @return {Function}             A cancellation function
	         */
	
	    }, {
	        key: 'navigate',
	        value: function navigate(name) {
	            var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	            var _this7 = this;
	
	            var opts = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	            var done = arguments.length <= 3 || arguments[3] === undefined ? noop : arguments[3];
	
	            if (!this.started) {
	                done({ code: _constants2.default.ROUTER_NOT_STARTED });
	                return;
	            }
	
	            var toState = this.buildState(name, params);
	
	            if (!toState) {
	                var err = { code: _constants2.default.ROUTE_NOT_FOUND };
	                done(err);
	                this._invokeListeners('$$error', null, this.lastKnownState, err);
	                return;
	            }
	
	            toState.path = this.buildPath(name, params);
	            this.lastStateAttempt = toState;
	            var sameStates = this.lastKnownState ? this.areStatesEqual(this.lastKnownState, this.lastStateAttempt, false) : false;
	
	            // Do not proceed further if states are the same and no reload
	            // (no desactivation and no callbacks)
	            if (sameStates && !opts.reload) {
	                var err = { code: _constants2.default.SAME_STATES };
	                done(err);
	                this._invokeListeners('$$error', toState, this.lastKnownState, err);
	                return;
	            }
	
	            var fromState = sameStates ? null : this.lastKnownState;
	
	            // Transition and amend history
	            return this._transition(toState, sameStates ? null : this.lastKnownState, opts, function (err, state) {
	                if (err) {
	                    if (err.redirect) _this7.navigate(err.redirect.name, err.redirect.params, { reload: true }, done);else done(err);
	                    return;
	                }
	
	                _this7._invokeListeners('$$success', state, fromState, opts);
	                done(null, state);
	            });
	        }
	    }]);
	
	    return Router5;
	})();
	
	exports.default = Router5;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _pathParser = __webpack_require__(25);
	
	var _pathParser2 = _interopRequireDefault(_pathParser);
	
	var _searchParams = __webpack_require__(26);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var noop = function noop() {};
	
	var RouteNode = function () {
	    function RouteNode() {
	        var name = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	        var path = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
	        var childRoutes = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];
	        var cb = arguments[3];
	
	        _classCallCheck(this, RouteNode);
	
	        this.name = name;
	        this.path = path;
	        this.parser = path ? new _pathParser2.default(path) : null;
	        this.children = [];
	
	        this.add(childRoutes, cb);
	
	        return this;
	    }
	
	    _createClass(RouteNode, [{
	        key: 'setPath',
	        value: function setPath() {
	            var path = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	
	            this.path = path;
	            this.parser = path ? new _pathParser2.default(path) : null;
	        }
	    }, {
	        key: 'add',
	        value: function add(route) {
	            var _this = this;
	
	            var cb = arguments.length <= 1 || arguments[1] === undefined ? noop : arguments[1];
	
	            var originalRoute = void 0;
	            if (route === undefined || route === null) return;
	
	            if (route instanceof Array) {
	                route.forEach(function (r) {
	                    return _this.add(r, cb);
	                });
	                return;
	            }
	
	            if (!(route instanceof RouteNode) && !(route instanceof Object)) {
	                throw new Error('RouteNode.add() expects routes to be an Object or an instance of RouteNode.');
	            }
	            if (route instanceof Object) {
	                if (!route.name || !route.path) {
	                    throw new Error('RouteNode.add() expects routes to have a name and a path defined.');
	                }
	                originalRoute = route;
	                route = new RouteNode(route.name, route.path, route.children, cb);
	            }
	
	            var names = route.name.split('.');
	
	            if (names.length === 1) {
	                // Check duplicated routes
	                if (this.children.map(function (child) {
	                    return child.name;
	                }).indexOf(route.name) !== -1) {
	                    throw new Error('Alias "' + route.name + '" is already defined in route node');
	                }
	
	                // Check duplicated paths
	                if (this.children.map(function (child) {
	                    return child.path;
	                }).indexOf(route.path) !== -1) {
	                    throw new Error('Path "' + route.path + '" is already defined in route node');
	                }
	
	                this.children.push(route);
	                // Push greedy spats to the bottom of the pile
	                this.children.sort(function (left, right) {
	                    var leftPath = left.path.split('?')[0].replace(/(.+)\/$/, '$1');
	                    var rightPath = right.path.split('?')[0].replace(/(.+)\/$/, '$1');
	                    // '/' last
	                    if (leftPath === '/') return 1;
	                    if (rightPath === '/') return -1;
	                    // Spat params last
	                    if (left.parser.hasSpatParam) return 1;
	                    if (right.parser.hasSpatParam) return -1;
	                    // No spat, number of segments (less segments last)
	                    var leftSegments = (leftPath.match(/\//g) || []).length;
	                    var rightSegments = (rightPath.match(/\//g) || []).length;
	                    if (leftSegments < rightSegments) return 1;
	                    if (leftSegments > rightSegments) return -1;
	                    // Same number of segments, number of URL params ascending
	                    var leftParamsCount = left.parser.urlParams.length;
	                    var rightParamsCount = right.parser.urlParams.length;
	                    if (leftParamsCount < rightParamsCount) return -1;
	                    if (leftParamsCount > rightParamsCount) return 1;
	                    // Same number of segments and params, last segment length descending
	                    var leftParamLength = (leftPath.split('/').slice(-1)[0] || '').length;
	                    var rightParamLength = (rightPath.split('/').slice(-1)[0] || '').length;
	                    if (leftParamLength < rightParamLength) return 1;
	                    if (leftParamLength > rightParamLength) return -1;
	                    // Same last segment length, preserve definition order
	                    return 0;
	                });
	            } else {
	                // Locate parent node
	                var segments = this.getSegmentsByName(names.slice(0, -1).join('.'));
	                if (segments) {
	                    segments[segments.length - 1].add(new RouteNode(names[names.length - 1], route.path, route.children));
	                } else {
	                    throw new Error('Could not add route named \'' + route.name + '\', parent is missing.');
	                }
	            }
	
	            if (originalRoute) cb(originalRoute);
	
	            return this;
	        }
	    }, {
	        key: 'addNode',
	        value: function addNode(name, params) {
	            this.add(new RouteNode(name, params));
	            return this;
	        }
	    }, {
	        key: 'getSegmentsByName',
	        value: function getSegmentsByName(routeName) {
	            var findSegmentByName = function findSegmentByName(name, routes) {
	                var filteredRoutes = routes.filter(function (r) {
	                    return r.name === name;
	                });
	                return filteredRoutes.length ? filteredRoutes[0] : undefined;
	            };
	            var segments = [];
	            var routes = this.parser ? [this] : this.children;
	            var names = (this.parser ? [''] : []).concat(routeName.split('.'));
	
	            var matched = names.every(function (name) {
	                var segment = findSegmentByName(name, routes);
	                if (segment) {
	                    routes = segment.children;
	                    segments.push(segment);
	                    return true;
	                }
	                return false;
	            });
	
	            return matched ? segments : null;
	        }
	    }, {
	        key: 'getSegmentsMatchingPath',
	        value: function getSegmentsMatchingPath(path, options) {
	            var trailingSlash = options.trailingSlash;
	            var strictQueryParams = options.strictQueryParams;
	
	            var matchChildren = function matchChildren(nodes, pathSegment, segments) {
	                var isRoot = nodes.length === 1 && nodes[0].name === '';
	                // for (child of node.children) {
	
	                var _loop = function _loop(i) {
	                    var child = nodes[i];
	                    // Partially match path
	                    var match = child.parser.partialMatch(pathSegment);
	                    var remainingPath = void 0;
	
	                    if (!match && trailingSlash) {
	                        // Try with optional trailing slash
	                        match = child.parser.match(pathSegment, true);
	                        remainingPath = '';
	                    } else if (match) {
	                        // Remove consumed segment from path
	                        var consumedPath = child.parser.build(match, { ignoreSearch: true });
	                        remainingPath = pathSegment.replace(consumedPath, '');
	                        var search = (0, _searchParams.omit)((0, _searchParams.getSearch)(pathSegment.replace(consumedPath, '')), child.parser.queryParams.concat(child.parser.queryParamsBr));
	                        remainingPath = (0, _searchParams.getPath)(remainingPath) + (search ? '?' + search : '');
	
	                        if (trailingSlash && !isRoot && remainingPath === '/' && !/\/$/.test(consumedPath)) {
	                            remainingPath = '';
	                        }
	                    }
	
	                    if (match) {
	                        segments.push(child);
	                        Object.keys(match).forEach(function (param) {
	                            return segments.params[param] = match[param];
	                        });
	
	                        if (!isRoot && !remainingPath.length) {
	                            // fully matched
	                            return {
	                                v: segments
	                            };
	                        }
	                        if (!isRoot && !strictQueryParams && remainingPath.indexOf('?') === 0) {
	                            // unmatched queryParams in non strict mode
	                            var remainingQueryParams = (0, _searchParams.parse)(remainingPath.slice(1));
	
	                            remainingQueryParams.forEach(function (_ref) {
	                                var name = _ref.name;
	                                var value = _ref.value;
	                                return segments.params[name] = value;
	                            });
	                            return {
	                                v: segments
	                            };
	                        }
	                        // If no children to match against but unmatched path left
	                        if (!child.children.length) {
	                            return {
	                                v: null
	                            };
	                        }
	                        // Else: remaining path and children
	                        return {
	                            v: matchChildren(child.children, remainingPath, segments)
	                        };
	                    }
	                };
	
	                for (var i in nodes) {
	                    var _ret = _loop(i);
	
	                    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	                }
	
	                return null;
	            };
	
	            var startingNodes = this.parser ? [this] : this.children;
	            var segments = [];
	            segments.params = {};
	
	            var matched = matchChildren(startingNodes, path, segments);
	            if (matched && matched.length === 1 && matched[0].name === '') return null;
	            return matched;
	        }
	    }, {
	        key: 'getPathFromSegments',
	        value: function getPathFromSegments(segments) {
	            return segments ? segments.map(function (segment) {
	                return segment.path;
	            }).join('') : null;
	        }
	    }, {
	        key: 'getPath',
	        value: function getPath(routeName) {
	            return this.getPathFromSegments(this.getSegmentsByName(routeName));
	        }
	    }, {
	        key: 'buildPathFromSegments',
	        value: function buildPathFromSegments(segments) {
	            var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	            if (!segments) return null;
	
	            var searchParams = segments.filter(function (s) {
	                return s.parser.hasQueryParams;
	            }).reduce(function (params, s) {
	                return params.concat(s.parser.queryParams).concat(s.parser.queryParamsBr.map(function (p) {
	                    return p + '[]';
	                }));
	            }, []);
	
	            var searchPart = !searchParams.length ? null : searchParams.filter(function (p) {
	                if (Object.keys(params).indexOf((0, _searchParams.withoutBrackets)(p)) === -1) {
	                    return false;
	                }
	
	                var val = params[(0, _searchParams.withoutBrackets)(p)];
	
	                return val !== undefined && val !== null;
	            }).map(function (p) {
	                var val = params[(0, _searchParams.withoutBrackets)(p)];
	                var encodedVal = Array.isArray(val) ? val.map(encodeURIComponent) : encodeURIComponent(val);
	
	                return _pathParser2.default.serialise(p, encodedVal);
	            }).join('&');
	
	            return segments.map(function (segment) {
	                return segment.parser.build(params, { ignoreSearch: true });
	            }).join('') + (searchPart ? '?' + searchPart : '');
	        }
	    }, {
	        key: 'getMetaFromSegments',
	        value: function getMetaFromSegments(segments) {
	            var accName = '';
	
	            return segments.reduce(function (meta, segment) {
	                var urlParams = segment.parser.urlParams.reduce(function (params, p) {
	                    params[p] = 'url';
	                    return params;
	                }, {});
	
	                var allParams = segment.parser.queryParams.reduce(function (params, p) {
	                    params[p] = 'query';
	                    return params;
	                }, urlParams);
	
	                if (segment.name !== undefined) {
	                    accName = accName ? accName + '.' + segment.name : segment.name;
	                    meta[accName] = allParams;
	                }
	                return meta;
	            }, {});
	        }
	    }, {
	        key: 'buildPath',
	        value: function buildPath(routeName) {
	            var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	            return this.buildPathFromSegments(this.getSegmentsByName(routeName), params);
	        }
	    }, {
	        key: 'buildStateFromSegments',
	        value: function buildStateFromSegments(segments) {
	            if (!segments || !segments.length) return null;
	
	            var name = segments.map(function (segment) {
	                return segment.name;
	            }).filter(function (name) {
	                return name;
	            }).join('.');
	            var params = segments.params;
	
	            return {
	                name: name,
	                params: params,
	                _meta: this.getMetaFromSegments(segments)
	            };
	        }
	    }, {
	        key: 'buildState',
	        value: function buildState(name) {
	            var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	            var segments = this.getSegmentsByName(name);
	            if (!segments || !segments.length) return null;
	
	            return {
	                name: name,
	                params: params,
	                _meta: this.getMetaFromSegments(segments)
	            };
	        }
	    }, {
	        key: 'matchPath',
	        value: function matchPath(path, options) {
	            var defaultOptions = { trailingSlash: false, strictQueryParams: true };
	            options = _extends({}, defaultOptions, options);
	            return this.buildStateFromSegments(this.getSegmentsMatchingPath(path, options));
	        }
	    }]);
	
	    return RouteNode;
	}();
	
	exports.default = RouteNode;
	module.exports = exports['default'];


/***/ }),
/* 25 */
/***/ (function(module, exports) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var defaultOrConstrained = function defaultOrConstrained(match) {
	    return '(' + (match ? match.replace(/(^<|>$)/g, '') : '[a-zA-Z0-9-_.~%]+') + ')';
	};
	
	var rules = [{
	    // An URL can contain a parameter :paramName
	    // - and _ are allowed but not in last position
	    name: 'url-parameter',
	    pattern: /^:([a-zA-Z0-9-_]*[a-zA-Z0-9]{1})(<(.+?)>)?/,
	    regex: function regex(match) {
	        return new RegExp(defaultOrConstrained(match[2]));
	    }
	}, {
	    // Url parameter (splat)
	    name: 'url-parameter-splat',
	    pattern: /^\*([a-zA-Z0-9-_]*[a-zA-Z0-9]{1})/,
	    regex: /([^\?]*)/
	}, {
	    name: 'url-parameter-matrix',
	    pattern: /^\;([a-zA-Z0-9-_]*[a-zA-Z0-9]{1})(<(.+?)>)?/,
	    regex: function regex(match) {
	        return new RegExp(';' + match[1] + '=' + defaultOrConstrained(match[2]));
	    }
	}, {
	    // Query parameter: ?param1&param2
	    //                   ?:param1&:param2
	    name: 'query-parameter-bracket',
	    pattern: /^(?:\?|&)(?:\:)?([a-zA-Z0-9-_]*[a-zA-Z0-9]{1})(?:\[\])/
	}, // regex:   match => new RegExp('(?=(\?|.*&)' + match[0] + '(?=(\=|&|$)))')
	{
	    // Query parameter: ?param1&param2
	    //                   ?:param1&:param2
	    name: 'query-parameter',
	    pattern: /^(?:\?|&)(?:\:)?([a-zA-Z0-9-_]*[a-zA-Z0-9]{1})/
	}, // regex:   match => new RegExp('(?=(\?|.*&)' + match[0] + '(?=(\=|&|$)))')
	{
	    // Delimiter /
	    name: 'delimiter',
	    pattern: /^(\/|\?)/,
	    regex: function regex(match) {
	        return new RegExp('\\' + match[0]);
	    }
	}, {
	    // Sub delimiters
	    name: 'sub-delimiter',
	    pattern: /^(\!|\&|\-|_|\.|;)/,
	    regex: function regex(match) {
	        return new RegExp(match[0]);
	    }
	}, {
	    // Unmatched fragment (until delimiter is found)
	    name: 'fragment',
	    pattern: /^([0-9a-zA-Z]+)/,
	    regex: function regex(match) {
	        return new RegExp(match[0]);
	    }
	}];
	
	var tokenise = function tokenise(str) {
	    var tokens = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
	
	    // Look for a matching rule
	    var matched = rules.some(function (rule) {
	        var match = str.match(rule.pattern);
	        if (!match) return false;
	
	        tokens.push({
	            type: rule.name,
	            match: match[0],
	            val: match.slice(1, 2),
	            otherVal: match.slice(2),
	            regex: rule.regex instanceof Function ? rule.regex(match) : rule.regex
	        });
	
	        if (match[0].length < str.length) tokens = tokenise(str.substr(match[0].length), tokens);
	        return true;
	    });
	
	    // If no rules matched, throw an error (possible malformed path)
	    if (!matched) {
	        throw new Error('Could not parse path.');
	    }
	    // Return tokens
	    return tokens;
	};
	
	var optTrailingSlash = function optTrailingSlash(source, trailingSlash) {
	    if (!trailingSlash) return source;
	    return source.replace(/\\\/$/, '') + '(?:\\/)?';
	};
	
	var withoutBrackets = function withoutBrackets(param) {
	    return param.replace(/\[\]$/, '');
	};
	
	var appendQueryParam = function appendQueryParam(params, param) {
	    var val = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];
	
	    if (/\[\]$/.test(param)) {
	        param = withoutBrackets(param);
	        val = [val];
	    }
	    var existingVal = params[param];
	
	    if (existingVal === undefined) params[param] = val;else params[param] = Array.isArray(existingVal) ? existingVal.concat(val) : [existingVal, val];
	
	    return params;
	};
	
	var parseQueryParams = function parseQueryParams(path) {
	    var searchPart = path.split('?')[1];
	    if (!searchPart) return {};
	
	    return searchPart.split('&').map(function (_) {
	        return _.split('=');
	    }).reduce(function (obj, m) {
	        return appendQueryParam(obj, m[0], m[1] ? decodeURIComponent(m[1]) : m[1]);
	    }, {});
	};
	
	var toSerialisable = function toSerialisable(val) {
	    return val !== undefined && val !== null && val !== '' ? '=' + val : '';
	};
	
	var _serialise = function _serialise(key, val) {
	    return Array.isArray(val) ? val.map(function (v) {
	        return _serialise(key, v);
	    }).join('&') : key + toSerialisable(val);
	};
	
	var Path = (function () {
	    _createClass(Path, null, [{
	        key: 'createPath',
	        value: function createPath(path) {
	            return new Path(path);
	        }
	    }, {
	        key: 'serialise',
	        value: function serialise(key, val) {
	            return _serialise(key, val);
	        }
	    }]);
	
	    function Path(path) {
	        _classCallCheck(this, Path);
	
	        if (!path) throw new Error('Please supply a path');
	        this.path = path;
	        this.tokens = tokenise(path);
	
	        this.hasUrlParams = this.tokens.filter(function (t) {
	            return (/^url-parameter/.test(t.type)
	            );
	        }).length > 0;
	        this.hasSpatParam = this.tokens.filter(function (t) {
	            return (/splat$/.test(t.type)
	            );
	        }).length > 0;
	        this.hasMatrixParams = this.tokens.filter(function (t) {
	            return (/matrix$/.test(t.type)
	            );
	        }).length > 0;
	        this.hasQueryParams = this.tokens.filter(function (t) {
	            return (/^query-parameter/.test(t.type)
	            );
	        }).length > 0;
	        // Extract named parameters from tokens
	        this.urlParams = !this.hasUrlParams ? [] : this.tokens.filter(function (t) {
	            return (/^url-parameter/.test(t.type)
	            );
	        }).map(function (t) {
	            return t.val.slice(0, 1);
	        })
	        // Flatten
	        .reduce(function (r, v) {
	            return r.concat(v);
	        });
	        // Query params
	        this.queryParams = !this.hasQueryParams ? [] : this.tokens.filter(function (t) {
	            return t.type === 'query-parameter';
	        }).map(function (t) {
	            return t.val;
	        }).reduce(function (r, v) {
	            return r.concat(v);
	        }, []);
	
	        this.queryParamsBr = !this.hasQueryParams ? [] : this.tokens.filter(function (t) {
	            return (/-bracket$/.test(t.type)
	            );
	        }).map(function (t) {
	            return t.val;
	        }).reduce(function (r, v) {
	            return r.concat(v);
	        }, []);
	
	        this.params = this.urlParams.concat(this.queryParams).concat(this.queryParamsBr);
	        // Check if hasQueryParams
	        // Regular expressions for url part only (full and partial match)
	        this.source = this.tokens.filter(function (t) {
	            return t.regex !== undefined;
	        }).map(function (r) {
	            return r.regex.source;
	        }).join('');
	    }
	
	    _createClass(Path, [{
	        key: '_urlMatch',
	        value: function _urlMatch(path, regex) {
	            var _this = this;
	
	            var match = path.match(regex);
	            if (!match) return null;else if (!this.urlParams.length) return {};
	            // Reduce named params to key-value pairs
	            return match.slice(1, this.urlParams.length + 1).reduce(function (params, m, i) {
	                params[_this.urlParams[i]] = decodeURIComponent(m);
	                return params;
	            }, {});
	        }
	    }, {
	        key: 'match',
	        value: function match(path) {
	            var _this2 = this;
	
	            var trailingSlash = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	
	            // trailingSlash: falsy => non optional, truthy => optional
	            var source = optTrailingSlash(this.source, trailingSlash);
	            // Check if exact match
	            var matched = this._urlMatch(path, new RegExp('^' + source + (this.hasQueryParams ? '(\\?.*$|$)' : '$')));
	            // If no match, or no query params, no need to go further
	            if (!matched || !this.hasQueryParams) return matched;
	            // Extract query params
	            var queryParams = parseQueryParams(path);
	            var unexpectedQueryParams = Object.keys(queryParams).filter(function (p) {
	                return _this2.queryParams.concat(_this2.queryParamsBr).indexOf(p) === -1;
	            });
	
	            if (unexpectedQueryParams.length === 0) {
	                // Extend url match
	                Object.keys(queryParams).forEach(function (p) {
	                    return matched[p] = queryParams[p];
	                });
	
	                return matched;
	            }
	
	            return null;
	        }
	    }, {
	        key: 'partialMatch',
	        value: function partialMatch(path) {
	            var _this3 = this;
	
	            var trailingSlash = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	
	            // Check if partial match (start of given path matches regex)
	            // trailingSlash: falsy => non optional, truthy => optional
	            var source = optTrailingSlash(this.source, trailingSlash);
	            var match = this._urlMatch(path, new RegExp('^' + source));
	
	            if (!match) return match;
	
	            if (!this.hasQueryParams) return match;
	
	            var queryParams = parseQueryParams(path);
	
	            Object.keys(queryParams).filter(function (p) {
	                return _this3.queryParams.concat(_this3.queryParamsBr).indexOf(p) >= 0;
	            }).forEach(function (p) {
	                return appendQueryParam(match, p, queryParams[p]);
	            });
	
	            return match;
	        }
	    }, {
	        key: 'build',
	        value: function build() {
	            var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	            var opts = arguments.length <= 1 || arguments[1] === undefined ? { ignoreConstraints: false, ignoreSearch: false } : arguments[1];
	
	            var encodedParams = Object.keys(params).reduce(function (acc, key) {
	                // Use encodeURI in case of spats
	                if (params[key] === undefined) {
	                    acc[key] = undefined;
	                } else {
	                    acc[key] = Array.isArray(params[key]) ? params[key].map(encodeURI) : encodeURI(params[key]);
	                }
	                return acc;
	            }, {});
	            // Check all params are provided (not search parameters which are optional)
	            if (this.urlParams.some(function (p) {
	                return params[p] === undefined;
	            })) throw new Error('Missing parameters');
	
	            // Check constraints
	            if (!opts.ignoreConstraints) {
	                var constraintsPassed = this.tokens.filter(function (t) {
	                    return (/^url-parameter/.test(t.type) && !/-splat$/.test(t.type)
	                    );
	                }).every(function (t) {
	                    return new RegExp('^' + defaultOrConstrained(t.otherVal[0]) + '$').test(encodedParams[t.val]);
	                });
	
	                if (!constraintsPassed) throw new Error('Some parameters are of invalid format');
	            }
	
	            var base = this.tokens.filter(function (t) {
	                return (/^query-parameter/.test(t.type) === false
	                );
	            }).map(function (t) {
	                if (t.type === 'url-parameter-matrix') return ';' + t.val + '=' + encodedParams[t.val[0]];
	                return (/^url-parameter/.test(t.type) ? encodedParams[t.val[0]] : t.match
	                );
	            }).join('');
	
	            if (opts.ignoreSearch) return base;
	
	            var queryParams = this.queryParams.concat(this.queryParamsBr.map(function (p) {
	                return p + '[]';
	            }));
	
	            var searchPart = queryParams.filter(function (p) {
	                return Object.keys(encodedParams).indexOf(withoutBrackets(p)) !== -1;
	            }).map(function (p) {
	                return _serialise(p, encodedParams[withoutBrackets(p)]);
	            }).join('&');
	
	            return base + (searchPart ? '?' + searchPart : '');
	        }
	    }]);
	
	    return Path;
	})();
	
	exports.default = Path;
	module.exports = exports['default'];


/***/ }),
/* 26 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// Split path
	var getPath = exports.getPath = function getPath(path) {
	    return path.split('?')[0];
	};
	var getSearch = exports.getSearch = function getSearch(path) {
	    return path.split('?')[1];
	};
	
	// Search param value
	var isSerialisable = function isSerialisable(val) {
	    return val !== undefined && val !== null && val !== '';
	};
	
	// Search param name
	var bracketTest = /\[\]$/;
	var hasBrackets = exports.hasBrackets = function hasBrackets(paramName) {
	    return bracketTest.test(paramName);
	};
	var withoutBrackets = exports.withoutBrackets = function withoutBrackets(paramName) {
	    return paramName.replace(bracketTest, '');
	};
	
	/**
	 * Parse a querystring and return a list of params (Objects with name and value properties)
	 * @param  {String} querystring The querystring to parse
	 * @return {Array[Object]}      The list of params
	 */
	var parse = exports.parse = function parse(querystring) {
	    return querystring.split('&').reduce(function (params, param) {
	        var split = param.split('=');
	        var name = split[0];
	        var value = split[1];
	
	        return params.concat(split.length === 1 ? { name: name, value: true } : { name: name, value: decodeURIComponent(value) });
	    }, []);
	};
	
	/**
	 * Reduce a list of parameters (returned by `.parse()``) to an object (key-value pairs)
	 * @param  {Array} paramList The list of parameters returned by `.parse()`
	 * @return {Object}          The object of parameters (key-value pairs)
	 */
	var toObject = exports.toObject = function toObject(paramList) {
	    return paramList.reduce(function (params, _ref) {
	        var name = _ref.name;
	        var value = _ref.value;
	
	        var isArray = hasBrackets(name);
	        var currentValue = params[withoutBrackets(name)];
	
	        if (currentValue === undefined) {
	            params[withoutBrackets(name)] = isArray ? [value] : value;
	        } else {
	            params[withoutBrackets(name)] = [].concat(currentValue, value);
	        }
	
	        return params;
	    }, {});
	};
	
	/**
	 * Build a querystring from a list of parameters
	 * @param  {Array} paramList The list of parameters (see `.parse()`)
	 * @return {String}          The querystring
	 */
	var build = exports.build = function build(paramList) {
	    return paramList.filter(function (_ref2) {
	        var value = _ref2.value;
	        return value !== undefined && value !== null;
	    }).map(function (_ref3) {
	        var name = _ref3.name;
	        var value = _ref3.value;
	        return value === true ? name : name + '=' + encodeURIComponent(value);
	    }).join('&');
	};
	
	/**
	 * Remove a list of parameters from a querystring
	 * @param  {String} querystring  The original querystring
	 * @param  {Array}  paramsToOmit The parameters to omit
	 * @return {String}              The querystring
	 */
	var omit = exports.omit = function omit(querystring, paramsToOmit) {
	    if (!querystring) return '';
	
	    var remainingQueryParams = parse(querystring).filter(function (_ref4) {
	        var name = _ref4.name;
	        return paramsToOmit.indexOf(withoutBrackets(name)) === -1;
	    });
	    var remainingQueryString = build(remainingQueryParams);
	
	    return remainingQueryString || '';
	};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _router = __webpack_require__(28);
	
	var _router2 = _interopRequireDefault(_router);
	
	var _async = __webpack_require__(29);
	
	var _async2 = _interopRequireDefault(_async);
	
	var _constants = __webpack_require__(30);
	
	var _constants2 = _interopRequireDefault(_constants);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	exports.default = transition;
	
	function transition(router, toState, fromState, options, callback) {
	    var cancelled = false;
	    var additionalArgs = router.getAdditionalArgs();
	    var isCancelled = function isCancelled() {
	        return cancelled;
	    };
	    var cancel = function cancel() {
	        return cancelled = true;
	    };
	    var done = function done(err, state) {
	        if (!err && !isCancelled() && router.options.autoCleanUp) {
	            (function () {
	                var activeSegments = (0, _router.nameToIDs)(toState.name);
	                Object.keys(router._canDeact).forEach(function (name) {
	                    if (activeSegments.indexOf(name) === -1) router._canDeact[name] = undefined;
	                });
	            })();
	        }
	        callback(isCancelled() ? { code: _constants2.default.TRANSITION_CANCELLED } : err, state || toState);
	    };
	    var makeError = function makeError(base, err) {
	        return _extends({}, base, err instanceof Object ? err : { error: err });
	    };
	
	    var _transitionPath = (0, _router2.default)(toState, fromState);
	
	    var toDeactivate = _transitionPath.toDeactivate;
	    var toActivate = _transitionPath.toActivate;
	
	    var asyncBase = { isCancelled: isCancelled, toState: toState, fromState: fromState, additionalArgs: [] };
	
	    var canDeactivate = function canDeactivate(toState, fromState, cb) {
	        var canDeactivateFunctionMap = toDeactivate.filter(function (name) {
	            return router._canDeact[name];
	        }).reduce(function (fnMap, name) {
	            return _extends({}, fnMap, _defineProperty({}, name, router._canDeact[name]));
	        }, {});
	
	        (0, _async2.default)(canDeactivateFunctionMap, _extends({}, asyncBase, { additionalArgs: additionalArgs, errorKey: 'segment' }), function (err) {
	            return cb(err ? makeError({ code: _constants2.default.CANNOT_DEACTIVATE }, err) : null);
	        });
	    };
	
	    var canActivate = function canActivate(toState, fromState, cb) {
	        var canActivateFunctionMap = toActivate.filter(function (name) {
	            return router._canAct[name];
	        }).reduce(function (fnMap, name) {
	            return _extends({}, fnMap, _defineProperty({}, name, router._canAct[name]));
	        }, {});
	
	        (0, _async2.default)(canActivateFunctionMap, _extends({}, asyncBase, { additionalArgs: additionalArgs, errorKey: 'segment' }), function (err) {
	            return cb(err ? makeError({ code: _constants2.default.CANNOT_ACTIVATE }, err) : null);
	        });
	    };
	
	    var middlewareFn = router.mware;
	    var middleware = function middleware(toState, fromState, cb) {
	        var mwareFunction = Array.isArray(router.mware) ? router.mware : [router.mware];
	
	        (0, _async2.default)(mwareFunction, _extends({}, asyncBase, { additionalArgs: additionalArgs }), function (err, state) {
	            return cb(err ? makeError({ code: _constants2.default.TRANSITION_ERR }, err) : null, state || toState);
	        });
	    };
	
	    var pipeline = (fromState && !options.forceDeactivate ? [canDeactivate] : []).concat(canActivate).concat(middlewareFn ? middleware : []);
	
	    (0, _async2.default)(pipeline, asyncBase, done);
	
	    return cancel;
	}

/***/ }),
/* 28 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.nameToIDs = nameToIDs;
	
	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }
	
	function nameToIDs(name) {
	    return name.split('.').reduce(function (ids, name) {
	        return ids.concat(ids.length ? ids[ids.length - 1] + '.' + name : name);
	    }, []);
	}
	
	function extractSegmentParams(name, state) {
	    if (!state._meta || !state._meta[name]) return {};
	
	    return Object.keys(state._meta[name]).reduce(function (params, p) {
	        params[p] = state.params[p];
	        return params;
	    }, {});
	}
	
	function transitionPath(toState, fromState) {
	    var fromStateIds = fromState ? nameToIDs(fromState.name) : [];
	    var toStateIds = nameToIDs(toState.name);
	    var maxI = Math.min(fromStateIds.length, toStateIds.length);
	
	    function pointOfDifference() {
	        var i = undefined;
	
	        var _loop = function _loop() {
	            var left = fromStateIds[i];
	            var right = toStateIds[i];
	
	            if (left !== right) return {
	                    v: i
	                };
	
	            var leftParams = extractSegmentParams(left, toState);
	            var rightParams = extractSegmentParams(right, fromState);
	
	            if (leftParams.length !== rightParams.length) return {
	                    v: i
	                };
	            if (leftParams.length === 0) return 'continue';
	
	            var different = Object.keys(leftParams).some(function (p) {
	                return rightParams[p] !== leftParams[p];
	            });
	            if (different) {
	                return {
	                    v: i
	                };
	            }
	        };
	
	        for (i = 0; i < maxI; i += 1) {
	            var _ret = _loop();
	
	            switch (_ret) {
	                case 'continue':
	                    continue;
	
	                default:
	                    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	            }
	        }
	
	        return i;
	    }
	
	    var i = undefined;
	    if (!fromState) {
	        i = 0;
	    } else if (!fromState || toState.name === fromState.name && (!toState._meta || !fromState._meta)) {
	        console.log('[router5.transition-path] Some states are missing metadata, reloading all segments');
	        i = 0;
	    } else {
	        i = pointOfDifference();
	    }
	
	    var toDeactivate = fromStateIds.slice(i).reverse();
	    var toActivate = toStateIds.slice(i);
	
	    var intersection = fromState && i > 0 ? fromStateIds[i - 1] : '';
	
	    return {
	        intersection: intersection,
	        toDeactivate: toDeactivate,
	        toActivate: toActivate
	    };
	}
	
	exports.default = transitionPath;

/***/ }),
/* 29 */
/***/ (function(module, exports) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = asyncProcess;
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }
	
	function asyncProcess(functions, _ref, callback) {
	    var isCancelled = _ref.isCancelled;
	    var toState = _ref.toState;
	    var fromState = _ref.fromState;
	    var additionalArgs = _ref.additionalArgs;
	    var errorKey = _ref.errorKey;
	
	    var remainingFunctions = Array.isArray(functions) ? functions : Object.keys(functions);
	
	    var isState = function isState(obj) {
	        return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj.name !== undefined && obj.params !== undefined && obj.path !== undefined;
	    };
	    var hasStateChanged = function hasStateChanged(state) {
	        return state.name !== toState.name || state.params !== toState.params || state.path !== toState.path;
	    };
	
	    var processFn = function processFn(done) {
	        if (!remainingFunctions.length) return true;
	
	        var isMapped = typeof remainingFunctions[0] === 'string';
	        var errBase = errorKey && isMapped ? _defineProperty({}, errorKey, remainingFunctions[0]) : {};
	        var stepFn = isMapped ? functions[remainingFunctions[0]] : remainingFunctions[0];
	
	        // const len = stepFn.length;
	        var res = stepFn.apply(null, additionalArgs.concat([toState, fromState, done]));
	
	        if (isCancelled()) {
	            done(null);
	        } else if (typeof res === 'boolean') {
	            done(res ? null : errBase);
	        } else if (res && typeof res.then === 'function') {
	            res.then(function (resVal) {
	                if (resVal instanceof Error) done({ error: resVal }, null);else done(null, resVal);
	            }, function (err) {
	                if (err instanceof Error) {
	                    console.error(err.stack || err);
	                    done(_extends({}, errBase, { promiseError: err }), null);
	                } else {
	                    done((typeof err === 'undefined' ? 'undefined' : _typeof(err)) === 'object' ? _extends({}, errBase, err) : errBase, null);
	                }
	            });
	        }
	        // else: wait for done to be called
	
	        return false;
	    };
	
	    var iterate = function iterate(err, val) {
	        if (err) callback(err);else {
	            if (val && isState(val)) {
	                if (hasStateChanged(val)) console.error('[router5][transition] State values changed during transition process and ignored.');else toState = val;
	            }
	            remainingFunctions = remainingFunctions.slice(1);
	            next();
	        }
	    };
	
	    var next = function next() {
	        if (isCancelled()) {
	            callback(null);
	        } else {
	            var finished = processFn(iterate);
	            if (finished) callback(null, toState);
	        }
	    };
	
	    next();
	}

/***/ }),
/* 30 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var constants = {
	    ROUTER_NOT_STARTED: 'NOT_STARTED',
	    ROUTER_ALREADY_STARTED: 'ALREADY_STARTED',
	    ROUTE_NOT_FOUND: 'ROUTE_NOT_FOUND',
	    SAME_STATES: 'SAME_STATES',
	    CANNOT_DEACTIVATE: 'CANNOT_DEACTIVATE',
	    CANNOT_ACTIVATE: 'CANNOT_ACTIVATE',
	    TRANSITION_ERR: 'TRANSITION_ERR',
	    TRANSITION_CANCELLED: 'CANCELLED'
	};
	
	exports.default = constants;

/***/ }),
/* 31 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/* istanbul ignore next */
	var loggerPlugin = function loggerPlugin() {
	    return function () {
	        var startGroup = function startGroup() {
	            return console.group('Router transition');
	        };
	        var endGroup = function endGroup() {
	            return console.groupEnd('Router transition');
	        };
	
	        return {
	            name: 'LOGGER',
	            onStart: function onStart() {
	                console.info('Router started');
	            },
	            onStop: function onStop() {
	                console.info('Router stopped');
	            },
	            onTransitionStart: function onTransitionStart(toState, fromState) {
	                endGroup();
	                startGroup();
	                console.log('Transition started from state');
	                console.log(fromState);
	                console.log('To state');
	                console.log(toState);
	            },
	            onTransitionCancel: function onTransitionCancel() {
	                console.warn('Transition cancelled');
	            },
	            onTransitionError: function onTransitionError(toState, fromState, err) {
	                console.warn('Transition error with code ' + err.code);
	                endGroup();
	            },
	            onTransitionSuccess: function onTransitionSuccess() {
	                console.log('Transition success');
	                endGroup();
	            }
	        };
	    };
	};
	
	exports.default = loggerPlugin;

/***/ }),
/* 32 */
/***/ (function(module, exports) {

	/**
	 * Code based on page.js
	 * https://github.com/visionmedia/page.js
	 */
	
	'use strict';
	
	module.exports = function(opts, cb) {
	  return function(router) {
	    var clickEvent = document.ontouchstart ? 'touchstart' : 'click';
	    var clickHandler = onClick(router, opts, cb);
	
	    return {
	      name: 'LINK_INTERCEPTOR',
	      onStart: function() {
	        document.addEventListener(clickEvent, clickHandler, false);
	      },
	      onStop: function() {
	        document.removeEventListener(clickEvent, clickHandler);
	      }
	    };
	  };
	};
	
	function merge(object, other) {
	  var merged = {};
	  Object.keys(object || []).forEach(function (key) {
	    merged[key] = object[key];
	  });
	  Object.keys(other || []).forEach(function (key) {
	    merged[key] = other[key];
	  });
	
	  return merged;
	}
	
	function onClick(router, opts, cb) {
	  function which(e) {
	    e = e || window.event;
	    return null === e.which ? e.button : e.which;
	  }
	
	  function getParams(href) {
	    var params = {};
	    var splitHref = href.split('?');
	
	    if (splitHref[1] && splitHref[1].length) {
	      splitHref[1].split('&')
	        .forEach(function(param) {
	          var i = param.indexOf('=');
	
	          if (i === -1 || i === param.length - 1) {
	            params[window.decodeURIComponent(param)] = '';
	            return;
	          }
	
	          var name = window.decodeURIComponent(param.substr(0, i));
	          var value = window.decodeURIComponent(param.substr(i + 1));
	          params[name] = value
	        });
	    }
	
	    return params;
	  }
	
	  return function onclick(e) {
	    if (1 !== which(e)) return;
	
	    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
	    if (e.defaultPrevented) return;
	
	
	    // ensure link
	    var el = e.target;
	    while (el && 'A' !== el.nodeName) el = el.parentNode;
	    if (!el || 'A' !== el.nodeName) return;
	
	
	    // Ignore if tag has
	    // 1. "download" attribute
	    // 2. rel="external" attribute
	    if (el.hasAttribute('download') || el.getAttribute('rel') === 'external') return;
	
	
	    // check target
	    if (el.target) return;
	
	    if (!el.href) return;
	
	    var toRouteState = router.matchUrl(el.href);
	    if (toRouteState) {
	      e.preventDefault();
	      var name = toRouteState.name;
	      var params = merge(getParams(el.href), toRouteState.params);
	
	      var finalOpts;
	      if (typeof opts === 'function') {
	        finalOpts = opts(name, params);
	      } else {
	        finalOpts = opts;
	      }
	
	      router.navigate(name, params, finalOpts, cb);
	    }
	  }
	};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _browser = __webpack_require__(34);
	
	var _browser2 = _interopRequireDefault(_browser);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var pushState = _browser2.default.pushState;
	var replaceState = _browser2.default.replaceState;
	var addPopstateListener = _browser2.default.addPopstateListener;
	var removePopstateListener = _browser2.default.removePopstateListener;
	var getLocation = _browser2.default.getLocation;
	var getBase = _browser2.default.getBase;
	var getState = _browser2.default.getState;
	
	var pluginName = 'HISTORY';
	
	var historyPlugin = function historyPlugin() {
	    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    var forceDeactivate = _ref.forceDeactivate;
	    return function (router) {
	        router.getLocation = function () {
	            return getLocation(router.options);
	        };
	
	        router.replaceHistoryState = function (name) {
	            var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	            var state = router.buildState(name, params);
	            var url = router.buildUrl(name, params);
	            router.lastKnownState = state;
	            replaceState(state, '', url);
	        };
	
	        var updateBrowserState = function updateBrowserState(state, url, replace) {
	            if (replace) replaceState(state, '', url);else pushState(state, '', url);
	        };
	
	        var onPopState = function onPopState(evt) {
	            // Do nothing if no state or if last know state is poped state (it should never happen)
	            var newState = !evt.state || !evt.state.name;
	            var state = newState ? router.matchPath(getLocation(router.options)) : evt.state;
	            var _router$options = router.options;
	            var defaultRoute = _router$options.defaultRoute;
	            var defaultParams = _router$options.defaultParams;
	
	
	            if (!state) {
	                // If current state is already the default route, we will have a double entry
	                // Navigating back and forth will emit SAME_STATES error
	                defaultRoute && router.navigate(defaultRoute, defaultParams, { forceDeactivate: forceDeactivate, reload: true, replace: true });
	                return;
	            }
	            if (router.lastKnownState && router.areStatesEqual(state, router.lastKnownState, false)) {
	                return;
	            }
	
	            var fromState = _extends({}, router.getState());
	
	            router._transition(state, fromState, { forceDeactivate: forceDeactivate }, function (err, toState) {
	                if (err) {
	                    if (err.redirect) {
	                        router.navigate(err.redirect.name, err.redirect.params, { forceDeactivate: forceDeactivate, replace: true });
	                    } else if (err === 'CANNOT_DEACTIVATE') {
	                        var url = router.buildUrl(router.lastKnownState.name, router.lastKnownState.params);
	                        if (!newState) {
	                            // Keep history state unchanged but use current URL
	                            updateBrowserState(state, url, true);
	                        }
	                        // else do nothing or history will be messed up
	                        // TODO: history.back()?
	                    } else {
	                        // Force navigation to default state
	                        defaultRoute && router.navigate(defaultRoute, defaultParams, { forceDeactivate: forceDeactivate, reload: true, replace: true });
	                    }
	                } else {
	                    router._invokeListeners('$$success', toState, fromState, { replace: true });
	                }
	            });
	        };
	
	        var onStart = function onStart() {
	            // Guess base
	            if (router.options.useHash && !router.options.base) {
	                router.options.base = getBase();
	            }
	            addPopstateListener(onPopState);
	        };
	
	        var onStop = function onStop() {
	            removePopstateListener(onPopState);
	        };
	
	        var onTransitionSuccess = function onTransitionSuccess(toState, fromState, opts) {
	            var historyState = getState();
	            var replace = opts.replace || fromState && router.areStatesEqual(toState, fromState, false) || opts.reload && historyState && router.areStatesEqual(toState, historyState, false);
	            updateBrowserState(toState, router.buildUrl(toState.name, toState.params), replace);
	        };
	
	        return { name: pluginName, onStart: onStart, onStop: onStop, onTransitionSuccess: onTransitionSuccess, onPopState: onPopState };
	    };
	};
	
	exports.default = historyPlugin;

/***/ }),
/* 34 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Dumb functions
	 */
	// istanbul ignore next
	var identity = function identity(arg) {
	    return function () {
	        return arg;
	    };
	};
	// istanbul ignore next
	var noop = function noop() {};
	
	/**
	 * Browser detection
	 */
	var isBrowser = typeof window !== 'undefined';
	
	/**
	 * Browser functions needed by router5
	 */
	var getBase = function getBase() {
	    return window.location.pathname.replace(/\/$/, '');
	};
	
	var pushState = function pushState(state, title, path) {
	    return window.history.pushState(state, title, path);
	};
	
	var replaceState = function replaceState(state, title, path) {
	    return window.history.replaceState(state, title, path);
	};
	
	var addPopstateListener = function addPopstateListener(fn) {
	    return window.addEventListener('popstate', fn);
	};
	
	var removePopstateListener = function removePopstateListener(fn) {
	    return window.removeEventListener('popstate', fn);
	};
	
	var getLocation = function getLocation(opts) {
	    var path = opts.useHash ? window.location.hash.replace(new RegExp('^#' + opts.hashPrefix), '') : window.location.pathname.replace(new RegExp('^' + opts.base), '');
	    return (path || '/') + window.location.search;
	};
	
	var getState = function getState() {
	    return window.history.state;
	};
	
	/**
	 * Export browser object
	 */
	var browser = {};
	if (isBrowser) {
	    browser = { getBase: getBase, pushState: pushState, replaceState: replaceState, addPopstateListener: addPopstateListener, removePopstateListener: removePopstateListener, getLocation: getLocation, getState: getState };
	} else {
	    // istanbul ignore next
	    browser = {
	        getBase: identity(''),
	        pushState: noop,
	        replaceState: noop,
	        addPopstateListener: noop,
	        removePopstateListener: noop,
	        getLocation: identity(''),
	        getState: identity(null)
	    };
	}
	
	exports.default = browser;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _router = __webpack_require__(28);
	
	var _router2 = _interopRequireDefault(_router);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var pluginName = 'LISTENERS';
	var defaultOptions = {
	    autoCleanUp: true
	};
	
	function listenersPlugin() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? defaultOptions : arguments[0];
	
	    return function plugin(router) {
	        var listeners = {};
	
	        var removeListener = function removeListener(name, cb) {
	            if (cb) {
	                if (listeners[name]) listeners[name] = listeners[name].filter(function (callback) {
	                    return callback !== cb;
	                });
	            } else {
	                listeners[name] = [];
	            }
	            return router;
	        };
	
	        var addListener = function addListener(name, cb, replace) {
	            var normalizedName = name.replace(/^(\*|\^|=)/, '');
	
	            if (normalizedName && !/^\$/.test(name)) {
	                var segments = router.rootNode.getSegmentsByName(normalizedName);
	                if (!segments) console.warn('No route found for ' + normalizedName + ', listener might never be called!');
	            }
	
	            if (!listeners[name]) listeners[name] = [];
	            listeners[name] = (replace ? [] : listeners[name]).concat(cb);
	
	            return router;
	        };
	
	        router.addListener = function (cb) {
	            return addListener('*', cb);
	        };
	        router.removeListener = function (cb) {
	            return removeListener('*', cb);
	        };
	
	        router.addNodeListener = function (name, cb) {
	            return addListener('^' + name, cb, true);
	        };
	        router.removeNodeListener = function (name, cb) {
	            return removeListener('^' + name, cb);
	        };
	
	        router.addRouteListener = function (name, cb) {
	            return addListener('=' + name, cb);
	        };
	        router.removeRouteListener = function (name, cb) {
	            return removeListener('=' + name, cb);
	        };
	
	        function invokeListeners(name, toState, fromState) {
	            (listeners[name] || []).forEach(function (cb) {
	                return cb(toState, fromState);
	            });
	        }
	
	        function onTransitionSuccess(toState, fromState, opts) {
	            var _transitionPath = (0, _router2.default)(toState, fromState);
	
	            var intersection = _transitionPath.intersection;
	            var toDeactivate = _transitionPath.toDeactivate;
	
	            var intersectionNode = opts.reload ? '' : intersection;
	            var name = toState.name;
	
	            if (options.autoCleanUp) {
	                toDeactivate.forEach(function (name) {
	                    return removeListener('^' + name);
	                });
	            }
	
	            invokeListeners('^' + intersection, toState, fromState);
	            invokeListeners('=' + name, toState, fromState);
	            invokeListeners('*', toState, fromState);
	        }
	
	        function flush() {
	            listeners = {};
	        }
	
	        return { name: pluginName, onTransitionSuccess: onTransitionSuccess, flush: flush, listeners: listeners };
	    };
	}
	
	exports.default = listenersPlugin;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.RootListener = RootListener;
	
	var _decorators = __webpack_require__(14);
	
	function RootListener(events, selector) {
	    return (0, _decorators.makePropDecorator)("RootListener", [events, selector]);
	}

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__( 38 );


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _immutablors = __webpack_require__(39);
	
	Object.defineProperty(exports, 'immutable', {
	  enumerable: true,
	  get: function get() {
	    return _immutablors._immutable;
	  }
	});
	Object.defineProperty(exports, 'doesNotMutate', {
	  enumerable: true,
	  get: function get() {
	    return _immutablors._doesNotMutate;
	  }
	});
	
	var _validators = __webpack_require__(57);
	
	Object.defineProperty(exports, 'acceptsArray', {
	  enumerable: true,
	  get: function get() {
	    return _validators._acceptsArray;
	  }
	});
	Object.defineProperty(exports, 'acceptsObject', {
	  enumerable: true,
	  get: function get() {
	    return _validators._acceptsObject;
	  }
	});
	Object.defineProperty(exports, 'acceptsInteger', {
	  enumerable: true,
	  get: function get() {
	    return _validators._acceptsInteger;
	  }
	});
	Object.defineProperty(exports, 'acceptsNumber', {
	  enumerable: true,
	  get: function get() {
	    return _validators._acceptsNumber;
	  }
	});
	Object.defineProperty(exports, 'acceptsBoolean', {
	  enumerable: true,
	  get: function get() {
	    return _validators._acceptsBoolean;
	  }
	});
	Object.defineProperty(exports, 'acceptsFunction', {
	  enumerable: true,
	  get: function get() {
	    return _validators._acceptsFunction;
	  }
	});
	Object.defineProperty(exports, 'acceptsPromise', {
	  enumerable: true,
	  get: function get() {
	    return _validators._acceptsPromise;
	  }
	});
	Object.defineProperty(exports, 'acceptsString', {
	  enumerable: true,
	  get: function get() {
	    return _validators._acceptsString;
	  }
	});
	Object.defineProperty(exports, 'validateSchema', {
	  enumerable: true,
	  get: function get() {
	    return _validators._validateSchema;
	  }
	});
	
	var _memoizator = __webpack_require__(58);
	
	Object.defineProperty(exports, 'memoization', {
	  enumerable: true,
	  get: function get() {
	    return _memoizator._memoization;
	  }
	});
	
	var _timers = __webpack_require__(59);
	
	Object.defineProperty(exports, 'debounce', {
	  enumerable: true,
	  get: function get() {
	    return _timers._debounce;
	  }
	});
	Object.defineProperty(exports, 'timeout', {
	  enumerable: true,
	  get: function get() {
	    return _timers._timeout;
	  }
	});
	Object.defineProperty(exports, 'defer', {
	  enumerable: true,
	  get: function get() {
	    return _timers._defer;
	  }
	});
	
	var _loggers = __webpack_require__(60);
	
	Object.defineProperty(exports, 'loglocalstorage', {
	  enumerable: true,
	  get: function get() {
	    return _loggers._loglocalstorage;
	  }
	});
	Object.defineProperty(exports, 'log', {
	  enumerable: true,
	  get: function get() {
	    return _loggers._log;
	  }
	});
	Object.defineProperty(exports, 'donotlog', {
	  enumerable: true,
	  get: function get() {
	    return _loggers._donotlog;
	  }
	});
	Object.defineProperty(exports, 'donotlogmessages', {
	  enumerable: true,
	  get: function get() {
	    return _loggers._donotlogmessages;
	  }
	});
	Object.defineProperty(exports, 'donotlogerrors', {
	  enumerable: true,
	  get: function get() {
	    return _loggers._donotlogerrors;
	  }
	});
	Object.defineProperty(exports, 'donotlogwarnings', {
	  enumerable: true,
	  get: function get() {
	    return _loggers._donotlogwarnings;
	  }
	});
	
	var _executors = __webpack_require__(61);
	
	Object.defineProperty(exports, 'once', {
	  enumerable: true,
	  get: function get() {
	    return _executors._once;
	  }
	});
	Object.defineProperty(exports, 'times', {
	  enumerable: true,
	  get: function get() {
	    return _executors._times;
	  }
	});
	Object.defineProperty(exports, 'timesCalled', {
	  enumerable: true,
	  get: function get() {
	    return _executors._timesCalled;
	  }
	});
	
	var _stators = __webpack_require__(62);
	
	Object.defineProperty(exports, 'readonly', {
	  enumerable: true,
	  get: function get() {
	    return _stators._readonly;
	  }
	});
	Object.defineProperty(exports, 'enumerable', {
	  enumerable: true,
	  get: function get() {
	    return _stators._enumerable;
	  }
	});
	Object.defineProperty(exports, 'nonenumerable', {
	  enumerable: true,
	  get: function get() {
	    return _stators._nonenumerable;
	  }
	});
	Object.defineProperty(exports, 'nonconfigurable', {
	  enumerable: true,
	  get: function get() {
	    return _stators._nonconfigurable;
	  }
	});
	
	var _inheritedfunctions = __webpack_require__(63);
	
	Object.defineProperty(exports, 'overridden', {
	  enumerable: true,
	  get: function get() {
	    return _inheritedfunctions._overridden;
	  }
	});
	Object.defineProperty(exports, 'forceoverridden', {
	  enumerable: true,
	  get: function get() {
	    return _inheritedfunctions._forceoverridden;
	  }
	});
	
	var _trycatch2 = __webpack_require__(64);
	
	Object.defineProperty(exports, 'trycatch', {
	  enumerable: true,
	  get: function get() {
	    return _trycatch2._trycatch;
	  }
	});
	
	var _multiinheritance = __webpack_require__(65);
	
	Object.defineProperty(exports, 'multiInherit', {
	  enumerable: true,
	  get: function get() {
	    return _multiinheritance._multiInherit;
	  }
	});
	Object.defineProperty(exports, 'multiExtend', {
	  enumerable: true,
	  get: function get() {
	    return _multiinheritance._multiInherit;
	  }
	});
	Object.defineProperty(exports, 'partialyInherit', {
	  enumerable: true,
	  get: function get() {
	    return _multiinheritance._partialyInherit;
	  }
	});
	Object.defineProperty(exports, 'partialyExtend', {
	  enumerable: true,
	  get: function get() {
	    return _multiinheritance._partialyInherit;
	  }
	});
	Object.defineProperty(exports, 'partiallyInherit', {
	  enumerable: true,
	  get: function get() {
	    return _multiinheritance._partialyInherit;
	  }
	});
	Object.defineProperty(exports, 'partiallyExtend', {
	  enumerable: true,
	  get: function get() {
	    return _multiinheritance._partialyInherit;
	  }
	});
	
	var _passedValuesEqualToNumberOfArguments2 = __webpack_require__(66);
	
	Object.defineProperty(exports, 'passedValuesEqualToNumberOfArguments', {
	  enumerable: true,
	  get: function get() {
	    return _passedValuesEqualToNumberOfArguments2._passedValuesEqualToNumberOfArguments;
	  }
	});
	Object.defineProperty(exports, 'valuesEqualToNumberOfArguments', {
	  enumerable: true,
	  get: function get() {
	    return _passedValuesEqualToNumberOfArguments2._passedValuesEqualToNumberOfArguments;
	  }
	});
	
	var _after2 = __webpack_require__(67);
	
	Object.defineProperty(exports, 'after', {
	  enumerable: true,
	  get: function get() {
	    return _after2._after;
	  }
	});
	
	var _before2 = __webpack_require__(68);
	
	Object.defineProperty(exports, 'before', {
	  enumerable: true,
	  get: function get() {
	    return _before2._before;
	  }
	});
	
	var _deprecated2 = __webpack_require__(69);
	
	Object.defineProperty(exports, 'deprecated', {
	  enumerable: true,
	  get: function get() {
	    return _deprecated2._deprecated;
	  }
	});
	Object.defineProperty(exports, 'deprecate', {
	  enumerable: true,
	  get: function get() {
	    return _deprecated2._deprecated;
	  }
	});
	
	var _compose2 = __webpack_require__(70);
	
	Object.defineProperty(exports, 'compose', {
	  enumerable: true,
	  get: function get() {
	    return _compose2._compose;
	  }
	});
	Object.defineProperty(exports, 'rightCompose', {
	  enumerable: true,
	  get: function get() {
	    return _compose2._compose;
	  }
	});
	Object.defineProperty(exports, 'leftCompose', {
	  enumerable: true,
	  get: function get() {
	    return _compose2._leftCompose;
	  }
	});
	
	var _autobind2 = __webpack_require__(71);
	
	Object.defineProperty(exports, 'autobind', {
	  enumerable: true,
	  get: function get() {
	    return _autobind2._autobind;
	  }
	});
	
	var _abstract2 = __webpack_require__(72);
	
	Object.defineProperty(exports, 'abstract', {
	  enumerable: true,
	  get: function get() {
	    return _abstract2._abstract;
	  }
	});

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._doesNotMutate = exports._immutable = undefined;
	
	var _deepcopy = __webpack_require__(40);
	
	var _deepcopy2 = _interopRequireDefault(_deepcopy);
	
	var _deepEqual = __webpack_require__(52);
	
	var _deepEqual2 = _interopRequireDefault(_deepEqual);
	
	var _helpers = __webpack_require__(55);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Base decorator function for immutability
	 *
	 * @method _basefunc
	 *
	 *
	 * @return { function }  decorator function
	 */
	var _immutable = exports._immutable = function _immutable() {
	  return function (key, target, descriptor) {
	    var func = descriptor.value;
	    (0, _helpers.descriptorIsFunc)(key, func);
	    descriptor.value = function () {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }
	
	      var newArgs = args.reduce(function (previousval, currentval) {
	        previousval.push((0, _deepcopy2.default)(currentval));
	        return previousval;
	      }, []);
	      return func.apply(this, newArgs);
	    };
	    return descriptor;
	  };
	}; /**
	   * Mutability related decorators
	   *
	   * @author  Avraam Mavridis      <avr.mav@gmail.com>
	   *
	   */
	
	var _doesNotMutate = exports._doesNotMutate = function _doesNotMutate() {
	  return function (key, target, descriptor) {
	    var func = descriptor.value;
	    (0, _helpers.descriptorIsFunc)(key, func);
	    descriptor.value = function () {
	      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	      }
	
	      var tempArgs = (0, _deepcopy2.default)(args);
	      var returnValue = func.apply(this, args);
	      if (!(0, _deepEqual2.default)(args, tempArgs)) {
	        throw Error(target + ' mutates the passed values');
	      }
	      return returnValue;
	    };
	    return descriptor;
	  };
	};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(41).default;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = deepcopy;
	
	var _detector = __webpack_require__(42);
	
	var _collection = __webpack_require__(49);
	
	var _copier = __webpack_require__(50);
	
	/**
	 * deepcopy function
	 *
	 * @param {*} value
	 * @param {Object|Function} [options]
	 * @return {*}
	 */
	function deepcopy(value, options = {}) {
	  if (typeof options === 'function') {
	    options = {
	      customizer: options
	    };
	  }
	
	  const {
	    // TODO: before/after customizer
	    customizer // TODO: max depth
	    // depth = Infinity,
	
	  } = options;
	  const valueType = (0, _detector.detectType)(value);
	
	  if (!(0, _collection.isCollection)(valueType)) {
	    return recursiveCopy(value, null, null, null, customizer);
	  }
	
	  const copiedValue = (0, _copier.copy)(value, valueType, customizer);
	  const references = new WeakMap([[value, copiedValue]]);
	  const visited = new WeakSet([value]);
	  return recursiveCopy(value, copiedValue, references, visited, customizer);
	}
	/**
	 * recursively copy
	 *
	 * @param {*} value target value
	 * @param {*} clone clone of value
	 * @param {WeakMap} references visited references of clone
	 * @param {WeakSet} visited visited references of value
	 * @param {Function} customizer user customize function
	 * @return {*}
	 */
	
	
	function recursiveCopy(value, clone, references, visited, customizer) {
	  const type = (0, _detector.detectType)(value);
	  const copiedValue = (0, _copier.copy)(value, type); // return if not a collection value
	
	  if (!(0, _collection.isCollection)(type)) {
	    return copiedValue;
	  }
	
	  let keys;
	
	  switch (type) {
	    case 'Arguments':
	    case 'Array':
	      keys = Object.keys(value);
	      break;
	
	    case 'Object':
	      keys = Object.keys(value);
	      keys.push(...Object.getOwnPropertySymbols(value));
	      break;
	
	    case 'Map':
	    case 'Set':
	      keys = value.keys();
	      break;
	
	    default:
	  } // walk within collection with iterator
	
	
	  for (let collectionKey of keys) {
	    const collectionValue = (0, _collection.get)(value, collectionKey, type);
	
	    if (visited.has(collectionValue)) {
	      // for [Circular]
	      (0, _collection.set)(clone, collectionKey, references.get(collectionValue), type);
	    } else {
	      const collectionValueType = (0, _detector.detectType)(collectionValue);
	      const copiedCollectionValue = (0, _copier.copy)(collectionValue, collectionValueType); // save reference if value is collection
	
	      if ((0, _collection.isCollection)(collectionValueType)) {
	        references.set(collectionValue, copiedCollectionValue);
	        visited.add(collectionValue);
	      }
	
	      (0, _collection.set)(clone, collectionKey, recursiveCopy(collectionValue, copiedCollectionValue, references, visited, customizer), type);
	    }
	  } // TODO: isSealed/isFrozen/isExtensible
	
	
	  return clone;
	}
	//# sourceMappingURL=index.js.map

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.detectType = detectType;
	
	var _typeDetect = _interopRequireDefault(__webpack_require__(43));
	
	var _buffer = __webpack_require__(44);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * detect type of value
	 *
	 * @param {*} value
	 * @return {string}
	 */
	function detectType(value) {
	  // NOTE: isBuffer must execute before type-detect,
	  // because type-detect returns 'Uint8Array'.
	  if ((0, _buffer.isBuffer)(value)) {
	    return 'Buffer';
	  }
	
	  return (0, _typeDetect.default)(value);
	}
	//# sourceMappingURL=detector.js.map

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {(function (global, factory) {
		 true ? module.exports = factory() :
		typeof define === 'function' && define.amd ? define(factory) :
		(global.typeDetect = factory());
	}(this, (function () { 'use strict';
	
	/* !
	 * type-detect
	 * Copyright(c) 2013 jake luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	var promiseExists = typeof Promise === 'function';
	
	/* eslint-disable no-undef */
	var globalObject = typeof self === 'object' ? self : global; // eslint-disable-line id-blacklist
	
	var symbolExists = typeof Symbol !== 'undefined';
	var mapExists = typeof Map !== 'undefined';
	var setExists = typeof Set !== 'undefined';
	var weakMapExists = typeof WeakMap !== 'undefined';
	var weakSetExists = typeof WeakSet !== 'undefined';
	var dataViewExists = typeof DataView !== 'undefined';
	var symbolIteratorExists = symbolExists && typeof Symbol.iterator !== 'undefined';
	var symbolToStringTagExists = symbolExists && typeof Symbol.toStringTag !== 'undefined';
	var setEntriesExists = setExists && typeof Set.prototype.entries === 'function';
	var mapEntriesExists = mapExists && typeof Map.prototype.entries === 'function';
	var setIteratorPrototype = setEntriesExists && Object.getPrototypeOf(new Set().entries());
	var mapIteratorPrototype = mapEntriesExists && Object.getPrototypeOf(new Map().entries());
	var arrayIteratorExists = symbolIteratorExists && typeof Array.prototype[Symbol.iterator] === 'function';
	var arrayIteratorPrototype = arrayIteratorExists && Object.getPrototypeOf([][Symbol.iterator]());
	var stringIteratorExists = symbolIteratorExists && typeof String.prototype[Symbol.iterator] === 'function';
	var stringIteratorPrototype = stringIteratorExists && Object.getPrototypeOf(''[Symbol.iterator]());
	var toStringLeftSliceLength = 8;
	var toStringRightSliceLength = -1;
	/**
	 * ### typeOf (obj)
	 *
	 * Uses `Object.prototype.toString` to determine the type of an object,
	 * normalising behaviour across engine versions & well optimised.
	 *
	 * @param {Mixed} object
	 * @return {String} object type
	 * @api public
	 */
	function typeDetect(obj) {
	  /* ! Speed optimisation
	   * Pre:
	   *   string literal     x 3,039,035 ops/sec ±1.62% (78 runs sampled)
	   *   boolean literal    x 1,424,138 ops/sec ±4.54% (75 runs sampled)
	   *   number literal     x 1,653,153 ops/sec ±1.91% (82 runs sampled)
	   *   undefined          x 9,978,660 ops/sec ±1.92% (75 runs sampled)
	   *   function           x 2,556,769 ops/sec ±1.73% (77 runs sampled)
	   * Post:
	   *   string literal     x 38,564,796 ops/sec ±1.15% (79 runs sampled)
	   *   boolean literal    x 31,148,940 ops/sec ±1.10% (79 runs sampled)
	   *   number literal     x 32,679,330 ops/sec ±1.90% (78 runs sampled)
	   *   undefined          x 32,363,368 ops/sec ±1.07% (82 runs sampled)
	   *   function           x 31,296,870 ops/sec ±0.96% (83 runs sampled)
	   */
	  var typeofObj = typeof obj;
	  if (typeofObj !== 'object') {
	    return typeofObj;
	  }
	
	  /* ! Speed optimisation
	   * Pre:
	   *   null               x 28,645,765 ops/sec ±1.17% (82 runs sampled)
	   * Post:
	   *   null               x 36,428,962 ops/sec ±1.37% (84 runs sampled)
	   */
	  if (obj === null) {
	    return 'null';
	  }
	
	  /* ! Spec Conformance
	   * Test: `Object.prototype.toString.call(window)``
	   *  - Node === "[object global]"
	   *  - Chrome === "[object global]"
	   *  - Firefox === "[object Window]"
	   *  - PhantomJS === "[object Window]"
	   *  - Safari === "[object Window]"
	   *  - IE 11 === "[object Window]"
	   *  - IE Edge === "[object Window]"
	   * Test: `Object.prototype.toString.call(this)``
	   *  - Chrome Worker === "[object global]"
	   *  - Firefox Worker === "[object DedicatedWorkerGlobalScope]"
	   *  - Safari Worker === "[object DedicatedWorkerGlobalScope]"
	   *  - IE 11 Worker === "[object WorkerGlobalScope]"
	   *  - IE Edge Worker === "[object WorkerGlobalScope]"
	   */
	  if (obj === globalObject) {
	    return 'global';
	  }
	
	  /* ! Speed optimisation
	   * Pre:
	   *   array literal      x 2,888,352 ops/sec ±0.67% (82 runs sampled)
	   * Post:
	   *   array literal      x 22,479,650 ops/sec ±0.96% (81 runs sampled)
	   */
	  if (
	    Array.isArray(obj) &&
	    (symbolToStringTagExists === false || !(Symbol.toStringTag in obj))
	  ) {
	    return 'Array';
	  }
	
	  // Not caching existence of `window` and related properties due to potential
	  // for `window` to be unset before tests in quasi-browser environments.
	  if (typeof window === 'object' && window !== null) {
	    /* ! Spec Conformance
	     * (https://html.spec.whatwg.org/multipage/browsers.html#location)
	     * WhatWG HTML$7.7.3 - The `Location` interface
	     * Test: `Object.prototype.toString.call(window.location)``
	     *  - IE <=11 === "[object Object]"
	     *  - IE Edge <=13 === "[object Object]"
	     */
	    if (typeof window.location === 'object' && obj === window.location) {
	      return 'Location';
	    }
	
	    /* ! Spec Conformance
	     * (https://html.spec.whatwg.org/#document)
	     * WhatWG HTML$3.1.1 - The `Document` object
	     * Note: Most browsers currently adher to the W3C DOM Level 2 spec
	     *       (https://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-26809268)
	     *       which suggests that browsers should use HTMLTableCellElement for
	     *       both TD and TH elements. WhatWG separates these.
	     *       WhatWG HTML states:
	     *         > For historical reasons, Window objects must also have a
	     *         > writable, configurable, non-enumerable property named
	     *         > HTMLDocument whose value is the Document interface object.
	     * Test: `Object.prototype.toString.call(document)``
	     *  - Chrome === "[object HTMLDocument]"
	     *  - Firefox === "[object HTMLDocument]"
	     *  - Safari === "[object HTMLDocument]"
	     *  - IE <=10 === "[object Document]"
	     *  - IE 11 === "[object HTMLDocument]"
	     *  - IE Edge <=13 === "[object HTMLDocument]"
	     */
	    if (typeof window.document === 'object' && obj === window.document) {
	      return 'Document';
	    }
	
	    if (typeof window.navigator === 'object') {
	      /* ! Spec Conformance
	       * (https://html.spec.whatwg.org/multipage/webappapis.html#mimetypearray)
	       * WhatWG HTML$8.6.1.5 - Plugins - Interface MimeTypeArray
	       * Test: `Object.prototype.toString.call(navigator.mimeTypes)``
	       *  - IE <=10 === "[object MSMimeTypesCollection]"
	       */
	      if (typeof window.navigator.mimeTypes === 'object' &&
	          obj === window.navigator.mimeTypes) {
	        return 'MimeTypeArray';
	      }
	
	      /* ! Spec Conformance
	       * (https://html.spec.whatwg.org/multipage/webappapis.html#pluginarray)
	       * WhatWG HTML$8.6.1.5 - Plugins - Interface PluginArray
	       * Test: `Object.prototype.toString.call(navigator.plugins)``
	       *  - IE <=10 === "[object MSPluginsCollection]"
	       */
	      if (typeof window.navigator.plugins === 'object' &&
	          obj === window.navigator.plugins) {
	        return 'PluginArray';
	      }
	    }
	
	    if ((typeof window.HTMLElement === 'function' ||
	        typeof window.HTMLElement === 'object') &&
	        obj instanceof window.HTMLElement) {
	      /* ! Spec Conformance
	      * (https://html.spec.whatwg.org/multipage/webappapis.html#pluginarray)
	      * WhatWG HTML$4.4.4 - The `blockquote` element - Interface `HTMLQuoteElement`
	      * Test: `Object.prototype.toString.call(document.createElement('blockquote'))``
	      *  - IE <=10 === "[object HTMLBlockElement]"
	      */
	      if (obj.tagName === 'BLOCKQUOTE') {
	        return 'HTMLQuoteElement';
	      }
	
	      /* ! Spec Conformance
	       * (https://html.spec.whatwg.org/#htmltabledatacellelement)
	       * WhatWG HTML$4.9.9 - The `td` element - Interface `HTMLTableDataCellElement`
	       * Note: Most browsers currently adher to the W3C DOM Level 2 spec
	       *       (https://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-82915075)
	       *       which suggests that browsers should use HTMLTableCellElement for
	       *       both TD and TH elements. WhatWG separates these.
	       * Test: Object.prototype.toString.call(document.createElement('td'))
	       *  - Chrome === "[object HTMLTableCellElement]"
	       *  - Firefox === "[object HTMLTableCellElement]"
	       *  - Safari === "[object HTMLTableCellElement]"
	       */
	      if (obj.tagName === 'TD') {
	        return 'HTMLTableDataCellElement';
	      }
	
	      /* ! Spec Conformance
	       * (https://html.spec.whatwg.org/#htmltableheadercellelement)
	       * WhatWG HTML$4.9.9 - The `td` element - Interface `HTMLTableHeaderCellElement`
	       * Note: Most browsers currently adher to the W3C DOM Level 2 spec
	       *       (https://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-82915075)
	       *       which suggests that browsers should use HTMLTableCellElement for
	       *       both TD and TH elements. WhatWG separates these.
	       * Test: Object.prototype.toString.call(document.createElement('th'))
	       *  - Chrome === "[object HTMLTableCellElement]"
	       *  - Firefox === "[object HTMLTableCellElement]"
	       *  - Safari === "[object HTMLTableCellElement]"
	       */
	      if (obj.tagName === 'TH') {
	        return 'HTMLTableHeaderCellElement';
	      }
	    }
	  }
	
	  /* ! Speed optimisation
	  * Pre:
	  *   Float64Array       x 625,644 ops/sec ±1.58% (80 runs sampled)
	  *   Float32Array       x 1,279,852 ops/sec ±2.91% (77 runs sampled)
	  *   Uint32Array        x 1,178,185 ops/sec ±1.95% (83 runs sampled)
	  *   Uint16Array        x 1,008,380 ops/sec ±2.25% (80 runs sampled)
	  *   Uint8Array         x 1,128,040 ops/sec ±2.11% (81 runs sampled)
	  *   Int32Array         x 1,170,119 ops/sec ±2.88% (80 runs sampled)
	  *   Int16Array         x 1,176,348 ops/sec ±5.79% (86 runs sampled)
	  *   Int8Array          x 1,058,707 ops/sec ±4.94% (77 runs sampled)
	  *   Uint8ClampedArray  x 1,110,633 ops/sec ±4.20% (80 runs sampled)
	  * Post:
	  *   Float64Array       x 7,105,671 ops/sec ±13.47% (64 runs sampled)
	  *   Float32Array       x 5,887,912 ops/sec ±1.46% (82 runs sampled)
	  *   Uint32Array        x 6,491,661 ops/sec ±1.76% (79 runs sampled)
	  *   Uint16Array        x 6,559,795 ops/sec ±1.67% (82 runs sampled)
	  *   Uint8Array         x 6,463,966 ops/sec ±1.43% (85 runs sampled)
	  *   Int32Array         x 5,641,841 ops/sec ±3.49% (81 runs sampled)
	  *   Int16Array         x 6,583,511 ops/sec ±1.98% (80 runs sampled)
	  *   Int8Array          x 6,606,078 ops/sec ±1.74% (81 runs sampled)
	  *   Uint8ClampedArray  x 6,602,224 ops/sec ±1.77% (83 runs sampled)
	  */
	  var stringTag = (symbolToStringTagExists && obj[Symbol.toStringTag]);
	  if (typeof stringTag === 'string') {
	    return stringTag;
	  }
	
	  var objPrototype = Object.getPrototypeOf(obj);
	  /* ! Speed optimisation
	  * Pre:
	  *   regex literal      x 1,772,385 ops/sec ±1.85% (77 runs sampled)
	  *   regex constructor  x 2,143,634 ops/sec ±2.46% (78 runs sampled)
	  * Post:
	  *   regex literal      x 3,928,009 ops/sec ±0.65% (78 runs sampled)
	  *   regex constructor  x 3,931,108 ops/sec ±0.58% (84 runs sampled)
	  */
	  if (objPrototype === RegExp.prototype) {
	    return 'RegExp';
	  }
	
	  /* ! Speed optimisation
	  * Pre:
	  *   date               x 2,130,074 ops/sec ±4.42% (68 runs sampled)
	  * Post:
	  *   date               x 3,953,779 ops/sec ±1.35% (77 runs sampled)
	  */
	  if (objPrototype === Date.prototype) {
	    return 'Date';
	  }
	
	  /* ! Spec Conformance
	   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-promise.prototype-@@tostringtag)
	   * ES6$25.4.5.4 - Promise.prototype[@@toStringTag] should be "Promise":
	   * Test: `Object.prototype.toString.call(Promise.resolve())``
	   *  - Chrome <=47 === "[object Object]"
	   *  - Edge <=20 === "[object Object]"
	   *  - Firefox 29-Latest === "[object Promise]"
	   *  - Safari 7.1-Latest === "[object Promise]"
	   */
	  if (promiseExists && objPrototype === Promise.prototype) {
	    return 'Promise';
	  }
	
	  /* ! Speed optimisation
	  * Pre:
	  *   set                x 2,222,186 ops/sec ±1.31% (82 runs sampled)
	  * Post:
	  *   set                x 4,545,879 ops/sec ±1.13% (83 runs sampled)
	  */
	  if (setExists && objPrototype === Set.prototype) {
	    return 'Set';
	  }
	
	  /* ! Speed optimisation
	  * Pre:
	  *   map                x 2,396,842 ops/sec ±1.59% (81 runs sampled)
	  * Post:
	  *   map                x 4,183,945 ops/sec ±6.59% (82 runs sampled)
	  */
	  if (mapExists && objPrototype === Map.prototype) {
	    return 'Map';
	  }
	
	  /* ! Speed optimisation
	  * Pre:
	  *   weakset            x 1,323,220 ops/sec ±2.17% (76 runs sampled)
	  * Post:
	  *   weakset            x 4,237,510 ops/sec ±2.01% (77 runs sampled)
	  */
	  if (weakSetExists && objPrototype === WeakSet.prototype) {
	    return 'WeakSet';
	  }
	
	  /* ! Speed optimisation
	  * Pre:
	  *   weakmap            x 1,500,260 ops/sec ±2.02% (78 runs sampled)
	  * Post:
	  *   weakmap            x 3,881,384 ops/sec ±1.45% (82 runs sampled)
	  */
	  if (weakMapExists && objPrototype === WeakMap.prototype) {
	    return 'WeakMap';
	  }
	
	  /* ! Spec Conformance
	   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-dataview.prototype-@@tostringtag)
	   * ES6$24.2.4.21 - DataView.prototype[@@toStringTag] should be "DataView":
	   * Test: `Object.prototype.toString.call(new DataView(new ArrayBuffer(1)))``
	   *  - Edge <=13 === "[object Object]"
	   */
	  if (dataViewExists && objPrototype === DataView.prototype) {
	    return 'DataView';
	  }
	
	  /* ! Spec Conformance
	   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%mapiteratorprototype%-@@tostringtag)
	   * ES6$23.1.5.2.2 - %MapIteratorPrototype%[@@toStringTag] should be "Map Iterator":
	   * Test: `Object.prototype.toString.call(new Map().entries())``
	   *  - Edge <=13 === "[object Object]"
	   */
	  if (mapExists && objPrototype === mapIteratorPrototype) {
	    return 'Map Iterator';
	  }
	
	  /* ! Spec Conformance
	   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%setiteratorprototype%-@@tostringtag)
	   * ES6$23.2.5.2.2 - %SetIteratorPrototype%[@@toStringTag] should be "Set Iterator":
	   * Test: `Object.prototype.toString.call(new Set().entries())``
	   *  - Edge <=13 === "[object Object]"
	   */
	  if (setExists && objPrototype === setIteratorPrototype) {
	    return 'Set Iterator';
	  }
	
	  /* ! Spec Conformance
	   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%arrayiteratorprototype%-@@tostringtag)
	   * ES6$22.1.5.2.2 - %ArrayIteratorPrototype%[@@toStringTag] should be "Array Iterator":
	   * Test: `Object.prototype.toString.call([][Symbol.iterator]())``
	   *  - Edge <=13 === "[object Object]"
	   */
	  if (arrayIteratorExists && objPrototype === arrayIteratorPrototype) {
	    return 'Array Iterator';
	  }
	
	  /* ! Spec Conformance
	   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%stringiteratorprototype%-@@tostringtag)
	   * ES6$21.1.5.2.2 - %StringIteratorPrototype%[@@toStringTag] should be "String Iterator":
	   * Test: `Object.prototype.toString.call(''[Symbol.iterator]())``
	   *  - Edge <=13 === "[object Object]"
	   */
	  if (stringIteratorExists && objPrototype === stringIteratorPrototype) {
	    return 'String Iterator';
	  }
	
	  /* ! Speed optimisation
	  * Pre:
	  *   object from null   x 2,424,320 ops/sec ±1.67% (76 runs sampled)
	  * Post:
	  *   object from null   x 5,838,000 ops/sec ±0.99% (84 runs sampled)
	  */
	  if (objPrototype === null) {
	    return 'Object';
	  }
	
	  return Object
	    .prototype
	    .toString
	    .call(obj)
	    .slice(toStringLeftSliceLength, toStringRightSliceLength);
	}
	
	return typeDetect;
	
	})));
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.copy = exports.isBuffer = void 0;
	const isBufferExists = typeof Buffer !== 'undefined';
	const isBufferFromExists = isBufferExists && typeof Buffer.from !== 'undefined';
	const isBuffer = isBufferExists ?
	/**
	 * is value is Buffer?
	 *
	 * @param {*} value
	 * @return {boolean}
	 */
	function isBuffer(value) {
	  return Buffer.isBuffer(value);
	} :
	/**
	 * return false
	 *
	 * NOTE: for Buffer unsupported
	 *
	 * @return {boolean}
	 */
	function isBuffer() {
	  return false;
	};
	exports.isBuffer = isBuffer;
	const copy = isBufferFromExists ?
	/**
	 * copy Buffer
	 *
	 * @param {Buffer} value
	 * @return {Buffer}
	 */
	function copy(value) {
	  return Buffer.from(value);
	} : isBufferExists ?
	/**
	 * copy Buffer
	 *
	 * NOTE: for old node.js
	 *
	 * @param {Buffer} value
	 * @return {Buffer}
	 */
	function copy(value) {
	  return new Buffer(value);
	} :
	/**
	 * shallow copy
	 *
	 * NOTE: for Buffer unsupported
	 *
	 * @param {*}
	 * @return {*}
	 */
	function copy(value) {
	  return value;
	};
	exports.copy = copy;
	//# sourceMappingURL=buffer.js.map
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(45).Buffer))

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */
	
	'use strict'
	
	var base64 = __webpack_require__(46)
	var ieee754 = __webpack_require__(47)
	var isArray = __webpack_require__(48)
	
	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50
	
	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.
	
	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : typedArraySupport()
	
	/*
	 * Export kMaxLength after typed array support is determined.
	 */
	exports.kMaxLength = kMaxLength()
	
	function typedArraySupport () {
	  try {
	    var arr = new Uint8Array(1)
	    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
	    return arr.foo() === 42 && // typed array instances can be augmented
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	}
	
	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}
	
	function createBuffer (that, length) {
	  if (kMaxLength() < length) {
	    throw new RangeError('Invalid typed array length')
	  }
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = new Uint8Array(length)
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    if (that === null) {
	      that = new Buffer(length)
	    }
	    that.length = length
	  }
	
	  return that
	}
	
	/**
	 * The Buffer constructor returns instances of `Uint8Array` that have their
	 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
	 * returns a single octet.
	 *
	 * The `Uint8Array` prototype remains unmodified.
	 */
	
	function Buffer (arg, encodingOrOffset, length) {
	  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
	    return new Buffer(arg, encodingOrOffset, length)
	  }
	
	  // Common case.
	  if (typeof arg === 'number') {
	    if (typeof encodingOrOffset === 'string') {
	      throw new Error(
	        'If encoding is specified then the first argument must be a string'
	      )
	    }
	    return allocUnsafe(this, arg)
	  }
	  return from(this, arg, encodingOrOffset, length)
	}
	
	Buffer.poolSize = 8192 // not used by this implementation
	
	// TODO: Legacy, not needed anymore. Remove in next major version.
	Buffer._augment = function (arr) {
	  arr.__proto__ = Buffer.prototype
	  return arr
	}
	
	function from (that, value, encodingOrOffset, length) {
	  if (typeof value === 'number') {
	    throw new TypeError('"value" argument must not be a number')
	  }
	
	  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
	    return fromArrayBuffer(that, value, encodingOrOffset, length)
	  }
	
	  if (typeof value === 'string') {
	    return fromString(that, value, encodingOrOffset)
	  }
	
	  return fromObject(that, value)
	}
	
	/**
	 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	 * if value is a number.
	 * Buffer.from(str[, encoding])
	 * Buffer.from(array)
	 * Buffer.from(buffer)
	 * Buffer.from(arrayBuffer[, byteOffset[, length]])
	 **/
	Buffer.from = function (value, encodingOrOffset, length) {
	  return from(null, value, encodingOrOffset, length)
	}
	
	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	  if (typeof Symbol !== 'undefined' && Symbol.species &&
	      Buffer[Symbol.species] === Buffer) {
	    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
	    Object.defineProperty(Buffer, Symbol.species, {
	      value: null,
	      configurable: true
	    })
	  }
	}
	
	function assertSize (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('"size" argument must be a number')
	  } else if (size < 0) {
	    throw new RangeError('"size" argument must not be negative')
	  }
	}
	
	function alloc (that, size, fill, encoding) {
	  assertSize(size)
	  if (size <= 0) {
	    return createBuffer(that, size)
	  }
	  if (fill !== undefined) {
	    // Only pay attention to encoding if it's a string. This
	    // prevents accidentally sending in a number that would
	    // be interpretted as a start offset.
	    return typeof encoding === 'string'
	      ? createBuffer(that, size).fill(fill, encoding)
	      : createBuffer(that, size).fill(fill)
	  }
	  return createBuffer(that, size)
	}
	
	/**
	 * Creates a new filled Buffer instance.
	 * alloc(size[, fill[, encoding]])
	 **/
	Buffer.alloc = function (size, fill, encoding) {
	  return alloc(null, size, fill, encoding)
	}
	
	function allocUnsafe (that, size) {
	  assertSize(size)
	  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < size; ++i) {
	      that[i] = 0
	    }
	  }
	  return that
	}
	
	/**
	 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	 * */
	Buffer.allocUnsafe = function (size) {
	  return allocUnsafe(null, size)
	}
	/**
	 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	 */
	Buffer.allocUnsafeSlow = function (size) {
	  return allocUnsafe(null, size)
	}
	
	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') {
	    encoding = 'utf8'
	  }
	
	  if (!Buffer.isEncoding(encoding)) {
	    throw new TypeError('"encoding" must be a valid string encoding')
	  }
	
	  var length = byteLength(string, encoding) | 0
	  that = createBuffer(that, length)
	
	  var actual = that.write(string, encoding)
	
	  if (actual !== length) {
	    // Writing a hex string, for example, that contains invalid characters will
	    // cause everything after the first invalid character to be ignored. (e.g.
	    // 'abxxcd' will be treated as 'ab')
	    that = that.slice(0, actual)
	  }
	
	  return that
	}
	
	function fromArrayLike (that, array) {
	  var length = array.length < 0 ? 0 : checked(array.length) | 0
	  that = createBuffer(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}
	
	function fromArrayBuffer (that, array, byteOffset, length) {
	  array.byteLength // this throws if `array` is not a valid ArrayBuffer
	
	  if (byteOffset < 0 || array.byteLength < byteOffset) {
	    throw new RangeError('\'offset\' is out of bounds')
	  }
	
	  if (array.byteLength < byteOffset + (length || 0)) {
	    throw new RangeError('\'length\' is out of bounds')
	  }
	
	  if (byteOffset === undefined && length === undefined) {
	    array = new Uint8Array(array)
	  } else if (length === undefined) {
	    array = new Uint8Array(array, byteOffset)
	  } else {
	    array = new Uint8Array(array, byteOffset, length)
	  }
	
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = array
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromArrayLike(that, array)
	  }
	  return that
	}
	
	function fromObject (that, obj) {
	  if (Buffer.isBuffer(obj)) {
	    var len = checked(obj.length) | 0
	    that = createBuffer(that, len)
	
	    if (that.length === 0) {
	      return that
	    }
	
	    obj.copy(that, 0, 0, len)
	    return that
	  }
	
	  if (obj) {
	    if ((typeof ArrayBuffer !== 'undefined' &&
	        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
	      if (typeof obj.length !== 'number' || isnan(obj.length)) {
	        return createBuffer(that, 0)
	      }
	      return fromArrayLike(that, obj)
	    }
	
	    if (obj.type === 'Buffer' && isArray(obj.data)) {
	      return fromArrayLike(that, obj.data)
	    }
	  }
	
	  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
	}
	
	function checked (length) {
	  // Note: cannot use `length < kMaxLength()` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}
	
	function SlowBuffer (length) {
	  if (+length != length) { // eslint-disable-line eqeqeq
	    length = 0
	  }
	  return Buffer.alloc(+length)
	}
	
	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}
	
	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }
	
	  if (a === b) return 0
	
	  var x = a.length
	  var y = b.length
	
	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i]
	      y = b[i]
	      break
	    }
	  }
	
	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}
	
	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'latin1':
	    case 'binary':
	    case 'base64':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}
	
	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) {
	    throw new TypeError('"list" argument must be an Array of Buffers')
	  }
	
	  if (list.length === 0) {
	    return Buffer.alloc(0)
	  }
	
	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; ++i) {
	      length += list[i].length
	    }
	  }
	
	  var buffer = Buffer.allocUnsafe(length)
	  var pos = 0
	  for (i = 0; i < list.length; ++i) {
	    var buf = list[i]
	    if (!Buffer.isBuffer(buf)) {
	      throw new TypeError('"list" argument must be an Array of Buffers')
	    }
	    buf.copy(buffer, pos)
	    pos += buf.length
	  }
	  return buffer
	}
	
	function byteLength (string, encoding) {
	  if (Buffer.isBuffer(string)) {
	    return string.length
	  }
	  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
	      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
	    return string.byteLength
	  }
	  if (typeof string !== 'string') {
	    string = '' + string
	  }
	
	  var len = string.length
	  if (len === 0) return 0
	
	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'latin1':
	      case 'binary':
	        return len
	      case 'utf8':
	      case 'utf-8':
	      case undefined:
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength
	
	function slowToString (encoding, start, end) {
	  var loweredCase = false
	
	  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
	  // property of a typed array.
	
	  // This behaves neither like String nor Uint8Array in that we set start/end
	  // to their upper/lower bounds if the value passed is out of range.
	  // undefined is handled specially as per ECMA-262 6th Edition,
	  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
	  if (start === undefined || start < 0) {
	    start = 0
	  }
	  // Return early if start > this.length. Done here to prevent potential uint32
	  // coercion fail below.
	  if (start > this.length) {
	    return ''
	  }
	
	  if (end === undefined || end > this.length) {
	    end = this.length
	  }
	
	  if (end <= 0) {
	    return ''
	  }
	
	  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
	  end >>>= 0
	  start >>>= 0
	
	  if (end <= start) {
	    return ''
	  }
	
	  if (!encoding) encoding = 'utf8'
	
	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)
	
	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)
	
	      case 'ascii':
	        return asciiSlice(this, start, end)
	
	      case 'latin1':
	      case 'binary':
	        return latin1Slice(this, start, end)
	
	      case 'base64':
	        return base64Slice(this, start, end)
	
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)
	
	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	
	// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
	// Buffer instances.
	Buffer.prototype._isBuffer = true
	
	function swap (b, n, m) {
	  var i = b[n]
	  b[n] = b[m]
	  b[m] = i
	}
	
	Buffer.prototype.swap16 = function swap16 () {
	  var len = this.length
	  if (len % 2 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 16-bits')
	  }
	  for (var i = 0; i < len; i += 2) {
	    swap(this, i, i + 1)
	  }
	  return this
	}
	
	Buffer.prototype.swap32 = function swap32 () {
	  var len = this.length
	  if (len % 4 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 32-bits')
	  }
	  for (var i = 0; i < len; i += 4) {
	    swap(this, i, i + 3)
	    swap(this, i + 1, i + 2)
	  }
	  return this
	}
	
	Buffer.prototype.swap64 = function swap64 () {
	  var len = this.length
	  if (len % 8 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 64-bits')
	  }
	  for (var i = 0; i < len; i += 8) {
	    swap(this, i, i + 7)
	    swap(this, i + 1, i + 6)
	    swap(this, i + 2, i + 5)
	    swap(this, i + 3, i + 4)
	  }
	  return this
	}
	
	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}
	
	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}
	
	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}
	
	Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
	  if (!Buffer.isBuffer(target)) {
	    throw new TypeError('Argument must be a Buffer')
	  }
	
	  if (start === undefined) {
	    start = 0
	  }
	  if (end === undefined) {
	    end = target ? target.length : 0
	  }
	  if (thisStart === undefined) {
	    thisStart = 0
	  }
	  if (thisEnd === undefined) {
	    thisEnd = this.length
	  }
	
	  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
	    throw new RangeError('out of range index')
	  }
	
	  if (thisStart >= thisEnd && start >= end) {
	    return 0
	  }
	  if (thisStart >= thisEnd) {
	    return -1
	  }
	  if (start >= end) {
	    return 1
	  }
	
	  start >>>= 0
	  end >>>= 0
	  thisStart >>>= 0
	  thisEnd >>>= 0
	
	  if (this === target) return 0
	
	  var x = thisEnd - thisStart
	  var y = end - start
	  var len = Math.min(x, y)
	
	  var thisCopy = this.slice(thisStart, thisEnd)
	  var targetCopy = target.slice(start, end)
	
	  for (var i = 0; i < len; ++i) {
	    if (thisCopy[i] !== targetCopy[i]) {
	      x = thisCopy[i]
	      y = targetCopy[i]
	      break
	    }
	  }
	
	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}
	
	// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
	// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
	//
	// Arguments:
	// - buffer - a Buffer to search
	// - val - a string, Buffer, or number
	// - byteOffset - an index into `buffer`; will be clamped to an int32
	// - encoding - an optional encoding, relevant is val is a string
	// - dir - true for indexOf, false for lastIndexOf
	function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
	  // Empty buffer means no match
	  if (buffer.length === 0) return -1
	
	  // Normalize byteOffset
	  if (typeof byteOffset === 'string') {
	    encoding = byteOffset
	    byteOffset = 0
	  } else if (byteOffset > 0x7fffffff) {
	    byteOffset = 0x7fffffff
	  } else if (byteOffset < -0x80000000) {
	    byteOffset = -0x80000000
	  }
	  byteOffset = +byteOffset  // Coerce to Number.
	  if (isNaN(byteOffset)) {
	    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
	    byteOffset = dir ? 0 : (buffer.length - 1)
	  }
	
	  // Normalize byteOffset: negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
	  if (byteOffset >= buffer.length) {
	    if (dir) return -1
	    else byteOffset = buffer.length - 1
	  } else if (byteOffset < 0) {
	    if (dir) byteOffset = 0
	    else return -1
	  }
	
	  // Normalize val
	  if (typeof val === 'string') {
	    val = Buffer.from(val, encoding)
	  }
	
	  // Finally, search either indexOf (if dir is true) or lastIndexOf
	  if (Buffer.isBuffer(val)) {
	    // Special case: looking for empty string/buffer always fails
	    if (val.length === 0) {
	      return -1
	    }
	    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
	  } else if (typeof val === 'number') {
	    val = val & 0xFF // Search for a byte value [0-255]
	    if (Buffer.TYPED_ARRAY_SUPPORT &&
	        typeof Uint8Array.prototype.indexOf === 'function') {
	      if (dir) {
	        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
	      } else {
	        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
	      }
	    }
	    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
	  }
	
	  throw new TypeError('val must be string, number or Buffer')
	}
	
	function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
	  var indexSize = 1
	  var arrLength = arr.length
	  var valLength = val.length
	
	  if (encoding !== undefined) {
	    encoding = String(encoding).toLowerCase()
	    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
	        encoding === 'utf16le' || encoding === 'utf-16le') {
	      if (arr.length < 2 || val.length < 2) {
	        return -1
	      }
	      indexSize = 2
	      arrLength /= 2
	      valLength /= 2
	      byteOffset /= 2
	    }
	  }
	
	  function read (buf, i) {
	    if (indexSize === 1) {
	      return buf[i]
	    } else {
	      return buf.readUInt16BE(i * indexSize)
	    }
	  }
	
	  var i
	  if (dir) {
	    var foundIndex = -1
	    for (i = byteOffset; i < arrLength; i++) {
	      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
	      } else {
	        if (foundIndex !== -1) i -= i - foundIndex
	        foundIndex = -1
	      }
	    }
	  } else {
	    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
	    for (i = byteOffset; i >= 0; i--) {
	      var found = true
	      for (var j = 0; j < valLength; j++) {
	        if (read(arr, i + j) !== read(val, j)) {
	          found = false
	          break
	        }
	      }
	      if (found) return i
	    }
	  }
	
	  return -1
	}
	
	Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
	  return this.indexOf(val, byteOffset, encoding) !== -1
	}
	
	Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
	}
	
	Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
	}
	
	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }
	
	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')
	
	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; ++i) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) return i
	    buf[offset + i] = parsed
	  }
	  return i
	}
	
	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}
	
	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}
	
	function latin1Write (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}
	
	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}
	
	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}
	
	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    throw new Error(
	      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
	    )
	  }
	
	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining
	
	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('Attempt to write outside buffer bounds')
	  }
	
	  if (!encoding) encoding = 'utf8'
	
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)
	
	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)
	
	      case 'ascii':
	        return asciiWrite(this, string, offset, length)
	
	      case 'latin1':
	      case 'binary':
	        return latin1Write(this, string, offset, length)
	
	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)
	
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)
	
	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	
	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}
	
	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}
	
	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []
	
	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1
	
	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint
	
	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }
	
	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }
	
	    res.push(codePoint)
	    i += bytesPerSequence
	  }
	
	  return decodeCodePointsArray(res)
	}
	
	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000
	
	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }
	
	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}
	
	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)
	
	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}
	
	function latin1Slice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)
	
	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}
	
	function hexSlice (buf, start, end) {
	  var len = buf.length
	
	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len
	
	  var out = ''
	  for (var i = start; i < end; ++i) {
	    out += toHex(buf[i])
	  }
	  return out
	}
	
	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}
	
	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end
	
	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }
	
	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }
	
	  if (end < start) end = start
	
	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = this.subarray(start, end)
	    newBuf.__proto__ = Buffer.prototype
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; ++i) {
	      newBuf[i] = this[i + start]
	    }
	  }
	
	  return newBuf
	}
	
	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}
	
	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	
	  return val
	}
	
	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }
	
	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }
	
	  return val
	}
	
	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}
	
	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}
	
	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}
	
	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}
	
	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}
	
	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80
	
	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)
	
	  return val
	}
	
	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80
	
	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)
	
	  return val
	}
	
	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}
	
	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}
	
	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}
	
	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}
	
	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}
	
	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}
	
	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}
	
	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}
	
	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}
	
	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	}
	
	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }
	
	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }
	
	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}
	
	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}
	
	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}
	
	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}
	
	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)
	
	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }
	
	  var i = 0
	  var mul = 1
	  var sub = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)
	
	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }
	
	  var i = byteLength - 1
	  var mul = 1
	  var sub = 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}
	
	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}
	
	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	  if (offset < 0) throw new RangeError('Index out of range')
	}
	
	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}
	
	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}
	
	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}
	
	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}
	
	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}
	
	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}
	
	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start
	
	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0
	
	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')
	
	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }
	
	  var len = end - start
	  var i
	
	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; --i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; ++i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    Uint8Array.prototype.set.call(
	      target,
	      this.subarray(start, start + len),
	      targetStart
	    )
	  }
	
	  return len
	}
	
	// Usage:
	//    buffer.fill(number[, offset[, end]])
	//    buffer.fill(buffer[, offset[, end]])
	//    buffer.fill(string[, offset[, end]][, encoding])
	Buffer.prototype.fill = function fill (val, start, end, encoding) {
	  // Handle string cases:
	  if (typeof val === 'string') {
	    if (typeof start === 'string') {
	      encoding = start
	      start = 0
	      end = this.length
	    } else if (typeof end === 'string') {
	      encoding = end
	      end = this.length
	    }
	    if (val.length === 1) {
	      var code = val.charCodeAt(0)
	      if (code < 256) {
	        val = code
	      }
	    }
	    if (encoding !== undefined && typeof encoding !== 'string') {
	      throw new TypeError('encoding must be a string')
	    }
	    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
	      throw new TypeError('Unknown encoding: ' + encoding)
	    }
	  } else if (typeof val === 'number') {
	    val = val & 255
	  }
	
	  // Invalid ranges are not set to a default, so can range check early.
	  if (start < 0 || this.length < start || this.length < end) {
	    throw new RangeError('Out of range index')
	  }
	
	  if (end <= start) {
	    return this
	  }
	
	  start = start >>> 0
	  end = end === undefined ? this.length : end >>> 0
	
	  if (!val) val = 0
	
	  var i
	  if (typeof val === 'number') {
	    for (i = start; i < end; ++i) {
	      this[i] = val
	    }
	  } else {
	    var bytes = Buffer.isBuffer(val)
	      ? val
	      : utf8ToBytes(new Buffer(val, encoding).toString())
	    var len = bytes.length
	    for (i = 0; i < end - start; ++i) {
	      this[i + start] = bytes[i % len]
	    }
	  }
	
	  return this
	}
	
	// HELPER FUNCTIONS
	// ================
	
	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g
	
	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}
	
	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}
	
	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}
	
	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []
	
	  for (var i = 0; i < length; ++i) {
	    codePoint = string.charCodeAt(i)
	
	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }
	
	        // valid lead
	        leadSurrogate = codePoint
	
	        continue
	      }
	
	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }
	
	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }
	
	    leadSurrogate = null
	
	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }
	
	  return bytes
	}
	
	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}
	
	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    if ((units -= 2) < 0) break
	
	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }
	
	  return byteArray
	}
	
	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}
	
	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; ++i) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}
	
	function isnan (val) {
	  return val !== val // eslint-disable-line no-self-compare
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 46 */
/***/ (function(module, exports) {

	'use strict'
	
	exports.byteLength = byteLength
	exports.toByteArray = toByteArray
	exports.fromByteArray = fromByteArray
	
	var lookup = []
	var revLookup = []
	var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array
	
	var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
	for (var i = 0, len = code.length; i < len; ++i) {
	  lookup[i] = code[i]
	  revLookup[code.charCodeAt(i)] = i
	}
	
	// Support decoding URL-safe base64 strings, as Node.js does.
	// See: https://en.wikipedia.org/wiki/Base64#URL_applications
	revLookup['-'.charCodeAt(0)] = 62
	revLookup['_'.charCodeAt(0)] = 63
	
	function getLens (b64) {
	  var len = b64.length
	
	  if (len % 4 > 0) {
	    throw new Error('Invalid string. Length must be a multiple of 4')
	  }
	
	  // Trim off extra bytes after placeholder bytes are found
	  // See: https://github.com/beatgammit/base64-js/issues/42
	  var validLen = b64.indexOf('=')
	  if (validLen === -1) validLen = len
	
	  var placeHoldersLen = validLen === len
	    ? 0
	    : 4 - (validLen % 4)
	
	  return [validLen, placeHoldersLen]
	}
	
	// base64 is 4/3 + up to two characters of the original data
	function byteLength (b64) {
	  var lens = getLens(b64)
	  var validLen = lens[0]
	  var placeHoldersLen = lens[1]
	  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
	}
	
	function _byteLength (b64, validLen, placeHoldersLen) {
	  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
	}
	
	function toByteArray (b64) {
	  var tmp
	  var lens = getLens(b64)
	  var validLen = lens[0]
	  var placeHoldersLen = lens[1]
	
	  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))
	
	  var curByte = 0
	
	  // if there are placeholders, only get up to the last complete 4 chars
	  var len = placeHoldersLen > 0
	    ? validLen - 4
	    : validLen
	
	  for (var i = 0; i < len; i += 4) {
	    tmp =
	      (revLookup[b64.charCodeAt(i)] << 18) |
	      (revLookup[b64.charCodeAt(i + 1)] << 12) |
	      (revLookup[b64.charCodeAt(i + 2)] << 6) |
	      revLookup[b64.charCodeAt(i + 3)]
	    arr[curByte++] = (tmp >> 16) & 0xFF
	    arr[curByte++] = (tmp >> 8) & 0xFF
	    arr[curByte++] = tmp & 0xFF
	  }
	
	  if (placeHoldersLen === 2) {
	    tmp =
	      (revLookup[b64.charCodeAt(i)] << 2) |
	      (revLookup[b64.charCodeAt(i + 1)] >> 4)
	    arr[curByte++] = tmp & 0xFF
	  }
	
	  if (placeHoldersLen === 1) {
	    tmp =
	      (revLookup[b64.charCodeAt(i)] << 10) |
	      (revLookup[b64.charCodeAt(i + 1)] << 4) |
	      (revLookup[b64.charCodeAt(i + 2)] >> 2)
	    arr[curByte++] = (tmp >> 8) & 0xFF
	    arr[curByte++] = tmp & 0xFF
	  }
	
	  return arr
	}
	
	function tripletToBase64 (num) {
	  return lookup[num >> 18 & 0x3F] +
	    lookup[num >> 12 & 0x3F] +
	    lookup[num >> 6 & 0x3F] +
	    lookup[num & 0x3F]
	}
	
	function encodeChunk (uint8, start, end) {
	  var tmp
	  var output = []
	  for (var i = start; i < end; i += 3) {
	    tmp =
	      ((uint8[i] << 16) & 0xFF0000) +
	      ((uint8[i + 1] << 8) & 0xFF00) +
	      (uint8[i + 2] & 0xFF)
	    output.push(tripletToBase64(tmp))
	  }
	  return output.join('')
	}
	
	function fromByteArray (uint8) {
	  var tmp
	  var len = uint8.length
	  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
	  var parts = []
	  var maxChunkLength = 16383 // must be multiple of 3
	
	  // go through the array every three bytes, we'll deal with trailing stuff later
	  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
	    parts.push(encodeChunk(
	      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
	    ))
	  }
	
	  // pad the end with zeros, but make sure to not forget the extra bytes
	  if (extraBytes === 1) {
	    tmp = uint8[len - 1]
	    parts.push(
	      lookup[tmp >> 2] +
	      lookup[(tmp << 4) & 0x3F] +
	      '=='
	    )
	  } else if (extraBytes === 2) {
	    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
	    parts.push(
	      lookup[tmp >> 10] +
	      lookup[(tmp >> 4) & 0x3F] +
	      lookup[(tmp << 2) & 0x3F] +
	      '='
	    )
	  }
	
	  return parts.join('')
	}


/***/ }),
/* 47 */
/***/ (function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = (nBytes * 8) - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]
	
	  i += d
	
	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}
	
	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}
	
	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}
	
	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = (nBytes * 8) - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0
	
	  value = Math.abs(value)
	
	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }
	
	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = ((value * c) - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }
	
	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}
	
	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}
	
	  buffer[offset + i - d] |= s * 128
	}


/***/ }),
/* 48 */
/***/ (function(module, exports) {

	var toString = {}.toString;
	
	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.get = get;
	exports.isCollection = isCollection;
	exports.set = set;
	
	var _detector = __webpack_require__(42);
	
	/**
	 * collection types
	 */
	const collectionTypeSet = new Set(['Arguments', 'Array', 'Map', 'Object', 'Set']);
	/**
	 * get value from collection
	 *
	 * @param {Array|Object|Map|Set} collection
	 * @param {string|number|symbol} key
	 * @param {string} [type=null]
	 * @return {*}
	 */
	
	function get(collection, key, type = null) {
	  const valueType = type || (0, _detector.detectType)(collection);
	
	  switch (valueType) {
	    case 'Arguments':
	    case 'Array':
	    case 'Object':
	      return collection[key];
	
	    case 'Map':
	      return collection.get(key);
	
	    case 'Set':
	      // NOTE: Set.prototype.keys is alias of Set.prototype.values
	      // it means key is equals value
	      return key;
	
	    default:
	  }
	}
	/**
	 * check to type string is collection
	 *
	 * @param {string} type
	 */
	
	
	function isCollection(type) {
	  return collectionTypeSet.has(type);
	}
	/**
	 * set value to collection
	 *
	 * @param {Array|Object|Map|Set} collection
	 * @param {string|number|symbol} key
	 * @param {*} value
	 * @param {string} [type=null]
	 * @return {Array|Object|Map|Set}
	 */
	
	
	function set(collection, key, value, type = null) {
	  const valueType = type || (0, _detector.detectType)(collection);
	
	  switch (valueType) {
	    case 'Arguments':
	    case 'Array':
	    case 'Object':
	      collection[key] = value;
	      break;
	
	    case 'Map':
	      collection.set(key, value);
	      break;
	
	    case 'Set':
	      collection.add(value);
	      break;
	
	    default:
	  }
	
	  return collection;
	}
	//# sourceMappingURL=collection.js.map

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.copy = copy;
	
	var _copy_map = _interopRequireDefault(__webpack_require__(51));
	
	var _detector = __webpack_require__(42);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * no operation
	 */
	function noop() {}
	/**
	 * copy value
	 *
	 * @param {*} value
	 * @param {string} [type=null]
	 * @param {Function} [customizer=noop]
	 * @return {*}
	 */
	
	
	function copy(value, type = null, customizer = noop) {
	  if (arguments.length === 2 && typeof type === 'function') {
	    customizer = type;
	    type = null;
	  }
	
	  const valueType = type || (0, _detector.detectType)(value);
	
	  const copyFunction = _copy_map.default.get(valueType);
	
	  if (valueType === 'Object') {
	    const result = customizer(value, valueType);
	
	    if (result !== undefined) {
	      return result;
	    }
	  } // NOTE: TypedArray needs pass type to argument
	
	
	  return copyFunction ? copyFunction(value, valueType) : value;
	}
	//# sourceMappingURL=copier.js.map

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;
	
	var _buffer = __webpack_require__(44);
	
	const globalObject = Function('return this')();
	/**
	 * copy ArrayBuffer
	 *
	 * @param {ArrayBuffer} value
	 * @return {ArrayBuffer}
	 */
	
	function copyArrayBuffer(value) {
	  return value.slice(0);
	}
	/**
	 * copy Boolean
	 *
	 * @param {Boolean} value
	 * @return {Boolean}
	 */
	
	
	function copyBoolean(value) {
	  return new Boolean(value.valueOf());
	}
	/**
	 * copy DataView
	 *
	 * @param {DataView} value
	 * @return {DataView}
	 */
	
	
	function copyDataView(value) {
	  // TODO: copy ArrayBuffer?
	  return new DataView(value.buffer);
	}
	/**
	 * copy Buffer
	 *
	 * @param {Buffer} value
	 * @return {Buffer}
	 */
	
	
	function copyBuffer(value) {
	  return (0, _buffer.copy)(value);
	}
	/**
	 * copy Date
	 *
	 * @param {Date} value
	 * @return {Date}
	 */
	
	
	function copyDate(value) {
	  return new Date(value.getTime());
	}
	/**
	 * copy Number
	 *
	 * @param {Number} value
	 * @return {Number}
	 */
	
	
	function copyNumber(value) {
	  return new Number(value);
	}
	/**
	 * copy RegExp
	 *
	 * @param {RegExp} value
	 * @return {RegExp}
	 */
	
	
	function copyRegExp(value) {
	  return new RegExp(value.source || '(?:)', value.flags);
	}
	/**
	 * copy String
	 *
	 * @param {String} value
	 * @return {String}
	 */
	
	
	function copyString(value) {
	  return new String(value);
	}
	/**
	 * copy TypedArray
	 *
	 * @param {*} value
	 * @return {*}
	 */
	
	
	function copyTypedArray(value, type) {
	  return globalObject[type].from(value);
	}
	/**
	 * shallow copy
	 *
	 * @param {*} value
	 * @return {*}
	 */
	
	
	function shallowCopy(value) {
	  return value;
	}
	/**
	 * get empty Array
	 *
	 * @return {Array}
	 */
	
	
	function getEmptyArray() {
	  return [];
	}
	/**
	 * get empty Map
	 *
	 * @return {Map}
	 */
	
	
	function getEmptyMap() {
	  return new Map();
	}
	/**
	 * get empty Object
	 *
	 * @return {Object}
	 */
	
	
	function getEmptyObject() {
	  return {};
	}
	/**
	 * get empty Set
	 *
	 * @return {Set}
	 */
	
	
	function getEmptySet() {
	  return new Set();
	}
	
	var _default = new Map([// deep copy
	['ArrayBuffer', copyArrayBuffer], ['Boolean', copyBoolean], ['Buffer', copyBuffer], ['DataView', copyDataView], ['Date', copyDate], ['Number', copyNumber], ['RegExp', copyRegExp], ['String', copyString], // typed arrays
	// TODO: pass bound function
	['Float32Array', copyTypedArray], ['Float64Array', copyTypedArray], ['Int16Array', copyTypedArray], ['Int32Array', copyTypedArray], ['Int8Array', copyTypedArray], ['Uint16Array', copyTypedArray], ['Uint32Array', copyTypedArray], ['Uint8Array', copyTypedArray], ['Uint8ClampedArray', copyTypedArray], // shallow copy
	['Array Iterator', shallowCopy], ['Map Iterator', shallowCopy], ['Promise', shallowCopy], ['Set Iterator', shallowCopy], ['String Iterator', shallowCopy], ['function', shallowCopy], ['global', shallowCopy], // NOTE: WeakMap and WeakSet cannot get entries
	['WeakMap', shallowCopy], ['WeakSet', shallowCopy], // primitives
	['boolean', shallowCopy], ['null', shallowCopy], ['number', shallowCopy], ['string', shallowCopy], ['symbol', shallowCopy], ['undefined', shallowCopy], // collections
	// NOTE: return empty value, because recursively copy later.
	['Arguments', getEmptyArray], ['Array', getEmptyArray], ['Map', getEmptyMap], ['Object', getEmptyObject], ['Set', getEmptySet] // NOTE: type-detect returns following types
	// 'Location'
	// 'Document'
	// 'MimeTypeArray'
	// 'PluginArray'
	// 'HTMLQuoteElement'
	// 'HTMLTableDataCellElement'
	// 'HTMLTableHeaderCellElement'
	// TODO: is type-detect never return 'object'?
	// 'object'
	]);
	
	exports.default = _default;
	//# sourceMappingURL=copy_map.js.map

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	var pSlice = Array.prototype.slice;
	var objectKeys = __webpack_require__(53);
	var isArguments = __webpack_require__(54);
	
	var deepEqual = module.exports = function (actual, expected, opts) {
	  if (!opts) opts = {};
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;
	
	  } else if (actual instanceof Date && expected instanceof Date) {
	    return actual.getTime() === expected.getTime();
	
	  // 7.3. Other pairs that do not both pass typeof value == 'object',
	  // equivalence is determined by ==.
	  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
	    return opts.strict ? actual === expected : actual == expected;
	
	  // 7.4. For all other Object pairs, including Array objects, equivalence is
	  // determined by having the same number of owned properties (as verified
	  // with Object.prototype.hasOwnProperty.call), the same set of keys
	  // (although not necessarily the same order), equivalent values for every
	  // corresponding key, and an identical 'prototype' property. Note: this
	  // accounts for both named and indexed properties on Arrays.
	  } else {
	    return objEquiv(actual, expected, opts);
	  }
	}
	
	function isUndefinedOrNull(value) {
	  return value === null || value === undefined;
	}
	
	function isBuffer (x) {
	  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
	  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
	    return false;
	  }
	  if (x.length > 0 && typeof x[0] !== 'number') return false;
	  return true;
	}
	
	function objEquiv(a, b, opts) {
	  var i, key;
	  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
	    return false;
	  // an identical 'prototype' property.
	  if (a.prototype !== b.prototype) return false;
	  //~~~I've managed to break Object.keys through screwy arguments passing.
	  //   Converting to array solves the problem.
	  if (isArguments(a)) {
	    if (!isArguments(b)) {
	      return false;
	    }
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return deepEqual(a, b, opts);
	  }
	  if (isBuffer(a)) {
	    if (!isBuffer(b)) {
	      return false;
	    }
	    if (a.length !== b.length) return false;
	    for (i = 0; i < a.length; i++) {
	      if (a[i] !== b[i]) return false;
	    }
	    return true;
	  }
	  try {
	    var ka = objectKeys(a),
	        kb = objectKeys(b);
	  } catch (e) {//happens when one is a string literal and the other isn't
	    return false;
	  }
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length != kb.length)
	    return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] != kb[i])
	      return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!deepEqual(a[key], b[key], opts)) return false;
	  }
	  return typeof a === typeof b;
	}


/***/ }),
/* 53 */
/***/ (function(module, exports) {

	exports = module.exports = typeof Object.keys === 'function'
	  ? Object.keys : shim;
	
	exports.shim = shim;
	function shim (obj) {
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  return keys;
	}


/***/ }),
/* 54 */
/***/ (function(module, exports) {

	var supportsArgumentsClass = (function(){
	  return Object.prototype.toString.call(arguments)
	})() == '[object Arguments]';
	
	exports = module.exports = supportsArgumentsClass ? supported : unsupported;
	
	exports.supported = supported;
	function supported(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	};
	
	exports.unsupported = unsupported;
	function unsupported(object){
	  return object &&
	    typeof object == 'object' &&
	    typeof object.length == 'number' &&
	    Object.prototype.hasOwnProperty.call(object, 'callee') &&
	    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
	    false;
	};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.noop = exports.descriptorIsFunc = undefined;
	
	var _validationHelpers = __webpack_require__(56);
	
	var descriptorIsFunc = exports.descriptorIsFunc = function descriptorIsFunc(key, func) {
	  if (!(0, _validationHelpers._isFunction)(func)) {
	    throw Error(key + ' is not a function!');
	  }
	  return true;
	}; /**
	   * Helper function
	   *
	   * @author  Avraam Mavridis      <avr.mav@gmail.com>
	   *
	   */
	
	var noop = exports.noop = function noop() {};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._basefunc = exports._isValidSchema = exports._isString = exports._isPromise = exports._isFunction = exports._isBoolean = exports._isInteger = exports._isNumber = exports._isArray = exports._isObject = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
	                                                                                                                                                                                                                                                                              * Validation helpers for simple use cases
	                                                                                                                                                                                                                                                                              *
	                                                                                                                                                                                                                                                                              * @author  Avraam Mavridis      <avr.mav@gmail.com>
	                                                                                                                                                                                                                                                                              *
	                                                                                                                                                                                                                                                                              */
	
	
	var _helpers = __webpack_require__(55);
	
	/**
	 * Tests if the prop is an Object
	 *
	 * @method isObject
	 *
	 * @param  { any } prop
	 *
	 * @return { Boolean }
	 */
	var _isObject = exports._isObject = function _isObject(prop) {
	  return (typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) === 'object' && prop !== null;
	};
	
	/**
	 * Tests if something is an Array
	 *
	 * @type { Boolean }
	 */
	var _isArray = exports._isArray = Array.isArray;
	
	/**
	 * Tests if the prop is a number
	 *
	 * @method isNumber
	 *
	 * @param  { any } prop
	 *
	 * @return { Boolean }
	 */
	var _isNumber = exports._isNumber = function _isNumber(prop) {
	  return typeof prop === 'number' && isFinite(prop);
	};
	
	/**
	 * Tests if the prop is an integer
	 *
	 * @method inInteger
	 *
	 * @param  { any } prop
	 *
	 * @return { Boolean }
	 */
	var _isInteger = exports._isInteger = function isInteger(prop) {
	  return _isNumber(prop) && prop % 1 === 0;
	};
	
	/**
	 * Tests if the prop is Boolean
	 *
	 * @method isBoolean
	 *
	 * @param  { any }  prop
	 *
	 * @return { Boolean }
	 */
	var _isBoolean = exports._isBoolean = function _isBoolean(prop) {
	  return typeof prop === 'boolean';
	};
	
	/**
	 * Tests if the prop is Function
	 *
	 * @method isBoolean
	 *
	 * @param  { any }  prop
	 *
	 * @return { Boolean }
	 */
	var _isFunction = exports._isFunction = function _isFunction(prop) {
	  return typeof prop === 'function';
	};
	
	/**
	 * Tests if the prop is a Promise
	 *
	 * @method isPromise
	 *
	 * @param  { any }  prop
	 *
	 * @return { Boolean }
	 */
	var _isPromise = exports._isPromise = function _isPromise(prop) {
	  return prop !== null && ((typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) === 'object' || typeof prop === 'function') && typeof prop.then === 'function';
	};
	
	/**
	 * Tests if the prop is a String
	 *
	 * @method isString
	 *
	 * @param  { any }  prop
	 *
	 * @return { Boolean }
	 */
	var _isString = exports._isString = function _isString(prop) {
	  return typeof prop === 'string';
	};
	
	/**
	 * validate a schema property
	 *
	 * @method _validateProperty
	 *
	 * @param  { any }          property
	 * @param  { string }       type
	 *
	 * @return { boolean } or throws exception
	 */
	var _validateProperty = function _validateProperty(property, type) {
	  var isValid = true;
	  switch (type) {
	    case 'object':
	      isValid = _isObject(property);
	      break;
	    case 'number':
	      isValid = _isNumber(property);
	      break;
	    case 'integer':
	      isValid = _isInteger(property);
	      break;
	    case 'boolean':
	      isValid = _isBoolean(property);
	      break;
	    case 'array':
	      isValid = _isArray(property);
	      break;
	    case 'function':
	      isValid = _isFunction(property);
	      break;
	    case 'string':
	      isValid = _isString(property);
	      break;
	    case 'promise':
	      isValid = _isPromise(property);
	      break;
	    default:
	      throw Error(type + ' invalid type');
	  }
	  if (!isValid) {
	    throw Error(property + ' is not ' + type);
	  }
	};
	
	/**
	 * validate against a schema
	 *
	 * @method isValidSchema
	 *
	 * @param  { object }      schema
	 * @param  { number }      position = 0
	 *
	 * @return { Boolean }
	 */
	var _isValidSchema = exports._isValidSchema = function _isValidSchema(schema) {
	  var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	
	  var schemaKeys = Object.keys(schema);
	
	  return function (target, key, descriptor) {
	    var func = descriptor.value;
	    descriptor.value = function () {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }
	
	      var prop = args[position];
	      if (!_isObject(prop)) {
	        throw Error(prop + ' is not an object');
	      }
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;
	
	      try {
	        for (var _iterator = schemaKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var schemaKey = _step.value;
	
	          if (!prop.hasOwnProperty(schemaKey)) {
	            throw Error('Object has not "' + schemaKey + '" property');
	          }
	          _validateProperty(prop[schemaKey], schema[schemaKey]);
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	
	      return func.apply(this, args);
	    };
	    return descriptor;
	  };
	};
	
	/**
	 * Returns the positions to validate
	 *
	 * @method _getPropsToValidate
	 *
	 * @param  {[type]}            position = 0  [description]
	 * @param  {[type]}            args     = [] [description]
	 *
	 * @return {[type]}            [description]
	 */
	var _getPropsToValidate = function _getPropsToValidate() {
	  var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	
	  var positions = [].concat(position);
	  var props = [];
	  var _iteratorNormalCompletion2 = true;
	  var _didIteratorError2 = false;
	  var _iteratorError2 = undefined;
	
	  try {
	    for (var _iterator2 = positions[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	      var p = _step2.value;
	
	      if (args[p]) {
	        props.push(args[p]);
	      }
	    }
	  } catch (err) {
	    _didIteratorError2 = true;
	    _iteratorError2 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion2 && _iterator2.return) {
	        _iterator2.return();
	      }
	    } finally {
	      if (_didIteratorError2) {
	        throw _iteratorError2;
	      }
	    }
	  }
	
	  return props;
	};
	
	/**
	 * Base decorator function for validation
	 *
	 * @method _basefunc
	 *
	 * @param  { integer }   position        Position of the property to validate
	 * @param  { function }  validationFunc  Validation function
	 * @param  { string }    errorMsg        Error message in case of invalid
	 *
	 * @return { function }  decorator function
	 */
	var _basefunc = exports._basefunc = function _basefunc() {
	  var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	  var validationFunc = arguments[1];
	  var errorMsg = arguments[2];
	  var failSilent = arguments[3];
	
	  return function (key, target, descriptor) {
	    var func = descriptor.value;
	    (0, _helpers.descriptorIsFunc)(key, func);
	    descriptor.value = function () {
	      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	      }
	
	      var props = _getPropsToValidate(position, args);
	      props.forEach(function (prop) {
	        if (!validationFunc(prop)) {
	          if (failSilent) return;
	          throw Error(prop + ' ' + errorMsg);
	        }
	      });
	      return func.apply(this, args);
	    };
	
	    return descriptor;
	  };
	};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._validateSchema = exports._acceptsString = exports._acceptsPromise = exports._acceptsFunction = exports._acceptsBoolean = exports._acceptsInteger = exports._acceptsNumber = exports._acceptsArray = exports._acceptsObject = undefined;
	
	var _validationHelpers = __webpack_require__(56);
	
	/**
	 * @acceptsObject Decorator
	 *
	 * @method acceptsObject
	 *
	 * @param  { integer|array }  position = 0 Position of the property to validate
	 *
	 * @return { function }  Decorator
	 */
	var _acceptsObject = exports._acceptsObject = function acceptsObject() {
	  var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	  var failSilent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
	  return (0, _validationHelpers._basefunc)(position, _validationHelpers._isObject, ' is not an object', failSilent);
	};
	
	/**
	 * @acceptsArray Decorator
	 *
	 * @method acceptsObject
	 *
	 * @param  { integer|array }  position = 0 Position of the property to validate
	 *
	 * @return { function }  Decorator
	 */
	/**
	* Validation related decorators
	*
	* @author  Avraam Mavridis      <avr.mav@gmail.com>
	*
	*/
	var _acceptsArray = exports._acceptsArray = function acceptsArray() {
	  var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	  var failSilent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
	  return (0, _validationHelpers._basefunc)(position, _validationHelpers._isArray, ' is not an array', failSilent);
	};
	
	/**
	 * @acceptsNumber Decorator
	 *
	 * @method acceptsObject
	 *
	 * @param  { integer|array }  position = 0 Position of the property to validate
	 *
	 * @return { function }  Decorator
	 */
	var _acceptsNumber = exports._acceptsNumber = function acceptsNumber() {
	  var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	  var failSilent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
	  return (0, _validationHelpers._basefunc)(position, _validationHelpers._isNumber, ' is not a number', failSilent);
	};
	
	/**
	 * @acceptsInteger Decorator
	 *
	 * @method acceptsObject
	 *
	 * @param  { integer|array }  position = 0 Position of the property to validate
	 *
	 * @return { function }  Decorator
	 */
	var _acceptsInteger = exports._acceptsInteger = function acceptsInteger() {
	  var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	  var failSilent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
	  return (0, _validationHelpers._basefunc)(position, _validationHelpers._isInteger, ' is not an integer', failSilent);
	};
	
	/**
	 * @acceptsBoolean Decorator
	 *
	 * @method acceptsObject
	 *
	 * @param  { integer|array }  position = 0 Position of the property to validate
	 *
	 * @return { function }  Decorator
	 */
	var _acceptsBoolean = exports._acceptsBoolean = function acceptsBoolean() {
	  var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	  var failSilent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
	  return (0, _validationHelpers._basefunc)(position, _validationHelpers._isBoolean, ' is not a boolean', failSilent);
	};
	
	/**
	 * @acceptsFunction Decorator
	 *
	 * @method acceptsObject
	 *
	 * @param  { integer|array }  position = 0 Position of the property to validate
	 *
	 * @return { function }  Decorator
	 */
	var _acceptsFunction = exports._acceptsFunction = function acceptsFunction() {
	  var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	  var failSilent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
	  return (0, _validationHelpers._basefunc)(position, _validationHelpers._isFunction, ' is not a function', failSilent);
	};
	
	/**
	 * @acceptsPromise Decorator
	 *
	 * @method acceptsObject
	 *
	 * @param  { integer|array }  position = 0 Position of the property to validate
	 *
	 * @return { function }  Decorator
	 */
	var _acceptsPromise = exports._acceptsPromise = function acceptsPromise() {
	  var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	  var failSilent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
	  return (0, _validationHelpers._basefunc)(position, _validationHelpers._isPromise, ' is not a promise', failSilent);
	};
	
	/**
	 * @acceptsString Decorator
	 *
	 * @method acceptsString
	 *
	 * @param  { integer|array }  position = 0 Position of the property to validate
	 *
	 * @return { function }  Decorator
	 */
	var _acceptsString = exports._acceptsString = function acceptsString() {
	  var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	  var failSilent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
	  return (0, _validationHelpers._basefunc)(position, _validationHelpers._isString, ' is not a string', failSilent);
	};
	
	/**
	 * @validateSchema Decorator
	 *
	 * @method acceptsObject
	 *
	 * @param  { object }  validation schema
	 * @param  { integer|array }  position = 0 Position of the property to validate
	 *
	 * @return { function }  Decorator
	 */
	var _validateSchema = exports._validateSchema = function validateSchema(schema) {
	  var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	  var failSilent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	
	  return (0, _validationHelpers._isValidSchema)(schema, position, failSilent);
	};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._memoization = undefined;
	
	var _helpers = __webpack_require__(55);
	
	var _memoization = exports._memoization = function _memoization() {
	  var cache = new Map();
	
	  return function (key, target, descriptor) {
	    var func = descriptor.value;
	    (0, _helpers.descriptorIsFunc)(key, func);
	    descriptor.value = function () {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }
	
	      var ckey = args.join('');
	      if (cache.has(ckey)) {
	        return cache.get(ckey);
	      }
	      var res = func.apply(this, args);
	      cache.set(ckey, res);
	      return res;
	    };
	    return descriptor;
	  };
	}; /**
	   * Memoization decorators
	   *
	   * @author  Avraam Mavridis      <avr.mav@gmail.com>
	   *
	   */

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._defer = exports._debounce = exports._timeout = undefined;
	
	var _helpers = __webpack_require__(55);
	
	/**
	 * Timeout decorator
	 *
	 * @method _timeout
	 *
	 * @param  { number } wait = 300
	 *
	 */
	var __timeout = function timeout() {
	  var wait = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 300;
	
	  var debounceKeys = {};
	
	  return function timeoutTarget(key, target, descriptor) {
	    var func = descriptor.value;
	    (0, _helpers.descriptorIsFunc)(key, func);
	    var dkey = Symbol('dkey');
	    descriptor.value = function descriptorValue() {
	      var _this = this;
	
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }
	
	      debounceKeys[dkey] = setTimeout(function () {
	        delete debounceKeys[dkey];
	        func.apply(_this, args);
	      }, wait);
	    };
	    return descriptor;
	  };
	}; /**
	   * Timing related decorators
	   *
	   * @author  Avraam Mavridis      <avr.mav@gmail.com>
	   *
	   */
	var _timeout = exports._timeout = __timeout;
	var _debounce = exports._debounce = __timeout;
	var _defer = exports._defer = __timeout.bind(undefined, 0);

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._donotlog = exports._donotlogerrors = exports._donotlogwarnings = exports._donotlogmessages = exports._donotbase = exports._loglocalstorage = exports._getLocalStorage = exports._log = undefined;
	
	var _helpers = __webpack_require__(55);
	
	/**
	 * Logs the passed arguments and the returned value
	 *
	 * @method log
	 *
	 */
	var _log = exports._log = function _log() {
	  return function (target, key, descriptor) {
	    var func = descriptor.value;
	    (0, _helpers.descriptorIsFunc)(target, func);
	    descriptor.value = function () {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }
	
	      var res = func.apply(this, args);
	      console.log('%c Passed Arguments: ', 'background: #222; color: #bada55', args);
	      console.log('%c Returned Value  : ', 'background: #bada55; color: #222', res);
	      return res;
	    };
	    return descriptor;
	  };
	};
	
	/**
	 * Returns the global localStorage
	 *
	 * @method getLocalStorage
	 *
	 * @return { object }
	 */
	/**
	* Debugging decorators
	*
	* @author  Avraam Mavridis      <avr.mav@gmail.com>
	*
	*/
	var _getLocalStorage = exports._getLocalStorage = function _getLocalStorage() {
	  return localStorage;
	};
	
	/**
	 * Returns an array with the items on localStorage with their sizes
	 *
	 * @method _getLocalStorageItems
	 *
	 * @return {[type]}              [description]
	 */
	var _getLocalStorageItems = function _getLocalStorageItems() {
	  var _localStorage = _getLocalStorage();
	  var sizes = Object.keys(_localStorage);
	  sizes = sizes.map(function (key) {
	    var obj = {};
	    obj.name = key;
	    obj.size = localStorage[key].length * 2 / 1024 / 1024;
	    return obj;
	  });
	  return sizes;
	};
	
	/**
	 * Returns the total size of the items in the localStorage
	 *
	 * @method _getLocalStorageSize
	 *
	 * @return { number }
	 */
	var _getLocalStorageSize = function _getLocalStorageSize() {
	  var items = _getLocalStorageItems();
	  var size = items.reduce(function (sum, next) {
	    return sum + next.size;
	  }, 0);
	  return size;
	};
	
	/**
	 * Logs the localStorage before and after the function call
	 *
	 * @method loglocalstorage
	 *
	 */
	var _loglocalstorage = exports._loglocalstorage = function _loglocalstorage() {
	  return function (target, key, descriptor) {
	    var func = descriptor.value;
	    (0, _helpers.descriptorIsFunc)(target, func);
	    descriptor.value = function () {
	      var sizeBefore = _getLocalStorageSize();
	      console.log('%c Local Storage Size Before Function Call: ', 'background: #222; color: #bada55', sizeBefore + ' MB');
	
	      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	      }
	
	      var res = func.apply(this, args);
	      var sizeAfter = _getLocalStorageSize();
	      console.log('%c Local Storage Size After Function Call : ', 'background: #bada55; color: #222', sizeAfter + ' MB');
	      return res;
	    };
	    return descriptor;
	  };
	};
	
	/**
	 * donotlog decorator, prevents log statements on the console
	 *
	 * @method _donotlog
	 *
	 * @return {[type]}  [description]
	 */
	var _donotbase = exports._donotbase = function _donotbase(type) {
	  var nativeFuncs = {};
	  var types = [].concat(type);
	
	  return function (key, target, descriptor) {
	    var func = descriptor.value;
	    (0, _helpers.descriptorIsFunc)(key, func);
	    descriptor.value = function () {
	      // nooping native console
	      types.forEach(function (_type) {
	        nativeFuncs[_type] = console[_type];
	        console[_type] = _helpers.noop;
	      });
	
	      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	        args[_key3] = arguments[_key3];
	      }
	
	      var res = func.apply(this, args);
	
	      // restore native
	      types.forEach(function (_type) {
	        console[_type] = nativeFuncs[_type];
	      });
	
	      return res;
	    };
	    return descriptor;
	  };
	};
	
	var _donotlogmessages = exports._donotlogmessages = _donotbase.bind({}, 'log');
	var _donotlogwarnings = exports._donotlogwarnings = _donotbase.bind({}, 'warn');
	var _donotlogerrors = exports._donotlogerrors = _donotbase.bind({}, 'error');
	var _donotlog = exports._donotlog = _donotbase.bind({}, ['error', 'log', 'warn', 'table']);

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._timesCalled = exports._once = exports._times = undefined;
	
	var _helpers = __webpack_require__(55);
	
	/**
	 * Executes a function n times, any repeat call returns
	 * the value of the nth call
	 *
	 * @method __times
	 *
	 *
	 * @return { function }  decorator function
	 */
	var __times = function __times() {
	  var times = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
	
	  var timescalled = 0;
	  var res = void 0;
	  return function (target, key, descriptor) {
	    var func = descriptor.value;
	    (0, _helpers.descriptorIsFunc)(key, func);
	    descriptor.value = function () {
	      if (timescalled !== times) {
	        timescalled++;
	
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	          args[_key] = arguments[_key];
	        }
	
	        res = func.apply(this, args);
	      }
	
	      return res;
	    };
	    return descriptor;
	  };
	};
	
	/**
	 * Attaches a property on the function indicating how many times
	 * has been called
	 *
	 * @method __times
	 *
	 *
	 * @return { function }  decorator function
	 */
	/**
	* Execution related decorators
	*
	* @author  Avraam Mavridis      <avr.mav@gmail.com>
	*
	*/
	
	var __timesCalled = function __timesCalled() {
	  return function (target, key, descriptor) {
	    var func = descriptor.value;
	    (0, _helpers.descriptorIsFunc)(key, func);
	    descriptor.value = function () {
	      descriptor.value.timesCalled = descriptor.value.timesCalled || 0;
	      descriptor.value.timesCalled++;
	
	      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	      }
	
	      return func.apply(this, args);
	    };
	    return descriptor;
	  };
	};
	
	var _times = exports._times = __times;
	var _once = exports._once = __times.bind({}, 1);
	var _timesCalled = exports._timesCalled = __timesCalled;

/***/ }),
/* 62 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	* Stators decorators
	*
	* @author  Avraam Mavridis      <avr.mav@gmail.com>
	*
	*/
	
	var _enumerable = exports._enumerable = function enumerable() {
	  return function enumerableTarget(key, target, descriptor) {
	    descriptor.enumerable = true;
	    return descriptor;
	  };
	};
	
	var _nonenumerable = exports._nonenumerable = function nonenumerable() {
	  return function nonenumerableTarget(key, target, descriptor) {
	    descriptor.enumerable = false;
	    return descriptor;
	  };
	};
	
	var _readonly = exports._readonly = function readonly() {
	  return function readonlyTarget(key, target, descriptor) {
	    descriptor.writable = false;
	    return descriptor;
	  };
	};
	
	var _nonconfigurable = exports._nonconfigurable = function nonconfigurable() {
	  return function nonconfigurableTarget(key, target, descriptor) {
	    descriptor.configurable = false;
	    return descriptor;
	  };
	};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._forceoverridden = exports._overridden = undefined;
	
	var _helpers = __webpack_require__(55);
	
	/**
	 * The method can be called from an instance of the base
	 * class, but cannot be called from an instance of a derived class
	 *
	 * @method _overridden
	 *
	 */
	var _overridden = exports._overridden = function _overridden() {
	  return function (target, key, descriptor) {
	    var func = descriptor.value;
	    (0, _helpers.descriptorIsFunc)(key, func);
	    descriptor.value = function () {
	      var thisPrototype = Object.getPrototypeOf(this);
	      if (target !== thisPrototype) {
	        throw Error(thisPrototype.constructor.name + ' should overridde method ' + key + ' of the base class ' + target.constructor.name);
	      }
	
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }
	
	      return func.call(this, args);
	    };
	    return descriptor;
	  };
	};
	
	/**
	 * The method can not be called from an instance of the base or
	 * derived class, it should be overridden
	 *
	 * @method _forceoverriden
	 *
	 */
	/**
	* Debugging decorators
	*
	* @author  Avraam Mavridis      <avr.mav@gmail.com>
	*
	*/
	var _forceoverridden = exports._forceoverridden = function _forceoverridden() {
	  return function (target, key, descriptor) {
	    (0, _helpers.descriptorIsFunc)(key, descriptor.value);
	    // eslint-disable-next-line
	    descriptor.value = function () {
	      throw Error('method ' + key + ' of the base class ' + target.constructor.name + ' should be overridden');
	    };
	    return descriptor;
	  };
	};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._trycatch = undefined;
	
	var _helpers = __webpack_require__(55);
	
	var _validationHelpers = __webpack_require__(56);
	
	/**
	 * Try-catch decorator
	 *
	 * @method _timeout
	 *
	 * @param  { func } errorHandler
	 *
	 */
	/**
	* Try catch Decorator
	*
	* @author  Avraam Mavridis      <avr.mav@gmail.com>
	*
	*/
	var _trycatch = exports._trycatch = function _trycatch(errorHandler) {
	  if (!(0, _validationHelpers._isFunction)(errorHandler)) {
	    throw Error('The ErrorHandler should be a function. ' + JSON.stringify(errorHandler) + ' is not a function');
	  }
	
	  return function (key, target, descriptor) {
	    var func = descriptor.value;
	    (0, _helpers.descriptorIsFunc)(key, func);
	    descriptor.value = function () {
	      var res = void 0;
	      try {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	          args[_key] = arguments[_key];
	        }
	
	        res = func.apply(this, args);
	      } catch (e) {
	        errorHandler(e);
	      }
	      return res;
	    };
	    return descriptor;
	  };
	};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._partialyInherit = exports._multiInherit = undefined;
	
	var _validationHelpers = __webpack_require__(56);
	
	var __inherit = function __inherit(_clas, _meths, _partially) {
	  var classes = [].concat(_clas).reverse();
	  var methods = [].concat(_meths);
	  return function (target) {
	    classes.forEach(function (_class) {
	      var keys = Object.getOwnPropertyNames(_class.prototype);
	      keys.forEach(function (key) {
	        if (_partially) {
	          if (!target.prototype[key] && methods.indexOf(key) > -1 && (0, _validationHelpers._isFunction)(_class.prototype[key])) {
	            target.prototype[key] = _class.prototype[key];
	          }
	        } else if (!_partially) {
	          if (!target.prototype[key] && (0, _validationHelpers._isFunction)(_class.prototype[key])) {
	            target.prototype[key] = _class.prototype[key];
	          }
	        }
	      });
	    });
	    return target;
	  };
	};
	
	/**
	 * Inherit all the methods of the passed classes
	 * if two classes have method with the same name
	 * the last one is inheritted.
	 *
	 * @method _multiInherit
	 *
	 * @param  { array of classes }
	 *
	 * @return { class }
	 */
	/**
	* Multinheritance decorator
	*
	* @author  Avraam Mavridis      <avr.mav@gmail.com>
	*
	*/
	var _multiInherit = exports._multiInherit = function _multiInherit() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }
	
	  return __inherit(args, [], false);
	};
	
	/**
	 * Inherit only the specified classes
	 *
	 * @method _partialyInherit
	 *
	 * @param  { array of classes or  a class }   _clas
	 * @param  { array of strings or string }     _meths
	 *
	 * @return { class }
	 */
	var _partialyInherit = exports._partialyInherit = function _partialyInherit(_clas, _meths) {
	  var classes = [].concat(_clas);
	  var methods = [].concat(_meths);
	  return __inherit(classes, methods, true);
	};

/***/ }),
/* 66 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	* Validates that the number of values passed to a function
	* is equal to the number of arguments that the function accepts.
	*
	* @author  Avraam Mavridis      <avr.mav@gmail.com>
	*
	*/
	var _passedValuesEqualToNumberOfArguments = exports._passedValuesEqualToNumberOfArguments = function _passedValuesEqualToNumberOfArguments() {
	  var failSilent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	
	  return function (target, key, descriptor) {
	    var func = descriptor.value;
	    descriptor.value = function () {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }
	
	      if (func.length !== args.length) {
	        // eslint-disable-next-line
	        if (failSilent) return;
	        throw Error("Only " + func.length + " values should be passed to the function");
	      }
	      return func.apply(this, args);
	    };
	    return descriptor;
	  };
	};

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._after = undefined;
	
	var _validationHelpers = __webpack_require__(56);
	
	var _helpers = __webpack_require__(55);
	
	/**
	 * Base decorator function for immutability
	 *
	 * @method _basefunc
	 *
	 *
	 * @return { function }  decorator function
	 */
	/**
	* @after decorator
	*
	* @author  Avraam Mavridis      <avr.mav@gmail.com>
	*
	*/
	var _after = exports._after = function after(afterFunc) {
	  if (!(0, _validationHelpers._isFunction)(afterFunc)) {
	    throw Error('a function should be passed to the @after decorator');
	  }
	  return function afterTarget(target, key, descriptor) {
	    var func = descriptor.value;
	    (0, _helpers.descriptorIsFunc)(key, func);
	    descriptor.value = function descriptorValue() {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }
	
	      var res = func.apply(this, args);
	      var afterFuncRes = afterFunc();
	      if ((0, _validationHelpers._isPromise)(afterFuncRes)) {
	        return afterFuncRes.then(function () {
	          return res;
	        });
	      }
	
	      return res;
	    };
	    return descriptor;
	  };
	};

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._before = undefined;
	
	var _validationHelpers = __webpack_require__(56);
	
	var _helpers = __webpack_require__(55);
	
	/**
	 * Before function decorator
	 *
	 * @method _before
	 * @param { function }
	 *
	 * @return { function }  decorator function
	 */
	/**
	* @before decorator
	*
	* @author  Avraam Mavridis      <avr.mav@gmail.com>
	*
	*/
	var _before = exports._before = function _before(beforeFunc) {
	  if (!(0, _validationHelpers._isFunction)(beforeFunc)) {
	    throw Error('a function should be passed to the @before decorator');
	  }
	  return function (key, target, descriptor) {
	    var func = descriptor.value;
	    (0, _helpers.descriptorIsFunc)(key, func);
	    descriptor.value = function () {
	      var beforeFuncRes = beforeFunc();
	
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }
	
	      var res = func.apply(this, args);
	      if ((0, _validationHelpers._isPromise)(beforeFuncRes)) {
	        return beforeFuncRes.then(function () {
	          return res;
	        });
	      }
	
	      return res;
	    };
	    return descriptor;
	  };
	};

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._deprecated = undefined;
	
	var _helpers = __webpack_require__(55);
	
	var _validationHelpers = __webpack_require__(56);
	
	/**
	 * Deprecated decorator
	 *
	 * @method _deprecated
	 *
	 *
	 * @return { function }  decorator function
	 */
	/**
	* Deprecated decorator
	*
	* @author  Avraam Mavridis      <avr.mav@gmail.com>
	*
	*/
	var _deprecated = exports._deprecated = function deprecated(msg) {
	  if (!(0, _validationHelpers._isString)(msg)) {
	    throw Error('Warning message should be a string.');
	  }
	  return function deprecatedTarget(target, key, descriptor) {
	    var func = descriptor.value;
	    (0, _helpers.descriptorIsFunc)(target, func);
	    var name = target.constructor.name;
	
	    descriptor.value = function decriptorValue() {
	      // eslint-disable-next-line
	      console.warn(name + '#' + key + ' : ' + msg);
	
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }
	
	      return func.apply(this, args);
	    };
	    return descriptor;
	  };
	};

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._leftCompose = exports._compose = undefined;
	
	var _validationHelpers = __webpack_require__(56);
	
	var _helpers = __webpack_require__(55);
	
	/**
	* Compose decorator
	*
	* @method _compose
	*
	*
	* @return { function }  decorator function
	*/
	/**
	* @compose decorator
	*
	* @author  Avraam Mavridis      <avr.mav@gmail.com>
	*
	*/
	var __compose = function __compose(_meths, composeType) {
	  if (composeType === 'LEFT_COMPOSE') {
	    _meths.reverse();
	  }
	  var meths = [].concat(_meths);
	  meths.forEach(function (meth) {
	    if (!(0, _validationHelpers._isFunction)(meth)) {
	      throw Error(meth.constructor.name + ' is not a function');
	    }
	  });
	
	  return function (target, key, descriptor) {
	    var func = descriptor.value;
	    (0, _helpers.descriptorIsFunc)(key, func);
	    descriptor.value = function () {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }
	
	      var initres = func.apply(this, args);
	      var res = meths.reduce(function (previousValue, currentMeth) {
	        return currentMeth(previousValue);
	      }, initres);
	
	      return res;
	    };
	  };
	};
	
	var _compose = exports._compose = function _compose(_meths) {
	  return __compose(_meths, 'RIGHT_COMPOSE');
	};
	
	var _leftCompose = exports._leftCompose = function _leftCompose(_meths) {
	  return __compose(_meths, 'LEFT_COMPOSE');
	};

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._autobind = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
	                                                                                                                                                                                                                                                                  * @autobind decorator
	                                                                                                                                                                                                                                                                  *
	                                                                                                                                                                                                                                                                  * @author  Avraam Mavridis      <avr.mav@gmail.com>
	                                                                                                                                                                                                                                                                  *
	                                                                                                                                                                                                                                                                  */
	
	
	var _helpers = __webpack_require__(55);
	
	/**
	 * Autobind function decorator
	 *
	 * @method _autobind
	 * @param { function }
	 *
	 * @return { function }  decorator function
	 */
	var _autobind = exports._autobind = function autobind() {
	  return function autobindTarget(target, key, descriptor) {
	    var func = descriptor.value;
	    (0, _helpers.descriptorIsFunc)(key, func);
	    delete descriptor.writable;
	    delete descriptor.value;
	
	    return _extends({}, descriptor, {
	      get: function get() {
	        if (this === target.prototype || this.hasOwnProperty(key)) {
	          return func;
	        }
	
	        Object.defineProperty(this, key, {
	          value: func,
	          configurable: true,
	          writable: true
	        });
	        return func;
	      }
	    });
	  };
	};

/***/ }),
/* 72 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * Decorator that makes a class abstract
	 * ( it cannot being instantiated directly )
	 *
	 * @method _abstract
	 *
	 * @return { Class }  decorator function
	 */
	var _abstract = exports._abstract = function abstract() {
	  return function abstractTarget(target) {
	    return function (_target) {
	      _inherits(Abstract, _target);
	
	      function Abstract() {
	        _classCallCheck(this, Abstract);
	
	        var _this = _possibleConstructorReturn(this, (Abstract.__proto__ || Object.getPrototypeOf(Abstract)).call(this));
	
	        if (new.target === Abstract) {
	          throw Error("The " + target.name + " is an abstract class");
	        }
	        return _this;
	      }
	
	      return Abstract;
	    }(target);
	  };
	};

/***/ })
/******/ ])});;
//# sourceMappingURL=hyperjs.js.map