/* eslint-disable prettier/prettier */

import moment from 'moment';
import { calculatedAmmouts } from './calculateContributionAmmount';
import {
  response,
  spouseCatchUp,
  yourCatchups,
  yourExplanations
} from './contributionExplanations';

const isBefore1o1TaxYear = (date, taxYear) => {
  const dateBefore = `${taxYear}-01-01`;
  return moment(date).isBefore(dateBefore);
};

export const getResponseMatrix = (
  {
    birthDate,
    coverageType,
    planStartDate, // ?
    hsaElegible,
    maritalStatus,
    currentyEnrolled,
    medicareEnrollmentDate,
    taxYourself,
    spouseDateOfBirth,
    spouseEnrolledInMedicare,
    spouceEnrollmentDate
  },
  year
) => {
  const { yourMaximunAmmount, yourCatchup, yourSpouseCathUp } = calculatedAmmouts(
    year,
    coverageType,
    planStartDate,
    hsaElegible,
    medicareEnrollmentDate,
    spouceEnrollmentDate
  );
  const yourAge = moment().diff(moment(birthDate, 'MM/DD/YYYY'), 'years');
  const spouseAge = moment().diff(moment(spouseDateOfBirth, 'MM/DD/YYYY'), 'years');
  // see this rules in https://docs.google.com/spreadsheets/d/1OvNuzrEJ7VwheR9E31WM1kN5VA9ucAqojL7DvLYDK_g/edit#gid=471982074
  if (yourAge < 18) return response(year, 0, yourExplanations().less18);
  if (coverageType === 'none') return response(year, 0, yourExplanations(year).noCoverage);
  if (yourAge < 26 && coverageType === 'parents' && taxYourself === 'No')
    return response(year, 0, yourExplanations(year).noTax);
  if (planStartDate) {
    if (moment(planStartDate).year() > year && hsaElegible === 'No') {
      return response(year, 0, yourExplanations(year).notElegible);
    }
    if (
      yourAge < 26 &&
      coverageType === 'parents' &&
      maritalStatus === 'Single' &&
      taxYourself === 'Yes'
    )
      return response(year, yourMaximunAmmount, yourExplanations(year).taxYourself);
    if (
      yourAge < 26 &&
      coverageType === 'parents' &&
      maritalStatus === 'Married' &&
      taxYourself === 'Yes'
    )
      return response(year, yourMaximunAmmount, yourExplanations(year).taxYourself);
    if (yourAge < 26 && coverageType === 'single' && hsaElegible === 'Yes') {
      if (moment(planStartDate).year() > year) {
        return response(year, 0, yourExplanations(year).notElegible);
      }
      return response(year, yourMaximunAmmount, yourExplanations(year).contributeIndividual);
    }
    if (yourAge < 26 && coverageType === 'single' && hsaElegible === 'No')
      return response(year, 0, yourExplanations(year).notElegible);
    if (yourAge < 26 && coverageType === 'family' && maritalStatus === 'Single')
      return response(year, yourMaximunAmmount, yourExplanations(year).contributeFamily);
    if (yourAge < 26 && coverageType === 'family' && maritalStatus === 'Married' && spouseAge < 55)
      return response(year, yourMaximunAmmount, yourExplanations(year).contributeFamilySpouse);
    if (
      yourAge < 26 &&
      coverageType === 'family' &&
      maritalStatus === 'Married' &&
      spouseAge >= 55 &&
      spouseEnrolledInMedicare === 'No'
    )
      return response(
        year,
        yourMaximunAmmount,
        yourExplanations(year).contributeSpouseCatchup,
        undefined,
        undefined,
        yourSpouseCathUp,
        spouseCatchUp
      );
    if (
      yourAge < 26 &&
      coverageType === 'family' &&
      maritalStatus === 'Married' &&
      spouseAge >= 55 &&
      spouseEnrolledInMedicare === 'Yes' &&
      !isBefore1o1TaxYear(spouceEnrollmentDate, year)
    )
      return response(
        year,
        yourMaximunAmmount,
        yourExplanations(year).contributeMaxPlus,
        undefined,
        undefined,
        yourSpouseCathUp,
        spouseCatchUp
      );
    if (
      yourAge < 26 &&
      coverageType === 'family' &&
      maritalStatus === 'Married' &&
      spouseAge >= 55 &&
      spouseEnrolledInMedicare === 'Yes' &&
      isBefore1o1TaxYear(spouceEnrollmentDate, year)
    )
      return response(year, yourMaximunAmmount, yourExplanations(year).contributeFamilySpouse);
    if (yourAge >= 26 && yourAge < 55) {
      if (coverageType === 'family' && maritalStatus === 'Married' && spouseAge < 55)
        return response(year, yourMaximunAmmount, yourExplanations(year).contributeFamilySpouse);
      if (
        coverageType === 'family' &&
        maritalStatus === 'Married' &&
        spouseAge >= 55 &&
        spouseEnrolledInMedicare === 'No'
      )
        return response(
          year,
          yourMaximunAmmount,
          yourExplanations(year).contributeSpouseCatchup,
          undefined,
          undefined,
          yourSpouseCathUp,
          spouseCatchUp
        );
      if (
        coverageType === 'family' &&
        maritalStatus === 'Married' &&
        spouseAge >= 55 &&
        spouseEnrolledInMedicare === 'Yes' &&
        !isBefore1o1TaxYear(spouceEnrollmentDate, year)
      )
        return response(
          year,
          yourMaximunAmmount,
          yourExplanations(year).contributeMaxPlus,
          undefined,
          undefined,
          yourSpouseCathUp,
          spouseCatchUp
        );
      if (
        coverageType === 'family' &&
        maritalStatus === 'Married' &&
        spouseAge >= 55 &&
        spouseEnrolledInMedicare === 'Yes' &&
        isBefore1o1TaxYear(spouceEnrollmentDate, year)
      )
        return response(year, yourMaximunAmmount, yourExplanations(year).contributeFamilySpouse);
      if (coverageType === 'single' && hsaElegible) {
        if (isBefore1o1TaxYear(planStartDate, year)) {
          return response(year, 0, yourExplanations(year).notElegible);
        }
        return response(year, yourMaximunAmmount, yourExplanations(year).contributeIndividual);
      }
      if (coverageType === 'family' && maritalStatus === 'Single')
        return response(year, yourMaximunAmmount, yourExplanations(year).contributeFamily);
    }
    if (
      yourAge >= 55 &&
      coverageType === 'family' &&
      maritalStatus === 'Married' &&
      spouseAge >= 55 &&
      currentyEnrolled === 'Yes' &&
      !isBefore1o1TaxYear(medicareEnrollmentDate, year) &&
      spouseEnrolledInMedicare === 'Yes' &&
      !isBefore1o1TaxYear(spouceEnrollmentDate, year)
    )
      return response(
        year,
        yourMaximunAmmount,
        yourExplanations(year).catchUpProratedBoth,
        yourCatchup,
        yourCatchups.older55ProratedBoth,
        yourSpouseCathUp,
        spouseCatchUp
      );

    if (
      yourAge >= 55 &&
      coverageType === 'family' &&
      maritalStatus === 'Married' &&
      spouseAge >= 55 &&
      currentyEnrolled === 'Yes' &&
      !isBefore1o1TaxYear(medicareEnrollmentDate, year) &&
      spouseEnrolledInMedicare === 'Yes' &&
      isBefore1o1TaxYear(spouceEnrollmentDate, year)
    )
      return response(
        year,
        yourMaximunAmmount,
        yourExplanations(year).catchUpProrated,
        yourCatchup,
        yourCatchups.older55ProratedMedicare
      );

    if (
      yourAge >= 55 &&
      coverageType === 'family' &&
      maritalStatus === 'Married' &&
      spouseAge >= 55 &&
      currentyEnrolled === 'No' &&
      spouseEnrolledInMedicare === 'Yes' &&
      !isBefore1o1TaxYear(spouceEnrollmentDate, year)
    )
      return response(
        year,
        yourMaximunAmmount,
        yourExplanations(year).makeCatchUpBoth,
        yourCatchup,
        yourCatchups.separetedAccounts,
        yourSpouseCathUp,
        spouseCatchUp
      );

    if (
      yourAge >= 55 &&
      coverageType === 'family' &&
      maritalStatus === 'Married' &&
      spouseAge >= 55 &&
      currentyEnrolled === 'No' &&
      spouseEnrolledInMedicare === 'Yes' &&
      isBefore1o1TaxYear(spouceEnrollmentDate, year)
    )
      return response(
        year,
        yourMaximunAmmount,
        yourExplanations(year).makeCatchUpYourself,
        yourCatchup,
        yourCatchups.older55
      );

    if (
      yourAge >= 55 &&
      coverageType === 'family' &&
      maritalStatus === 'Married' &&
      spouseAge < 55 &&
      currentyEnrolled === 'Yes' &&
      !isBefore1o1TaxYear(medicareEnrollmentDate, year)
    )
      return response(
        year,
        yourMaximunAmmount,
        yourExplanations(year).catchUpProrated,
        yourCatchup,
        yourCatchups.older55ProratedMedicare
      );

    if (
      yourAge >= 55 &&
      coverageType === 'family' &&
      maritalStatus === 'Married' &&
      spouseAge >= 55 &&
      currentyEnrolled === 'Yes' &&
      !isBefore1o1TaxYear(medicareEnrollmentDate, year) &&
      spouseEnrolledInMedicare === 'No'
    )
      return response(
        year,
        yourMaximunAmmount,
        yourExplanations(year).catchUpProratedBoth,
        yourCatchup,
        yourCatchups.older55ProratedBoth,
        yourSpouseCathUp,
        spouseCatchUp
      );

    if (
      yourAge >= 55 &&
      coverageType === 'single' &&
      currentyEnrolled == 'Yes' &&
      !isBefore1o1TaxYear(medicareEnrollmentDate, year)
    )
      return response(
        year,
        yourMaximunAmmount,
        yourExplanations(year).individualProRated,
        yourCatchup,
        yourCatchups.older55ProratedMedicare
      );

    if (
      yourAge >= 55 &&
      coverageType === 'family' &&
      maritalStatus === 'Single' &&
      currentyEnrolled === 'Yes' &&
      !isBefore1o1TaxYear(medicareEnrollmentDate, year)
    )
      return response(
        year,
        yourMaximunAmmount,
        yourExplanations(year).familyProRated,
        yourCatchup,
        yourCatchups.older55Prorated
      );

    if (
      yourAge >= 55 &&
      coverageType === 'single' &&
      currentyEnrolled === 'Yes' &&
      isBefore1o1TaxYear(medicareEnrollmentDate, year)
    )
      return response(year, 0, yourExplanations(year).notOnMedicare);

    if (
      yourAge >= 55 &&
      coverageType === 'family' &&
      maritalStatus === 'Single' &&
      currentyEnrolled === 'Yes' &&
      isBefore1o1TaxYear(medicareEnrollmentDate, year)
    )
      return response(year, 0, yourExplanations(year).notOnMedicare);

    if (
      yourAge >= 55 &&
      coverageType === 'family' &&
      maritalStatus === 'Married' &&
      spouseAge < 55 &&
      currentyEnrolled === 'No'
    )
      return response(
        year,
        yourMaximunAmmount,
        yourExplanations(year).makeCatchUpYourself,
        yourCatchup,
        yourCatchups.older55
      );

    if (
      yourAge >= 55 &&
      coverageType === 'family' &&
      maritalStatus === 'Married' &&
      spouseAge >= 55 &&
      currentyEnrolled === 'No' &&
      spouseEnrolledInMedicare === 'No'
    )
      return response(
        year,
        yourMaximunAmmount,
        yourExplanations(year).makeCatchUpBoth,
        yourCatchup,
        yourCatchups.separetedAccounts,
        yourSpouseCathUp,
        spouseCatchUp
      );

    if (yourAge >= 55 && coverageType === 'single' && currentyEnrolled === 'No')
      return response(
        year,
        yourMaximunAmmount,
        yourExplanations(year).extra1000individual,
        yourCatchup,
        yourCatchups.older55
      );

    if (
      yourAge >= 55 &&
      coverageType === 'family' &&
      maritalStatus === 'Single' &&
      currentyEnrolled === 'No'
    )
      return response(
        year,
        yourMaximunAmmount,
        yourExplanations(year).extra1000family,
        yourCatchup,
        yourCatchups.older55
      );

    if (
      yourAge >= 55 &&
      coverageType === 'family' &&
      currentyEnrolled === 'Yes' &&
      isBefore1o1TaxYear(medicareEnrollmentDate, year)
    )
      return response(year, 0, yourExplanations(year).notOnMedicare);
  }
};
