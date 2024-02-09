module.exports = {
  client: {
    includes: ['./packages/**/*.graphql'],
    excludes: ['./packages/graphql-sdk/schema.graphql'],
    service: {
      name: 'Last-Rev-Next-Starter',
      localSchemaFile: './packages/graphql-sdk/schema.graphql'
    }
  }
};
