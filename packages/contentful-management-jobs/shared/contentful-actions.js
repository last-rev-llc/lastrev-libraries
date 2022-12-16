/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
const { importParser } = require('./input-parsers');
const { isVideo, getAssetDetails } = require('./contentful-fields');

const publishItem = async (item, entryId) => {
  let publishedAsset;
  try {
    console.log(`publishing item => ${entryId}`);
    publishedAsset = await item.publish();
  } catch (error) {
    console.log(`error publishing item => ${entryId} => `, error);
  }
  return publishedAsset;
};

const deleteItem = async (item, entryId) => {
  let deletedItem;
  try {
    console.log(`deleting item => ${entryId}`);
    deletedItem = await item.delete();
  } catch (error) {
    console.log(`error deleting item => ${entryId} => `, error);
  }
  return deletedItem;
};

const checkForExistingItem = async (entryId, getItem) => {
  let item;
  try {
    console.log(`checking if item exists => ${entryId}`);
    item = await getItem();
  } catch (error) {
    if (error?.name !== 'NotFound' && error?.sys?.id !== 'NotFound') {
      console.log(`error checking for existing item => ${entryId} => `, JSON.stringify(error, null, 2));
    }
  }
  return item;
};

const createAssetWithId = async (environment, { entryId, assetEntry, url }, index) => {
  let asset;
  try {
    console.log(`creating asset #${index} => ${entryId} for ${url}`);
    asset = await environment.createAssetWithId(entryId, assetEntry);
  } catch (error) {
    console.log(`error creating asset => ${entryId} for ${url} => `, error);
  }
  return asset;
};

const processAsset = async (asset, { entryId, url, linkingId }) => {
  let processedAsset;
  try {
    console.log(`processing asset => ${entryId} for ${url}`);
    processedAsset = await asset.processForAllLocales(
      isVideo(url) ? { processingCheckWait: 5000, processingCheckRetries: 10 } : {}
    );
  } catch (error) {
    console.log(`error processing asset => ${entryId} for ${url} => ${linkingId}`, error);
    await deleteItem(asset, entryId);
  }
  return processedAsset;
};

const processAndPublishAsset = async (createdAsset, { entryId, url, linkingId, publish }, index) => {
  let assetObject;
  if (createdAsset) {
    console.log(`created assetId #${index + 1} => ${entryId} for ${url}`);
    const processedAsset = await processAsset(createdAsset, getAssetDetails(entryId, url, linkingId));

    if (processedAsset) {
      if (publish) {
        await publishItem(processedAsset, entryId);
      }
      assetObject = { entryId, asset: processedAsset, publish };
    }
  }
  return assetObject;
};

const createAsset = async (environment, asset, index, clientDelivery) => {
  let assetObject;
  const { assetEntry, entryId, publish, url } = asset;

  const existingAsset = await checkForExistingItem(entryId, async () => clientDelivery.getAsset(entryId));

  if (!existingAsset) {
    if (assetEntry.fields.file['en-US'].upload) {
      const createdAsset = await createAssetWithId(environment, asset, index + 1);

      assetObject = await processAndPublishAsset(createdAsset, asset, index);
    }
  } else {
    console.log(`existing asset #${index + 1} => ${entryId} for ${url}`);
    assetObject = { asset: existingAsset, entryId, publish };
  }
  return assetObject;
};

const createAssets = async (assets, environmentManagement, clientDelivery) => {
  const createdAssets = [];
  const environment = await environmentManagement;
  if (!environment) {
    console.log('environment not found');
    return [];
  }
  let videoCount = 0;

  for (let index = 0; index < assets.length; index++) {
    const asset = assets[index];
    const createdAsset = await createAsset(environment, asset, index, clientDelivery);
    createdAssets.push(createdAsset);
    const { entryId, videoStillImage } = asset;
    if (videoStillImage) {
      videoCount += 1;
      console.log(`creating video still #${videoCount} image for ${entryId}`);
      const createVideoStillAsset = await createAsset(environment, videoStillImage, index, clientDelivery);
      createdAssets.push(createVideoStillAsset);
    }
  }
  return createdAssets;
};

const getAllEntries = async (api, query, callback) => {
  return importParser(async () => api.getEntries(query), callback);
};

module.exports = {
  publishItem,
  deleteItem,
  checkForExistingItem,
  getAllEntries,
  createAssets
};
