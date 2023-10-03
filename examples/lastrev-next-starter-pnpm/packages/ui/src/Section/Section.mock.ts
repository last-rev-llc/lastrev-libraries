import { baseMock } from '../RichText/RichText.mock';
import { mediaBaseImageMock } from '../Media/Media.mock';

import { randomId } from '../utils/randomId';

import type { SectionProps } from './Section.types';

const sectionDefaultMock: SectionProps = {
  id: randomId(),
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
