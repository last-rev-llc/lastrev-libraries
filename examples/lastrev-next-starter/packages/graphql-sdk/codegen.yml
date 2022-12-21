schema:
  - 'schema.graphql'
documents:
  - './src/**/*.graphql'
  - './src/**/*.ts'
  - '../components/**/*.graphql'
generates:
  ./src/generated/sdk.ts:
    plugins:
      - 'typescript'
      - 'typescript-operations'
      - 'typescript-graphql-request'
    config:
      maybeValue: T | undefined
      inlineFragmentTypes: combine
      preResolveTypes: true
      enumsAsTypes: false
      rawRequest: true
  ./src/generated/fragmentTypes.json:
    plugins:
      - fragment-matcher
