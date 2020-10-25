const { expect } = require('chai');
const curry = (f, arity = f.length, ...args) => arity <= args.length ? f(...args) : (...a) => curry(f, arity, ...args, ...a);
const id = x => x;
const compose = curry((g, f) => x => g(f(x)));

describe(`A Monad is just a Monoid in the category of Endofunctors, what's the problem?`, () => {
  describe('Array', () => {
    const map = curry((f, xs) => xs.map(f));
    const chain = curry((f, xs) => xs.flatMap(f));
    const unit = x => Array.of(x);

    describe('is a functor', () => {
      it('follows identity law', () => {
        const m = unit(3);
        expect(
          map(id, m)
        ).deep.equal(m);
      });
      it('follows composition law', () => {
        const m = unit(3);
        const f = x => x + 10;
        const g = x => x * 3;
        expect(
          compose(map(g), map(f))(m)
        ).to.deep.equal(
          map(compose(g, f))(m)
        );
      });
    });
    describe('is a monad', () => {
      it('follows left identity law', () => {
        const x = 3;
        const f = x => unit(x + 10);

        expect(
          chain(f, unit(x))
        ).to.deep.equal(
          f(x)
        );
      });
      it('follows right identity law', () => {
        const m = unit(3);
        expect(
          chain(unit, m)
        ).to.deep.equal(
          m
        );
      });
      it('follows associativity law', () => {
        const m = unit(3);
        const f = x => unit(x + 10);
        const g = x => unit(x * 3);
        expect(
          compose(chain(g), chain(f))(m)
        ).to.deep.equal(
          chain(x => chain(g, f(x)))(m)
        );
      });
    });
    describe('is a monoid in the category of endofunctors', () => {
      const concat = (g, f) =>
        compose(
          chain(g),
          f
        );
      it('follows left identity law', () => {
        const x = 3;
        const f = x => unit(x + 10);
        expect(
          concat(unit, f)(x)
        ).to.deep.equal(
          f(x)
        );
      });
      it('follows right identity law', () => {
        const x = 3;
        const f = x => unit(x + 10);
        expect(
          concat(f, unit)(x)
        ).to.deep.equal(
          f(x)
        );
      });
      it('follows associativity law', () => {
        const x = 3;
        const f = x => unit(x + 10);
        const g = x => unit(x * 3);
        const h = x => unit(x ^ 2);
        expect(
          concat(concat(f, g), h)(x)
        ).to.deep.equal(
          concat(f, concat(g, h))(x)
        );
      });
    });
  });
});
