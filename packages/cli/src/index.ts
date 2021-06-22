import program from 'commander';
import { resolve } from 'path';

program
  .command('gql-serve', 'Run the LastRev GraphQL Server', {
    executableFile: resolve(__dirname, '../dist/commands/gql-serve/gql-serve.js')
  })
  .command('cms-sync', 'Sync from a CMS to the file system', {
    executableFile: resolve(__dirname, '../dist/commands/cms-sync/cms-sync.js')
  })
  .parse(process.argv);
