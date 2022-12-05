/* eslint-disable no-param-reassign */
const contentfulFieldsParsers = require('../shared/contentful-fields');
const { createCard } = require('./createCard');
const { createCollection } = require('./createCollection');
const { createQuote } = require('./createQuote');
const { createMediaEntry } = require('./createMediaEntry');

const workbot = {
  video_id: {
    id: 'video_id',
    type: 'Symbol'
  },

  trusted_by_title: {
    id: 'trusted_by.title',
    type: 'Symbol'
  },
  trusted_by_video_id: {
    id: 'trusted_by.video.id',
    type: 'Symbol'
  },
  trusted_by_video_title: {
    id: 'trusted_by.video.title',
    type: 'Symbol'
  },
  trusted_by_companies: {
    id: 'trusted_by.companies',
    type: 'CustomParser',
    customParser: (cards, JOB) =>
      Promise.all(
        cards.map(async (logo) => {
          const assetId = await contentfulFieldsParsers.getContentfulIdFromString(logo.img);
          JOB.relatedEntries.push(
            await createMediaEntry(JOB, assetId, {
              assetURL: logo.img,
              title: logo.name,
              width: logo.width,
              height: logo.height,
              variant: logo.oversized ? 'oversized' : ''
            })
          );

          const entryObject = await contentfulFieldsParsers.getContentfulFieldValue(assetId, { type: 'Entry' });
          return entryObject;
        })
      )
  },
  entrance_title: {
    id: 'entrance.title',
    type: 'Symbol'
  },
  entrance_subtitle: {
    id: 'entrance.subtitle',
    type: 'Symbol'
  },
  entrance_features: {
    id: 'entrance.features',
    type: 'CustomParser',
    customParser: (collections, JOB) =>
      Promise.all(
        collections.map(async (collection) => {
          const entryId = await contentfulFieldsParsers.getContentfulIdFromString(
            `collection-${collection.title}-${collection.text}-${collection.img}`
          );

          const img = collection.img2x || collection.img;
          if (img) {
            collection.asset = {
              id: await contentfulFieldsParsers.getContentfulIdFromString(img),
              assetURL: img,
              width: collection.width,
              height: collection.height
            };
          }

          collection.title = collection.title; // So it has an internal title
          collection.text_rich_text = await contentfulFieldsParsers.getContentfulFieldValue(collection.text, {
            type: 'RichText'
          });
          collection.variant = 'features';
          collection.items = await Promise.all(
            collection.examples?.map(async (card) => {
              const cardEntryId = await contentfulFieldsParsers.getContentfulIdFromString(
                `card-${card.title}-${card.img}-${card.description}`
              );

              card.title = card.title; // So it has an internal title
              card.text = card.description; // So it has an internal title
              card.variant = 'feature-example';

              const cardImg = card.img2x || card.img;
              if (cardImg) {
                card.asset = {
                  id: await contentfulFieldsParsers.getContentfulIdFromString(cardImg),
                  assetURL: cardImg,
                  width: card.width,
                  height: card.height
                };
              }

              // Create the card
              const cardRefObject = await contentfulFieldsParsers.getContentfulFieldValue(cardEntryId, {
                type: 'Entry'
              });

              JOB.relatedEntries.push(await createCard(JOB, cardEntryId, card));
              // Add the reference array to add to your entry
              return cardRefObject;
            })
          );
          // Create the collection
          const collectionRefObject = await contentfulFieldsParsers.getContentfulFieldValue(entryId, { type: 'Entry' });

          JOB.relatedEntries.push(await createCollection(JOB, entryId, collection));
          // Add the reference array to add to your entry
          return collectionRefObject;
        })
      )
  },
  apps_title: {
    id: 'apps.title',
    type: 'Symbol'
  },
  apps_subtitle: {
    id: 'apps.subtitle',
    type: 'Symbol'
  },
  apps_items: {
    id: 'apps.items',
    type: 'CustomParser',
    customParser: (cards, JOB) =>
      Promise.all(
        cards.map(async (card) => {
          const entryId = await contentfulFieldsParsers.getContentfulIdFromString(
            `card-${card.name}-${card.img}-${card.width}`
          );

          const img = card.img2x || card.img;
          if (img) {
            card.asset = {
              id: await contentfulFieldsParsers.getContentfulIdFromString(img),
              assetURL: img,
              width: card.width,
              height: card.height
            };
          }

          // card.title = card.name; // So it has an internal title
          card.list = card.features;
          card.variant = 'company';

          // Create the card
          const cardRefObject = await contentfulFieldsParsers.getContentfulFieldValue(entryId, { type: 'Entry' });

          JOB.relatedEntries.push(await createCard(JOB, entryId, card));
          // Add the reference array to add to your entry
          return cardRefObject;
        })
      )
  },

  quote: {
    id: 'quote',
    type: 'CustomParser',
    customParser: async (quoteYaml, JOB) => {
      const quote = {
        // ...quoteYaml,
        author: quoteYaml.author,
        position: quoteYaml.position,
        quote: quoteYaml.text,
        company: quoteYaml.company
      };
      const entryId = await contentfulFieldsParsers.getContentfulIdFromString(
        `quote-${quoteYaml.author}-${quoteYaml.text}`
      );

      // console.log('card.logo2x: ', quoteYaml.avatar2x);
      if (quoteYaml.avatar2x) {
        quote.img = quoteYaml.avatar2x;
        // quote.img = {
        //   id: await contentfulFieldsParsers.getContentfulIdFromString(quoteYaml.avatar2x),
        //   assetURL: quoteYaml.avatar2x
        // };
      }

      // Create the quote
      const quoteRefObject = await contentfulFieldsParsers.getContentfulFieldValue(entryId, { type: 'Entry' });

      JOB.relatedEntries.push(await createQuote(JOB, entryId, quote));
      // Add the reference array to add to your entry
      return quoteRefObject;
    }
  }
};

module.exports = workbot;
