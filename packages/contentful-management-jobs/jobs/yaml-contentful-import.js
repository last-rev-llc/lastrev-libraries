/* eslint-disable no-loop-func */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const sdk = require('contentful-management');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const contentfulFieldsParsers = require('../shared/contentful-fields');
const { publishEntries } = require('./publishEntries');

const inputParsers = require('../shared/input-parsers');
const logging = require('../shared/logging');

const IS_DEBUG_MODE = false;
const CONTENTFUL_CONTENT_TYPE_TO_IMPORT = 'pageAdapter'; // The main content type that is being imported
const BASE_FOLDER_PATH = '/home/max/dev/workato-website/content/adapters'; // The local folder to import yaml files from
const CUSTOM_PARSER_LOOKUP = require('../migrations/adapters');
const PUBLISH_ON_UPSERT = true;
const UPDATE_ENTRIES = true;

const LOCALE = 'en-US'; // The locale of the content type
const MAX_NUMBER_OF_FILES = Infinity; // The maximum number of files to import at once, used for debugging purposes
// const MAX_NUMBER_OF_FILES = 1; // The maximum number of files to import at once, used for debugging purposes
const ENVIRONMENT = 'master'; // make sure you update the environment;
// const ENVIRONMENT = 'k078sfqkr9te'; // make sure you update the environment;
const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const CMA_ACCESS_TOKEN = process.env.CONTENTFUL_MANAGEMENT_API;
// Global Variables that get set based on the rules from Contentful
let SDK_CLIENT, CONTENTFUL_SPACE, CONTENTFUL_ENVIRONMENT, GLOBAL_CONTENTTYPE_FIELD_LOOKUP;

const getContentTypeLookup = async (JOB) => {
  // console.log('lookupOverride: ', JOB.lookupOverride);
  const contentTypeLookup = GLOBAL_CONTENTTYPE_FIELD_LOOKUP[CONTENTFUL_CONTENT_TYPE_TO_IMPORT].fields;
  const contentTypeOverrides = await JOB.lookupOverride;

  // convert the contentTypeLookup array to an object with the 'id' as the key and the 'fields' as the value
  const contentTypeLookupObj = contentTypeLookup.reduce((acc, curr) => {
    acc[curr.id] = curr;
    return acc;
  }, {});

  // console.log('contentTypeOverrides', contentTypeOverrides);

  return _.merge(contentTypeLookupObj, contentTypeOverrides);
};

