import { introTextMock } from '../Text/Text.mock';

import { randomId } from '../utils/randomId';

import { type FormPeruProps } from './FormPeru.types';

const formPeruDefaultMock = (override?: Partial<FormPeruProps>): FormPeruProps => {
  const baseMock: FormPeruProps = {
    id: randomId(),
    introText: introTextMock()
  };

  return { ...baseMock, ...override };
};

export const formPeruBaseMock = (override?: Partial<FormPeruProps>): FormPeruProps => {
  return { ...formPeruDefaultMock(override) };
};

export default formPeruBaseMock;
