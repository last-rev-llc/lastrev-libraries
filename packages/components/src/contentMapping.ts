import dynamic from 'next/dynamic';

const BackToTop = dynamic(() => import('@last-rev/component-library/dist/components/BackToTop'));
const CollectionCarousel = dynamic(() => import('@last-rev/component-library/dist/components/CollectionCarousel'));

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
const CollectionFiltered = dynamic(() => import('./components/CollectionFiltered'));
// const Quote = dynamic(() => import('./components/Quote'));
const Page = dynamic(() => import('./components/Page'));
const SearchBox = dynamic(() => import('./components/SearchBox'));
const AutocompleteBox = dynamic(() => import('./components/AutocompleteBox'));
const Footer = dynamic(() => import('./components/Footer'));
const PageTopic = dynamic(() => import('./components/PageTopic'));
const TopicNav = dynamic(() => import('./components/TopicNav'));
const TopicNavHorizontal = dynamic(() => import('./components/TopicNavHorizontal'));
const Article = dynamic(() => import('./components/Article/Article'));
const ArticleEmbeded = dynamic(() => import('./components/Article/ArticleEmbeded'));
const Table = dynamic(() => import('./components/Table'));
const CollectionSearchFilters = dynamic(() => import('./components/CollectionSearchFilters'));
const CollectionSearchResults = dynamic(() => import('./components/CollectionSearchResults'));
const Document = dynamic(() => import('./components/Document'));

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
  Media,
  Link,
  NavigationItem,
  Hero,
  // Quote,

  Footer,
  // TODO: Article is using custom Text component
  // 'Text:article': ArticleText,
  // TODO: Everything else is using LR Text
  Text,
  'ModuleIntegration:search-box': SearchBox,
  'ModuleIntegration:autocomplete-search-box': AutocompleteBox,
  PageTopic,
  TopicNav,
  TopicNavHorizontal,
  'Collection:Search Filters': CollectionSearchFilters,
  'Collection:Search Results': CollectionSearchResults,
  'CategoryArticle': PageTopic,
  Article,
  'Article:embeded': ArticleEmbeded,
  Table,
  Document
};

export default contentMapping;
