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
import { MailchimpFormProps } from '../components/MailchimpForm';
import { MediaProps } from '../components/Media';
import { SectionProps } from '../components/Section';
import { CollectionProps } from '../components/Collection';
import { CollectionCarouselProps } from '../components/CollectionCarousel';
import { CollectionFilteredProps } from '../components/CollectionFiltered';
import { CollectionAccordionProps } from '../components/CollectionAccordion';
import { NavigationBarProps } from '../components/NavigationBar';
import { BackToTopProps } from '../components/BackToTop';
import { FormMarketoEmbedProps } from '../components/FormMarketoEmbed';

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
    MailchimpForm: MailchimpFormProps;
    Media: MediaProps;
    Section: SectionProps;
    Collection: CollectionProps;
    CollectionCarousel: CollectionCarouselProps;
    CollectionFiltered: CollectionFilteredProps;
    CollectionAccordion: CollectionAccordionProps;
    NavigationBar: NavigationBarProps;
    BackToTop: BackToTopProps;
    FormMarketoEmbed: FormMarketoEmbedProps;
  }
}
