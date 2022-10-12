/* eslint-disable no-param-reassign */
const contentfulFieldsParsers = require('../shared/contentful-fields');

const { createEntryReference } = require('./createEntryReference');
const { createMediaReference } = require('./createMediaReference');
const { createHero } = require('./createHero');

const press = {
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
          buttons: [
            await createEntryReference(JOB, {
              contentType: 'link',
              fields: ['text', 'manual_url'],
              entry: {
                text: hero?.learn_more?.text,
                manual_url: hero?.learn_more?.url
              }
            })
          ]
        })
      );
      // Add the reference array to add to your entry
      return entryRef;
    }
  },
  content_type_filters_list: {
    id: 'content_type_filters.list',
    type: 'Symbol'
  },
  types_recent_announcements: {
    id: 'types.recent_announcements',
    type: 'Symbol'
  },
  types_in_the_news: {
    id: 'types.in_the_news',
    type: 'Symbol'
  },
  types_thought_leadership: {
    id: 'types.thought_leadership',
    type: 'Symbol'
  },
  types_analyst_resources: {
    id: 'types.analyst_resources',
    type: 'Symbol'
  },
  types_media_resources: {
    id: 'types.media_resources',
    type: 'Symbol'
  },

  news: {
    id: 'news',
    type: 'CustomParser',
    customParser: async (items, JOB) =>
      Promise.all(
        items?.map(async (item) =>
          createEntryReference(JOB, {
            contentType: 'collectionNews',
            fields: ['title', 'type', 'items'],
            entry: {
              title: item?.title,
              type: item?.type,
              items: await Promise.all(
                item?.links?.map(async (card) =>
                  createEntryReference(JOB, {
                    contentType: 'cardNew',
                    fields: ['title', 'category', 'date', 'image', 'link'],
                    entry: {
                      title: card?.title,
                      category: card?.category,
                      date: card?.date ? new Date(card?.date).toISOString() : '',
                      image: await createMediaReference(JOB, {
                        title: card?.title,
                        assetURL: card.image2x,
                        width: card?.width
                      }),
                      link: await createEntryReference(JOB, {
                        contentType: 'link',
                        fields: ['manual_url'],
                        entry: {
                          manual_url: card?.link
                        }
                      })
                    }
                  })
                )
              )
            }
          })
        )
      )
  }
};

module.exports = press;
