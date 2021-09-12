import isPlainObject from 'lodash/isPlainObject';

const getArgs = (args: any[]) => args.filter((arg) => isPlainObject(arg));

const getOptions = (args: any[]) => args.reduce((a, b) => ({ ...b, ...a }), {});

const isOGSimple = (option: { name: string; value: any; }) => option.name.startsWith('og:') && typeof option.value === 'string';

const isOGComplex = (option: { name: string; value: { url: any; }; }) => option.name.startsWith('og:') && isPlainObject(option.value) && option.value.url;

const isTwitter = (option: { name: string; value: any; }) => option.name.startsWith('twitter:') && typeof option.value === 'string';

const isTwitterComplex = (option: { name: string; value: { url: any; }; }) =>
  option.name.startsWith('twitter:') && isPlainObject(option.value) && option.value.url;

const isComplex = (option: { value: { url: any; }; }) => isPlainObject(option.value) && option.value.url;

const getTags = (options: { [x: string]: { value: any; }; }) =>
  Object.keys(options).reduce((acc, key) => {
    if (isOGSimple(options[key])) acc.push({ property: options[key].name, content: options[key].value });
    else if (isOGComplex(options[key])) acc.push({ property: options[key].name, content: options[key].value.url });
    else if (isTwitter(options[key])) acc.push({ name: options[key].name, content: options[key].value });
    else if (isTwitterComplex(options[key])) acc.push({ name: options[key].name, content: options[key].value.url });
    else if (isComplex(options[key])) acc.push({ name: options[key].name, content: options[key].value.url });
    else acc.push({ name: options[key].name, content: options[key].value });
    return acc;
  }, []);

const getSEO = (...args: any[]) => {
  const validArgs = getArgs(args);
  const options = getOptions(validArgs);
  const tags = getTags(options);
  return tags;
};

export default getSEO;
