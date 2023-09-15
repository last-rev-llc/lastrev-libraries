import Collection from './Collection';
import {
  collectionBaseMock,
  collectionIconMock,
  collectionLogoMock,
  collectionMediaMock,
  collectionPricingMock,
  collectionPersonMock,
  collectionQuoteMock,
  collectionBlogMock
} from './Collection.mock';

export default {
  title: '3. Modules/Collection',
  component: Collection,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],

  argTypes: {
    variant: {
      name: 'LayoutStyle',
      control: {
        type: 'select',
        options: ['onePerRow', 'twoPerRow', 'threePerRow', 'fourPerRow']
      }
    },
    background: { name: 'Background' }
  }
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = { args: { ...collectionBaseMock() } };
export const Icons = { args: { ...collectionIconMock() } };
export const Logos = { args: { ...collectionLogoMock() } };
export const Media = { args: { ...collectionMediaMock() } };
export const Pricing = { args: { ...collectionPricingMock() } };
export const Person = { args: { ...collectionPersonMock() } };
export const Quote = { args: { ...collectionQuoteMock() } };
export const Blog = { args: { ...collectionBlogMock() } };
