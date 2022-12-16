/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
const yaml = require('js-yaml');
const fs = require('fs');
const { parse } = require('csv-parse');

const yamlToJson = async (filePath) => {
  try {
    const doc = yaml.load(fs.readFileSync(filePath, 'utf8'));
    return doc;
  } catch (e) {
    console.log(e);
  }
};

const wait = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

const csvToArray = (filePath, delimiter = ',') => {
  return fs.createReadStream(filePath).pipe(
    parse({
      delimiter,
      columns: true,
      ltrim: true
    })
  );
};

const importParser = async (getItems, callback) => {
  let items;
  try {
    items = await getItems();
  } catch (error) {
    console.log('Error importing items => ', error);
  }
  if (callback) {
    await callback(items);
  }
  return items;
};

module.exports = {
  yamlToJson,
  importParser,
  wait,
  csvToArray
};
