import { config } from '@last-rev/rollup-config';

export default config({
  input: [`./src/index.tsx`],
  babelHelpers: 'runtime',
  preserveModules: true
});
