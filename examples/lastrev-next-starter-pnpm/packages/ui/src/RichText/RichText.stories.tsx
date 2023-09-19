import RichText from './RichText';
import { baseMock, complexMock, formattedMock } from './RichText.mock';

const meta = {
  title: '2. Components / Text / Rich Text',
  component: Text
  // tags: ['autodocs'],
  // argTypes: {
  //   variant: {
  //     options: []
  //   },
  //   align: {
  //     options: ['left', 'center', 'right'],
  //     defaultValue: 'left'
  //   },
  //   __typename: { table: { disable: true } },
  //   id: { table: { disable: true } },
  //   sidekickLookup: { table: { disable: true } },
  //   sx: { table: { disable: true } },
  //   ref: { table: { disable: true } },
  //   styles: { table: { disable: true } },
  //   renderNode: { table: { disable: true } }
  // }
};

export default meta;

export const Base = { args: { ...baseMock() } };

export const Complex = { args: { ...complexMock() } };

export const Formatted = { args: { ...formattedMock() } };
