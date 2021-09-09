import React from 'react';
import { Accordion as MuiAccordion, AccordionProps as MuiAccordionProps, Typography } from '@material-ui/core';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ErrorBoundary from '../ErrorBoundary';
import styled from '@material-ui/system/styled';
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
          <Typography variant="h4" color="secondary" data-testid="Accordion-title">
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
  overridesResolver: (_, styles) => ({
    ...styles.root
  })
})<MuiAccordionProps & {}>(() => ({}));

export default Accordion;
