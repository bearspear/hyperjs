// Based originally on jquery.pjax.js
// copyright chris wanstrath
// https://github.com/defunkt/jquery-pjax

import {Mediator} from 'scaleapp';
import $ from 'jquery';

let defaults = $.extend(true, {}, $.ajaxSettings, {
    timeout: 120000,
    push: true,
    replace: false,
    type: "GET",
    dataType: "html",
    scrollTo: 0,
    maxCacheLength: 20,
    data: {}
});

function parseURL(url) {
    var a;
    a = document.createElement("a");
    a.href = url;
    return a;
}

// _pjax: true

let events = {};

export class HyperModel extends Mediator {
    constructor(options) {
        super();

        // get dom ref
        // resource url
        // create ajax object
        // essentially the constructor binds to a resource
        // can return a JSON model, another reason for calling it 'Hyper'
        // check all events on itemprop, itemscope etc when in dom

        // @_ref
        options = options || {};
        this._options = {}; //$.extend(true, {}, $.ajaxSettings, defaults, options)}
        this._headers = {};
        let redirect = options.redirectOnError || false;

        this._hash = parseURL(options.url).hash;
        // @_options.data = {} unless options.data
        // @_options.data._pjax = "true"
        //this._timeoutTimer;
        this._successCb = function () { };

        // callbacks
        this._options.beforeSend = (xhr, settings) => {
            // No timeout for non-GET requests
            // Its not safe to request the resource again with a fallback method.
            if (settings.type !== "GET") { settings.timeout = 0; }

            xhr.setRequestHeader("X-PJAX", "true");

            if (options.isMobile) {
                xhr.setRequestHeader("X-Mobile", "true");
            }


            for (let field in this._headers) {
                let value = this._headers[field];
                xhr.setRequestHeader(field, value);
            }

            // xhr.setRequestHeader "X-PJAX-Container", @_context.selector

            if (!this._fire("pjax:beforeSend", [xhr, settings])) { return false; }

            if (settings.timeout > 0) {
                this._timeoutTimer = setTimeout(() => {
                    if (this._fire("pjax:timeout", [xhr, options])) { return xhr.abort("timeout"); }
                }, settings.timeout);

                // Clear timeout setting so jquerys internal timeout isn't invoked
                settings.timeout = 0;
            }

            return this._requestUrl = parseURL(settings.url).href;
        };

        this._options.complete = (xhr, textStatus) => {
            if (this._timeoutTimer) { clearTimeout(this._timeoutTimer); }
            this._fire("pjax:complete", [xhr, textStatus, this._options]);
            return this._fire("pjax:end", [xhr, this._options]);
        };

        this._options.success = (data, status, xhr) => {
            if (xhr.status !== 204 && (data != null)) {
                var container = this._extractContainer(data, xhr, options);

                // TODO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                // If the new response is missing a body, hard load the page
                // unless container.contents
                // @_locationReplace container.url
                // return

                // @_state =
                //   id: options.id or core.uniqueId()
                //   url: container.url
                //   title: container.title
                //   container: @_context.selector
                //   fragment: @_options.fragment
                //   timeout: @_options.timeout

                // window.history.replaceState @_state, container.title, container.url  if options.push or options.replace
                // @navigate container.url, { replace: true }, @_state  if @_options.push or @_options.replace

                // Clear out any focused controls before inserting new page contents.

                // document.activeElement.blur()
                if (container.title) { document.title = container.title; }
            }

            // @_context.html container.contents

            // FF bug: Won't autofocus fields that are inserted via JS.
            // This behavior is incorrect. So if theres no current focus, autofocus
            // the last field.
            //
            // http://www.w3.org/html/wg/drafts/html/master/forms.html
            // autofocusEl = @_context.find("input[autofocus], textarea[autofocus]").last()[0]
            // autofocusEl.focus()  if autofocusEl and document.activeElement isnt autofocusEl

            // Scroll to top by default
            // $(window).scrollTop options.scrollTo if typeof options.scrollTo is "number"

            // If the URL has a hash in it, make sure the browser
            // knows to navigate to the hash.
            // if @_hash isnt ""

            // Avoid using simple hash set here. Will add another history
            // entry. Replace the url with replaceState and scroll to target
            // by hand.
            //
            //   window.location.hash = hash
            // url = core.parseURL(container.url)
            // url.hash = @_hash
            // @_state.url = url.href

            // window.history.replaceState @_state, container.title, url.href

            // @navigate url.href, { replace: true }, @_state

            // target = $(url.hash)

            // $(window).scrollTop target.offset().top  if target.length

            // console.log data
            this._fire("pjax:success", [container, status, xhr, this._options]);
            return this._successCb(container, status, xhr, this._options);
        };

        this._options.error = (xhr, textStatus, errorThrown) => {
            let container = this._extractContainer("", xhr, this._options);

            let { status } = xhr;
            this._errorCb(xhr, textStatus, errorThrown, this._options);
            this._fire("pjax:error", [xhr, textStatus, errorThrown, this._options]);
            // reload page
            // handle this better
            if (status === 401) {
                return location.href = xhr.getResponseHeader("X-LOGIN-URL");
            } else if (redirect && (status === 0 || (this._options.type === "GET" && textStatus !== "abort"))) {
                return this._locationReplace(container.url);
            }
        };
    }

