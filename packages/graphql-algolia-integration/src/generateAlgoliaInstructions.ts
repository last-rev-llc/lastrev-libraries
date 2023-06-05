import { AlgoliaCreateInstruction, AlgoliaInstructions, AlgoliaRecord } from './types';
import { stringifyGqlAlgoliaObject } from './utils';

/**
 * Takes a map of keyed by: `{index}::{stringifiedObject}` with value {objectId}
 * and a list of algolia records from a graphql query
 *
 * diffs the two for records that haven't changed. For those that have changed, a delete instruction is created
 * and a create instruction is created for all records that were not filtered in the diff
 */
const generateAlgoliaInstructions = (
  existingStringifiedToIdMap: Map<string, string>,
  algoliaRecords: AlgoliaRecord[]
): AlgoliaInstructions => {
  const incomingStringifiedObjectToObjectId = algoliaRecords.reduce((acc, record) => {
    record.algoliaObjects.forEach((object) => {
      acc.set(stringifyGqlAlgoliaObject(record.id, object), object.objectId);
    });
    return acc;
  }, new Map<string, string>());

  const noChanges = new Set<string>();
  const instructions: AlgoliaInstructions = [];

  existingStringifiedToIdMap.forEach((objectID, stringifiedObject) => {
    const indexName = stringifiedObject.split('::')[0];
    if (incomingStringifiedObjectToObjectId.has(stringifiedObject)) {
      noChanges.add(`${indexName}::${objectID}`);
    } else {
      instructions.push({
        action: 'deleteObject',
        indexName,
        body: {
          objectID
        }
      });
    }
  });

  // then push all the create instructions for the new algolia objects
  instructions.push(
    ...algoliaRecords.reduce((acc, algoliaRecord) => {
      acc.push(
        ...algoliaRecord.algoliaObjects
          .filter((algoliaObject) => {
            if (noChanges.has(`${algoliaObject.index}::${algoliaObject.objectId}`)) {
              return false;
            }
            return true;
          })
          .map(
            (algoliaObject) =>
              ({
                action: 'addObject',
                indexName: algoliaObject.index,
                body: {
                  objectID: algoliaObject.objectId,
                  entryId: algoliaRecord.id,
                  referencedIds: algoliaObject.referencedIds,
                  recordId: algoliaRecord.id,
                  ...algoliaObject.additionalFields
                }
              } as AlgoliaCreateInstruction)
          )
      );

      return acc;
    }, [] as AlgoliaInstructions)
  );

  return instructions;
};

export default generateAlgoliaInstructions;
