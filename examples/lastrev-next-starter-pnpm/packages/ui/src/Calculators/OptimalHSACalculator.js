// @ts-ignore
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
// import AccordionList from './components/accordion-list/accordion-list';
import CalculatorBlock from './components/calculator-block/calculator-block';
import CalculatorBoxCheck from './components/calculator-box-check/calculator-box-check';
import CalculatorExpenses from './components/calculator-expenses/calculator-expenses';
import CalculatorHeader from './components/calculator-header/calculator-header';
import CalculatorOptimalResult from './components/calculator-optimal-result/calculator-optimal-result';
import CalculatorSection from './components/calculator-section/calculator-section';
import CalculatorStepper from './components/calculator-stepper/calculator-stepper';
import CalculatorsNavigation from './components/calculators-navigation/calculators-navigation';
import ViewOne from './templates/optimalHsaCalculator/view-one';
import ViewFour, { getWhichView } from './templates/optimalHsaCalculator/view-four';
import { sliderCalculator } from './templates/optimalHsaCalculator/out-of-pocket';
import { formatContentfulData } from './utils/formatContentfulData';
// import { Footer, Header, Seo, SideBySide, Text } from '../components/components';

import FormBuilder from './components/formBuilder/formBuilder';
import contentful from './utils/contentful';
import css from './utils/style-helper';
import CalculatorSlider from './components/calculator-silder/calculator-slider';
import { scrollToElement } from './utils/scroll-assist';
import CustomTooltipLabel from './components/custom-tooltip-label/custom-tooltip-label';
import { sliderCalculatorRateOfReturn } from './templates/optimalHsaCalculator/anticipated-annual-rate-return';
import { getTax, getResults } from './utils/optimal-hsa-calculator/get-results';
import { isFormValid } from './utils/isFormValid';
import { parseToNumber } from './utils/helpers';
import buildInitialContentfulProps from './utils/buildInitialContentfulProps';
import Text from './components/text';
import SideBySide from './components/side_by_side';

const howToUse = [
  {
    id: 'coverHealthcare',
    text: 'I want to cover this year’s healthcare costs'
  },
  {
    id: 'saveForFuture',
    text: 'I want to build a safety net or save for a future procedure'
  },
  {
    id: 'maintainAndInvest',
    text: 'I want to maintain a cash safety net and invest anything thereafter for a potential greater return'
  },
  {
    id: 'investLongTerm',
    text: 'I want to invest for the long-term'
  }
];

const FormBuilderContiner = styled.div`
  ${({ hasCustomWidth }) => hasCustomWidth && `max-width: 1040px`};
`;

const BackgroundDiv = styled.div`
  background-image: url('/static/images/calculator-dots.png'), url('/static/images/yellow-path-top-right.png');

  background-position: bottom right, top right;
  background-repeat: no-repeat, no-repeat;
  background-color: #fdf9ed;
  height: 370px;
  margin-bottom: 58px;
`;

const StaticContent = styled.div`
  visibility: hidden;
  height: 768px;
  ${(p) =>
    css([
      [
        p.show,
        `
      visibility: visible;
      height: auto;
    `
      ]
    ])}
`;

const data = {
  viewOne: {
    header: {
      title: 'How to find your optimal contribution',
      subTitle:
        'Answer a few questions about yourself and how you’ll be contributing to your HSA. We’ll use this information to build a contribution recommendation.'
    },
    view: ViewOne
  },
  viewTwo: {
    header: {
      title: 'Annual out-of-pocket health care costs',
      subTitle:
        'Choose the option that most accurately represents the level of medical costs that you expect to pay out-of-pocket each year.  \n\nBe sure to include all qualified expenses, including medical, prescriptions, dental, vision, chiropractic, and mental health. If you have a spouse or tax-dependent kids, their expenses qualify, even if they are not covered by your health plan.'
    }
  },
  viewThree: {
    header: {
      title: 'How do you want to use your HSA?',
      subTitle:
        'There are many ways to use your HSA to meet your short and long-term goals. Select the options below that best represent how you want to use your account.'
    }
  },
  viewFour: {
    header: {
      title: 'How you want to use your HSA',
      subTitle: 'Please answer a few more questions to help us build your recommended contribution amount.'
    },
    view: ViewFour
  },
  viewFive: {
    header: {
      title: 'Your Results',
      subTitle: "Based on spending and savings goals, here's your personalized summary and contribution recommendation."
    }
  }
};

const getDataFromView = (page) => {
  const views = [data.viewOne, data.viewTwo, data.viewThree, data.viewFour, data.viewFive];
  return views[page];
};

