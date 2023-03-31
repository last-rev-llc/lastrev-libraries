import algoliasearch from 'algoliasearch';
import { FixStatus } from './types';
import config from '../../../graphql-runner/config';
import { runAlgoliaStatusChecks } from './algolia';
import findNode from '../helpers/findNode';

const INDEX_NAME = `${process.env.ALGOLIA_INDEX_NAME}`;

const indexSnapshot = require(`./snapshots/${INDEX_NAME}_index.json`);

const algoliaClient = algoliasearch(config.algolia.applicationId, config.algolia.adminApiKey);

const reconfigureIndex = async (): Promise<void> => {
  const index = algoliaClient.initIndex(INDEX_NAME);
  await index.setSettings(indexSnapshot);
};

const triggerReindex = async (): Promise<void> => {
  const url = process.env.DEPLOY_URL
    ? `${process.env.DEPLOY_URL}/.netlify/functions/algolia-background`
    : // for running `netlify dev` locally
      'http://localhost:8888/.netlify/functions/algolia-background';
  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  });
};

const recoverable = {
  [`algolia.index_settings_${INDEX_NAME}`]: reconfigureIndex,
  [`algolia.index_data_${INDEX_NAME}`]: triggerReindex
};

const fixServices = async (): Promise<FixStatus> => {
  const algoliaStatusChecks = await runAlgoliaStatusChecks();
  if (algoliaStatusChecks.status == 'Up') {
    // nothing to fix. return the status checks
    return 'Nothing to fix';
  }
  let status: FixStatus = 'Unrecoverable';
  const algoliaServices = algoliaStatusChecks?.services;
  if (!algoliaServices || algoliaServices.length == 0) {
    return status;
  }
  for (const key of Object.keys(recoverable)) {
    const node = findNode(key, algoliaServices[0]);
    if (node && node.status == 'Down') {
      await recoverable[key]();
      status = 'Attempting to fix';
    }
  }
  return status;
};

export default fixServices;
