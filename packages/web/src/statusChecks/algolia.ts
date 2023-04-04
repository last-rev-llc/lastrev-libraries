import algoliasearch from 'algoliasearch';
import { Status, StatusNode } from './types';
import config from '../../../graphql-runner/config';
import { compareObjects } from '../helpers/compareObjects';

const INDEX_NAME = `${process.env.ALGOLIA_INDEX_NAME}`;

const algoliaClient = algoliasearch(config.algolia.applicationId, config.algolia.adminApiKey);

export const runAlgoliaStatusChecks = async (): Promise<StatusNode> => {
  const timestamp = Date.now();
  try {
    const index = algoliaClient.initIndex(INDEX_NAME);

    let indexStatusNode: StatusNode = {
      id: `index_${INDEX_NAME}`,
      name: `Index (${INDEX_NAME})`,
      status: 'Up',
      message: 'Algolia index exists',
      timestamp
    };
    let indexSettingsNode: StatusNode = {
      id: `index_settings_${INDEX_NAME}`,
      name: `Index Settings (${INDEX_NAME})`,
      status: 'Up',
      message: 'Algolia index settings match expected',
      timestamp
    };
    let indexDataNode: StatusNode = {
      id: `index_data_${INDEX_NAME}`,
      name: `Index Data (${INDEX_NAME})`,
      status: 'Up',
      message: 'Algolia index has data',
      timestamp
    };

    if (!(await index.exists())) {
      indexStatusNode.status = 'Down';
      indexStatusNode.message = 'Algolia index does not exist';
      indexSettingsNode.status = 'Down';
      indexSettingsNode.message = `Algolia index does not exist`;
      indexDataNode.status = 'Down';
      indexDataNode.message = 'Algolia index does not exist';
    } else {
      const indexSettings: any = await index.getSettings();
      const indexSnapshot = require(`./snapshots/${INDEX_NAME}_index.json`);

      let mismatchedKeys: any[] = [];
      try {
        mismatchedKeys = compareObjects(indexSettings, indexSnapshot, ['version']);
      } catch (err: any) {
        indexSettingsNode.status = 'Down';
        indexSettingsNode.message = `Algolia index compare settings error: ${err.message}`;
      }

      // check that it matches the snapshot json
      if (mismatchedKeys.length) {
        indexSettingsNode.status = 'Down';
        indexSettingsNode.message = `Algolia index settings do not match: [${mismatchedKeys.join(', ')}]`;
      }

      // check that there is some data in the index
      const indexData = await index.search('');
      if (indexData.nbHits === 0) {
        indexDataNode.status = 'Down';
        indexDataNode.message = 'Algolia index has no data';
      }
    }

    const services: StatusNode[] = [indexStatusNode, indexSettingsNode, indexDataNode];

    const algoliaStatus: StatusNode = {
      id: 'algolia',
      name: 'Algolia',
      status: services.every((service) => service.status === 'Up')
        ? 'Up'
        : services.every((service) => service.status === 'Down')
        ? 'Down'
        : 'Partial',
      message: services.every((service) => service.status === 'Up')
        ? 'All algolia checks passed'
        : services.every((service) => service.status === 'Down')
        ? 'All algolia checks failed'
        : 'Some algolia checks failed',
      timestamp,
      services
    };

    return {
      id: `${process.env.SITE}_status`,
      name: `${process.env.SITE} Status`,
      status: algoliaStatus.status,
      message: algoliaStatus.status === 'Up' ? 'All checks passed' : 'Some checks failed',
      timestamp,
      services: [algoliaStatus]
    };
  } catch (err: any) {
    return {
      id: `${process.env.SITE}_status`,
      name: `${process.env.SITE} Status`,
      status: 'Unknown',
      message: `Unknown error: ${err.message}`,
      timestamp,
      services: [
        {
          id: 'algolia',
          name: 'Algolia',
          status: 'Unknown',
          message: `Unknown error: ${err.message}`,
          timestamp
        }
      ]
    };
  }
};
