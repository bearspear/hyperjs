/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const fnRgx =
    new RegExp(`\
function\
[^(]*\
\\(\
([^)]*)\
\\)\
`);

const argRgx = /([^\s,]+)/g;

const getArgumentNames = fn => (__guard__(fn != null ? fn.toString().match(fnRgx) : undefined, x => x[1]) || '').match(argRgx) || [];

// run asynchronous tasks in parallel
const runParallel = function (tasks, cb, force) {
    if (tasks == null) { tasks = []; }
    if (cb == null) { cb = function () { }; }
    let count = tasks.length;
    const results = [];

    if (count === 0) { return cb(null, results); }

    const errors = []; let hasErr = false;

    return Array.from(tasks).map((t, i) => (function (t, i) {
        const next = function (err, ...res) {
            if (err) {
                errors[i] = err;
                hasErr = true;
                if (!force) { return cb(errors, results); }
            } else {
                results[i] = res.length < 2 ? res[0] : res;
            }
            if (--count <= 0) {
                if (hasErr) {
                    return cb(errors, results);
                } else {
                    return cb(null, results);
                }
            }
        };
        try {
            return t(next);
        } catch (e) {
            return next(e);
        }
    })(t, i));
};

// run asynchronous tasks one after another
const runSeries = function (tasks, cb, force) {
    if (tasks == null) { tasks = []; }
    if (cb == null) { cb = function () { }; }
    let i = -1;
    const count = tasks.length;
    const results = [];
    if (count === 0) { return cb(null, results); }

    const errors = []; let hasErr = false;

    var next = function (err, ...res) {
        if (err) {
            errors[i] = err;
            hasErr = true;
            if (!force) { return cb(errors, results); }
        } else {
            if (i > -1) { // first run
                results[i] = res.length < 2 ? res[0] : res;
            }
        }
        if (++i >= count) {
            if (hasErr) {
                return cb(errors, results);
            } else {
                return cb(null, results);
            }
        } else {
            try {
                return tasks[i](next);
            } catch (e) {
                return next(e);
            }
        }
    };
    return next();
};

// run asynchronous tasks one after another
// and pass the argument
const runWaterfall = function (tasks, cb) {
    let i = -1;
    if (tasks.length === 0) { return cb(); }

    var next = function (err, ...res) {
        if (err != null) { return cb(err); }
        if (++i >= tasks.length) {
            return cb(null, ...Array.from(res));
        } else {
            return tasks[i](...Array.from(res), next);
        }
    };
    return next();
};

const doForAll = function (args, fn, cb, force) {
    if (args == null) { args = []; }
    const tasks = Array.from(args).map((a) => (a => next => fn(a, next))(a));
    return runParallel(tasks, cb, force);
};

function __guard__(value, transform) {
    return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}

function hasArgument(fn, idx) {
    if (idx == null) { idx = 1; }
    return getArgumentNames(fn).length >= idx;
}

function __guard__(value, transform) {
    return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}

export default {
    doForAll,
    runParallel,
    runSeries,
    runWaterfall,
    getArgumentNames,
    hasArgument
};