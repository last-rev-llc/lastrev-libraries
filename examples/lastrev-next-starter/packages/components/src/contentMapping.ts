import dynamic from 'next/dynamic';

const Section = dynamic(() => import('./components/Section'));

const Card = dynamic(() => import('./components/Card'));

const Collection = dynamic(() => import('./components/Collection'));

const CollectionAccordion = dynamic(() => import('./components/CollectionAccordion'));

const NavigationBar = dynamic(() => import('./components/NavigationBar'));

const Media = dynamic(() => import('./components/Media'));

const Link = dynamic(() => import('./components/Link'));

const NavigationItem = dynamic(() => import('./components/NavigationItem'));

const Header = dynamic(() => import('./components/Header'));

const Hero = dynamic(() => import('./components/Hero'));

const Text = dynamic(() => import('./components/Text'));

const BackToTop = dynamic(() => import('@last-rev/component-library/dist/components/BackToTop'));
const CollectionCarousel = dynamic(() => import('@last-rev/component-library/dist/components/CollectionCarousel'));

// Custom components
const CollectionFiltered = dynamic(() => import('./components/CollectionFiltered'));
const ModuleIntegration = dynamic(() => import('./components/ModuleIntegration'));

// Custom components
const Quote = dynamic(() => import('./components/Quote'));
const Page = dynamic(() => import('./components/Page'));

const contentMapping: {
  [key: string]: any;
} = {
  Page,
  Header,
  Section,
  Collection,
  'Collection:carousel': CollectionCarousel,
  'Collection:accordion': CollectionAccordion,
  'Collection:filtered': CollectionFiltered,
  'Collection:carousel-large': CollectionCarousel,
  'Collection:carousel-small': CollectionCarousel,
  'Collection:navigation-bar': NavigationBar,
  ModuleIntegration,
  BackToTop,
  Card,
  Text,
  Media,
  Link,
  NavigationItem,
  Hero,
  Quote
};

export default contentMapping;
