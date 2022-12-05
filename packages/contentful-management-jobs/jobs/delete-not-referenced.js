/* eslint-disable no-loop-func */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const fs = require('fs'); // - Define which contents can't live by themselves
const sdk = require('contentful-management');
const { publishEntries } = require('./publishEntries');

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const CMA_ACCESS_TOKEN = process.env.CONTENTFUL_MANAGEMENT_API;
const ENVIRONMENT = 'master';
const IS_DEBUG = true;

let SDK_CLIENT, CONTENTFUL_SPACE, CONTENTFUL_ENVIRONMENT;
exports.SDK_CLIENT = SDK_CLIENT;
exports.CONTENTFUL_SPACE = CONTENTFUL_SPACE;
exports.CONTENTFUL_ENVIRONMENT = CONTENTFUL_ENVIRONMENT;

const ENTRIES_FOLDER_PATH = `/home/max/dev/workato-website/.cms-sync/khy5qy7zbpmq/master/preview/entries`;
const MUST_HAVE_PARENT = [
  'banner',
  'card',
  'cardCustomerFeatured',
  'cardCustomerStory',
  'cardExpertAgree',
  'cardLocation',
  'cardNews',
  'cardResource',
  'cardUseCase',
  'collection',
  'collectionNews',
  'customerCard',
  'collectionUseCases',
  'editionAppFlow',
  'editionFunction',
  'editionTab',
  'expertsAgreeCard',
  'expertsAgree',
  'faqCard',
  'hero',
  'link',
  'location',
  'logoColumnCustomerMainPage',
  'media',
  'navigationItem',
  'person',
  'pricingTab',
  'pricingTabStep',
  'quote',
  'section',
  'statList',
  'tab',
  'tabPlatform',
  'tabPricing',
  'tagCustomer'
];

const REFERENCED = {};
const findReferences = (entry) => {
  // Iterate over all fields values
  Object.keys(entry?.fields)?.forEach((field) => {
    let value = entry?.fields[field]['en-US'];
    // Normalize to array
    if (!Array.isArray(value)) value = [value];

    value?.forEach((item) => {
      if (item?.sys?.type === 'Link' && item?.sys?.linkType === 'Entry') {
        REFERENCED[item?.sys?.id] = true;
      }
    });
  });
};

//*
// Get an array of all the not referenced content
const getUnreferencedEntries = ({ contentTypes = MUST_HAVE_PARENT, entriesPath = ENTRIES_FOLDER_PATH } = {}) => {
  const ORPHANS = {};
  // - Store all existing ids in a array filtering by the ones that must have parents
  const entriesFileNames = fs.readdirSync(entriesPath);
  entriesFileNames?.forEach((fileName) => {
    const id = fileName.replace('.json', '');
    const entry = JSON.parse(fs.readFileSync(`${entriesPath}/${fileName}`));
    if (contentTypes.includes(entry?.sys?.contentType?.sys?.id)) {
      ORPHANS[id] = entry?.sys?.contentType?.sys?.id;
    }
    findReferences(entry);
  });

  Object.keys(REFERENCED).forEach((id) => {
    delete ORPHANS[id];
  });
  return Object.keys(ORPHANS);
};

(async () => {
  SDK_CLIENT = sdk.createClient({
    spaceId: SPACE_ID,
    accessToken: CMA_ACCESS_TOKEN
  });

  CONTENTFUL_SPACE = await SDK_CLIENT.getSpace(SPACE_ID);
  CONTENTFUL_ENVIRONMENT = await CONTENTFUL_SPACE.getEnvironment(ENVIRONMENT);

  const toBeDeletedIds = getUnreferencedEntries();
  console.log('Entries to be deleted', toBeDeletedIds);
  if (IS_DEBUG) return;
  await publishEntries(toBeDeletedIds);
})();
