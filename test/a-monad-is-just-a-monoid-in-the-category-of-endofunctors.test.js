const { expect } = require('chai');
const MonadToMonoid = require('../src/monad-to-monoid');
const { Identity } = require('../src/identity');
const { Maybe } = require('../src/maybe');
const { Either } = require('../src/either');

const test = M => {
  const Monoid = MonadToMonoid(M);
  const F = Monoid(x => M(x * 2));
  const G = Monoid(x => M(-x));
  const H = Monoid(x => M(x / 4));

  describe("A Monad is just a Monoid in the category of Endofunctors, what's the problem?", () => {
    it('follows identity laws', () => {
      expect(
        F.concat(Monoid.empty)
          .valueOf()(1)
          .valueOf()
      ).to.equal(2);
      expect(
        Monoid.empty
          .concat(F)
          .valueOf()(1)
          .valueOf()
      ).to.equal(2);
    });
    it('follows associativity law', () => {
      expect(
        F.concat(G)
          .concat(H)
          .valueOf()(1)
          .valueOf()
      ).to.equal(-0.5);
      expect(
        F.concat(G.concat(H))
          .valueOf()(1)
          .valueOf()
      ).to.equal(-0.5);
    });
  });
};

test(Identity);
test(Maybe);
test(Either);
