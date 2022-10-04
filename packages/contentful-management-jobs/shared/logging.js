/* eslint-disable no-console */
const fs = require('fs');

const logError = (error, fromPath, errorPath) => {
  console.log(`Error File: ${fromPath}`);
  console.log('Error: ', error);
  if (fromPath) {
    console.log(`Error: ${fromPath}`);
  }
  console.log(error);
};

const logItems = (assets, condition, log) => {
  assets.forEach((asset) => {
    if (condition(asset)) {
      console.log(log(asset));
    }
  });
};

module.exports = {
  logError,
  logItems
};
