const equals = require('../equals');

module.exports = M => {
  const x = 0;
  const f = x => M(x + 1);

  describe('Monad laws', () => {
    it('follows left identity law', () => {
      equals(M(x).chain(f), f(x));
    });
    it('follows right identity law', () => {
      const m = M(x);
      equals(m.chain(M), m);
    });
  });
};
