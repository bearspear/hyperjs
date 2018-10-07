import { Component, Dependencies, Service, Pjax, Modal, CustomElement } from './decorators'
import { bootstrap } from './'
import { startComponent } from './src/core/component'


const api = {
    bootstrap: bootstrap,
    startComponent: startComponent,
    Component: Component,
    Dependencies: Dependencies,
    Service: Service,
    Pjax: Pjax,
    Modal: Modal,
    CustomElement: CustomElement
}

window.hyperjs = api;