/* eslint-disable no-param-reassign */
const contentfulFieldsParsers = require('../shared/contentful-fields');

const { createEntryReference } = require('./createEntryReference');
const { createMediaReference } = require('./createMediaReference');
const { createHero } = require('./createHero');

const mainPageIntegration = {
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
          ...hero,
          buttons: await Promise.all(
            hero?.buttons?.map((button) =>
              createEntryReference(JOB, {
                contentType: 'link',
                fields: ['text', 'manual_url', 'style', 'variant'],
                entry: {
                  text: button?.cta,
                  manual_url: button?.url,
                  style: button?.style
                }
              })
            )
          )
        })
      );
      // Add the reference array to add to your entry
      return entryRef;
    }
  },

  callouts_title: {
    id: 'callouts.title',
    type: 'Symbol'
  },

  callouts_list: {
    id: 'callouts.list',
    type: 'CustomParser',
    customParser: (items, JOB) =>
      Promise.all(
        items.map(async (item) =>
          createEntryReference(JOB, {
            contentType: 'card',
            fields: ['title', 'link', 'img', 'text', 'variant', 'number'],
            entry: {
              variant: 'callout-rating',
              title: item?.name,
              number: item?.rating_value,
              text: item?.content,
              img: await createMediaReference(JOB, {
                assetURL: item.logo2x || item.logo,
                title: item?.name
              }),
              link: await createEntryReference(JOB, {
                contentType: 'link',
                fields: ['manual_url'],
                entry: {
                  manual_url: item?.url
                }
              })
            }
          })
        )
      )
  },

  connectors_title: {
    id: 'connectors.title',
    type: 'Symbol'
  },
  connectors_subtitle: {
    id: 'connectors.subtitle',
    type: 'Symbol'
  },

  sections: {
    id: 'features.content_with_image',
    type: 'CustomParser',
    customParser: async (items, JOB) =>
      Promise.all(
        items.map(async (item) =>
          createEntryReference(JOB, {
            contentType: 'section',
            fields: ['title', 'vertical_alignment', 'image', 'order'],
            entry: {
              title: item?.title,
              order: item?.order,
              vertical_alignment: item?.vertical_alignment,

              image: await createMediaReference(JOB, {
                title: item?.title,
                assetURL: item?.image_2x,
                width: item?.width
              })
            }
          })
        )
      )
  },

  universal_integrations_title: {
    id: 'universal_integrations.title',
    type: 'Symbol'
  },
  universal_integrations_subtitle: {
    id: 'universal_integrations.subtitle',
    type: 'Symbol'
  }

  //
};

module.exports = mainPageIntegration;
