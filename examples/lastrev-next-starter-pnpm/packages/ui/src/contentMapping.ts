import Block from './Block';
import Hero from './Hero';
import Link from './Link';
import Media from './Media';
import Page from './Page';
import Text from './Text';
import Collection from './Collection';
import Tabs from './Tabs';
import Card from './Card';
import Person from './Person';
import Quote from './Quote';
import Blog from './Blog';
import Accordion from './Accordion';

import Section from './Section';
import NavigationBar from './NavigationBar';
import NavigationItem from './NavigationItem';
import HeaderNavLink from './Header/HeaderNavLink';
import HeaderNavGroup from './Header/HeaderNavGroup';
import HeaderNavLinkNested from './Header/HeaderNavLinkNested';
import FooterNavigationItem from './FooterNavigationItem';
import FooterNavigationItemGroup from './FooterNavigationItemGroup';

export const contentMapping: {
  [key: string]: any;
} = {
  Block,
  Hero,
  Link,
  Media,
  Page,
  Text,
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
