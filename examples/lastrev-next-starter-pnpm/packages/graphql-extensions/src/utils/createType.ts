export const createType = (type: string, content: any, locale: string = 'en-US') => ({
  sys: { id: content?.id, contentType: { sys: { id: type } } },
  fields: Object.keys(content).reduce((accum: any, key) => {
    if (typeof content[key] === 'object' && Object.keys(content[key])?.includes(locale)) {
      accum[key] = content[key];
    } else {
      accum[key] = {
        [locale]: content[key]
      };
    }
    return accum;
  }, {})
});

export default createType;
