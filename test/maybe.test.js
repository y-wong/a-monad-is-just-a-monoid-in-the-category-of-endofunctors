const { Maybe, Just, Nothing } = require('../src/maybe');
const functorLaws = require('./laws/functor');
const chainLaws = require('./laws/chain');
const monadLaws = require('./laws/monad');
const applyLaws = require('./laws/apply');
const applicativeLaws = require('./laws/applicative');
const { liftA2 } = require('../src/utils');
const equals = require('./laws/equals');

describe('Maybe', () => {
  functorLaws(Maybe);
  chainLaws(Maybe);
  monadLaws(Maybe);
  applyLaws(Maybe);
  applicativeLaws(Maybe);

  it('works with liftA2', () => {
    const add = (x, y) => x + y;
    const mAdd = liftA2(add);
    equals(mAdd(Maybe(1), Maybe(2)), Maybe(3));
    equals(mAdd(Maybe(1), Nothing), Nothing);
    equals(mAdd(Nothing, Maybe(1)), Nothing);
  });

  describe('Nothing', () => {
    const f = x => x + 1;
    it('gets nothing if data is null', () => {
      equals(Maybe(null), Nothing);
    });
    it('should not map', () => {
      equals(Nothing.map(f), Nothing);
    });
    it('should not chain', () => {
      equals(Nothing.chain(f), Nothing);
    });
    it('should not ap', () => {
      equals(Nothing.ap(f), Nothing);
    });
  });
});
