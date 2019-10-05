const { Identity } = require('../src/identity');
const functorLaws = require('./laws/functor');
const chainLaws = require('./laws/chain');
const monadLaws = require('./laws/monad');
const applyLaws = require('./laws/apply');
const applicativeLaws = require('./laws/applicative');
const { liftA2 } = require('../src/utils');
const equals = require('./laws/equals');

describe('Identity', () => {
  functorLaws(Identity);
  chainLaws(Identity);
  monadLaws(Identity);
  applyLaws(Identity);
  applicativeLaws(Identity);
  it('works with liftA2', () => {
    const add = (x, y) => x + y;
    const mAdd = liftA2(add);
    equals(mAdd(Identity(1), Identity(2)), Identity(3));
  });
});
