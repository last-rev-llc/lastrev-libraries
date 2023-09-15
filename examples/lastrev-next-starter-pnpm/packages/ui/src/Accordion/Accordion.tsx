import React from 'react';

import styled from '@mui/system/styled';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

import sidekick from '@last-rev/contentful-sidekick-util';

import ErrorBoundary from '../ErrorBoundary';
import ContentModule from '../ContentModule';

import { AccordionProps } from './Accordion.types';

export const Accordion = ({
  id,
  items,
  itemsWidth,
  variant,
  itemsVariant,
  sidekickLookup,
  introText,
  ...props
}: AccordionProps) => {
  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <ErrorBoundary>
      <Root
        variant={variant}
        itemsVariant={itemsVariant}
        data-testid={`Accordion-${variant}`}
        {...props}
        {...sidekick(sidekickLookup)}>
        {introText && (
          <IntroTextWrapper>
            <IntroText {...sidekick(sidekickLookup, 'introText')} {...introText} variant="introText" />
          </IntroTextWrapper>
        )}
        <ContentContainer>
          {!!items?.length && (
            <Box>
              {items?.map(
                (
                  item: any,
                  index: number // TODO: Fix type
                ) => (
                  <AccordionItem
                    expanded={expanded === `${!id}-tab-panel-${item?.id}-${index}`}
                    onChange={handleChange(`${!id}-tab-panel-${item?.id}-${index}`)}
                    key={`${!id}-tab-panel-${item?.id}-${index}`}>
                    <AccordionItemSummary aria-controls="panel1d-content" id="panel1d-header">
                      <Typography>{item.title}</Typography>
                    </AccordionItemSummary>
                    <AccordionItemDetails>
                      <Item {...item} />
                    </AccordionItemDetails>
                  </AccordionItem>
                )
              )}
            </Box>
          )}
        </ContentContainer>
      </Root>
    </ErrorBoundary>
  );
};

const shouldForwardProp = (prop: string) => prop !== 'variant' && prop !== 'itemsVariant';

const Root = styled(Box, {
  name: 'Accordion',
  slot: 'Root',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.root]
})<{ variant?: string; itemsVariant?: string }>``;

const ContentContainer = styled(Container, {
  name: 'Accordion',
  slot: 'ContentContainer',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.contentContainer]
})<{ variant?: string }>``;

const IntroTextWrapper = styled(Box, {
  name: 'Accordion',
  slot: 'IntroTextWrapper',
  overridesResolver: (_, styles) => [styles.introTextWrapper]
})(() => ({}));

const IntroText = styled(ContentModule, {
  name: 'Accordion',
  slot: 'IntroText',
  overridesResolver: (_, styles) => [styles.introText]
})(() => ({}));

const AccordionItem = styled(MuiAccordion, {
  name: 'Accordion',
  slot: 'AccordionItem',
  overridesResolver: (_, styles) => [styles.accordionItem]
})(() => ({}));

const AccordionItemSummary = styled(MuiAccordionSummary, {
  name: 'Accordion',
  slot: 'AccordionItemSummary',
  overridesResolver: (_, styles) => [styles.accordionSummary]
})(() => ({}));

const AccordionItemDetails = styled(MuiAccordionDetails, {
  name: 'Accordion',
  slot: 'AccordionItemDetails',
  overridesResolver: (_, styles) => [styles.accordionDetails]
})(() => ({}));

const Item = styled(ContentModule, {
  name: 'Accordion',
  slot: 'Item',
  overridesResolver: (_, styles) => [styles.item]
})<{ variant?: string }>``;

export default Accordion;
