import { classMixin } from './mixins';

export const PROP_METADATA = '__prop_metadata__';
export const ANNOTATIONS = '__annotations__';

export function makeClassDecorator(type, options = {}, mixins = {}) {

    return function (cls) {
        options["_name"] = cls.name;
        const annotations = cls.hasOwnProperty(ANNOTATIONS) ?
            cls[ANNOTATIONS] :
            Object.defineProperty(cls, ANNOTATIONS, { value: {}, writable: true })[ANNOTATIONS];

        cls[ANNOTATIONS] = Object.assign(cls[ANNOTATIONS], options);
        cls["type"] = type;

        //console.log(cls[ANNOTATIONS])

        return classMixin(mixins)(cls);
    }
}

export function makeParamDecorator() {
    throw new Error('not implemeneted yet');
}

export function makePropDecorator(metaName, props) {
    function PropDecorator(target, name, descriptor) {
        let constructor = target.constructor;
        const fn = descriptor.value;
        let meta = constructor.hasOwnProperty(PROP_METADATA) ?
            constructor[PROP_METADATA] :
            Object.defineProperty(constructor, PROP_METADATA, { value: {}, writable: true, configurable: true })[PROP_METADATA]

        meta[metaName] = meta.hasOwnProperty(metaName) && meta[metaName] || [];
        // meta[name].unshift(decoratorInstance);
        meta[metaName].push([name, props, fn]);

        return descriptor;
    }
    return PropDecorator;
}

