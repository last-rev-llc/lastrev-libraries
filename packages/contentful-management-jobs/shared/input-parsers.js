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

const importParser = async (getItems, callback) => {
  // get items via delivery api
  let items;
  try {
    items = await getItems();
  } catch (error) {
    console.log('Error importing items => ', error);
  }
  if (callback) {
    callback(items);
  }
  return items;
};

module.exports = {
  yamlToJson,
  importParser,
  wait
};
