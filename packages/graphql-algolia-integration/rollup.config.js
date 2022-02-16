import { config } from '@last-rev/rollup-config';

export default config({
  input: [`./src/index.ts`, './src/algoliaUpdater.ts'],
  babelHelpers: 'runtime'
});
