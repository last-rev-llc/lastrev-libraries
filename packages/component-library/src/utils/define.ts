const returnEmptyOfType = <inputT>(input: inputT) => {
  let output: any = undefined;
  switch (typeof input) {
    case 'string':
      output = '';
      break;
    default:
      output = {};
      break;
  }
  return output;
}

const define = <inputT>(input: inputT | undefined): inputT => {
  return input || returnEmptyOfType(input);
};

export default define;
