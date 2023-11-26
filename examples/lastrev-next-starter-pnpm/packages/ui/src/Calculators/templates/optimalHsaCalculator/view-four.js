import { parseToNumber } from '../../utils/helpers';

const validateHsaPortion = (type, value, expenses) => {
  if (type === 'percentage') {
    return value > 100;
  }
  return parseToNumber(value) > parseToNumber(expenses);
};

const getHsaPortionMessage = (type) => {
  if (type === 'percentage') return 'Please enter a valid ammount';
  return 'Please enter an amount less than your expected annual healthcare expenses.';
};

export const getWhichView = (goals) => {
  const { coverHealthcare, investLongTerm, maintainAndInvest, saveForFuture } = goals;
  if (coverHealthcare && !investLongTerm && !maintainAndInvest && !saveForFuture) return 'a'; // done
  if (coverHealthcare && !investLongTerm && !maintainAndInvest && saveForFuture) return 'b'; // done
  if (!coverHealthcare && !investLongTerm && !maintainAndInvest && saveForFuture) return 'c'; // done
  if (!coverHealthcare && investLongTerm && !maintainAndInvest && !saveForFuture) return 'e'; // done
  return 'd'; // done
};

const viewFour = (form, tooltips) => {
  const { hsaGoalsSelected } = form;
  const view = getWhichView(hsaGoalsSelected);
  return [
    {
      data: [
        {
          label: 'Your anticipated out of pocket annual expenses are:',
          isVisible: view === 'b',
          customStyle: {
            color: '#4a38a3',
            fontSize: '24px'
          },
          tooltip: {
            text: tooltips?.anualPocketExpenses
          },
          hasSeparation: false,
          controls: {
            type: 'showText',
            id: 'anualPocketExpenses',
            value: form?.outOfPocketExpenses?.value,
            prefix: '$'
          }
        },
        {
          label: 'What portion of your annual expenses do you want to use your HSA to pay for each year?',
          isVisible: view === 'b',
          tooltip: {
            text: tooltips?.portionAnnualExpenses
          },
          controls: [
            {
              type: 'inputButton',
              defaultStyle: 'purpleOutline',
              id: 'portionAnnualExpenses',
              hasInput: true,
              value: 'currency',
              dataType: 'currency',
              prefix: '$',
              required: view === 'b'
            },
            {
              type: 'inputButton',
              defaultStyle: 'purpleOutline',
              id: 'portionAnnualExpenses',
              hasInput: true,
              value: 'percentage',
              dataType: 'number',
              subfix: '%',
              required: view === 'b'
            }
          ],
          error: {
            message: () => getHsaPortionMessage(form?.portionAnnualExpenses?.value),
            validation: () =>
              validateHsaPortion(
                form?.portionAnnualExpenses?.value,
                form?.portionAnnualExpenses?.inputValue,
                form?.outOfPocketExpenses?.value
              )
          }
        },
        {
          label: 'What is your HSA savings goal for retirement?',
          isVisible: view === 'd' || view === 'e',
          tooltip: {
            text: tooltips?.hsaSavingsGoals
          },
          controls: {
            type: 'text',
            dataType: 'currency',
            prefix: '$',
            id: 'hsaSavingsGoals',
            required: view === 'd' || view === 'e'
          },
          error: {
            message: () => 'Please enter a value.',
            validation: (v) => !v
          }
        },
        {
          label: 'How much of a cash safety net do you want to build before you plan to start investing?',
          isVisible: view === 'd',
          tooltip: {
            text: tooltips?.cashSafetyBeforeInvest
          },
          controls: {
            type: 'text',
            dataType: 'currency',
            prefix: '$',
            id: 'cashSafetyBeforeInvest',
            required: view === 'd'
          },
          error: {
            message: () => 'Please enter a value.',
            validation: (v) => !v
          }
        },
        {
          label: 'How much do you plan to save for your safety net or future medical expenses?',
          isVisible: view === 'c',
          tooltip: {
            text: tooltips?.saveFutureSafety
          },
          controls: {
            type: 'text',
            dataType: 'currency',
            prefix: '$',
            id: 'saveFutureSafety',
            required: view === 'c'
          },
          error: {
            message: () => 'Please enter a value.',
            validation: (v) => !v
          }
        }
      ]
    },
    {
      data: [
        {
          label: 'How much do you plan to save for your safety net or future medical expenses?',
          isVisible: view === 'b',
          tooltip: {
            text: tooltips?.saveFutureSafety
          },
          controls: {
            type: 'text',
            dataType: 'currency',
            prefix: '$',
            id: 'saveFutureSafety',
            required: view === 'b'
          },
          error: {
            message: () => 'Please enter a value.',
            validation: (v) => !v
          }
        },
        {
          label: 'When do you want to meet this goal?',
          isVisible: view === 'b' || view === 'c',
          tooltip: {
            text: tooltips?.meetGoal
          },
          description: 'years from now',
          customStyle: {
            width: '30%'
          },
          controls: {
            type: 'text',
            dataType: 'number',
            id: 'meetGoal',
            required: view === 'b' || view === 'c'
          },
          error: {
            message: () => 'Please enter a valid year.',
            validation: (v) => !v || v > 100
          }
        },
        {
          label: 'At what age do you want to retire?',
          isVisible: view === 'd' || view === 'e',
          tooltip: {
            text: tooltips?.retireAge
          },
          controls: {
            type: 'text',
            dataType: 'number',
            id: 'retireAge',
            required: view === 'd' || view === 'e'
          },
          error: {
            message: () => "Please enter a valid age. If you're unsure, enter 65.",
            validation: (v) => !v || v > 100
          }
        }
      ]
    }
  ];
};

export default viewFour;
