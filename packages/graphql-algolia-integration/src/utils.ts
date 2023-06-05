import { AlgoliaObject } from './types';

export const errorResponse = (body: string, statusCode: number = 400) => {
  return {
    statusCode,
    headers: { 'Content-Type': 'text/plain' },
    body
  };
};

export const successResponse = (body: string, statusCode: number = 200) => {
  return {
    statusCode,
    headers: { 'Content-Type': 'text/plain' },
    body
  };
};

export const stringifyObejctFromAlgolia = (index: string, object: any) => {
  return `${index}::${JSON.stringify(object)}`;
};

export const constructFinalAlgoliaObject = (entryId: string, algoliaObject: AlgoliaObject) => {
  return {
    objectId: algoliaObject.objectId,
    entryId: entryId,
    referencedIds: algoliaObject.referencedIds,
    ...algoliaObject.additionalFields
  };
};

export const stringifyGqlAlgoliaObject = (entryId: string, object: AlgoliaObject) => {
  return stringifyObejctFromAlgolia(object.index, constructFinalAlgoliaObject(entryId, object));
};
