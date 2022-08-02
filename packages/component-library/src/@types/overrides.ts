import { AccordionClassKey } from '../components/Accordion';
import { CardClassKey } from '../components/Card';
import { ContentModuleClassKey } from '../components/ContentModule';
import { ErrorBoundaryClassKey } from '../components/ErrorBoundary';
import { SEOClassKey } from '../components/SEO';
import { ContentPreviewClassKey } from '../components/ContentPreview';
import { CollectionClassKey } from '../components/Collection';
import { CollectionCarouselClassKey } from '../components/CollectionCarousel';
import { CollectionFilteredClassKey } from '../components/CollectionFiltered';
import { CollectionAccordionClassKey } from '../components/CollectionAccordion';
import { NavigationItemClassKey } from '../components/NavigationItem';
import { TextClassKey } from '../components/Text';
import { ImageClassKey } from '../components/Image';
import { LinkClassKey } from '../components/Link';
import { HeaderClassKey } from '../components/Header';
import { HeroClassKey } from '../components/Hero';
import { MailchimpFormClassKey } from '../components/MailchimpForm';
import { MediaClassKey } from '../components/Media';
import { SectionClassKey } from '../components/Section';
import { NavigationBarClassKey } from '../components/NavigationBar';
import { BackToTopClassKey } from '../components/BackToTop';
import { FormMarketoEmbedClassKey } from '../components/FormMarketoEmbed';

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    Accordion: AccordionClassKey;
    Card: CardClassKey;
    ContentModule: ContentModuleClassKey;
    ErrorBoundary: ErrorBoundaryClassKey;
    SEO: SEOClassKey;
    ContentPreview: ContentPreviewClassKey;
    NavigationItem: NavigationItemClassKey;
    Text: TextClassKey;
    Image: ImageClassKey;
    Link: LinkClassKey;
    Header: HeaderClassKey;
    Hero: HeroClassKey;
    MailchimpForm: MailchimpFormClassKey;
    Media: MediaClassKey;
    Section: SectionClassKey;
    Collection: CollectionClassKey;
    CollectionCarousel: CollectionCarouselClassKey;
    CollectionFiltered: CollectionFilteredClassKey;
    CollectionAccordion: CollectionAccordionClassKey;
    NavigationBar: NavigationBarClassKey;
    BackToTop: BackToTopClassKey;
    FormMarketoEmbed: FormMarketoEmbedClassKey;
  }
}
