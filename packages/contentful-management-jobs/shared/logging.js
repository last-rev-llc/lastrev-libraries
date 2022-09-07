const fs = require('fs');
const logError = (error, fromPath, errorPath) => {
  console.log(`Error File: ${fromPath}`);
  console.log('Error: ', error);
  if (fromPath) {
    console.log(`Error: ${fromPath}`);
  }
  console.log(error);
};

module.exports = {
  logError
};
