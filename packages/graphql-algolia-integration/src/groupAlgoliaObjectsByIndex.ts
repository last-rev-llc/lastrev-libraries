import { AlgoliaObjectsByIndex, AlgoliaRecord } from './types';

const groupAlgoliaObjectsByIndex = (recordsArrays: (AlgoliaRecord | null)[][]): AlgoliaObjectsByIndex => {
  const algoliaObjects = recordsArrays.flat().flatMap((record) => record?.algoliaObjects ?? []);

  const grouped = algoliaObjects.reduce((accum, { index, data }) => {
    if (!accum[index]) {
      accum[index] = [];
    }
    accum[index].push(data);
    return accum;
  }, {} as AlgoliaObjectsByIndex);

  return grouped;
};

export default groupAlgoliaObjectsByIndex;
