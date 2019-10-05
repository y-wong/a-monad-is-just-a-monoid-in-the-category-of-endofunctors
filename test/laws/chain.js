const equals = require('./equals');

module.exports = M => {
  const x = 1;
  const f = x => M(x + 1);
  const g = x => M(x * 2);

  describe('Chain laws', () => {
    it('follows associativity law', () => {
      const m = M(x);
      equals(m.chain(f).chain(g), m.chain(x => f(x).chain(g)));
    });
  });
};
