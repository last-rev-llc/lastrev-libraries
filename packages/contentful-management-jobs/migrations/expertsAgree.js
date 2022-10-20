/* eslint-disable no-param-reassign */
const contentfulFieldsParsers = require('../shared/contentful-fields');

const { createEntryReference } = require('./createEntryReference');
const { createMediaReference } = require('./createMediaReference');

const expertsAgree = {
  items: {
    id: 'experts_agree',
    type: 'CustomParser',
    customParser: async (items, JOB) =>
      Promise.all(
        items.map(async (item) =>
          createEntryReference(JOB, {
            contentType: 'cardExpertAgree',
            fields: ['name', 'link', 'image', 'logo', 'description', 'tooltip_rich_text'],
            entry: {
              name: item?.name,
              link: await createEntryReference(JOB, {
                contentType: 'link',
                fields: ['manual_url'],
                entry: {
                  manual_url: item?.url
                }
              }),
              image: await createMediaReference(JOB, {
                title: item?.image?.alt,
                assetURL: item?.image?.src2x
              }),
              logo: await createMediaReference(JOB, {
                title: item?.logo?.alt,
                assetURL: item?.logo?.src,
                width: item?.logo?.width,
                height: item?.logo?.height
              }),
              description: item?.description,
              ...(item?.tooltip && {
                tooltip_rich_text: await contentfulFieldsParsers.getContentfulFieldValue(
                  item?.tooltip?.map((p) => `<p>${p}</p>`)?.join(''),
                  {
                    type: 'RichText'
                  }
                )
              })
            }
          })
        )
      )
  }
};

module.exports = expertsAgree;
