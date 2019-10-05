const { Either, Left, Right } = require('../src/either');
const functorLaws = require('./laws/functor');
const chainLaws = require('./laws/chain');
const monadLaws = require('./laws/monad');
const applyLaws = require('./laws/apply');
const applicativeLaws = require('./laws/applicative');
const { liftA2 } = require('../src/utils');
const equals = require('./laws/equals');
describe('Either', () => {
  const x = 1;
  f = x => x + 1;
  const mDoh = Left('doh');
  const mNo = Left('no');

  functorLaws(Either);
  chainLaws(Either);
  monadLaws(Either);
  applyLaws(Either);
  applicativeLaws(Either);

  it('turns left and never come back', () => {
    equals(
      Either(x)
        .chain(x => mDoh)
        .map(f),
      mDoh
    );
  });

  it('works with liftA2', () => {
    const add = (x, y) => x + y;
    const mAdd = liftA2(add);
    equals(mAdd(Right(1), Right(2)), Right(3));
    equals(mAdd(Right(1), mDoh), mDoh);
    equals(mAdd(mNo, mDoh), mDoh);
    equals(mAdd(mDoh, Right(2)), mDoh);
  });

  describe('Left', () => {
    const mf = x => Either(x + 1);
    it('should not map', () => {
      equals(mDoh.map(f), mDoh);
    });
    it('should not chain', () => {
      equals(mDoh.chain(mf), mDoh);
    });
    it('should not ap', () => {
      equals(mDoh.ap(Either(f)), mDoh);
    });
    //Left doesn't satisfy monad and applicative laws
    functorLaws(Left);
    applyLaws(Left);
    chainLaws(Left);
  });
});
