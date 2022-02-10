const path = require('path');
module.exports = {
  client: {
    service: {
      name: 'graphql',
      localSchemaFile: path.resolve(__dirname, './schema.graphql')
    },
    excludes: ['**/generated/**']
  }
};
