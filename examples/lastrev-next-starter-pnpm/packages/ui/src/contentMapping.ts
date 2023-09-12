import Block from './Block';
import Hero from './Hero';
import Link from './Link';
import Media from './Media';
import Page from './Page';
import Text from './Text';
import Block from './Block';
import Accordion from './Accordion';

export const contentMapping: {
  [key: string]: any;
} = {
  Block,
  Hero,
  Link,
  Media,
  Page,
  Text,
  Block,
  Accordion // TODO: Enhance accordion with expandable
};

export default contentMapping;
