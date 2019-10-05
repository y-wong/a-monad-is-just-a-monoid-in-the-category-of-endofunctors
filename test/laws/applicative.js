const { id } = require('../../src/utils');
const equals = require('../equals');

module.exports = M => {
  const x = 2;
  const f = x => x + 1;
  const v = M(x);
  const u = M(f);
  
  describe('Applicative laws', () => {
    it('follows identity law', () => {
      equals(
        v.ap(M(id)),
        v);
    });
    it('follows homomorphism law', () => {
      equals(
        M(x).ap(M(f)),
        M(f(x))
      );
    });
    it('follows interchange law', () => {
      equals(
        M(x).ap(u),
        u.ap(M(f => f(x)))
      );
    });
  });
};
