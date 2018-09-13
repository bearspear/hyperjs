/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */

 import util from './utils'

export var Mediator = (function () {
    let _getTasks = undefined;
    Mediator = class Mediator {
        static initClass() {

            _getTasks = function (data, channel, originalChannel, ctx) {
                const subscribers = ctx.channels[channel] || [];
                return Array.from(subscribers).map((sub) => (sub =>
                    function (next) {
                        try {
                            if (util.hasArgument(sub.callback, 3)) {
                                return sub.callback.apply(sub.context, [data, originalChannel, next]);
                            } else {
                                return next(null, sub.callback.apply(sub.context, [data, originalChannel]));
                            }
                        } catch (e) {
                            return next(e);
                        }
                    }
                )(sub));
            };
        }

        constructor(obj, cascadeChannels) {
            if (cascadeChannels == null) { cascadeChannels = false; }
            this.cascadeChannels = cascadeChannels;
            this.channels = {};
            if (obj instanceof Object) {
                this.installTo(obj);
            } else if (obj === true) { this.cascadeChannels = true; }
        }

        // ## Subscribe to a topic
        //
        // Parameters:
        //
        // - (String) topic      - The topic name
        // - (Function) callback - The function that gets called if an other module
        //                         publishes to the specified topic
        // - (Object) context    - The context the function(s) belongs to
        on(channel, fn, context) {

            if (context == null) { context = this; }
            if (this.channels[channel] == null) { this.channels[channel] = []; }
            const that = this;

            if (channel instanceof Array) {
                return Array.from(channel).map((id) => this.on(id, fn, context));
            } else if (typeof channel === "object") {
                return (() => {
                    const result = [];
                    for (let k in channel) {
                        const v = channel[k];
                        result.push(this.on(k, v, fn));
                    }
                    return result;
                })();
            } else {
                if (typeof channel !== "string") { return false; }
                const subscription = { context, callback: fn || function () { } };
                return ({
                    attach() { that.channels[channel].push(subscription); return this; },
                    detach() { Mediator._rm(that, channel, subscription.callback); return this; },
                    pipe() { that.pipe.apply(that, [channel, ...arguments]); return this; }
                }).attach();
            }
        }

        // ## Unsubscribe from a topic
        //
        // Parameters:
        //
        // - (String) topic      - The topic name
        // - (Function) callback - The function that gets called if an other module
        //                         publishes to the specified topic
        off(ch, cb) {
            switch (typeof ch) {
                case "string":
                    if (typeof cb === "function") { Mediator._rm(this, ch, cb); }
                    if (typeof cb === "undefined") { Mediator._rm(this, ch); }
                    break;
                case "function": for (var id in this.channels) { Mediator._rm(this, id, ch); } break;
                case "undefined": for (id in this.channels) { Mediator._rm(this, id); } break;
                case "object": for (id in this.channels) { Mediator._rm(this, id, null, ch); } break;
            }
            return this;
        }

        // ## Publish an event
        //
        // Parameters:
        // - (String) topic             - The topic name
        // - (Object) data              - The data that gets published
        // - (Funtction)                - callback method
        emit(channel, data, cb, originalChannel) {

            let chnls;
            if (cb == null) { cb = function () { }; }
            if (originalChannel == null) { originalChannel = channel; }
            if (typeof data === "function") {
                cb = data;
                data = undefined;
            }
            if (typeof channel !== "string") { return false; }

            const tasks = _getTasks(data, channel, originalChannel, this);

            util.runSeries(tasks, (function (errors, results) {
                let e;
                if (errors) {
                    e = new Error(((() => {
                        const result = [];
                        for (let x of Array.from(errors)) {
                            if (x != null) {
                                result.push(x.message);
                            }
                        }
                        return result;
                    })()).join('; '));
                }
                return cb(e);
            }), true);

            if (this.cascadeChannels && ((chnls = channel.split('/')).length > 1)) {
                let o;
                if (this.emitOriginalChannels) { o = originalChannel; }
                this.emit(chnls.slice(0, -1).join('/'), data, cb, o);
            }
            return this;
        }

        // ## Send a task
        //
        // Parameters:
        // - (String) topic             - The topic name
        // - (Object) data              - The data that gets published
        // - (Function)                 - callback method
        send(channel, data, cb) {

            if (cb == null) { cb = function () { }; }
            if (typeof data === "function") {
                cb = data;
                data = undefined;
            }
            if (typeof channel !== "string") { return false; }
            const tasks = _getTasks(data, channel, channel, this);

            util.runFirst(tasks, (function (errors, result) {
                if (errors) {
                    const e = new Error(((() => {
                        const result1 = [];
                        for (let x of Array.from(errors)) {
                            if (x != null) {
                                result1.push(x.message);
                            }
                        }
                        return result1;
                    })()).join('; '));
                    return cb(e);
                } else {
                    return cb(null, result);
                }
            }), true);
            return this;
        }

        // ## Install Pub/Sub functions to an object
        installTo(obj, force) {
            if (typeof obj === "object") {
                for (let k in this) {
                    const v = this[k];
                    if (force) {
                    obj[k] = v;
                    } else { if (obj[k] == null) { obj[k] = v; } }
                }
            }
            return this;
        }

        pipe(src, target, mediator) {

            if (target instanceof Mediator) {
                mediator = target; target = src;
            }

            if (mediator == null) { return this.pipe(src, target, this); }

            // prevent cycles
            if ((mediator === this) && (src === target)) { return this; }

            this.on(src, function () { return mediator.emit.apply(mediator, [target, ...arguments]); });

            return this;
        }

        static _rm(o, ch, cb, ctxt) {
            if (o.channels[ch] == null) { return; }
            return o.channels[ch] = ((() => {
                const result = [];
                for (let s of Array.from(o.channels[ch])) {
                    if ((cb != null) ?
                        s.callback !== cb
                        : (ctxt != null) ?
                            s.context !== ctxt
                            :
                            s.context !== o) {
                        result.push(s);
                    }
                }
                return result;
            })());
        }
    };
    Mediator.initClass();
    return Mediator;
})();