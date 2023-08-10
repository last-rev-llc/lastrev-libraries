/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
const { getContentfulIdFromString } = require('../contentful-fields');

const content_type = 'redirect';

const queryOptions = {
  'limit': 100,
  content_type,
  // 'sys.id[in]': 'ExampleSysIdOne,ExampleSysIdTwo',
  'order': '-sys.createdAt',
  // 'sys.publishedVersion[exists]': false,
  'sys.archivedAt[exists]': false
};

const locales = ['en-US', 'de', 'es', 'fr', 'it', 'ja', 'pt-BR'];

const displayHyperlink = (content) => {
  if (content.nodeType === 'hyperlink') {
    return content?.data?.uri && content.data.uri.includes('impossiblefoods.com') ? content.data.uri : '';
  }
  return (
    (content.content &&
      content.content
        .map(displayHyperlink)
        .filter((c) => c)
        .join(', ')) ||
    ''
  );
};

const findSEO = (item, locale) => {
  // SEO
  const { slug, seo } = item.fields;
  const hasCanonicalUrl = seo && seo[locale] && seo[locale].canonical && seo[locale].canonical.value;
  return hasCanonicalUrl;
  // (!seo[locale].includes(slug['en-US']) ||
  //   (locale !== 'en-US' && !canonicalUrl[locale].includes(locale.toLowerCase())))
};

const findBody = (item, locale) => {
  // Body
  const { body } = item.fields;
  const hasInternalHyperlink = (content) =>
    content.data && content.data.uri && content.data.uri.includes('impossiblefoods.com');
  const hasHyperlink = (content) => {
    if (content.nodeType === 'hyperlink') {
      return hasInternalHyperlink(content);
    }
    return !!(content.content && content.content.some(hasHyperlink));
  };
  return body && body[locale] && body[locale].content && body[locale].content.some(hasHyperlink);
};

const findRedirect = (item, locale) => {
  // Redirect data
  const { sourcePath, destinationPath } = item.fields;
  const hasTopics = (path) => path && path[locale] && path[locale].includes('/topics/');
  return hasTopics(sourcePath);
};

const findCondition = (item, locale) => {
  // console.log('item => ', item.sys.id, JSON.stringify(item.fields.body, null, 2));
  return findRedirect(item, locale);
};

const displayObject = (item) => ({
  id: item.sys.id,
  sourcePath: item.fields.sourcePath
  // destinationPath: item.fields.destinationPath
  // body: item.fields.body['en-US'].content
  //   .map(displayHyperlink)
  //   .filter((c) => c)
  //   .join(', ')
});

const itemFilter = (item) => {
  let found = false;
  locales.forEach((locale) => {
    found = found || findCondition(item, locale);
  });
  return found;
};

const displayItem = (item) => {
  console.log('displayItem => ', JSON.stringify(displayObject(item), null, 2));
};

const log = (items) => {
  if (items.length === 0) {
    console.log('No items found to log');
    return;
  }
  console.log('number of items found => ', items.length);
  console.log(
    'entry ids => ',
    items
      .map((item) => {
        displayItem(item);
        return item.sys.id;
      })
      .join(',')
  );
};

const prepareEntryForUpdate = (entry) => {
  console.log(`preparing entry => ${entry.sys.id}`);
  const { destinationPath } = entry.fields;
  locales.forEach((locale) => {
    if (destinationPath?.[locale]) {
      entry.fields.destinationPath[locale] = destinationPath[locale].replace('/topics/', '/self-guided-learning/');
      console.log(`prepared entry for ${locale} locale => `, entry.fields.destinationPath[locale]);
    }
  });
  return entry;
};

const prepareEntryForDuplication = (entry) => {
  console.log(`preparing entry => ${entry.sys.id}`);
  const { sourcePath, internalTitle } = entry.fields;
  locales.forEach((locale) => {
    if (sourcePath?.[locale]) {
      entry.fields.sourcePath[locale] = sourcePath[locale].replace('/topics/', '/self-guided-learning/');
      if (internalTitle?.[locale]) {
        entry.fields.internalTitle[locale] = internalTitle[locale].replace('topics', 'self-guided-learning');
      }
      console.log(`prepared entry for ${locale} locale => `, entry.fields.sourcePath[locale]);
    }
  });
  const preparedEntry = {
    entry: { fields: entry.fields },
    entryId: getContentfulIdFromString(entry.sys.id),
    publish: false,
    contentType: content_type
  };
  console.log('prepared object => ', JSON.stringify(preparedEntry, null, 2));
  return entry.fields.destinationPath['en-US'].includes(entry.fields.sourcePath['en-US']) ? null : preparedEntry;
};

module.exports = {
  content_type,
  queryOptions,
  log,
  itemFilter,
  prepareEntryForUpdate,
  prepareEntryForDuplication,
  prepareOnly: true
};
