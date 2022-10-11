/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-await-in-loop */
const { clientDelivery, getEnvironmentManagement } = require('../shared/contentful-init');
const { importParser } = require('../shared/input-parsers');
const { getAssetType, getContentfulIdFromString, getMediaObject } = require('../shared/contentful-fields');
const { publishItem, deleteItem, checkForExistingItem } = require('../shared/contentful-actions');
const { logItems } = require('../shared/logging');

const entryLookup = {};

const createAssetWithId = async (environment, { entryId, assetEntry, url }) => {
  let asset;
  try {
    console.log(`creating asset => ${entryId} for ${url}`);
    asset = await environment.createAssetWithId(entryId, assetEntry);
  } catch (error) {
    console.log(`error creating asset => ${entryId} for ${url} => `, error);
  }
  return asset;
};

const processAsset = async (asset, { entryId, url }, isVideo) => {
  let processedAsset;
  try {
    console.log(`processing asset => ${entryId} for ${url}`);
    processedAsset = await asset.processForAllLocales(
      isVideo || entryId === '2610549456' ? { processingCheckWait: 5000, processingCheckRetries: 10 } : {}
    );
  } catch (error) {
    console.log(`error processing asset => ${entryId} for ${url} => ${}`, error);
    await deleteItem(asset, entryId);
  }
  return processedAsset;
};

const STEPS = {
  getEntries: true,
  transformItems: true,
  filterAssets: true,
  checkForDuplicates: true,
  createAssets: true,
  createEntries: false,
  fillDuplicateIds: false,
  getLinkedEntries: false,
  updateLinkedEntries: false
};

const entriesQuery = {
  'content_type': 'cloudinaryMedia',
  'limit': 1000,
  'fields.media[exists]': true,
  'order': '-sys.createdAt'
};

const getAllEntries = async (query) => {
  // let entries = testEntries;
  let entries;
  if (STEPS.getEntries) {
    // console.log('clientDelivery => ', clientDelivery);
    entries = await importParser(async () => clientDelivery.getEntries(query));
  }
  return entries;
};

const transformItems = (entries) => {
  if (STEPS.transformItems) {
    return entries.map((entry) => {
      const { media, internalTitle } = entry.fields;
      const publish = !!entry.sys.publishedVersion && entry.sys.version === entry.sys.publishedVersion + 1;
      const mediaObject = getMediaObject(media);
      const fileName = (mediaObject.url && mediaObject.url.split('/').pop()) || 'Missing url';
      // const fileExtension = fileName.split('.').pop();

      const url = mediaObject.original_secure_url || mediaObject.original_url || mediaObject.url;

      const entryId = getContentfulIdFromString(url);
      // console.log('entryId => ', entryId, mediaObject.url);
      // console.log('fileName => ', fileName);
      // console.log('fileExtension => ', fileExtension);

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
        },
        entry: {
          fields: {
            internalTitle: {
              'en-US': internalTitle
            },
            media: {
              'en-US': {
                sys: {
                  type: 'Link',
                  linkType: 'Asset',
                  id: entryId
                }
              }
            },
            cardStyle: {
              'en-US': 'Media'
            }
          }
        }
      };
    });
  }
  return [];
};

