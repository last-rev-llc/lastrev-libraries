import dynamic from 'next/dynamic';
const Block = dynamic(() => import('./Block'));
const Hero = dynamic(() => import('./Hero'));
const Link = dynamic(() => import('./Link'));
const Media = dynamic(() => import('./Media'));
const Page = dynamic(() => import('./Page'));
const Text = dynamic(() => import('./Text'));
const RichText = dynamic(() => import('./RichText'));
const Collection = dynamic(() => import('./Collection'));
const Tabs = dynamic(() => import('./Tabs'));
const Card = dynamic(() => import('./Card'));
const Person = dynamic(() => import('./Person'));
const Quote = dynamic(() => import('./Quote'));
const Blog = dynamic(() => import('./Blog'));
const Accordion = dynamic(() => import('./Accordion'));
const Section = dynamic(() => import('./Section'));
const NavigationBar = dynamic(() => import('./NavigationBar'));
const NavigationItem = dynamic(() => import('./NavigationItem'));
const HeaderNavLink = dynamic(() => import('./Header/HeaderNavLink'));
const HeaderNavGroup = dynamic(() => import('./Header/HeaderNavGroup'));
const HeaderNavLinkNested = dynamic(() => import('./Header/HeaderNavLinkNested'));
const FooterNavigationItem = dynamic(() => import('./FooterNavigationItem'));
const FooterNavigationItemGroup = dynamic(() => import('./FooterNavigationItemGroup'));

export const contentMapping: {
  [key: string]: any;
} = {
  Block,
  Hero,
  Link,
  Media,
  Page,
  Text,
  RichText,
  Collection,
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
  NavigationBar,
  NavigationItem,
  HeaderNavLink,
  HeaderNavGroup,
  HeaderNavLinkNested,
  FooterNavigationItem,
  FooterNavigationItemGroup
};

export default contentMapping;
