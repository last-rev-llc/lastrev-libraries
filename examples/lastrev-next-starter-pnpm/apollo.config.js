module.exports = {
  client: {
    includes: ['./packages/**/*.graphql'],
    excludes: ['./packages/graphql-sdk/schema.graphql'],
    service: {
      name: 'my-service-name',
      localSchemaFile: './packages/graphql-sdk/schema.graphql'
    }
  }
};
