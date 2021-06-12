import program from 'commander';
import { resolve } from 'path';

program
  .command('gql-serve', 'Run the LastRev GraphQL Server', {
    executableFile: resolve(__dirname, '../dist/commands/gql-serve/gql-serve.js')
  })
  .parse(process.argv);
