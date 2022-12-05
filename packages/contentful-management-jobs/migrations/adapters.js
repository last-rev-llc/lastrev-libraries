/* eslint-disable no-param-reassign */
const contentfulFieldsParsers = require('../shared/contentful-fields');

const { createEntryReference } = require('./createEntryReference');
const { createMediaReference } = require('./createMediaReference');

const adapters = {
  data: {
    id: 'data',
    type: 'CustomParser',
    customParser: async (adaptersMap, JOB) =>
      Promise.all(
        Object.keys(adaptersMap)
          // .slice(0, 1)
          // .slice(0, 50)
          // .slice(50, 100)
          // .slice(100, 150)
          // .slice(150, 200)
          // .slice(200, 250)
          .map(async (slug) => {
            const adapter = adaptersMap[slug];
            createEntryReference(JOB, {
              contentType: 'pageAdapter',
              fields: [
                'slug',
                'meta_description',
                'aggregate_rating_value',
                'aggregate_rating_count',
                'about_description_rich_text',
                'about_automation',
                'key_usecases',
                'related_content',
                'description',
                'quote',
                'operations_tabs'
              ],
              entry: {
                slug,
                meta_description: adapter?.meta_description,
                aggregate_rating_value: adapter?.aggregate_rating?.rating_value,
                aggregate_rating_count: adapter?.aggregate_rating?.review_count,
                about_description_rich_text: adapter?.about?.description
                  ? await contentfulFieldsParsers.getContentfulFieldValue(adapter?.about?.description, {
                      type: 'RichText'
                    })
                  : null,
                about_automation: adapter?.about?.automation,
                related_content: adapter?.related_content
                  ? await Promise.all(
                      adapter?.related_content?.map(async (item) =>
                        createEntryReference(JOB, {
                          contentType: 'card',
                          fields: ['title', 'link', 'img', 'category', 'variant'],
                          entry: {
                            variant: 'usecase-related-content',
                            title: item?.title,
                            category: item?.category,
                            img: await createMediaReference(JOB, {
                              assetURL: item.img2x || item.img,
                              title: item?.title
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
                  : null,
                key_usecases: adapter?.key_usecases
                  ? await Promise.all(
                      adapter?.key_usecases.map(async (collection) =>
                        createEntryReference(JOB, {
                          contentType: 'collectionUseCases',
                          fields: ['title', 'items', 'learn_more', 'embed_video_text', 'embed_video_url'],
                          entry: {
                            title: collection?.name,
                            embed_video_url: collection?.embed_video?.url,
                            embed_video_text: collection?.embed_video?.text,
                            items: await Promise.all(
                              collection.cards.map(async (item) =>
                                createEntryReference(JOB, {
                                  contentType: 'cardUseCase',
                                  fields: ['title', 'description'],
                                  entry: {
                                    title: item?.title,
                                    description: item?.description
                                  }
                                })
                              )
                            ),
                            learn_more: collection?.learn_more
                              ? await createEntryReference(JOB, {
                                  contentType: 'link',
                                  fields: ['manual_url', 'text'],
                                  entry: {
                                    manual_url: collection?.learn_more?.url,
                                    text: collection?.learn_more?.text
                                  }
                                })
                              : null
                          }
                        })
                      )
                    )
                  : null,
                description: adapter?.description,
                quote: adapter?.quote
                  ? await createEntryReference(JOB, {
                      contentType: 'quote',
                      fields: ['author', 'company', 'quote'],
                      entry: {
                        author: adapter?.quote?.author,
                        company: adapter?.quote?.company,
                        quote: adapter?.quote?.text
                      }
                    })
                  : null,
                operations_tabs: adapter?.operations?.tabs
                  ? await Promise.all(
                      adapter?.operations?.tabs?.map(async (tab) =>
                        createEntryReference(JOB, {
                          contentType: 'adapterOperationTab',
                          fields: ['name', 'title', 'triggers', 'actions'],
                          entry: {
                            name: tab?.name,
                            title: tab?.title,
                            triggers: await Promise.all(
                              tab?.triggers.map(async (trigger) =>
                                createEntryReference(JOB, {
                                  contentType: 'adapterAction',
                                  fields: ['title', 'description'],
                                  entry: {
                                    title: trigger?.title,
                                    text: trigger?.description
                                  }
                                })
                              )
                            ),
                            actions: await Promise.all(
                              tab?.actions.map(async (action) =>
                                createEntryReference(JOB, {
                                  contentType: 'adapterAction',
                                  fields: ['title', 'description'],
                                  key: {
                                    title: action?.title,
                                    text: action?.description
                                  },
                                  entry: {
                                    title: action?.title,
                                    description: action?.description
                                  }
                                })
                              )
                            )
                          }
                        })
                      )
                    )
                  : null
              }
            });
          })
      )
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

module.exports = adapters;
