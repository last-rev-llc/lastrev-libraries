/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
const path = require('path');
const fs = require('fs');
const generatePageSpec = require('./utils/generatePageSpec');

function getAllFiles(dirPath, arrayOfFiles, filter) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach((file) => {
    if (fs.statSync(`${dirPath}/${file}`).isDirectory()) {
      arrayOfFiles = getAllFiles(`${dirPath}/${file}`, arrayOfFiles, filter);
    } else {
      const pagePath = path.join(__dirname, dirPath, '/', file);
      if (filter(pagePath)) {
        arrayOfFiles.push(pagePath);
      }
    }
  });

  return arrayOfFiles;
}

const generatePages = async ({ site, nextPagesPath, fixturePagesPath, integrationPath }) => {
  // Generate and store pages fixture
  const GENERATED_PAGES_FILENAME = path.join(fixturePagesPath, `${site ? `${site}_` : ''}generated_pages.json`);
  let PAGES;
  console.debug('GeneratePages', { nextPagesPath, fixturePagesPath, integrationPath });
  if (!fs.existsSync(GENERATED_PAGES_FILENAME)) {
    console.debug('Pages Fixture not found, generating...');
    PAGES = getAllFiles(nextPagesPath, [], (filePath) => filePath.endsWith('.html'))
      .map((filePath) => filePath.split('/pages')[1].replace('.html', ''))
      .filter((filePath) => !filePath.includes('404') && !filePath.includes('500'));

    fs.writeFileSync(GENERATED_PAGES_FILENAME, JSON.stringify(PAGES));
  } else {
    PAGES = JSON.parse(fs.readFileSync(GENERATED_PAGES_FILENAME), 'utf8');
    console.debug('Loaded pages from: ', GENERATED_PAGES_FILENAME);
    console.debug({ PAGES });
  }

  PAGES.map((chunk, idx) => generatePageSpec(chunk, idx, integrationPath));
};

module.exports = generatePages;
