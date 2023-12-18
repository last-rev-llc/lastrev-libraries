require('dotenv').config();

const lrConfig = require('./config');

module.exports = lrConfig.clone({
  contentStrategy: process.env.GRAPHQL_RUNNER_STRATEGY === 'fs' ? 'fs' : 'cms',
  cmsCacheStrategy: 'redis'
});
