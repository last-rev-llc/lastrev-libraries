import React from 'react';
import { Accordion as MuiAccordion, AccordionProps as MuiAccordionProps, Typography } from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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

const AccordionRoot = styled(MuiAccordion, {
  name: 'Accordion',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<MuiAccordionProps & {}>(() => ({}));

export default Accordion;
