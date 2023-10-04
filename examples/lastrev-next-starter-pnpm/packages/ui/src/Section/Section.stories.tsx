import Section from './Section';
import { sectionBaseMock, sectionOnePerRowMock, sectionTwoPerRowMock, sectionThreePerRowMock } from './Section.mock';

export default {
  title: 'Components/Section',
  component: Section,

  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    contents: { name: 'Contents' },
    background: { name: 'Background' },
    styles: { name: 'Styles' }
  }
};

export const Default = { args: { ...sectionBaseMock() } };
export const OnePerRow = { args: { ...sectionOnePerRowMock() } };
export const TwoPerRow = { args: { ...sectionTwoPerRowMock() } };
export const ThreePerRow = { args: { ...sectionThreePerRowMock() } };
