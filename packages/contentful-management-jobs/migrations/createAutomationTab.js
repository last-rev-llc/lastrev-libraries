const contentfulFieldsParsers = require('../shared/contentful-fields');
const { createMediaEntry } = require('./createMediaEntry');
const { removeEmpty } = require('./removeEmpty');
const { createLinkEntry } = require('./createLinkEntry');
const { createQuote } = require('./createQuote');

const createAutomationTab = async (
  JOB,
  entryId,
  // eslint-disable-next-line camelcase
  { name, link, details, words, img, quote }
) => {
  let mediaRefObj;
  let linkRefObj;
  let quoteRefObj;

  if (img) {
    const imgId = await contentfulFieldsParsers.getContentfulIdFromString(img);
    JOB.relatedEntries.push(
      await createMediaEntry(JOB, imgId, {
        assetURL: img
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
  if (quote) {
    const quoteId = await contentfulFieldsParsers.getContentfulIdFromString(JSON.stringify(quote));
    JOB.relatedEntries.push(await createQuote(JOB, quoteId, quote));
    quoteRefObj = await contentfulFieldsParsers.getContentfulFieldValue(quoteId, { type: 'Entry' });
  }

  // Create the card
  // function that retunrs an objects without empty keys
  return {
    entryId,
    contentType: 'tab',
    contentfulFields: removeEmpty({
      name: {
        'en-US': name
      },
      link: {
        'en-US': linkRefObj
      },
      details: {
        'en-US': details
      },
      words: {
        'en-US': words
      },
      img: {
        'en-US': mediaRefObj
      },
      quote: {
        'en-US': quoteRefObj
      }
    })
  };
};
exports.createAutomationTab = createAutomationTab;
