const { id, mEquals } = require('../utils');

module.exports = (M) => {
    const x = 1;
    const f = x => x + 1;
    const g = x => x * 2;
    const v = M(x);
    const u = M(f);
    describe('Applicative laws', () => {
        it('follows identity law', () => {
            mEquals(v.ap(M(id)), v);
        });
        it('follows homomorphism law', () => {
            mEquals(M(x).ap(M(f)), M(f(x)))
        });
        it('follows interchange law', () => {
            mEquals(M(x).ap(u), u.ap(M(f => f(x))))
        });
    });
}