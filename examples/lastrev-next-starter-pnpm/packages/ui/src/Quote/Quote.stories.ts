import Quote from './Quote';
import { quoteBaseMock, quoteLargeMock, quoteInlineMock } from './Quote.mock';

export default {
  title: '3. Modules/Quote',
  component: Quote,

  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    // Props should follow this schema: https://storybook.js.org/docs/react/writing-stories/args#args-schema
    // More info on args: https://storybook.js.org/docs/react/writing-stories/args
    // More info on control types: https://storybook.js.org/docs/react/essentials/controls#annotation
    variant: {
      control: {
        type: 'select',
        options: ['default', 'large', 'inline'] // TODO: Update
      }
    }
  }
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = {
  args: {
    ...quoteBaseMock()
  }
};

export const Large = {
  args: {
    ...quoteLargeMock({ quote: 'Default Large Quote' })
  }
};

export const Inline = {
  args: {
    ...quoteInlineMock({ quote: 'Default Inline Quote' })
  }
};
