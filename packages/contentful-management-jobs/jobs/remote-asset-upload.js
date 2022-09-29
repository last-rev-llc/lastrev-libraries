/* eslint-disable no-param-reassign */
/* eslint-disable no-await-in-loop */
const sdk = require('contentful-management');
const keys = require('lodash/keys');
const omit = require('lodash/omit');
const contentful = require('contentful');
const { importParser, wait } = require('../shared/input-parsers');
const { getAssetType, getContentfulIdFromString } = require('../shared/contentful-fields');
const {
  testEntries,
  testLinkedEntries,
  testCreatedEntries,
  testUploadedAssets
} = require('../shared/fixtures/__mocks');
// 1. get entries via delivery api => Done
// 2. manipulate entries => Done
// 3. import entries via management api => Done
// 4. create entries of content type media from assets => Working on it

// create asset => Done
// create media entry linking the asset => Working on it
const clientDelivery = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
  environment: process.env.CONTENTFUL_ENVIRONMENT,
  host: process.env.CONTENTFUL_HOST
});

const clientManagement = sdk.createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_API,
  timeout: 30000
});

const spaceManagement = clientManagement.getSpace(process.env.CONTENTFUL_SPACE_ID);
const environmentManagement = spaceManagement.then((space) => space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT));

const entryLookup = {};
const linkedEntries = [];

const getEnvironmentManagement = async () => {
  let environment;
  let failCount = 0;
  let environmentCreationFailed = false;

  while (!environment && !environmentCreationFailed) {
    try {
      environment = await environmentManagement;
    } catch (error) {
      failCount += 1;
      console.log('error creating environment => ', error);
    }
    environmentCreationFailed = failCount > 5;
    if (environmentCreationFailed) {
      console.log('environment creation failed');
    }
  }

  return environment;
};

const getLinkedEntriesCallback = async (query, receivedEntries) => {
  let links;
  let counter = query.skip;
  for (let index = 0; index < receivedEntries.items.length; index += 1) {
    const {
      sys: { id },
      fields: { media }
    } = receivedEntries.items[index];

    try {
      links = await clientDelivery.getEntries({ links_to_entry: id });
    } catch (error) {
      console.log(`error getting linked entries for ${id}=> `, error);
    }

    if (links?.items?.length && media) {
      linkedEntries.push({
        id,
        ids: links.items.map((item) => item.sys.id)
      });
    }
    counter += 1;
    console.log(`entry ${counter} for => ${id}`);
  }
};

const getLinkedEntries = async (entries) => {
  for (let index = 0; index < entries.total; index += 100) {
    await importParser(
      clientDelivery,
      {
        content_type: 'cloudinaryMedia',
        skip: index,
        limit: 100
      },
      getLinkedEntriesCallback
    );
  }
};

const createNewEntryIds = (assets) => {
  return assets.map((asset) => {
    // const url = (asset.assetEntry.fields.media && asset.fields.media[0] && asset.fields.media[0].url) || null;
    return {
      newId: asset.entryId
    };
  });
};

const getMediaObject = (media) => {
  return media ? media[0] : {};
};

const transformEntriesToAssets = (entries) => {
  return entries.map((entry) => {
    const { media, internalTitle } = entry.fields;
    const mediaObject = getMediaObject(media);
    const fileName = (mediaObject.url && mediaObject.url.split('/').pop()) || 'Missing url';
    // const fileExtension = fileName.split('.').pop();

    const entryId = getContentfulIdFromString(mediaObject.url);
    // console.log('entryId => ', entryId, mediaObject.url);
    // console.log('fileName => ', fileName);
    // console.log('fileExtension => ', fileExtension);

    // take care of duplicate assets
    if (entryLookup[entryId]) {
      entryLookup[entryId].duplicateIds = entryLookup[entryId].duplicateIds || [];
      entryLookup[entryId].duplicateIds.push(entry.sys.id);
      return null;
    }

    entryLookup[entryId] = { oldId: entry.sys.id, newId: entryId, url: mediaObject.url };
    // console.log('entryId => ', entryId, mediaObject.url);

    return {
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
              upload: mediaObject.url
            }
          }
        }
      }
    };
  });
};

