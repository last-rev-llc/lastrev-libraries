import moment from 'moment';

export const calculatedAmmouts = (
  taxYear,
  coverageType,
  planStartDate,
  hsaElegible,
  medicareEnrollmentDate,
  spouceEnrollmentDate
) => {
  let yourMaximunAmmount = 0;
  let yourCatchup = 1000;
  let yourSpouseCathUp = 1000;
  if (taxYear === 2020) {
    if (coverageType === 'single') yourMaximunAmmount = 3550;
    else yourMaximunAmmount = 7100;
  } else if (taxYear === 2021) {
    if (coverageType === 'single') yourMaximunAmmount = 3600;
    else yourMaximunAmmount = 7200;
  } else if (taxYear === 2022) {
    if (coverageType === 'single') yourMaximunAmmount = 3650;
    else yourMaximunAmmount = 7300;
  } else if (taxYear === 2023) {
    if (coverageType === 'single') yourMaximunAmmount = 3850;
    else yourMaximunAmmount = 7750;
  }

  const day = moment(planStartDate).date();
  const month = moment(planStartDate).get('month') + (day !== 1 ? 1 : 0);
  let medicalMonth = 12;
  let medicalSpouseMonth = 12;
  if (medicareEnrollmentDate) {
    const medicalDay = moment(medicareEnrollmentDate).date();
    medicalMonth = moment(medicareEnrollmentDate).get('month') + (medicalDay !== 1 ? 1 : 0);
  }
  if (spouceEnrollmentDate) {
    const medicalSpouseDay = moment(spouceEnrollmentDate).date();
    medicalSpouseMonth =
      moment(spouceEnrollmentDate).get('month') + (medicalSpouseDay !== 1 ? 1 : 0);
  }

  let elegibleMonths = month;
  let spouseElegibleMonths = month;
  if (medicalMonth <= month) elegibleMonths = 0;
  else {
    if (hsaElegible === 'Yes') elegibleMonths = medicalMonth;
    else if (hsaElegible === 'No') {
      if (medicalMonth > month) elegibleMonths = medicalMonth - month;
      else elegibleMonths = medicalMonth;
    }
  }

  if (medicalSpouseMonth <= month) spouseElegibleMonths = 0;
  else {
    if (hsaElegible === 'Yes') spouseElegibleMonths = medicalSpouseMonth;
    else if (hsaElegible === 'No') {
      if (medicalSpouseMonth > month) spouseElegibleMonths = medicalSpouseMonth - month;
      else spouseElegibleMonths = medicalSpouseMonth;
    }
  }
  return {
    yourMaximunAmmount: (yourMaximunAmmount / 12) * elegibleMonths,
    yourCatchup: elegibleMonths < 12 ? (yourCatchup / 12) * elegibleMonths : 1000,
    yourSpouseCathUp: elegibleMonths < 12 ? (yourSpouseCathUp / 12) * spouseElegibleMonths : 1000
  };
};
