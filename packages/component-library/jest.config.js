const { config } = require('@last-rev/testing-library');
module.exports = config({
  // TODO: Enabling coverage fails tests
  // https://github.com/facebook/jest/issues/12925
  collectCoverage: false
});
