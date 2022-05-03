// import { ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';

import { ComponentsOverrides, ComponentsProps, ComponentsVariants } from '@mui/material';

declare module '@mui/material/styles' {
  interface Components {
    Page?: {
      defaultProps?: ComponentsProps['Page'];
      styleOverrides?: ComponentsOverrides<Theme>['Page'];
      /**
       * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
       */
      variants?: ComponentsVariants['Page'];
    };
    Accordion?: {
      defaultProps?: ComponentsProps['Accordion'];
      styleOverrides?: ComponentsOverrides<Theme>['Accordion'];
      /**
       * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
       */
      variants?: ComponentsVariants['Accordion'];
    };
    Card?: {
      defaultProps?: ComponentsProps['Card'];
      styleOverrides?: ComponentsOverrides<Theme>['Card'];
      /**
       * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
       */
      variants?: ComponentsVariants['Card'];
    };

    ContentModule?: {
      defaultProps?: ComponentsProps['ContentModule'];
      styleOverrides?: ComponentsOverrides<Theme>['ContentModule'];
      /**
       * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
       */
      variants?: ComponentsVariants['ContentModule'];
    };
    ErrorBoundary?: {
      defaultProps?: ComponentsProps['ErrorBoundary'];
      styleOverrides?: ComponentsOverrides<Theme>['ErrorBoundary'];
      /**
       * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
       */
      variants?: ComponentsVariants['ErrorBoundary'];
    };
    SEO?: {
      defaultProps?: ComponentsProps['SEO'];
      styleOverrides?: ComponentsOverrides<Theme>['SEO'];
      /**
       * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
       */
      variants?: ComponentsVariants['SEO'];
    };

    ContentPreview?: {
      defaultProps?: ComponentsProps['ContentPreview'];
      styleOverrides?: ComponentsOverrides<Theme>['ContentPreview'];
      /**
       * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
       */
      variants?: ComponentsVariants['ContentPreview'];
    };
    NavigationItem?: {
      defaultProps?: ComponentsProps['NavigationItem'];
      styleOverrides?: ComponentsOverrides<Theme>['NavigationItem'];
      /**
       * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
       */
      variants?: ComponentsVariants['NavigationItem'];
    };
    Text?: {
      defaultProps?: ComponentsProps['Text'];
      styleOverrides?: ComponentsOverrides<Theme>['Text'];
      /**
       * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
       */
      variants?: ComponentsVariants['Text'];
    };
    Image?: {
      defaultProps?: ComponentsProps['Image'];
      styleOverrides?: ComponentsOverrides<Theme>['Image'];
      /**
       * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
       */
      variants?: ComponentsVariants['Image'];
    };
    Link?: {
      defaultProps?: ComponentsProps['Link'];
      styleOverrides?: ComponentsOverrides<Theme>['Link'];
      /**
       * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
       */
      variants?: ComponentsVariants['Link'];
    };
    Header?: {
      defaultProps?: ComponentsProps['Header'];
      styleOverrides?: ComponentsOverrides<Theme>['Header'];
      /**
       * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
       */
      variants?: ComponentsVariants['Header'];
    };
    Hero?: {
      defaultProps?: ComponentsProps['Hero'];
      styleOverrides?: ComponentsOverrides<Theme>['Hero'];
      /**
       * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
       */
      variants?: ComponentsVariants['Hero'];
    };

    Media?: {
      defaultProps?: ComponentsProps['Media'];
      styleOverrides?: ComponentsOverrides<Theme>['Media'];
      /**
       * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
       */
      variants?: ComponentsVariants['Media'];
    };
    Section?: {
      defaultProps?: ComponentsProps['Section'];
      styleOverrides?: ComponentsOverrides<Theme>['Section'];
      /**
       * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
       */
      variants?: ComponentsVariants['Section'];
    };
    Collection?: {
      defaultProps?: ComponentsProps['Collection'];
      styleOverrides?: ComponentsOverrides<Theme>['Collection'];
      /**
       * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
       */
      variants?: ComponentsVariants['Collection'];
    };

    CollectionFiltered?: {
      defaultProps?: ComponentsProps['CollectionFiltered'];
      styleOverrides?: ComponentsOverrides<Theme>['CollectionFiltered'];
      /**
       * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
       */
      variants?: ComponentsVariants['CollectionFiltered'];
    };
    CollectionAccordion?: {
      defaultProps?: ComponentsProps['CollectionAccordion'];
      styleOverrides?: ComponentsOverrides<Theme>['CollectionAccordion'];
      /**
       * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
       */
      variants?: ComponentsVariants['CollectionAccordion'];
    };
    NavigationBar?: {
      defaultProps?: ComponentsProps['NavigationBar'];
      styleOverrides?: ComponentsOverrides<Theme>['NavigationBar'];
      /**
       * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
       */
      variants?: ComponentsVariants['NavigationBar'];
    };
    // MailchimpForm?: {
    //   defaultProps?: ComponentsProps['MailchimpForm'];
    //   styleOverrides?: ComponentsOverrides<Theme>['MailchimpForm'];
    //   /**
    //    * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
    //    */
    //   variants?: ComponentsVariants['MailchimpForm'];
    // };
    // CollectionCarousel?: {
    //   defaultProps?: ComponentsProps['CollectionCarousel'];
    //   styleOverrides?: ComponentsOverrides<Theme>['CollectionCarousel'];
    //   /**
    //    * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
    //    */
    //   variants?: ComponentsVariants['CollectionCarousel'];
    // };
    // BackToTop?: {
    //   defaultProps?: ComponentsProps['BackToTop'];
    //   styleOverrides?: ComponentsOverrides<Theme>['BackToTop'];
    //   /**
    //    * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
    //    */
    //   variants?: ComponentsVariants['BackToTop'];
    // };
    // FormMarketoEmbed?: {
    //   defaultProps?: ComponentsProps['FormMarketoEmbed'];
    //   styleOverrides?: ComponentsOverrides<Theme>['FormMarketoEmbed'];
    //   /**
    //    * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
    //    */
    //   variants?: ComponentsVariants['FormMarketoEmbed'];
    // };
    Quote?: {
      defaultProps?: ComponentsProps['Quote'];
      styleOverrides?: ComponentsOverrides<Theme>['Quote'];
      /**
       * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
       */
      variants?: ComponentsVariants['Quote'];
    };
  }
}
