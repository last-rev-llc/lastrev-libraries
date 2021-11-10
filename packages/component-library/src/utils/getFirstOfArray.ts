const getFirstOfArray = <inputT>(input: inputT | inputT[]): inputT => {
  return Array.isArray(input) ? input[0] : input;
};

export default getFirstOfArray;
