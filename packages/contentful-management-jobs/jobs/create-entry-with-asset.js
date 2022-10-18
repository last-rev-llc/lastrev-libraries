/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-await-in-loop */
const { clientDelivery, environmentManagement } = require('../shared/contentful-init');
const { importParser } = require('../shared/input-parsers');
const { publishItem, checkForExistingItem } = require('../shared/contentful-actions');
const { logItems } = require('../shared/logging');

const STEPS = {
  getAssets: true,
  transformAssetsToEntries: true,
  filterEntries: true,
  checkForDuplicates: true,
  createEntries: true
};

const ASSETS_QUERY = {
  'sys.createdAt[gte]': '2022-10-12T00:00:00Z',
  'fields.file.url[exists]': true,
  'limit': 1000,
  'order': '-sys.createdAt'
};

const cardEntry = (title, id) => ({
  fields: {
    internalTitle: {
      'en-US': title
    },
    media: {
      'en-US': {
        sys: {
          type: 'Link',
          linkType: 'Asset',
          id
        }
      }
    },
    cardStyle: {
      'en-US': 'Media'
    }
  }
});

const mediaEntry = (title, id) => ({
  fields: {
    internalTitle: {
      'en-US': title
    },
    desktop: {
      'en-US': {
        sys: {
          type: 'Link',
          linkType: 'Asset',
          id
        }
      }
    }
  }
});

const setEntryByType = (title, id, isImageOrVideo) => {
  return isImageOrVideo ? cardEntry(title, id) : mediaEntry(title, id);
};

const transformAssetsToEntries = (assets) => {
  if (STEPS.transformAssetsToEntries) {
    return assets.map((asset) => {
      if (asset) {
        const {
          sys: { id },
          fields: {
            title: { 'en-US': title },
            file: {
              'en-US': { contentType }
            }
          }
        } = asset || {};
        const publish = !!asset.sys.publishedVersion && asset.sys.version === asset.sys.publishedVersion + 1;
        const assetType = contentType.split('/')[0];
        const isImageOrVideo = assetType === 'image' || assetType === 'video';
        return {
          publish,
          entryId: id,
          contentType: isImageOrVideo ? 'card' : 'media',
          entry: setEntryByType(title, id, isImageOrVideo)
        };
      }
      console.log('asset not found');
      return null;
    });
  }
  return [];
};

const createEntryWithId = async (environment, entryId, entryObject, contentType) => {
  let entry;
  try {
    console.log(`creating entry => ${entryId}`);
    entry = await environment.createEntryWithId(contentType, entryId, entryObject);
  } catch (error) {
    console.log(`error creating entry => ${entryId} => `, error);
  }
  return entry;
};

const createEntries = async (entries) => {
  const createdEntries = [];
  if (STEPS.createEntries) {
    const environment = await environmentManagement;
    if (!environment) {
      console.log('environment not found');
      return [];
    }

    for (let index = 0; index < entries.length; index++) {
      const currentEntry = entries[index];
      const { entry, entryId, publish, contentType } = currentEntry;

      const existingAsset = await checkForExistingItem(entryId, async () => clientDelivery.getEntry(entryId));

      if (!existingAsset) {
        const createdEntry = await createEntryWithId(environment, entryId, entry, contentType);

        if (createdEntry) {
          console.log(`created entry => ${entryId}`);

          if (publish) {
            await publishItem(createdEntry, entryId);
          }
          createdEntries.push({ entryId, asset: createdEntry });
        }
      } else {
        console.log(`existing entry => ${entryId}`);
        createdEntries.push({ asset: existingAsset, entryId });
      }
    }
  }
  return createdEntries;
};

const getAllAssets = async (query) => {
  let assets;
  if (STEPS.getAssets) {
    const environment = await environmentManagement;
    assets = await importParser(() => environment.getAssets(query));
  }
  return assets;
};

const filterEntries = (entries) => {
  if (STEPS.filterEntries) {
    return entries.filter((entry) => entry);
  }
  return entries;
};

const findDuplicateEntries = (entries) => {
  const duplicateEntries = [];
  if (STEPS.checkForDuplicates) {
    entries.forEach((entry) => {
      const count = entries.filter((a) => a.entryId === entry.entryId).length;
      if (count > 1) {
        duplicateEntries.push({ entryId: entry.entryId, count });
      }
    });
  }
  return duplicateEntries;
};

(async () => {
  // Step 1 - Get all entries
  const assets = await getAllAssets(ASSETS_QUERY);

  console.log('assets count => ', assets.items.length);

  if (assets?.items?.length) {
    // Step 2 - transform assets into contentful entries
    const entriesWithAsset = transformAssetsToEntries(assets.items);
    console.log('entriesWithAsset => ', entriesWithAsset.length);

    if (entriesWithAsset.length) {
      // Step 3 - Filter out entries that do not have urls
      const filteredEntries = filterEntries(entriesWithAsset);

      // Step 4 - check for missed duplicates
      const duplicateEntries = findDuplicateEntries(filteredEntries);
      console.log('duplicateEntries => ', duplicateEntries.length);

      // Step 5 - Create entries
      const createdEntries = await createEntries(entriesWithAsset);
      console.log('createdEntries => ', createdEntries.length);
    }
  } else {
    console.log('No entries found');
  }
})();