const getSpaceFieldTypeLookup = async (contentType, fromPath) => {
  const contentTypes = await CONTENTFUL_ENVIRONMENT.getContentTypes();
  // Loop through the values in contentful and return a new array with only the data we need
  // Could these be combined into one loop?
  let contentTypeLookup = contentTypes.items
    .map((contentType) => {
      return {
        id: contentType.sys.id,
        fields: contentType.fields.map((field) => {
          return {
            id: field.id,
            type: field.type
          };
        })
      };
    })
    .reduce((acc, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, {});

  contentTypeLookup = contentTypeLookup[contentType].fields.reduce((acc, curr) => {
    acc[curr.id] = curr;
    return acc;
  }, {});

  // console.log('contentTypeLookup: ', contentTypeLookup);
  return contentTypeLookup;
};

const getParsedContentfulFields = async (yamlObj, fieldTypeLookup, JOB) => {
  // console.log('fieldTypeLookup: ', fieldTypeLookup);
  const parsedFields = {};

  // llop through the fieldTypeLookup keys and get the value for each field if the field is not null in the fieldTypeLookup
  // eslint-disable-next-line no-restricted-syntax
  for (let key in fieldTypeLookup) {
    if (fieldTypeLookup[key] !== null) {
      // console.log('key: ', key);
      // Will bet the value of the field, or if this is a nested field will get the value listed in the id of the customParser lookup
      const value = _.get(yamlObj.parsedYamlFile, fieldTypeLookup[key].id || yamlObj.parsedYamlFile[key]);
      // console.log('value', value);
      // console.log('fieldTypeLookup[key]', fieldTypeLookup[key]);
      const convertedValue = await contentfulFieldsParsers.getContentfulFieldValue(
        value,
        fieldTypeLookup[key],
        JOB,
        yamlObj
      );
      // console.log('convertedValue', convertedValue);
      if (convertedValue) {
        parsedFields[key] = {
          [LOCALE]: convertedValue
        };
      }
    }
  }
  // console.log('getParsedContentfulFields parsedFields: ', parsedFields);
  return parsedFields;
};

const getContentfulFormat = async (JOB) => {
  // loop through the fieldTypeLookup and get the value for each field if the field is not null in the fieldTypeLookup
  // console.log('JOB getContentfulFormat: ', JOB.fieldTypeLookup);
  const array = [];
  for (let index = 0; index < JOB.yamlFilesToImport.length; index++) {
    const yamlObj = JOB.yamlFilesToImport[index];
    yamlObj.contentfulFields = await getParsedContentfulFields(yamlObj, JOB.fieldTypeLookup, JOB);
    // console.log('yamlObj.fromPath: ', yamlObj.fromPath);
    // TODO: Fix from path being the id
    console.log('SLUG', yamlObj.contentfulFields.slug);
    yamlObj.entryId = contentfulFieldsParsers.getContentfulIdFromString(yamlObj.contentfulFields.slug['en-US']);
    array.push(yamlObj);
  }
  return array;
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
function isPublished(entity) {
  return !!entity.sys.publishedVersion && entity.sys.version == entity.sys.publishedVersion + 1;
}
async function upsertContent(aEntry, contentType, fromPath, errorPath) {
  const relContentType = aEntry.contentType || contentType;

  // console.log('entry', entry);
  // Check if entry exists in content first
  // If this succeeds will count towards the rate limit!!!
  let entry = await CONTENTFUL_ENVIRONMENT.getEntry(aEntry.entryId).catch(() => null);

  if (!aEntry.entryId) {
    console.log('Entry with no id', aEntry);
    return null;
  }
  if (!entry) {
    await CONTENTFUL_ENVIRONMENT.createEntryWithId(relContentType, aEntry.entryId, {
      fields: aEntry.contentfulFields
    })
      .then((newEntry) => {
        console.log(
          'Entry created: ',
          `https://app.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/entries/${newEntry.sys.id}`
        );
        entry = newEntry;
      })
      .catch((error) => logging.logError(error, fromPath, errorPath));
  } else if (UPDATE_ENTRIES) {
    // console.log(`Already Exists: id: ${existingEntry.sys.id} file: ${fromPath}`);

    entry.fields = aEntry.contentfulFields;
    // We've already used up the rate limit for this second, so wait a second and try again
    await sleep(1200);
    await entry
      .update()
      .then((updatedEntry) => {
        console.log(
          'Entry UPDATED: ',
          `https://app.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/entries/${updatedEntry.sys.id}`
        );
        if (updatedEntry.sys.id == '0') {
          console.log('ID is 0', JSON.stringify(updatedEntry, null, 2));
        }
        entry = updatedEntry;
      })
      .catch((error) => logging.logError(error, fromPath, errorPath));
  } else {
    console.log(
      'Entry EXISTS: ',
      `https://app.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/entries/${entry.sys.id}`
    );
  }
  return entry;
}

const importContentToContentful = async (contentfulEntriesJson, { contentType, fromPath, errorPath }) => {
  // Import into Contentful
  const arrayEntries = [];
  let processed = 0;

  // Remove duplicates
  const uniqueEntries = _.uniqBy(contentfulEntriesJson, 'entryId');
  console.log('UniqueEntries', uniqueEntries.length, 'from', contentfulEntriesJson.length);
  const chunks = _.chunk(uniqueEntries, UPDATE_ENTRIES ? 4 : 7);
  for (const chunk of chunks) {
    await Promise.all(
      chunk.map(async (entry) => {
        arrayEntries.push(upsertContent(entry, contentType, fromPath, errorPath));
      })
    ).then(() => {
      processed += chunk.length;
      console.log('Chunk completed', processed, new Date());
    });
    await sleep(1000);
  }
  const entries = await Promise.all(arrayEntries);
  // console.log('entries', entries);
  if (PUBLISH_ON_UPSERT) {
    const unpublishedEntries = entries.filter((entry) => !!entry && !isPublished(entry));
    console.log('Publishing', unpublishedEntries.length, 'entries');
    await publishEntries(CONTENTFUL_ENVIRONMENT, unpublishedEntries);
  }
};

const getAllFilesInFolder = async () => {
  try {
    const files = await fs.promises.readdir(BASE_FOLDER_PATH);
    const yamlFilesArray = [];

    for (let index = 0; index < files.length; index++) {
      if (index < MAX_NUMBER_OF_FILES) {
        const file = files[index];
        const fromPath = path.join(BASE_FOLDER_PATH, file);

        console.log(file);

        const toPath = path.join(`${BASE_FOLDER_PATH}/completed`, file);
        const errorPath = path.join(`${BASE_FOLDER_PATH}/errors`, file);

        try {
          const stat = await fs.promises.stat(fromPath);
          // if file is not a directory else if its path is not toPath or errorPath
          if (!stat.isDirectory()) {
            console.log('Parsing: ', fromPath);
            const parsedYamlFile = await inputParsers.yamlToJson(fromPath);

            // ADd the Slug based on the filename
            parsedYamlFile.slug = fromPath.replace(/^.*[\\\/]/, '').split('.')[0];

            yamlFilesArray.push({
              fromPath,
              toPath,
              errorPath,
              parsedYamlFile
            });
          } else {
            console.log('Skipping: ', fromPath);
          }
        } catch (err) {
          logging.logError(err, fromPath, errorPath);
        }
      }
    }

    return yamlFilesArray;
  } catch (error) {
    logging.logError(error);
  }
};

(async () => {
  SDK_CLIENT = await sdk.createClient({
    spaceId: SPACE_ID,
    accessToken: CMA_ACCESS_TOKEN
  });
  CONTENTFUL_SPACE = await SDK_CLIENT.getSpace(SPACE_ID);

  // const CONTENTFUL_ENVIRONMENT = await CONTENTFUL_SPACE.createEnvironmentWithId(ENVIRONMENT, { name: ENVIRONMENT });
  // console.log('createEnvironment: ', CONTENTFUL_ENVIRONMENT);

  CONTENTFUL_ENVIRONMENT = await CONTENTFUL_SPACE.getEnvironment(ENVIRONMENT);
  GLOBAL_CONTENTTYPE_FIELD_LOOKUP = await contentfulFieldsParsers.getSpaceFieldTypeLookup(CONTENTFUL_ENVIRONMENT);

  // const deleteEnvironment = await CONTENTFUL_ENVIRONMENT.delete();
  // console.log('deleteEnvironment: ', deleteEnvironment);

  if (!CUSTOM_PARSER_LOOKUP) {
    console.log('NO CUSTOM_PARSER_LOOKUP: ', CUSTOM_PARSER_LOOKUP);
  }
  const JOB = {
    contentType: CONTENTFUL_CONTENT_TYPE_TO_IMPORT,
    lookupOverride: CUSTOM_PARSER_LOOKUP,
    relatedEntries: [],
    locale: LOCALE
  };

  // console.log('JOB.yamlFilesToImport: ', JOB);

  JOB.yamlFilesToImport = await getAllFilesInFolder(BASE_FOLDER_PATH);

  // console.log('JOB.yamlFilesToImport: ', JOB);

  // Get the lookup and do the import for each content type
  // const contentTypeLookupOveride = await workatoParsers.accelerators;
  JOB.fieldTypeLookup = await getContentTypeLookup(JOB);
  // console.log('JOB.fieldTypeLookup: ', JSON.stringify(JOB, null, 2));

  JOB.contentfulEntriesJson = await getContentfulFormat(JOB);
  // console.log('JOB.contentfulEntriesJson: ', JSON.stringify(JOB.contentfulEntriesJson, null, 2));

  // console.log('JOB.relatedEntries: ', JSON.stringify(JOB.relatedEntries, null, 2));
  if (!IS_DEBUG_MODE) {
    JOB.contentfulRelatedEntries = await importContentToContentful(JOB.relatedEntries, JOB);
    JOB.contentfulMainEntries = await importContentToContentful(JOB.contentfulEntriesJson, JOB);
  } else {
    // console.log(JOB.contentfulEntriesJson);
    // console.log(JOB.relatedEntries);
  }

  // console.log('JOB.contentfulEntries: ', JSON.stringify(JOB, null, 2));
})();