const validateForm = (page, form) => {
  switch (page) {
    case 0: {
      const {
        anualPocketExpenses = '',
        portionAnnualExpenses,
        hsaSavingsGoals,
        cashSafetyBeforeInvest,
        saveFutureSafety,
        meetGoal,
        retireAge,
        outOfPocketExpenses,
        ...rest
      } = form;
      return !isFormValid(data.viewOne.view(form), rest);
    }
    case 1: {
      const { outOfPocketExpenses } = form;
      if (!outOfPocketExpenses) return true;
      if (outOfPocketExpenses?.itemSelected === 'Custom' && (!outOfPocketExpenses?.value || outOfPocketExpenses.error))
        return true;
      return false;
    }
    case 2: {
      const { hsaGoalsSelected } = form;
      if (!hsaGoalsSelected) return true;
      if (Object.keys(hsaGoalsSelected).length === 0) return true;
      const { coverHealthcare, investLongTerm, maintainAndInvest, saveForFuture } = hsaGoalsSelected;
      if (!coverHealthcare && !investLongTerm && !maintainAndInvest && !saveForFuture) return true;
      return false;
    }
    case 3: {
      const view = getWhichView(form.hsaGoalsSelected);
      const isViewEorD = view === 'e' || view === 'd';
      const { anticipatedAnnualRateOfReturn, ...rest } = form;
      const isValid = isFormValid(data.viewFour.view(form), rest);
      if (
        (anticipatedAnnualRateOfReturn?.itemSelected === 'Custom' &&
          (!anticipatedAnnualRateOfReturn.value || anticipatedAnnualRateOfReturn.error) &&
          isViewEorD) ||
        !isValid
      )
        return true;
      return false;
    }
    case 4:
      return data.viewFive;
    default:
      return data.viewOne;
  }
};

