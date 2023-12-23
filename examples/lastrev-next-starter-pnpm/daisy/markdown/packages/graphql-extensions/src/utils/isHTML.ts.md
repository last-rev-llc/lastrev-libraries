Summary:
The provided code is a TypeScript module that exports a function called `isHTML`. This function takes a string as input and uses a regular expression to determine if the string contains HTML tags.

Import statements:
The code does not have any import statements or dependencies.

typeDef List:
N/A

Mappers:
N/A

External Functions:
- `isHTML(value: string): boolean`: This function takes a string `value` as input and returns a boolean value indicating whether the input string contains HTML tags.

Interaction Summary:
The `isHTML` function can be used within the context of a larger application to validate input strings and determine if they contain HTML tags. For example, it can be used in input validation forms to prevent users from entering HTML tags in certain fields.

Developer Questions:
1. How does the `htmlRegex` regular expression work, and how can it be modified if needed?
2. What are the potential performance implications of using the `isHTML` function on large input strings?
3. Are there any edge cases or specific scenarios where the `isHTML` function may not work as expected?