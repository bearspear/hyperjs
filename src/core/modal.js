import { createHyperComponent } from './component';
import { ANNOTATIONS } from '../utils/decorators';
import $ from 'jquery';
import { modal as TingleModal } from 'tingle.js';
import { method } from '../utils/listeners';

import "tingle.js/dist/tingle.css"


const modalDefaults = {
    footer: true,
    stickyFooter: false,
    closeMethods: ['overlay', 'button', 'escape'],
    closeLabel: "Close",
    cssClass: ['custom-class-1', 'custom-class-2']
};

export function createModalComponent(_Class) {
    const _newClass = createHyperComponent(_Class);
    const _metadata = Object.assign(_Class[ANNOTATIONS], {});
    // inject a container into the dom, child of <body>
    const modalOptions = _metadata.options || {};
    const template = _metadata.content;

    // modal properties set in decorator
    return class Modal extends _newClass {

        triggerTimedClose(cb = () => { }, seconds = 3) {
            this.timer = setTimeout(() => {
                this.closeModal();
                cb();
            }, seconds * 1000);
        }

        closeModal() {
            this.modal.close();
        }

        openModal() {
            this.modal.open();
        }

        _bind() {
            super._bind(this.modal.addFooterBtn.bind(this.modal));
        }

        setModel() { }

        _initModal() {
            let options = this.options = Object.assign(modalDefaults, modalOptions);

            options['onOpen'] = () => {
                console.log('modal open');
                method.call(this, 'onModalOpen');
            }

            options['onClose'] = () => {
                console.log('modal closed');
                method.call(this, 'onModalClose');
            }

            options['beforeClose'] = () => {
                // here's goes some logic
                // e.g. save content before closing the modal
                return method.call(this, 'onBeforeClose') || true;
                //return false; // nothing happens
            }
            this.modal = new TingleModal(options);
            // add buttons
            if (options.footer) {
                this.onModalButtonAdd(this.modal.addFooterBtn.bind(this.modal))
            }
        }

        destroy(done) {
            super.destroy((err) => {
                this.modal.destroy();
                this.modal = null; //dispose
                done(err);
            });
        }

        _preInit(sandbox) {
            this._initModal();
            sandbox.instance = this.modal.modal;

            super._preInit(sandbox);

            this.render(template);
            this.modal.open();
        }

        render(html) {
            this.modal.setContent(html);
        }

    }

}