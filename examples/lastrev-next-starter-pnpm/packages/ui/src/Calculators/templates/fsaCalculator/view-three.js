import { largeAmmountValidation } from './view-one';

const ViewThree = (tooltips) => {
  return [
    {
      title: 'Dental Care',
      data: [
        {
          label: 'Routine dental care',
          isVisible: true,
          controls: {
            type: 'text',
            id: 'routineDentalCare',
            prefix: '$',
            dataType: 'currency'
          },
          tooltip: {
            text: tooltips?.routineDentalCare
          },
          error: largeAmmountValidation
        },
        {
          label: 'Specialty dental care',
          isVisible: true,
          controls: {
            type: 'text',
            id: 'specialDentalCare',
            prefix: '$',
            dataType: 'currency'
          },
          tooltip: {
            text: tooltips?.specialDentalCare
          },
          error: largeAmmountValidation
        },
        {
          label: 'Orthodontics',
          isVisible: true,
          controls: {
            type: 'text',
            id: 'orthodontics',
            prefix: '$',
            dataType: 'currency'
          },
          tooltip: {
            text: tooltips?.orthodontics
          },
          error: largeAmmountValidation
        }
      ]
    },
    {
      title: 'Vision Care',
      data: [
        {
          label: 'Eye examinations',
          isVisible: true,
          controls: {
            type: 'text',
            id: 'eyeExamination',
            prefix: '$',
            dataType: 'currency'
          },
          tooltip: {
            text: tooltips?.eyeExamination
          },
          error: largeAmmountValidation
        },
        {
          label: 'Prescription eyeglasses or sunglasses',
          isVisible: true,
          controls: {
            type: 'text',
            id: 'eyeglasses',
            prefix: '$',
            dataType: 'currency'
          },
          tooltip: {
            text: tooltips?.eyeglasses
          },
          error: largeAmmountValidation
        },
        {
          label: 'Contact lenses and solution',
          isVisible: true,
          controls: {
            type: 'text',
            id: 'contactLenses',
            prefix: '$',
            dataType: 'currency'
          },
          tooltip: {
            text: tooltips?.contactLenses
          },
          error: largeAmmountValidation
        },
        {
          label: 'Corrective eye surgery',
          isVisible: true,
          controls: {
            type: 'text',
            id: 'eyeSurgery',
            prefix: '$',
            dataType: 'currency'
          },
          tooltip: {
            text: tooltips?.eyeSurgery
          },
          error: largeAmmountValidation
        }
      ]
    }
  ];
};

export default ViewThree;
