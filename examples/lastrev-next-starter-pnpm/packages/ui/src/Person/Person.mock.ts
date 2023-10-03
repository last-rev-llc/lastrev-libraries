import { richTextMock } from '../RichText/RichText.mock';
import { mediaBaseImageMock } from '../Media/Media.mock';

import randomId from '../utils/randomId';

import type { PersonProps } from './Person.types';

const personDefaultMock: PersonProps = {
  id: randomId(),
  __typename: 'Person',
  mainImage: mediaBaseImageMock(),
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