const fillDuplicateIds = (items) => {
  if (STEPS.fillDuplicateIds) {
    return items.map((item) => {
      const duplicateIds = entryLookup[item.entryId].duplicateIds || [];
      duplicateIds.push(item.linkingId);
      return { ...item, duplicateIds };
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
      const { assetEntry, entryId, publish, url } = asset;
      // console.log('assetEntry => ', assetEntry);

      const existingAsset = await checkForExistingItem(entryId, async () => clientDelivery.getAsset(entryId));

      if (!existingAsset) {
        if (assetEntry.fields.file['en-US'].upload) {
          const createdAsset = await createAssetWithId(environment, asset);

          const fileExtension = assetEntry.fields.file['en-US'].upload.split('.').pop();

          const isVideo = fileExtension === 'mp4' || fileExtension === 'mov';

          if (createdAsset) {
            console.log(`created assetId => ${entryId} for ${url}`);
            const processedAsset = await processAsset(createdAsset, asset, isVideo);

            if (processedAsset) {
              const publishedAsset = await publishItem(processedAsset, entryId);
              if (publishedAsset) {
                createdAssets.push({ entryId, asset: processedAsset, publish });
              }
            }
          }
        }
      } else {
        console.log(`existing asset => ${entryId} for ${url}`);
        createdAssets.push({ asset: existingAsset, entryId, publish });
      }
    }
  }
  return createdAssets;
};

const createEntryWithId = async (environment, { entryId, entry, url }, contentType) => {
  let createdEntry;
  try {
    console.log(`creating entry => ${entryId} for ${url}`);
    createdEntry = await environment.createEntryWithId(contentType, entryId, entry);
  } catch (error) {
    console.log(`error creating entry => ${entryId} for ${url} => `, error);
  }
  return createdEntry;
};

const createEntries = async (entries, contentType) => {
  const createdEntries = [];
  if (STEPS.createEntries) {
    const environment = await getEnvironmentManagement();
    if (!environment) {
      console.log('environment not found');
      return [];
    }

    for (let index = 0; index < entries.length; index++) {
      const currentEntry = entries[index];
      const { url, entryId, publish } = currentEntry;

      const existingEntry = await checkForExistingItem(entryId, async () => clientDelivery.getEntry(entryId));

      if (!existingEntry) {
        const createdEntry = await createEntryWithId(environment, currentEntry, contentType);

        if (createdEntry) {
          console.log(`created entry => ${entryId} for ${url}`);

          if (publish) {
            await publishItem(createdEntry, entryId);
          }
          createdEntries.push({ entryId, asset: createdEntry });
        }
      } else {
        console.log(`existing entry => ${entryId} for ${url}`);
        createdEntries.push({ asset: existingEntry, entryId });
      }
    }
  }
  return createdEntries;
};

const getLinkedEntries = async (items) => {
  if (STEPS.getLinkedEntries) {
    for (let index = 0; index < items.length; index += 1) {
      let links;
      const { linkingId, entryId, duplicateIds } = items[index];
      const linkedEntryIds = duplicateIds?.join(',') || linkingId;

      console.log('linkedEntryIds => ', linkedEntryIds);
      let allLinks = [];
      if (duplicateIds && duplicateIds.length) {
        for (let idIndex = 0; idIndex < duplicateIds.length; idIndex += 1) {
          const id = duplicateIds[idIndex];
          if (id) {
            try {
              console.log(`getting linked entries for ${id} for new id ${entryId}`);
              links = await clientDelivery.getEntries({ links_to_entry: id });
              allLinks = [...allLinks, ...links.items];
            } catch (error) {
              console.log(`error getting linked entries for ${id} for new id ${entryId} => `, error);
            }
          }
        }
      }

      if (allLinks?.length) {
        items[index].linkedEntryIds = links.items.map((item) => item.sys.id).join(',');
        console.log(`linked entries for ${linkingId} for => ${entryId} were found`);
      } else {
        console.log(`no linked entries for ${linkingId} for => ${entryId} were found`);
      }
    }
    return items;
  }
  return [];
};

const updateLinkedEntries = async (items) => {
  if (STEPS.updateLinkedEntries) {
    const environment = await getEnvironmentManagement();
    if (!environment) {
      console.log('environment not found');
      return;
    }
    for (let index = 0; index < items.length; index += 1) {
      const { entryId, linkedEntryIds, duplicateIds } = items[index];
      // console.log('linkedEntryIds => ', linkedEntryIds);
      if (linkedEntryIds) {
        let linkedEntries;
        try {
          console.log(`getting linked entries => ${linkedEntryIds} for ${entryId}`);
          linkedEntries = await environment.getEntries({ 'sys.id[in]': linkedEntryIds });
        } catch (error) {
          console.log(`error getting linked entries => ${linkedEntryIds} for ${entryId} => `, error);
        }
        // console.log('linkedEntries => ', JSON.stringify(linkedEntries, null, 2));
        if (linkedEntries?.items?.length) {
          for (let i = 0; i < linkedEntries.items.length; i += 1) {
            const linkedEntry = linkedEntries.items[i];
            const newField = { sys: { type: 'Link', linkType: 'Entry', id: entryId } };

            let update = false;
            switch (linkedEntry.sys.contentType.sys.id) {
              case 'cardList':
                linkedEntry.fields.cards['en-US'] =
                  linkedEntry?.fields?.cards?.['en-US']?.map((card) => {
                    // console.log('card => ', card);
                    const currentId = duplicateIds.filter((id) => card.sys.id === id)[0];
                    if (currentId) {
                      update = true;
                      return newField;
                    }
                    return card;
                  }) || undefined;
                break;
              case 'card':
                console.log('card found => ', JSON.stringify(linkedEntry, null, 2));
                break;
              case 'ctaHero': {
                const videoDesktop = linkedEntry?.fields?.videoDesktop?.['en-US'];
                const videoMobile = linkedEntry?.fields?.videoMobile?.['en-US'];
                if (videoDesktop && duplicateIds.some((id) => id === videoDesktop.sys.id)) {
                  linkedEntry.fields.videoDesktop['en-US'] = newField;
                  update = true;
                }
                if (videoMobile && duplicateIds.some((id) => id === videoMobile.sys.id)) {
                  linkedEntry.fields.videoMobile['en-US'] = newField;
                  update = true;
                }
                break;
              }
              default:
                console.log('Found different content type => ', linkedEntry.sys.contentType.sys.id);
                break;
            }
            if (update) {
              try {
                console.log(`updating linked entry => ${linkedEntry.sys.id} for ${entryId}`);
                await linkedEntry.update();
              } catch (error) {
                console.log(`error updating linked entry => ${linkedEntry.sys.id} for ${entryId} => `, error);
              }
            }
          }
        } else {
          console.log(`no linked entry items found for => ${linkedEntryIds} for ${entryId}`);
        }
      } else {
        console.log(`no linked entries found for ${entryId}`);
      }
    }
    console.log('finished updating linked entries');
  }
};

const filterAssetsByContentType = (assets, type) => {
  return assets.filter((asset) => {
    const { contentType } = asset.assetEntry.fields.file['en-US'];
    return contentType.split('/')[0] === type;
  });
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

      // Step 6 - create entries
      const createdEntries = await createEntries(filteredItems, 'card');
      console.log('createdEntries => ', createdEntries.length);

      // Step 7 - get duplicate ids
      const itemsWithDuplicateIds = fillDuplicateIds(filteredItems);
      console.log('itemsWithDuplicateIds => ', itemsWithDuplicateIds.length);

      const filteredItemsWithDuplicateIds = itemsWithDuplicateIds.filter(
        (item) => item.duplicateIds?.length || item.linkingId
      );
      console.log('filteredItemsWithDuplicateIds => ', filteredItemsWithDuplicateIds.length);

      // Step 8 - get linked entries
      const itemsWithLinkedEntries = await getLinkedEntries(filteredItemsWithDuplicateIds);
      console.log('itemsWithLinkedEntries => ', itemsWithLinkedEntries.length);

      const filteredItemsWithLinkedEntries = itemsWithLinkedEntries.filter((item) => item.linkedEntryIds);
      console.log('filteredItemsWithLinkedEntries => ', filteredItemsWithLinkedEntries.length);

      // Step 9 - update linked entries
      await updateLinkedEntries(filteredItemsWithLinkedEntries);
      console.log('entries => ', entries.items.length);
      console.log('transformItems => ', transformedItems.length);
      console.log('filteredAssets => ', filteredItems.length);
      console.log('duplicates => ', duplicates.length);
      console.log('filteredAssets => ', filteredItems.length);
      console.log('duplicates => ', JSON.stringify(duplicates, null, 2));
      console.log('uploadedAssets => ', uploadedAssets.length);
      console.log('createdEntries => ', createdEntries.length);
      console.log('itemsWithDuplicateIds => ', itemsWithDuplicateIds.length);
      console.log('filteredItemsWithDuplicateIds => ', filteredItemsWithDuplicateIds.length);
      console.log('itemsWithLinkedEntries => ', itemsWithLinkedEntries.length);
      console.log('filteredItemsWithLinkedEntries => ', filteredItemsWithLinkedEntries.length);
    }
  } else {
    console.log('No entries found');
  }
})();
