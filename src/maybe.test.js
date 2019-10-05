const R = require('ramda');
const { Maybe, Just, Nothing } = require('./maybe');
const functorLaws = require('./laws/functor');
const chainLaws = require('./laws/chain');
const monadLaws = require('./laws/monad');
const applyLaws = require('./laws/apply');
const applicativeLaws = require('./laws/applicative');
const { id, compose, mEquals, liftA2 } = require('./utils');

describe('Maybe', () => {
    const x = 1;
    f = x => x + 1;

    functorLaws(Maybe);
    chainLaws(Maybe);
    monadLaws(Maybe);
    applyLaws(Maybe);
    applicativeLaws(Maybe);

    it('turns Nothing if x is undefined', ()=>{
        
    })

    it('works with R.lift', () => {
        const add = (x, y) => x + y
        const mAdd = R.lift(add);
        mEquals(mAdd(Maybe(1), Maybe(2)), Maybe(3));
        // mEquals(mAdd(Maybe(1), mDoh), mDoh);
        // mEquals(mAdd(mNo, mDoh), mDoh);
        // mEquals(mAdd(mDoh, Maybe(2)), mDoh);
    });

    it('works with liftA2 - see utils.js', () => {
        const add = (x, y) => x + y
        const mAdd = liftA2(add);
        mEquals(mAdd(Maybe(1), Maybe(2)), Maybe(3));
        // mEquals(mAdd(Maybe(1), mDoh), mDoh);
        // mEquals(mAdd(mNo, mDoh), mDoh);
        // mEquals(mAdd(mDoh, Maybe(2)), mDoh);
    });

    // describe('Left', () => {
    //     const mf = x => Maybe(x + 1);
    //     it('should not map', () => {
    //         mEquals(mDoh.map(f), mDoh);
    //     });
    //     it('should not chain', () => {
    //         mEquals(mDoh.chain(mf), mDoh);
    //     });
    //     it('should not ap', () => {
    //         mEquals(mDoh.ap(Maybe(f)), mDoh);
    //     });
    //     //Left doesn't satisfy monad and applicative laws
    //     functorLaws(Left);
    //     applyLaws(Left);
    //     chainLaws(Left);
    // });
});

