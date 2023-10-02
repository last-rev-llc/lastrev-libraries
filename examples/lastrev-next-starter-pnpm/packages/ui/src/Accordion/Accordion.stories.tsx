import Accordion from './Accordion';

import {
  accordionBaseMock,
  accordionBlocksMock,
  accordionQuotesMock,
  accordionCollectionsMock
} from './Accordion.mock';

export default {
  title: '3. Modules/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {}
};

export const Default = { args: { ...accordionBaseMock() } };
export const Blocks = { args: { ...accordionBlocksMock() } };
export const Collections = { args: { ...accordionCollectionsMock() } };
export const Quotes = { args: { ...accordionQuotesMock() } };
