const { Either, Left, Right } = require('../src/either');
const functorLaws = require('./laws/functor');
const chainLaws = require('./laws/chain');
const monadLaws = require('./laws/monad');
const applyLaws = require('./laws/apply');
const applicativeLaws = require('./laws/applicative');
const { liftA2 } = require('../src/utils');
const equals = require('./equals');
describe('Either', () => {
  const f = x => x + 1;
  const doh = Left('doh');

  functorLaws(Either);
  chainLaws(Either);
  monadLaws(Either);
  applyLaws(Either);
  applicativeLaws(Either);

  it('turns left and never come back', () => {
    equals(
      Either(1).chain(x => doh).map(f),
      doh
    );
  });

  it('works with liftA2', () => {
    const add = (x, y) => x + y;
    const mAdd = liftA2(add);
    equals(
      mAdd(Right(1), Right(2)),
      Right(3)
    );
    equals(
      mAdd(Right(1), doh),
      doh
    );
    equals(
      mAdd(doh, Right(2)),
      doh
    );
  });

  describe('Left', () => {
    const g = x => Either(x + 1);
    it('should not map', () => {
      equals(doh.map(f), doh);
    });
    it('should not chain', () => {
      equals(doh.chain(g), doh);
    });
    it('should not ap', () => {
      equals(doh.ap(Either(f)), doh);
    });
    //Left doesn't satisfy monad and applicative laws
    functorLaws(Left);
    applyLaws(Left);
    chainLaws(Left);
  });
});
