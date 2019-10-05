const equals = require('./equals');

module.exports = M => {
  const x = 0;
  const F = x => M(x + 1);

  describe('Monad laws', () => {
    it('follows left identity law', () => {
      equals(M(x).chain(F), F(x));
    });
    it('follows right identity law', () => {
      const m = M(x);
      equals(m.chain(M), m);
    });
  });
};
