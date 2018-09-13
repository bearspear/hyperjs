(function() {
  var plugin;

  plugin = function(core) {

    /**
      App Core History class based on Backbone implementation by Michael
      ----------------
      Handles cross-browser history management, based on either
      [pushState](http:#diveintohtml5.info/history.html) and real URLs, or
      [onhashchange](https:#developer.mozilla.org/en-US/docs/DOM/window.onhashchange)
      and URL fragments. If the browser supports neither (old IE, natch),
      falls back to polling.
     */
    var $, History, isExplorer, rootStripper, routeStripper, trailingSlash, _;
    $ = core.$;
    _ = core._;
    routeStripper = /^[#\/]|\s+$/g;
    rootStripper = /^\/+|\/+$/g;
    isExplorer = /msie [\w.]+/;
    trailingSlash = /\/$/;
    History = (function() {
      History.started = false;

      History.prototype.interval = 50;

      function History() {
        this.handlers = [];
        _.bindAll(this, 'checkUrl');
        if (typeof window !== 'undefined') {
          this.location = window.location;
          this.history = window.history;
        }
      }

      History.prototype.getHash = function(window) {
        var match;
        match = (window || this).location.href.match(/#(.*)$/);
        if (match) {
          return match[1];
        } else {
          return '';
        }
      };

      History.prototype.getFragment = function(fragment, forcePushState) {
        var root;
        if (fragment == null) {
          if (this._hasPushState || !this._wantsHashChange || forcePushState) {
            fragment = this.location.pathname + this.location.search;
            root = this.root.replace(trailingSlash, '');
            if (!fragment.indexOf(root)) {
              fragment = fragment.substr(root.length);
            }
          } else {
            fragment = this.getHash();
          }
        }
        return fragment.replace(routeStripper, '');
      };

      History.prototype.start = function(options) {
        var atRoot, docMode, fragment, loc, oldIE;
        if (History.started) {
          throw new Error("App history has already been started");
        }
        History.started = true;
        this.options = _.extend({}, {
          root: '/'
        }, this.options, options);
        this.root = this.options.root;
        this._wantsHashChange = this.options.hashChange !== false;
        this._wantsPushState = !!this.options.pushState;
        this._hasPushState = !!(this.options.pushState && this.history && this.history.pushState);
        fragment = this.getFragment();
        docMode = document.documentMode;
        oldIE = isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7);
        core.oldIE = oldIE;
        this.root = ('/' + this.root + '/').replace(rootStripper, '/');
        if (oldIE && this._wantsHashChange) {
          this.iframe = _$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo('body')[0].contentWindow;
          this.navigate(this._hasPushState);
        }
        if (this._hasPushState) {
          $(window).on('popstate', this.checkUrl);
        } else if (this._wantsHashChange && ('onhashchange' in window) && !oldIE) {
          $(window).on('hashchange', this.checkUrl);
        } else if (this._wantsHashChange) {
          this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
        }
        this.fragment = fragment;
        loc = this.location;
        atRoot = loc.pathname.replace(/[^\/]$/, '$&/') === this.root;
        if (this._wantsHashChange && this._wantsPushState && !this._hasPushState && !atRoot) {
          this.fragment = this.getFragment(null, true);
          this.location.replace(this.root + this.location.search + '#' + this.fragment);
          return true;
        } else if (this._wantsPushState && this._hasPushState && atRoot && loc.hash) {
          this.fragment = this.getHash().replace(routeStripper, '');
          this.history.replaceState({}, document.title, this.root + this.fragment + loc.search);
        }
        if (!this.options.silent) {
          return this.loadUrl();
        }
      };

      History.prototype.stop = function() {
        $(window).off('popstate', this.checkUrl).off('hashchange', this.checkUrl);
        clearInterval(this._checkUrlInterval);
        return History.started = false;
      };

      History.prototype.route = function(route, callback) {
        return this.handlers.unshift({
          route: route,
          callback: callback
        });
      };

      History.prototype.checkUrl = function(e) {
        var current, state;
        current = this.getFragment();
        state = e.originalEvent.state;
        if (current === this.fragment && this.iframe) {
          current = this.getFragment(this.getHash(this.iframe));
        }
        if (current === this.fragment) {
          return false;
        }
        if (this.iframe) {
          this.navigate(current);
        }
        return this.loadUrl(void 0, state || this.loadUrl(this.getHash(), state));
      };

      History.prototype.loadUrl = function(fragmentOverride, state) {
        var fragment, matched;
        this.fragment = this.getFragment(fragmentOverride);
        fragment = this.fragment;
        matched = this.handlers.some(function(handler) {
          if (handler.route.test(fragment)) {
            handler.callback(fragment, state);
            return true;
          }
        });
        return matched;
      };

      History.prototype.navigate = function(fragment, options, state) {
        var title, url;
        if (state == null) {
          state = {};
        }
        if (!History.started) {
          return false;
        }
        if (!options || options === true) {
          options = {
            trigger: options
          };
        }
        fragment = this.getFragment(fragment || '');
        if (this.fragment === fragment) {
          return;
        }
        this.fragment = fragment;
        url = this.root + fragment;
        if (this._hasPushState) {
          title = state.title ? state.title : document.title;
          this.history[options.replace ? 'replaceState' : 'pushState'](state, title, url);
        } else if (this._wantsHashChange) {
          this._updateHash(this.location, fragment, options.replace);
          if (this.iframe && (fragment !== this.getFragment(this.getHash(this.iframe)))) {
            if (!options.replace) {
              this.iframe.document.open().close();
            }
            this._updateHash(this.iframe.location, fragment, options.replace);
          }
        } else {
          return this.location.assign(url);
        }
        if (options.trigger) {
          return this.loadUrl(fragment, state);
        }
      };

      History.prototype._updateHash = function(location, fragment, replace) {
        var href;
        if (replace) {
          href = location.href.replace(/(javascript:|#).*$/, '');
          return location.replace(href + '#' + fragment);
        } else {
          return location.hash = '#' + fragment;
        }
      };

      return History;

    })();
    return core.history = new History;
  };

  module.exports = plugin;

}).call(this);
