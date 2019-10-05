const { mEquals } = require('../utils');

module.exports = (M) => {
    const x = 0;
    const F = x => M(x + 1);

    describe('Monad laws', () => {
        it('follows left identity law', () => {
            mEquals(M(x).chain(F), F(x));
        });
        it('follows right identity law', () => {
            const m = M(x)
            mEquals(m.chain(M), m);
        });
    });
}