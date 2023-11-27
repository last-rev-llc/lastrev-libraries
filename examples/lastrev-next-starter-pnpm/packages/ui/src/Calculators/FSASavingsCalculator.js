import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import AccordionList from './components/accordion-list/accordion-list';
import CalculatorHeader from './components/calculator-header/calculator-header';
import CalculatorSection from './components/calculator-section/calculator-section';
import CalculatorSlider from './components/calculator-silder/calculator-slider';
import CalculatorsNavigation from './components/calculators-navigation/calculators-navigation';
import FsaResults from './components/fsa-results/fsa-results';
import ViewFour from './templates/fsaCalculator/view-four';
import ViewOne from './templates/fsaCalculator/view-one';
import ViewThree from './templates/fsaCalculator/view-three';
import ViewTwo from './templates/fsaCalculator/view-two';
import { formatContentfulData } from './utils/formatContentfulData';
import { getCalculations } from './utils/fsa-calculator/calculation';
import { isFormValid } from './utils/isFormValid';

import FormBuilder from './components/formBuilder/formBuilder';
// import Seo from './components/seo';
import contentful from './utils/contentful';
import { getBlendedTax } from './utils/taxee';
import css from './utils/style-helper';
import { scrollToElement } from './utils/scroll-assist';
import buildInitialContentfulProps from './utils/buildInitialContentfulProps';
import useSWR from 'swr';
import Text from './components/text';
import SideBySide from './components/side_by_side';

