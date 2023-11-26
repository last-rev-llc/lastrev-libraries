import React from 'react';
import ReactMarkdown from 'react-markdown';
import CustomButton from '../custom-button/custom-buttom';
import Text from '../text';
import {
  TooltipShow,
  TaxHelpLearnmore,
  TaxHelpContainer,
  TaxYearSubtitle,
  TaxYearTitle,
  TaxYearContainer,
  TaxContainer
} from './styled';

const CalculatorContributionsTax = ({ handleTax, options, title, text, toolTip, toolTipText, helText, refe }) => (
  <TaxContainer ref={refe}>
    <TaxYearContainer>
      <TaxYearTitle margin={'0 0 22px 0'}>{title}</TaxYearTitle>
      <TaxYearSubtitle margin={'0 0 16px 0'}>{text}</TaxYearSubtitle>
      <div>
        {options.map((option) => (
          <CustomButton
            key={`option-${option}`}
            handleClick={() => handleTax(option)}
            kind={'greenOutline'}
            value={option}
          />
        ))}
      </div>
    </TaxYearContainer>
    <TaxHelpContainer>
      <Text weight="600" size="18" lineHeight="23px" margin="0 0 16px 0">
        {helText}
      </Text>
      <TaxHelpLearnmore data-tip>{toolTip}</TaxHelpLearnmore>
    </TaxHelpContainer>
    <TooltipShow place="bottom" effect="solid" arrowColor="#D6D2F1" backgroundColor="#D6D2F1" clickable={true}>
      <ReactMarkdown>{toolTipText}</ReactMarkdown>
    </TooltipShow>
  </TaxContainer>
);

export default CalculatorContributionsTax;
