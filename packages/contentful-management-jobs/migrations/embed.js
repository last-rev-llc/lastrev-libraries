/* eslint-disable no-param-reassign */
const contentfulFieldsParsers = require('../shared/contentful-fields');

const { createEntryReference } = require('./createEntryReference');
const { createMediaReference } = require('./createMediaReference');
const { createHero } = require('./createHero');

const embed = {
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
  logos: {
    id: 'logo',
    type: 'CustomParser',
    customParser: (items, JOB) =>
      Promise.all(
        items.map(async (item) =>
          createEntryReference(JOB, {
            contentType: 'card',
            fields: ['id', 'title', 'text', 'link', 'img', 'list', 'variant'],
            entry: {
              ...item,
              variant: 'logo-link',
              id: item?.title_modifier,
              title: item?.name,
              img: await createMediaReference(JOB, {
                assetURL: item.image,
                width: item?.width,
                title: item?.name,
                variant: item?.oversized ? 'oversized' : ''
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

  leading_products_title: {
    id: 'leading_products.title',
    type: 'Symbol'
  },

  leading_products_quotes: {
    id: 'leading_products.quotes',
    type: 'CustomParser',
    customParser: async (items, JOB) =>
      Promise.all(
        items.map(async (item) =>
          createEntryReference(JOB, {
            contentType: 'quote',
            fields: ['author', 'position', 'quote', 'img'],
            entry: {
              author: item?.name,
              position: item?.position,
              quote: item?.quote,
              img: await createMediaReference(JOB, {
                title: item?.name,
                assetURL: item.person_default2x,
                width: item?.width
              })
            }
          })
        )
      )
  },

  solution_title: {
    id: 'solution.title',
    type: 'Symbol'
  },

  solution_sections: {
    id: 'solution.content_with_image',
    type: 'CustomParser',
    customParser: async (items, JOB) =>
      Promise.all(
        items.map(async (item) =>
          createEntryReference(JOB, {
            contentType: 'section',
            fields: ['title', 'order', 'text_rich_text', 'text', 'image'],
            entry: {
              title: item?.title,
              order: item?.order,
              text_rich_text: await contentfulFieldsParsers.getContentfulFieldValue(
                item?.text?.map((p) => `<p>${p}</p>`)?.join(''),
                {
                  type: 'RichText'
                }
              ),
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

  experts_title: {
    id: 'experts.title',
    type: 'Symbol'
  },
  start_title: {
    id: 'start.title',
    type: 'Symbol'
  },

  ebooks_title: {
    id: 'ebooks.title',
    type: 'Symbol'
  },
  ebooks_size: {
    id: 'ebooks.size',
    type: 'Symbol'
  },
  ebooks_list: {
    id: 'ebooks.list',
    type: 'CustomParser',
    customParser: async (items, JOB) =>
      Promise.all(
        items.map(async (item) =>
          createEntryReference(JOB, {
            contentType: 'card',
            fields: ['title', 'link', 'img', 'variant'],
            entry: {
              variant: 'ebook-link',
              title: item?.title,
              img: await createMediaReference(JOB, {
                title: item?.title,
                assetURL: item.img
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
  }
};

module.exports = embed;
