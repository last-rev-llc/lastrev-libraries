/* eslint-disable no-param-reassign */
const contentfulFieldsParsers = require('../shared/contentful-fields');
const { createCard } = require('./createCard');
const { createEditionTab } = require('./createEditionTab');
const { createMediaEntry } = require('./createMediaEntry');

const editions = {
  image: {
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
      return entryObject;
    }
  },
  steps_title: {
    id: 'steps.title',
    type: 'Symbol'
  },
  steps_list: {
    id: 'steps.list',
    type: 'CustomParser',
    customParser: (cards, JOB) =>
      Promise.all(
        cards.map(async (card) => {
          const entryId = await contentfulFieldsParsers.getContentfulIdFromString(`card-${card.title}-${card.number}`);

          card.title = card.title; // So it has an internal title
          card.variant = 'edition-step';

          // Create the card
          const cardRefObject = await contentfulFieldsParsers.getContentfulFieldValue(entryId, { type: 'Entry' });

          JOB.relatedEntries.push(await createCard(JOB, entryId, card));
          // Add the reference array to add to your entry
          return cardRefObject;
        })
      )
  },
  tabs: {
    id: 'tabs',
    type: 'CustomParser',
    customParser: async (array, JOB, yamlObj) =>
      Promise.all(
        array.map(async (tab) => {
          const entryId = await contentfulFieldsParsers.getContentfulIdFromString(tab.name);
          JOB.relatedEntries.push(
            await createEditionTab(JOB, entryId, {
              name: tab.name,
              functions: tab.functions
            })
          );

          return contentfulFieldsParsers.getContentfulFieldValue(entryId, { type: 'Entry' });
        })
      )
  },
  callouts_title: {
    id: 'callouts.title',
    type: 'Symbol'
  },
  callouts_list: {
    id: 'callouts.list',
    type: 'CustomParser',
    customParser: (cards, JOB) =>
      Promise.all(
        cards.map(async (card) => {
          const entryId = await contentfulFieldsParsers.getContentfulIdFromString(
            `card-${card.name}-${card.content}-${card.url}-${card.logo}`
          );

          card.title = card.name; // So it has an internal title
          card.text = card.content;
          card.variant = 'edition-step';

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

          // Create the card
          const cardRefObject = await contentfulFieldsParsers.getContentfulFieldValue(entryId, { type: 'Entry' });

          JOB.relatedEntries.push(await createCard(JOB, entryId, card));
          // Add the reference array to add to your entry
          return cardRefObject;
        })
      )
  }
};

module.exports = editions;
