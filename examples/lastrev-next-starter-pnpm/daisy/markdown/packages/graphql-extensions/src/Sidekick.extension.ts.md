Summary:
This file contains code for defining custom GraphQL schema extensions, including type mappings, resolvers, and type definitions. It also imports a sideKickLookupResolver from a utility file.

Import statements:
The file imports gql from 'graphql-tag' and the sideKickLookupResolver from './utils/sideKickLookupResolver'.

typeDef List:
- extend type Query: contentPreview(id: String!, locale: String, displayType: String, overrideContent: JSON): Content

Mappers:
- typeMappings: An empty object that can be used to map custom types to the GraphQL schema.

External Functions:
- resolvers: Contains a resolver for the 'sidekickLookup' field within the 'Content' type.

Interaction Summary:
This file extends the auto-generated GraphQL schema by adding a custom field 'contentPreview' to the 'Query' type. It also provides a resolver for the 'sidekickLookup' field within the 'Content' type.

Developer Questions:
1. How can I add additional custom fields to the GraphQL schema using this file?
2. What is the purpose of the sideKickLookupResolver and how is it used within the application?
3. How can I debug issues related to the 'contentPreview' query and its resolver?