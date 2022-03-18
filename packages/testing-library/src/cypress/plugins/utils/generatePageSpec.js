/* eslint-disable no-console */
require('dotenv').config();
const { ensureDirSync } = require('fs-extra');
const { join, resolve } = require('path');
const { compile } = require('handlebars');
const { readFileSync, writeFileSync } = require('fs');

const pageTemplate = compile(readFileSync(resolve(__dirname, './visit_page.spec.hbs'), 'utf8'));

const generatePage = (path, idx, integrationPath) => {
  const outDir = resolve(integrationPath, '__generated');
  const filename = join(outDir, `visit_${path.replaceAll('/', '_')}.spec.js`);
  ensureDirSync(outDir);
  const content = pageTemplate({ path });
  writeFileSync(filename, content);
  return path;
};

module.exports = generatePage;
