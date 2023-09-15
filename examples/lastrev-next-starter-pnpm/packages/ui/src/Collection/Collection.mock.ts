import { lorem } from 'faker';
import { CollectionProps } from './Collection.types';
import { cardBaseMock } from '../Card/Card.mock';
import { introTextMock } from '../Text/Text.mock';

const collectionDefaultMock: CollectionProps = {
  id: lorem.word(),
  __typename: 'Collection',
  variant: 'threePerRow',
  items: [cardBaseMock(), cardBaseMock({ title: lorem.sentence }), cardBaseMock(), cardBaseMock()],
  itemsVariant: 'default',
  introText: introTextMock()
};

export const collectionBaseMock = ({ ...override } = {}) => ({
  ...collectionDefaultMock,
  ...override
});

export const collectionIconMock = ({ ...override } = {}) => ({
  ...collectionDefaultMock,
  ...override,
  itemsVariant: 'icon'
});

export const collectionLogoMock = ({ ...override } = {}) => ({
  ...collectionDefaultMock,
  ...override,
  itemsVariant: 'logo'
});

export const collectionMediaMock = ({ ...override } = {}) => ({
  ...collectionDefaultMock,
  ...override,
  itemsVariant: 'media'
});

export const collectionPricingMock = ({ ...override } = {}) => ({
  ...collectionDefaultMock,
  ...override,
  itemsVariant: 'pricing'
});

export const collectionPersonMock = ({ ...override } = {}) => ({
  ...collectionDefaultMock,
  ...override,
  itemsVariant: 'person'
});

export const collectionQuoteMock = ({ ...override } = {}) => ({
  ...collectionDefaultMock,
  ...override,
  itemsVariant: 'quote'
});

export const collectionBlogMock = ({ ...override } = {}) => ({
  ...collectionDefaultMock,
  ...override,
  itemsVariant: 'blog'
});

export default collectionBaseMock;
