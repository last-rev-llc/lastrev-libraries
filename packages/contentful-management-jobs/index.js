const program = require('commander');
const { resolve } = require('path');

program
  .command('bulk-asset-upload', 'Run the Bulk Asset Upload Script', {
    executableFile: resolve(__dirname, './jobs/bulk-asset-upload.js')
  })
  .command('yaml-contentful-import', 'Run the YAML Contentful Import Script', {
    executableFile: resolve(__dirname, './jobs/yaml-contentful-import.js')
  })
  .command('remote-asset-upload', 'remote-asset-upload', {
    executableFile: resolve(__dirname, './jobs/remote-asset-upload.js')
  })
  .command('create-entry-with-asset', 'create-entry-with-asset', {
    executableFile: resolve(__dirname, './jobs/create-entry-with-asset.js')
  })
  .command('update-linked-entries', 'update-linked-entries', {
    executableFile: resolve(__dirname, './jobs/update-linked-entries.js')
  })
  .command('find-linked-entries', 'find-linked-entries', {
    executableFile: resolve(__dirname, './jobs/find-linked-entries.js')
  })
  .command('find-entries', 'find-entries', {
    executableFile: resolve(__dirname, './jobs/find-entries.js')
  })
  .parse(process.argv);
