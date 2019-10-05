const id = x => x;
const chain = F => x => x.chain(F);
const compose = (g, f) => x => g(f(x));
const composeK = (G, F) =>
  compose(
    chain(G),
    F
  );
const liftA2 = f => (ma, mb) => mb.ap(ma.map(x => y => f(x, y)));
module.exports = {
  id,
  compose,
  composeK,
  liftA2,
  chain
};
