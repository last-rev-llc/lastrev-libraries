Summary:
This file contains GraphQL code that extends the schema for the "Person" type and defines mappers for various fields within the "Person" type. It also includes utility functions for resolving fields and creating custom types.

Import statements:
- gql from 'graphql-tag': Imports the gql function for defining GraphQL schemas.
- ApolloContext, Mappers from '@last-rev/types': Imports the ApolloContext and Mappers types from the '@last-rev/types' package.
- createRichText, getLocalizedField from '@last-rev/graphql-contentful-core': Imports utility functions for creating rich text and getting localized fields.
- pageFooterResolver, pageHeaderResolver, pathResolver, resolveField, breadcrumbsResolver, createType from './utils': Imports utility functions for resolving various fields and creating custom types.

typeDef List:
- Person: Extends the "Person" type with additional fields such as header, footer, path, body, socialLinks, mainImage, breadcrumbs, and hero.

Mappers:
- Person: Defines mappers for the "Person" type, including resolving the path, header, footer, breadcrumbs, and hero fields.
- Link: Defines mappers for the "Link" type, mapping the "text" field to "name" and the "href" field to the pathResolver.
- NavigationItem: Defines mappers for the "NavigationItem" type, mapping the "text" field to "name" and the "href" field to the pathResolver.
- Card: Defines mappers for the "Card" type, including resolving the body, media, variant, link, and actions fields.

External Functions:
- pathResolver: Resolves the path for a given entity.
- pageFooterResolver: Resolves the footer for a page.
- pageHeaderResolver: Resolves the header for a page.
- resolveField: Resolves a generic field for an entity.
- breadcrumbsResolver: Resolves the breadcrumbs for a page.
- createType: Creates a custom type with specified fields and values.

Interaction Summary:
This file interacts with the larger application by extending the schema for the "Person" type and defining custom mappers for various fields within the "Person" type. It also utilizes utility functions for resolving fields and creating custom types, which can be used in other parts of the application to enhance the GraphQL schema and resolver behavior.

Developer Questions:
1. How do I add custom fields to the "Person" type using the defined typeDefs?
2. What are the available utility functions for resolving fields, and how do I use them in my resolvers?
3. How can I debug the resolver behavior for the "Person" type and its associated fields?
4. Can you provide an example of using the createType function to create a custom type within a resolver?
5. How do I integrate the defined mappers with the rest of the application's GraphQL schema and resolvers?