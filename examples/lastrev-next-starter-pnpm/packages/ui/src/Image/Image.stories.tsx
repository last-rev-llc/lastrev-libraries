import Image from './Image';
import mockContent from './Image.mock';

export default {
  title: '2. Components/Media/Image',
  component: Image,
  tags: ['autodocs'],
  argTypes: {
    alt: { name: 'Alt' },
    src: { name: 'Src' },
    width: { name: 'Width' },
    height: { name: 'Height' },
    className: { name: 'Class Name' },
    lazy: {
      name: 'Lazy',
      control: {
        type: 'boolean'
      },
      defaultValue: true,
      table: {
        defaultValue: { summary: true }
      }
    },
    columns: { table: { disable: true } },
    itemProp: { table: { disable: true } },
    testId: { table: { disable: true } }
  }
};

export const Default = { args: { ...mockContent() } };
