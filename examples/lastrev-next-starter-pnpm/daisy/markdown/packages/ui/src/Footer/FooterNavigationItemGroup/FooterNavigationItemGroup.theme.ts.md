### Summary:
This theme file defines the styles for the `FooterNavigationItemGroup` component within the Material UI theme. It includes default props, root styles, and variants for the component.

### Import statements:
The file imports the following types from `@mui/material/styles` and `@ui/ThemeRegistry/theme.types`:
- `ThemeOptions`: The options for the theme.
- `ComponentsProps`: The props for the components.
- `ComponentsOverrides`: The overrides for the components.
- `ComponentsVariants`: The variants for the components.
- `Theme`: The type for the theme.

### Default Props List:
The default props for the `FooterNavigationItemGroup` component are defined as an empty object.

### Root Styles:
- `root`: Defines the root style for the `FooterNavigationItemGroup` component, setting the display to flex, the flexDirection to column, and the gap to a calculated value.
- `navItemLinkGroup`: Sets the typography to `bodyLarge` and the gap to a calculated value.
- `navItemSubMenu`: Defines the style for the sub menu, setting the display to flex, the flexDirection to column, and the gap to a calculated value.
- `navItemSubMenuItem`: Sets the padding to 0 for the sub menu items.

### Variants:
There are no specific variants defined in this file. The `createVariants` function is empty, so it does not create any variants for the `FooterNavigationItemGroup` component.

### Interaction Summary:
This file interacts with the rest of the application by providing the styles for the `FooterNavigationItemGroup` component. Other components within the application that use `FooterNavigationItemGroup` will inherit these styles from the theme.

### Developer Questions:
- How are the root styles being applied to the `FooterNavigationItemGroup` component?
- Are there any specific variants for the `FooterNavigationItemGroup` component that can be customized?
- How can the styles in this file be overridden or extended in other parts of the application?