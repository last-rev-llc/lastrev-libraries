const { config } = require('@last-rev/rollup-config');

module.exports = config({
  input: './src/index.ts',
  babelHelpers: 'runtime'
});
