// Based originally on jquery.pjax.js
// https://github.com/defunkt/jquery-pjax

import { Mediator } from '../core/mediator';
import { HttpClient } from 'aurelia-http-client'
import { triggerEvent, callMethod } from '../utils/listeners';
import { uniqueId, noop } from '../utils/tools';
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

export function parseURL(url) {
    var a;
    a = document.createElement("a");
    a.href = url;
    return a;
}

export function parseHTML(html) {
    return $.parseHTML(html, document, true);
}

export function findAll(elems, selector) {
    return elems.filter(selector).add(elems.find(selector));
}

export function stripPjaxParam(url) {
    return url.replace(/\?_pjax=[^&]+&?/, "?").replace(/_pjax=[^&]+&?/, "").replace(/[\?&]$/, "");
}

export function $html(html) {
    return $(parseHTML(html));
}

export function extractPjaxContent(html, fragment) {
    let obj = {}, $head, $body, $fragment;
    const isPjaxSnippet = /<div class="pjax/i.test(html);

    if (/<html/i.test(html)) {
        $head = $(parseHTML(html.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0]));
        $body = $(parseHTML(html.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0]));
    } else {
        $body;
        $head = $body = $(parseHTML(html));
    }

    // If response data is empty, return fast
    if ($body.length === 0) { return obj; }

    if (fragment && !isPjaxSnippet) {
        // If they specified a fragment, look for it in the response
        // and pull it out.
        if (fragment === "body") {
            $fragment = $body;
        } else {
            $fragment = findAll($body, fragment).first();
        }

        if ($fragment.length) {
            obj.contents = $fragment.contents();

            // If there's no title, look for data-title and title attributes
            // on the fragment
            if (!obj.title) { obj.title = $fragment.attr("title") || $fragment.data("title"); }
        }

    } else { obj.contents = $body; }

    obj.title = ''; //$.trim(obj.title)  if obj.title
    //obj.head = $head
    //if (this._hash !== "") { obj.hash = this._hash; }
    obj.html = html;
    return obj;
}

function locationReplace(url) {
    window.history.replaceState(null, "", "#");
    return window.location.replace(url);
}

// _pjax: true

let events = {};

export class HyperModel extends Mediator {

    constructor(options) {
        super();
        this.httpClient = new HttpClient();
        // get dom ref
        // resource url
        // create ajax object
        // essentially the constructor binds to a resource
        // can return a JSON model, another reason for calling it 'Hyper'
        // check all events on itemprop, itemscope etc when in dom

        options = options || {};
        this._options = {}; //$.extend(true, {}, $.ajaxSettings, defaults, options)}
        this._headers = {};
        let redirect = options.redirectOnError || false;

        this._hash = parseURL(options.url).hash;
    }

    _prepareRequest(client, settings) {
        if (settings.type !== "GET") {
            settings.timeout = 0;
        }

        if (this._options.isMobile) {
            client.withHeader("X-Mobile", "true");
        }

        client.withHeader("X-PJAX", "true")
            .withTimeout(settings.timeout)
        //.withResponseType('text/html')

        for (let field in this._headers) {
            let value = this._headers[field];
            client.withHeader(field, value);
        }

        // if (!this._fire("pjax:beforeSend", [xhr, settings])) {
        //     return false;
        // }

        if (settings.timeout > 0) {
            this._timeoutTimer = setTimeout(() => {
                if (this._fire("pjax:timeout", [xhr, options])) {
                    return xhr.abort("timeout");
                }
            }, settings.timeout);

            // Clear timeout setting so jquerys internal timeout isn't invoked
            settings.timeout = 0;
        }

        this._requestUrl = parseURL(settings.url).href;

        return client;
    }

    // onBeforeSend(xhr, settings) {
    //     // No timeout for non-GET requests
    //     // Its not safe to request the resource again with a fallback method.
    //     if (settings.type !== "GET") { settings.timeout = 0; }

    //     xhr.setRequestHeader("X-PJAX", "true");

    //     if (options.isMobile) {
    //         xhr.setRequestHeader("X-Mobile", "true");
    //     }

    //     for (let field in this._headers) {
    //         let value = this._headers[field];
    //         xhr.setRequestHeader(field, value);
    //     }

    //     // xhr.setRequestHeader "X-PJAX-Container", @_context.selector

    //     if (!this._fire("pjax:beforeSend", [xhr, settings])) { return false; }

    //     if (settings.timeout > 0) {
    //         this._timeoutTimer = setTimeout(() => {
    //             if (this._fire("pjax:timeout", [xhr, options])) { return xhr.abort("timeout"); }
    //         }, settings.timeout);

    //         // Clear timeout setting so jquerys internal timeout isn't invoked
    //         settings.timeout = 0;
    //     }

    //     return this._requestUrl = parseURL(settings.url).href;
    // }

