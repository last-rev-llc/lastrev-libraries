Summary:
This file contains code for extending the GraphQL schema by adding custom fields to the Quote type and defining resolver behavior for those fields. It also includes mappers for handling the Quote type and its related fields.

Import statements:
- gql from 'graphql-tag': Imports the gql function for defining GraphQL schemas.
- ApolloContext, Mappers from '@last-rev/types': Imports the ApolloContext and Mappers types from the '@last-rev/types' package.
- createRichText, getLocalizedField from '@last-rev/graphql-contentful-core': Imports helper functions for creating rich text and getting localized fields from the '@last-rev/graphql-contentful-core' package.
- createType from './utils/createType': Imports the createType function from the './utils/createType' file.

typeDef List:
- Quote type is extended to include image and logo fields of type Media.

Mappers:
- Quote: Contains resolvers for the Quote type and its related fields.
  - Card: Contains resolvers for the body, media, variant, and actions fields of the Quote type.

External Functions:
- createType: A function imported from './utils/createType' that is used to create a custom type.

Interaction Summary:
This file interacts with the larger application by extending the Quote type in the GraphQL schema and defining resolver behavior for the extended fields. It also uses helper functions from external packages to handle field mapping and content retrieval.

Developer Questions:
1. How do I add custom fields to existing GraphQL types using extensions?
2. What are the dependencies for the mappers and how are they resolved?
3. How can I debug the resolver behavior for the extended fields?
4. How do I use the createType function from the utils folder, and what are the expected inputs and outputs?
5. How can I test the resolver functions for the extended fields in isolation?