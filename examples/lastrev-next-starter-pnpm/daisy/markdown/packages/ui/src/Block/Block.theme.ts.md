### Summary:
This theme file contains the styles for the `Block` component in a Material UI application. It includes default props, root styles, and variants for different layouts of the `Block` component.

### Import statements:
- `ThemeOptions`, `ComponentsProps`, `ComponentsOverrides`, `ComponentsVariants` are imported from `@mui/material/styles`.
- `Theme` is imported from `@ui/ThemeRegistry/theme.types`.
- `BlockVariants` is imported from `./Block.types`.

### Default Props List:
- `defaultProps` is an object containing the default props for the `Block` component, with the `variant` set to `BlockVariants.contentOnRight`.

### Root Styles:
The `styleOverrides` object contains the root styles for the `Block` component. It includes various CSS properties such as `display`, `flexDirection`, and `gridColumn`, as well as conditional styles based on breakpoints.

### Variants:
The `createVariants` function generates different variants for the `Block` component based on the `BlockVariants` enum. Each variant includes specific styles for the `mainContentWrap` and `sideContentWrap` elements, adjusting their grid placement and layout based on the variant.

- `BlockVariants.contentOnRight`
- `BlockVariants.contentOnRightFullBleed`
- `BlockVariants.contentOnLeft`
- `BlockVariants.contentOnLeftFullBleed`
- `BlockVariants.contentAbove`
- `BlockVariants.contentBelow`

### Interaction Summary:
The styles defined in this file will be applied to the `Block` component within the Material UI application. The default props, root styles, and variants will determine the appearance and layout of the `Block` component based on the specified variant.

### Developer Questions:
1. How can I add additional variants for the `Block` component?
2. What are the specific breakpoints used in the conditional styles?
3. How can I override these styles for a specific instance of the `Block` component?
4. What are the available options for the `variant` prop in the `Block` component?
