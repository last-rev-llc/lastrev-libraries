import { parseToNumber } from '../../utils/helpers';
import { FV, ppmt } from '../futureValueFormula';
import { OUT_OF_POCKET_AVERAGE, OUT_OF_POCKET_HIGH, OUT_OF_POCKET_LOW } from './hidden-values';

export const getAnnualExpenses = (outOfPocket) => {
  if (!outOfPocket) return 0;
  const { itemSelected, value } = outOfPocket;
  if (itemSelected === 'Custom') return parseToNumber(value);
  else if (itemSelected === 'Low') return OUT_OF_POCKET_LOW;
  else if (itemSelected === 'Average') return OUT_OF_POCKET_AVERAGE;
  return OUT_OF_POCKET_HIGH;
};

export const getRecommendedContribution = (employerContribution, annulExpenses, maximumContribution) => {
  if (employerContribution > annulExpenses) return employerContribution;
  if (annulExpenses > maximumContribution) return maximumContribution;
  return annulExpenses;
};

export const getOwnContributionAmmount = (recommendedContribution, annualizedContribution) => {
  if (recommendedContribution - annualizedContribution > 0) return recommendedContribution - annualizedContribution;
  return 0;
};

export const getEmployerContributionAmmount = (annualizedContribution, maximumContribution) =>
  maximumContribution < annualizedContribution ? maximumContribution : annualizedContribution;

export const getRecommendedPaycheck = (contributionAmmount, annualFrecuencyRatio) =>
  contributionAmmount * annualFrecuencyRatio;

export const getRecommendedContributionOnlySaving = (maximumContribution, futureAmmount, meetGoal) =>
  maximumContribution > futureAmmount / meetGoal ? futureAmmount / meetGoal : maximumContribution;

export const getRecommendedContributionSavingAndInvesting = (
  maximumContribution,
  employerContribution,
  cashBeforeInvest,
  hsaSavingGoal,
  yearsUntilRetire,
  rateOfReturn,
  currentHsaBalance
) => {
  const PPMTValue =
    ppmt(
      rateOfReturn,
      1,
      yearsUntilRetire - cashBeforeInvest / maximumContribution,
      -currentHsaBalance,
      hsaSavingGoal,
      1
    ) * -1;
  let actualValue;
  if (maximumContribution < PPMTValue) {
    actualValue = maximumContribution;
  } else {
    actualValue = PPMTValue;
  }
  if (employerContribution > actualValue) {
    return employerContribution;
  } else {
    return actualValue;
  }
};

export const getRecommendedContributionOnlyInvesting = (
  employerContribution,
  rateOfReturn,
  yearsUntilRetire,
  currentHsaBalance,
  hsaSavingGoal,
  maximumContribution
) => {
  let PPMTValue = ppmt(rateOfReturn, 1, yearsUntilRetire, -currentHsaBalance ?? 0, hsaSavingGoal, 1) * -1;
  let actualValue;
  if (PPMTValue > maximumContribution) {
    actualValue = maximumContribution;
  } else actualValue = PPMTValue;
  if (employerContribution > actualValue) return employerContribution;
  return actualValue;
};

export const getProjectedInvestmentBalance = (
  rateOfReturn,
  yearsUntilRetire,
  cashBeforeInvest,
  maximumContribution,
  recommendedContribution,
  currentHsaBalance
) => {
  return FV(
    rateOfReturn,
    yearsUntilRetire - cashBeforeInvest / maximumContribution,
    -recommendedContribution,
    -currentHsaBalance,
    1
  );
};

export const getContributions = (recommendedContribution, yearsUntilRetire) =>
  recommendedContribution * yearsUntilRetire;

export const getAssetGrowth = (projectedHsaBalance, recommendedContribution, yearsUntilRetire, currentHsaBalance) =>
  Math.round(projectedHsaBalance - recommendedContribution * yearsUntilRetire - currentHsaBalance);

export const getProjectedHsaBalanceAtRetirement = (
  rateOfReturn,
  yearsUntilRetire,
  recommendedContribution,
  currentHsaBalance
) => {
  return FV(rateOfReturn, yearsUntilRetire, -recommendedContribution, -currentHsaBalance, 1);
};
