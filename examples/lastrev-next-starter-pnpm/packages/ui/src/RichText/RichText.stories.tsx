import RichText from './RichText';
import { baseMock, complexMock, formattedMock } from './RichText.mock';

const meta = {
  title: 'Elements/Rich Text',
  component: RichText
};

export default meta;

export const Base = { args: { ...baseMock() } };

export const Complex = { args: { ...complexMock() } };

export const Formatted = { args: { ...formattedMock() } };
