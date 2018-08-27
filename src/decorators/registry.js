export function registry(arg) {
    return function (target) {
        target.prototype.registry = new Map(arg);
    }
}
