/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
const content_type = 'pageCourseTopic';

const queryOptions = {
  'limit': 100,
  content_type,
  // 'sys.id[in]': 'ExampleSysIdOne,ExampleSysIdTwo',
  'order': '-sys.createdAt',
  'sys.archivedAt[exists]': false
};

const locales = ['pt-BR'];

const findCondition = (item, locale) =>
  item.fields.canonicalUrl && item.fields.canonicalUrl[locale] && item.fields.canonicalUrl[locale].includes('pt-BR');

const itemFilter = (item) => {
  let found = false;
  locales.forEach((locale) => {
    found = found || findCondition(item, locale);
  });
  return found;
};

const displayItem = (item) => {
  console.log(
    'page => ',
    JSON.stringify(
      {
        id: item.sys.id,
        canonicalUrl: item.fields.canonicalUrl['pt-BR']
      },
      null,
      2
    )
  );
};

const log = (items) => {
  const filteredItems = items.filter(itemFilter);
  if (filteredItems.length === 0) {
    console.log('No items found to log');
    return;
  }
  console.log('number of items found => ', filteredItems.length);
  console.log(
    'entry ids => ',
    filteredItems
      .map((item) => {
        displayItem(item);
        return item.sys.id;
      })
      .join(',')
  );
};

const prepareEntry = (entry) => {
  const { canonicalUrl } = entry.fields;
  locales.forEach((locale) => {
    if (canonicalUrl?.[locale]) {
      entry.fields.canonicalUrl[locale] = canonicalUrl[locale].replace('/pt-BR', '/pt-br');
      console.log('prepared entry => ', entry.fields.canonicalUrl[locale]);
    }
  });
  return entry;
};

module.exports = {
  content_type,
  queryOptions,
  log,
  prepareEntry
};
