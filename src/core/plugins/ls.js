(function() {
  var plugin;

  plugin = function(core) {
    var ls;
    ls = function(o) {
      var id, m, _results;
      _results = [];
      for (id in o) {
        m = o[id];
        _results.push(id);
      }
      return _results;
    };
    core.lsInstances = function() {
      return ls(core._instances);
    };
    core.lsModules = function() {
      return ls(core._modules);
    };
    return core.lsPlugins = function() {
      var p, _i, _len, _ref, _ref1, _results;
      _ref = core._plugins;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        p = _ref[_i];
        if (((_ref1 = p.plugin) != null ? _ref1.id : void 0) != null) {
          _results.push(p.plugin.id);
        }
      }
      return _results;
    };
  };

  module.exports = plugin;

}).call(this);
