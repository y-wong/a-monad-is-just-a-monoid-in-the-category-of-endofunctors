module.exports = M => {
    const Wrapper = (x) => {
        const m = M(x);
        return {
            ...m,
            ...Object.fromEntries(Object.entries(m).map(([k, v]) => ['fantasy-land/' + k, v])),
            constructor: Wrapper
        }
    };
    Wrapper['fantasy-land/of'] = Wrapper;
    return Wrapper;
};