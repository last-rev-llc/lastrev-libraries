/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-await-in-loop */
const { clientDelivery, getEnvironmentManagement } = require('../shared/contentful-init');
const { importParser } = require('../shared/input-parsers');
const { getAssetType, getContentfulIdFromString } = require('../shared/contentful-fields');
const { publishItem, deleteItem, checkForExistingItem } = require('../shared/contentful-actions');
const { logItems } = require('../shared/logging');

const entryLookup = {};

const getMediaObject = (media) => {
  let mediaObject = {};
  if (media) {
    mediaObject = media.length ? media[0] : media;
  }
  return mediaObject;
};

const createAssetWithId = async (environment, entryId, assetEntry) => {
  let asset;
  try {
    console.log(`creating asset => ${entryId} for ${entryLookup[entryId].url}`);
    asset = await environment.createAssetWithId(entryId, assetEntry);
  } catch (error) {
    console.log(`error creating asset => ${entryId} for ${entryLookup[entryId].url} => `, error);
  }
  return asset;
};

const processAsset = async (asset, entryId) => {
  let processedAsset;
  try {
    console.log(`processing asset => ${entryId} for ${entryLookup[entryId].url}`);
    processedAsset = await asset.processForAllLocales({ processingCheckWait: 5000, processingCheckRetries: 10 });
  } catch (error) {
    console.log(`error processing asset => ${entryId} for ${entryLookup[entryId].url} => `, error);
    await deleteItem(asset, entryId);
  }
  return processedAsset;
};

const STEPS = {
  getEntries: true,
  filterEntries: true,
  sortEntries: true,
  transformEntriesToAssets: true,
  filterAssets: true,
  checkForDuplicates: true,
  createAssets: true
};

const getAllEntries = async () => {
  // let entries = testEntries;
  let entries = [];
  if (STEPS.getEntries) {
    // console.log('clientDelivery => ', clientDelivery);
    const query = {
      content_type: 'cloudinaryMedia',
      limit: 1000
    };
    entries = await importParser(async () => clientDelivery.getEntries(query), query);
  }
  return entries;
};

const filterEntries = (entries) => {
  if (STEPS.filterEntries) {
    // filter out entries that do not have urls
    return entries?.items.filter((entry) => {
      const mediaObject = getMediaObject(entry.fields.media);
      return mediaObject.original_secure_url || mediaObject.original_url || mediaObject.url;
    });
  }
  return entries;
};

const sortEntries = (entries) => {
  if (STEPS.sortEntries) {
    return entries.sort((a, b) => new Date(a.sys.createdAt) - new Date(b.sys.createdAt));
  }
  return entries;
};

const transformEntriesToAssets = (entries) => {
  if (STEPS.transformEntriesToAssets) {
    return entries.map((entry, index) => {
      if (index === 1) {
        console.log('entry in transform to assets => ', JSON.stringify(entry, null, 2));
      }
      const { media, internalTitle } = entry.fields;
      const publish = !!entry.sys.publishedVersion && entry.sys.version === entry.sys.publishedVersion + 1;
      const mediaObject = getMediaObject(media);
      const fileName = (mediaObject.url && mediaObject.url.split('/').pop()) || 'Missing url';
      // const fileExtension = fileName.split('.').pop();

      const isVideo = mediaObject.format === 'mp4' || mediaObject.format === 'mov';

      const url = !isVideo
        ? mediaObject.url
        : mediaObject.original_secure_url || mediaObject.original_url || mediaObject.url;

      const entryId = getContentfulIdFromString(url);
      // console.log('entryId => ', entryId, mediaObject.url);
      // console.log('fileName => ', fileName);
      // console.log('fileExtension => ', fileExtension);

      // take care of duplicate assets
      if (entryLookup[entryId]) {
        // console.log('duplicate asset => ', entry.sys.id, url, entryLookup[entryId].oldId);
        entryLookup[entryId].duplicateIds = entryLookup[entryId].duplicateIds || [];
        entryLookup[entryId].duplicateIds.push(entry.sys.id);
        return null;
      }

      entryLookup[entryId] = { oldId: entry.sys.id, newId: entryId, url };
      // console.log('entryId => ', entryId, url);

      return {
        publish,
        entryId,
        assetEntry: {
          fields: {
            title: {
              'en-US': internalTitle
            },
            file: {
              'en-US': {
                contentType: getAssetType(mediaObject.format),
                fileName,
                upload: internalTitle !== 'IF_2020_IMPOSSIBLE_SAUSAGE.jpg.jpg' ? url : `${url}.jpg`
              }
            }
          }
        }
      };
    });
  }
  return [];
};

