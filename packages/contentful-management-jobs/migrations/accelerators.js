const contentfulFieldsParsers = require('../shared/contentful-fields');
const { createCard } = require('./createCard');
const { createMediaEntry } = require('./createMediaEntry');

const accelerators = {
  // Accelerators https://preview.contentful.com/spaces/khy5qy7zbpmq/environments/yaml-test/entries/17SMWU8LKtTnB6j2Do7lkn?access_token=ufBVTLIcMVUxgGcMA7EXrNWerJPPbmrEK9Eg-zHDceA
  chart: {
    id: 'chart2x',
    type: 'CustomParser',
    customParser: async (value, JOB) => {
      // console.log('============== chart CustomParser', value);
      const assetId = await contentfulFieldsParsers.getContentfulIdFromString(value);
      // console.log('assetId: ', assetId);
      JOB.relatedEntries.push(
        await createMediaEntry(JOB, assetId, {
          assetURL: value
        })
      );

      const entryObject = await contentfulFieldsParsers.getContentfulFieldValue(assetId, { type: 'Entry' });
      // console.log('entryObject: ', entryObject);
      return entryObject;
    }
  },
  about_rich_text: {
    id: 'about',
    type: 'CustomParser',
    customParser: async (value) => {
      // console.log('============== about_rich_text CustomParser', value);
      return contentfulFieldsParsers.getContentfulFieldValue(value, { type: 'RichText' });
    }
  },
  related_content_title: {
    id: 'related_content.title',
    type: 'CustomParser',
    customParser: async (value) => {
      return contentfulFieldsParsers.getContentfulFieldValue(value, { type: 'Symbol' });
    }
  },
  related_content_list: {
    id: 'related_content.list',
    type: 'CustomParser',
    customParser: async (array, JOB) => {
      const relatedArray = [];
      if (array && array.length > 0) {
        for (let index = 0; index < array.length; index++) {
          const card = array[index];
          const entryId = await contentfulFieldsParsers.getContentfulIdFromString(`${card.title}+${card.link}`);
          card.variant = 'related-content';
          card.asset = {
            id: await contentfulFieldsParsers.getContentfulIdFromString(`${card.img2}`),
            assetURL: card.img2
          };
          card.link = {
            id: await contentfulFieldsParsers.getContentfulIdFromString(`link-${card.link}`),
            manual_url: card.link,
            text: 'View More'
          };

          // Create the card
          const cardRefObject = await contentfulFieldsParsers.getContentfulFieldValue(entryId, { type: 'Entry' });

          JOB.relatedEntries.push(await createCard(JOB, entryId, card));
          // Add the reference array to add to your entry
          relatedArray.push(cardRefObject);
        }
      }
      return relatedArray;
    }
  }
};
module.exports = accelerators;
