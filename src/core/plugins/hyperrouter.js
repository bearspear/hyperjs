(function() {
  var plugin;

  plugin = function(core, options) {
    var $, Router, SmallRouter, currentState, enablePjax, enablePushState, getHash, history, listenForHashes, paused, triggerHash, triggerMain, _;
    if (options == null) {
      options = {};
    }
    if (core.history == null) {
      console.warn("'HyperRouter' plugin requires the history plugin");
    }
    history = core.history;
    enablePushState = options.pushState != null ? options.pushState : true;
    enablePjax = (core.pjax != null) || false;

    /**
    App Router (based on Backbone)
    ---------------
      Routers map faux-URLs to actions, and fire events when routes are
      matched. Creating a new one sets its `routes` hash, if not set statically.
     */
    _ = core._;
    $ = core.$;
    paused = false;
    currentState = {};
    Router = (function() {
      function Router(options) {
        if (options == null) {
          options = {};
        }
        if (options.routes) {
          this.routes = options.routes;
        }
        this._bindRoutes();
        this.initialize.apply(this, arguments);
        core._mediator.installTo(this);
      }

      Router.prototype.initialize = function() {};

      Router.prototype.route = function(route, name, callback) {
        var router;
        if (!(route.constructor instanceof RegExp)) {
          route = this._routeToRegExp(route);
        }
        if (typeof name === "function") {
          callback = name;
          name = '';
        }
        if (!callback) {
          callback = this[name];
        }
        router = this;
        history.route(route, (function(_this) {
          return function(fragment, state) {
            var args;
            args = router._extractParameters(route, fragment);
            if (callback != null) {
              callback.apply(router, args);
            }
            return _this.emit('route:' + name, {
              path: args,
              state: state
            });
          };
        })(this));
        return this;
      };

      Router.prototype.navigate = function(fragment, options, state) {
        var historyFragment;
        if (state == null) {
          state = {};
        }
        historyFragment = "/" + history.getFragment();
        if (fragment === historyFragment) {
          core.lastPathname = '';
          triggerMain(fragment, false, state);
        } else {
          history.navigate(fragment, options, state);
        }
        return this;
      };

      Router.prototype._bindRoutes = function() {
        var route, routes, _results;
        if (!this.routes) {
          return;
        }
        this.routes = _.result(this, 'routes');
        routes = Object.keys(this.routes);
        route = routes.pop();
        _results = [];
        while (route != null) {
          this.route(route, this.routes[route]);
          _results.push(route = routes.pop());
        }
        return _results;
      };

      Router.prototype._routeToRegExp = function(route) {
        return core.routeToRegExp(route);
      };

      Router.prototype._extractParameters = function(route, fragment) {
        var params;
        params = route.exec(fragment).slice(1);
        return params.map(function(param) {
          if (param) {
            return decodeURIComponent(param);
          } else {
            return null;
          }
        });
      };

      return Router;

    })();
    SmallRouter = (function() {
      function SmallRouter(routes) {
        var route, _i, _len;
        if (routes == null) {
          routes = [];
        }
        this.routes = [];
        for (_i = 0, _len = routes.length; _i < _len; _i++) {
          route = routes[_i];
          this.add(route.path, route.callback);
        }
      }

      SmallRouter.prototype.add = function(path, callback) {
        return this.routes.push({
          path: new RegExp(path.replace(/\//g, "\\/").replace(/:(\w*)/g, "(\\w*)")),
          callback: callback
        });
      };

      SmallRouter.prototype.process = function(p) {
        var params, route, _i, _len, _ref;
        _ref = this.routes;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          route = _ref[_i];
          params = (p || window.location.pathname).match(route.path);
          if (params != null) {
            route.callback(params);
            return;
          }
        }
      };

      return SmallRouter;

    })();
    triggerMain = function(path, load, state) {
      var qs, url;
      if (load == null) {
        load = false;
      }
      url = core.parseURL(path);
      qs = url.search.replace('?', '');
      currentState = {
        source: path,
        uri: url.pathname.replace(/^([^\/])/, '/$1'),
        pushState: enablePushState,
        historyState: state,
        search: qs,
        query: qs.length > 0 ? core.deserializeQs(qs) : {},
        hash: location.hash.replace('#', ''),
        load: load
      };
      if (url.pathname === core.lastPathname && ((state != null) && (state.element != null))) {
        core.emit("page/change/query", currentState, function() {});
      } else {
        core.emit("page/change/url", currentState, function() {});
      }
      core.lastPathname = url.pathname;
    };
    getHash = function(window) {
      var match;
      match = (window || this).location.href.match(/#(.*)$/);
      if (match) {
        return match[1];
      } else {
        return '';
      }
    };
    triggerHash = function() {
      var hash;
      hash = getHash(window);
      core.emit('hash', hash);
      return core.emit('page/state', hash);
    };
    listenForHashes = function() {
      if ('onhashchange' in window) {
        return $(window).on('hashchange', function(e) {
          return triggerHash();
        });
      }
    };
    core.gotoUrl = core.setPage = function(path, load) {
      if (load == null) {
        load = false;
      }
      return triggerMain(path, load);
    };
    core.reloadPage = function() {
      return core.gotoUrl(location.pathname.replace('/', ''));
    };
    core.startRouter = function() {
      var extractState, routeOptions;
      routeOptions = {
        routes: {}
      };
      core.mixin(routeOptions.routes, options.routes);
      routeOptions.routes['*actions'] = 'main';
      core.router = new Router(routeOptions);
      core.on('navigate', function(href) {
        return core.router.navigate(href, {
          trigger: true
        });
      });
      core.router.on('route:main', (function(_this) {
        return function(o, route) {
          var page;
          page = o.path;
          page = page != null ? page : '';
          triggerMain("/" + page, false, o.state);
        };
      })(this));
      if (enablePushState) {
        listenForHashes();
        extractState = function(data) {
          return data;
        };
        document.onclick = function(event) {
          var $target, hasExternal, href, protocol, rightButtonClicked, target;
          event = event || window.event;
          target = event.target || event.srcElement;
          if (target.tagName === 'A' || target.parentNode.tagName === 'A') {
            if (target.tagName !== 'A') {
              target = target.parentNode;
            }
            $target = $(target);
            href = target.getAttribute("href");
            protocol = location.protocol + "//";
            hasExternal = target.className.contains("external") || href.contains('#') || href.startsWith(protocol) || href.startsWith("mailto:");
            rightButtonClicked = event.which === 3 || event.button === 2;
            if (!rightButtonClicked) {
              if (!hasExternal && (href != null)) {
                event.preventDefault();
                core.router.navigate(href, {
                  trigger: true
                }, extractState($target.data()));
              }
            }
          }
        };
        document.onsubmit = function(event) {
          var $form, loc, method, search, target, url;
          target = event.target || event.srcElement;
          $form = $(target);
          method = target.method.toLowerCase();
          if (method === 'get') {
            event.preventDefault();
            loc = core.parseURL(target.action);
            search = loc.search.length === 0 ? '?' : loc.search + '&';
            url = loc.pathname + search + encodeURI($form.serialize());
            return core.router.navigate(url, {
              trigger: true
            }, extractState($form.data()));
          }
        };
      }
      return history.start({
        pushState: enablePushState,
        hashChange: !enablePushState,
        silent: true
      });
    };
    core.stopRouter = function() {
      if (core.router != null) {
        core.router = null;
        document.onclick = $.noop();
        return history.stop();
      }
    };
    core.Router = SmallRouter;
    return {
      init: function(sb) {
        sb.reload = core.reloadPage;
        return sb.SmallRouter = core.SmallRouter;
      }
    };
  };

  module.exports = plugin;

}).call(this);
