const path = require('path');

const getCacheDirs = (constants) => [path.normalize(`${constants.PUBLISH_DIR}/../../../node_modules/.cache`)];

module.exports = {
  async onPreBuild({ constants, utils }) {
    const cacheDirs = getCacheDirs(constants);
    console.log(`Looking for cache dirs: ${cacheDirs.join(', ')}`);
    if (await utils.cache.restore(cacheDirs)) {
      console.log('🚀 Found cache! 🚀');
    } else {
      console.log('cache found. Building fresh.');
    }
  },
  async onPostBuild({ constants, utils }) {
    const cacheDirs = getCacheDirs(constants);
    console.log('🚀 Caching... 🚀');
    console.log(`Looking for cache dirs: ${cacheDirs.join(', ')}`);
    if (await utils.cache.save(cacheDirs)) {
      console.log('Stored cache to speed up future builds.');
    } else {
      console.log('files found.');
    }
  }
};