const sortEntries = (entries) => entries.sort((a, b) => new Date(a.sys.createdAt) - new Date(b.sys.createdAt));

const findDuplicateAssets = (assets) => {
  const duplicateAssets = [];
  assets.forEach((asset) => {
    const count = assets.filter((a) => a.entryId === asset.entryId).length;
    if (count > 1) {
      duplicateAssets.push({ entryId: asset.entryId, count });
    }
  });
  return duplicateAssets;
};

const transformAssetsToEntries = (assets) => {
  return assets.map(({ entryId, asset }) => {
    if (asset) {
      const {
        sys: { id },
        fields: { title }
      } = asset || {};
      return {
        entryId,
        entry: {
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
        }
      };
    }
    console.log('asset not found => ', entryId);
    return null;
  });
};

const checkForExistingAsset = async (entryId) => {
  let asset;
  try {
    console.log(`checking if asset exists => ${entryId} for ${entryLookup[entryId].url}`);
    asset = await clientDelivery.getAsset(entryId);
  } catch (error) {
    if (error?.name !== 'NotFound') {
      console.log(`error checking for existing asset => ${entryId} for ${entryLookup[entryId].url} => `, error);
    }
  }
  return asset;
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
    processedAsset = await asset.processForAllLocales({ processingCheckWait: 5000 });
  } catch (error) {
    console.log(`error processing asset => ${entryId} for ${entryLookup[entryId].url} => `, error);
    try {
      console.log(`deleting asset => ${entryId} for ${entryLookup[entryId].url}`);
      asset.delete();
    } catch (deleteError) {
      console.log(`error deleting asset => ${entryId} for ${entryLookup[entryId].url} => `, deleteError);
    }
  }
  return processedAsset;
};

const createAssets = async (assets, debug) => {
  const createdAssets = [];
  if (debug) {
    assets = assets.filter((asset) => asset.entryId === '4000443543');
    console.log('assets => ', JSON.stringify(assets), assets.length);
  }

  const environment = await getEnvironmentManagement();
  if (!environment) {
    console.log('environment not found');
    return [];
  }

  for (let index = 0; index < assets.length; index++) {
    const asset = assets[index];
    const { assetEntry, entryId } = asset;
    // console.log('assetEntry => ', assetEntry);

    const existingAsset = await checkForExistingAsset(entryId);

    if (!existingAsset) {
      if (assetEntry.fields.file['en-US'].upload) {
        console.log('waiting for .5s');
        await wait(500);
        console.log('done waiting');

        const createdAsset = await createAssetWithId(environment, entryId, assetEntry);

        if (createdAsset) {
          const processedAsset = await processAsset(createdAsset, entryId);

          if (processedAsset) {
            console.log(`created assetId => ${entryId} for ${entryLookup[entryId].url}`);
            createdAssets.push({ entryId, asset: processedAsset });
          }
        }
      }
    } else {
      console.log(`existing asset => ${entryId} for ${entryLookup[entryId].url}`);
      createdAssets.push({ asset: existingAsset, entryId });
    }
  }
  return createdAssets;
};

const createEntries = async (entries, contentType) => {
  let counter = 0;
  return Promise.all(
    entries.map(async (entry) => {
      // console.log('entry type => ', typeof entry);
      if (entry && typeof entry === 'object') {
        const { entry: entryObject, entryId } = entry;
        console.log('creating entry => ', entryId);
        const existingEntry = await clientDelivery.getEntry(entryId).catch(() => null);
        if (!existingEntry) {
          await wait(2000);
          return environmentManagement.then((environment) => {
            return environment
              .createEntryWithId(contentType, entryId, entryObject)
              .then((createdEntry) => {
                // console.log(createdEntry);
                counter += 1;
                console.log('created entry => ', entryId, counter);
                return createdEntry;
              })
              .catch((error) => console.log(`error creating entry => ${entryId} => `, error));
          });
        }
        console.log('existing entry => ', existingEntry.sys.id);
        return null;
      }
      console.log('entry not found when creating entries => ', entry);
      return null;
    })
  );
};

