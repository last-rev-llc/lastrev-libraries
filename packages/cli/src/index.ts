import program from 'commander';
import { resolve } from 'path';

program
  .command('gql-serve', 'Run the LastRev GraphQL Server', {
    executableFile: resolve(__dirname, '../dist/gql-serve.js')
  })
  .command('cms-sync', 'Sync from a CMS to the file system', {
    executableFile: resolve(__dirname, '../dist/cms-sync.js')
  })
  .command('create-app', 'Create an app from one of our examples', {
    executableFile: resolve(__dirname, '../dist/create-app.js')
  })
  .command('s3-sync', 'Sync conent files from a S3 to the file system', {
    executableFile: resolve(__dirname, '../dist/s3-sync.js')
  })
  .parse(process.argv);
