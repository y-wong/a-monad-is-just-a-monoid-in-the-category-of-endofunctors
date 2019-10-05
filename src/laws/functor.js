const { id, compose, mEquals } = require('../utils');

module.exports = (M) => {
    const x = 1;
    const f = x => x + 1;
    const g = x => x * 2;

    describe('Functor laws', () => {
        it('follows identity law', () => {
            const m = M(x);
            mEquals(m.map(id), m);
        });
        it('follows composition law', () => {
            const m = M(x);
            mEquals(m.map(f).map(g), m.map(compose(g, f)));
        });
    });
}