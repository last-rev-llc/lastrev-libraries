/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-await-in-loop */
const { clientDelivery, environmentManagement } = require('../shared/contentful-init');
const { importParser } = require('../shared/input-parsers');
const { getContentfulIdFromString, getMediaObject } = require('../shared/contentful-fields');

const STEPS = {
  getEntries: true,
  prepareItems: true,
  fillDuplicateIds: true,
  getLinkedEntries: true,
  updateLinkedEntries: true
};

const entriesQuery = {
  'content_type': 'cloudinaryMedia',
  'limit': 1000,
  'fields.media[exists]': true,
  'order': '-sys.createdAt'
};

const entryLookup = {};

const getAllEntries = async (query) => {
  let entries;
  if (STEPS.getEntries) {
    entries = await importParser(async () => clientDelivery.getEntries(query));
  }
  return entries;
};

const prepareItems = (items) => {
  if (STEPS.prepareItems) {
    let videos = 0;
    return items.map((entry) => {
      const { media } = entry.fields;
      const mediaObject = getMediaObject(media);

      const url = mediaObject.original_secure_url || mediaObject.original_url || mediaObject.url;
      const fileExtension = url.split('.').pop();
      const isVideo = fileExtension === 'mp4' || fileExtension === 'mov';

      const entryId = getContentfulIdFromString(url);
      let stillImageId = '';
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

        stillImageId = getContentfulIdFromString(imageUrl);
      }

      // take care of duplicate items
      if (entryLookup[entryId]) {
        entryLookup[entryId].duplicateIds.push(entry.sys.id);
        return null;
      }

      entryLookup[entryId] = { duplicateIds: [] };

      return {
        linkingId: entry.sys.id,
        entryId,
        url,
        stillImageId
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

const getLinks = async ({ linkedEntryIds, entryId }, environment) => {
  let linkedEntries;
  try {
    console.log(`getting linked entries => ${linkedEntryIds} for ${entryId}`);
    linkedEntries = await environment.getEntries({ 'sys.id[in]': linkedEntryIds });

    if (linkedEntries?.items?.length !== linkedEntryIds?.split(',')?.length) {
      console.log(
        `MATCH_CHECK_ERROR: linkedEntries => ${linkedEntries.items.length} should = linkedEntryIds => ${
          linkedEntryIds.split(',').length
        }`
      );
    }
  } catch (error) {
    console.log(`error getting linked entries => ${linkedEntryIds} for ${entryId} => `, error);
  }
  return linkedEntries;
};

const getLinkedEntries = async (items) => {
  if (STEPS.getLinkedEntries) {
    for (let index = 0; index < items.length; index += 1) {
      let links;
      const { linkingId, entryId, duplicateIds } = items[index];
      const linkedEntryIds = duplicateIds?.join(',') || linkingId;

      console.log('linkedEntryIds => ', linkedEntryIds);
      const allLinks = [];
      allLinks.length = 0;
      if (duplicateIds && duplicateIds.length) {
        for (let idIndex = 0; idIndex < duplicateIds.length; idIndex += 1) {
          const id = duplicateIds[idIndex];
          if (id) {
            try {
              console.log(`getting linked entries for ${id} for new id ${entryId}`);
              links = await clientDelivery.getEntries({ links_to_entry: id });
              if (links?.items?.length) {
                console.log(`linked entries for ${id} for => ${entryId} were found`);
                allLinks.push(links.items);
              }
            } catch (error) {
              console.log(`error getting linked entries for ${id} for new id ${entryId} => `, error);
            }
          }
        }
      }

      if (allLinks?.flat().length) {
        items[index].linkedEntryIds = allLinks
          .flat()
          .map((item) => item.sys.id)
          .join(',');
        console.log('found linked items => ', items[index].linkedEntryIds);
        console.log(`linked entries for ${linkedEntryIds} for => ${entryId} were found`);
      } else {
        console.log(`no linked entries for ${linkingId} for => ${entryId} were found`);
      }
    }
    return items;
  }
  return [];
};

const updateEntry = async (linkedEntry, entryId) => {
  try {
    console.log(`updating linked entry => ${linkedEntry.sys.id} for ${entryId}`);
    await linkedEntry.update();
  } catch (error) {
    console.log(`error updating linked entry => ${linkedEntry.sys.id} for ${entryId} => `, error);
  }
};

const findUpdateField = (entry, newField, duplicateIds) => {
  let update = false;
  switch (entry.sys.contentType.sys.id) {
    case 'cardList':
      entry.fields.cards['en-US'] =
        entry?.fields?.cards['en-US']?.map((card) => {
          const currentId = duplicateIds.filter((id) => card.sys.id === id)[0];
          if (currentId) {
            update = true;
            return newField;
          }
          return card;
        }) || undefined;
      break;
    case 'card':
      entry.fields.videoStillImage = { 'en-US': newField };
      update = true;
      break;
    case 'ctaHero': {
      const videoDesktop = entry?.fields?.videoDesktop?.['en-US'];
      const videoMobile = entry?.fields?.videoMobile?.['en-US'];
      if (videoDesktop && duplicateIds.some((id) => id === videoDesktop.sys.id)) {
        entry.fields.videoDesktop['en-US'] = newField;
        update = true;
      }
      if (videoMobile && duplicateIds.some((id) => id === videoMobile.sys.id)) {
        entry.fields.videoMobile['en-US'] = newField;
        update = true;
      }
      break;
    }
    default:
      console.log('Found different content type => ', entry.sys.contentType.sys.id);
      break;
  }
  return { update, entry };
};

const updateLinks = async (linkedEntries, { entryId, duplicateIds }, linkType = 'Entry') => {
  for (let i = 0; i < linkedEntries.items.length; i += 1) {
    const linkedEntry = linkedEntries.items[i];
    const newField = { sys: { type: 'Link', linkType, id: entryId } };

    const { update, entry } = findUpdateField(linkedEntry, newField, duplicateIds);
    if (update) {
      await updateEntry(entry, entryId);
    }
  }
};

const updateLinkedEntries = async (items, linkType = 'Entry') => {
  if (STEPS.updateLinkedEntries) {
    const environment = await environmentManagement;
    if (!environment) {
      console.log('environment not found');
      return;
    }
    for (let index = 0; index < items.length; index += 1) {
      const currentItem = items[index];
      const { entryId, linkedEntryIds } = currentItem;
      if (linkedEntryIds) {
        const linkedEntries = await getLinks(currentItem, environment);
        if (linkedEntries?.items?.length) {
          await updateLinks(linkedEntries, currentItem, linkType);
        } else {
          console.log(`no linked entry items found for => ${linkedEntryIds} for ${entryId}`);
        }
      } else {
        console.log(`no linked entries found for => ${entryId}`);
      }
    }
    console.log('finished updating linked entries');
  }
};

(async () => {
  // Step 1 - Get All Entries
  const entries = await getAllEntries(entriesQuery);
  console.log('entries => ', entries.items.length);

  if (entries.items.length) {
    // Step 2 - Prepare Items
    const preparedItems = prepareItems(entries.items);
    console.log('preparedItems => ', preparedItems.length);

    // Step 3 - Filter Items
    const filteredItems = preparedItems.filter((item) => item);
    console.log('filteredItems => ', filteredItems.length);

    // Step 4 - Fill Duplicates
    const filledItems = fillDuplicateIds(filteredItems);
    console.log('filledItems => ', filledItems.length);
    // console.log('filledItems => ', JSON.stringify(filledItems, null, 2));

    // Step 5 - Get Linked Entries
    const linkedItems = await getLinkedEntries(filledItems);
    console.log('linkedItems => ', linkedItems.length);
    // console.log('linkedItems => ', JSON.stringify(linkedItems, null, 2));

    // Step 6 - Filter Linked Items
    const filteredLinkedItems = linkedItems.filter((item) => item.linkedEntryIds);
    console.log('filteredLinkedItems => ', filteredLinkedItems.length);

    // Step 7 - Update Linked Entries
    await updateLinkedEntries(linkedItems);

    const videoItemIds = filledItems
      .filter((item) => item.stillImageId)
      .map((item) => item.entryId)
      .join(',');
    const videoEntries = await getAllEntries({
      'content_type': 'card',
      'limit': 1000,
      'sys.id[in]': videoItemIds,
      'order': '-sys.createdAt'
    });
    console.log('videoEntries => ', videoEntries.items.length);
    await updateLinkedEntries(
      videoEntries.items.map((item) => ({
        ...item,
        entryId: filledItems.filter((i) => item.sys.id === i.entryId)[0]?.stillImageId,
        linkedEntryIds: item.sys.id
      })),
      'Asset'
    );
  } else {
    console.log('No entries found');
  }
})();
