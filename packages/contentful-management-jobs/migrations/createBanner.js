/* eslint-disable camelcase */
const contentfulFieldsParsers = require('../shared/contentful-fields');
const { createMediaEntry } = require('./createMediaEntry');
const { removeEmpty } = require('./removeEmpty');
const { createLinkEntry } = require('./createLinkEntry');

const createBanner = async (
  JOB,
  entryId,
  // eslint-disable-next-line camelcase
  { text, image, image_2x, link }
) => {
  let mediaRefObj;
  let linkRefObj;
  const assetURL = image_2x || image;
  if (assetURL) {
    const imgId = await contentfulFieldsParsers.getContentfulIdFromString(assetURL);
    JOB.relatedEntries.push(
      await createMediaEntry(JOB, imgId, {
        assetURL
      })
    );
    mediaRefObj = await contentfulFieldsParsers.getContentfulFieldValue(imgId, { type: 'Entry' });
  }

  if (link) {
    const linkId = await contentfulFieldsParsers.getContentfulIdFromString(link);
    JOB.relatedEntries.push(
      await createLinkEntry(JOB, linkId, {
        manual_url: link
      })
    );
    linkRefObj = await contentfulFieldsParsers.getContentfulFieldValue(linkId, { type: 'Entry' });
  }

  // Create the card
  // function that retunrs an objects without empty keys
  return {
    entryId,
    contentType: 'banner',
    contentfulFields: removeEmpty({
      text: {
        'en-US': text
      },
      link: {
        'en-US': linkRefObj
      },
      image: {
        'en-US': mediaRefObj
      }
    })
  };
};

exports.createBanner = createBanner;
