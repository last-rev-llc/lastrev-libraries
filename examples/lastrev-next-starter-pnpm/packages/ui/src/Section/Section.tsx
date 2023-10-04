import React from 'react';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

import sidekick from '@last-rev/contentful-sidekick-util';

import ErrorBoundary from '../ErrorBoundary';
import ContentModule from '../ContentModule';
import Grid from '../Grid';

import type { SectionProps, SectionOwnerState } from './Section.types';

const Section = (props: SectionProps) => {
  const ownerState = { ...props };

  const {
    introText,
    contents,
    // styles,
    background,
    // contentWidth,
    contentDirection,
    // contentSpacing,
    // testId,
    sidekickLookup
  } = props;

  return (
    <ErrorBoundary>
      <Root component="section" {...sidekick(sidekickLookup)} ownerState={ownerState}>
        <ContentOuterGrid ownerState={ownerState}>
          {background ? (
            <BackgroundMediaWrap ownerState={ownerState}>
              <BackgroundMedia {...background} ownerState={ownerState} />
            </BackgroundMediaWrap>
          ) : null}

          <ContentWrap ownerState={ownerState}>
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

            <ItemsGrid ownerState={ownerState}>
              {contents?.map((content, idx) => (
                <SectionItem key={`section-item-${idx}-${content?.id}`} ownerState={ownerState}>
                  <ContentModule {...content} ownerState={ownerState} />
                </SectionItem>
              ))}
            </ItemsGrid>
          </ContentWrap>
        </ContentOuterGrid>
      </Root>
    </ErrorBoundary>
  );
};

const Root = styled(Box, {
  name: 'Section',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ ownerState?: SectionOwnerState }>``;

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

const BackgroundMedia = styled(ContentModule, {
  name: 'Section',
  slot: 'BackgroundMedia',
  overridesResolver: (_, styles) => [styles.backgroundMedia]
})<{ ownerState: SectionOwnerState }>``;

const BackgroundMediaWrap = styled(Box, {
  name: 'Section',
  slot: 'BackgroundMediaWrap',
  overridesResolver: (_, styles) => [styles.backgroundMediaWrap]
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
