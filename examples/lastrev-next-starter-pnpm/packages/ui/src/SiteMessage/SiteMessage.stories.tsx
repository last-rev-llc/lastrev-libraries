import SiteMessage from './SiteMessage';

import { siteMessageBaseMock } from './SiteMessage.mock';

export default {
  title: 'Global/Site Message',
  component: SiteMessage,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['default']
      }
    }
  }
};

export const Default = {
  args: {
    ...siteMessageBaseMock()
  }
};
