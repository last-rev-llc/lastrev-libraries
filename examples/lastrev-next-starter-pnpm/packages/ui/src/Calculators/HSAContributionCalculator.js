import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import AccordionList from './components/accordion-list/accordion-list';
import CalculatorContributionsTax from './components/calculator-contributions-tax/calculator-contributions-tax';
import CalculatorContributions from './components/calculator-contributions/calculator-contributions';
import CalculatorHeader from './components/calculator-header/calculator-header';
import CalculatorSection from './components/calculator-section/calculator-section';
import CalculatorsNavigation from './components/calculators-navigation/calculators-navigation';
import { Col, StickyCol, Row } from './components/common/common';
import { contributionTemplate } from './templates/contributionLimitTemplate/contribution-form';
import { formatContentfulData } from './utils/formatContentfulData';
// import { Footer, Header, SideBySide, Text } from './components/components';
import useSWR from 'swr';
import FormBuilder from './components/formBuilder/formBuilder';
// import Seo from './components/seo';
import contentful from './utils/contentful';
import responsive from './utils/responsive';
import CalculatorBlock from './components/calculator-block/calculator-block';
import { getExplanationText } from './utils/maxContribution/contributionExplanationText';
import css from './utils/style-helper';
import buildInitialContentfulProps from './utils/buildInitialContentfulProps';
import Text from './components/text';
import SideBySide from './components/side_by_side';

const defaultCalc = [
  {
    title: `Your maximum contribution amount for`,
    text: '',
    total: null,
    isPrimary: true
  }
];

const getColHeight = (elements) => {
  if (elements === 3) return 700;
  else if (elements === 2) return 475;
  return 215;
};

const BackgroundDiv = styled.div`
  background-image: url('/static/images/calculator-dots.png'), url('/static/images/purple-path-left.png'),
    url('/static/images/purple-path-top-right.png');

  background-position: right, left, top right;
  background-repeat: no-repeat, no-repeat, no-repeat;
  background-color: #edebfd;
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

const ContributionStickyCol = styled(StickyCol)`
  height: ${({ height }) => height};
  padding-bottom: 0;
  top: 130px;
  ${responsive.tabletLandscape`
    height: auto;
    padding-bottom: 0;
  `};
  ${responsive.tablet`
    height: auto;
    padding-bottom: 0;
  `};
  ${responsive.mobile`
    height: auto;
    padding-bottom: 0;
  `};
`;

const HsaContributionsCalculatorForm = ({
  formFields,
  faq,
  header,
  navigation,
  disclaimer,
  callToAction,
  needHelp,
  seoFields,
  purpleBlock,
  tooltips
}) => {
  const [form, setForm] = useState({
    birthDate: '',
    coverageType: '',
    planStartDate: ''
  });
  const [taxYear, setTaxYear] = useState(0);
  const taxContainerRef = useRef(null);
  const formContainerRef = useRef(null);
  const DURA = 0.25;
  const timeline = gsap.timeline({ delay: DURA });
  const response = getExplanationText(taxYear, form, contributionTemplate(form, taxYear));
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
    if (formContainerRef.current) {
      timeline.to(formContainerRef.current, {
        display: 'none',
        [window.innerWidth > 1024 ? 'x' : 'y']: 1000,
        opacity: 0,
        duration: 0
      });
    }
  }, []);
  useEffect(() => {
    if (taxYear) {
      if (taxContainerRef.current) {
        timeline.to(taxContainerRef.current, {
          [window.innerWidth > 1024 ? 'x' : 'y']: -1000,
          display: 'none',
          opacity: 0,
          duration: 0.5
        });
      }
      if (formContainerRef.current) {
        timeline.to(formContainerRef.current, {
          display: 'flex',
          [window.innerWidth > 1024 ? 'x' : 'y']: 0,
          opacity: 1,
          duration: 0.5
        });
      }
    }
  }, [taxYear]);
  return (
    <main>
      {/* <Seo {...seoFields} /> */}
      {/* <Header /> */}
      <StaticContent role="main" show={loaded} data-test-id="hsa-contribution-calculator">
        <BackgroundDiv>
          <CalculatorSection>
            <CalculatorHeader animate={false} title={header.title} subTitle={header.subTitle} />
          </CalculatorSection>
        </BackgroundDiv>
        <CalculatorSection>
          <CalculatorContributionsTax
            refe={taxContainerRef}
            options={[2022, 2023]}
            handleTax={setTaxYear}
            title={'Tax Year'}
            text={
              'Select the tax year you would like to calculate'
            } /* Removed text, will be added once 2022 is available */
            helText={needHelp?.fields?.title}
            toolTip={needHelp?.fields?.titleTwo}
            toolTipText={needHelp?.fields?.text}
          />
          <Row ref={formContainerRef}>
            <Col width={'35%'}>
              <FormBuilder
                hasAnimation={true}
                handler={setForm}
                formData={form}
                form={contributionTemplate(form, taxYear, tooltips)}
              />
            </Col>
            <ContributionStickyCol
              width={'65%'}
              hasBorder={false}
              height={
                105 * Object.keys(form).length > getColHeight(response?.length || 1)
                  ? `${getColHeight(response?.length || 1)}px`
                  : `${105 * Object.keys(form).length}px`
              }>
              {taxYear && <CalculatorContributions year={taxYear} contributions={response ?? defaultCalc} />}
            </ContributionStickyCol>
          </Row>
        </CalculatorSection>
        <CalculatorSection>
          {response ? (
            <CalculatorBlock
              title={purpleBlock?.fields?.title}
              text={purpleBlock?.fields?.text}
              cta={purpleBlock?.fields?.cta}
              url={purpleBlock?.fields?.url}
            />
          ) : null}
        </CalculatorSection>
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
        <SideBySide transitionIn={false} {...callToAction} secondaryButtonKind="whiteBg" />
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

const HsaContributionsCalculator = () => {
  const { data } = useSWR(['calculators', 'hsaContributionCalculator'], () =>
    contentful.query({
      'content_type': 'calculators',
      'fields.slug': 'hsaContributionCalculator'
    })
  );
  if (!data) return null;
  const { formFields, faq, header, navigation, disclaimer, callToAction, seoFields, tooltips } =
    formatContentfulData(data);
  const { needHelp, purpleBlock } = data?.items[0]?.fields;

  const builtCta = buildInitialContentfulProps(callToAction);

  return (
    <HsaContributionsCalculatorForm
      {...{
        formFields,
        faq,
        header,
        navigation,
        disclaimer,
        callToAction: builtCta,
        seoFields,
        needHelp,
        purpleBlock,
        calculator: data,
        tooltips
      }}
    />
  );
};

export default HsaContributionsCalculator;
