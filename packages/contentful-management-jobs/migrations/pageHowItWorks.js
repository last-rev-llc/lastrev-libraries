/* eslint-disable no-param-reassign */
const contentfulFieldsParsers = require('../shared/contentful-fields');

const { createEntryReference } = require('./createEntryReference');

const { createHero } = require('./createHero');
const { createMediaReference } = require('./createMediaReference');

const pageHowItWorks = {
  hero: {
    id: 'hero',
    type: 'CustomParser',
    customParser: async (hero, JOB) => {
      const entryId = await contentfulFieldsParsers.getContentfulIdFromString(
        `${hero.title}-${hero.subtitle}-${hero.image_src}-${hero.position}-${hero.background}-${hero.alt}`
      );

      // Create the quote
      const entryRef = await contentfulFieldsParsers.getContentfulFieldValue(entryId, { type: 'Entry' });

      JOB.relatedEntries.push(
        await createHero(JOB, entryId, {
          ...hero
        })
      );
      // Add the reference array to add to your entry
      return entryRef;
    }
  },

  card_title: {
    id: 'card.title',
    type: 'Symbol'
  },
  card_text: {
    id: 'card.text',
    type: 'Symbol'
  },
  card_columns: {
    id: 'card.columns',
    type: 'CustomParser',
    customParser: async (items, JOB) =>
      Promise.all(
        items?.map(async (item) =>
          createEntryReference(JOB, {
            contentType: 'card',
            fields: ['title', 'id', 'list'],
            entry: {
              variant: 'how-it-works',
              title: item?.title,
              list: item?.details
            }
          })
        )
      )
  },
  examples_title: {
    id: 'examples.title',
    type: 'Symbol'
  },
  examples_subtitle: {
    id: 'examples.subtitle',
    type: 'Symbol'
  },
  examples_tabs: {
    id: 'examples.tabs',
    type: 'CustomParser',
    customParser: async (items, JOB) =>
      Promise.all(
        items?.map(async (item) =>
          createEntryReference(JOB, {
            contentType: 'card',
            fields: ['title', 'img'],
            entry: {
              variant: 'example',
              title: item?.name,
              img: await createMediaReference(JOB, {
                assetURL: item.img,
                title: item?.alt,
                height: item?.height
              })
            }
          })
        )
      )
  },
  test_title: {
    id: 'test.title',
    type: 'Symbol'
  },
  test_preheader: {
    id: 'test.preheader',
    type: 'Symbol'
  }
};

module.exports = pageHowItWorks;
