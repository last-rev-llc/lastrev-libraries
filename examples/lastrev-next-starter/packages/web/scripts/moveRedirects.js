const fs = require('fs');
const path = require('path');
require('dotenv').config();

try {
  const rootDir = path.join(__dirname, '..');
  fs.mkdirSync(`${rootDir}/out`, { recursive: true });

  if (process.env.DOMAIN === 'https://sensortower.com') {
    fs.copyFileSync(`${rootDir}/scripts/_redirects.prod`, `${rootDir}/.next/_redirects`);
  } else {
    fs.copyFileSync(`${rootDir}/scripts/_redirects.dev`, `${rootDir}/.next/_redirects`);
  }
} catch (error) {
  console.log('MoveRedirectsError', error);
}
