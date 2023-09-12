import Accordion from './Accordion';
import { baseMock } from './Accordion.mock';

export default {
  title: 'Modules/Accordion',
  component: Accordion,

  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],

  argTypes: {
    title: { name: 'Title' },
    body: { name: 'Body' } // TODO: Update
  }
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = {
  args: {
    ...baseMock()
  }
};
