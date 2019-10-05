const fantasylandWrapper = require('./fantasyland-wrapper');

const Identity = fantasylandWrapper((x) => ({
    map: f => Identity(f(x)),
    chain: f => f(x),
    ap: mf => mf.map(f => f(x)),
    fold: f => f(x),
    equals: mb => x === mb.valueOf(),
    valueOf: () => x,
    toString: () => `Identity <${x}>`
}));
module.exports = Identity;