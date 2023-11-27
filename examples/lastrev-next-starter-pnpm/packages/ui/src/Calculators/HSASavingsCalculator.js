import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
// import { Footer, Header, Seo, Text } from './components';
import { gsap } from 'gsap';
import Chart from './components/charts/charts';
import FormBuilder from './components/formBuilder/formBuilder';
import { formSavingTemplate } from './templates/savingTemplate/saving-form';
import { chartSavingTemplate } from './templates/savingTemplate/saving-chart';
import SavingsResults from './components/savings-results/savings-results';
import { getBlendedTax } from './utils/taxee';
import AccordionList from './components/accordion-list/accordion-list';
import CalculatorHeader from './components/calculator-header/calculator-header';
import CalculatorSection from './components/calculator-section/calculator-section';
import CalculatorsNavigation from './components/calculators-navigation/calculators-navigation';
import contentful from './utils/contentful';
import SydeBySyde from './components/side_by_side';
import { isScrolledIntoView } from './utils/scroll-assist';
import { useWindowSize } from './utils/hooks/useWindowsSize';
import { calculate } from './utils/calculateHSASavingCalculator';
import { BackgroundDiv, Col, StickyCol, Row } from './components/common/common';
import { formatContentfulData } from './utils/formatContentfulData';
import css from './utils/style-helper';
import buildInitialContentfulProps from './utils/buildInitialContentfulProps';
import Text from './components/text';
import useSWR from 'swr';
const defaultChartValues = {
  years: [2020, 2025, 2030, 2035, 2040, 2045, 2050, 2055, 2060, 2065],
  values: [500, 500, 500, 500, 500, 500, 500, 500, 500, 500]
};

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

