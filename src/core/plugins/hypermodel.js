(function() {
  var plugin,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  plugin = function(core, options) {
    var $, HyperModel, defaults, events, insertContent, needToEmbed, queryForLink;
    if (options == null) {
      options = {};
    }
    $ = core.$;
    defaults = $.extend(true, {}, $.ajaxSettings, {
      timeout: 120000,
      push: true,
      replace: false,
      type: "GET",
      dataType: "html",
      scrollTo: 0,
      maxCacheLength: 20,
      data: {}
    });
    events = {};
    HyperModel = (function(_super) {
      __extends(HyperModel, _super);

      function HyperModel(options) {
        var redirect;
        HyperModel.__super__.constructor.call(this);
        options = options || {};
        this._options = {};
        this._headers = {};
        redirect = options.redirectOnError || false;
        this._hash = core.parseURL(options.url).hash;
        this._timeoutTimer;
        this._successCb = function() {};
        this._options.beforeSend = (function(_this) {
          return function(xhr, settings) {
            var field, value, _ref;
            if (settings.type !== "GET") {
              settings.timeout = 0;
            }
            xhr.setRequestHeader("X-PJAX", "true");
            if (core.isMobile) {
              xhr.setRequestHeader("X-Mobile", "true");
            }
            _ref = _this._headers;
            for (field in _ref) {
              value = _ref[field];
              xhr.setRequestHeader(field, value);
            }
            if (!_this._fire("pjax:beforeSend", [xhr, settings])) {
              return false;
            }
            if (settings.timeout > 0) {
              _this._timeoutTimer = setTimeout(function() {
                if (_this._fire("pjax:timeout", [xhr, options])) {
                  return xhr.abort("timeout");
                }
              }, settings.timeout);
              settings.timeout = 0;
            }
            return _this._requestUrl = core.parseURL(settings.url).href;
          };
        })(this);
        this._options.complete = (function(_this) {
          return function(xhr, textStatus) {
            if (_this._timeoutTimer) {
              clearTimeout(_this._timeoutTimer);
            }
            _this._fire("pjax:complete", [xhr, textStatus, _this._options]);
            return _this._fire("pjax:end", [xhr, _this._options]);
          };
        })(this);
        this._options.success = (function(_this) {
          return function(data, status, xhr) {
            var container;
            if (xhr.status !== 204 && (data != null)) {
              container = _this._extractContainer(data, xhr, options);
              if (container.title) {
                document.title = container.title;
              }
            }
            _this._fire("pjax:success", [container, status, xhr, _this._options]);
            return _this._successCb(container, status, xhr, _this._options);
          };
        })(this);
        this._options.error = (function(_this) {
          return function(xhr, textStatus, errorThrown) {
            var container, status;
            container = _this._extractContainer("", xhr, _this._options);
            status = xhr.status;
            _this._errorCb(xhr, textStatus, errorThrown, _this._options);
            _this._fire("pjax:error", [xhr, textStatus, errorThrown, _this._options]);
            if (status === 401) {
              return location.href = xhr.getResponseHeader("X-LOGIN-URL");
            } else {
              if (redirect && (status === 0 || (_this._options.type === "GET" && textStatus !== "abort"))) {
                return _this._locationReplace(container.url);
              }
            }
          };
        })(this);
      }

      HyperModel.prototype._pjax = function(options) {
        var xhr;
        options = $.extend(true, {}, options, this._options);
        xhr = this._xhr;
        if (xhr && xhr.readyState < 4) {
          xhr.onreadystatechange = function() {};
          xhr.abort();
        }
        xhr = this._xhr = $.ajax(options);
        if (xhr.readyState > 0) {
          this._fire("pjax:start", [xhr, options]);
          this._fire("pjax:send", [xhr, options]);
        }
        return this._xhr;
      };

      HyperModel.prototype._setCallbacks = function(options) {
        this._successCb = options.success || function() {};
        this._completeCb = options.complete || function() {};
        this._errorCb = options.error || function() {};
        if (options.success != null) {
          delete options.success;
        }
        if (options.error != null) {
          delete options.error;
        }
        if (options.complete != null) {
          return delete options.complete;
        }
      };

      HyperModel.prototype.get = function(options, verb) {
        if (options == null) {
          options = {};
        }
        if (verb == null) {
          verb = 'GET';
        }
        if (options.url == null) {
          return;
        }
        this._setCallbacks(options);
        options.type = verb;
        return this._pjax($.extend({}, defaults, options));
      };

      HyperModel.prototype.put = function(options) {
        if (options.url == null) {
          return;
        }
        this._setCallbacks(options);
        options.type = "PUT";
        return this._pjax($.extend({}, defaults, options));
      };

      HyperModel.prototype.post = function(options) {
        if (options.url == null) {
          return;
        }
        this._setCallbacks(options);
        options.type = "POST";
        return this._pjax($.extend({}, defaults, options));
      };

      HyperModel.prototype.detele = function(form, options) {};

      HyperModel.prototype.patch = function(form, options) {
        return this._handleSubmit(form, "PATCH", options);
      };

      HyperModel.prototype.head = function(options) {
        if (options == null) {
          options = {};
        }
        return this.get(options, "HEAD");
      };

      HyperModel.prototype.submit = function(form, options) {
        return this._handleSubmit(form, void 0, options);
      };

      HyperModel.prototype.stop = function(form, options) {
        return this._xhr.abort();
      };

      HyperModel.prototype.toJSON = function() {
        return {};
      };

      HyperModel.prototype.setHeader = function(field, value) {
        return this._headers[field] = value;
      };

      HyperModel.prototype.removeHeader = function(field) {
        return delete this._headers[field];
      };

      HyperModel.prototype._handleSubmit = function(form, method, options) {
        var settings;
        if (options == null) {
          options = {};
        }
        form = form.tagName.toUpperCase() === "FORM" ? form : $(form).find("form").get(0);
        if (typeof form !== 'object') {
          throw "$.pjax.submit requires a form element";
        }
        settings = {
          type: method || form.method.toUpperCase(),
          url: form.action,
          data: options.data || $(form).serializeArray(),
          target: form
        };
        this._setCallbacks(options);
        return this._pjax($.extend({}, defaults, settings, options));
      };

      HyperModel.prototype._fire = function(type, args) {
        return this.emit(type, args);
      };

      HyperModel.prototype._locationReplace = function(url) {
        window.history.replaceState(null, "", "#");
        return window.location.replace(url);
      };

      HyperModel.prototype._stripPjaxParam = function(url) {
        return url.replace(/\?_pjax=[^&]+&?/, "?").replace(/_pjax=[^&]+&?/, "").replace(/[\?&]$/, "");
      };

      HyperModel.prototype.findAll = function(elems, selector) {
        return elems.filter(selector).add(elems.find(selector));
      };

      HyperModel.prototype.parseHTML = function(html) {
        return $.parseHTML(html, document, true);
      };

      HyperModel.prototype.$html = function(html) {
        return $(this.parseHTML(html));
      };

      HyperModel.prototype._extractContainer = function(data, xhr, options) {
        var $body, $fragment, $head, isPjaxSnippet, obj;
        obj = {};
        isPjaxSnippet = false;
        obj.url = this._stripPjaxParam(xhr.getResponseHeader("X-PJAX-URL") || this._requestUrl);
        if (/<div class="pjax/i.test(data)) {
          isPjaxSnippet = true;
        }
        if (/<html/i.test(data)) {
          $head = $(this.parseHTML(data.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0]));
          $body = $(this.parseHTML(data.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0]));
        } else {
          $head = $body = $(this.parseHTML(data));
        }
        if ($body.length === 0) {
          return obj;
        }
        if (options.fragment && !isPjaxSnippet) {
          if (options.fragment === "body") {
            $fragment = $body;
          } else {
            $fragment = this.findAll($body, options.fragment).first();
          }
          if ($fragment.length) {
            obj.contents = $fragment.contents();
            if (!obj.title) {
              obj.title = $fragment.attr("title") || $fragment.data("title");
            }
          }
        } else {
          obj.contents = $body;
        }
        obj.title = '';
        if (this._hash !== "") {
          obj.hash = this._hash;
        }
        obj.html = data;
        return obj;
      };

      return HyperModel;

    })(core.Mediator);
    core.hyperModel = new HyperModel(options);
    core.HyperModel = HyperModel;
    core.$http = core.hyperModel;
    core.$Http = core.HyperModel;
    insertContent = function(o, cb) {
      if (cb == null) {
        cb = function() {};
      }
      if (o.html != null) {
        o.instance.innerHTML = html;
        cb();
        ({});
      } else {
        if (o.placeholder != null) {
          o.instance.innerHTML = o.placeholder;
        }
        return (new HyperModel(options)).get({
          url: o.uri,
          success: function(data) {
            o.instance.innerHTML = data.html;
            return cb();
          },
          error: function() {
            var e;
            e = "failed";
            return cb(e);
          }
        });
      }
    };
    queryForLink = function(instance) {
      var $a;
      $a = core.$(instance).find('a[rel=self]');
      if ($a.length > 0) {
        return $a.get(0).href;
      } else {
        return null;
      }
    };
    needToEmbed = function(instance) {
      var dom;
      dom = $(instance).children();
      if (dom.length === 1) {
        return dom.eq(0).prop("href");
      } else {

      }
      return null;
    };
    return {
      init: function(sb, done) {
        sb.$http = core.$http;
        sb.HyperModel = sb.$Http = HyperModel;
        sb.insertContent = insertContent;
        sb.selfLink = (function() {
          return queryForLink(sb.instance);
        })();
        sb.embedContent = function(o, cb) {
          var e, url;
          if (o == null) {
            o = {};
          }
          if (cb == null) {
            cb = function() {};
          }
          if (typeof o === "function") {
            cb = o;
            o = {};
          }
          o.instance = sb.instance;
          url = o.reload != null ? queryForLink(sb.instance) : needToEmbed(sb.instance);
          if (url != null) {
            o.uri = url;
            return insertContent(o, cb);
          } else {
            if (o.reload) {
              e = 'no url';
            }
            cb(e);
          }
        };
        if (options.autoembed != null) {
          sb.embedContent(done);
        }
        sb.reloadContent = function(o, cb) {
          if (typeof o === "function") {
            cb = o;
            o = {};
          }
          o.reload = true;
          return sb.embedContent(o, cb);
        };
        sb.triggerSelf = function(cb) {
          return $(sb.instance).find('a[rel=self]').trigger('click');
        };
        sb.virtualDom = sb.$vdom = function(html) {
          return core.$http.$html(html);
        };
        return sb.$vhtml = function(html, s) {
          var $el;
          $el = core.$http.$html(html).find(s);
          if ($el.length !== 0) {
            return $el.eq(0).html();
          } else {
            return null;
          }
        };
      }
    };
  };

  module.exports = plugin;

}).call(this);
