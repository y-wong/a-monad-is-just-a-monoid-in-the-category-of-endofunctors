const fantasylandWrapper = require('./fantasyland-wrapper');

const Nothing = fantasylandWrapper((x) => ({
    map: f => Nothing(x),
    chain: f => Nothing(x),
    ap: mf => Nothing(x),
    valueOf: () => x,
    equals: mb => x === mb.valueOf(),
    toString: () => `Left <${x}>`
}));

const Just = fantasylandWrapper((x) => ({
    map: f => Just(f(x)),
    chain: f => f(x),
    ap: mf => mf.map(f => f(x)),
    valueOf: () => x,
    equals: mb => x === mb.valueOf(),
    toString: () => `Right <${x}>`
}));

const Maybe = Just

module.exports = { Maybe, Nothing, Just };