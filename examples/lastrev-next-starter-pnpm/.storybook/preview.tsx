import { AppProvider } from '../packages/ui/src/AppProvider/AppProvider';

const preview = {
  decorators: [
    (Story) => (
      <AppProvider>
        <Story />
      </AppProvider>
    )
  ],
  parameters: {
    layout: 'centered',
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    options: {
      storySort: {
        method: '',
        order: ['Intro', '1. Brand', '2. Components'],
        locales: ''
      }
    }
  }
};

export default preview;
