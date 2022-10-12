/* eslint-disable no-param-reassign */
const contentfulFieldsParsers = require('../shared/contentful-fields');

const { createEntryReference } = require('./createEntryReference');
const { createMediaReference } = require('./createMediaReference');
const { createHero } = require('./createHero');

const platform = {
  hero: {
    id: 'hero',
    type: 'CustomParser',
    customParser: async (hero, JOB) => {
      const entryId = await contentfulFieldsParsers.getContentfulIdFromString(
        `${hero.title}-${hero.subtitle}-${hero.image_src}-${hero.position}-${hero.background}-${hero.alt}`
      );

      // Create the hero
      const entryRef = await contentfulFieldsParsers.getContentfulFieldValue(entryId, { type: 'Entry' });

      JOB.relatedEntries.push(
        await createHero(JOB, entryId, {
          ...hero,
          buttons: await Promise.all(
            hero?.buttons?.map((link) =>
              createEntryReference(JOB, {
                contentType: 'link',
                fields: ['text', 'manual_url', 'variant'],
                entry: {
                  text: link?.cta,
                  manual_url: link?.url,
                  variant: link?.style
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
  tabs: {
    id: 'tabs',
    type: 'CustomParser',
    customParser: async (items, JOB) =>
      Promise.all(
        items?.map(async (item) =>
          createEntryReference(JOB, {
            contentType: 'tabPlatform',
            fields: [
              'title',
              'id',
              'description_title',
              'description',
              'difference',
              'advantages',
              'image',
              'image2x',
              'head_title',
              'head_subtitle',
              'column_title',
              'leaders_title'
            ],
            entry: {
              title: item?.title,
              id: item?.id,
              description_title: item?.description_title,
              description: item?.description,
              difference: item?.difference,
              advantages: item?.advantages,
              image: await createMediaReference(JOB, {
                title: item?.title,
                assetURL: item.image2x
              }),

              head_title: item?.head_title,
              head_subtitle: item?.head_subtitle,
              column_title: item?.column_title,
              leaders_title: item?.leaders_title
            }
          })
        )
      )
  }
};

module.exports = platform;
