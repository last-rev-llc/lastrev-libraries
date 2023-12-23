### Summary:
This file contains the theme and styles for the Hero component in a larger application. It includes default props, root styles, and variants for the Hero component.

### Import statements:
- `linkButtonMock` from '../Link/Link.mock': Mock data for link buttons.
- `mediaBaseImageMock` from '../Media/Media.mock': Mock data for media images.
- `richTextMock` from '../RichText/RichText.mock': Mock data for rich text.
- `randomId` from '../utils/randomId': Utility function to generate random IDs.
- `HeroProps, HeroVariants` from './Hero.types': Type definitions for Hero component props and variants.

### Default Props List:
- `heroDefaultMock`: Default props for the Hero component, including overline, title, subtitle, body, images, actions, background color, and variant.
- `heroBaseMock`: Function to create a base mock with optional overrides.
- `heroMediaOnRightMock`: Function to create a mock with media on the right.
- `heroMediaOnRightFullBleedMock`: Function to create a mock with media on the right in full bleed.
- `heroMediaOnLeftMock`: Function to create a mock with media on the left.
- `heroMediaOnLeftFullBleedMock`: Function to create a mock with media on the left in full bleed.
- `heroMediaBelowMock`: Function to create a mock with media below the content.
- `heroMediaAboveMock`: Function to create a mock with media above the content.

### Root Styles:
The root styles for the Hero component include the default props for overline, title, subtitle, body, images, actions, background color, and variant.

### Variants:
- `HeroVariants.default`: Default variant with standard layout and styling.
- `HeroVariants.mediaOnRight`: Variant with media displayed on the right side of the content.
- `HeroVariants.mediaOnRightFullBleed`: Variant with media displayed on the right side in full bleed.
- `HeroVariants.mediaOnLeft`: Variant with media displayed on the left side of the content.
- `HeroVariants.mediaOnLeftFullBleed`: Variant with media displayed on the left side in full bleed.
- `HeroVariants.mediaBelow`: Variant with media displayed below the content.
- `HeroVariants.mediaAbove`: Variant with media displayed above the content.

### Interaction Summary:
The file provides default props and styles for the Hero component, allowing for easy customization and creation of different variants of the Hero component within the larger application.

### Developer Questions:
1. How can I customize the default props for the Hero component?
2. What are the available variants for the Hero component and how do they differ in styling?
3. How can I use the mock functions to create different variations of the Hero component for testing and development?