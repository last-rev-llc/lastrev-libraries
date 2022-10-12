/* eslint-disable no-param-reassign */
const contentfulFieldsParsers = require('../shared/contentful-fields');

const { createEntryReference } = require('./createEntryReference');
const { createMediaReference } = require('./createMediaReference');
const { createHero } = require('./createHero');

const resources = {
  hero: {
    id: 'hero',
    type: 'CustomParser',
    customParser: async (hero, JOB) => {
      const entryId = await contentfulFieldsParsers.getContentfulIdFromString(
        `${hero.title}-${hero.subtitle}-${hero.image_src}-${hero.position}-${hero.background}-${hero.alt}`
      );

      // Create the quote
      const entryRef = await contentfulFieldsParsers.getContentfulFieldValue(entryId, { type: 'Entry' });

      JOB.relatedEntries.push(await createHero(JOB, entryId, hero));
      // Add the reference array to add to your entry
      return entryRef;
    }
  },
  hot_topics_title: {
    id: 'hot_topics.title',
    type: 'Symbol'
  },
  hot_topics_list: {
    id: 'hot_topics.list',
    type: 'CustomParser',
    customParser: async (items, JOB) =>
      Promise.all(
        items.map(async (item) =>
          createEntryReference(JOB, {
            contentType: 'cardResource',
            fields: ['title', 'category', 'type', 'link', 'text', 'image'],
            entry: {
              title: item?.title,
              category: item?.category,
              type: item?.type,
              text: item?.text,
              image: await createMediaReference(JOB, {
                title: item?.title,
                assetURL: item.image2x
              }),
              link: await createEntryReference(JOB, {
                contentType: 'link',
                fields: ['manual_url'],
                entry: {
                  manual_url: item?.link
                }
              })
            }
          })
        )
      )
  },
  content_type_filters_title: {
    id: 'content_type_filters.title',
    type: 'Symbol'
  },
  content_type_filters_list: {
    id: 'content_type_filters.list',
    type: 'Symbol'
  },
  solution_filters_title: {
    id: 'solution_filters.title',
    type: 'Symbol'
  },
  solution_filters_list: {
    id: 'solution_filters.list',
    type: 'Symbol'
  },
  resources_title: {
    id: 'resources.title',
    type: 'Symbol'
  },
  resources_list: {
    id: 'resources.list',
    type: 'CustomParser',
    customParser: async (items, JOB) =>
      Promise.all(
        items.map(async (item) =>
          createEntryReference(JOB, {
            contentType: 'cardResource',
            fields: ['title', 'category', 'type', 'link', 'text', 'image'],
            entry: {
              title: item?.title,
              category: item?.category,
              type: item?.type,
              text: item?.text,
              image: await createMediaReference(JOB, {
                title: item?.title,
                assetURL: item.image2x
              }),
              link: await createEntryReference(JOB, {
                contentType: 'link',
                fields: ['manual_url'],
                entry: {
                  manual_url: item?.link
                }
              })
            }
          })
        )
      )
  }
};

module.exports = resources;
