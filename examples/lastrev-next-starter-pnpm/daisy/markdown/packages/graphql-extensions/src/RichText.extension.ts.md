Summary:
This file contains code related to sanitizing and processing rich text content from Contentful within a GraphQL context. It defines mappers for handling rich text content and links, and utilizes the FilterXSS library to sanitize HTML content.

Import statements:
- ApolloContext and Mappers from '@last-rev/types': These are custom types used in the code.
- Entry and RichTextContent from 'contentful': These are types related to Contentful content.
- FilterXSS from 'xss': This is a library used for sanitizing HTML content.
- isHTML from './utils/isHTML': This is a utility function used to check if a string contains HTML content.

typeDef List:
- RichText: This typeDef handles the processing and sanitization of rich text content from Contentful.

Mappers:
- RichText: This mapper handles the processing and sanitization of rich text content from Contentful. It includes two functions:
  - json: Sanitizes the raw rich text content and removes extra empty lines.
  - links: Processes links within the rich text content, loads associated entries and assets, and handles hyperlinks.

External Functions:
- json: async (raw: RichTextContent) => Promise<RichTextContent>: This function sanitizes the raw rich text content and returns the sanitized content.
- links: async (raw: any, _args: any, ctx: ApolloContext) => Promise<{ entries: Entry<any>[], assets: any[] }>: This function processes links within the rich text content, loads associated entries and assets, and returns the processed entries and assets.

Interaction Summary:
This file interacts with the larger application by providing mappers for handling rich text content within the GraphQL schema. It integrates with the ApolloContext to load associated entries and assets when processing links within the rich text content.

Developer Questions:
- How does the sanitization process work for rich text content?
- What are the expected inputs and outputs of the json and links functions?
- How are the loaded entries and assets utilized within the application after processing links?