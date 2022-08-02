const arraysHaveSameElements = <T>(array1: T[], array2: T[]) => {
  if (array1.length !== array2.length) {
    return false;
  }
  return array1.every((element) => {
    if (array2.includes(element)) {
      return true;
    }

    return false;
  });
};

export default arraysHaveSameElements;
