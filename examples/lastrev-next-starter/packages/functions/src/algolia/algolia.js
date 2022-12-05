require('dotenv').config();

const { createAlgoliaSyncHandler } = require('@last-rev/graphql-algolia-integration');
const config = require('../../../../config');

// This is helpful for testing and not going over limits
const maxRecords = process.env.ALGOLIA_MAX_RECORDS ? parseInt(process.env.ALGOLIA_MAX_RECORDS) : undefined;

module.exports.handler = createAlgoliaSyncHandler(
  config,
  process.env.GRAPHQL_SERVER_URL || 'http://localhost:5000/graphql',
  maxRecords
);
