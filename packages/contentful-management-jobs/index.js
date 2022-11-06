const program = require('commander');
const { resolve } = require('path');

program
  .command('bulk-asset-upload', 'Run the Bulk Asset Upload Script', {
    executableFile: resolve(__dirname, './jobs/bulk-asset-upload.js')
  })
  .command('delete-not-referenced', 'Run the Delete Not Referenced Script', {
    executableFile: resolve(__dirname, './jobs/delete-not-referenced.js')
  })
  .command('yaml-contentful-import', 'Run the YAML Contentful Import Script', {
    executableFile: resolve(__dirname, './jobs/yaml-contentful-import.js')
  })
  .parse(process.argv);
