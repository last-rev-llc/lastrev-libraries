import {
  CATCH_UP_CONTRIBUTION,
  CURRENT_YEAR_FAMILY_LIMIT,
  CURRENT_YEAR_INDIVIDUAL_LIMIT,
  RATE_OF_RETURN_AGGRESIVE,
  RATE_OF_RETURN_CONCERVATIVE,
  RATE_OF_RETURN_MODERATE
} from './hidden-values';

export const getAnnualPayFrecuencyRatio = (recurring) => {
  if (recurring === 'Weekly') return 1 / 52;
  else if (recurring === 'Every other week') return 1 / 26;
  else if (recurring === 'Monthly') return 1 / 12;
  else if (recurring === 'Twice per month') return 1 / 24;
  return 1;
};

export const getMaximunContribution = (coverageFor, currentAge) => {
  let payload =
    coverageFor === 'Your Family' ? CURRENT_YEAR_FAMILY_LIMIT : CURRENT_YEAR_INDIVIDUAL_LIMIT;
  payload += Number(currentAge) > 55 ? CATCH_UP_CONTRIBUTION : 0;
  return payload;
};

export const getAnnualizedEmployerContribution = (employerContribution, payFrecuency) =>
  Math.round(employerContribution / payFrecuency);

export const getRateOfReturn = (anticipatedRateOfReturn) => {
  const { itemSelected, value } = anticipatedRateOfReturn;
  if (itemSelected === 'Custom') return Number(value) / 100;
  else if (itemSelected === 'Conservative') return RATE_OF_RETURN_CONCERVATIVE;
  else if (itemSelected === 'Moderate') return RATE_OF_RETURN_MODERATE;
  return RATE_OF_RETURN_AGGRESIVE;
};
