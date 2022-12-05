/* eslint-disable no-param-reassign */
const contentfulFieldsParsers = require('../shared/contentful-fields');

const { createEntryReference } = require('./createEntryReference');
const { createMediaReference } = require('./createMediaReference');
const { createHero } = require('./createHero');

const pageHighered = {
  img: {
    id: 'img2x',
    type: 'CustomParser',
    customParser: async (assetURL, JOB, ogYaml) =>
      createMediaReference(JOB, {
        title: ogYaml?.alt,
        assetURL
      })
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

module.exports = pageHighered;
