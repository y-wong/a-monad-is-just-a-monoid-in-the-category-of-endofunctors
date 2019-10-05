const { expect } = require('chai');
module.exports = (ma, mb) => expect(ma.valueOf()).to.equal(mb.valueOf(), `expect ${ma} to equal ${mb}`);
