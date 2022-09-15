const contentfulFieldsParsers = require('../shared/contentful-fields');
const { createMediaEntry } = require('./createMediaEntry');
const { removeEmpty } = require('./removeEmpty');
const { createLinkEntry } = require('./createLinkEntry');

const createCard = async (JOB, entryId, { title, name, text, list, category, asset, link, variant, content }) => {
  let mediaRefObj;
  let linkRefObj;

  if (asset) {
    JOB.relatedEntries.push(await createMediaEntry(JOB, asset.id, asset));
    mediaRefObj = await contentfulFieldsParsers.getContentfulFieldValue(asset.id, { type: 'Entry' });
  }

  if (link) {
    JOB.relatedEntries.push(await createLinkEntry(JOB, link.id, link));
    linkRefObj = await contentfulFieldsParsers.getContentfulFieldValue(link.id, { type: 'Entry' });
  }

  // Create the card
  // function that retunrs an objects without empty keys
  return {
    entryId,
    contentType: 'card',
    contentfulFields: removeEmpty({
      title: {
        'en-US': title
      },
      name: {
        'en-US': name
      },
      text: {
        'en-US': text
      },
      list: {
        'en-US': list
      },
      category: {
        'en-US': category
      },

      link: {
        'en-US': linkRefObj
      },
      img: {
        'en-US': mediaRefObj
      },
      variant: {
        'en-US': variant
      },
      content: {
        'en-US': content
      }
    })
  };
};
exports.createCard = createCard;
