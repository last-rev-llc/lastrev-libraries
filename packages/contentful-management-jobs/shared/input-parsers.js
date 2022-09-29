/* eslint-disable no-await-in-loop */
const yaml = require('js-yaml');
const fs = require('fs');
const contentful = require('contentful');

const yamlToJson = async (filePath) => {
  try {
    const doc = yaml.load(fs.readFileSync(filePath, 'utf8'));
    return doc;
  } catch (e) {
    console.log(e);
  }
};

const wait = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

const importParser = async (clientDelivery, query, callback) => {
  // get entries via delivery api
  let entries;
  try {
    entries = await clientDelivery.getEntries(query);
  } catch (error) {
    console.log('Error importing entries => ', error);
  }
  if (callback) {
    callback(query, entries);
  }
  return entries;
};

module.exports = {
  yamlToJson,
  importParser,
  wait
};
