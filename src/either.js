const fantasylandWrapper = require('./fantasyland-wrapper');

const Left = fantasylandWrapper((x) => ({
    map: f => Left(x),
    chain: f => Left(x),
    ap: mf => Left(x),
    valueOf: () => x,
    equals: mb => x === mb.valueOf(),
    toString: () => `Left <${x}>`
}));

const Right = fantasylandWrapper((x) => ({
    map: f => Right(f(x)),
    chain: f => f(x),
    ap: mf => mf.map(f => f(x)),
    valueOf: () => x,
    equals: mb => x === mb.valueOf(),
    toString: () => `Right <${x}>`
}));

const Either = Right

module.exports = { Either, Left, Right };