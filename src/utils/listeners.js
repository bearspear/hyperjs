import $ from 'jquery';

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
};

export function stopListenToRoot(rootNode) {
    $(rootNode).off();
};