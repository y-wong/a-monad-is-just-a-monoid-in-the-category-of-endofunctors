
const { composeK } = require('../utils');
const { expect } = require('chai');
const MonadToMonoid = M => {
    const Monoid = F => ({
        concat: MG => Monoid(composeK(MG.valueOf(), F)),
        valueOf: () => F,
        toString: () => 'Monoind(' + String(F) + ')',
    });
    Monoid.empty = Monoid(M);
    return Monoid;
};

module.exports = M => {
    const Monoid = MonadToMonoid(M);
    const F = Monoid(x => M(x * 2));
    const G = Monoid(x => M(-x));
    const H = Monoid(x => M(x / 4));

    describe("A Monad is just a Monoid in the category of Endofunctors, what's the problem?", () => {
        it('follows associativity law', () => {
            expect(F.concat(G).concat(H)
                .valueOf()(1)
                .valueOf()
            ).to.equal(-0.5);

            expect(F.concat(G.concat(H)).valueOf()(1)
                .valueOf()
            ).to.equal(-0.5);
        });

        it('follows identity laws', () => {
            expect(
                F.concat(Monoid.empty)
                    .valueOf()(1).valueOf()
            ).to.equal(2);

            expect(
                Monoid.empty.concat(F)
                    .valueOf()(1)
                    .valueOf()).to.equal(2);
        });
    });
}