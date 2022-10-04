/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-await-in-loop */
const { clientDelivery, getEnvironmentManagement } = require('../shared/contentful-init');
const { importParser } = require('../shared/input-parsers');
const { publishItem, checkForExistingItem } = require('../shared/contentful-actions');
const { logItems } = require('../shared/logging');

const entryLookup = {};
const STEPS = {
  getAssets: true,
  filterAssets: false,
  sortAssets: false,
  transformAssetsToEntries: false,
  filterEntries: false,
  checkForDuplicates: false,
  createEntries: false
};

const getMediaObject = (media) => {
  let mediaObject = {};
  if (media) {
    mediaObject = media.length ? media[0] : media;
  }
  return mediaObject;
};

const transformAssetsToEntries = (assets) => {
  if (STEPS.transformAssetsToEntries) {
    return assets.map(({ entryId, asset, publish }) => {
      if (asset) {
        const {
          sys: { id },
          fields: { title }
        } = asset || {};
        return {
          publish,
          entryId,
          entry: {
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
          }
        };
      }
      console.log('asset not found => ', entryId);
      return null;
    });
  }
  return [];
};

const createEntryWithId = async (environment, entryId, entryObject, contentType) => {
  let entry;
  try {
    console.log(`creating entry => ${entryId} for ${entryLookup[entryId].url}`);
    entry = await environment.createEntryWithId(contentType, entryId, entryObject);
  } catch (error) {
    console.log(`error creating entry => ${entryId} for ${entryLookup[entryId].url} => `, error);
  }
  return entry;
};

const createEntries = async (entries, contentType) => {
  const createdEntries = [];
  const environment = await getEnvironmentManagement();
  if (!environment) {
    console.log('environment not found');
    return [];
  }

  for (let index = 0; index < entries.length; index++) {
    const currentEntry = entries[index];
    const { entry, entryId, publish } = currentEntry;

    const existingAsset = await checkForExistingItem(entryId, async () => clientDelivery.getEntry(entryId));

    if (!existingAsset) {
      const createdEntry = await createEntryWithId(environment, entryId, entry, contentType);

      if (createdEntry) {
        console.log(`created entry => ${entryId} for ${entryLookup[entryId].url}`);

        if (publish) {
          await publishItem(createdEntry, entryId);
        }
        createdEntries.push({ entryId, asset: createdEntry });
      }
    } else {
      console.log(`existing entry => ${entryId} for ${entryLookup[entryId].url}`);
      createdEntries.push({ asset: existingAsset, entryId });
    }
  }
  return createdEntries;
};

const getAllAssets = async () => {
  let assets = [];
  if (STEPS.getAssets) {
    const query = {
      limit: 1000
    };
    assets = await importParser(() => clientDelivery.getAssets(query), query);
  }
  return assets;
};

const filterAssets = (entries) => {
  if (STEPS.filterAssets) {
    // filter out entries that do not have urls
    return entries?.items.filter((entry) => {
      const mediaObject = getMediaObject(entry.fields.media);
      return mediaObject.original_secure_url || mediaObject.original_url || mediaObject.url;
    });
  }
  return entries;
};

const sortAssets = (assets) => {
  if (STEPS.sortAssets) {
    return assets.sort((a, b) => new Date(a.sys.createdAt) - new Date(b.sys.createdAt));
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
  const assets = getAllAssets();
  console.log('assets => ', assets.length);

  if (assets.length) {
    // Step 2 - Filter assets that do not have urls
    const filteredAssets = filterAssets(assets);
    console.log('filteredAssets => ', filteredAssets.length);

    // Step 3 - Sort assets by date created
    const sortedFilteredAssets = sortAssets(assets);
    console.log('sortedFilteredAssets => ', sortedFilteredAssets.length);

    // Step 4 - transform assets into contentful entries
    const entriesWithAsset = transformAssetsToEntries(sortedFilteredAssets);
    // console.log('entriesWithAsset => ', JSON.stringify(entriesWithAsset, null, 2));
    console.log('entriesWithAsset => ', entriesWithAsset.length);

    if (entriesWithAsset.length) {
      // Step 5 - Filter out entries that do not have urls
      const filteredEntries = filterEntries(entriesWithAsset);

      // Step 6 - check for missed duplicates
      const duplicateEntries = findDuplicateEntries(filteredEntries);
      console.log('duplicateEntries => ', duplicateEntries.length);

      // Step 7 - Create entries
      const createdEntries = await createEntries(entriesWithAsset, 'card');
      console.log('createdEntries => ', createdEntries.length);
    }
  } else {
    console.log('No entries found');
  }
})();
