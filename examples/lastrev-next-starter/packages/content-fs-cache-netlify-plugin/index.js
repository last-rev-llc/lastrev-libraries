const path = require('path');

const getCacheDirs = (constants) => [
  constants.PUBLISH_DIR,
  path.normalize(`${constants.PUBLISH_DIR}/../../packages/graphql-runner/cms-sync`)
];

module.exports = {
  async onPreBuild({ constants, utils }) {
    const cacheDirs = getCacheDirs(constants);

    if (await utils.cache.restore(cacheDirs)) {
      console.log('🚀 Found a cms-sync cache! 🚀');
    } else {
      console.log('No cms-sync cache found. Building fresh.');
    }
  },
  async onPostBuild({ constants, utils }) {
    const cacheDirs = getCacheDirs(constants);

    if (await utils.cache.save(cacheDirs)) {
      console.log('Stored the cms-sync cache to speed up future builds.');
    } else {
      console.log('No cms-sync files found.');
    }
  }
};