const updateLinkedEntries = async (entryIds) => {
  console.log('entryIds => ', JSON.stringify(entryIds, null, 2));
  return Promise.all(
    entryIds.map(async (id) => {
      const { newId } = id;
      const linkedEntryIds = linkedEntries
        .filter((linkedEntry) => linkedEntry.id === entryLookup[newId].oldId)
        .map((linkedEntry) => linkedEntry.ids);
      console.log('entryIds => ', linkedEntryIds);
      if (linkedEntryIds.length > 0) {
        const ids = linkedEntryIds.join(',');
        console.log('ids => ', ids);
        return environmentManagement.then((environment) => {
          return environment
            .getEntries({
              'sys.id[in]': linkedEntryIds.join(',')
            })
            .then((receivedEntries) => {
              console.log('linkedEntry => ', receivedEntries.items);
              receivedEntries.items.map(async (receivedEntry) => {
                switch (receivedEntry.sys.contentType.sys.id) {
                  case 'cardList':
                    receivedEntry.fields.cards['en-US'] =
                      receivedEntry?.fields?.cards['en-US']?.map((card) => {
                        console.log('card => ', card);
                        if (card.sys.id === entryLookup[newId].oldId) {
                          return {
                            sys: { type: 'Link', linkType: 'Entry', id: newId }
                          };
                        }
                        return card;
                      }) || undefined;
                    return receivedEntry
                      .update()
                      .then((updatedEntry) => {
                        console.log('updatedEntry => ', JSON.stringify(updatedEntry, null, 2));
                      })
                      .catch(console.error);
                  case 'card':
                    break;
                  case 'ctaHero':
                    break;
                  default:
                    console.log('Found different content type => ', receivedEntry.sys.contentType.sys.id);
                    break;
                }
                return receivedEntry;
              });
            })
            .catch((error) => console.log('error => ', error));
        });
      }
      return null;
    })
  );
};

const isDebug = false;

(async () => {
  let entries = testEntries;
  // this works!!!
  if (!isDebug) {
    entries = await importParser(clientDelivery, {
      content_type: 'cloudinaryMedia',
      limit: 1000
    });
  }

  // filter out entries that do not have urls
  const filteredEntries = entries.items.filter((entry) => getMediaObject(entry.fields.media).url);
  console.log('filteredEntries => ', filteredEntries.length);

  const sortedFilteredEntries = sortEntries(filteredEntries);
  console.log('sortedEntries => ', sortedFilteredEntries.length);

  // transform into contentful assets
  const assets = await transformEntriesToAssets(sortedFilteredEntries);
  console.log('assets => ', assets.length);
  // console.log('assets => ', JSON.stringify(assets, null, 2));
  // console.log('assetLookup => ', JSON.stringify(entryLookup, null, 2));

  const filteredAssets = assets.filter((asset) => asset);
  console.log('filteredAssets => ', filteredAssets.length);

  // find duplicates
  const duplicates = findDuplicateAssets(filteredAssets);
  console.log('duplicates => ', JSON.stringify(duplicates, null, 2));

  // // console.log('entryLookup =>', JSON.stringify(entryLookup, null, 2));

  const uploadedAssets = await createAssets(filteredAssets, isDebug);
  // const uploadedAssets = testUploadedAssets;

  console.log('uploadedAssets => ', uploadedAssets.length);

  // transform into contentful entries
  // const entriesWithAsset = transformAssetsToEntries(uploadedAssets.filter((asset) => asset));

  // console.log('entriesWithAsset => ', JSON.stringify(entriesWithAsset, null, 2));

  // create entries
  // const createdEntries = await createEntries(entriesWithAsset, 'media');
  // console.log('createdEntries => ', JSON.stringify(createdEntries, null, 2));

  // const newEntryIds = createNewEntryIds(assets);

  // console.log('newEntryIds => ', JSON.stringify(newEntryIds, null, 2));

  // await getLinkedEntries(filteredEntries);

  // console.log('linkedEntries => ', JSON.stringify(linkedEntries, null, 2));

  // // // update linked entries
  // const updatedLinkedEntries = await updateLinkedEntries(newEntryIds);
  // console.log('updatedLinkedEntries => ', JSON.stringify(updatedLinkedEntries, null, 2));
})();
