Summary:
This file contains GraphQL schema extensions and mappers for the Page type, as well as utility functions for resolving various fields within the Page type. It also defines type mappings and type definitions for the extended Page type.

Import statements:
- gql from 'graphql-tag': Imports the gql function for defining GraphQL schema.
- Mappers, ApolloContext from '@last-rev/types': Imports the Mappers type and ApolloContext type from the '@last-rev/types' package.
- createRichText, getLocalizedField from '@last-rev/graphql-contentful-core': Imports utility functions for creating rich text and getting localized fields from the '@last-rev/graphql-contentful-core' package.
- pathResolver, pageHeaderResolver, pageFooterResolver, breadcrumbsResolver, createType from './utils': Imports utility functions for resolving paths, headers, footers, breadcrumbs, and creating types from local files.

typeDef List:
- Page: Extends the existing Page type with additional fields such as header, footer, path, hero, contents, breadcrumbs, and footerDisclaimerOverride.

Mappers:
- Page: Defines resolvers for the extended fields of the Page type, such as path, header, footer, and breadcrumbs.
- Link: Defines resolvers for the Link type, specifically for href and text fields.
- NavigationItem: Defines resolvers for the NavigationItem type, specifically for href and text fields.
- Card: Defines resolvers for the Card type, including resolvers for body, media, variant, link, and actions fields.

External Functions:
- pathResolver: Resolves the path for a given page.
- pageHeaderResolver: Resolves the header for a given page.
- pageFooterResolver: Resolves the footer for a given page.
- breadcrumbsResolver: Resolves the breadcrumbs for a given page.
- createType: Creates a custom type with specified attributes.

Interaction Summary:
This file extends the Page type in the GraphQL schema by adding custom fields and defining resolvers for those fields. It also provides utility functions for resolving various fields within the Page type. These extensions and resolvers interact with the larger application by providing custom schema definitions and data manipulation logic for the Page type.

Developer Questions:
1. How do I add a new custom field to the Page type and define its resolver?
2. How can I debug the resolvers defined in this file?
3. What are the available utility functions for resolving fields within the Page type, and how do I use them?
4. How can I test the interactions between the extended Page type and other parts of the application?