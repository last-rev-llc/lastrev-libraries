import { introTextMock } from '../Text/Text.mock';

import { randomId } from '../utils/randomId';

import { type FormAnnualInvestorProps } from './FormAnnualInvestor.types';

const formAnnualInvestorDefaultMock = (override?: Partial<FormAnnualInvestorProps>): FormAnnualInvestorProps => {
  const baseMock: FormAnnualInvestorProps = {
    id: randomId(),
    introText: introTextMock()
  };

  return { ...baseMock, ...override };
};

export const formAnnualInvestorBaseMock = (override?: Partial<FormAnnualInvestorProps>): FormAnnualInvestorProps => {
  return { ...formAnnualInvestorDefaultMock(override) };
};

export default formAnnualInvestorBaseMock;
