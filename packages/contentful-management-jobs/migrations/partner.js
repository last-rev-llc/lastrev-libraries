const contentfulFieldsParsers = require('../shared/contentful-fields');
const { createCard } = require('./createCard');
const { createQuote } = require('./createQuote');
const { createMediaEntry } = require('./createMediaEntry');

const partner = {
  button_title: {
    id: 'button_title',
    type: 'CustomParser',
    customParser: async (value) => {
      const parsedValue = await contentfulFieldsParsers.getContentfulFieldValue(value, { type: 'Symbol' });
      return parsedValue;
    }
  },
  button_login_title: {
    id: 'button.login.title',
    type: 'CustomParser',
    customParser: async (value) => {
      const parsedValue = await contentfulFieldsParsers.getContentfulFieldValue(value, { type: 'Symbol' });
      return parsedValue;
    }
  },
  img: {
    id: 'image',
    type: 'CustomParser',
    customParser: async (value, JOB) => {
      const assetId = await contentfulFieldsParsers.getContentfulIdFromString(value);
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
  perks_asset: {
    id: 'perks.asset2x',
    type: 'CustomParser',
    customParser: async (value, JOB) => {
      const assetId = await contentfulFieldsParsers.getContentfulIdFromString(value);
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
  perks_list: {
    id: 'perks.list',
    type: 'CustomParser',
    customParser: async (value) => {
      const perksList = await contentfulFieldsParsers.getContentfulFieldValue(value, { type: 'Array' });
      return perksList;
    }
  },
  perks_title: {
    id: 'perks.title',
    type: 'CustomParser',
    customParser: async (value) => {
      const perksTitle = await contentfulFieldsParsers.getContentfulFieldValue(value, { type: 'Symbol' });
      return perksTitle;
    }
  },
  perks_content: {
    id: 'perks.content',
    type: 'CustomParser',
    customParser: async (value) => {
      const perksContent = await contentfulFieldsParsers.getContentfulFieldValue(value, { type: 'Symbol' });
      return perksContent;
    }
  },
  quote: {
    id: 'quote',
    type: 'CustomParser',
    customParser: async (value, JOB) => {
      const quote = value[0];
      const entryId = await contentfulFieldsParsers.getContentfulIdFromString(
        `Quote - ${quote.author} - ${quote.position}`
      );
      const relQuoteObj = await contentfulFieldsParsers.getContentfulFieldValue(entryId, { type: 'Entry' });
      JOB.relatedEntries.push(await createQuote(JOB, entryId, quote));
      return [relQuoteObj];
    }
  },
  logo_list_list: {
    id: 'logo_list.list',
    type: 'CustomParser',
    customParser: async (array, JOB) => {
      const relatedArray = [];
      for (let index = 0; index < array.length; index++) {
        const card = array[index];
        const entryId = await contentfulFieldsParsers.getContentfulIdFromString(`card-${card.url}`);

        // console.log('card.logo2x: ', card.logo2x);
        if (card.logo2x) {
          card.asset = {
            id: await contentfulFieldsParsers.getContentfulIdFromString(card.logo2x),
            assetURL: card.logo2x
          };
        }

        card.link = {
          id: await contentfulFieldsParsers.getContentfulIdFromString(card.url),
          manual_url: card.url,
          text: card.name
        };

        card.title = card.name; // So it has an internal title

        card.variant = 'partner-logo';

        // Create the card
        const cardRefObject = await contentfulFieldsParsers.getContentfulFieldValue(entryId, { type: 'Entry' });

        JOB.relatedEntries.push(await createCard(JOB, entryId, card));
        // Add the reference array to add to your entry
        relatedArray.push(cardRefObject);
      }
      return relatedArray;
    }
  },
  sdk_asset: null
};

module.exports = partner;
