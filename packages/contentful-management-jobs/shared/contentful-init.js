/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
const sdk = require('contentful-management');
const contentful = require('contentful');

const clientDelivery = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
  environment: process.env.CONTENTFUL_ENVIRONMENT,
  host: process.env.CONTENTFUL_HOST
});

const clientManagement = sdk.createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_API,
  timeout: 30000
});

const spaceManagement = clientManagement.getSpace(process.env.CONTENTFUL_SPACE_ID);
const environmentManagement = spaceManagement.then((space) => space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT));

const getEnvironmentManagement = async () => {
  let environment;
  let failCount = 0;
  let environmentCreationFailed = false;

  while (!environment && !environmentCreationFailed) {
    try {
      environment = await environmentManagement;
    } catch (error) {
      failCount += 1;
      console.log('error creating environment => ', error);
    }
    environmentCreationFailed = failCount > 5;
    if (environmentCreationFailed) {
      console.log('environment creation failed');
    }
  }

  return environment;
};

module.exports = {
  clientDelivery,
  getEnvironmentManagement,
  environmentManagement
};
