import { lorem } from 'faker';
import { PersonProps } from './Person.types';
import { richTextMock } from '../RichText/RichText.mock';
import { mediaBaseImageMock } from '../Media/Media.mock';

const personDefaultMock: PersonProps = {
  id: lorem.word(),
  __typename: 'Person',
  featuredMedia: mediaBaseImageMock(),
  name: 'This is the name',
  jobTitle: 'This is the job title',
  email: 'This is the email',
  body: richTextMock({ text: 'This is the body' })
};

export const personBaseMock = ({ ...override } = {}) => ({
  ...personDefaultMock,
  ...override
});

export default personBaseMock;
