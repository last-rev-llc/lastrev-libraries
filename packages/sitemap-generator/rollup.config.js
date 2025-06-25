const { config } = require('@last-rev/rollup-config');
const copy = require('rollup-plugin-copy');

module.exports = config({
  input: './src/index.ts',
  babelHelpers: 'runtime',
  plugins: [
    copy({
      targets: [{ src: 'src/*.hbs', dest: 'dist' }]
    })
  ]
});
