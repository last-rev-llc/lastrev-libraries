import groupAlgoliaObejctsByIndex from './groupAlgoliaObjectsByIndex';
import { AlgoliaRecord } from './types';

const createAlgoliaRecord = (objectsByIndex: { [index: string]: any[] }): AlgoliaRecord => {
  return {
    algoliaObjects: Object.keys(objectsByIndex).flatMap((index) => {
      return objectsByIndex[index].map((data: any) => ({
        index,
        data
      }));
    })
  };
};

describe('groupAlgoliaObejctsByIndex.ts', () => {
  it('should return an empty object if no records are passed', () => {
    const result = groupAlgoliaObejctsByIndex([]);
    expect(result).toEqual({});
  });

  it('should return an empty object if inner records array is empty', () => {
    const result = groupAlgoliaObejctsByIndex([[]]);
    expect(result).toEqual({});
  });

  it('should return an empty object if algolia objects arrays are empty', () => {
    const records = [createAlgoliaRecord({ someIndex: [] })];
    const result = groupAlgoliaObejctsByIndex([records]);
    expect(result).toEqual({});
  });

  it('should return an object with algoliaObjects grouped by index', () => {
    const index1Objects: any[] = [{ data: 'data1' }, { data: 'data2' }];
    const index2Objects: any[] = [{ data: 'data3' }, { data: 'data4' }];
    const index3Objects: any[] = [];
    const recordArrays: AlgoliaRecord[][] = [
      [createAlgoliaRecord({ index1: index1Objects, index2: index2Objects })],
      [createAlgoliaRecord({ index3: index3Objects })]
    ];

    const result = groupAlgoliaObejctsByIndex(recordArrays);

    expect(result).toEqual({
      index1: index1Objects,
      index2: index2Objects
    });
  });
});
