import { largeAmmountValidation } from './view-one';

const ViewTwo = (tooltips) => {
  return [
    {
      data: [
        {
          label: 'Routine office visits',
          isVisible: true,
          controls: {
            type: 'text',
            id: 'officeVisits',
            prefix: '$',
            dataType: 'currency'
          },
          tooltip: {
            text: tooltips?.officeVisits
          },
          error: largeAmmountValidation
        },
        {
          label: 'Specialty office visits',
          isVisible: true,
          controls: {
            type: 'text',
            id: 'specialVisits',
            prefix: '$',
            dataType: 'currency'
          },
          tooltip: {
            text: tooltips?.specialVisits
          },
          error: largeAmmountValidation
        },
        {
          label: 'Other Speciality care',
          isVisible: true,
          hintText: '(ex: chiropractor, psychiatry, maternity, physical therapy, etc.)',
          controls: {
            type: 'text',
            id: 'otherVisits',
            prefix: '$',
            dataType: 'currency'
          },
          tooltip: {
            text: tooltips?.otherVisits
          },
          error: largeAmmountValidation
        },
        {
          label: 'Labwork or x-rays',
          isVisible: true,
          controls: {
            type: 'text',
            id: 'labXrays',
            prefix: '$',
            dataType: 'currency'
          },
          tooltip: {
            text: tooltips?.labXrays
          },
          error: largeAmmountValidation
        }
      ]
    },
    {
      data: [
        {
          label: 'Hospitalization or surgery',
          isVisible: true,
          controls: {
            type: 'text',
            id: 'surgery',
            prefix: '$',
            dataType: 'currency'
          },
          tooltip: {
            text: tooltips?.surgery
          },
          error: largeAmmountValidation
        },
        {
          label: 'Prescription medications',
          isVisible: true,
          controls: {
            type: 'text',
            id: 'prescription',
            prefix: '$',
            dataType: 'currency'
          },
          tooltip: {
            text: tooltips?.prescription
          },
          error: largeAmmountValidation
        },
        {
          label: 'Over-the-counter medicines & supplies',
          isVisible: true,
          controls: {
            type: 'text',
            id: 'medicinesSupplies',
            prefix: '$',
            dataType: 'currency'
          },
          tooltip: {
            text: tooltips?.medicinesSupplies
          },
          error: largeAmmountValidation
        },
        {
          label: 'Other medical expenses or dual-use items',
          isVisible: true,
          controls: {
            type: 'text',
            id: 'dualUseItems',
            prefix: '$',
            dataType: 'currency'
          },
          tooltip: {
            text: tooltips?.dualUseItems
          },
          error: largeAmmountValidation
        }
      ]
    }
  ];
};

export default ViewTwo;
