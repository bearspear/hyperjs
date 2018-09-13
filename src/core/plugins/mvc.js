(function() {
  var plugin,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  plugin = function(core) {
    var Controller, Model, View;
    Model = (function(_super) {
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

      Model.prototype.set = function(key, val, silent) {
        var k, v;
        if (silent == null) {
          silent = false;
        }
        switch (typeof key) {
          case "object":
            for (k in key) {
              v = key[k];
              this.set(k, v, true);
            }
            if (!silent) {
              this.emit(Model.CHANGED, (function() {
                var _results;
                _results = [];
                for (k in key) {
                  v = key[k];
                  _results.push(k);
                }
                return _results;
              })());
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

      Model.prototype.change = function(cb, context) {
        if (typeof cb === "function") {
          return this.on(Model.CHANGED, cb, context);
        } else if (arguments.length === 0) {
          return this.emit(Model.CHANGED);
        }
      };

      Model.prototype.notify = function() {
        return this.change();
      };

      Model.prototype.get = function(key) {
        if (key != null) {
          return this[key];
        } else {
          return this.toJSON();
        }
      };

      Model.prototype.toJSON2 = function() {
        var json, k, v;
        json = {};
        for (k in this) {
          if (!__hasProp.call(this, k)) continue;
          v = this[k];
          json[k] = v;
        }
        return json;
      };

      Model.prototype.toJSON = function() {
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

    })(core.Mediator);
    View = (function() {
      function View(model) {
        if (model) {
          this.setModel(model);
        }
      }

      View.prototype.setModel = function(model) {
        this.model = model;
        return this.model.change((function() {
          return this.render();
        }), this);
      };

      View.prototype.render = function() {};

      return View;

    })();
    Controller = (function() {
      function Controller(model, view) {
        this.model = model;
        this.view = view;
      }

      return Controller;

    })();
    core.Model = Model;
    core.View = View;
    return core.Controller = Controller;
  };

  module.exports = plugin;

}).call(this);
