import moment from 'moment';
function invalidDate(date, isYears) {
  if (isYears) {
    const years = moment().diff(moment(date, 'MM-DD-YYYY'), 'years');
    const isValidDate = moment(date, 'MM/DD/YYYY', true).isValid();
    if (!date) return 'Please enter your date of birth';
    else if (years > 100 || years < 0 || !isValidDate) return 'Please select a valid date';
    return false;
  }
  const isValidDate = moment(date, true).isValid();
  return !isValidDate;
}

function stillElegible(healthPlanStartDate, year) {
  // YYYY-MM-DD
  const firstDaySelectedTaxYear = `${year}-01-01`;
  if (healthPlanStartDate && year) {
    if (moment(healthPlanStartDate).isSameOrAfter(moment(firstDaySelectedTaxYear))) {
      return true;
    }
    return false;
  }
  return false;
}

export const contributionTemplate = (form, year, tooltips) => {
  const shouldParentsPlanBeVisible =
    moment().diff(moment(form?.birthDate?.value, 'MM-DD-YYYY'), 'years') < 26;
  const yourAge = moment().diff(moment(form?.birthDate?.value, 'MM-DD-YYYY'), 'years');
  const spouseAge = moment().diff(moment(form?.spouseDateOfBirth?.value, 'MM-DD-YYYY'), 'years');

  const HDHPOptions = [
    { name: 'None', value: 'none' },
    { name: 'Single', value: 'single' },
    { name: 'Family', value: 'family' }
  ];
  if (shouldParentsPlanBeVisible)
    HDHPOptions.push({ name: `I’m on my parent’s plan`, value: 'parents' });
  return [
    {
      data: [
        {
          label: 'Date of birth',
          isVisible: true,
          controls: {
            required: true,
            type: 'date',
            id: 'birthDate',
            dataType: 'date',
            placeHolder: 'MM/DD/YYYY',
            formatToYears: true
          },
          error: {
            message: (v) => invalidDate(v, 'years'),
            validation: (v) => invalidDate(v, 'years')
          },
          tooltip: {
            text: tooltips?.birthDate
          }
        },
        {
          label: 'HDHP coverage type',
          isVisible: true,
          controls: {
            type: 'select',
            id: 'coverageType',
            required: true,
            options: HDHPOptions
          },
          tooltip: {
            text: tooltips?.coverageType
          },
          error: {
            message: () => 'Please select an option',
            validation: (v) => !v
          }
        },
        {
          label: 'Do you file your taxes yourself?*',
          isVisible: form?.coverageType?.value === 'parents',
          controls: [
            {
              type: 'button',
              value: 'Yes',
              defaultStyle: 'greenOutline',
              id: 'taxYourself',
              required: true
            },
            {
              type: 'button',
              value: 'No',
              defaultStyle: 'greenOutline',
              id: 'taxYourself',
              required: true
            }
          ],
          tooltip: {
            text: tooltips?.taxYourself
          },
          error: {
            message: () => 'Please select an option',
            validation: (v) => !v
          }
        },
        {
          label: 'Health plan start date',
          isVisible:
            form?.coverageType?.value === 'parents' ? form?.taxYourself?.value === 'Yes' : true,
          // (form?.coverageType?.value === 'parents' && form?.taxYourself?.value === 'Yes') || true,
          controls: {
            required: true,
            type: 'datePicker',
            id: 'planStartDate',
            dataType: 'date',
            placeHolder: 'MM/DD/YYYY'
          },
          tooltip: {
            text: tooltips?.planStartDate
          },
          error: {
            message: invalidDate,
            validation: invalidDate
          }
        },
        {
          label: `Will you still be on your HSA-eligible health plan through December 31, ${
            year + 1
          }?*`,
          isVisible: stillElegible(form?.planStartDate?.value, year),
          controls: [
            {
              type: 'button',
              value: 'Yes',
              defaultStyle: 'greenOutline',
              id: 'hsaElegible',
              required: true
            },
            {
              type: 'button',
              value: 'No',
              defaultStyle: 'greenOutline',
              id: 'hsaElegible',
              required: true
            }
          ],
          tooltip: {
            text: tooltips?.hsaElegible
          },
          error: {
            message: () => 'Please select an option',
            validation: (v) => !v
          }
        },
        {
          label: 'Marital status',
          isVisible:
            form?.coverageType?.value === 'family' ||
            (form?.coverageType?.value === 'parents' && form?.taxYourself?.value === 'Yes'),
          controls: [
            {
              type: 'button',
              value: 'Single',
              defaultStyle: 'greenOutline',
              id: 'maritalStatus',
              required: true
            },
            {
              type: 'button',
              value: 'Married',
              defaultStyle: 'greenOutline',
              id: 'maritalStatus',
              required: true
            }
          ],
          tooltip: {
            text: tooltips?.maritalStatus
          },
          error: {
            message: () => 'Please select an option',
            validation: (v) => !v
          }
        },
        {
          label: 'Are you currently enrolled or plan to enroll in Medicare this year?',
          isVisible: yourAge >= 55,
          controls: [
            {
              type: 'button',
              value: 'Yes',
              defaultStyle: 'greenOutline',
              id: 'currentyEnrolled',
              required: true
            },
            {
              type: 'button',
              value: 'No',
              defaultStyle: 'greenOutline',
              id: 'currentyEnrolled',
              required: true
            }
          ],
          tooltip: {
            text: tooltips?.currentyEnrolled
          },
          error: {
            message: () => 'Please select an option',
            validation: (v) => !v
          }
        },
        {
          label: 'Medicare enrollment date',
          isVisible: yourAge >= 55 && form?.currentyEnrolled?.value === 'Yes',
          controls: {
            required: true,
            type: 'datePicker',
            id: 'medicareEnrollmentDate',
            dataType: 'date',
            placeHolder: 'MM/DD/YYYY'
          },
          tooltip: {
            text: tooltips?.medicareEnrollmentDate
          },
          error: {
            message: (v) => invalidDate(v),
            validation: (v) => invalidDate(v)
          }
        },
        {
          label: 'What is your spouse’s date of birth?',
          isVisible:
            form?.coverageType?.value === 'family' && form?.maritalStatus?.value === 'Married',
          controls: {
            required: true,
            type: 'date',
            id: 'spouseDateOfBirth',
            dataType: 'date',
            placeHolder: 'MM/DD/YYYY',
            formatToYears: true
          },
          tooltip: {
            text: tooltips?.spouseDateOfBirth
          },
          error: {
            message: (v) => invalidDate(v, 'years'),
            validation: (v) => invalidDate(v, 'years')
          }
        },
        {
          label: 'Is your spouse enrolled in Medicare?',
          isVisible:
            form?.coverageType?.value === 'family' &&
            form?.maritalStatus?.value === 'Married' &&
            spouseAge >= 55,
          controls: [
            {
              type: 'button',
              value: 'Yes',
              defaultStyle: 'greenOutline',
              id: 'spouseEnrolledInMedicare',
              required: true
            },
            {
              type: 'button',
              value: 'No',
              defaultStyle: 'greenOutline',
              id: 'spouseEnrolledInMedicare',
              required: true
            }
          ],
          tooltip: {
            text: tooltips?.spouseEnrolledInMedicare
          },
          error: {
            message: () => 'Please select an option',
            validation: (v) => !v
          }
        },
        {
          label: "Spouse's medicare enrollment date",
          isVisible:
            form?.maritalStatus?.value === 'Married' &&
            form?.spouseEnrolledInMedicare?.value === 'Yes' &&
            spouseAge >= 55,
          controls: {
            required: true,
            type: 'datePicker',
            id: 'spouceEnrollmentDate',
            dataType: 'date',
            placeHolder: 'MM/DD/YYYY'
          },
          tooltip: {
            text: tooltips?.spouceEnrollmentDate
          },
          error: {
            message: (v) => invalidDate(v),
            validation: (v) => invalidDate(v)
          }
        }
      ]
    }
  ];
};
