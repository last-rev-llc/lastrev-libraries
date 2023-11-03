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
const Tabs = dynamic(() => import('./Tabs'));
const Card = dynamic(() => import('./Card'));
const Person = dynamic(() => import('./Person'));
const Quote = dynamic(() => import('./Quote'));
const Blog = dynamic(() => import('./Blog'));
const Accordion = dynamic(() => import('./Accordion'));
const Form = dynamic(() => import('./Form'));
const Section = dynamic(() => import('./Section'));
const NavigationItem = dynamic(() => import('./NavigationItem'));
const Header = dynamic(() => import('./Header'));
const Footer = dynamic(() => import('./Footer'));
const HeaderNavLink = dynamic(() => import('./Header/HeaderNavLink/HeaderNavLink'));
const HeaderNavGroup = dynamic(() => import('./Header/HeaderNavGroup/HeaderNavGroup'));
const HeaderNavLinkNested = dynamic(() => import('./Header/HeaderNavLinkNested/HeaderNavLinkNested'));
const FooterNavigationItem = dynamic(() => import('./Footer/FooterNavigationItem'));
const FooterNavigationItemGroup = dynamic(() => import('./Footer/FooterNavigationItemGroup'));
const SiteMessage = dynamic(() => import('./SiteMessage'));
const Breadcrumbs = dynamic(() => import('./Breadcrumbs'));

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
  'Collection:.*Carousel': Carousel,
  'CollectionExpandable:Tabs': Tabs,
  'CollectionExpandable:Accordion': Accordion,
  'CollectionExpandable': Tabs,
  Card,
  Person,
  Blog,
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
  SiteMessage,
  Breadcrumbs
};

export default contentMapping;
