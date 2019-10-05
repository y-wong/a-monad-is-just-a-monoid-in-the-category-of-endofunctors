const Identity = x => ({
  map: f => Identity(f(x)),
  chain: f => f(x),
  ap: mf => mf.map(f => f(x)),
  fold: f => f(x),
  constructor: Identity,
  valueOf: () => x,
  toString: () => `Identity(${String(x)})`
});

Identity.of = Identity;

module.exports = { Identity };
