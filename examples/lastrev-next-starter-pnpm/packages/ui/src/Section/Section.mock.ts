import { accordionBaseMock } from '../Accordion/Accordion.mock';
import { blockBaseMock } from '../Block/Block.mock';
import { collectionBaseMock } from '../Collection/Collection.mock';
import { tabsBaseMock } from '../Tabs/Tabs.mock';
import { introTextMock } from '../Text/Text.mock';
import { mediaBaseImageMock } from '../Media/Media.mock';

import { randomId } from '../utils/randomId';

import { type SectionProps, SectionVariants } from './Section.types';

const sectionDefaultMock = (override?: Partial<SectionProps>): SectionProps => {
  const baseMock: SectionProps = {
    id: randomId(),
    __typename: 'Section',
    variant: SectionVariants.onePerRow,
    // introText: introTextMock(),
    backgroundColor: 'black',
    // background: mediaBaseImageMock(),
    contents: [blockBaseMock({ introText: undefined }), collectionBaseMock({ introText: undefined })] //, collectionBaseMock(), accordionBaseMock(), tabsBaseMock()]
  };

  return { ...baseMock, ...override };
};

export const sectionBaseMock = ({ ...override } = {}): SectionProps => ({
  ...sectionDefaultMock(override)
});

export const sectionOnePerRowMock = ({ ...override } = {}): SectionProps => ({
  ...sectionDefaultMock(override),
  variant: SectionVariants.onePerRow
});

export const sectionTwoPerRowMock = ({ ...override } = {}): SectionProps => ({
  ...sectionDefaultMock(override),
  variant: SectionVariants.twoPerRow
});

export const sectionThreePerRowMock = ({ ...override } = {}): SectionProps => ({
  ...sectionDefaultMock(override),
  variant: SectionVariants.threePerRow
});

export default sectionBaseMock;
