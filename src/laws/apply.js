const { mEquals } = require('../utils');

module.exports = (M) => {
    const x = 1;
    const f = x => x + 1;
    const g = x => x * 2;
    const v = M(x);
    const u = M(f);
    const a = M(g);
    describe('Apply laws', () => {
        it('follows composition law', () => {
            mEquals(v.ap(u.ap(a.map(f => g => x => f(g(x))))), v.ap(u).ap(a))
        });
    });
}