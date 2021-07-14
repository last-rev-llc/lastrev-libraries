import { config } from '@last-rev/rollup-config';

export default config({
  input: [
    './src/index.ts',
    './src/commands/cms-sync/cms-sync.ts',
    './src/commands/create-app/create-app.ts',
    './src/commands/gql-serve/gql-serve.ts',
    './src/commands/s3-sync/s3-sync.ts'
  ],
  babelHelpers: 'runtime'
});
