const contentfulFieldsParsers = require('../shared/contentful-fields');
const { createCard } = require('./createCard');
const { createQuote } = require('./createQuote');
const { createMediaEntry } = require('./createMediaEntry');

const partner = {
  description_rich_text: {
    id: 'description',
    type: 'CustomParser',
    customParser: async (value) => {
      return contentfulFieldsParsers.getContentfulFieldValue(value, { type: 'RichText' });
    }
  },
  button_title: {
    id: 'button.title',
    type: 'Symbol'
  },

  button_login_title: {
    id: 'button.login.title',
    type: 'CustomParser',
    customParser: async (value) => {
      const parsedValue = await contentfulFieldsParsers.getContentfulFieldValue(value, { type: 'Symbol' });
      return parsedValue;
    }
  },
  button_login_url: {
    id: 'button.login.url',
    type: 'Symbol'
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
  quotes: {
    id: 'quotes',
    type: 'CustomParser',
    customParser: async (value, JOB) => {
      return Promise.all(
        value.map(async (quote) => {
          const entryId = await contentfulFieldsParsers.getContentfulIdFromString(
            `Quote - ${quote.author} - ${quote.position} - ${quote.text}}`
          );
          const relQuoteObj = await contentfulFieldsParsers.getContentfulFieldValue(entryId, { type: 'Entry' });

          JOB.relatedEntries.push(await createQuote(JOB, entryId, { ...quote, img: quote.avatar2x }));
          return relQuoteObj;
        })
      );
    }
  },
  logo_list_title: {
    id: 'logo_list.title',
    type: 'Symbol'
  },
  logo_list_button_title: {
    id: 'logo_list.button.directory.title',
    type: 'Symbol'
  },
  logo_list_button_url: {
    id: 'logo_list.button.directory.url',
    type: 'Symbol'
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
        const logo = card.logo2x || card.logo;
        if (logo) {
          card.asset = {
            id: await contentfulFieldsParsers.getContentfulIdFromString(logo),
            assetURL: logo,
            height: card.height,
            width: card.width
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
  form_title: {
    id: 'form.title',
    type: 'Symbol'
  },
  form_subtitle: {
    id: 'form.subtitle',
    type: 'Symbol'
  },
  form_base_url: {
    id: 'form.baseUrl',
    type: 'Symbol'
  },
  form_munchkinId: {
    id: 'form.munchkinId',
    type: 'Symbol'
  },
  form_id: {
    id: 'form.id',
    type: 'Symbol'
  },
  sdk_content: {
    id: 'sdk.content',
    type: 'Text'
  },
  sdk_button_title: {
    id: 'sdk.button.title',
    type: 'Symbol'
  },
  sdk_button_url: {
    id: 'sdk.button.url',
    type: 'Symbol'
  },
  sdk_asset: {
    id: 'sdk.asset2x',
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
  }
};

module.exports = partner;
