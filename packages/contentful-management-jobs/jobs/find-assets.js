/* eslint-disable camelcase */
/* eslint-disable no-console */
const { environmentManagement, clientDelivery } = require('../shared/contentful-init');
const { getAllAssets, getAllItems } = require('../shared/contentful-actions');
const { content_type, queryOptions, log, itemFilter } = require('../shared/fixtures/bulkActionConfig');

(async () => {
  const environment = await environmentManagement;
  // const environment = clientDelivery;

  // Step 1 - Get All Assets
  const assets = await getAllAssets(environment, { content_type, limit: 1 }, (items) =>
    getAllItems(environment, items, queryOptions, getAllAssets)
  );

  if (assets.length) {
    console.log(`number of ${content_type} assets => `, assets.length);
    log(assets.filter(itemFilter));
  } else {
    console.log('No assets found');
  }
})();
