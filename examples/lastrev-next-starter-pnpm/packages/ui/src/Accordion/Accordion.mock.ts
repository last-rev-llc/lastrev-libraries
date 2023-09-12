import { richTextMock } from '../RichText/RichText.mock';

export const baseMock = () => ({
  __typename: 'Accordion',
  variant: 'default',
  title: 'This is the title',
  body: richTextMock({ text: 'This is the body' })
});

export default baseMock;
