const R = require('ramda');
const { Either, Left, Right } = require('./either');
const functorLaws = require('./laws/functor');
const chainLaws = require('./laws/chain');
const monadLaws = require('./laws/monad');
const applyLaws = require('./laws/apply');
const applicativeLaws = require('./laws/applicative');
const { liftA2 } = require('./utils');
const aMonadIsJustAMonoidInTheCategoryOfEndofunctors = require('./laws/a-monad-is-just-a-monoid-in-the-category-of-endofunctors');

describe('Either', () => {
    const f = x => x + 1;
    const mDoh = Left('doh');
    const mNo = Left('no');

    functorLaws(Either);
    chainLaws(Either);
    monadLaws(Either);
    applyLaws(Either);
    applicativeLaws(Either);

    it('turns left and never come back', () => {
        mEquals(Either(x).chain(x => mDoh).map(f), mDoh);
    });

    it('works with R.lift', () => {
        const add = (x, y) => x + y
        const mAdd = R.lift(add);
        mEquals(mAdd(Either(1), Either(2)), Either(3));
        mEquals(mAdd(Either(1), mDoh), mDoh);
        mEquals(mAdd(mNo, mDoh), mDoh);
        mEquals(mAdd(mDoh, Either(2)), mDoh);
    });

    it('works with liftA2 - see utils.js', () => {
        const add = (x, y) => x + y
        const mAdd = liftA2(add);
        mEquals(mAdd(Either(1), Either(2)), Either(3));
        mEquals(mAdd(Either(1), mDoh), mDoh);
        mEquals(mAdd(mNo, mDoh), mDoh);
        mEquals(mAdd(mDoh, Either(2)), mDoh);
    });

    describe('Left', () => {
        const mf = x => Either(x + 1);
        it('should not map', () => {
            mEquals(mDoh.map(f), mDoh);
        });
        it('should not chain', () => {
            mEquals(mDoh.chain(mf), mDoh);
        });
        it('should not ap', () => {
            mEquals(mDoh.ap(Either(f)), mDoh);
        });
        //Left doesn't satisfy monad and applicative laws
        functorLaws(Left);
        applyLaws(Left);
        chainLaws(Left);
    });

    aMonadIsJustAMonoidInTheCategoryOfEndofunctors(Either);
});

