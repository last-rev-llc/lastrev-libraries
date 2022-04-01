const path = require('path');
module.exports = {
  client: {
    service: {
      name: 'graphql',
      localSchemaFile: path.resolve(__dirname, './packages/graphql-sdk/schema.graphql')
    },
    includes: ['./packages/components/**/*.graphql', './packages/graphql-sdk/src/**/*.graphql'],
    excludes: ['**/generated/**']
  }
};
