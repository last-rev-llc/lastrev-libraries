import { introTextMock } from '../Text/Text.mock';

import { randomId } from '../utils/randomId';

import { type FormContactUsProps } from './FormContactUs.types';

const formContactUsDefaultMock = (override?: Partial<FormContactUsProps>): FormContactUsProps => {
  const baseMock: FormContactUsProps = {
    id: randomId(),
    introText: introTextMock()
  };

  return { ...baseMock, ...override };
};

export const formContactUsBaseMock = (override?: Partial<FormContactUsProps>): FormContactUsProps => {
  return { ...formContactUsDefaultMock(override) };
};

export default formContactUsBaseMock;
