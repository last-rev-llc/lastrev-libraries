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
  .command('cms-sync-s3', 'Sync content files from S3 to the file system', {
    executableFile: resolve(__dirname, '../dist/cms-sync-s3.js')
  })
  .parse(process.argv);
