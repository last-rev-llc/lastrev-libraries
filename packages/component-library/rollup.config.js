import { config } from '@last-rev/rollup-config';

export default config({
  input: [
    `./src/index.tsx`,
    './src/components/Accordion/index.ts',
    './src/components/ArtDirectedImage/index.ts',
    './src/components/BackToTop/index.ts',
    './src/components/Card/index.ts',
    './src/components/Collection/index.ts',
    './src/components/CollectionAccordion/index.ts',
    './src/components/CollectionAccordionMedia/index.ts',
    './src/components/CollectionCarousel/index.ts',
    './src/components/CollectionFiltered/index.ts',
    './src/components/ContentModule/index.ts',
    './src/components/ContentPreview/index.ts',
    './src/components/ErrorBoundary/index.ts',
    './src/components/FormMarketoEmbed/index.ts',
    './src/components/Header/index.ts',
    './src/components/Hero/index.ts',
    './src/components/Image/index.ts',
    './src/components/Link/index.ts',
    './src/components/MailchimpForm/index.ts',
    './src/components/Media/index.ts',
    './src/components/NavigationBar/index.ts',
    './src/components/NavigationItem/index.ts',
    './src/components/Section/index.ts',
    './src/components/SEO/index.ts',
    './src/components/Text/index.ts'
  ],
  babelHelpers: 'runtime',
  preserveModules: true,
  disableTerser: true
});
