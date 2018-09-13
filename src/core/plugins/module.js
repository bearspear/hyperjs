(function() {
  var plugin;

  plugin = function(core, options) {
    var $, log, startAll, _ref, _ref1;
    if (options == null) {
      options = {};
    }
    $ = core.$;
    core._bound = [];
    if ((_ref = core.state) != null) {
      _ref.on('init', function(ev) {
        return console.log(ev.instanceId + " has started");
      });
    }
    if ((_ref1 = core.state) != null) {
      _ref1.on("destroy", function(ev) {
        return console.log(ev.instanceId + " has stopped");
      });
    }
    log = function(type, msg) {
      core.emit("log/" + type, msg);
      console[type](msg);
    };
    core.basicAppTemplate = function(container, contentName) {
      var main;
      if (contentName == null) {
        contentName = 'content';
      }
      main = document.createElement("div");
      main.className = contentName;
      return {
        main: container.appendChild(main)
      };
    };
    core.createContainer = function(module, el) {
      var c;
      if (!document.getElementById(module)) {
        c = document.createElement("div");
        c.setAttribute("id", module);
        if (el) {
          el.appendChild(c);
        } else {
          document.getElementsByTagName("body")[0].appendChild(c);
        }
      }
    };
    core.deleteContainer = function(module) {
      document.getElementById(module).remove();
    };
    core.on("start", function(opts) {
      var id, module;
      options = {};
      if (opts instanceof Object) {
        module = opts.module;
        options = {
          options: opts.options || {}
        };
      }
      if (opts instanceof String) {
        module = opts;
      }
      if (opts instanceof Array) {
        module = opts.join("/");
      }
      if (module instanceof Array) {
        module = module.join("/");
      }
      log("debug", "Try to start module '" + module + "'");
      id = module.split('/').join('-');
      require(["app/components/" + module], function(m) {
        core.createContainer(id, document.getElementById("body"));
        core.register(id, m).start(id, options, function(err) {
          var _ref2;
          if (err) {
            log("error", err.message);
          } else {
            log("info", "sucessfully started '" + module + "'");
          }
          return;
          return (_ref2 = opts.options) != null ? typeof _ref2.done === "function" ? _ref2.done() : void 0 : void 0;
        });
      });
    });
    core.on("stop", function(module) {
      var id;
      if (module instanceof Array) {
        module = module.join("/");
      }
      log("debug", "Try to stop module '" + module + "'");
      id = module.split('/').join('-');
      core.stop(id, function(err) {
        if (err) {
          log("error", err);
        } else {
          core.deleteContainer(id);
          log("info", "stopped module '" + module + "'");
        }
      });
    });
    core.bindComponent = function(ref, module) {
      var $els;
      $els = $(ref);
      return $els.each(function(i) {
        var id;
        id = $(this).prop(module.id + "-" + core.uniqueId());
        return core.register(id, module).start(id, options, function(err) {
          if (err) {
            return log("error", err.message);
          } else {
            return log("info", "successfully started '" + id + "'");
          }
        });
      });
    };
    startAll = function(core, components, cb) {
      var i, tasks;
      if (cb == null) {
        cb = function() {};
      }
      tasks = [];
      i = 0;
      while (i < components.length) {
        (function() {
          var v;
          v = components[i];
          tasks.push(function(next) {
            return require([v.path], function(widget) {
              core.register(v.id, widget);
              return next(null, v.id);
            });
          });
          return i++;
        })();
      }
      return core.runParallel(tasks, function(err, result) {
        cb(err, result);
        return core.start();
      });
    };
    core.startAll = startAll.bind(void 0, core);
    return {
      init: function(sb) {
        if (sb._subCore != null) {
          return sb.startAll = startAll.bind(void 0, sb._subCore);
        }
      }
    };
  };

  module.exports = plugin;

}).call(this);
