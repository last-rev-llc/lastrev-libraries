import Text from './Text';
import { baseMock, complexMock, formattedMock } from '../RichText/RichText.mock';

const meta = {
  title: 'Elements/Text',
  component: Text
};

export default meta;

export const Base = { args: { ...baseMock() } };

export const Complex = { args: { ...complexMock() } };

export const Formatted = { args: { ...formattedMock() } };
