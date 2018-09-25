import { makePropDecorator } from './decorators'

export function RootListener(events, selector) {
    return makePropDecorator("RootListener", [events, selector]);
}


