(function() {
  var plugin;

  plugin = function(core) {
    var cache, tmpl;
    cache = {};
    tmpl = function(str, data) {
      var fn;
      fn = (!/\W/.test(str) ? cache[str] = cache[str] || tmpl(document.getElementById(str).innerHTML) : new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};" + "with(obj){p.push('" + str.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');"));
      if (data) {
        return fn(data);
      } else {
        return fn;
      }
    };
    core.tmpl = tmpl;
    return {
      init: function(sb) {
        sb.tmpl = tmpl;
        return sb.render = tmpl;
      }
    };
  };

  module.exports = plugin;

}).call(this);
