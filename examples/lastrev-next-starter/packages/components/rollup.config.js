import { config } from '@last-rev/rollup-config';

export default config({
  input: [`./src/index.tsx`],
  output: [
    {
      dir: 'dist',
      format: 'cjs',
      sourcemap: true
    }
  ],
  babelHelpers: 'runtime',
  preserveModules: true,
  preserveModulesRoot: 'src'
});