    _pjax(options) {
        options = $.extend(true, {}, options, this._options);

        let xhr = this._xhr;

        // stop current call if any
        if (xhr && xhr.readyState < 4) {
            xhr.onreadystatechange = function () { };
            xhr.abort();
        }

        xhr = this._xhr = $.ajax(options);

        if (xhr.readyState > 0) {
            this._fire("pjax:start", [xhr, options]);
            this._fire("pjax:send", [xhr, options]);
        }
        return this._xhr;
    }

    _setCallbacks(options) {
        this._successCb = options.success || function () { };
        this._completeCb = options.complete || function () { };
        this._errorCb = options.error || function () { };

        // remove callbacks before we merge with global options
        if (options.success != null) { delete options.success; }
        if (options.error != null) { delete options.error; }
        if (options.complete != null) { return delete options.complete; }
    }

    get(options = {}, verb = 'GET') {
        if (options.url == null) { return; }
        this._setCallbacks(options);
        options.type = verb;
        return this._pjax($.extend({}, defaults, options));
    }

    put(options) {
        if (options.url == null) { return; }
        this._setCallbacks(options);
        options.type = "PUT";
        return this._pjax($.extend({}, defaults, options));
    }


    post(options) {
        if (options.url == null) { return; }
        this._setCallbacks(options);
        options.type = "POST";
        return this._pjax($.extend({}, defaults, options));
    }

    detele(form, options) { }

    patch(form, options) {
        return this._handleSubmit(form, "PATCH", options);
    }

    head(options = {}) {
        return this.get(options, "HEAD");
    }


    submit(form, options) {
        return this._handleSubmit(form, undefined, options);
    }

    stop(form, options) {
        return this._xhr.abort();
    }

    toJSON() {
        return {};
    }

    setHeader(field, value) {
        return this._headers[field] = value;
    }

    removeHeader(field) {
        return delete this._headers[field];
    }

    _handleSubmit(form, method, options = {}) {
        form = form.tagName.toUpperCase() === "FORM" ? form : $(form).find("form").get(0);
        if (typeof form !== 'object') { throw "$.pjax.submit requires a form element"; }

        let settings = {
            type: method || form.method.toUpperCase(),
            url: form.action,
            data: options.data || $(form).serializeArray(),
            // container: $(form).attr("data-pjax")
            target: form
        };

        this._setCallbacks(options);
        return this._pjax($.extend({}, defaults, settings, options));
    }
    // event.preventDefault()

    _fire(type, args) {
        return this.emit(type, args);
    }

    _locationReplace(url) {
        window.history.replaceState(null, "", "#");
        return window.location.replace(url);
    }

    _stripPjaxParam(url) {
        return url.replace(/\?_pjax=[^&]+&?/, "?").replace(/_pjax=[^&]+&?/, "").replace(/[\?&]$/, "");
    }

    findAll(elems, selector) {
        return elems.filter(selector).add(elems.find(selector));
    }

    parseHTML(html) {
        return $.parseHTML(html, document, true);
    }

    $html(html) {
        return $(this.parseHTML(html));
    }

    _extractContainer(data, xhr, options) {
        let obj = {};
        let isPjaxSnippet = false;
        // Prefer X-PJAX-URL header if it was set, otherwise fallback to
        // using the original requested url.
        obj.url = this._stripPjaxParam(xhr.getResponseHeader("X-PJAX-URL") || this._requestUrl);

        if (/<div class="pjax/i.test(data)) {
            isPjaxSnippet = true;
        }

        if (/<html/i.test(data)) {
            var $head = $(this.parseHTML(data.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0]));
            var $body = $(this.parseHTML(data.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0]));
        } else {
            var $body;
            var $head = $body = $(this.parseHTML(data));
        }

        // $body = data


        // If response data is empty, return fast
        if ($body.length === 0) { return obj; }

        if (options.fragment && !isPjaxSnippet) {

            // If they specified a fragment, look for it in the response
            // and pull it out.
            if (options.fragment === "body") {
                var $fragment = $body;
            } else {
                var $fragment = this.findAll($body, options.fragment).first();
            }


            if ($fragment.length) {
                obj.contents = $fragment.contents();

                // If there's no title, look for data-title and title attributes
                // on the fragment
                if (!obj.title) { obj.title = $fragment.attr("title") || $fragment.data("title"); }
            }

        } else { obj.contents = $body; }

        obj.title = ''; //$.trim(obj.title)  if obj.title
        if (this._hash !== "") { obj.hash = this._hash; }
        obj.html = data;
        return obj;
    }
}
