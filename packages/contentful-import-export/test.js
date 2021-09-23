const copyEnvironment = require('./dist');

const exportParams = {
  managementToken: 'Zism4gXRe4n8lRVbm5reZ6Z21_0SZUrXSskxXpipl6k',
  spaceId: 'ps6p1czqtrxo',
  environmentId: 'master'
};

const importParams = {
  managementToken: 'Zism4gXRe4n8lRVbm5reZ6Z21_0SZUrXSskxXpipl6k',
  // managementToken: 'sadfasdfasdfasdf',
  spaceId: 'ps6p1czqtrxo',
  environmentId: 'test-import-export'
};

copyEnvironment({
  exportParams,
  importParams,
  skipEntries: false,
  skipAssets: true
}).catch((e) => {
  console.error(e);
  process.exit(1);
});
