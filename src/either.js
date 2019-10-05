const Left = x => ({
  map: () => Left(x),
  chain: () => Left(x),
  ap: () => Left(x),
  constructor: Left,
  valueOf: () => x,
  toString: () => `Left <${String(x)}>`
});

const Right = x => ({
  map: f => Right(f(x)),
  chain: f => f(x),
  ap: mf => mf.map(f => f(x)),
  constructor: Right,
  valueOf: () => x,
  toString: () => `Right <${String(x)}>`
});

const Either = x => Right(x);

Either.of = Either;

module.exports = { Either, Left, Right };
