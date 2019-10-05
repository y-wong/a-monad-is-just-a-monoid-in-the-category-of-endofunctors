const Nothing = {
  map: () => Nothing,
  chain: () => Nothing,
  ap: () => Nothing,
  valueOf: () => null,
  toString: () => `Nothing`
};

const Just = x => ({
  map: f => Just(f(x)),
  chain: f => f(x),
  ap: mf => mf.map(f => f(x)),
  valueOf: () => x,
  constructor: Just,
  toString: () => `Right(${String(x)})`
});

const Maybe = x => (x === null || x === undefined ? Nothing : Just(x));

Maybe.of = Maybe;

module.exports = { Maybe, Nothing, Just };
