export const response = (
  year,
  ammount,
  yourself,
  yourCatchupAmmount,
  yourCatchup,
  spouseCatchUpAmmount,
  spouseCatchUp
) => {
  const payload = [
    {
      text: yourself,
      total: ammount,
      isPrimary: true,
      title: `Your maximum contribution amount for`
    }
  ];
  if (yourCatchupAmmount !== undefined || yourCatchup !== undefined) {
    payload.push({
      text: yourCatchup,
      total: yourCatchupAmmount,
      isPrimary: false,
      title: 'Your catch-up contribution amount'
    });
    payload[0].total += yourCatchupAmmount;
  }
  if (spouseCatchUpAmmount !== undefined || spouseCatchUp !== undefined) {
    payload.push({
      text: spouseCatchUp,
      total: spouseCatchUpAmmount,
      isPrimary: false,
      title: 'Your spouse’s catch-up contribution amount'
    });
    payload[0].total += spouseCatchUpAmmount;
  }
  return payload;
};

export const yourExplanations = (year) => ({
  less18: 'Please enter an age of 18 years or older',
  taxYourself: `If you are under the age of 26 and covered under your parents' HDHP, you are able to open your own HSA account and contribute towards the family max for ${year}.`,
  noTax: 'Individuals who are under 26 and a tax-dependant are not HSA-eligible.',
  contributeIndividual: `You are able to contribute the individual contribution maximum for ${year}.`,
  contributeFamily: `You are able to contribute the family contribution maximum for ${year}.`,
  contributeFamilySpouse:
    "You're able to contribute the family contribution maximum. If your spouse opens their own HSA, your total contributions cannot exceed the family maximum plus your catch-up contribution.",
  contributeSpouseCatchup:
    "You're able to contribute the family contribution maximum and your spouse can make a catch-up contribution in their own account. The total of your combined contributions cannot exceed the family max plus your spouses's catch-up contributions.",
  contributeMaxPlus:
    "You're able to contribute the family contribution maximum and make a catch-up contribution in their own account. The total of your combined contributions cannot exceed the family max plus your spouse's catch-up contributions.",
  extra1000individual:
    "You're able to contribute the individual contribution maximum and are eligible for the extra $1,000 catch-up contribution.",
  extra1000family:
    "You're able to contribute the family contribution maximum and are eligible for the extra $1,000 catch-up contribution.",
  individualProRated:
    "You're able to contribute the individual contribution maximum and make a catch-up contribution but it is pro-rated based on the month you enroll in Medicare.",
  familyProRated:
    "You're able to contribute the family contribution maximum and make a catch-up contribution but it is pro-rated based on the month you enroll in Medicare.",
  notOnMedicare:
    "You aren't eligible to make any HSA contributions because you're enrolled in Medicare.",
  makeCatchUpYourself:
    "You're able to contribute the family contribution maximum and make a catch-up contribution to your account. If your spouse opens their own HSA, your total contributions cannot exceed the family maximum plus your catch-up contribution.",
  makeCatchUpBoth:
    "You're able to contribute the family contribution maximum and make a catch-up contribution in both you and your spouse's accounts. The total of your combined contributions cannot exceed the family max plus your catch-up contributions.",
  catchUpProrated:
    "You're able to contribute the family contribution maximum and make a catch-up contribution to your account but it is pro-rated based on the month you enroll in Medicare. If your spouse opens their own HSA, your total contributions cannot exceed the family maximum plus your catch-up contribution.",
  catchUpProratedBoth:
    "You're able to contribute the family contribution maximum and make a catch-up contribution in both you and your spouse's accounts but it is pro-rated based on the month you enroll in Medicare. The total of your combined contributions cannot exceed the family max plus your catch-up contributions.",
  noCoverage:
    "Because you are not covered under a HSA-eligible High Deductible Health Plan, you can't make any contributions into an HSA. However, if you have an existing HSA, you can still transfer your funds to Lively.",
  notElegible: "You aren't eligible to make any HSA contributions for the selected tax year."
});
export const yourCatchups = {
  older55:
    "You're able to contribute a catch-up contribution because you're 55 or older. This is included in the max contribution amount above.",
  older55Prorated:
    "You're able to contribute a catch-up contribution because you're 55 or older. Your contribution amount has been pro-rated based on the month you enrolled in Medicare and is included in the max contribution amount above.",
  separetedAccounts:
    'In order to take full advantage of catch-up contributions, create separate accounts for both you and your spouse.',
  older55ProratedBoth:
    "You're able to contribute a catch-up contribution because you're 55 or older but is pro-rated based on the month you enrolled in Medicare. In order to take full advantage of catch-up contributions, create separate accounts for both you and your spouse.",
  older55ProratedMedicare:
    "You're able to contribute a catch-up contribution because you're 55 or older but is pro-rated based on the month you enrolled in Medicare."
};
export const spouseCatchUp =
  "The spousal catch-up contribution must be made into a second account under your spouse's name.";
