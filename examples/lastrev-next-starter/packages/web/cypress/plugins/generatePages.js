const path = require('path');
const fs = require('fs');
function getAllFiles(dirPath, arrayOfFiles, filter) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file) {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles, filter);
    } else {
      const pagePath = path.join(__dirname, dirPath, '/', file);
      if (filter(pagePath)) {
        arrayOfFiles.push(pagePath);
      }
    }
  });

  return arrayOfFiles;
}

const generatePages = () => {
  // Generate and store pages fixture
  if (!fs.existsSync(path.resolve(__dirname, '../../cypress/fixtures/generated_pages.json'))) {
    console.log('Pages Fixture not found, generating...');
    const PAGES_PATH = path.resolve(__dirname, '../../.next/server/pages');

    const PAGES = getAllFiles(PAGES_PATH, [], (path) => path.endsWith('.html'))
      .map((path) => path.split('/pages')[1].replace('.html', ''))
      .filter((path) => !path.includes('404') && !path.includes('500'));
    fs.writeFileSync(path.resolve(__dirname, '../../cypress/fixtures/generated_pages.json'), JSON.stringify(PAGES));
  } else {
    console.log('Pages Fixture found, skipping generation...');
  }
};
module.exports = generatePages;
