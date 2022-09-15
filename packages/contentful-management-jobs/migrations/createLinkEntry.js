const { removeEmpty } = require('./removeEmpty');

const createLinkEntry = (JOB, entryId, { manual_url, text }) => {
  return {
    entryId,
    contentType: 'link',
    contentfulFields: removeEmpty({
      manual_url: {
        'en-US': manual_url
      },
      text: {
        'en-US': text
      }
    })
  };
};
exports.createLinkEntry = createLinkEntry;
