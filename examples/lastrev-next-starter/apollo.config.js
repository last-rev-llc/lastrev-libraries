const path = require('path');
module.exports = {
  client: {
    service: {
      name: 'lastrev-next-starter',
      localSchemaFile: path.resolve(__dirname, './packages/graphql-sdk/schema.graphql'),
      url: 'http://localhost:5000/graphql'
    },
    includes: ['./packages/components/**/*.graphql', './packages/graphql-sdk/src/**/*.graphql'],
    excludes: ['**/generated/**']
  }
};
