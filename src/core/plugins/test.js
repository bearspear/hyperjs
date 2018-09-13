(function() {
  var plugin, _base,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  plugin = function(core) {
    var Child;
    return Child = (function(_super) {
      __extends(Child, _super);

      function Child(opts) {
        if (opts == null) {
          opts = {};
        }
        Child.__super__.constructor.call(this);
      }

      Child.prototype._super = function() {};

      return Child;

    })(Parent);
  };

  if ((typeof define !== "undefined" && define !== null ? define.amd : void 0) != null) {
    define(function() {
      return plugin;
    });
  } else if ((typeof window !== "undefined" && window !== null ? window.scaleApp : void 0) != null) {
    if ((_base = window.scaleApp.plugins).state == null) {
      _base.state = plugin;
    }
  } else if ((typeof module !== "undefined" && module !== null ? module.exports : void 0) != null) {
    module.exports = plugin;
  }

}).call(this);
