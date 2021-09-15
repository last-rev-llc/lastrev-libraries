import isPlainObject from 'lodash/isPlainObject';

interface Option {
  value: string | { url: string };
  name: any;
}

interface Options {
  [key: string]: Option;
}

interface Tag {
  content: string;
  property?: string;
  name?: string;
}

const getArgs = (args: any[]) => args.filter((arg) => isPlainObject(arg));

const getOptions = (args: any[]) => args.reduce((a: any, b: any) => ({ ...b, ...a }), {});

const isOGSimple = (option: Option) => option.name.startsWith('og:') && typeof option.value === 'string';

const isOGComplex = (option: Option) =>
  option.name.startsWith('og:') && typeof option.value !== 'string' && option.value.url;

const isTwitter = (option: Option) => option.name.startsWith('twitter:') && typeof option.value === 'string';

const isTwitterComplex = (option: Option) =>
  option.name.startsWith('twitter:') && typeof option.value !== 'string' && option.value.url;

const isComplex = (option: Option) => typeof option.value !== 'string' && option.value.url;

const getTags = (options: Options) =>
  Object.keys(options).reduce((acc: Array<Tag>, key) => {
    const value = options[key].value;
    if (typeof value === 'string') {
      if (isOGSimple(options[key])) acc.push({ property: options[key].name, content: value });
      else if (isTwitter(options[key])) acc.push({ name: options[key].name, content: value });
      else acc.push({ name: options[key].name, content: value });
    } else {
      if (isOGComplex(options[key])) acc.push({ property: options[key].name, content: value.url });
      else if (isTwitterComplex(options[key])) acc.push({ name: options[key].name, content: value.url });
      else if (isComplex(options[key])) acc.push({ name: options[key].name, content: value.url });
    }
    return acc;
  }, []);

const getSEO = (...args: any[]) => {
  const validArgs = getArgs(args);
  const options = getOptions(validArgs);
  const tags = getTags(options);
  return tags;
};

export default getSEO;
