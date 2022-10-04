/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-await-in-loop */
const { clientDelivery, getEnvironmentManagement } = require('../shared/contentful-init');
const { importParser } = require('../shared/input-parsers');
const { getAssetType, getContentfulIdFromString } = require('../shared/contentful-fields');

const linkedEntries = [];

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
    const query = {
      content_type: 'cloudinaryMedia',
      skip: index,
      limit: 100
    };
    await importParser(
      () => clientDelivery.getEntries(query),
      query,
      (items) => getLinkedEntriesCallback(query, items)
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