const OptimalHsaCalculatorForm = ({
  formFields,
  faq,
  header,
  navigation,
  disclaimer,
  callToAction,
  seoFields,
  resultsBlock,
  tooltips
}) => {
  const [form, setForm] = useState({});
  const pages = form?.hsaGoalsSelected && getWhichView(form?.hsaGoalsSelected) === 'a' ? 3 : 4;
  const [currentPage, setCurrentPage] = useState(0);
  const [results, setResults] = useState({});
  const headerRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  // slight delay when loaded state is mounted to prevent FOUC
  // bug: https://lively.atlassian.net/browse/MAR-550
  function delayVisibilityClass() {
    setTimeout(function () {
      setLoaded(true);
    }, 500);
  }

  useEffect(() => {
    delayVisibilityClass();
  });

  useEffect(() => {
    function getResponse() {
      if (currentPage === 4) {
        const actualView = getWhichView(form?.hsaGoalsSelected);
        const results = getResults(form, actualView);
        const blendedTax = getTax({
          ...form,
          ownContributionAmmount: results.ownContributionAmmount
        });
        setResults({ ...results, blendedTax });
      }
    }
    getResponse();
  }, [currentPage]);
  const getView = (page) => {
    switch (page) {
      case 0:
        return <FormBuilder hasAnimation={false} handler={setForm} formData={form} form={ViewOne(form, tooltips)} />;
      case 1:
        return (
          <>
            <CustomTooltipLabel
              label={'What are your expected out-of-pocket expenses?'}
              tooltip={{
                text: 'Account for your qualified expenses, including medical, prescriptions, dental, vision, chiropractor, and mental health. If you have a spouse or tax-dependent kids their expenses qualify, even if not covered by your health plan.'
              }}
            />
            <CalculatorExpenses
              targetIdForm={'outOfPocketExpenses'}
              setForm={setForm}
              isPercentage={false}
              selected={form?.outOfPocketExpenses}
              maxDollars={form?.coverageFor?.value === 'You' ? 7000 : 14000}
              maxPercentage={20}
              items={sliderCalculator}
            />
          </>
        );
      case 2:
        return <CalculatorBoxCheck data={form?.hsaGoalsSelected} setForm={setForm} items={howToUse} />;
      case 3: {
        const actualView = getWhichView(form.hsaGoalsSelected);
        return (
          <>
            <FormBuilderContiner hasCustomWidth={actualView === 'e' || actualView === 'd'}>
              <FormBuilder hasAnimation={false} handler={setForm} formData={form} form={ViewFour(form, tooltips)} />
            </FormBuilderContiner>
            {actualView === 'e' || actualView === 'd' ? (
              <>
                <CustomTooltipLabel
                  label={'What is your anticipated annual rate of return?'}
                  tooltip={{
                    text: "Your expected gains or loss on your investments on a yearly basis. We've provided options based on your projected risk tolerance but you can also enter a custom value."
                  }}
                />
                <CalculatorExpenses
                  targetIdForm={'anticipatedAnnualRateOfReturn'}
                  setForm={setForm}
                  isPercentage
                  maxDollars={parseToNumber(form?.outOfPocketExpenses?.value)}
                  maxPercentage={100}
                  items={sliderCalculatorRateOfReturn}
                  selected={form?.anticipatedAnnualRateOfReturn}
                />
              </>
            ) : null}
          </>
        );
      }

      case 4:
        return (
          <>
            <CalculatorOptimalResult
              results={results}
              isTroughEmployer={
                form?.contributingThroughEmployer?.value === 'Yes' && form?.willEmployerContributions?.value === 'Yes'
              }
              type={getWhichView(form.hsaGoalsSelected)}
            />
            <CalculatorBlock
              title={resultsBlock?.title}
              text={resultsBlock?.text}
              buttonKind={'primary'}
              background={'#F8E9C4'}
              textColor={'#000000'}
              cta={resultsBlock?.cta}
              url={resultsBlock?.url}
              hasNoMargin
            />
          </>
        );
      default:
        return <FormBuilder hasAnimation={false} handler={setForm} formData={form} form={ViewOne} />;
    }
  };

  return (
    <main>
      {/* <Seo {...seoFields} /> */}
      {/* <Header /> */}
      <StaticContent role="main" show={loaded}>
        {/* <BackgroundDiv>
          <CalculatorSection>
            <CalculatorHeader title={header.title} subTitle={header.subTitle} />
          </CalculatorSection>
        </BackgroundDiv> */}
        <CalculatorSection>
          <CalculatorStepper active={currentPage} steps={[1, 2, 3, 4]} />
        </CalculatorSection>
        <CalculatorSection>
          <div ref={headerRef}>
            <CalculatorSlider
              hasShadow={false}
              removeButtonMargin={true}
              currentPage={currentPage}
              pages={pages}
              handleNavigation={(isNext) => {
                let nextPage = isNext ? currentPage + 1 : currentPage - 1;
                if (nextPage === 3) {
                  const actualView = getWhichView(form?.hsaGoalsSelected);
                  if (actualView === 'a') isNext ? (nextPage += 1) : (nextPage -= 1);
                }
                scrollToElement(headerRef, -250);
                setTimeout(() => {
                  setCurrentPage(nextPage);
                }, 50);
              }}
              data={getDataFromView(currentPage).header}
              disabled={validateForm(currentPage, form)}>
              {getView(currentPage)}
            </CalculatorSlider>
          </div>
        </CalculatorSection>
        {/* <CalculatorSection>
          <AccordionList title={formFields.title} list={formFields.fields} />
        </CalculatorSection>
        <CalculatorSection>
          <AccordionList title={faq.title} list={faq.fields} />
        </CalculatorSection> */}
        {/* <CalculatorsNavigation
          animate={false}
          title={navigation.title}
          subTitle={navigation.subTitle}
          items={navigation.items}
        /> */}
        {/* <SideBySide transitionIn={false} {...callToAction} secondaryButtonKind="whiteBg" /> */}
        <CalculatorSection>
          <Text color="#555555" weight="400" lineHeight="15px" size={'12'}>
            {disclaimer}
          </Text>
        </CalculatorSection>
      </StaticContent>
      {/* <Footer /> */}
    </main>
  );
};

const OptimalHsaCalculator = () => {
  const { data } = useSWR(['calculators', 'optimalHSAContributionCalculator'], () =>
    contentful.query({
      'content_type': 'calculators',
      'fields.slug': 'optimalHSAContributionCalculator'
    })
  );
  console.log('Data', data);
  if (!data) return null;

  const resultsBlock = data?.items?.[0]?.fields?.resultsCtaBlock?.fields;
  const { formFields, faq, header, navigation, disclaimer, callToAction, seoFields, tooltips } =
    formatContentfulData(data);

  const builtCta = buildInitialContentfulProps(callToAction);
  console.log({ resultsBlock });
  return (
    <OptimalHsaCalculatorForm
      {...{
        formFields,
        faq,
        header,
        navigation,
        disclaimer,
        callToAction: builtCta,
        seoFields,
        resultsBlock,
        tooltips
      }}
    />
  );
};

export default OptimalHsaCalculator;