const filterAssets = (assets) => {
  if (STEPS.filterAssets) {
    return assets.filter((asset) => asset);
  }
  return assets;
};

const findDuplicateAssets = (assets) => {
  const duplicateAssets = [];
  if (STEPS.checkForDuplicates) {
    assets.forEach((asset) => {
      const count = assets.filter((a) => a.entryId === asset.entryId).length;
      if (count > 1) {
        duplicateAssets.push({ entryId: asset.entryId, count });
      }
    });
  }
  return duplicateAssets;
};

const createAssets = async (assets) => {
  const createdAssets = [];
  if (STEPS.createAssets) {
    const environment = await getEnvironmentManagement();
    if (!environment) {
      console.log('environment not found');
      return [];
    }

    for (let index = 0; index < assets.length; index++) {
      const asset = assets[index];
      const { assetEntry, entryId, publish } = asset;
      // console.log('assetEntry => ', assetEntry);

      const existingAsset = await checkForExistingItem(entryId, async () => clientDelivery.getAsset(entryId));

      if (!existingAsset) {
        if (assetEntry.fields.file['en-US'].upload) {
          const createdAsset = await createAssetWithId(environment, entryId, assetEntry);

          if (createdAsset) {
            console.log(`created assetId => ${entryId} for ${entryLookup[entryId].url}`);
            const processedAsset = await processAsset(createdAsset, entryId);

            if (processedAsset) {
              const publishedAsset = await publishItem(processedAsset, entryId);
              if (publishedAsset) {
                createdAssets.push({ entryId, asset: processedAsset, publish });
              }
            }
          }
        }
      } else {
        console.log(`existing asset => ${entryId} for ${entryLookup[entryId].url}`);
        createdAssets.push({ asset: existingAsset, entryId, publish });
      }
    }
  }
  return createdAssets;
};

const filterAssetsByContentType = (assets, type) => {
  return assets.filter((asset) => {
    const { contentType } = asset.assetEntry.fields.file['en-US'];
    return contentType.split('/')[0] === type;
  });
};

(async () => {
  // Step 1 - Get all entries
  const entries = getAllEntries();
  console.log('entries => ', entries.length);

  if (entries.length) {
    // Step 2 - Filter entries
    const filteredEntries = filterEntries(entries);
    console.log('filteredEntries => ', filteredEntries.length);

    // Step 3 - Sort entries
    const sortedFilteredEntries = sortEntries(filteredEntries);
    console.log('sortedEntries => ', sortedFilteredEntries.length);

    // Step 4 - transform into contentful assets
    const assets = transformEntriesToAssets(sortedFilteredEntries);
    console.log('assets => ', assets.length);

    if (assets.length) {
      // Step 5 - filter out null assets
      const filteredAssets = filterAssets(assets);
      console.log('filteredAssets => ', filteredAssets.length);

      // Step 6 - check for missed duplicates
      const duplicates = findDuplicateAssets(filteredAssets);
      console.log('duplicates => ', duplicates.length);

      // Step 7 - create assets
      const uploadedAssets = await createAssets(filteredAssets);

      console.log('filteredAssets => ', filteredAssets.length);
      console.log('duplicates => ', JSON.stringify(duplicates, null, 2));
      console.log('uploadedAssets => ', uploadedAssets.length);
    }
  } else {
    console.log('No entries found');
  }
})();
