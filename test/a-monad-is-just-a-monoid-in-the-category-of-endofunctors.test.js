const MonadToMonoid = require('../src/monad-to-monoid');
const { Identity } = require('../src/identity');
const { Maybe } = require('../src/maybe');
const { Either } = require('../src/either');
const equals = require('./equals');

const test = (description, M) => {
  const Monoid = MonadToMonoid(M);
  const F = Monoid(x => M(x * 2));
  const G = Monoid(x => M(-x));
  const H = Monoid(x => M(x / 4));
  const x = 2;

  describe(description, () => {
    it('follows identity laws', () => {
      equals(
        Monoid.empty.concat(F).valueOf()(x),
        F.valueOf()(x)
      );//M(4)
      equals(
        F.concat(Monoid.empty).valueOf()(x),
        F.valueOf()(x)
      );//M(4)
    });
    it('follows associativity law', () => {
      equals(
        F.concat(G).concat(H).valueOf()(x),
        F.concat(G.concat(H)).valueOf()(x)
      );//M(-1)
    });
  });
};
describe(`A Monad is just a Monoid in the category of Endofunctors, what's the problem?`, () => {
  test('Identity', Identity);
  test('Maybe', Maybe);
  test('Either', Either);
});