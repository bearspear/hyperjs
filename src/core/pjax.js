
import { createHyperComponent } from './component';
import { HyperModel } from "./hypermodel";
import { ANNOTATIONS, PROP_METADATA } from '../utils/decorators';
import { triggerEvent, method } from '../utils/listeners';
import $ from 'jquery';

export function createPjaxComponent(_Class) {

    const _newClass = createHyperComponent(_Class);
    const _metadata = Object.assign(_Class[ANNOTATIONS], {});
    const contentRoot = $(_metadata.main || "main").get(0);

    return class PjaxComponent extends _newClass {

        internalState = {
            currentUrl: '/',
            breadcrumb: []
        }

        onSuccessPjax(data) {
            alert(data)
        }

        traverse(url) {
            this.hyperModel.get({
                url: url
            });
        }

        onStateChange(url) {
            this.traverse(url)
        }

        onBind(domListen) {
            console.log('pjax binding');
            if (typeof super.onBind === 'function') {
                super.onBind(domListen);
            }
        }

        onSubscribe(domListen, parentListen) {
            console.log('pjax subscriptions');
            if (typeof super.onBind === 'function') {
                super.onSubscribe(domListen, parentListen);
            }
        }

        onPjaxInit() {
            console.log("Do Init Pjax stuff!");
            this.hyperModel = new class extends HyperModel {
                onComplete(event) {
                    console.log('event:', event);
                    const html = event[0].contents;
                    let url = event[0].url;
                    $(contentRoot).attr("data-url", url).html(html);
                    method.call(this, 'onPjaxSuccess', contentRoot, html, url)
                }
                onError(event) {
                    method.call(this, 'onPjaxError', event, contentRoot)
                }
            }();
            this.traverse("http://localhost:8000/");
        }

        _preInit(sandbox) {
            super._preInit(sandbox);
            this.onPjaxInit();
        }
    }
};
