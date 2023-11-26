import States from '../../utils/states';

const fillingStatus = [
  {
    name: 'Married',
    value: 'Married'
  },
  {
    name: 'Single',
    value: 'Single'
  }
];

const contributionsIterations = [
  {
    name: 'Weekly',
    value: 'Weekly'
  },
  {
    name: 'Every other week',
    value: 'Every other week'
  },
  {
    name: 'Monthly',
    value: 'Monthly'
  },
  {
    name: 'Twice per month',
    value: 'Twice per month'
  },
  {
    name: 'Once per year',
    value: 'Once per year'
  }
];

const viewOne = (form, tooltip) => [
  {
    data: [
      {
        label: 'Who is coverage for?',
        isVisible: true,
        tooltip: {
          text: tooltip?.coverageFor
        },
        controls: [
          {
            type: 'button',
            value: 'You',
            defaultStyle: 'greenOutline',
            id: 'coverageFor',
            required: true
          },
          {
            type: 'button',
            value: 'Your Family',
            defaultStyle: 'greenOutline',
            id: 'coverageFor',
            required: true
          }
        ],
        error: {
          validation: (v) => !v,
          message: () => 'Please select the option that is the closest fit.'
        }
      },
      {
        label: 'Annual income',
        isVisible: true,
        tooltip: {
          text: tooltip?.annualIncome
        },
        controls: {
          type: 'text',
          dataType: 'currency',
          prefix: '$',
          id: 'annualIncome',
          required: true
        },
        error: {
          validation: (v) => v === 0,
          message: () => 'Please enter your gross annual income.'
        }
      },
      {
        label: 'Filing status',
        isVisible: true,
        controls: {
          type: 'select',
          id: 'fillingStatus',
          required: true,
          options: fillingStatus,
          defaultValue: form?.fillingStatus?.value
        },
        tooltip: {
          text: tooltip?.fillingStatus
        },
        error: {
          validation: (v) => !v,
          message: () => 'Please select the option that is the closest fit.'
        }
      },
      {
        label: 'State',
        isVisible: true,
        controls: {
          type: 'select',
          id: 'state',
          required: true,
          options: States
        },
        tooltip: {
          text: tooltip?.state
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
          required: true
        },
        tooltip: {
          text: tooltip?.currentAge
        },
        error: {
          validation: (v) => v < 18 || v > 100,
          message: (v) => {
            if (v > 100) return 'Please enter an age lower than 100.';
            return 'Please enter an age greater than 18.';
          }
        }
      }
    ]
  },
  {
    data: [
      {
        label: 'Do you currently have an HSA?',
        isVisible: true,
        tooltip: {
          text: tooltip?.currentyHSA
        },
        controls: [
          {
            type: 'button',
            value: 'Yes',
            defaultStyle: 'greenOutline',
            id: 'currentyHSA',
            required: true
          },
          {
            type: 'button',
            value: 'No',
            defaultStyle: 'greenOutline',
            id: 'currentyHSA',
            required: true
          }
        ],
        error: {
          validation: (v) => !v,
          message: () => 'Please select an option'
        }
      },
      {
        label: 'What is your current HSA balance?',
        isVisible: form?.currentyHSA?.value === 'Yes',
        tooltip: {
          text: tooltip?.currentHSABalance
        },
        controls: {
          type: 'text',
          dataType: 'currency',
          prefix: '$',
          id: 'currentHSABalance',
          required: form?.currentyHSA?.value === 'Yes'
        }
      },
      {
        label: 'Will you be contributing through your employer?',
        isVisible: true,
        tooltip: {
          text: tooltip?.contributingThroughEmployer
        },
        controls: [
          {
            type: 'button',
            value: 'Yes',
            defaultStyle: 'greenOutline',
            id: 'contributingThroughEmployer',
            required: true
          },
          {
            type: 'button',
            value: 'No',
            defaultStyle: 'greenOutline',
            id: 'contributingThroughEmployer',
            required: true
          }
        ],
        error: {
          validation: (v) => !v,
          message: () => 'Please select an option'
        }
      },
      {
        label: 'Will your employer make contributions to your HSA?',
        isVisible: form?.contributingThroughEmployer?.value === 'Yes',
        tooltip: {
          text: tooltip?.willEmployerContributions
        },
        controls: [
          {
            type: 'button',
            value: 'Yes',
            defaultStyle: 'greenOutline',
            id: 'willEmployerContributions',
            required: form?.contributingThroughEmployer?.value === 'Yes'
          },
          {
            type: 'button',
            value: 'No',
            defaultStyle: 'greenOutline',
            id: 'willEmployerContributions',
            required: form?.contributingThroughEmployer?.value === 'Yes'
          }
        ],
        error: {
          validation: (v) => !v,
          message: () => 'Please select an option.'
        }
      },
      {
        label: 'How often will you be making contributions to your HSA?',
        isVisible: form?.contributingThroughEmployer?.value === 'No' || form?.willEmployerContributions?.value === 'No',
        controls: {
          type: 'select',
          id: 'ofternOwnContributions',
          required: form?.contributingThroughEmployer?.value === 'No',
          options: contributionsIterations,
          defaultValue: form?.ofternOwnContributions?.value
        },
        tooltip: {
          text: tooltip?.ofternOwnContributions
        },
        error: {
          validation: (v) => !v,
          message: () => 'Please select the option that is the closest fit.'
        }
      },
      {
        label: 'How much will your employer contribute annually to your HSA?',
        isVisible: form?.willEmployerContributions?.value === 'Yes',
        tooltip: {
          text: tooltip?.employerContributions
        },
        controls: {
          type: 'text',
          dataType: 'currency',
          prefix: '$',
          id: 'employerContributions'
        }
      },
      {
        label: 'How often will you contribute to your HSA?',
        isVisible:
          form?.contributingThroughEmployer?.value === 'Yes' && form?.willEmployerContributions?.value === 'Yes',
        controls: {
          type: 'select',
          id: 'employerOfterContributions',
          required:
            form?.contributingThroughEmployer?.value === 'Yes' && form?.willEmployerContributions?.value === 'Yes',
          options: contributionsIterations,
          defaultValue: form?.employerOfterContributions?.value
        },
        tooltip: {
          text: tooltip?.employerOfterContributions
        },
        error: {
          validation: (v) => !v,
          message: () => 'Please select the option that is the closest fit.'
        }
      }
    ]
  }
];

export default viewOne;
