import { Component, Module, Dependencies, Service, Pjax, Modal, CustomElement } from './decorators';
import { bootstrap, startRootCore, createAppCore, $ } from './';
import { startComponent } from './src/core/component';
import { listenToRoot, stopListenToRoot, Mediator } from './utils';
import { mixin } from './src/utils/mixins'
import tasks from './src/utils/tasks';

const utils = {
    listen: listenToRoot,
    stopListen: stopListenToRoot,
    Mediator: Mediator,
    doForAll: tasks.doForAll,
    runParallel: tasks.runParallel,
    runSeries: tasks.runSeries,
    runWaterfall: tasks.runWaterfall,
    getArgumentNames: tasks.getArgumentNames,
    hasArgument: tasks.hasArgument
};

export {
    bootstrap, createAppCore, startRootCore, startComponent, Component, Module, Dependencies, Service, Pjax, Modal, CustomElement, $
}
