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
const CollectionDynamic = dynamic(() => import('./CollectionDynamic'));
const Tabs = dynamic(() => import('./Tabs'));
const Card = dynamic(() => import('./Card'));
const Person = dynamic(() => import('./Person'));
const Property = dynamic(() => import('./Property'));
const Blog = dynamic(() => import('./Blog'));
const Accordion = dynamic(() => import('./Accordion'));
const FormContactUs = dynamic(() => import('./FormContactUs'));
const FormPeru = dynamic(() => import('./FormPeru'));
const FormAnnualInvestor = dynamic(() => import('./FormAnnualInvestor'));
const Section = dynamic(() => import('./Section'));
const NavigationItem = dynamic(() => import('./NavigationItem'));
const Header = dynamic(() => import('./Header'));
const Footer = dynamic(() => import('./Footer'));
const HeaderNavLink = dynamic(() => import('./Header/HeaderNavLink/HeaderNavLink'));
const HeaderNavGroup = dynamic(() => import('./Header/HeaderNavGroup/HeaderNavGroup'));
const HeaderNavLinkNested = dynamic(() => import('./Header/HeaderNavLinkNested/HeaderNavLinkNested'));
const FooterNavigationItem = dynamic(() => import('./Footer/FooterNavigationItem'));
const FooterNavigationItemGroup = dynamic(() => import('./Footer/FooterNavigationItemGroup'));

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
  Collection,
  'CollectionDynamic(:.*Carousel)?': CollectionDynamic,
  'Collection:.*Carousel': Carousel,
  'CollectionExpandable(:Tabs)?': Tabs,
  'CollectionExpandable:Accordion': Accordion,
  Card,
  Person,
  'PageProperty': Property,
  Blog,
  Section,
  'ElementForm:peru': FormPeru,
  'ElementForm:contactUs': FormContactUs,
  'ElementForm:annualInvestorMeeting2024': FormAnnualInvestor,
  NavigationItem,
  'NavigationItem:link': HeaderNavLink,
  'NavigationItem:linkNested': HeaderNavLinkNested,
  'NavigationItem:group': HeaderNavGroup,
  'NavigationItem:linkFooter': FooterNavigationItem,
  'NavigationItem:(linkBoldedFooter|labelFooter|footerContactDetailsFooter|groupFooter)': FooterNavigationItemGroup
};

export default contentMapping;
