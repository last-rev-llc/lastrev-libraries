require('dotenv').config();

module.exports = {
  client: {
    service: {
      name: 'graphql',
      url: process.env.GRAPHQL_SERVER_URL || 'http://localhost:5000/graphql'
    },
    excludes: ['**/generated/**']
  }
};
