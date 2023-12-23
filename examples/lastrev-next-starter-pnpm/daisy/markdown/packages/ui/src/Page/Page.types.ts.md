### Summary:
This theme file defines the styles and props for the Page component within a Material UI application. It includes the default props, root styles, and variants for the Page component.

### Import statements:
- `ComponentsOverrides`, `ComponentsVariants`, and `ComponentsProps` are imported from `@mui/material` to handle component overrides, variants, and props.
- `Page_BaseFragmentFragment` is imported from `@graphql-sdk/types` to define the base fragment for the Page component.
- `LinkProps` is imported from `../Link/Link.types` to define the props for the Link component.

### Default Props List:
- `PageProps` interface defines the props for the Page component, including `disableBackToTop`, `variant`, and `breadcrumbs`.
- `PageClasses` interface defines the root class for the Page component.

### Root Styles:
- The `root` style is defined in the `PageClasses` interface, which represents the root class for the Page component. This style likely includes layout, spacing, and typography configurations for the Page component.

### Variants:
- The `PageVariants` enum defines the available variants for the Page component, with the only variant being `default`.
- The `variants` property in the `Components` interface allows for defining styles for different variants of the Page component.

### Interaction Summary:
This file interacts with the rest of the application by providing a centralized location for managing the styles and props of the Page component. Other components and pages within the application can utilize the defined props and styles for consistent theming and styling.

### Developer Questions:
- How can I add custom styles or overrides for the Page component?
- What are the available variants for the Page component, and how are they used?
- How can I extend the Page component to include additional props or styles?
- What is the purpose of the `disableBackToTop` prop, and how does it affect the Page component?