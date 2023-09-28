import { lorem } from 'faker';

import { baseMock } from '../RichText/RichText.mock';
import { mediaBaseImageMock } from '../Media/Media.mock';

import type { SectionProps } from './Section.types';

const sectionDefaultMock: SectionProps = {
  id: lorem.word(),
  __typename: 'Section',
  variant: 'onePerRow',
  contents: [baseMock()]
};

export const sectionBaseMock = ({ ...override } = {}) => ({
  ...sectionDefaultMock,
  ...override
});

export const sectionOnePerRowMock = ({ ...override } = {}) => ({
  ...sectionDefaultMock,
  ...override,
  variant: 'onePerRow'
});

export const sectionTwoPerRowMock = ({ ...override } = {}) => ({
  ...sectionDefaultMock,
  ...override,
  variant: 'twoPerRow',
  contents: [baseMock(), mediaBaseImageMock()]
});

export default sectionBaseMock;
