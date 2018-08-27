import {util} from 'scaleapp';
import $ from 'jquery';

// Some aliases
var sTimeout = window.setTimeout;
var toString = {}.toString;
var firstScript;

function noop() { }

// Helper functions
function isObject(obj) {
    return Object(obj) === obj;
}

function isString(s) {
    return typeof s == 'string';
}

function readFirstScript() {
    if (!firstScript || !firstScript.parentNode) {
        firstScript = document.getElementsByTagName('script')[0];s
    }
}

 // insertStyles(styles) {
  //   return $(`<style>${styles}</style>`).appendTo(document.head).get(0);
  // }


function findLink(url) {
    return $("link[href*='" + url + "']").get(0);
};

export function loadCss(url, cb = () => { }) {
    var link = findLink(url);
    if (link == null) {
        injectCss(url, cb);
    } else {
        link.disabled = false;
        cb();
    }
}

export function disableCss(url) {
    var ref = findLink(url);
    if (ref != null) {
        ref.disabled = true;
    }
}

export function loadStylesheets(stylesheets, done = () => { }) {
    var _this = this;
    let loadAction = (function (_this) {
        return function (stylesheet, next) {
            return loadCss(stylesheet + "?version=123", next);
        };
    })(this);
    return util.doForAll(stylesheets, loadAction, done, true);
};

export function unloadCss(stylesheets) {
    var stylesheet;
    for (var i = 0; i < stylesheets.length; i++) {
        stylesheet = stylesheets[i];
        unloadCss(options.page.root + stylesheet);
    }
};

export function injectCss(options, cb) {
    var attrs = {};
    var href;
    var i;
    var media;

    // optionally accept an object of settings
    // or a string that's the url
    if (isObject(options)) {
        // allow the overriden _url property to take precendence
        href = options._url || options.href;
        attrs = options.attrs || {};
    }
    else if (isString(options)) {
        href = options;
    }

    // Create stylesheet link
    var link = document.createElement('link');

    cb = cb || noop;

    // Add attributes
    link.href = href;
    link.rel = 'stylesheet';
    // Technique to force non-blocking loading from:
    // https://github.com/filamentgroup/loadCSS/blob/master/loadCSS.js#L20
    link.media = 'only x';
    link.type = 'text/css';

    // On next tick, just set the media to what it's supposed to be
    sTimeout(function () {
        link.media = attrs.media || 'all';
    });

    // Add our extra attributes to the link element
    for (i in attrs) {
        link.setAttribute(i, attrs[i]);
    }

    readFirstScript();
    // We append link tags so the cascades work as expected.
    // A little more dangerous, but if you're injecting CSS
    // dynamically, you probably can handle it.
    firstScript.parentNode.appendChild(link);

    // Always just run the callback for CSS on next tick. We're not
    // going to try to normalize this, so don't worry about runwhenready here.
    sTimeout(function () {
        cb.call(window);
    });
}
