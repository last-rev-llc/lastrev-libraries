import { getBlendedTax } from '../../../utils/taxee';
import { FV } from './futureValueFormula';
import { isFormValid } from './isFormValid';
import { popRandom } from './removeRandomElements';

export const calculate = async (form, formData, setResults, recalculate = false, isMobile) => {
  if (!isFormValid(formData, form)) {
    return;
  }
  const {
    currentAge,
    currentHsaBalance,
    maritalStatus,
    state,
    annualIncome,
    retirementAge,
    annualHsaExpenses,
    annualHsaBalance,
    annualRateOfReturn
  } = form;
  let blendedTax = recalculate;
  if (recalculate === false) {
    blendedTax = await getBlendedTax(state?.value, annualIncome?.value, maritalStatus?.value);
  }
  const years = retirementAge?.value - currentAge?.value;
  const expensesAmmount =
    (annualHsaExpenses?.value || 0) > annualHsaBalance?.value
      ? annualHsaBalance?.value
      : annualHsaExpenses?.value || 0;
  const paymentAmount = annualHsaBalance?.value - expensesAmmount;
  const potentialTaxSaving = (blendedTax / 100) * annualHsaBalance?.value * years; // 24 must be changed according to api
  const potentialHsaBalance = FV(
    annualRateOfReturn?.value / 100,
    years,
    -paymentAmount,
    -(currentHsaBalance?.value || 0),
    0
  );
  const currentYear = new Date().getFullYear();
  let cumulativeAssetGrowth = [];
  let aggregatedNetContributions = [];
  let allYears = [];
  let prevYear = 0;
  let prevCumulative = 0;
  const steps = Math.floor(years / 10);
  for (let i = 0; i <= years; i += 1) {
    const endYear =
      (currentHsaBalance?.value ?? 0) + paymentAmount * (currentYear + i - currentYear);
    const growt = prevYear * (annualRateOfReturn?.value / 100) + prevCumulative;
    if (i % steps === 0 || (years < 10 && i < 10) || i === years) {
      cumulativeAssetGrowth.push(Number(endYear.toFixed(2)));
      aggregatedNetContributions.push(Number(growt.toFixed(2)));
      allYears.push(currentYear + i);
    }
    prevYear = endYear + growt;
    prevCumulative = growt;
  }
  if (years > (!isMobile ? 8 : 5)) {
    let avaliableCumulativeAssetGrowthToDelete = cumulativeAssetGrowth.slice(1, -1);
    let avaliableAggregatedNetContributionsToDelete = aggregatedNetContributions.slice(1, -1);
    let avaliableYears = allYears.slice(1, -1);
    let deletionsToMake = avaliableAggregatedNetContributionsToDelete.length - (!isMobile ? 7 : 4);
    while (deletionsToMake) {
      popRandom(
        avaliableCumulativeAssetGrowthToDelete,
        avaliableAggregatedNetContributionsToDelete,
        avaliableYears
      );
      deletionsToMake -= 1;
    }
    const missingYears = currentYear + years - allYears[allYears.length - 1];
    // let lastGrowt = 0;
    for (let i = missingYears; i > 0; i -= 1) {
      const growt = prevYear * (annualRateOfReturn?.value / 100) + prevCumulative;
      const endYear = currentHsaBalance?.value + paymentAmount * (years - i) + growt;
      prevCumulative = growt;
      // lastGrowt = growt.toFixed(2);
      prevYear = endYear + growt;
    }
    const realLastValues = {
      lastYear: currentYear + years,
      lastCumulativeAssetGrowth: currentHsaBalance?.value + paymentAmount * years,
      lastAggregatedNetContributions:
        aggregatedNetContributions[aggregatedNetContributions?.length - 1]
    };
    cumulativeAssetGrowth = [
      cumulativeAssetGrowth[0],
      ...avaliableCumulativeAssetGrowthToDelete,
      realLastValues.lastCumulativeAssetGrowth
    ];
    aggregatedNetContributions = [
      aggregatedNetContributions[0],
      ...avaliableAggregatedNetContributionsToDelete,
      realLastValues.lastAggregatedNetContributions
    ];
    allYears = [allYears[0], ...avaliableYears, realLastValues.lastYear];
  }
  setResults({
    potentialTaxSaving: parseInt(potentialTaxSaving, 10),
    potentialHsaBalance: parseInt(potentialHsaBalance, 10),
    cumulativeAssetGrowth,
    aggregatedNetContributions,
    blendedTax,
    allYears
  });
};
