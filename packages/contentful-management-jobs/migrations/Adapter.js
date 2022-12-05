/* eslint-disable no-param-reassign */
const contentfulFieldsParsers = require('../shared/contentful-fields');

const { createEntryReference } = require('./createEntryReference');
const { createMediaReference } = require('./createMediaReference');
const { createHero } = require('./createHero');

const adapter = {
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

  sections: {
    id: 'content_with_image',
    type: 'CustomParser',
    customParser: async (items, JOB) =>
      Promise.all(
        items.map(async (item) =>
          createEntryReference(JOB, {
            contentType: 'section',
            fields: ['title', 'link', 'image', 'image_2x', 'order', 'icons_list', 'icon'],
            entry: {
              title: item?.title,
              order: item?.order,
              text_rich_text: await contentfulFieldsParsers.getContentfulFieldValue(
                item?.text?.map((p) => `<p>${p}</p>`)?.join(''),
                {
                  type: 'RichText'
                }
              ),
              link: await createEntryReference(JOB, {
                contentType: 'link',
                fields: ['text', 'manual_url'],
                entry: {
                  text: item?.title,
                  manual_url: item?.learn_more
                }
              }),
              icons_list: await Promise.all(
                item?.icons_list?.map((icon) =>
                  createMediaReference(JOB, {
                    title: icon?.text,
                    assetURL: icon?.icon
                  })
                )
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

  quotes: {
    id: 'quote',
    type: 'CustomParser',
    customParser: async (quotes, JOB) =>
      Promise.all(
        quotes.map(async (quote) =>
          createEntryReference(JOB, {
            contentType: 'quote',
            fields: ['author', 'position', 'quote', 'img'],
            entry: {
              author: quote?.name,
              position: quote?.position,
              quote: quote?.quote,
              img: await createMediaReference(JOB, { name: quote?.name, assetURL: quote.person_default2x })
            }
          })
        )
      )
  },
  logo_list_title: {
    id: 'logo_list.title',
    type: 'Symbol'
  },
  logo_list_button: {
    id: 'logo_list.button.directory',
    type: 'CustomParser',
    customParser: async (item, JOB) =>
      createEntryReference(JOB, {
        contentType: 'link',
        fields: ['text', 'manual_url'],
        entry: {
          text: item?.title,
          manual_url: item?.url
        }
      })
  },
  logo_list_list: {
    id: 'logo_list.list',
    type: 'CustomParser',
    customParser: (items, JOB) =>
      Promise.all(
        items.map(async (item) =>
          createEntryReference(JOB, {
            contentType: 'card',
            fields: ['title', 'link', 'img', 'variant'],
            entry: {
              variant: 'logo-card',
              title: item?.name,
              img: await createMediaReference(JOB, {
                assetURL: item.logo2x || item.logo,
                title: item?.name,
                height: item?.height
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
  request_demo_title: {
    id: 'request_demo.title',
    type: 'Symbol'
  },
  request_demo_link: {
    id: 'request_demo',
    type: 'CustomParser',
    customParser: async (item, JOB) =>
      createEntryReference(JOB, {
        contentType: 'link',
        fields: ['text', 'manual_url'],
        entry: {
          text: item?.title,
          manual_url: item?.url
        }
      })
  },
  form_title: {
    id: 'form.title',
    type: 'Symbol'
  },
  form_subtitle: {
    id: 'form.subtitle',
    type: 'Symbol'
  },
  form_baseUrl: {
    id: 'form.baseUrl',
    type: 'Symbol'
  },
  form_munchkinId: {
    id: 'form.munchkinId',
    type: 'Symbol'
  },
  form_id: {
    id: 'form.id',
    type: 'Symbol'
  }
};

module.exports = adapter;
