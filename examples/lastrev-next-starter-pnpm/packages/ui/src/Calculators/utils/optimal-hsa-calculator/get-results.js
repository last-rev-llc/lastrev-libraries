import { getStateBrackets } from '../../utils/taxee';
import {
  getAnnualizedEmployerContribution,
  getAnnualPayFrecuencyRatio,
  getMaximunContribution,
  getRateOfReturn
} from './hidden-calculations';
import {
  getAnnualExpenses,
  getAssetGrowth,
  getContributions,
  getEmployerContributionAmmount,
  getOwnContributionAmmount,
  getProjectedHsaBalanceAtRetirement,
  getProjectedInvestmentBalance,
  getRecommendedContribution,
  getRecommendedContributionOnlyInvesting,
  getRecommendedContributionOnlySaving,
  getRecommendedContributionSavingAndInvesting,
  getRecommendedPaycheck
} from './spending-calculations';
import { getAnnualExpensesSavings, getRecommendedAnnualContribution } from './spending-saving-calculations';

export const getResults = (form, actualView) => {
  const {
    coverageFor,
    currentAge,
    employerOfterContributions,
    outOfPocketExpenses,
    employerContributions,
    portionAnnualExpenses,
    meetGoal,
    saveFutureSafety,
    anticipatedAnnualRateOfReturn,
    hsaSavingsGoals,
    retireAge,
    cashSafetyBeforeInvest,
    currentHSABalance,
    contributingThroughEmployer,
    ofternOwnContributions,
    currentyHSA,
    willEmployerContributions
  } = form;
  const annualExpenses = getAnnualExpenses(outOfPocketExpenses);
  const isEmployer = contributingThroughEmployer?.value === 'Yes' && willEmployerContributions?.value === 'Yes';
  const payFrecuency = getAnnualPayFrecuencyRatio(1);
  const payFrecuencyCheck = getAnnualPayFrecuencyRatio(
    isEmployer ? employerOfterContributions?.value : ofternOwnContributions?.value
  );
  const maximunContribution = getMaximunContribution(coverageFor?.value, currentAge?.value);
  const anualizedContributionAmmount = getAnnualizedEmployerContribution(
    employerContributions?.value ?? 0,
    payFrecuency
  );
  const employerContributionAmmount = getEmployerContributionAmmount(anualizedContributionAmmount, maximunContribution);
  const recommendedAnnualContribution = getRecommendedContribution(
    employerContributionAmmount,
    annualExpenses,
    maximunContribution
  );
  const yearsUntilRetirement = retireAge?.value - currentAge?.value;
  const currentHSA = currentyHSA?.value === 'Yes' ? currentHSABalance?.value || 0 : 0;
  const payload = {
    employerContributionAmmount: Math.round(employerContributionAmmount),
    anualizedContributionAmmount,
    payFrecuency,
    maximunContribution: Math.round(maximunContribution),
    annualExpenses: Math.round(annualExpenses),
    futureAmmount: saveFutureSafety?.value,
    totalYears: meetGoal?.value
  };

  if (actualView === 'a') {
    const ownContributionAmmount = getOwnContributionAmmount(
      recommendedAnnualContribution,
      anualizedContributionAmmount
    );
    const recomendedPaycheck = getRecommendedPaycheck(ownContributionAmmount, payFrecuencyCheck);
    const newPayload = {
      ...payload,
      recomendedPaycheck: Math.round(recomendedPaycheck),
      ownContributionAmmount: Math.round(ownContributionAmmount),
      recommendedAnnualContribution: Math.round(recommendedAnnualContribution)
    };
    return newPayload;
  } else if (actualView === 'b') {
    const recomendedAmmount = getRecommendedAnnualContribution(
      employerContributionAmmount,
      portionAnnualExpenses,
      Number(meetGoal?.value),
      saveFutureSafety?.value,
      annualExpenses,
      maximunContribution
    );
    const ownContributionAmmount = getOwnContributionAmmount(recomendedAmmount, anualizedContributionAmmount);
    const annualExpensesSavings = getAnnualExpensesSavings(portionAnnualExpenses, outOfPocketExpenses);
    const recomendedPaycheck = getRecommendedPaycheck(ownContributionAmmount, payFrecuencyCheck);
    const newPayload = {
      ...payload,
      ownContributionAmmount: Math.round(ownContributionAmmount),
      recomendedPaycheck: Math.round(recomendedPaycheck),
      recommendedAnnualContribution: recomendedAmmount,
      annualExpensesSavings: annualExpensesSavings
    };
    return newPayload;
  } else if (actualView === 'c') {
    const recomendedAmmount = getRecommendedContributionOnlySaving(
      maximunContribution,
      saveFutureSafety?.value,
      meetGoal?.value
    );
    const ownContributionAmmount = getOwnContributionAmmount(recomendedAmmount, anualizedContributionAmmount);
    const recomendedPaycheck = getRecommendedPaycheck(ownContributionAmmount, payFrecuencyCheck);
    const newPayload = {
      ...payload,
      ownContributionAmmount: Math.round(ownContributionAmmount),
      recommendedAnnualContribution: recomendedAmmount,
      recomendedPaycheck: Math.round(recomendedPaycheck)
    };
    return newPayload;
  } else if (actualView === 'd') {
    const rateOfReturn = getRateOfReturn(anticipatedAnnualRateOfReturn);
    const recomendedAmmount = getRecommendedContributionSavingAndInvesting(
      maximunContribution,
      employerContributionAmmount,
      cashSafetyBeforeInvest?.value,
      hsaSavingsGoals?.value,
      yearsUntilRetirement,
      rateOfReturn,
      currentHSA
    );
    const ownContributionAmmount = getOwnContributionAmmount(recomendedAmmount, anualizedContributionAmmount);
    const recomendedPaycheck = getRecommendedPaycheck(ownContributionAmmount, payFrecuencyCheck);

    const projectedInvestBalance = getProjectedInvestmentBalance(
      rateOfReturn,
      yearsUntilRetirement,
      cashSafetyBeforeInvest?.value,
      maximunContribution,
      recomendedAmmount,
      currentHSA
    );
    const contributions = getContributions(recomendedAmmount, yearsUntilRetirement);
    const assetGrowths = getAssetGrowth(projectedInvestBalance, recomendedAmmount, yearsUntilRetirement, currentHSA);
    const newPayload = {
      ...payload,
      ownContributionAmmount: Math.round(ownContributionAmmount),
      recommendedAnnualContribution: recomendedAmmount,
      cashSavingsRetiremnt: cashSafetyBeforeInvest?.value,
      recomendedPaycheck: Math.round(recomendedPaycheck),
      projectedInvestBalance,
      contributions,
      assetGrowths
    };
    return newPayload;
  } else {
    const rateOfReturn = getRateOfReturn(anticipatedAnnualRateOfReturn);
    const recomendedAmmount = getRecommendedContributionOnlyInvesting(
      employerContributionAmmount,
      rateOfReturn,
      yearsUntilRetirement,
      currentHSA,
      hsaSavingsGoals?.value,
      maximunContribution
    );
    const ownContributionAmmount = getOwnContributionAmmount(recomendedAmmount, anualizedContributionAmmount);
    const projectedInvestBalance = getProjectedHsaBalanceAtRetirement(
      rateOfReturn,
      yearsUntilRetirement,
      recomendedAmmount,
      currentHSA
    );
    const contributions = getContributions(recomendedAmmount, yearsUntilRetirement);
    const assetGrowths = getAssetGrowth(projectedInvestBalance, recomendedAmmount, yearsUntilRetirement, currentHSA);
    const recomendedPaycheck = getRecommendedPaycheck(ownContributionAmmount, payFrecuencyCheck);
    const newPayload = {
      ...payload,
      ownContributionAmmount: Math.round(ownContributionAmmount),
      recomendedPaycheck: Math.round(recomendedPaycheck),
      recommendedAnnualContribution: recomendedAmmount,
      projectedInvestBalance,
      contributions,
      assetGrowths
    };
    return newPayload;
  }
};

export const getTax = ({ state, annualIncome, fillingStatus, contributingThroughEmployer, ownContributionAmmount }) => {
  const { annual } = getStateBrackets(annualIncome.value, fillingStatus.value, state.value);
  const stateTax = annual.state.amount / annualIncome.value;
  const federalTax = annual.federal.amount / annualIncome.value;
  const ficaTax = annual.fica.amount / annualIncome.value;
  let payload = federalTax;
  if (state.value !== 'NJ' && state.value !== 'CA') {
    payload += stateTax;
  }
  if (contributingThroughEmployer?.value === 'Yes') {
    payload += ficaTax;
  }
  return payload * Math.round(ownContributionAmmount);
};
