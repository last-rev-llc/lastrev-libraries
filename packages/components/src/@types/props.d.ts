import { AccordionProps } from '../components/Accordion';
import { CardProps } from '../components/Card';
import { ContentModuleProps } from '../components/ContentModule';
import { ErrorBoundaryProps } from '../components/ErrorBoundary';
import { SEOProps } from '../components/SEO';
import { ContentPreviewProps } from '../components/ContentPreview';
import { NavigationItemProps } from '../components/NavigationItem';
import { TextProps } from '../components/Text';
import { ImageProps } from '../components/Image';
import { LinkProps } from '../components/Link';
import { HeaderProps } from '../components/Header';
import { HeroProps } from '../components/Hero';
import { MediaProps } from '../components/Media';
import { SectionProps } from '../components/Section';
import { CollectionProps } from '../components/Collection';
import { CollectionFilteredProps } from '../components/CollectionFiltered';
import { CollectionAccordionProps } from '../components/CollectionAccordion';
import { NavigationBarProps } from '../components/NavigationBar';
import { QuoteProps } from '../components/Quote';
import { PageProps } from '../components/Page';

declare module '@mui/material/styles' {
  export interface ComponentsPropsList {
    Accordion: AccordionProps;
    Card: CardProps;
    ContentModule: ContentModuleProps;
    ErrorBoundary: ErrorBoundaryProps;
    SEO: SEOProps;
    ContentPreview: ContentPreviewProps;
    NavigationItem: NavigationItemProps;
    Text: TextProps;
    Image: ImageProps;
    Link: LinkProps;
    Header: HeaderProps;
    Hero: HeroProps;
    Media: MediaProps;
    Section: SectionProps;
    Collection: CollectionProps;
    CollectionFiltered: CollectionFilteredProps;
    CollectionAccordion: CollectionAccordionProps;
    NavigationBar: NavigationBarProps;
    Page: PageProps;
    // MailchimpForm: MailchimpFormProps;
    // CollectionCarousel: CollectionCarouselProps;
    // BackToTop: BackToTopProps;
    // FormMarketoEmbed: FormMarketoEmbedProps;

    // Custom components
    Quote: QuoteProps;
  }
}
