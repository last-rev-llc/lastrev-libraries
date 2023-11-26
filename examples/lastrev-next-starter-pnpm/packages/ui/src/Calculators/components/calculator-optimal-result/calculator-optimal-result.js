import React from 'react';
import CountUp from 'react-countup';
import { numberWithCommas } from '../../utils/helpers';
import {
  Container,
  DescriptionContainer,
  ResponseBoxContainer,
  ResultContainer,
  ResultDescriptionContainer,
  ResultsContainer,
  ResultTextDescription,
  ResultTextTotal,
  StyledAcordionList,
  AssetGrowth
} from './styled';

const ResponseBox = ({ text, value }) => (
  <ResponseBoxContainer>
    <p>{text}</p>
    <p>{value !== undefined ? <CountUp start={0} end={value} duration={1.5} separator={','} prefix={'$'} /> : null}</p>
  </ResponseBoxContainer>
);

const ResultItem = ({ value, description }) => (
  <ResultsContainer>
    <ResultTextDescription>{description}</ResultTextDescription>
    {value !== undefined && (
      <ResultTextTotal>
        <CountUp start={0} end={value} duration={1.5} separator={','} prefix={'$'} />
      </ResultTextTotal>
    )}
  </ResultsContainer>
);

const AssetGrowthDescription = ({ contributions, growth }) => (
  <AssetGrowth>
    <p>
      Contributions: <span>{contributions}</span>
    </p>
    <p>
      Asset growth: <span>{growth}</span>
    </p>
  </AssetGrowth>
);

const CalculatorOptimalResult = ({ results = false, type, isTroughEmployer }) => {
  if (!results) return null;
  const {
    annualExpenses,
    employerContributionAmmount,
    maximunContribution,
    ownContributionAmmount,
    recomendedPaycheck,
    recommendedAnnualContribution,
    futureAmmount,
    totalYears,
    assetGrowths,
    contributions,
    projectedInvestBalance,
    cashSavingsRetiremnt,
    annualExpensesSavings,
    blendedTax
  } = results;
  if (!results) return null;
  return (
    <Container>
      <ResultContainer>
        {recommendedAnnualContribution !== undefined && (
          <ResultItem
            value={Math.round(recommendedAnnualContribution)}
            description={'Recommended annual contribution amount:'}
          />
        )}
        {type === 'a' && annualExpenses !== undefined ? (
          <ResultItem value={Math.round(annualExpenses)} description={'Annual expenses:'} />
        ) : null}
        {type === 'b' ? (
          <ResultItem value={annualExpensesSavings} description={'Annual medical expenses paid with HSA funds:'} />
        ) : null}
        {(type === 'b' || type === 'c') && futureAmmount !== undefined ? (
          <ResultItem value={Math.round(futureAmmount)} description={`${totalYears} year savings goal:`} />
        ) : null}
        {type === 'd' && cashSavingsRetiremnt !== undefined ? (
          <ResultItem value={Math.round(cashSavingsRetiremnt)} description={'Projected cash savings at retirement:'} />
        ) : null}
        {(type === 'd' || type === 'e') && projectedInvestBalance !== undefined ? (
          <ResultItem
            value={Math.round(projectedInvestBalance)}
            description={'Projected investment balance at retirement:'}
          />
        ) : null}
      </ResultContainer>
      <ResultDescriptionContainer>
        <DescriptionContainer width={40}>
          {maximunContribution !== undefined && (
            <ResponseBox text={`Your maximum contribution amount for 2023:`} value={Math.round(maximunContribution)} />
          )}
          {blendedTax !== undefined && <ResponseBox text={'Annual tax savings*:'} value={Math.round(blendedTax)} />}
        </DescriptionContainer>
        <DescriptionContainer width={60}>
          <StyledAcordionList
            list={[
              [
                {
                  title: 'Your contribution amount',
                  text: `$${numberWithCommas(Math.round(ownContributionAmmount))}`
                },
                ...(employerContributionAmmount > 0
                  ? [
                      {
                        title: 'Employer contribution amount',
                        text: `$${numberWithCommas(Math.round(employerContributionAmmount))}`
                      }
                    ]
                  : []),
                {
                  title: isTroughEmployer ? 'Recommended contribution per paycheck' : ' Recurring contribution',
                  text: `$${numberWithCommas(Math.round(recomendedPaycheck))}`
                },
                ...(type === 'd' || type === 'e'
                  ? [
                      {
                        title: 'Investment growth breakdown*',
                        // eslint-disable-next-line react/display-name
                        CustomElement: () => (
                          <AssetGrowthDescription
                            contributions={`$${numberWithCommas(Math.round(contributions))}`}
                            growth={`$${numberWithCommas(Math.round(assetGrowths))}`}
                          />
                        )
                      }
                    ]
                  : [])
              ]
            ]}
          />
        </DescriptionContainer>
      </ResultDescriptionContainer>
    </Container>
  );
};

export default CalculatorOptimalResult;
