### Summary:
This theme file contains the styles for the Material UI Card component. It includes default props, root styles, and variants for different card types such as media, icon, logo, pricing, and person.

### Import statements:
- `ThemeOptions`, `ComponentsProps`, `ComponentsOverrides`, `ComponentsVariants` from `@mui/material/styles`: These are types imported from Material UI for defining theme options, component props, overrides, and variants.
- `Theme` from `@ui/ThemeRegistry/theme.types`: This is a custom type for the theme used in the application.
- `CardVariants` from `./Card.types`: This is a custom type for different variants of the Card component.

### Default Props List:
- `defaultProps`: Default props for the Card component.

### Root Styles:
- `root`: Styles for the root element of the Card component, including background color and container type.
- `cardWrap`: Styles for the card wrapper, including flex layout, height, transitions, and variant-specific styles.
- `media`: Styles for the media element of the card.
- `contentWrap`: Styles for the content wrapper of the card, including flex and padding.
- `title`: Styles for the title of the card, including variant-specific typography and font weight.
- `actionsWrap`: Styles for the actions wrapper of the card.
- `link`: Styles for the link element of the card.

### Variants:
- `media`: Styles for the media variant of the card, including adjustments to card media and content display.
- `icon`: Styles for the icon variant of the card, including specific adjustments to card media.
- `logo`: Styles for the logo variant of the card, including adjustments to content wrap and card media.
- `pricing`: Styles for the pricing variant of the card, including adjustments to card content, title, and subtitle.
- `person`: Styles for the person variant of the card, including adjustments to content wrap and card media.

### Interaction Summary:
This file defines the styles for the Card component, including default props, root styles, and variant-specific styles. These styles will be applied to the Card component throughout the application, ensuring consistent visual presentation of the cards.

### Developer Questions:
1. How are the variant-specific styles applied to the Card component?
2. What are the default props for the Card component and how are they used?
3. How can I add or modify additional variants for the Card component?
4. How do the root styles interact with the overall theme of the application?
