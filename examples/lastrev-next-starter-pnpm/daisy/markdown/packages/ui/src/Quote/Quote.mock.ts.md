### Template ###
Summary:
This theme file contains mock data and default props for the Quote component. It provides different variants of the Quote component with predefined styles and content.

Import statements:
- `mediaBaseImageMock` from '../Media/Media.mock': This import is used to mock an image for the quote component.
- `randomId` from '../utils/randomId': This import is used to generate a random ID for the quote component.
- `QuoteProps` from './Quote.types': This import defines the type of props expected by the Quote component.

Default Props List:
- `quoteDefaultMock`: Generates default props for the Quote component, including a random ID, quote content, author information, and images.
- `quoteBaseMock`: Generates default props for the base variant of the Quote component by extending the default mock.
- `quoteLargeMock`: Generates default props for the large variant of the Quote component by extending the default mock and setting the variant to 'large'.
- `quoteInlineMock`: Generates default props for the inline variant of the Quote component by extending the default mock and setting the variant to 'inline'.

Root Styles:
The root styles for the Quote component are not explicitly defined in this file. They are likely defined in the component's CSS or theme file.

Variants:
- Default Variant: Displays the quote with default styling.
- Large Variant: Displays the quote with larger styling.
- Inline Variant: Displays the quote in an inline style.

Interaction Summary:
This file provides predefined mock data and default props for different variants of the Quote component. It can be used to populate the Quote component with sample content during development and testing.

Developer Questions:
1. How are the mock images for the quote component being generated?
2. Can the default props be customized further to accommodate different use cases?
3. Where are the actual styles for the Quote component defined, and how do they interact with the default props provided here?
### END TEMPLATE ###