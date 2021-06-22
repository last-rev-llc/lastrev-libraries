import { config } from '@last-rev/rollup';

export default config({
  input: [`./src/index.js`],
  output: [
    {
      dir: 'dist',
      format: 'cjs',
      sourcemap: true
    }
  ],

  babelHelpers: 'runtime',
  preserveModules: true
});
