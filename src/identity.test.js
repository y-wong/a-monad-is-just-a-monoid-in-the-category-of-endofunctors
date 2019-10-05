const R = require('ramda');
const Identity = require('./identity');
const functorLaws = require('./laws/functor');
const chainLaws = require('./laws/chain');
const monadLaws = require('./laws/monad');
const applyLaws = require('./laws/apply');
const applicativeLaws = require('./laws/applicative');
const aMonadIsJustAMonoidInTheCategoryOfEndofunctors = require('./laws/a-monad-is-just-a-monoid-in-the-category-of-endofunctors');
const { id, compose, mEquals, liftA2 } = require('./utils');

describe('Identity', () => {
    functorLaws(Identity);
    chainLaws(Identity);
    monadLaws(Identity);
    applyLaws(Identity);
    applicativeLaws(Identity);
    it('works with R.lift', () => {
        const add = (x, y) => x + y
        const mAdd = R.lift(add);
        mEquals(mAdd(Identity(1), Identity(2)), Identity(3));
    });
    it('works with liftA2 - see utils.js', () => {
        const add = (x, y) => x + y
        const mAdd = liftA2(add);
        mEquals(mAdd(Identity(1), Identity(2)), Identity(3));
    });
    aMonadIsJustAMonoidInTheCategoryOfEndofunctors(Identity);
});
