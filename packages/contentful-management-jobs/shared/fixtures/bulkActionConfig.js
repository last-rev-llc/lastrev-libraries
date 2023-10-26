/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
const { getContentfulIdFromString } = require('../contentful-fields');

const content_type = 'article';

const queryOptions = {
  'limit': 100,
  content_type,
  // 'sys.id[in]': '4rECnuLOSbnJafPL9g3hdU',
  'order': '-sys.createdAt',
  'sys.publishedVersion[exists]': true,
  'sys.archivedAt[exists]': false
};

const dropboxLocales = ['en-US', 'de', 'es', 'fr', 'it', 'ja', 'pt-BR'];
const iasLocales = [
  'en-US',
  'es-419',
  'fr-FR',
  'de-DE',
  'it-IT',
  'ja-JP',
  'pt-BR',
  'ko-KR',
  'id-ID',
  'zh-CN',
  'th-TH',
  'vi-VN'
];
const ifLocales = ['en-US', 'hk', 'hk-en', 'ca', 'cn', 'cn-en', 'fr-ca', 'me-en', 'au-en', 'gb-en', 'nz-en'];
const coalitionLocales = ['en-US', 'en-AU', 'en-CA', 'en-GB', 'fr-CA'];
const englishOnly = ['en-US'];

const locales = coalitionLocales;

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
  const found = seo && seo[locale] && seo[locale].canonical && seo[locale].canonical.value;
  // seo[locale].title.value &&
  // seo[locale].title.value.includes('Strong 365');
  // (!seo[locale].robots.value.includes('follow') || seo[locale].robots.value.includes(', nofollow')) &&
  // seo[locale].robots.name &&
  // !seo[locale].robots.name === 'robots';

  return found;
};

const findBody = (item, locale) => {
  // Body
  // console.log('item => ', item.sys.id, JSON.stringify(item.fields.body, null, 2));
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

const findCardListByType = (item, locale, type) => {
  // Card List
  const { cards, listType } = item.fields;
  const hasType = (card) => card?.sys?.contentType?.sys?.id !== 'card';
  return listType === type && cards && cards[locale] && cards[locale].some((card) => hasType(card));
};

const findDescription = (item, locale) => {
  // Description
  const { description, descriptionRichText } = item.fields;
  const desc = description && description[locale];
  const descRichText =
    descriptionRichText &&
    descriptionRichText[locale].content.map((data) => data.content.map((c) => c.value).join('')).join('');
  return desc && descRichText && desc !== descRichText; // && (!descriptionRichText || !descriptionRichText[locale]);
};

const findPubDate = (item, locale) => {
  // Publish Date
  const { pubDate } = item.fields;
  return !pubDate || !pubDate['en-US'];
};

const findCondition = (item, locale) => findPubDate(item, locale); // findCardListByType(item, locale, 'Timeline');

const displayObject = (item) => ({
  id: item.sys.id,
  pubDate: item.fields.pubDate
  // sys: item.sys,
  // cards: item.fields.cards,
  // slug: item.fields.slug,
  // description: item.fields.description,
  // descriptionRichText: item.fields.descriptionRichText
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