    triggerComplete(textStatus) {
        if (this._timeoutTimer) {
            clearTimeout(this._timeoutTimer);
        }
        this._fire("pjax:complete", [textStatus, this._options]);
        this._fire("pjax:end", [this._options]);
    }

    triggerSuccess(response) {
        let { statusCode, content } = response;

        if (statusCode !== 204 && (content != null)) {
            var container = this._extractContainer(content, this._options);
            if (container.title) {
                document.title = container.title;
            }
        }
        let event = [container, statusCode, this._options];
        this._fire("pjax:success", event);
        console.log(event)
        callMethod.call(this, 'onSuccess', event);
        return event;
    }

    triggerError(status, message) {
        let event = [status, message];
        this._fire("pjax:error", event);
        this._errorCb(...event);

        console.error(event)

        if (status === 401) {
            //return location.href = xhr.getResponseHeader("X-LOGIN-URL");
        } else if (redirect && (status === 0 || (this._options.type === "GET" && textStatus !== "abort"))) {
            //return locationReplace(container.url);
        }
        callMethod.call(this, 'onError', event);
    }

    get(options = {}) {
        if (options.url == null) { return; }
        this.executePjax('Get', options)
    }

    head(options = {}) {
        if (options.url == null) { return; }
        this.executePjax("head", options);
    }

    executePjax(verb = 'Get', options = {}) {
        options = $.extend(true, {}, options, this._options);
        options = callMethod.call(this, 'onBeforeSend', options) || options;
        const event = [verb, options];
        this._fire("pjax:beforeSend", options);
        const request = this.httpClient.createRequest(options.url);
        this.httpCall = this._prepareRequest(request, options)['as' + verb]().send();
        this._fire("pjax:start", event);
        this._fire("pjax:send", event);
        this.httpCall
            .then(response => this.triggerSuccess(response))
            .then(event => {
                callMethod.call(this, 'onComplete', event);
            })
            .catch(error => this.triggerError(error));
    }

    // _pjax(options) {
    //     options = $.extend(true, {}, options, this._options);

    //     let client = new HttpClient()
    //         .configure(config => {
    //             config.withBaseUrl('http://aurelia.io');
    //             config.withTimeout(options.timeout)
    //             config.withResponseType('text/html')
    //         });

    //     let xhr = this._xhr;

    //     // stop current call if any
    //     if (xhr && xhr.readyState < 4) {
    //         xhr.onreadystatechange = function () { };
    //         xhr.abort();
    //     }

    //     xhr = this._xhr = $.ajax(options);

    //     if (xhr.readyState > 0) {
    //         this._fire("pjax:start", [xhr, options]);
    //         this._fire("pjax:send", [xhr, options]);
    //     }
    //     return this._xhr;
    // }

    // _setCallbacks(options) {
    //     this._successCb = options.success || noop;
    //     this._completeCb = options.complete || noop;
    //     this._errorCb = options.error || noop;

    //     // remove callbacks before we merge with global options
    //     if (options.success != null) { delete options.success; }
    //     if (options.error != null) { delete options.error; }
    //     if (options.complete != null) { return delete options.complete; }
    // }


    // put(options) {
    //     if (options.url == null) { return; }
    //     this._setCallbacks(options);
    //     options.type = "PUT";
    //     return this._pjax($.extend({}, defaults, options));
    // }

    // post(options) {
    //     if (options.url == null) { return; }
    //     this._setCallbacks(options);
    //     options.type = "POST";
    //     return this._pjax($.extend({}, defaults, options));
    // }

    // detele(form, options) { }

    // patch(form, options) {
    //     return this._handleSubmit(form, "PATCH", options);
    // }

    // head(options = {}) {
    //     return this.get(options, "HEAD");
    // }


    submit(form, options) {
        return this._handleSubmit(form, undefined, options);
    }

    stop() {
        this.httpCall.abort();
    }

    toJSON() {
        return {};
    }

    setHeader(field, value) {
        this._headers[field] = value;
    }

    removeHeader(field) {
        delete this._headers[field];
    }

    _handleSubmit(form, method = "Post", options = {}) {
        form = form.tagName.toUpperCase() === "FORM" ? form : $(form).find("form").get(0);

        if (typeof form !== 'object') {
            throw "$.pjax.submit requires a form element";
        }

        let settings = {
            type: method || form.method.toUpperCase(),
            url: form.action,
            data: options.data || $(form).serializeArray(),
            // container: $(form).attr("data-pjax")
            target: form
        };
        this.executePjax(settings.type, settings)
    }

    _fire(type, args) {
        return this.emit(type, args);
    }

    _extractContainer(data, options) {
        let container = extractPjaxContent(data, options.fragment);
        // container.url = stripPjaxParam(xhr.getResponseHeader("X-PJAX-URL")
        //     || this._requestUrl);

        container.url = this._requestUrl;
        return container;
    }
}
