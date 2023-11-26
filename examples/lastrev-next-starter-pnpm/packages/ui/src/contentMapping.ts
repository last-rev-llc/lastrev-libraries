import dynamic from 'next/dynamic';

const Block = dynamic(() => import('./Block'));
const Hero = dynamic(() => import('./Hero'));
const Link = dynamic(() => import('./Link'));
const Media = dynamic(() => import('./Media'));
const Page = dynamic(() => import('./Page'));
const Text = dynamic(() => import('./Text'));
const RichText = dynamic(() => import('./RichText'));
const Carousel = dynamic(() => import('./Carousel'));
const Collection = dynamic(() => import('./Collection'));
// const CollectionFiltered = dynamic(() => import('./CollectionFiltered'));
import CollectionFiltered from './CollectionFiltered';
const Tabs = dynamic(() => import('./Tabs'));
const Card = dynamic(() => import('./Card'));
const Person = dynamic(() => import('./Person'));
const Quote = dynamic(() => import('./Quote'));
const CategoryBlog = dynamic(() => import('./CategoryBlog'));
const Blog = dynamic(() => import('./Blog'));
const PageResource = dynamic(() => import('./PageResource'));
const Accordion = dynamic(() => import('./Accordion'));
const Form = dynamic(() => import('./Form'));
const Section = dynamic(() => import('./Section'));
const NavigationItem = dynamic(() => import('./NavigationItem'));
const InlineNavigation = dynamic(() => import('./InlineNavigation'));
const Header = dynamic(() => import('./Header'));
const Footer = dynamic(() => import('./Footer'));
const CardPricing = dynamic(() => import('./CardPricing'));
const HeaderNavLink = dynamic(() => import('./Header/HeaderNavLink/HeaderNavLink'));
const HeaderNavGroup = dynamic(() => import('./Header/HeaderNavGroup/HeaderNavGroup'));
const HeaderNavLinkNested = dynamic(() => import('./Header/HeaderNavLinkNested/HeaderNavLinkNested'));
const FooterNavigationItem = dynamic(() => import('./Footer/FooterNavigationItem'));
const FooterNavigationItemGroup = dynamic(() => import('./Footer/FooterNavigationItemGroup'));
const SiteMessage = dynamic(() => import('./SiteMessage'));
const Breadcrumbs = dynamic(() => import('./Breadcrumbs'));

const CalculatorOptimalHSA = dynamic(() => import('./Calculators/OptimalHSACalculator'));
const HSAContributionCalculator = dynamic(() => import('./Calculators/HSAContributionCalculator'));

export const contentMapping: {
  [key: string]: any;
} = {
  Block,
  Hero,
  Link,
  Media,
  Header,
  Footer,
  Page,
  Text,
  RichText,
  Carousel,
  Collection,
  'CollectionDynamic': Collection,
  // 'CollectionDynamic:filtered': CollectionFiltered,
  'Collection:.*Carousel': Carousel,
  'Collection:.*Filtered': CollectionFiltered,
  'CollectionDynamic:.*Filtered': CollectionFiltered,
  'CollectionExpandable:Tabs': Tabs,
  'CollectionExpandable:Accordion': Accordion,
  'CollectionExpandable': Tabs,
  'PricingPlan': CardPricing,
  Card,
  PageResource,
  Person,
  Blog,
  CategoryBlog,
  Quote,
  Accordion,
  Tabs,
  Section,
  FooterNavigationItem,
  FooterNavigationItemGroup,
  'ElementForm': Form,
  NavigationItem,
  'NavigationItem:link': HeaderNavLink,
  'NavigationItem:linkNested': HeaderNavLinkNested,
  'NavigationItem:group': HeaderNavGroup,
  'NavigationItem:linkFooter': FooterNavigationItem,
  'NavigationItem:linkBoldedFooter': FooterNavigationItem,
  'NavigationItem:groupFooter': FooterNavigationItemGroup,
  'NavigationItem:inlineNavigation': InlineNavigation,
  'NavigationItem:tableOfContents': InlineNavigation,
  'ModuleIntegration:calculatorOptimalHSAContribution': CalculatorOptimalHSA,
  'ModuleIntegration:calculatorHSAContribution': HSAContributionCalculator,
  SiteMessage,
  Breadcrumbs
};

export default contentMapping;
