/* eslint-disable camelcase */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
const { clientDelivery, environmentManagement } = require('./contentful-init');
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

const createAssetWithId = async ({ entryId, assetEntry, url }, index) => {
  let asset;
  const environment = await environmentManagement;
  if (!environment) {
    console.log('environment not found');
    return [];
  }
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

const createAsset = async (asset, index, checkExisting) => {
  let assetObject;
  const { assetEntry, entryId, publish, url } = asset;
  let existingAsset;

  if (checkExisting) {
    existingAsset = await checkForExistingItem(entryId, async () => clientDelivery.getAsset(entryId));
  }

  if (!existingAsset) {
    if (assetEntry.fields.file['en-US'].upload) {
      const createdAsset = await createAssetWithId(asset, index + 1);

      assetObject = await processAndPublishAsset(createdAsset, asset, index);
    }
  } else {
    console.log(`existing asset #${index + 1} => ${entryId} for ${url}`);
    assetObject = { asset: existingAsset, entryId, publish };
  }
  return assetObject;
};

const createAssets = async (assets, checkExisting = true) => {
  const createdAssets = [];
  let videoCount = 0;

  for (let index = 0; index < assets.length; index++) {
    const asset = assets[index];
    const createdAsset = await createAsset(asset, index, checkExisting);
    createdAssets.push(createdAsset);
    const { entryId, videoStillImage } = asset;
    if (videoStillImage) {
      videoCount += 1;
      console.log(`creating video still #${videoCount} image for ${entryId}`);
      const createVideoStillAsset = await createAsset(videoStillImage, index, checkExisting);
      createdAssets.push(createVideoStillAsset);
    }
  }
  return createdAssets;
};

const updateEntry = async (entry) => {
  let updatedEntry;
  try {
    console.log(`updating entry => ${entry.sys.id}`);
    updatedEntry = await entry.update();
  } catch (error) {
    console.log(`error updating entry => ${entry.sys.id} => `, error);
  }
  return updatedEntry;
};

const updateEntries = async (entries) => {
  const updatedEntries = [];
  for (let index = 0; index < entries.length; index += 1) {
    const entry = entries[index];
    const updatedEntry = await updateEntry(entry);
    if (updatedEntry) {
      updatedEntries.push(updatedEntry);
    }
  }
  return updatedEntries;
};

const createEntryWithId = async (entryId, entryObject, contentType) => {
  let entry;
  const environment = await environmentManagement;
  if (!environment) {
    console.log('environment not found');
    return [];
  }
  try {
    console.log(`creating entry => ${entryId}`);
    entry = await environment.createEntryWithId(contentType, entryId, entryObject);
  } catch (error) {
    console.log(`error creating entry => ${entryId} => for ${entryObject?.fields?.slug?.['en-US']}`, error);
  }
  return entry;
};

const createEntries = async (entries, checkExisting = true) => {
  const createdEntries = [];

  for (let index = 0; index < entries.length; index++) {
    const currentEntry = entries[index];
    const { entry, entryId, publish, contentType } = currentEntry;
    let existingAsset;

    if (checkExisting) {
      existingAsset = await checkForExistingItem(entryId, async () => clientDelivery.getEntry(entryId));
    }

    if (!existingAsset) {
      const createdEntry = await createEntryWithId(entryId, entry, contentType);

      if (createdEntry) {
        console.log(`created entry #${index + 1} => ${entryId}`);

        if (publish) {
          await publishItem(createdEntry, entryId);
        }
        createdEntries.push({ entryId, asset: createdEntry });
      }
    } else {
      console.log(`existing entry #${index + 1} => ${entryId}`);
      createdEntries.push({ asset: existingAsset, entryId });
    }
  }
  return createdEntries;
};

const getAllEntries = async (api, query, callback) => {
  return importParser(async () => api.getEntries(query), callback);
};

const getAllAssets = async (api, query, callback) => {
  return importParser(async () => api.getAssets(query), callback);
};

const query = (options) => ({ ...options });

const getAllItems = async (api, result, queryOptions, getAllFunction = getAllEntries) => {
  const { limit } = queryOptions;
  const allItems = [];
  console.log('total items found => ', result.total);
  for (let skip = 0; skip < result.total; skip += limit) {
    console.log(`processed items ${skip} to ${skip + limit}`);
    const items = await getAllFunction(api, query({ ...queryOptions, skip }));
    allItems.push(items?.items || []);
  }
  return allItems.flat();
};

module.exports = {
  publishItem,
  deleteItem,
  checkForExistingItem,
  getAllAssets,
  getAllEntries,
  getAllItems,
  query,
  createAssets,
  createEntries,
  updateEntries
};
