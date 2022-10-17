/* eslint-disable no-param-reassign */
const contentfulFieldsParsers = require('../shared/contentful-fields');

const { createEntryReference } = require('./createEntryReference');
const { createMediaReference } = require('./createMediaReference');
const { createHero } = require('./createHero');

const pageIpaas = {
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
  },
  links_title: {
    id: 'links.title',
    type: 'Symbol'
  },
  links_list: {
    id: 'links.list',
    type: 'CustomParser',
    customParser: async (items, JOB) =>
      Promise.all(
        items.map(async (item) =>
          createEntryReference(JOB, {
            contentType: 'navigationItem',
            fields: ['internalTitle', 'title', 'sub_navigation', 'variant'],
            entry: {
              variant: 'link-group',
              internalTitle: item?.title,
              title: item?.title,
              sub_navigation: await Promise.all(
                item?.list?.map((link) =>
                  createEntryReference(JOB, {
                    contentType: 'link',
                    fields: ['manual_url', 'text'],
                    entry: {
                      text: link?.title,
                      manual_url: link?.url
                    }
                  })
                )
              )
            }
          })
        )
      )
  },
  cta_video_title: {
    id: 'cta_video.title',
    type: 'Symbol'
  },
  cta_video_description: {
    id: 'cta_video.description',
    type: 'Symbol'
  },
  cta_video_video: {
    id: 'cta_video.video',
    type: 'Symbol'
  },
  callouts_title: {
    id: 'callouts.title',
    type: 'Symbol'
  },
  callouts_subtitle: {
    id: 'callouts.subtitle',
    type: 'Symbol'
  },
  callouts_sub_url: {
    id: 'callouts.sub_url',
    type: 'CustomParser',
    customParser: async (url, JOB) =>
      createEntryReference(JOB, {
        contentType: 'link',
        fields: ['manual_url'],
        entry: {
          manual_url: url
        }
      })
  },
  callouts_video: {
    id: 'callouts.video',
    type: 'Symbol'
  },
  callouts_list: {
    id: 'callouts.list',
    type: 'CustomParser',
    customParser: async (items, JOB) =>
      Promise.all(
        items.map(async (item) =>
          createEntryReference(JOB, {
            contentType: 'card',
            fields: ['title', 'name', 'text', 'link', 'variant', 'img'],
            entry: {
              variant: 'ipaas-callout',
              title: item?.title,
              name: item?.name,
              text: item?.content,

              img: await createMediaReference(JOB, {
                title: item?.title,
                assetURL: item.logo2x
              }),
              link: await createEntryReference(JOB, {
                contentType: 'link',
                fields: ['manual_url', 'text'],
                entry: {
                  text: item?.link_text,
                  manual_url: item?.url
                }
              })
            }
          })
        )
      )
  },
  featured_title: {
    id: 'featured.title',
    type: 'Symbol'
  },
  featured_subtitle: {
    id: 'featured.subtitle',
    type: 'Symbol'
  },
  featured_list: {
    id: 'featured.list',
    type: 'CustomParser',
    customParser: async (items, JOB) =>
      Promise.all(
        items?.map(async (item) =>
          createEntryReference(JOB, {
            contentType: 'quote',
            fields: ['author', 'position', 'iframe', 'company', 'quote', 'link', 'img'],
            entry: {
              author: item?.customer_name,
              position: item?.customer_title,
              company: item?.name,
              quote: item?.quote,
              iframe: true,
              img: await createMediaReference(JOB, {
                title: item?.name,
                assetURL: item.avatar2x,
                width: item?.width
              }),
              link: await createEntryReference(JOB, {
                contentType: 'link',
                fields: ['manual_url', 'text'],
                entry: {
                  text: item?.link?.text,
                  manual_url: item?.link?.url
                }
              })
            }
          })
        )
      )
  },
  experience_title: {
    id: 'experience.title',
    type: 'Symbol'
  },
  experience_subtitle: {
    id: 'experience.subtitle',
    type: 'Symbol'
  },

  experience_sections: {
    id: 'experience.content_with_image',
    type: 'CustomParser',
    customParser: async (items, JOB) =>
      Promise.all(
        items.map(async (item) =>
          createEntryReference(JOB, {
            contentType: 'section',
            fields: ['title', 'order', 'link', 'text_rich_text', 'text', 'image'],
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
                width: item?.width,
                height: item?.height
              }),
              link: await createEntryReference(JOB, {
                contentType: 'link',
                fields: ['manual_url', 'text'],
                entry: {
                  text: item?.learn_more_text,
                  manual_url: item?.learn_more
                }
              })
            }
          })
        )
      )
  },
  performance_title: {
    id: 'performance.title',
    type: 'Symbol'
  },
  performance_text: {
    id: 'performance.text',
    type: 'Symbol'
  },

  performance_columns: {
    id: 'performance.columns',
    type: 'CustomParser',
    customParser: async (items, JOB) =>
      Promise.all(
        items.map(async (item) =>
          createEntryReference(JOB, {
            contentType: 'card',
            fields: ['title', 'variant', 'img', 'text'],
            entry: {
              variant: 'performance-card',
              title: item?.title,
              text: item?.content,
              img: await createMediaReference(JOB, {
                assetURL: item.src,
                title: item?.alt,
                width: item?.width,
                height: item?.height
              })
            }
          })
        )
      )
  },

  articles: {
    id: 'articles',
    type: 'CustomParser',
    customParser: async (items, JOB) =>
      Promise.all(
        items?.map(async (item) =>
          createEntryReference(JOB, {
            contentType: 'card',
            fields: ['title', 'variant', 'img', 'list'],
            entry: {
              variant: 'highered-article',
              title: item?.title,
              img: await createMediaReference(JOB, {
                assetURL: item.img2x,
                title: item?.alt
              }),
              list: item?.list?.map(({ item: i }) => i)
            }
          })
        )
      )
  },

  quote: {
    id: 'quote',
    type: 'CustomParser',
    customParser: async (item, JOB) =>
      createEntryReference(JOB, {
        contentType: 'quote',
        fields: ['author', 'position', 'iframe', 'company', 'quote', 'img'],
        entry: {
          author: item?.customer_name,
          position: item?.customer_title,
          company: item?.name,
          quote: item?.quote,
          iframe: true,
          img: await createMediaReference(JOB, {
            title: item?.name,
            assetURL: item.avatar2x,
            width: item?.width
          })
        }
      })
  },

  advantages_title: {
    id: 'advantages.title',
    type: 'Symbol'
  },
  advantages_subtitle: {
    id: 'advantages.subtitle',
    type: 'Symbol'
  },
  advantages_list: {
    id: 'advantages.list',
    type: 'CustomParser',
    customParser: (items, JOB) =>
      Promise.all(
        items.map(async (item) =>
          createEntryReference(JOB, {
            contentType: 'card',
            fields: ['title', 'text', 'img', 'list'],
            entry: {
              variant: 'highered-advantage',
              title: item?.alt,
              text: item?.text,
              img: await createMediaReference(JOB, {
                assetURL: item.icon,
                title: item?.alt
              }),
              list: item?.items
            }
          })
        )
      )
  },
  logos: {
    id: 'logos',
    type: 'CustomParser',
    customParser: (items, JOB) =>
      Promise.all(
        items.map(async (item) =>
          createMediaReference(JOB, {
            assetURL: item.image,
            title: item?.name,
            width: item?.width
          })
        )
      )
  }

  //
  //
  //
};

module.exports = pageIpaas;
