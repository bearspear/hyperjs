(function() {
  var plugin,
    __slice = [].slice;

  plugin = function(core, options) {
    var $, get, getSubCore, isApp, isComponent, loopModules, select, selector, start, stop;
    if (options == null) {
      options = {};
    }
    $ = core.$;
    selector = ['[data-component]'];
    selector = selector.join(',');
    select = function(selector, context, type) {
      if (type == null) {
        type = 'find';
      }
      context = context || document;
      return $(context)[type](selector);
    };
    isApp = function(ref) {
      return $(ref).attr("data-type") === 'app';
    };
    isComponent = function(ref) {
      if ($(ref).attr("data-component")) {
        return true;
      } else {
        return false;
      }
    };
    getSubCore = function(ref) {
      var id;
      if (isApp(ref)) {
        return core;
      } else {
        id = $(ref).get(0).id;
        return core._sandboxes[id]._subCore;
      }
    };
    start = function(ref, modules, cb) {
      var createInstances, e, register, subCore, tasks;
      if (cb == null) {
        cb = function() {};
      }
      try {
        subCore = core;
      } catch (_error) {
        e = _error;
        return;
      }
      register = function(next) {
        var i, id, paths, regs, _i, _ref;
        regs = [];
        for (i = _i = 0, _ref = modules.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          ref = modules[i].ref;
          if ((ref.id == null) || ref.id.length === 0) {
            id = modules[i].name + "-" + core.uniqueId();
            modules[i].id = ref.id = id;
          } else {
            id = modules[i].id;
          }
          if (subCore._modules[id] != null) {
            modules[i].exists = true;
          } else {
            modules[i].exists = false;
            regs.push(modules[i]);
          }
        }
        paths = regs.map((function(_this) {
          return function(module) {
            return module.path + "/" + "main";
          };
        })(this));
        return require(paths, (function(_this) {
          return function() {
            var args, reg, _j, _ref1;
            args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
            for (i = _j = 0, _ref1 = regs.length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
              reg = regs[i];
              if (reg.exists === false) {
                subCore.register(reg.id, args[i]);
              }
            }
            return next();
          };
        })(this));
      };
      createInstances = function(next) {
        var ids;
        ids = modules.map((function(_this) {
          return function(module) {
            ref = module.ref;
            $(ref).attr('data-auto', 'true');
            return module.id;
          };
        })(this));
        return subCore.start(ids, function(err) {
          return next(err);
        });
      };
      tasks = [register, createInstances];
      return core.util.runSeries(tasks, cb, true);
    };
    stop = function(ref, modules, cb) {
      var e, mod, subCore, tasks;
      if (cb == null) {
        cb = function() {};
      }
      if (modules.length === 0) {
        return;
      }
      try {
        subCore = core;
      } catch (_error) {
        e = _error;
        return;
      }
      tasks = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = modules.length; _i < _len; _i++) {
          mod = modules[_i];
          _results.push((function(mod) {
            return function(next) {
              return subCore.stop(mod.id, function(err) {
                return next(err);
              });
            };
          })(mod));
        }
        return _results;
      })();
      return core.util.runSeries(tasks, cb, true);
    };
    get = function(ref) {
      var modules;
      modules = [];
      select(selector, ref).each(function() {
        var $el, component, parts, s;
        $el = $(this);
        s = $el.data("component");
        parts = s.split('@');
        component = {
          name: parts[0],
          path: parts[1] + '/' + parts[0],
          options: {},
          ref: this
        };
        return modules.push(component);
      });
      return modules;
    };
    loopModules = function(ref, cb) {
      var module, modules, _i, _len, _results;
      if (cb == null) {
        cb = function() {};
      }
      ref = isComponent(ref) ? ref : core.appDomRef;
      modules = get(ref);
      if (modules.length === 0) {
        return;
      }
      _results = [];
      for (_i = 0, _len = modules.length; _i < _len; _i++) {
        module = modules[_i];
        ref = select('[data-type]', module.ref, "parents").get(0);
        _results.push(cb.apply(null, [ref, module]));
      }
      return _results;
    };
    core.domStart = function(ref) {
      return loopModules(ref, function(target, module) {
        return start(target, [module], function(err, results) {
          if (err) {
            console.error(err);
          }
          return core.emit("domstarted", [err, results]);
        });
      });
    };
    return core.domStop = function(ref) {
      return loopModules(ref, function(target, module) {
        return stop(target, [module], function(err, results) {
          if (err) {
            console.error(err);
          }
          return core.emit("domstopped", [err, results]);
        });
      });
    };
  };

  module.exports = plugin;

}).call(this);
