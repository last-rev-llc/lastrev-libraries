const { chunk } = require('lodash');

const publishEntries = async (CONTENTFUL_ENVIRONMENT, entries) => {
  const entryChunks = chunk(entries, 200);

  const actionsChunk = chunk(entryChunks, 5);
  for (const bulkAction of actionsChunk) {
    await Promise.all(
      bulkAction?.map((entries, idx) =>
        CONTENTFUL_ENVIRONMENT.createPublishBulkAction({
          entities: {
            sys: { type: 'Array' },
            items: entries?.map((entry) => ({
              sys: {
                linkType: 'Entry',
                type: 'Link',
                id: entry?.sys?.id,
                version: entry?.sys?.version
              }
            }))
          }
        })
          .then((bulkActionInProgress) => bulkActionInProgress.waitProcessing())
          .then((bulkActionCompleted) => console.log('IDX', idx, bulkActionCompleted))
          .catch((err) => console.log('ERR', err))
      )
    );
  }
};
exports.publishEntries = publishEntries;
