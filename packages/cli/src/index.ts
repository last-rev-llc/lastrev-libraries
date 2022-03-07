import program from 'commander';
import { resolve } from 'path';

program
  .command('gql-serve', 'Run the LastRev GraphQL Server', {
    executableFile: resolve(__dirname, '../dist/gql-serve.js')
  })
  .command('cms-sync', 'Sync content files from a CMS to the file system', {
    executableFile: resolve(__dirname, '../dist/cms-sync.js')
  })
  .command('create-app', 'Create an app from one of our examples', {
    executableFile: resolve(__dirname, '../dist/create-app.js')
  })
  .command('gen-fragments', 'Generates the graphql fragments and page query from existing content JSON files', {
    executableFile: resolve(__dirname, '../dist/gen-fragments.js')
  })
  .command('develop', 'Allows one to actively develop lastrev-libraries in conjunction with a client monorepo', {
    executableFile: resolve(__dirname, '../dist/develop.js')
  })
  .parse(process.argv);
