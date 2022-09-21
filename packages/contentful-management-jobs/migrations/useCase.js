/* eslint-disable no-param-reassign */
const contentfulFieldsParsers = require('../shared/contentful-fields');
const { createCard } = require('./createCard');
const { createQuote } = require('./createQuote');
const { createMediaEntry } = require('./createMediaEntry');

const useCase = {
  statbar_size: {
    id: 'statbar.size',
    type: 'Symbol'
  },
  statbar_list: {
    id: 'statbar.list',
    type: 'CustomParser',
    customParser: (list, JOB) =>
      Promise.all(
        list.map(async (card) => {
          const entryId = await contentfulFieldsParsers.getContentfulIdFromString(
            `card-${card.name}-${card.stat}-${card.description}-${card.logo}`
          );

          const logo = card.logo2x || card.logo;
          if (logo) {
            card.asset = {
              id: await contentfulFieldsParsers.getContentfulIdFromString(logo),
              assetURL: logo
            };
          }

          card.title = card.name; // So it has an internal title
          card.number = card.stat;
          card.text = card.description;
          card.variant = 'use-case-stat';

          // Create the card
          const cardRefObject = await contentfulFieldsParsers.getContentfulFieldValue(entryId, { type: 'Entry' });

          JOB.relatedEntries.push(await createCard(JOB, entryId, card));
          // Add the reference array to add to your entry
          return cardRefObject;
        })
      )
  },
  logos: {
    id: 'logos',
    type: 'CustomParser',
    customParser: (list, JOB) =>
      Promise.all(
        list.map(async (logo) => {
          const assetId = await contentfulFieldsParsers.getContentfulIdFromString(logo.image);
          JOB.relatedEntries.push(
            await createMediaEntry(JOB, assetId, {
              assetURL: logo.image,
              title: logo.name,
              width: logo.width,
              height: logo.height,
              variant: logo.oversized ? 'oversized' : ''
            })
          );

          const entryObject = await contentfulFieldsParsers.getContentfulFieldValue(assetId, { type: 'Entry' });
          // console.log('entryObject: ', entryObject);
          return entryObject;
        })
      )
  },
  cases_title: {
    id: 'cases.title',
    type: 'Symbol'
  },
  cases_list: {
    id: 'cases.list',
    type: 'CustomParser',
    customParser: (list, JOB) =>
      Promise.all(
        list.map(async (card) => {
          const entryId = await contentfulFieldsParsers.getContentfulIdFromString(
            `card-${card.title}-${card.url}-${card.asset2x}`
          );

          const asset = card.asset2x || card.asset;
          if (asset) {
            card.asset = {
              id: await contentfulFieldsParsers.getContentfulIdFromString(asset),
              assetURL: asset
            };
          }

          card.list = card.bullets;
          card.variant = 'use-case';
          card.link = {
            id: await contentfulFieldsParsers.getContentfulIdFromString(card.url),
            manual_url: card.url
          };

          // Create the card
          const cardRefObject = await contentfulFieldsParsers.getContentfulFieldValue(entryId, { type: 'Entry' });

          JOB.relatedEntries.push(await createCard(JOB, entryId, card));
          // Add the reference array to add to your entry
          return cardRefObject;
        })
      )
  },
  key_features_title: {
    id: 'key_features.title',
    type: 'Symbol'
  },
  key_features_features: {
    id: 'key_features.features',
    type: 'CustomParser',
    customParser: (list, JOB) =>
      Promise.all(
        list.map(async (card) => {
          const entryId = await contentfulFieldsParsers.getContentfulIdFromString(
            `card-${card.number}-${card.title}-${card.description}-${card.url}`
          );

          card.text = card.description;
          card.variant = 'key-feature';
          card.link = {
            id: await contentfulFieldsParsers.getContentfulIdFromString(card.url),
            manual_url: card.url
          };

          // Create the card
          const cardRefObject = await contentfulFieldsParsers.getContentfulFieldValue(entryId, { type: 'Entry' });

          JOB.relatedEntries.push(await createCard(JOB, entryId, card));
          // Add the reference array to add to your entry
          return cardRefObject;
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
    customParser: (list, JOB) =>
      Promise.all(
        list.map(async (card) => {
          const entryId = await contentfulFieldsParsers.getContentfulIdFromString(
            `card-${card.title}-${card.url}-${card.logo2x}`
          );

          const logo = card.logo2x || card.logo;
          if (logo) {
            card.asset = {
              id: await contentfulFieldsParsers.getContentfulIdFromString(logo),
              assetURL: logo
            };
          }

          card.title = card.name;
          card.text = card.content;
          card.variant = 'use-case-callout';
          card.link = {
            id: await contentfulFieldsParsers.getContentfulIdFromString(card.url),
            manual_url: card.url
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

module.exports = useCase;
