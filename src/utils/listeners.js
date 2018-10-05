import $ from 'jquery';
import { getArgumentNames } from '../utils/tasks';

export function tryEvent(event, done) {
    try {
        this[event](done);
    } catch (err) {
        done(err);
    }
};

export function callMethod(method, ...args) {
    if (typeof this[method] === 'function') {
        this[method](...args);
    }
};

export function triggerEvent(event, done = () => { }) {
    if (typeof this[event] === 'function') {
        if (getArgumentNames(this[event]).length !== 0) {
            try {
                this[event](done);
            } catch (err) {
                done(err);
            }
        } else {
            try {
                this[event]();
                done();
            } catch (err) {
                done(err);
            }
        }
    } else {
        done();
    }
};

export function stopBubbles(event) {
    event.preventDefault();
    event.stopPropagation();
};

export function listenToRoot(rootNode, events, selector, callback, bubbles = true) {
    //var _this = this;
    if (typeof selector === 'function') {
        bubbles = callback;
        callback = selector;
        return $(rootNode).on(events, function (e, ...params) {
            if (!bubbles) stopBubble(e);
            callback(this, e, ...params)
        });

    } else {
        return $(rootNode).on(events, selector, function (e, ...params) {
            if (!bubbles) stopBubble(e);
            callback(this, e, ...params)
        });
    }

    // if bubbles return observable ?
};

export function stopListenToRoot(rootNode) {
    $(rootNode).off();
};

export function addCustomEventToRoot() {

}