const CalculatorForm = ({ formFields, faq, header, navigation, disclaimer, callToAction, tooltips }) => {
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
  const { width: viewport } = useWindowSize(false);
  const isMobile = viewport <= 1024;
  const [form, setForm] = useState({
    annualRateOfReturn: {
      value: 3
    }
  });

  const [results, setResults] = useState();
  const [withErrors, setWithErrors] = useState(false);
  const animate = false;
  const wrapperRef = useRef(null);
  const chartRef = useRef(null);
  const fieldsRef = useRef(null);
  function transitionElements() {
    const DURA = 0.25;
    const timeline = gsap.timeline({ delay: DURA });
    if (wrapperRef.current) {
      timeline.to(wrapperRef.current, { opacity: 0, duration: 0 });
    }

    if (isScrolledIntoView(wrapperRef.current)) {
      window.removeEventListener('scroll', transitionElements);
      if (chartRef.current) {
        timeline.to(chartRef.current, { opacity: 0, duration: 0, translateX: 40 });
      }
      if (fieldsRef.current) {
        timeline.to(fieldsRef.current, { opacity: 0, duration: 0, translateY: -1 });
      }
      if (wrapperRef.current) {
        timeline.to(wrapperRef.current, { opacity: 1, duration: DURA });
      }
      if (chartRef.current) {
        timeline.to(chartRef.current, { opacity: 1, duration: DURA, translateX: 0 });
      }
      if (fieldsRef.current) {
        timeline.to(fieldsRef.current, { opacity: 1, duration: DURA, translateY: 0, zIndex: 1000 });
      }
    }
  }

  useEffect(() => {
    if (animate && isScrolledIntoView(wrapperRef.current)) {
      transitionElements();
    }
    if (animate && !isScrolledIntoView(wrapperRef.current)) {
      window.addEventListener('scroll', transitionElements, { passive: true });
    }
  }, []);

  useEffect(() => {
    if (
      form?.annualRateOfReturn?.value &&
      form?.currentAge?.value &&
      form?.retirementAge?.value &&
      form?.annualHsaBalance?.value
    ) {
      calculate(form, formSavingTemplate(), setResults, results?.blendedTax, isMobile);
    }
  }, [
    form?.annualRateOfReturn?.value,
    form?.currentAge?.value,
    form?.retirementAge?.value,
    form?.annualHsaBalance?.value,
    form?.annualHsaExpenses?.value,
    form?.currentHsaBalance?.value,
    form?.planType?.value,
    form?.maritalStatus?.value,
    form?.state?.value
  ]);

  useEffect(() => {
    if (form?.annualRateOfReturn?.value && form?.annualRateOfReturn?.isTouched) {
      // showErrors(form, formSavingTemplate(), setForm);
      setWithErrors(true);
    }
  }, [form?.annualRateOfReturn?.value]);

  useEffect(() => {
    async function reloadTaxes() {
      const { state, annualIncome, maritalStatus } = form;
      const incomeTax = await getBlendedTax(state.value, annualIncome.value, maritalStatus.value);
      const years = form?.retirementAge.value - form?.currentAge.value;
      const potentialTaxSaving = parseInt((incomeTax / 100) * form?.annualHsaBalance.value * years, 10);
      setResults((prevState) => ({
        ...prevState,
        blendedTax: incomeTax,
        potentialTaxSaving
      }));
    }
    if (results?.blendedTax !== undefined) {
      reloadTaxes();
    }
  }, [form?.state?.value, form?.annualIncome?.value, form?.maritalStatus?.value]);
  return (
    <main>
      {/* <Seo
        metaTitle={'HSA Savings Future Value Calculator'}
        metaDescription={
          'Use our calculator to estimate the future value of your health savings account. An HSA is an incredibly powerful way to save for future healthcare expenses.'
        }
      /> */}
      {/* <Header /> */}
      <StaticContent role="main" show={loaded} data-test-id="hsa-savings-calculator">
        <BackgroundDiv>
          <CalculatorSection>
            <CalculatorHeader animate={false} title={header.title} subTitle={header.subTitle} />
          </CalculatorSection>
          <CalculatorSection>
            <Row isSticky={86 * formSavingTemplate().length} ref={wrapperRef}>
              <Col width={'35%'} ref={fieldsRef}>
                <FormBuilder
                  handler={setForm}
                  formData={form}
                  form={formSavingTemplate(
                    form,
                    withErrors
                      ? {
                          annualHsaExpenses: 0,
                          currentHsaBalance: 0
                        }
                      : undefined,
                    tooltips
                  )}
                />
              </Col>
              <StickyCol style={{ marginTop: '50px' }} width={'65%'} ref={chartRef}>
                <SavingsResults
                  results={[
                    {
                      title: 'Your Projected HSA Balance:',
                      result: results?.potentialHsaBalance ?? 0,
                      isPrimary: true
                    },
                    {
                      title: 'Your Projected Tax Savings:',
                      result: results?.potentialTaxSaving ?? 0
                    }
                  ]}
                />
                <Chart
                  options={chartSavingTemplate({
                    isMobile,
                    cumulativeAssetGrowth: results?.cumulativeAssetGrowth ?? defaultChartValues.values,
                    aggregatedNetContributions: results?.aggregatedNetContributions ?? defaultChartValues.values,
                    years: results?.allYears ?? defaultChartValues.years,
                    max: results?.cumulativeAssetGrowth ? null : 50000
                  })}
                />
              </StickyCol>
            </Row>
          </CalculatorSection>
        </BackgroundDiv>
        <CalculatorSection>
          <AccordionList animate={false} title={formFields.title} list={formFields.fields} />
        </CalculatorSection>
        <CalculatorSection>
          <AccordionList animate={false} title={faq.title} list={faq.fields} />
        </CalculatorSection>
        <CalculatorsNavigation
          animate={false}
          title={navigation.title}
          subTitle={navigation.subTitle}
          items={navigation.items}
        />
        <SydeBySyde transitionIn={false} {...callToAction} secondaryButtonKind="whiteBg" />
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

const Calculator = () => {
  const { data: calculator } = useSWR(['calculators', 'hsaSavingsCalculator'], () =>
    contentful.query({
      'content_type': 'calculators',
      'fields.slug': 'hsaSavingsCalculator'
    })
  );
  if (!calculator) return null;
  const { formFields, faq, header, navigation, disclaimer, callToAction, tooltips } = formatContentfulData(calculator);

  const builtCta = buildInitialContentfulProps(callToAction);

  return <CalculatorForm {...{ formFields, faq, header, navigation, disclaimer, callToAction: builtCta, tooltips }} />;
};

export default Calculator;
