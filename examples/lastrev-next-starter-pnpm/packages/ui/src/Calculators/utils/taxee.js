import getFederal from './federalTax';
import getState from './stateTax';
import getFica from './ficaTax';

export const getStateBrackets = (income, maritalStatus, stateId) => {
  const annual = {
    federal: { amount: getFederal(income, maritalStatus.toLowerCase()) },
    fica: { amount: getFica(income, maritalStatus.toLowerCase()) },
    state: { amount: getState(income, maritalStatus.toLowerCase(), stateId) }
  };
  const data = {
    annual: annual
  };
  return data;
};

export const getBlendedTax = (stateId, income, maritalStatus, includeFica = false) => {
  // const year = new Date().getFullYear(); until taxee opens a new one for 2021 leave it like this
  const {
    annual: { federal, state, fica }
  } = getStateBrackets(income, maritalStatus, stateId);
  if (!includeFica) {
    if (stateId !== 'CA' && stateId !== 'NJ') {
      return ((federal.amount + state.amount) / income) * 100;
    }
    return (federal.amount / income) * 100;
  } else {
    if (stateId === 'NJ' || stateId === 'PA') {
      return (federal.amount + fica.amount) / income;
    }
    return (federal.amount + state.amount + fica.amount) / income;
  }
};
