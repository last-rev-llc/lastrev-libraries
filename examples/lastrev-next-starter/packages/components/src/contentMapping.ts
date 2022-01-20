import dynamic from 'next/dynamic';

const Section = dynamic(() => import('@last-rev/component-library/dist/components/Section/Section'));

const Card = dynamic(() => import('@last-rev/component-library/dist/components/Card/Card'));

const Collection = dynamic(() => import('@last-rev/component-library/dist/components/Collection/Collection'));

const CollectionCarousel = dynamic(
  () => import('@last-rev/component-library/dist/components/CollectionCarousel/CollectionCarousel')
);

const CollectionAccordion = dynamic(
  () => import('@last-rev/component-library/dist/components/CollectionAccordion/CollectionAccordion')
);

const NavigationBar = dynamic(() => import('@last-rev/component-library/dist/components/NavigationBar/NavigationBar'));

const Media = dynamic(() => import('@last-rev/component-library/dist/components/Media/Media'));

const Link = dynamic(() => import('@last-rev/component-library/dist/components/Link/Link'));

const NavigationItem = dynamic(
  () => import('@last-rev/component-library/dist/components/NavigationItem/NavigationItem')
);

const Header = dynamic(() => import('@last-rev/component-library/dist/components/Header/Header'));

const Hero = dynamic(() => import('@last-rev/component-library/dist/components/Hero/Hero'));

const Text = dynamic(() => import('@last-rev/component-library/dist/components/Text/Text'));

const BackToTop = dynamic(() => import('@last-rev/component-library/dist/components/BackToTop/BackToTop'));

// Custom components
const CollectionFiltered = dynamic(
  () => import('@lrns/components/src/components/CollectionFiltered/CollectionFiltered')
);

// Custom components
const Quote = dynamic(() => import('@lrns/components/src/components/Quote/Quote'));
const PageGeneral = dynamic(() => import('@lrns/components/src/components/PageGeneral/PageGeneral'));
const PageBlog = dynamic(() => import('@lrns/components/src/components/PageBlog/PageBlog'));

const contentMapping: {
  [key: string]: any;
} = {
  'Page': PageGeneral,
  'Blog': PageBlog,
  Header,
  Section,
  Collection,
  'Collection:carousel': CollectionCarousel,
  'Collection:accordion': CollectionAccordion,
  'Collection:filtered': CollectionFiltered,
  'Collection:carousel-large': CollectionCarousel,
  'Collection:carousel-small': CollectionCarousel,
  'Collection:navigation-bar': NavigationBar,
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
