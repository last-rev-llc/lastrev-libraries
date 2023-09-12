import React from 'react';
import { styled } from '@mui/material/styles';
import { AccordionProps as MuiAccordionProps } from '@mui/material/Accordion';
import MuiAccordion from '@mui/material/Accordion';
import Typography, {TypographyProps} from '@mui/material/Typography';
import {default as MuiAccordionSummary, AccordionSummaryProps } from '@mui/material/AccordionSummary';
import {default as MuiAccordionDetails, AccordionDetailsProps} from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import sidekick from '@last-rev/contentful-sidekick-util';

import ErrorBoundary from '../ErrorBoundary';
import ContentModule from '../ContentModule';

import { AccordionProps } from './Accordion.types';

export const Accordion = ({ variant, title, body, sidekickLookup, ...props }: AccordionProps) => {
  return (
    <ErrorBoundary>
      <Root data-testid="Accordion" {...sidekick(sidekickLookup)} {...props} variant={variant}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Title variant="h4" data-testid="Accordion-title">
            {title}
          </Title>
        </AccordionSummary>
        {body ? (
          <AccordionDetails>
            <ContentModule
              __typename="Text"
              variant="accordion"
              {...sidekick(sidekickLookup, 'body')}
              body={body}
              data-testid="Accordion-body"
            />
          </AccordionDetails>
        ) : null}
      </Root>
    </ErrorBoundary>
  );
};

export const shouldForwardProp = (prop: string) =>
  prop !== 'sidekickLookup' &&
  prop !== 'body' &&
  prop !== 'subtitle' &&
  prop !== 'actions' &&
  prop !== 'media' &&
  prop !== 'actions' &&
  prop !== 'link' &&
  prop != '__typename';

const Root = styled(MuiAccordion, {
  name: 'Accordion',
  slot: 'Root',
  shouldForwardProp: (prop) => shouldForwardProp(prop as string) && prop !== 'id',
  overridesResolver: (_, styles) => [styles.root]
})<{ variant?: string; colorScheme?: string }>(() => ({}));

const Title = styled(Typography, {
  name: 'Accordion',
  slot: 'Title',
  overridesResolver: (_, styles) => [styles.title]
})<TypographyProps<React.ElementType>>(() => ({}));

const AccordionSummary = styled(MuiAccordionSummary, {
  name: 'Accordion',
  slot: 'AccordionSummary',
  overridesResolver: (_, styles) => [styles.accordionSummary]
})<AccordionSummaryProps<React.ElementType>>(() => ({}));

const AccordionDetails = styled(MuiAccordionDetails, {
  name: 'Accordion',
  slot: 'AccordionDetails',
  overridesResolver: (_, styles) => [styles.accordionDetails]
})<AccordionDetailsProps>(() => ({}));

export default Accordion;
