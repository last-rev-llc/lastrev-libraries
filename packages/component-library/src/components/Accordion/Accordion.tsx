import React from 'react';
import {
  Accordion as MuiAccordion,
  Typography,
  AccordionDetails as MuiAccordionDetails,
  AccordionSummary as MuiAccordionSummary
} from '@mui/material';
import MuiExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ErrorBoundary from '../ErrorBoundary';
import styled from '@mui/system/styled';
import sidekick from '@last-rev/contentful-sidekick-util';
import ContentModule from '../ContentModule';
import { AccordionProps } from './Accordion.types';

export const Accordion = ({ variant, title, body, sidekickLookup, ...props }: AccordionProps) => {
  return (
    <ErrorBoundary>
      <AccordionRoot {...sidekick(sidekickLookup)} variant={variant} data-testid="Accordion" {...props}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <AccordionTitle variant="h4" data-testid="Accordion-title">
            {title}
          </AccordionTitle>
        </AccordionSummary>
        {body ? (
          <AccordionDetails>
            <AccordionBody
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
  slot: 'AccordionSummary',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.accordionSummary]
})``;

const AccordionDetails = styled(MuiAccordionDetails, {
  name: 'Accordion',
  slot: 'AccordionDetails',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.accordionDetails]
})``;

const AccordionTitle = styled(Typography, {
  name: 'Accordion',
  slot: 'AccordionTitle',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.accordionTitle]
})``;

const AccordionBody = styled(ContentModule, {
  name: 'Accordion',
  slot: 'AccordionBody',
  overridesResolver: (_, styles) => [styles.accordionBody]
})``;

const ExpandMoreIcon = styled(MuiExpandMoreIcon, {
  name: 'Accordion',
  slot: 'ExpandMoreIcon',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.expandMoreIcon]
})``;

export default Accordion;
