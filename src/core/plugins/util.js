(function() {
  var plugin,
    __slice = [].slice;

  plugin = function(core) {
    var escapeRegExp, mix, namedParam, optionalParam, splatParam;
    mix = function(giv, rec, override) {
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
    core.uniqueId = function(length) {
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
    core.clone = function(obj) {
      var copy, flags, key;
      if ((obj == null) || typeof obj !== 'object') {
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
    core.countObjectKeys = function(o) {
      var k, v;
      if (typeof o === "object") {
        return ((function() {
          var _results;
          _results = [];
          for (k in o) {
            v = o[k];
            _results.push(k);
          }
          return _results;
        })()).length;
      }
    };
    core.mixin = function(receivingClass, givingClass, override) {
      if (override == null) {
        override = false;
      }
      switch ("" + (typeof givingClass) + "-" + (typeof receivingClass)) {
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
    core.deserializeQs = function(str) {
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
    core.serializeQs = function(obj, prefix) {
      var k, p, str, v;
      str = [];
      for (p in obj) {
        k = (prefix ? prefix + "[" + p + "]" : p);
        v = obj[p];
        str.push((typeof v === "object" ? serialize(v, k) : encodeURIComponent(k) + "=" + encodeURIComponent(v)));
      }
      return str.join("&");
    };
    core.mixins = function() {
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
    core.routeToRegExp = function(route) {
      route = route.replace(escapeRegExp, '\\$&').replace(optionalParam, '(?:$1)?').replace(namedParam, function(match, optional) {
        if (optional) {
          return match;
        } else {
          return '([^\/]+)';
        }
      }).replace(splatParam, '(.*?)');
      return new RegExp("^" + route + "$");
    };
    core.parseURL = function(url) {
      var a;
      a = document.createElement("a");
      a.href = url;
      return a;
    };
    core["extends"] = function(child, parent) {
      var __hasProp_;
      __hasProp_ = {}.hasOwnProperty;
      return function(child, parent) {
        var ctor, key;
        ctor = function() {
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
    core.fromBase64 = function(str) {
      var r;
      return r = window.atob(str);
    };
    core.toBase64 = function(str) {
      return window.btob(str);
    };
    core.toJSON = function(str) {
      str = typeof str === "object" ? JSON.stringify(str) : str;
      return JSON.parse(str);
    };
    if (core.util) {
      core.mixin(core, core.util);
    }
    return {
      init: function(sb) {
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

}).call(this);
