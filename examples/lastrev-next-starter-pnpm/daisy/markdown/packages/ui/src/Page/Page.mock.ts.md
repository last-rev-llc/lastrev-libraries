### Summary:
This theme file contains the default props and styles for a Page component within a larger application. It includes imports for mock data from various components, as well as utility functions for generating random IDs. The default props define the structure and content of the Page component, including the header, footer, hero, breadcrumbs, and various content sections. The file also exports a function for creating customized mock data based on the default props.

### Import statements:
- `accordionBaseMock` from '../Accordion/Accordion.mock': Mock data for the Accordion component.
- `blockBaseMock` from '../Block/Block.mock': Mock data for the Block component.
- `collectionBaseMock` from '../Collection/Collection.mock': Mock data for the Collection component.
- `footerBaseMock` from '../Footer/Footer.mock': Mock data for the Footer component.
- `headerBaseMock` from '../Header/Header.mock': Mock data for the Header component.
- `heroBaseMock` from '../Hero/Hero.mock': Mock data for the Hero component.
- `sectionBaseMock` from '../Section/Section.mock': Mock data for the Section component.
- `tabsBaseMock` from '../Tabs/Tabs.mock': Mock data for the Tabs component.
- `breadcrumbsBaseMock` from '../Breadcrumbs/Breadcrumbs.mock': Mock data for the Breadcrumbs component.
- `carouselBaseMock` from '../Carousel/Carousel.mock': Mock data for the Carousel component.
- `randomId` from '../utils/randomId': Utility function for generating random IDs.
- `PageVariants, type PageProps` from './Page.types': Type definitions for Page variants and props.

### Default Props List:
- `pageDefaultMock`: Default props for the Page component, including ID, variant, header, footer, hero, breadcrumbs, title, and contents.

### Root Styles:
The root styles in this file define the default structure and content for the Page component. It includes the layout, header, footer, hero, breadcrumbs, title, and various content sections such as carousels, sections, blocks, collections, accordions, and tabs.

### Variants:
- `PageVariants.default`: Default variant for the Page component.

### Interaction Summary:
The Page component defined in this file interacts with other components such as Header, Footer, Hero, Breadcrumbs, Carousel, Section, Block, Collection, Accordion, and Tabs. It uses mock data from these components to populate the default props for the Page.

### Developer Questions:
- How can I customize the default props for the Page component?
- What are the available variants for the Page component and how do they affect the styles?
- How does the Page component interact with other components in the application, and what data is passed between them?