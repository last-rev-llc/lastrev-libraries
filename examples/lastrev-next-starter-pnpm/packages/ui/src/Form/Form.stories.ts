import Form from './Form';
import { formBaseMock } from './Form.mock';
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

export default {
  title: '3. Modules/Form',
  component: Form,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    // Props should follow this schema: https://storybook.js.org/docs/react/writing-stories/args#args-schema
    // More info on args: https://storybook.js.org/docs/react/writing-stories/args
    // More info on control types: https://storybook.js.org/docs/react/essentials/controls#annotation
    variant: {
      control: {
        type: 'select',
        options: ['hubspotFormFooter']
      }
    }
  }
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = {
  args: {
    ...formBaseMock()
  }
};
