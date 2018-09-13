(function() {
  var plugin;

  plugin = function(core) {
    var $, ancestor, compact, daysInMonth, getItems, isValidDateString, isValidGlobalDateAndTimeString, isValidTimeString, itemValue, json, properties, resolve, splitTokens, tokenList, validDateStringLength;
    $ = core.$;
    "use strict";
    isValidTimeString = function(s) {
      return s && validTimeStringLength(s) === s.length;
    };
    daysInMonth = function(year, month) {
      if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
        return 31;
      } else if (month === 4 || month === 6 || month === 9 || month === 11) {
        return 30;
      } else if (month === 2 && (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0))) {
        return 29;
      } else {
        return 28;
      }
    };
    validDateStringLength = function(s) {
      var m;
      m = /^(\d{4,})-(\d\d)-(\d\d)/.exec(s);
      if (m && m[1] >= 1 && m[2] >= 1 && m[2] <= 12 && m[3] >= 1 && m[3] <= daysInMonth(m[1], m[2])) {
        return m[0].length;
      }
      return 0;
    };
    isValidDateString = function(s) {
      return s && validDateStringLength(s) === s.length;
    };
    isValidGlobalDateAndTimeString = function(s) {
      var m, skip;
      skip = validDateStringLength(s);
      if (skip && s[skip] === "T") {
        s = s.substr(skip + 1);
        skip = validTimeStringLength(s);
        if (skip) {
          s = s.substr(skip);
          if (s === "Z") {
            return true;
          }
          m = /^[+-](\d\d):(\d\d)$/.exec(s);
          if (m && m[1] <= 23 && m[2] <= 59) {
            return true;
          }
        }
      }
      return false;
    };
    splitTokens = function(s) {
      if (s && /\S/.test(s)) {
        return s.replace(/^\s+|\s+$/g, "").split(/\s+/);
      }
      return [];
    };
    getItems = function(types) {
      var selector;
      selector = $.map(splitTokens(types), function(t) {
        return "[itemtype~=\"" + t.replace(/"/g, "\\\"") + "\"]";
      }).join("") || "*";
      return $(selector, this).filter(function() {
        return (this.getAttribute("itemscope") != null) && (this.getAttribute("itemprop") == null);
      });
    };
    ancestor = function(node) {
      while (node.parentNode) {
        node = node.parentNode;
      }
      return node;
    };
    resolve = function(elm, attr) {
      var a, img, p, url;
      url = elm.getAttribute(attr);
      if (!url) {
        return "";
      }
      a = ancestor(elm);
      p = elm.parentNode;
      img = (a.createElement ? a : document).createElement("img");
      try {
        img.setAttribute("src", url);
        if (p) {
          p.insertBefore(img, elm);
        }
        url = img.src;
        if (p) {
          p.removeChild(img);
        }
      } catch (_error) {}
      return url;
    };
    tokenList = function(attr) {
      return function() {
        var list;
        list = splitTokens(this.attr(attr));
        list.contains = function(token) {
          return $.inArray(token, this) !== -1;
        };
        return list;
      };
    };
    itemValue = function() {
      var datetime, elm;
      elm = this[0];
      if (elm.getAttribute("itemprop") == null) {
        return null;
      }
      if (this.itemScope()) {
        return elm;
      }
      switch (elm.tagName.toUpperCase()) {
        case "META":
          return this.attr("content") || "";
        case "AUDIO":
        case "EMBED":
        case "IFRAME":
        case "IMG":
        case "SOURCE":
        case "TRACK":
        case "VIDEO":
          return resolve(elm, "src");
        case "A":
        case "AREA":
        case "LINK":
          return resolve(elm, "href");
        case "OBJECT":
          return resolve(elm, "data");
        case "DATA":
          return this.attr("value") || "";
        case "TIME":
          datetime = elm.getAttribute("datetime");
          if (datetime != null) {
            return datetime;
          }
          break;
        default:
          return this.text();
      }
    };
    properties = function(name) {
      var crawl, props;
      crawl = function(root) {
        var context, toTraverse, traverse;
        traverse = function(node) {
          var $node, i, names;
          i = 0;
          while (i < toTraverse.length) {
            if (toTraverse[i] === node) {
              toTraverse.splice(i--, 1);
            }
            i++;
          }
          $node = $(node);
          if (node !== root) {
            names = $node.itemProp();
            if (names.length) {
              if (!name || names.contains(name)) {
                props.push(node);
              }
            }
            if ($node.itemScope()) {
              return;
            }
          }
          $node.children().each(function() {
            traverse(this);
          });
        };
        toTraverse = [root];
        context = ancestor(root);
        $.each($(root).itemRef(), function(i, id) {
          var $ref;
          $ref = $("#" + id, context);
          if ($ref.length) {
            toTraverse.push($ref[0]);
          }
        });
        $.unique(toTraverse);
        while (toTraverse.length) {
          traverse(toTraverse[0]);
        }
      };
      props = [];
      if (this.itemScope()) {
        crawl(this[0]);
      }
      return $(props);
    };
    $.fn.extend({
      items: getItems,
      itemScope: function() {
        return this[0].getAttribute("itemscope") != null;
      },
      itemType: tokenList("itemtype"),
      itemId: function() {
        return resolve(this[0], "itemid");
      },
      itemProp: tokenList("itemprop"),
      itemRef: tokenList("itemref"),
      itemValue: itemValue,
      properties: properties
    });
    json = function(selector, format) {
      var $items, getObject, result;
      getObject = function(item, memory) {
        var $item, result, types;
        $item = $(item);
        result = {};
        types = $item.itemType();
        if (types.length) {
          result.type = $(types).toArray();
        }
        if ($item.itemId()) {
          result.id = $item.itemId();
        }
        result.properties = {};
        $item.properties().each(function(i, elem) {
          var $elem, value;
          $elem = $(elem);
          value = void 0;
          if ($elem.itemScope()) {
            if ($.inArray(elem, memory) !== -1) {
              value = "ERROR";
            } else {
              memory.push(item);
              value = getObject(elem, memory);
              memory.pop();
            }
          } else {
            value = $elem.itemValue();
          }
          $.each($elem.itemProp(), function(i, prop) {
            if (!result.properties[prop]) {
              result.properties[prop] = [];
            }
            result.properties[prop].push(value);
          });
        });
        return result;
      };
      result = {};
      result.items = [];
      $items = (selector ? $(selector).items() : $(document).items());
      $items.each(function(i, item) {
        var $item;
        $item = $(item);
        if ($item.itemScope()) {
          result.items.push(getObject(item, []));
        }
      });
      if (format) {
        return format(result);
      } else {
        return JSON.stringify(result);
      }
    };
    compact = function(o) {
      var _traverse, _tree;
      _traverse = function(o, tree, fn) {
        $.each(o, function(key, value) {
          var a;
          if ($.isArray(value) && value.length > 1) {
            a = tree[key] = [];
            $.each(value, function(i, v) {
              a[i] = {};
              _traverse(v.properties, a[i], fn);
            });
          } else {
            if (typeof value[0] !== "object") {
              a = value[0];
              tree[key] = isNaN(Number(a)) ? value[0] : Number(a);
            } else {
              if (value[0].properties) {
                tree[key] = {};
                _traverse(value[0].properties, tree[key], fn);
              }
            }
          }
        });
      };
      _tree = {};
      _traverse(o, _tree);
      return _tree;
    };
    return {
      _findData: function($el) {
        var $data;
        $data = $el.find('script.microdata').eq(0);
        if (data.length === 1) {
          JSON.parse($data.html());
        }
        return null;
      },
      init: function(sb) {
        sb.toJSON = function() {
          return compact(json(sb.instance, function(r) {
            return r.items[0].properties;
          }));
        };
        return sb.getData = json;
      }
    };
  };

  module.exports = plugin;

}).call(this);
