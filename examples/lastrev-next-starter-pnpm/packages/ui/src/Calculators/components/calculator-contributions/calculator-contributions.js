import React from 'react';
import CountUp from 'react-countup';
import { DefaultLine, DefaultLineContainer } from '../calculator-contributions-tax/styled';
import {
  ContributionContent,
  ContributionResult,
  ContributionsStyle,
  ContributionStyle,
  ContributionTitle
} from './styled';

const Contribution = ({ isPrimary, title, text, total, year }) => (
  <ContributionStyle isPrimary={isPrimary}>
    <ContributionTitle margin={'0 0 20px 0'}>
      {title} {year ? <span>{year}</span> : null}{' '}
    </ContributionTitle>
    <ContributionResult margin={'0 0 20px 0'}>
      {total !== null ? (
        <CountUp start={0} end={+total} duration={1} separator={','} prefix={'$'} />
      ) : (
        <DefaultLineContainer>
          $<DefaultLine />
        </DefaultLineContainer>
      )}
    </ContributionResult>
    {text && <ContributionContent>{text}</ContributionContent>}
  </ContributionStyle>
);

const CalculatorContributions = ({ contributions, year }) => (
  <ContributionsStyle>
    {contributions.map(({ title, total, text, isPrimary }, i) => (
      <Contribution
        key={`contribution-${i}`}
        title={title}
        total={total}
        text={text}
        year={i === 0 ? year : 0}
        isPrimary={isPrimary}
      />
    ))}
  </ContributionsStyle>
);

export default CalculatorContributions;
