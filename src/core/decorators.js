import { makeClassDecorator, makePropDecorator, ANNOTATIONS, PROP_METADATA } from '../utils/decorators'

export function componentMetaData(options = {}) {
    let template, embedTemplate = false, registry = new Map(), autorun = false;

    if (options.template != null) {
        if (typeof options.template === 'string') {
            template = options.template;
            embedTemplate = true;
        } else {
            template = options.template[0] || null;
            embedTemplate = options.template[1];
        }

    }
    if (options.registry != null) {
        registry = new Map(options.registry);
    }

    if (options.autorun) {
        autorun = options.autorun;
    }

    return {
        template: template,
        embedTemplate: embedTemplate,
        registry: registry,
        autorun: autorun
    }
};

export function Component(options = {}) {
    return makeClassDecorator("Component", componentMetaData(options));
};

export function Pagelet(options = {}) {
    return makeClassDecorator("Pagelet", componentMetaData(options));
};

export function Service(options = {}) {
    return makeClassDecorator("Service", options);
};

export function Module(options = {}) {
    return makeClassDecorator("Module", options);
};

export function CustomElement(options = {}) {
    return makeClassDecorator("CustomElement", options);
};

export function Listen(events, selector) {
    return makePropDecorator("Listen", [events, selector]);
};

export function Subscribe(channels) {
    return makePropDecorator("Subscribe", [channels]);
};

export function Broadcast(action) {
    return makePropDecorator("Broadcast", action);
};

export function Element(selector) {
    return makePropDecorator("Element", [selector]);
};

export function Router(options = {}) {
    return makeClassDecorator("Router", options);
};

export function Pjax(options = {}) {
    return makeClassDecorator("Pjax", options);
};

export function Modal(options = {}) {
    return makeClassDecorator("Modal", options);
};
