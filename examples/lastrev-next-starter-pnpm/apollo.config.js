module.exports = {
  client: {
    includes: ['./packages/**/*.graphql'],
    service: {
      name: 'my-service-name',
      localSchemaFile: './packages/graphql-sdk/schema.graphql'
    }
  }
};
