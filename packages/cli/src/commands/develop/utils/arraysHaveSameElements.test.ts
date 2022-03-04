import arraysHaveSameElements from './arraysHaveSameElements';

describe('arraysHaveSameElements()', () => {
  it('returns true with same array', () => {
    const arr = [1, 2, 3];
    expect(arraysHaveSameElements(arr, arr)).toBe(true);
  });

  it('returns true  with arrays with same elements in same order', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2, 3];
    expect(arraysHaveSameElements(arr1, arr2)).toBe(true);
  });

  it('returns true  with arrays with same elements in different order', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [3, 2, 1];
    expect(arraysHaveSameElements(arr1, arr2)).toBe(true);
  });

  it('returns true with arrays containing the same complex objects in different order', () => {
    const obj1 = { a: 1 };
    const obj2 = { b: 2 };
    const obj3 = { c: 3 };
    const arr1 = [obj1, obj2, obj3];
    const arr2 = [obj3, obj2, obj1];
    expect(arraysHaveSameElements(arr1, arr2)).toBe(true);
  });

  it('returns false with arrays containing different number of elements', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2];
    expect(arraysHaveSameElements(arr1, arr2)).toBe(false);
  });

  it('returns false with arrays contianing similar, but not equal, complex objecrts', () => {
    const arr1 = [{ a: 1 }, { b: 2 }, { c: 3 }];
    const arr2 = [{ a: 1 }, { b: 2 }, { c: 3 }];
    expect(arraysHaveSameElements(arr1, arr2)).toBe(false);
  });
});
