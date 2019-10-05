const { composeK } = require('./utils');
const MonadToMonoid = M => {
  const Monoid = F => ({
    concat: MG =>
      Monoid(
        composeK(
          MG.valueOf(),
          F
        )
      ),
    valueOf: () => F,
    toString: () => 'Monoind<' + String(F) + '>'
  });
  Monoid.empty = Monoid(M);
  return Monoid;
};

module.exports = MonadToMonoid;
