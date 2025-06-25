const { config } = require('@last-rev/rollup-config');

module.exports = config({
  input: [
    './src/index.ts',
    './src/commands/cms-sync/cms-sync.ts',
    './src/commands/create-app/create-app.ts',
    './src/commands/gql-serve/gql-serve.ts',
    './src/commands/gen-fragments/gen-fragments.ts',
    './src/commands/develop/develop.ts',
    './src/commands/framework-update/framework-update.ts',
    './src/commands/reports/reports.ts'
  ],
  babelHelpers: 'runtime'
});
