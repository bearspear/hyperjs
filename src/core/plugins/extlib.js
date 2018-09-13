(function() {
  var __slice = [].slice;

  if ((typeof define !== "undefined" && define !== null ? define.amd : void 0) != null) {
    define(function(require) {
      var load, map, plugin, reduce, run;
      load = function(name, next) {
        var names;
        names = [name];
        require(names, function() {
          var args;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          next(null, args[args.length - 1]);
        });
      };
      map = function(name, lib) {
        var deps, shim;
        deps = lib.deps != null ? lib.deps : {};
        deps[name] = lib.path;
        shim = {};
        if (lib.shim != null) {
          shim[name] = lib.shim;
        }
        window.require.config({
          paths: deps,
          shim: shim
        });
      };
      reduce = function(libs, num) {
        var l;
        l = libs.length - num;
        return libs.slice(0, l);
      };
      run = function(core, dfd, libs, num, cb) {
        var finished, lib, tasks;
        tasks = (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = libs.length; _i < _len; _i++) {
            lib = libs[_i];
            _results.push((function(lib) {
              return function(next) {
                return load(lib, next);
              };
            })(lib));
          }
          return _results;
        })();
        finished = function(err, results) {
          results = reduce(results, num);
          results.unshift(err);
          cb.apply(null, results);
          return dfd.resolve(results);
        };
        return core.util.runSeries(tasks, finished, true);
      };
      return plugin = function(core, options) {
        var exists;
        exists = function(lib) {
          var _ref;
          return ((_ref = core._libs[lib]) != null ? _ref.deps : void 0) != null;
        };
        core.registerLib = function(libs) {
          var lib, name;
          core.mixin(core._libs, libs);
          for (name in libs) {
            lib = libs[name];
            map(name, lib);
          }
        };
        core.getLib = function(libs, cb) {
          var all, dfd, ideps, k, lib, v, _i, _len, _ref;
          if (cb == null) {
            cb = function() {};
          }
          dfd = core.Deferred();
          libs = typeof libs === "string" ? [libs] : libs;
          all = libs;
          ideps = 0;
          for (_i = 0, _len = libs.length; _i < _len; _i++) {
            lib = libs[_i];
            if (exists(lib)) {
              _ref = core._libs[lib].deps;
              for (k in _ref) {
                v = _ref[k];
                if (!all.join("|").contains(k)) {
                  all.push(k);
                  ideps++;
                }
              }
            }
          }
          run(core, dfd, all, ideps, cb);
          return dfd.promise();
        };
        options = typeof options === "string" ? [options] : options;
        core._libs = {};
        if (options instanceof Object) {
          core.registerLib(options);
        }
        return {
          init: (function(_this) {
            return function(sb) {
              return sb.load = sb.getLib = core.getLib;
            };
          })(this)
        };
      };
    });
  }

}).call(this);
