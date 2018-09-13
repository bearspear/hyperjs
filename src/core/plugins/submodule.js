(function() {
  var plugin,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  plugin = function(core, options) {
    var install, methods;
    if (options == null) {
      options = {};
    }
    methods = ["register", "start", "stop", "on", "off", "emit", "$"];
    install = function(sb, subCore) {
      var fn, _fn, _i, _len;
      sb.sub = {};
      _fn = (function(_this) {
        return function(fn) {
          return sb.sub[fn] = function() {
            subCore[fn].apply(subCore, arguments);
            return sb;
          };
        };
      })(this);
      for (_i = 0, _len = methods.length; _i < _len; _i++) {
        fn = methods[_i];
        _fn(fn);
      }
      if (subCore.permission != null) {
        return sb.sub.permission = {
          add: subCore.permission.add,
          remove: subCore.permission.remove
        };
      }
    };
    return {
      init: function(sb, opt, done) {
        var SubSandbox, p, plugins, subCore, _i, _j, _len, _len1, _ref, _ref1;
        sb._subCore = subCore = new core.constructor;
        subCore.Sandbox = SubSandbox = (function(_super) {
          __extends(SubSandbox, _super);

          function SubSandbox() {
            return SubSandbox.__super__.constructor.apply(this, arguments);
          }

          return SubSandbox;

        })(core.Sandbox);
        if (options.enableCascade) {
          sb._subCore._mediator.cascadeChannels = true;
        }
        if (core.util != null) {
          subCore.util = core.util;
        }
        if (core.config != null) {
          subCore.config = core.config;
        }
        sb._children = sb._subCore.modules;
        plugins = [];
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
        return subCore.use(plugins).boot(function(err) {
          if (err) {
            return done(err);
          }
          install(sb, subCore);
          return done();
        });
      },
      destroy: function(sb) {
        return sb._subCore.stop();
      }
    };
  };

  module.exports = plugin;

}).call(this);
