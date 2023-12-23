### Summary:
This theme file defines the styles and props for the Header component in a Material UI application. It includes the definition of the HeaderProps interface, HeaderOwnerState interface, HeaderClasses interface, and also declares the HeaderClassKey. Additionally, it extends the ComponentsPropsList and Components interfaces from the Material UI library to include the Header component.

### Import statements:
The file imports the following dependencies:
- `ComponentsOverrides`, `ComponentsVariants`, `ComponentsProps` from `@mui/material`: These are used to extend the Material UI components and define overrides and variants for the Header component.
- `Header_BaseFragmentFragment` from `@graphql-sdk/types`: This is used to define the base fragment for the Header component.
- `RichTextProps` from `../RichText`: This is used to define the props for the RichText component.
- `MediaProps` from `../Media`: This is used to define the props for the Media component.
- `LinkProps` from `../Link`: This is used to define the props for the Link component.

### Default Props List:
The default props for the Header component are defined in the HeaderProps interface, which includes the following properties:
- `variant`: Specifies the variant of the Header component.
- `sidekickLookup`: An optional property of any type.
- `menuVisible`: Specifies whether the menu is visible.
- `menuBreakpoint`: Specifies the breakpoint for the menu.
- `siteMessageIcon`: Props for the site message icon.
- `siteMessageText`: Props for the site message text.
- `siteMessageLink`: Props for the site message link.

### Root Styles:
The file defines the following root styles for the Header component:
- `root`: The root style for the Header component.
- `siteMessageWrap`: Style for the site message wrapper.
- `logo`: Style for the logo.
- `logoRoot`: Style for the root of the logo.
- `contentContainer`: Style for the content container.
- `contentSpacer`: Style for the content spacer.
- `headerMenuNav`: Style for the header menu navigation.
- `headerMobileNavWrap`: Style for the mobile navigation wrapper.
- `headerMenuNavItems`: Style for the menu navigation items.
- `headerMenuNavItem`: Style for the menu navigation item.
- `headerMenuNavItemLink`: Style for the menu navigation item link.
- `headerMenuCtas`: Style for the menu CTAs.
- `headerMenuCtaItem`: Style for the menu CTA item.
- `menuIcon`: Style for the menu icon.
- `closeIcon`: Style for the close icon.
- `iconButtonWrap`: Style for the icon button wrapper.
- `iconButton`: Style for the icon button.
- `contentOuterGrid`: Style for the outer grid of the content.

### Variants:
The file defines the following variants for the Header component:
- `elevation`: Variant for the elevated Header.
- `outlined`: Variant for the outlined Header.

### Interaction Summary:
The Header component defined in this file interacts with other parts of the application by providing styles and props for the header section. It can be used in conjunction with other components such as RichText, Media, and Link to create a cohesive header section for the application.

### Developer Questions:
Developers working with this component may have the following questions when debugging:
1. How are the default props for the Header component being used in different parts of the application?
2. What are the specific use cases for the `elevation` and `outlined` variants of the Header component?
3. How are the root styles being applied to the Header component and its child elements?
4. Are there any specific interactions between the Header component and other components in the application that need to be considered during development or debugging?