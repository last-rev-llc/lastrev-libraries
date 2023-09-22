import { AppProvider } from '../packages/ui/src/AppProvider/AppProvider';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

const preview = {
  decorators: [
    (Story) => (
      <>
        <AppProvider>
          <Story />
        </AppProvider>
      </>
    )
  ],
  parameters: {
    viewport: {
      viewports: {
        ...INITIAL_VIEWPORTS,
        DesktopM: {
          name: 'Desktop M',
          styles: { width: '1440px', height: '900px' },
          type: 'mobile'
        },
        DesktopL: {
          name: 'Desktop L',
          styles: { width: '1920px', height: '1080px' },
          type: 'mobile'
        }
      }
    },
    // layout: 'centered',
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
