const { id, compose } = require('../../src/utils');
const equals = require('./equals');

module.exports = M => {
  const x = 1;
  const f = x => x + 1;
  const g = x => x * 2;

  describe('Functor laws', () => {
    it('follows identity law', () => {
      const m = M(x);
      equals(m.map(id), m);
    });
    it('follows composition law', () => {
      const m = M(x);
      equals(
        m.map(f).map(g),
        m.map(
          compose(
            g,
            f
          )
        )
      );
    });
  });
};
