Summary:
The theme file contains a function called linkActionTypePropsMapper, which maps different action types to specific props for a component. It includes a case for 'openCookieConsentDialog' that defines a button component with an onClick function to show a drawer using the Osano library if available, and logs an error if the library is not loaded.

Import statements:
There are no import statements in this file.

Default Props List:
- linkActionTypePropsMapper: (actionType?: string) => Object

Root Styles:
N/A

Variants:
N/A

Interaction Summary:
This file interacts with the rest of the application by providing a function that maps action types to specific props for a component. It relies on the Osano library to show a drawer when the 'openCookieConsentDialog' action type is triggered.

Developer Questions:
1. How is the linkActionTypePropsMapper function being used in the application?
2. What are the possible action types that can be passed to linkActionTypePropsMapper?
3. How is the Osano library integrated into the application, and how is it loaded?
4. What component uses the props returned by linkActionTypePropsMapper, and how is it rendered in the application?