const BackgroundDiv = styled.div`
  background-image: url('/static/images/bkg-purple-dots.svg'), url('/static/images/yellow-path-left.png');

  background-position: right, left;
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

const data = (tooltips) => {
  return {
    viewOne: {
      header: {
        title: 'Your information',
        subTitle: 'Tell us about yourself and how you’d plan to use your FSA.'
      },
      view: () => ViewOne(tooltips)
    },
    viewTwo: {
      header: {
        title: 'Medical expenses',
        subTitle:
          'Enter what you expect to pay out-of-pocket for the following medical services over the year, including all copayments, coinsurance, and deductibles. You can find a full list of eligible items [here](https://livelyme.com/whats-eligible).'
      },
      view: () => ViewTwo(tooltips)
    },
    viewThree: {
      header: {
        title: 'Dental and vision expenses',
        subTitle:
          'You indicated you will be contributing to an HSA this year so you’ll be eligible for a Limited Purpose FSA (LPFSA) which allows you to save and pay tax-free for qualified out-of-pocket dental and vision expenses. Enter what you expect to pay out-of-pocket for the following dental and vision care services over the year, including all copayments, coinsurance, and deductibles. You can find a full list of eligible items [here](https://livelyme.com/whats-eligible).'
      },
      view: () => ViewThree(tooltips)
    },
    viewFour: {
      header: {
        title: 'Dependent care expenses',
        subTitle:
          'Enter what you expect to pay out-of-pocket for the following dependent care expenses. Expenses must be for eligible tax dependents. Parties receiving payment must be reporting it as income on their taxes.'
      },
      view: () => ViewFour(tooltips)
    }
  };
};

const FSASavingsCalculatorForm = ({
  formFields,
  faq,
  header,
  navigation,
  callToAction,
  disclaimer,
  seoFields,
  tooltips
}) => {
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
  const [form, setForm] = useState({});
  const [page, setPage] = useState(0);
  const [view, setView] = useState(data(tooltips).viewOne.view(form));
  const [currentData, setCurrentData] = useState(data(tooltips).viewOne.header);
  const [pages, setPages] = useState(4);
  const [tax, setTax] = useState(0);
  const [finalRecommendations, setFinalRecommendations] = useState({
    fsa: false,
    lpfsa: false,
    dcfsa: false
  });
  const headerRef = useRef(null);

  const handleNavigation = (isNext) => {
    const getViewsData = (form = {}) => {
      const viewsToSkip = [];
      const { hsaEnroll, fsaEnroll, dependentEnroll } = form;
      const hasHsaEnroll = hsaEnroll?.value === 'Yes';
      const hasFsaEnroll = fsaEnroll?.value === 'Yes';
      const hasDependentEnroll = dependentEnroll?.value === 'Yes';

      let order = ['viewOne', 'viewTwo', 'viewThree', 'viewFour'];
      const viewsData = { ...data(tooltips) };
      const newRecommendations = {
        fsa: false,
        lpfsa: false,
        dcfsa: false
      };

      if (!hasDependentEnroll) {
        viewsToSkip.push('viewFour');
      }

      if (!hasFsaEnroll || hasHsaEnroll) {
        viewsToSkip.push('viewTwo');
      }

      if (!hasFsaEnroll) {
        viewsToSkip.push('viewThree');
      }

      viewsToSkip.forEach((viewName) => {
        delete viewsData[viewName];
        order = order.filter((v) => v !== viewName);
      });

      if (viewsData.viewFour) {
        newRecommendations.dcfsa = true;
      }

      if (viewsData.viewTwo) {
        newRecommendations.fsa = true;
      } else if (viewsData.viewThree) {
        newRecommendations.lpfsa = true;
      }

      return {
        viewsData,
        order,
        newRecommendations
      };
    };

    const { viewsData, order, newRecommendations } = getViewsData(form);

    const numberOfViews = Object.keys(viewsData).length;
    const nextPage = page === numberOfViews ? 0 : isNext ? page + 1 : page - 1;
    const nextElement = order[nextPage];

    if (page === numberOfViews && nextPage === 0) {
      setForm({});
    }

    setPages(numberOfViews);
    setPage(nextPage);
    setFinalRecommendations(newRecommendations);
    if (numberOfViews !== nextPage) {
      setCurrentData(data(tooltips)[nextElement].header);
      setView(data(tooltips)[nextElement].view);
    }
  };

  useEffect(() => {
    async function getTaxes() {
      if (page !== 0 && !tax) {
        const { filingStatus, state, annualIncome } = form;
        const taxPay = await getBlendedTax(state?.value, annualIncome?.value, filingStatus?.value, true);
        setTax(taxPay);
      } else if (page === 0) {
        setTax(0);
      }
    }
    getTaxes();
  }, [page]);
  return (
    <main>
      {/* <Seo {...seoFields} /> */}
      {/* <Header /> */}
      <StaticContent role="main" show={loaded} data-test-id="fsa-savings-calculator">
        <BackgroundDiv>
          <CalculatorSection>
            <CalculatorHeader animate={false} title={header.title} subTitle={header.subTitle} />
          </CalculatorSection>
        </BackgroundDiv>
        <CalculatorSection>
          <div ref={headerRef}>
            {page !== pages ? (
              <CalculatorSlider
                currentPage={page}
                pages={pages}
                data={currentData}
                disabled={!isFormValid(view, form)}
                handleNavigation={(isNext) => {
                  scrollToElement(headerRef);
                  handleNavigation(isNext);
                }}>
                <FormBuilder hasAnimation={false} handler={setForm} formData={form} form={view} />
              </CalculatorSlider>
            ) : (
              <FsaResults
                results={getCalculations(form, tax, finalRecommendations)}
                handleNavigation={() => {
                  scrollToElement(headerRef);
                  handleNavigation(false);
                }}
              />
            )}
          </div>
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

const FSASavingsCalculator = () => {
  const { data } = useSWR(['calculators', 'fsaCalculator'], () =>
    contentful.query({
      'content_type': 'calculators',
      'fields.slug': 'fsaCalculator'
    })
  );
  if (!data) return null;

  const { formFields, faq, header, navigation, disclaimer, callToAction, seoFields, tooltips } =
    formatContentfulData(data);

  const builtCta = buildInitialContentfulProps(callToAction);

  return (
    <FSASavingsCalculatorForm
      {...{ formFields, faq, header, navigation, disclaimer, callToAction: builtCta, seoFields, tooltips }}
    />
  );
};

export default FSASavingsCalculator;
