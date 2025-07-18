import program from 'commander';
import { resolve } from 'path';

program
  .command('gql-serve', 'Run the LastRev GraphQL Server', {
    executableFile: resolve(__dirname, './commands/gql-serve/gql-serve.js')
  })
  .command('cms-sync', 'Sync content files from a CMS to the file system', {
    executableFile: resolve(__dirname, './commands/cms-sync/cms-sync.js')
  })
  .command('create-app', 'Create an app from one of our examples', {
    executableFile: resolve(__dirname, './commands/create-app/create-app.js')
  })
  .command('gen-fragments', 'Generates the graphql fragments and page query from existing content JSON files', {
    executableFile: resolve(__dirname, './commands/gen-fragments/gen-fragments.js')
  })
  .command('develop', 'Allows one to actively develop lastrev-libraries in conjunction with a client monorepo', {
    executableFile: resolve(__dirname, './commands/develop/develop.js')
  })
  .command('framework-update', 'Updates repo to a specified version of the framework', {
    executableFile: resolve(__dirname, './commands/framework-update/framework-update.js')
  })
  .command('reports', 'Runs reports', {
    executableFile: resolve(__dirname, './commands/reports/reports.js')
  })
  .command('sanity-import', 'Import Contentful content types into a Sanity project', {
    executableFile: resolve(__dirname, './commands/sanity-import/sanity-import.js')
  })
  .parse(process.argv);
