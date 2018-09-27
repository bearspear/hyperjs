import $ from 'jquery'
import util from './src/libs/utils';

export * from './src/bootstrap';
export * from './src/core';
export * from './src/core/mediator';
//export * from './src/component';
export * from './src/libs/hypermodel';
//export * from './src/libs/loadcss';
//export { dependencies as Dependencies } from 'needlepoint';
//export * from './src/decorators/registry';
//export * from './src/decorators/styles';
//export * from './src/decorators/view';
export * from './src/decorators/router';
export * from './src/decorators/component';
export * from './src/decorators/root-listener';
export { trycatch as error } from 'javascript-decorators';
export { inject } from 'aurelia-dependency-injection';
export { util };
export { $ }

//window.$ = $;