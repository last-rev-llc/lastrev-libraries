import { introTextMock } from '../Text/Text.mock';

import randomId from '../utils/randomId';

import type { FormProps } from './Form.types';

// TODO
const formDefaultMock: FormProps = {
  id: randomId(),
  __typename: 'Form',
  variant: 'hubspotFormFooter',
  introText: introTextMock()
};

export const formBaseMock = ({ ...override } = {}) => ({
  ...formDefaultMock,
  ...override
});

export default formBaseMock;
