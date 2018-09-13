(function() {
  var plugin;

  plugin = function(core) {
    var cleanHTML, html;
    cleanHTML = function(str) {
      return str.replace(/\n/g, "").replace(/[\t ]+\</g, "<").replace(/\>[\t ]+\</g, "><").replace(/\>[\t ]+$/g, ">");
    };
    core.html = html = {
      clean: cleanHTML
    };
    return {
      init: function(sb) {
        sb.getContainer = function() {
          switch (typeof sb.options.container) {
            case "string":
              return document.getElementById(sb.options.container);
            case "object":
              return sb.options.container;
            default:
              return document.getElementById(sb.instanceId);
          }
        };
        return {
          html: html
        };
      }
    };
  };

  module.exports = plugin;

}).call(this);
