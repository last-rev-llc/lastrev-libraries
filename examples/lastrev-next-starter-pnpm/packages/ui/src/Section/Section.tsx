import React from 'react';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

import sidekick from '@last-rev/contentful-sidekick-util';

import ErrorBoundary from '../ErrorBoundary';
import ContentModule from '../ContentModule';
import Grid from '../Grid';

import type { SectionProps, SectionOwnerState } from './Section.types';
import Background from '../Background';

const Section = (props: SectionProps) => {
  const ownerState = { ...props };

  const {
    introText,
    contents,

    background,
    backgroundColor,
    // TODO: Ensure test id is propagated correctly
    // testId,
    sidekickLookup
  } = props;

  return (
    <ErrorBoundary>
      <Root component="section" {...sidekick(sidekickLookup)} ownerState={ownerState}>
        <SectionBackground background={background} backgroundColor={backgroundColor} />
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

        <ContentWrap ownerState={ownerState}>
          <ItemsGrid ownerState={ownerState}>
            {contents?.map((content, idx) => (
              // <SectionItem key={`section-item-${idx}-${content?.id}`} ownerState={ownerState}>
              <ContentModule key={`section-item-${idx}-${content?.id}`} {...content} ownerState={ownerState} />
              // </SectionItem>
            ))}
          </ItemsGrid>
        </ContentWrap>
      </Root>
    </ErrorBoundary>
  );
};

const Root = styled(Box, {
  name: 'Section',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ ownerState?: SectionOwnerState }>``;

const SectionBackground = styled(Background, {
  name: 'Section',
  slot: 'Background',
  overridesResolver: (_, styles) => [styles.background]
})<{}>``;

const ContentOuterGrid = styled(Grid, {
  name: 'Section',
  slot: 'ContentOuterGrid',
  overridesResolver: (_, styles) => [styles.contentOuterGrid]
})<{ ownerState: SectionOwnerState }>``;

const ContentWrap = styled(Grid, {
  name: 'Section',
  slot: 'ContentWrap',
  overridesResolver: (_, styles) => [styles.contentWrap]
})<{ ownerState: SectionOwnerState }>``;

const IntroTextGrid = styled(Box, {
  name: 'Section',
  slot: 'IntroTextGrid',
  overridesResolver: (_, styles) => [styles.introTextGrid]
})<{ ownerState: SectionOwnerState }>``;

const IntroText = styled(ContentModule, {
  name: 'Section',
  slot: 'IntroText',
  overridesResolver: (_, styles) => [styles.introText]
})<{ ownerState: SectionOwnerState }>``;

const ItemsGrid = styled(Box, {
  name: 'Section',
  slot: 'ItemsGrid',
  overridesResolver: (_, styles) => [styles.itemsGrid]
})<{ ownerState: SectionOwnerState }>``;

const SectionItem = styled(Box, {
  name: 'Section',
  slot: 'SectionItem',
  overridesResolver: (_, styles) => [styles.sectionItem]
})<{ ownerState: SectionOwnerState }>``;

export default Section;
