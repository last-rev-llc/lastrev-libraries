import React from 'react';
import { Accordion as MuiAccordion, AccordionProps as MuiAccordionProps, Typography, Box } from '@material-ui/core';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ErrorBoundary from '../ErrorBoundary';
import styled from '@material-ui/system/styled';

export interface AccordionProps extends MuiAccordionProps {
  __typename: string;
  internalTitle: string;
  variant?: any;
  items?: AccordionProps[];
  itemsVariant?: string;
  colorTitle?: string;
  colorBody?: string;
  sizeTitle?: string;
}

export interface AccordionOverrides {}

export const Accordion = ({ items, itemsVariant, colorTitle, colorBody, sizeTitle }: AccordionProps) => {
  if (!items?.length) return null;
  const itemsWithVariant = items.map((item) => ({ ...item, variant: itemsVariant ?? item?.variant }));
  return (
    <ErrorBoundary>
      {itemsWithVariant.map((item, idx) => (
        <AccordionRoot variant={item.variant} key={idx}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant={sizeTitle} color={colorTitle} component={sizeTitle}>
              {item.title}
            </Typography>
          </AccordionSummary>
          {item.body ? (
            <AccordionDetails>
              <Typography variant="body1" color={colorBody} component="p">
                {item.body}
              </Typography>
            </AccordionDetails>
          ) : null}
        </AccordionRoot>
      ))}
    </ErrorBoundary>
  );
};

const AccordionRoot = styled(MuiAccordion, {
  name: 'Accordion',
  slot: 'Root',
  overridesResolver: (_, styles) => ({
    ...styles.root
  })
})<MuiAccordionProps & {}>(() => ({
  // backgroundColor: 'transparent'
}));

export default Accordion;
