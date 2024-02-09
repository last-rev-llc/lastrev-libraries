import { introTextMock } from '../Text/Text.mock';

import { randomId } from '../utils/randomId';

import { type FormProps, FormVariants } from './Form.types';

const formDefaultMock = (override?: Partial<FormProps>): FormProps => {
  const baseMock: FormProps = {
    id: randomId(),
    __typename: 'ElementForm',
    variant: FormVariants.default,
    introText: introTextMock()
  };

  return { ...baseMock, ...override };
};

export const formBaseMock = (override?: Partial<FormProps>): FormProps => {
  return { ...formDefaultMock(override) };
};

export default formBaseMock;
