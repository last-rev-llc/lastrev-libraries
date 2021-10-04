import React from 'react';
import { Accordion as MuiAccordion, AccordionProps as MuiAccordionProps, Typography } from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ErrorBoundary from '../ErrorBoundary';
import styled from '@mui/system/styled';
import sidekick from '../../utils/sidekick';
import Text, { RichText } from '../Text';

export interface AccordionProps extends MuiAccordionProps {
  __typename: string;
  internalTitle: string;
  variant?: any;
  title?: string;
  body?: RichText;
  sidekickLookup: any;
}

export const Accordion = ({ variant, title, body, sidekickLookup }: AccordionProps) => {
  return (
    <ErrorBoundary>
      <AccordionRoot {...sidekick(sidekickLookup)} variant={variant} data-testid="Accordion">
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h4" data-testid="Accordion-title">
            {title}
          </Typography>
        </AccordionSummary>
        {body ? (
          <AccordionDetails>
            <Text sidekickLookup={sidekickLookup?.body} body={body} data-testid="Accordion-body" />
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
