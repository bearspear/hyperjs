
import { createHyperComponent } from './component';
import $ from 'jquery';
import { ANNOTATIONS, PROP_METADATA } from '../utils/decorators';
import { listenToRoot, stopListenToRoot, triggerEvent } from '../utils/listeners';

/***** 
    What is a pagelet?
    A cross between a component and a custom elment.
    or a div with a shadowdom. It can though also have a light dom
*******/


export function insertTemplate(shadowDom, template, clear = "false") {
    if (clear) {
        shadowDom.innerHTML = '';
    }
    let templateString = $(template).html();
    templateString = `<div class="root">${templateString}</div>`;
    const templateHtml = $(templateString).get(0);
    shadowDom.appendChild(templateHtml);
}

export function createShadowDom(context, template = '<main></main') {
    const shadowDom = context.attachShadow({ mode: "open" });
    insertTemplate(shadowDom, template, true);
    return shadowDom;
}


export function createPagelet(_Class) {
    // create shadow dom, insert template, ensure listeners properly started

    const _newClass = createHyperComponent(_Class);
    const _metadata = Object.assign(_Class[ANNOTATIONS], {});
    const template = _metadata.template;
    //_metadata.template = null;

    return class Pagelet extends _newClass {

        onPageletInit(sb) {
            this.root = sb.instance;
            if (this.root.shadowRoot == null) {
                this.shadowNode = createShadowDom(this.root, template);
            } else {
                this.shadowNode = this.root.shadowRoot;
                insertTemplate(this.shadowNode, template, true)
            }
        }

        _registerComponents() {
            const registry = _metadata.registry || new Map();
            //TODO: Dom-based
            for (const [key, value] of registry.entries()) {
                const options = {
                    domNode: $(this.instance.shadowRoot.firstChild).find('#' + key).get(0)
                }
                this.core.register(key, value, options)
            }
        }

        _preInit(sandbox) {
            this.onPageletInit(sandbox);
            super._preInit(sandbox);
        }

        _bind() {
            super._bind();
            if (typeof this.onShadowBind === 'function') {
                this.onShadowBind(
                    (...args) => listenToRoot(this.instance.shadowRoot.firstChild, ...args)
                    // (...args) => this.listenToElement(...args)
                );
            }

            if (typeof this.onSlotChange === 'function') {

            }
        }

        destroy(done) {
            super.destroy((err) => {
                this.shadowNode.innerHTML = '';
                done(err);
            });
        }
    };
};

