import { config } from '@last-rev/rollup-config';

export default config({
  input: `./src/index.ts`,
  babelHelpers: 'runtime',
  preserveModules: true
});
