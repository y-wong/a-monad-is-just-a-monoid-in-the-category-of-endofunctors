const { assert: { deepEqual } } = require('chai');
const curry = (f, arity = f.length, ...args) => arity <= args.length ? f(...args) : (...a) => curry(f, arity, ...args, ...a);
const id = x => x;
const compose = curry((g, f) => x => g(f(x)));
const composeK = curry((g, f) => compose(chain(g), f));
const map = curry((f, xs) => xs.map(f));
const chain = curry((f, xs) => xs.flatMap(f));
const unit = x => Array.of(x);


describe(`A Monad is just a Monoid in the category of Endofunctors, what's the problem?`, () => {
  describe('Array', () => {

    describe('is a functor', () => {
      it('follows identity law', () => {
        const m = unit(3);
        deepEqual(
          map(id, m),
          m
        );
      });
      it('follows composition law', () => {
        const m = unit(3);
        const f = x => x + 10;
        const g = x => x * 3;
        deepEqual(
          compose(map(g), map(f))(m),
          map(compose(g, f))(m)
        );
      });
    });
    describe('is a monad', () => {
      it('follows left identity law', () => {
        const x = 3;
        const f = x => unit(x + 10);
        deepEqual(
          chain(f, unit(x)),
          f(x)
        );
      });
      it('follows right identity law', () => {
        const m = unit(3);
        deepEqual(
          chain(unit, m),
          m
        );
      });
      it('follows associativity law', () => {
        const m = unit(3);
        const f = x => unit(x + 10);
        const g = x => unit(x * 3);
        deepEqual(
          compose(chain(g), chain(f))(m),
          chain(x => chain(g, f(x)))(m)
        );
      });
    });
    describe('is a monoid in the category of endofunctors', () => {
      const concat = composeK;
      const empty = unit;
      it('follows left identity law', () => {
        const x = 3;
        const f = x => empty(x + 10);
        deepEqual(
          concat(empty, f)(x),
          f(x)
        );
      });
      it('follows right identity law', () => {
        const x = 3;
        const f = x => unit(x + 10);
        deepEqual(
          concat(f, empty)(x),
          f(x)
        );
      });
      it('follows associativity law', () => {
        const x = 3;
        const f = x => unit(x + 10);
        const g = x => unit(x * 3);
        const h = x => unit(x ^ 2);
        deepEqual(
          concat(concat(f, g), h)(x),
          concat(f, concat(g, h))(x)
        );
      });
    });
  });
});
