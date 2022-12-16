/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-await-in-loop */
const { clientDelivery, environmentManagement } = require('../shared/contentful-init');
const { importParser } = require('../shared/input-parsers');
const { getAssetType, getContentfulIdFromString, getMediaObject } = require('../shared/contentful-fields');
const { publishItem, deleteItem, checkForExistingItem } = require('../shared/contentful-actions');

const entryLookup = {};

const STEPS = {
  getEntries: true,
  transformItems: true,
  filterAssets: true,
  checkForDuplicates: true,
  createAssets: true
};

const entriesQuery = {
  'content_type': 'cloudinaryMedia',
  'limit': 1000,
  'fields.media[exists]': true,
  'sys.archivedVersion[exists]': false,
  'order': '-sys.createdAt'
};

const PUBLISH_ASSETS = true;
let videos = 0;

const getAllEntries = async (query) => {
  let entries;
  if (STEPS.getEntries) {
    const environment = await environmentManagement;
    entries = await importParser(async () => environment.getEntries(query));
  }
  return entries;
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

const processAsset = async (asset, { entryId, url, linkingId }, isVideo) => {
  let processedAsset;
  try {
    console.log(`processing asset => ${entryId} for ${url}`);
    processedAsset = await asset.processForAllLocales(
      isVideo ? { processingCheckWait: 5000, processingCheckRetries: 10 } : {}
    );
  } catch (error) {
    console.log(`error processing asset => ${entryId} for ${url} => ${linkingId}`, error);
    await deleteItem(asset, entryId);
  }
  return processedAsset;
};

const createFile = (format, url) => {
  const fileName = (url && url.split('/').pop()) || 'Missing url';
  return {
    contentType: getAssetType(format),
    fileName,
    upload: url
  };
};

const getVideoStillImage = (url, entryId, publish, entry, title) => {
  let videoStillImage;
  const fileExtension = url.split('.').pop();
  const isVideo = fileExtension === 'mp4' || fileExtension === 'mov';

  if (isVideo) {
    videos += 1;
    console.log(`video #${videos} => ${entryId} for ${url}`);
    const stillImageUrl = url.split('.');
    // remove the file extension
    stillImageUrl.pop();
    // add the still image extension
    stillImageUrl.push('jpg');
    // join the array back into a string
    const imageUrl = stillImageUrl.join('.');

    videoStillImage = {
      entryId: getContentfulIdFromString(imageUrl),
      url: imageUrl,
      linkingId: entry.sys.id,
      publish,
      assetEntry: {
        fields: {
          title: {
            'en-US': `${title} - Video Still Image`
          },
          file: {
            'en-US': createFile('jpg', imageUrl)
          }
        }
      }
    };
  }
  return videoStillImage;
};

const transformItems = (entries) => {
  if (STEPS.transformItems) {
    let publish = false;
    return entries.map((entry) => {
      const {
        media,
        internalTitle: { 'en-US': title }
      } = entry.fields;
      publish = PUBLISH_ASSETS && !!entry.sys.publishedVersion && entry.sys.version === entry.sys.publishedVersion + 1;
      const mediaObject = getMediaObject(media?.['en-US']);
      const url = mediaObject.original_secure_url || mediaObject.original_url || mediaObject.url;

      const entryId = getContentfulIdFromString(url);

      // take care of duplicate assets
      if (entryLookup[entryId]) {
        entryLookup[entryId].duplicateIds.push(entry.sys.id);
        return null;
      }

      entryLookup[entryId] = { duplicateIds: [] };
      return {
        linkingId: entry.sys.id,
        publish,
        entryId,
        url,
        assetEntry: {
          fields: {
            title: {
              'en-US': title
            },
            file: {
              'en-US': createFile(mediaObject.format, url)
            }
          }
        },
        videoStillImage: getVideoStillImage(url, entryId, publish, entry, title)
      };
    });
  }
  return [];
};

const filterItems = (assets) => {
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

const createdAssets = [];
const processAndPublishAsset = async (createdAsset, { entryId, url, linkingId, publish }, index, isVideo) => {
  if (createdAsset) {
    console.log(`created assetId #${index + 1} => ${entryId} for ${url}`);
    const processedAsset = await processAsset(createdAsset, { entryId, url, linkingId }, isVideo);

    if (processedAsset) {
      if (publish) {
        await publishItem(processedAsset, entryId);
      }
      createdAssets.push({ entryId, asset: processedAsset, publish });
    }
  }
};

const createAsset = async (environment, asset, index) => {
  const { assetEntry, entryId, publish, url } = asset;
  const fileExtension = url.split('.').pop();
  const isVideo = fileExtension === 'mp4' || fileExtension === 'mov';

  const existingAsset = await checkForExistingItem(entryId, async () => clientDelivery.getAsset(entryId));

  if (!existingAsset) {
    if (assetEntry.fields.file['en-US'].upload) {
      const createdAsset = await createAssetWithId(environment, asset, index + 1);

      await processAndPublishAsset(createdAsset, asset, index, isVideo);
    }
  } else {
    console.log(`existing asset => ${entryId} for ${url}`);
    createdAssets.push({ asset: existingAsset, entryId, publish });
  }
};

const createAssets = async (assets) => {
  if (STEPS.createAssets) {
    const environment = await environmentManagement;
    if (!environment) {
      console.log('environment not found');
      return [];
    }
    let videoCount = 0;

    for (let index = 0; index < assets.length; index++) {
      const asset = assets[index];
      await createAsset(environment, asset, index);
      const { entryId, videoStillImage } = asset;
      if (videoStillImage) {
        videoCount += 1;
        console.log(`creating video still #${videoCount} image for ${entryId}`);
        await createAsset(environment, videoStillImage, index);
      }
    }
  }
  return createdAssets;
};

(async () => {
  // Step 1 - Get all entries
  const entries = await getAllEntries(entriesQuery);
  console.log('entries => ', entries.items.length);

  if (entries.items.length) {
    // Step 2 - transform into contentful assets
    const transformedItems = transformItems(entries.items);
    console.log('transformItems => ', transformedItems.length);

    if (transformedItems.length) {
      // Step 3 - filter out null assets
      const filteredItems = filterItems(transformedItems);
      console.log('filteredAssets => ', filteredItems.length);

      // Step 4 - check for missed duplicates
      const duplicates = findDuplicateAssets(filteredItems);
      console.log('duplicates => ', duplicates.length);

      // Step 5 - create assets
      const uploadedAssets = await createAssets(filteredItems);
      console.log('filteredAssets => ', filteredItems.length);
      console.log('duplicates => ', JSON.stringify(duplicates, null, 2));
      console.log('uploadedAssets => ', uploadedAssets.length);
    }
  } else {
    console.log('No entries found');
  }
})();
