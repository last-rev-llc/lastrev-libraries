### Summary:
This theme file defines the styles and props for the `FooterNavigationItemGroup` component. It includes type definitions for the component props, classes, and class keys, as well as style overrides and variants.

### Import statements:
The file imports type definitions from `@mui/material` and `@graphql-sdk/types` to define the component props and classes.

### Default Props List:
The file exports the following default props:
- `FooterNavigationItemGroupProps`: Defines the props for the `FooterNavigationItemGroup` component.
- `FooterNavigationItemGroupOwnerState`: Extends the `FooterNavigationItemGroupProps` to define the owner state of the component.

### Root Styles:
The root styles for the `FooterNavigationItemGroup` component are defined in the `FooterNavigationItemGroupClasses` interface. The following root styles are defined:
- `root`: Represents the root style for the component.
- `navItemSubMenu`: Represents the style for the sub-menu items.
- `navItemSubMenuItem`: Represents the style for the sub-menu item.
- `navItemLinkGroup`: Represents the style for the link group.
- `navItemLink`: Represents the style for the link.

### Variants:
The file defines the following variants for the `FooterNavigationItemGroup` component:
- `default`: Represents the default variant style for the component.
- `primary`: Represents the primary variant style for the component.
- `secondary`: Represents the secondary variant style for the component.

### Interaction Summary:
This file interacts with the rest of the application by providing the styles and props for the `FooterNavigationItemGroup` component. Other components within the application can utilize the defined styles and variants for consistent theming and styling.

### Developer Questions:
Developers working with this component may have the following questions when debugging:
1. How are the default props being utilized within the component?
2. What are the specific style overrides for each variant?
3. How can I extend or customize the styles for the `FooterNavigationItemGroup` component?
4. Are there any dependencies or interactions with other theme files or components that I need to be aware of?