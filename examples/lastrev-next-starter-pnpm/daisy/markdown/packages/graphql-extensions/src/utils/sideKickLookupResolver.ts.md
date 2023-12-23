Summary:
The file contains a resolver function for a GraphQL schema that handles the lookup and mapping of fields for a content item. It interacts with the context and mappers to determine the fields to be included in the lookup.

Import statements:
The file imports the `getTypeName` function from the `getTypeName` module.

typeDef List:
The file does not export any typeDefs.

Mappers:
- `sideKickLookupResolver`: This function handles the lookup and mapping of fields for a content item based on the context and mappers provided.

External Functions:
- `sideKickLookupResolver`: This function takes `content`, `_args`, `ctx`, and `info` as parameters and returns a Promise of type `SideKickLookup`. It resolves the lookup and mapping of fields for a content item based on the context and mappers provided.

Interaction Summary:
The `sideKickLookupResolver` function interacts with the context (`ctx`) and mappers to determine the fields to be included in the lookup for a content item. It also utilizes the `getTypeName` function to get the type name of the content.

Developer Questions:
1. How are the mappers defined and how do they affect the lookup and mapping process?
2. What is the structure of the `ctx` object and how does it impact the resolver function?
3. How does the `getTypeName` function work and what does it return?
4. How can the resolver function be debugged when encountering issues with field lookup and mapping?
5. What are the possible scenarios where the `emptyLookup` is returned, and how can they be handled in the application?