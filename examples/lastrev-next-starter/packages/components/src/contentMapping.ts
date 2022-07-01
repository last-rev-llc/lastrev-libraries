import dynamic from 'next/dynamic';

import Section from './components/Section';
import Card from './components/Card';
import Collection from './components/Collection';
import NavigationBar from './components/NavigationBar';
import Link from './components/Link';
import NavigationItem from './components/NavigationItem';
import Header from './components/Header';
import Hero from './components/Hero';

import Media from './components/Media';
// import Text from './components/Text';

// const Media = dynamic(() => import('./components/Media'));
const Text = dynamic(() => import('./components/Text'));
const CollectionAccordion = dynamic(() => import('./components/CollectionAccordion'));
const BackToTop = dynamic(() => import('@last-rev/component-library/dist/components/BackToTop'));
const CollectionCarousel = dynamic(() => import('@last-rev/component-library/dist/components/CollectionCarousel'));

// Custom components
const CollectionFiltered = dynamic(() => import('./components/CollectionFiltered'));

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
