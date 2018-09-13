(function() {
  var injectCss, plugin;

  injectCss = function(href, cb, attrs, timeout, err, internal) {
    var checks, done, i, id, link, onload, poll, ref;
    done = void 0;
    checks = 0;
    link = document.createElement("link");
    onload = (function(_this) {
      return function() {
        if (!done) {
          done = 1;
          link.removeAttribute("id");
          return setTimeout(cb, 0);
        }
      };
    })(this);
    id = "yn" + (+new Date());
    ref = void 0;
    i = void 0;
    cb = (internal ? yepnope.executeStack : cb || function() {});
    timeout = timeout || yepnope.errorTimeout;
    link.href = href;
    link.rel = "stylesheet";
    link.type = "text/css";
    link.id = id;
    for (i in attrs) {
      link.setAttribute(i, attrs[i]);
    }
    if (!err) {
      poll = function() {
        var e, j, k, sheets;
        if (checks === 300) {
          return cb("failed to load: " + href);
        }
        if (done) {
          return;
        }
        checks++;
        try {
          sheets = document.styleSheets;
          j = 0;
          k = sheets.length;
          while (j < k) {
            if (sheets[j].ownerNode.id === id) {
              if (sheets[j].cssRules.length) {
                return onload();
              }
            }
            j++;
          }
          throw new Error;
        } catch (_error) {
          e = _error;
          return setTimeout(poll, 20);
        }
      };
      ref = document.getElementsByTagName("base")[0] || document.getElementsByTagName("script")[0];
      ref.parentNode.insertBefore(link, ref);
      link.onload = onload;
      return poll();
    }
  };

  plugin = function(core) {
    var $, disableCss, findLink, loadCss;
    $ = core.$;
    findLink = function(url) {
      return document.querySelector("link[href*='" + url + "']");
    };
    loadCss = function(url, cb) {
      var link;
      if (cb == null) {
        cb = function() {};
      }
      link = findLink(url);
      if (link == null) {
        injectCss(url, cb);
      } else {
        link.disabled = false;
        cb();
      }
    };
    disableCss = function(url) {
      var _ref;
      if ((_ref = findLink(url)) != null) {
        _ref.disabled = true;
      }
    };
    core.removeCss = function(url, full) {
      if (full == null) {
        full = false;
      }
    };
    core.loadCss = loadCss;
    core.unloadCss = disableCss;
    return {
      init: function(sb) {
        sb.loadCss = loadCss;
        return sb.unloadCss = disableCss;
      }
    };
  };

  module.exports = plugin;

}).call(this);
