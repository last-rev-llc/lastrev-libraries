import program from 'commander';
import { resolve } from 'path';

program
  .command('serve', 'Run the LastRev GraphQL Server', {
    executableFile: resolve(__dirname, '../dist/commands/serve.js')
  })
  .command('gen', 'Generate initial GraphQL type definitions from your CMS', {
    executableFile: resolve(__dirname, '../dist/commands/gen.js')
  })
  .parse(process.argv);
