export function disposeObject(obj) {
    const objs = obj instanceof Array ? obj : [obj];
    for (let o of objs) {
        if (o != null) {
            o = null;
        }
    }
};

export function uniqueId(length) {
    var id;
    if (length == null) {
        length = 8;
    }
    id = "";
    while (id.length < length) {
        id += Math.random().toString(36).substr(2);
    }
    return id.substr(0, length);
};

export function convertHtmlToText(html) {
    return html
        .replace(/<\/p>/gi, "\n")
        .replace(/<br\/?>/gi, "\n")
        .replace(/<\/?[^>]+(>|$)/g, "")
        .replace(/(&nbsp;)/g, ' ');
};

export function capitalizeEachWord(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};

export function getSize(el) {
    el = $(el).get(0);
    return {
        container: {
            width: $(el).width(),
            height: $(el).heigh()
        }
    }
}

export function clone(o) {
    return Object.assign({}, o);
}

export function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

export function encodeJSONtoBase64(json) {
    const str = JSON.stringify(json);
    return window.btoa(str)
}

export function decodeBase64toJSON(str) {
    const json = window.atob(str);
    return JSON.parse(json);
}

export function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function noop() {

}

const authErrors = ['SAS Rejected', 'Invalid Session'];

export function enableGlobalErrorCatch(cb) {
    $(document).ajaxError((event, jqxhr, settings, thrownError) => {
        console.error(event, jqxhr, settings, thrownError);
        let message = thrownError.length > 0 ? thrownError : 'Network issue';
        if (thrownError.toLowerCase() !== 'abort') {
            notify(message, { globalPosition: 'top center' });
        }
        cb(message.indexOf(authErrors[1]) === -1);
    });
}