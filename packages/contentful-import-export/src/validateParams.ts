import { ConnectionParams } from './types';

const validateParams = (params: ConnectionParams, type: 'import' | 'export'): void => {
  if (!params.spaceId) {
    throw Error(`${type} spaceId is required`);
  }
  if (!params.managementToken) {
    throw Error(`${type} managementToken is required`);
  }
  if (!params.environmentId) {
    throw Error(`${type} environmentId is required`);
  }
};

export default validateParams;
