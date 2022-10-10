/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-await-in-loop */
const { clientDelivery, getEnvironmentManagement } = require('../shared/contentful-init');
const { importParser } = require('../shared/input-parsers');
const { getAssetType, getContentfulIdFromString, getMediaObject } = require('../shared/contentful-fields');

const STEPS = {
  getEntries: true,
  prepareItems: true,
  fillDuplicateIds: true,
  getLinkedEntries: false,
  updateLinkedEntries: false
};

const entriesQuery = {
  'content_type': 'card',
  'sys.createdAt[gte]': '2022-10-05T00:00:00Z',
  'limit': 1000,
  'order': '-sys.createdAt'
};

const entryLookup = {};

const getAllEntries = async (query) => {
  // let entries = testEntries;
  let entries;
  if (STEPS.getEntries) {
    // console.log('clientDelivery => ', clientDelivery);
    entries = await importParser(async () => clientDelivery.getEntries(query));
  }
  return entries;
};

const prepareItems = (items) => {
  if (STEPS.prepareItems) {
    return items.map((entry) => {
      const { media, internalTitle } = entry.fields;
      const publish = !!entry.sys.publishedVersion && entry.sys.version === entry.sys.publishedVersion + 1;
      const mediaObject = getMediaObject(media);
      const fileName = (mediaObject.url && mediaObject.url.split('/').pop()) || 'Missing url';

      const url = mediaObject.original_secure_url || mediaObject.original_url || mediaObject.url;

      const entryId = getContentfulIdFromString(url);

      // take care of duplicate assets
      if (entryLookup[entryId]) {
        entryLookup[entryId].duplicateIds = entryLookup[entryId].duplicateIds || [];
        entryLookup[entryId].duplicateIds.push(entry.sys.id);
        return null;
      }

      entryLookup[entryId].duplicateIds = [];

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
      const duplicateIds = entryLookup[item.entryId]?.duplicateIds || [];
      duplicateIds.push(item.linkingId);
      return { ...item, duplicateIds };
    });
  }
  return [];
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
            switch (linkedEntry.sys.contentType.sys.id) {
              case 'cardList':
                linkedEntry.fields.cards['en-US'] =
                  linkedEntry?.fields?.cards['en-US']?.map((card) => {
                    // console.log('card => ', card);
                    const currentId = duplicateIds.filter((id) => card.sys.id === id)[0];
                    if (currentId) {
                      return {
                        sys: { type: 'Link', linkType: 'Entry', id: entryId }
                      };
                    }
                    return card;
                  }) || undefined;
                try {
                  console.log(`updating linked entries => ${linkedEntryIds} for ${entryId}`);
                  await linkedEntry.update();
                } catch (error) {
                  console.log(`error updating linked entries => ${linkedEntryIds} for ${entryId} => `, error);
                }
                break;
              case 'card':
                console.log('card found => ', JSON.stringify(linkedEntry, null, 2));
                break;
              case 'ctaHero':
                console.log('ctaHero found => ', JSON.stringify(linkedEntry, null, 2));
                break;
              default:
                console.log('Found different content type => ', linkedEntry.sys.contentType.sys.id);
                break;
            }
          }
        }
        console.log(`no linked entries found for => ${linkedEntryIds} for ${entryId}`);
      }
    }
    console.log('finished updating linked entries');
  }
};

(async () => {
  // Step 1 - Get all entries
  const entries = await getAllEntries(entriesQuery);
  console.log('entries => ', entries.items.length);

  if (entries.items.length) {
    const preparedItems = prepareItems(entries.items);
    console.log('preparedItems => ', preparedItems.length);

    const filledItems = fillDuplicateIds(preparedItems);
    console.log('filledItems => ', filledItems.length);

    const linkedItems = await getLinkedEntries(filledItems);
    console.log('linkedItems => ', linkedItems.length);

    await updateLinkedEntries(linkedItems);
  } else {
    console.log('No entries found');
  }
})();
