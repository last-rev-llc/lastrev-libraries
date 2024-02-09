import BackToTop from './BackToTop';

import backToTopBaseMock from './BackToTop.mock';

export default {
  title: 'Elements/Back To Top',
  component: BackToTop,
  tags: ['autodocs'],
  argTypes: {
    size: {
      name: 'Size',
      control: {
        type: 'inline-radio'
      },
      table: {
        defaultValue: { summary: 'large' }
      }
    },
    color: {
      name: 'Color',
      control: {
        type: 'inline-radio'
      },
      table: {
        defaultValue: { summary: 'primary' }
      }
    },
    href: { name: 'Href' },
    ref: { table: { disable: true } }
  }
};

export const Default = { args: { ...backToTopBaseMock() } };
