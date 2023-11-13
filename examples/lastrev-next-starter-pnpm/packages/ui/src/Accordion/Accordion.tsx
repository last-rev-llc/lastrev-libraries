import React from 'react';

import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

import sidekick from '@last-rev/contentful-sidekick-util';

import Grid from '../Grid';
import ErrorBoundary from '../ErrorBoundary';
import ContentModule from '../ContentModule';
import Background from '../Background';

import type { AccordionProps, AccordionOwnerState } from './Accordion.types';

const Accordion = (props: AccordionProps) => {
  const ownerState = { ...props };

  const { background, backgroundColor, id, items, variant, sidekickLookup, introText } = props;

  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <ErrorBoundary>
      <Root {...sidekick(sidekickLookup)} ownerState={ownerState} data-testid={`Accordion-${variant}`}>
        <AccordionBackground background={background} backgroundColor={backgroundColor} testId="Block-background" />

        {!!introText && (
          <IntroTextGrid ownerState={ownerState}>
            <IntroText
              ownerState={ownerState}
              {...sidekick(sidekickLookup, 'introText')}
              {...introText}
              variant="introText"
            />
          </IntroTextGrid>
        )}

        {!!items?.length && (
          <ContentOuterGrid ownerState={ownerState}>
            {items?.map(
              (
                item: any,
                index: number // TODO: Fix type
              ) => (
                <AccordionItem
                  disableGutters
                  expanded={expanded === `${!id}-accordion-panel-${item?.id}-${index}`}
                  onChange={handleChange(`${!id}-accordion-panel-${item?.id}-${index}`)}
                  key={`${!id}-accordion-panel-${item?.id}-${index}`}
                  ownerState={ownerState}>
                  <SummaryWrap aria-controls="panel1d-content" id="panel1d-header" ownerState={ownerState}>
                    <Summary ownerState={ownerState}>{item.title}</Summary>
                  </SummaryWrap>
                  <DetailsWrap ownerState={ownerState}>
                    {item.body ? <Details __typename="RichText" body={item.body} ownerState={ownerState} /> : null}
                    {!item.body && item.content ? <Details {...item.content} ownerState={ownerState} /> : null}
                  </DetailsWrap>
                </AccordionItem>
              )
            )}
          </ContentOuterGrid>
        )}
      </Root>
    </ErrorBoundary>
  );
};

const Root = styled(Box, {
  name: 'Accordion',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ ownerState: AccordionOwnerState }>``;

const AccordionBackground = styled(Background, {
  name: 'Tabs',
  slot: 'AccordionBackground',
  overridesResolver: (_, styles) => [styles.background]
})<{}>``;

const ContentOuterGrid = styled(Grid, {
  name: 'Accordion',
  slot: 'ContentOuterGrid',
  overridesResolver: (_, styles) => [styles.contentOuterGrid]
})<{ ownerState: AccordionOwnerState }>``;

const IntroTextGrid = styled(Grid, {
  name: 'Accordion',
  slot: 'IntroTextGrid',
  overridesResolver: (_, styles) => [styles.introTextGrid]
})<{ ownerState: AccordionOwnerState }>``;

const IntroText = styled(ContentModule, {
  name: 'Accordion',
  slot: 'IntroText',
  overridesResolver: (_, styles) => [styles.introText]
})<{ ownerState: AccordionOwnerState }>``;

const AccordionItem = styled(MuiAccordion, {
  name: 'Accordion',
  slot: 'AccordionItem',
  overridesResolver: (_, styles) => [styles.accordionItem]
})<{ ownerState: AccordionOwnerState }>``;

const SummaryWrap = styled(MuiAccordionSummary, {
  name: 'Accordion',
  slot: 'SummaryWrap',
  overridesResolver: (_, styles) => [styles.summaryWrap]
})<{ ownerState: AccordionOwnerState }>``;

const Summary = styled(Typography, {
  name: 'Accordion',
  slot: 'Summary',
  overridesResolver: (_, styles) => [styles.summary]
})<{ ownerState: AccordionOwnerState }>``;

const DetailsWrap = styled(MuiAccordionDetails, {
  name: 'Accordion',
  slot: 'DetailsWrap',
  overridesResolver: (_, styles) => [styles.detailsWrap]
})<{ ownerState: AccordionOwnerState }>``;

const Details = styled(ContentModule, {
  name: 'Accordion',
  slot: 'Details',
  overridesResolver: (_, styles) => [styles.details]
})<{ ownerState: AccordionOwnerState }>``;

export default Accordion;
