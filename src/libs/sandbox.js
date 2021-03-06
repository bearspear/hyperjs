import $ from 'jquery';

// components are sandbox; the sandbox is the environment is appear of or can safely trust. its window and/or document object
export function Sandbox(core, instanceId, options, moduleId) {
  var parent = core.instance;
  this.parent = core.instance;
  this.options = options != null ? options : {};

  this.instanceId = instanceId || moduleId;
  this.instance = options.domNode || document.getElementById(instanceId) || parent.querySelector(instanceId);
  this.$instance = $(this.instance);

  this.getElementById = (id) => {
    return this.instance.querySelector('#' + id);
  }
  this.html = function (html) {
    this.$instance.html(html);
  };
  this.append = function (a) {
    this.$instance.append(a);
  };
  this.stopBubble = function (e) {
    e.preventDefault();
    e.stopPropagation();
  }

  if (options.html != null) {
    this.html(options.html);
  }
  this.moduleId = moduleId;
  this.err = function (err) { if (err) { console.error(err); } };
  core._mediator.installTo(this);
  return this;
};