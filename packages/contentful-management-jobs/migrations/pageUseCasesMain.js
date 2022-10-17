/* eslint-disable no-param-reassign */
const contentfulFieldsParsers = require('../shared/contentful-fields');

const { createEntryReference } = require('./createEntryReference');
const { createMediaReference } = require('./createMediaReference');
const { createHero } = require('./createHero');

const pageUseCasesMain = {
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
  statbar_size: {
    id: 'statbar.size',
    type: 'Symbol'
  },
  statbar_list: {
    id: 'statbar.list',
    type: 'CustomParser',
    customParser: async (items, JOB) =>
      Promise.all(
        items?.map(async (item) =>
          createEntryReference(JOB, {
            contentType: 'card',
            fields: ['title', 'number', 'img', 'text'],
            entry: {
              variant: 'stat-card',
              title: item?.name,
              text: item?.description,
              img: await createMediaReference(JOB, {
                assetURL: item.logo2x || item.logo,
                title: item?.name,
                height: item?.height
              }),
              number: item?.stat
            }
          })
        )
      )
  },
  function_filters_title: {
    id: 'function_filters.title',
    type: 'Symbol'
  },
  function_filters_list: {
    id: 'function_filters.list',
    type: 'Symbol'
  },
  content_filters_title: {
    id: 'content_filters.title',
    type: 'Symbol'
  },
  content_filters_list: {
    id: 'content_filters.list',
    type: 'Symbol'
  },
  content_filters_types_use_case: {
    id: 'content_filters.types.use_case',
    type: 'Symbol'
  },
  content_filters_types_pre_packaged_solution: {
    id: 'content_filters.types.pre_packaged_solution',
    type: 'Symbol'
  },
  resources_title: {
    id: 'resources.title',
    type: 'Symbol'
  },
  resources_list: {
    id: 'resources.list',
    type: 'CustomParser',
    customParser: (items, JOB) =>
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

  //
  //
  //
};

module.exports = pageUseCasesMain;
