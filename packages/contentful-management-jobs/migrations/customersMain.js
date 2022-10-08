/* eslint-disable no-param-reassign */
const { createEntryReference } = require('./createEntryReference');
const { createMediaReference } = require('./createMediaReference');

const customersMain = {
  featured_title: {
    id: 'featured.title',
    type: 'Symbol'
  },

  featured_list: {
    id: 'featured.list',
    type: 'CustomParser',
    customParser: async (customersFeatured, JOB) =>
      Promise.all(
        customersFeatured.map(async (customerFeatured) =>
          createEntryReference(JOB, {
            contentType: 'cardCustomerFeatured',
            fields: [
              'name',
              'customer_name',
              'customer_title',
              'quote',
              'iframe',
              'video_id',
              'avatar',
              'statbar_size',
              'statbar_list'
            ],
            entry: {
              ...customerFeatured,
              avatar: await createMediaReference(JOB, { assetURL: customerFeatured.avatar2x }),
              statbar_size: customerFeatured?.statbar?.size,
              statbar_list: await Promise.all(
                customerFeatured.statbar?.list?.map((stat) =>
                  createEntryReference(JOB, {
                    contentType: 'card',
                    fields: ['number', 'text'],
                    entry: {
                      ...stat,
                      number: stat?.stat,
                      text: stat?.description
                    }
                  })
                )
              )
            }
          })
        )
      )
  },

  logos: {
    id: 'logos.col',
    type: 'CustomParser',
    customParser: async (logoColumns, JOB) =>
      Promise.all(
        logoColumns.map(async (logoColumn) =>
          createEntryReference(JOB, {
            contentType: 'logoColumnCustomerMainPage',
            fields: ['col'],
            entry: {
              col: await Promise.all(
                logoColumn?.map((logo) => createMediaReference(JOB, { assetURL: logo.img_url, title: logo.name })) ?? []
              )
            }
          })
        )
      )
  },
  department_filters_title: {
    id: 'department_filters.title',
    type: 'Symbol'
  },
  department_filters_list: {
    id: 'department_filters.list',
    type: 'Symbol'
  },
  industry_filters_title: {
    id: 'industry_filters.title',
    type: 'Symbol'
  },
  industry_filters_list: {
    id: 'industry_filters.list',
    type: 'Symbol'
  },
  stories: {
    id: 'stories',
    type: 'CustomParser',
    customParser: async (stories, JOB) =>
      Promise.all(
        Object.keys(stories).map(async (customerId) => {
          const customerStory = stories[customerId];
          return createEntryReference(JOB, {
            contentType: 'cardCustomerStory',
            fields: [
              'id',
              'name',
              'preview_iframe',
              'preview_video_id',
              'preview_url',
              'preview_title',
              'preview_logo',
              'preview_tags'
            ],
            entry: {
              ...customerStory,
              id: customerId,
              preview_iframe: customerStory.preview.iframe,
              preview_video_id: customerStory.preview.video_id,
              preview_url: customerStory.preview.url,
              preview_title: customerStory.preview.title,
              preview_logo: await createMediaReference(JOB, {
                title: customerStory?.name,
                assetURL: customerStory?.preview?.logo,
                height: customerStory?.preview?.height
              }),
              preview_tags: await createEntryReference(JOB, {
                contentType: 'tagCustomer',
                fields: ['department', 'industry', 'type'],
                entry: {
                  department: customerStory?.preview?.tags?.department,
                  industry: customerStory?.preview?.tags?.industry,
                  type: customerStory?.preview?.tags?.type
                }
              })
            }
          });
        })
      )
  }
};

module.exports = customersMain;
