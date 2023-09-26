import { lorem } from 'faker';

import { baseMock } from '../RichText/RichText.mock';
import { mediaBaseImageMock } from '../Media/Media.mock';

import { SectionProps } from './Section.types';
import blockBaseMock, { blockContentOnRightFullBleedMock } from '../Block/Block.mock';
import collectionBaseMock from '../Collection/Collection.mock';

const sectionDefaultMock = () => ({
  id: lorem.word(),
  __typename: 'Section',
  variant: 'onePerRow',
  backgroundColor: 'secondary',
  contents: [blockBaseMock(), blockBaseMock({ variant: '' }), collectionBaseMock(), collectionBaseMock()]
});

export const sectionBaseMock = ({ ...override } = {}) => ({
  ...sectionDefaultMock(),
  ...override
});

export const sectionOnePerRowMock = ({ ...override } = {}) => ({
  ...sectionDefaultMock(),
  ...override,
  variant: 'onePerRow'
});

export const sectionTwoPerRowMock = ({ ...override } = {}) => ({
  ...sectionDefaultMock(),
  ...override,
  variant: 'twoPerRow'
});

export default sectionBaseMock;
