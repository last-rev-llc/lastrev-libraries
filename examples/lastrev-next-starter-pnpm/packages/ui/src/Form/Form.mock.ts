import { lorem } from 'faker';
import { introTextMock } from '../Text/Text.mock';
import { FormProps } from './Form.types';

// TODO
const formDefaultMock: FormProps = {
  id: lorem.word(),
  __typename: 'Form',
  variant: 'hubspotFormFooter',
  introText: introTextMock()
};

export const formBaseMock = ({ ...override } = {}) => ({
  ...formDefaultMock,
  ...override
});

export default formBaseMock;
