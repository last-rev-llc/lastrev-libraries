import States from '../../utils/states';

function invalidAge(currentAge) {
  if (!currentAge) return 'Please enter your current age';
  else if (currentAge < 18) return 'Please enter an age of 18 or greater';
  else if (currentAge > 99) return 'Please enter an age under 100';
  return false;
}

function invalidRetirementAge(retirementAge, currentAge) {
  if (retirementAge > 100) return 'Please enter an age under 100';
  else if (currentAge >= retirementAge) return 'Please enter an age greater than your current age';
  else if (!retirementAge) return 'Please enter your retirement age';
  return false;
}

function invalidHsa(value, age, planType) {
  if (!value) return 'Please enter an annual HSA contribution';
  if (value >= 10000000) return 'Please enter a valid amount';
  if (planType === 'Individual') {
    if (value > 3850 && age < 55)
      return 'Please reduce to $3,850 or less so you do not exceed the annual contribution limit.';
    else if (value > 4850 && age >= 55)
      return 'Please reduce to $4,850 or less so you do not exceed the annual contribution limit.';
    return false;
  } else if (planType === 'Family') {
    if (value > 7750 && age < 55)
      return 'Please reduce to $7,750 or less so you do not exceed the annual contribution limit.';
    else if (value > 8750 && age >= 55) {
      return 'Please reduce to $8,750 or less so you do not exceed the annual contribution limit.';
    }
  }
  return false;
}

function invalidAnnualIncome(annualIncome) {
  if (!annualIncome) return 'Please enter your gross annual income';
  else if (annualIncome > 5000000) return 'Please enter a valid amount';
  return false;
}

export const formSavingTemplate = (form, defaults, tooltips) => [
  {
    data: [
      {
        label: 'Plan type',
        isVisible: true,
        tooltip: {
          icon: 'i',
          text: tooltips?.planType
        },
        controls: [
          {
            type: 'button',
            value: 'Individual',
            defaultStyle: 'greenOutline',
            id: 'planType',
            required: true
          },
          {
            type: 'button',
            value: 'Family',
            defaultStyle: 'greenOutline',
            id: 'planType',
            required: true
          }
        ],
        error: {
          message: () => 'Please select your plan type',
          validation: (v) => !v
        }
      },
      {
        label: 'Marital status',
        isVisible: true,
        tooltip: {
          text: tooltips?.maritalStatus
        },
        controls: [
          {
            type: 'button',
            value: 'Single',
            defaultStyle: 'greenOutline',
            id: 'maritalStatus',
            previousFields: ['planType'],
            required: true
          },
          {
            type: 'button',
            value: 'Married',
            defaultStyle: 'greenOutline',
            id: 'maritalStatus',
            previousFields: ['planType'],
            required: true
          }
        ],
        error: {
          message: () => 'Please select your marital status',
          validation: (v) => !v
        }
      },
      {
        label: 'State',
        isVisible: true,
        controls: {
          type: 'select',
          id: 'state',
          placeHolder: 'Alaska',
          required: true,
          options: States,
          previousFields: ['planType', 'maritalStatus']
        },
        tooltip: {
          text: tooltips?.state
        },
        error: {
          message: () => 'Please select your state',
          validation: (v) => !v
        }
      },
      {
        label: 'Current age',
        isVisible: true,
        controls: {
          type: 'text',
          dataType: 'number',
          id: 'currentAge',
          required: true,
          previousFields: ['planType', 'maritalStatus', 'state']
        },
        tooltip: {
          text: tooltips?.currentAge
        },
        error: {
          message: invalidAge,
          validation: invalidAge
        }
      },
      {
        label: 'Retirement age',
        isVisible: true,
        controls: {
          type: 'text',
          id: 'retirementAge',
          dataType: 'number',
          required: true,
          previousFields: ['planType', 'maritalStatus', 'state', 'currentAge']
        },
        tooltip: {
          text: tooltips?.retirementAge
        },
        error: {
          message: (v) => invalidRetirementAge(v, form?.currentAge?.value),
          validation: (v) => invalidRetirementAge(v, form?.currentAge?.value)
        }
      },
      {
        label: 'Annual income',
        isVisible: true,
        controls: {
          type: 'text',
          id: 'annualIncome',
          required: true,
          prefix: '$',
          dataType: 'currency',
          previousFields: ['planType', 'maritalStatus', 'state', 'currentAge', 'retirementAge']
        },
        tooltip: {
          text: tooltips?.annualIncome
        },
        error: {
          message: invalidAnnualIncome,
          validation: invalidAnnualIncome
        }
      },
      {
        label: 'Current HSA balance',
        isVisible: true,
        tooltip: {
          text: tooltips?.currentHsaBalance
        },
        controls: {
          type: 'text',
          id: 'currentHsaBalance',
          prefix: '$',
          dataType: 'currency',
          defaultValue: defaults ? defaults.currentHsaBalance : undefined
        },
        error: {
          message: () => 'Please enter a valid amount',
          validation: (v) => v > 10000000
        }
      },
      {
        label: 'Annual HSA contributions',
        isVisible: true,
        tooltip: {
          text: tooltips?.annualHsaBalance
        },
        controls: {
          type: 'text',
          id: 'annualHsaBalance',
          required: true,
          prefix: '$',
          dataType: 'currency',
          previousFields: ['planType', 'maritalStatus', 'state', 'currentAge', 'retirementAge', 'annualIncome']
        },
        error: {
          message: (v) => invalidHsa(v, form?.currentAge?.value, form?.planType?.value),
          validation: (v) => invalidHsa(v, form?.currentAge?.value, form?.planType?.value)
        }
      },
      {
        label: 'Annual HSA expenses',
        isVisible: true,
        tooltip: {
          text: tooltips?.annualHsaExpenses
        },
        controls: {
          type: 'text',
          id: 'annualHsaExpenses',
          prefix: '$',
          dataType: 'currency',
          defaultValue: defaults ? defaults.annualHsaExpenses : undefined
        }
      },
      {
        label: 'Annual % rate of return',
        isVisible: true,
        tooltip: {
          text: tooltips?.annualRateOfReturn
        },
        controls: {
          type: 'slide',
          id: 'annualRateOfReturn',
          options: {
            min: 1,
            max: 12,
            defaultValue: 3
          },
          previousFields: [
            'planType',
            'maritalStatus',
            'state',
            'currentAge',
            'retirementAge',
            'annualIncome',
            'annualHsaBalance'
          ],
          required: true,
          validatePreviousInputs: true
        }
      }
    ]
  }
];
