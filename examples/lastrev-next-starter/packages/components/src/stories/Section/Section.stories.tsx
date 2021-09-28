import React from 'react';
import Box from '@material-ui/core/Box';
import Section, { SectionProps } from '@last-rev/component-library/dist/components/Section/Section';
import {
  mediaWithTextSectionMock,
  mediaWithComplexTextSectionMock,
  standardWithCollectionMock,
  standardMock,
  featuredMock,
  standardWithInsightCollectionMock,
  textWithLinksmock
} from './Section.mock';

export default {
  title: 'Modules / Section',
  component: Section,
  decorators: [
    (storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) => (
      <Box m={5}>{storyFn()}</Box>
    )
  ],
  argTypes: {
    contents: { name: 'Contents' },
    background: { name: 'Background' },
    styles: { name: 'Styles' }
  }
};

const Template = (args: SectionProps) => <Section {...args} />;

export const Media = Template.bind({});
Media.args = { ...mediaWithTextSectionMock };

export const MediaWithComplexText = Template.bind({});
MediaWithComplexText.args = { ...mediaWithComplexTextSectionMock };

export const Standard = Template.bind({});
Standard.args = { ...standardMock };

export const StandardWithCollection = Template.bind({});
StandardWithCollection.args = { ...standardWithCollectionMock };

export const Featured = Template.bind({});
Featured.args = { ...featuredMock };

export const StandardWithInsightCollection = Template.bind({});
StandardWithInsightCollection.args = { ...standardWithInsightCollectionMock };

export const TextWithLinks = Template.bind({});
TextWithLinks.args = { ...textWithLinksmock };
