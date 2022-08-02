import React from 'react';
import {
  Accordion as MuiAccordion,
  Typography as MuiTypography,
  AccordionDetails as MuiAccordionDetails,
  AccordionSummary as MuiAccordionSummary
} from '@mui/material';
import MuiExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ErrorBoundary from '../ErrorBoundary';
import styled from '@mui/system/styled';
import sidekick from '@last-rev/contentful-sidekick-util';
import CModule from '../ContentModule';
import { AccordionProps } from './Accordion.types';

export const Accordion = ({ variant, title, body, sidekickLookup, ...props }: AccordionProps) => {
  return (
    <ErrorBoundary>
      <AccordionRoot {...sidekick(sidekickLookup)} variant={variant} data-testid="Accordion" {...props}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h4" data-testid="Accordion-title">
            {title}
          </Typography>
        </AccordionSummary>
        {body ? (
          <AccordionDetails>
            <ContentModule
              __typename="Text"
              variant="accordion"
              sidekickLookup={sidekickLookup?.body}
              body={body}
              data-testid="Accordion-body"
            />
          </AccordionDetails>
        ) : null}
      </AccordionRoot>
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

const AccordionRoot = styled(MuiAccordion, {
  name: 'Accordion',
  slot: 'Root',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.root]
})``;

const AccordionSummary = styled(MuiAccordionSummary, {
  name: 'Accordion',
  slot: 'Summary',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.summary]
})``;

const AccordionDetails = styled(MuiAccordionDetails, {
  name: 'Accordion',
  slot: 'Details',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.details]
})``;

const Typography = styled(MuiTypography, {
  name: 'Accordion',
  slot: 'Typography',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.typography]
})``;

const ContentModule = styled(CModule, {
  name: 'Accordion',
  slot: 'ContentModule',
  overridesResolver: (_, styles) => [styles.contentModule]
})``;

const ExpandMoreIcon = styled(MuiExpandMoreIcon, {
  name: 'Accordion',
  slot: 'ExpandMoreIcon',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.expandMoreIcon]
})``;

export default Accordion;
