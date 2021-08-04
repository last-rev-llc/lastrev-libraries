import React from 'react';
import {
  Accordion as MuiCollectionAccordion,
  AccordionProps as MuiCollectionAccordionProps,
  Typography
} from '@material-ui/core';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ErrorBoundary from '../ErrorBoundary';
import styled from '@material-ui/system/styled';

export interface CollectionAccordionProps extends MuiCollectionAccordionProps {
  __typename: string;
  internalTitle: string;
  variant?: any;
  title?: string;
  body?: string;
}

export interface CollectionAccordionOverrides {}

export const CollectionAccordion = ({ variant, title, body }: CollectionAccordionProps) => {
  return (
    <ErrorBoundary>
      <AccordionRoot variant={variant}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h4" color="secondary" component="h4">
            {title}
          </Typography>
        </AccordionSummary>
        {body ? (
          <AccordionDetails>
            <Typography variant="body1" component="p">
              {body}
            </Typography>
          </AccordionDetails>
        ) : null}
      </AccordionRoot>
    </ErrorBoundary>
  );
};

const AccordionRoot = styled(MuiCollectionAccordion, {
  name: 'CollectionAccordion',
  slot: 'Root',
  overridesResolver: (_, styles) => ({
    ...styles.root
  })
})<MuiCollectionAccordionProps & {}>(() => ({}));

export default CollectionAccordion;
