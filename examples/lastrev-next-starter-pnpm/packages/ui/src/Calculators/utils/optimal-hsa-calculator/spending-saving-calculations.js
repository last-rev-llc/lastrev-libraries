import { parseToNumber } from '../../utils/helpers';

export const getAnnualExpensesSavings = ({ inputValue, value }, outOfPocketExpenses) => {
  if (value === 'currency') {
    return parseToNumber(inputValue);
  }
  return (parseToNumber(outOfPocketExpenses.value) * parseToNumber(inputValue)) / 100;
};

export const getRecommendedAnnualContribution = (
  employerContribution,
  portionAnnualExpenses,
  meetGoal,
  saveFutureSafety,
  outOfPocketExpenses,
  maximunContribution
) => {
  const { inputValue, value } = portionAnnualExpenses;
  const futureAmmount =
    value === 'currency'
      ? saveFutureSafety / meetGoal + parseToNumber(inputValue)
      : saveFutureSafety / meetGoal + (outOfPocketExpenses * parseToNumber(inputValue)) / 100;
  const realAmmount = futureAmmount > maximunContribution ? maximunContribution : futureAmmount;
  if (employerContribution > realAmmount) return employerContribution;
  return realAmmount;
};
