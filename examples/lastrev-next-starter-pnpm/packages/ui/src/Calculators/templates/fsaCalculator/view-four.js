import { largeAmmountValidation } from './view-one';

const ViewFour = (tooltips) => {
  return [
    {
      data: [
        {
          label: 'Child day care or preschool',
          isVisible: true,
          controls: {
            type: 'text',
            id: 'childCare',
            prefix: '$',
            dataType: 'currency'
          },
          tooltip: {
            text: tooltips?.childCare
          },
          error: largeAmmountValidation
        },
        {
          label: 'Babysitting',
          isVisible: true,
          controls: {
            type: 'text',
            id: 'babysitting',
            prefix: '$',
            dataType: 'currency'
          },
          tooltip: {
            text: tooltips?.babysitting
          },
          error: largeAmmountValidation
        },
        {
          label: 'Summer day camps',
          isVisible: true,
          controls: {
            type: 'text',
            id: 'summerDayCamps',
            prefix: '$',
            dataType: 'currency'
          },
          tooltip: {
            text: tooltips?.summerDayCamps
          },
          error: largeAmmountValidation
        },
        {
          label: 'Before or after school care',
          isVisible: true,
          controls: {
            type: 'text',
            id: 'beforeAfterSchoolCare',
            prefix: '$',
            dataType: 'currency'
          },
          tooltip: {
            text: tooltips?.beforeAfterSchoolCare
          },
          error: largeAmmountValidation
        }
      ]
    },
    {
      data: [
        {
          label: 'Nanny or au pair',
          isVisible: true,
          controls: {
            type: 'text',
            id: 'nanyPair',
            prefix: '$',
            dataType: 'currency'
          },
          tooltip: {
            text: tooltips?.nanyPair
          },
          error: largeAmmountValidation
        },
        {
          label: 'Adult or senior day care',
          isVisible: true,
          controls: {
            type: 'text',
            id: 'seniorDayCare',
            prefix: '$',
            dataType: 'currency'
          },
          tooltip: {
            text: tooltips?.seniorDayCare
          },
          error: largeAmmountValidation
        },
        {
          label: 'Custodial or elder care',
          isVisible: true,
          controls: {
            type: 'text',
            id: 'custodialCare',
            prefix: '$',
            dataType: 'currency'
          },
          tooltip: {
            text: tooltips?.custodialCare
          },
          error: largeAmmountValidation
        }
      ]
    }
  ];
};

export default ViewFour;
