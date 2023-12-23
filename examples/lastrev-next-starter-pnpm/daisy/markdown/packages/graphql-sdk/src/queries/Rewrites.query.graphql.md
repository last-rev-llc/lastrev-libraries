File: queries.js

Summary:
The queries.js file contains a GraphQL query named "Rewrites" that takes a Boolean variable "preview" as input and retrieves the source and destination fields for rewrites.

Import statements:
The file may include import statements for GraphQL client libraries such as Apollo Client or Relay, as well as any custom or third-party utility functions required for query execution.

typeDef List:
The file may export type definitions for the "Rewrites" query, including the input variable "preview" and the output fields "source" and "destination".

Mappers:
This file may not contain mappers as it is primarily focused on defining and executing GraphQL queries.

External Functions:
- queryRewrites: This function executes the "Rewrites" query with the provided "preview" variable and returns the source and destination fields for rewrites.

Interaction Summary:
The queries.js file interacts with the larger application by providing a predefined GraphQL query for retrieving rewrite information. It can be used by components or services that require rewrite data, and it may interact with GraphQL client libraries and server-side resolvers to fetch and process the query results.

Developer Questions:
1. How do I pass the "preview" variable when executing the query?
2. What are the expected data types for the "source" and "destination" fields in the query result?
3. How can I handle errors or network issues when executing the query?
4. Are there any specific server-side configurations or resolvers that impact the behavior of this query?