/* eslint-disable no-param-reassign */
const contentfulFieldsParsers = require('../shared/contentful-fields');

const { createEntryReference } = require('./createEntryReference');
const { createMediaReference } = require('./createMediaReference');
const { createHero } = require('./createHero');

const pricing = {
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

  tabs: {
    id: 'tabs',
    type: 'CustomParser',
    customParser: async (items, JOB) =>
      Promise.all(
        items.map(async (item) =>
          createEntryReference(JOB, {
            contentType: 'pricingTab',
            fields: ['name', 'steps', 'text', 'list'],
            entry: {
              name: item?.name,
              text: item?.text,
              list: item?.list,
              ...(item?.steps && {
                steps: await Promise.all(
                  item?.steps?.map((tab) =>
                    createEntryReference(JOB, {
                      contentType: 'pricingTabStep',
                      fields: ['step_number', 'notice', 'label', 'title', 'text', 'list'],
                      entry: {
                        ...tab
                      }
                    })
                  )
                )
              })
            }
          })
        )
      )
  },
  platform_title: {
    id: 'platform.title',
    type: 'Symbol'
  },
  platform_list: {
    id: 'platform.list',
    type: 'CustomParser',
    customParser: async (items, JOB) =>
      Promise.all(
        items.map(async (item) =>
          createEntryReference(JOB, {
            contentType: 'card',
            fields: ['title', 'id', 'list'],
            entry: {
              title: item?.title,
              id: item?.icon_modifier,
              list: item?.list
            }
          })
        )
      )
  },
  logo_title: {
    id: 'logo.title',
    type: 'Symbol'
  },
  logo_list: {
    id: 'logo.list',
    type: 'CustomParser',
    customParser: async (items, JOB) =>
      Promise.all(
        items.map(async (item) =>
          createEntryReference(JOB, {
            contentType: 'card',
            fields: ['img', 'title', 'link'],
            entry: {
              title: item?.name,
              img: await createMediaReference(JOB, {
                title: item?.name,
                assetURL: item.image,
                width: item?.width
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
  faq_title: {
    id: 'faq.title',
    type: 'Symbol'
  },
  faq_list: {
    id: 'faq.list',
    type: 'CustomParser',
    customParser: async (items, JOB) =>
      Promise.all(
        items.map(async (item) =>
          createEntryReference(JOB, {
            contentType: 'faqCard',
            fields: ['question', 'answer'],
            entry: {
              question: item?.question,
              answer: item?.answer
            }
          })
        )
      )
  }
};

module.exports = pricing;
