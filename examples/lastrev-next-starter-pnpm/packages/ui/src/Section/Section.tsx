import React from 'react';

import { styled } from '@mui/material/styles';
import useTheme from '@mui/system/useTheme';
import { Theme } from '@mui/system';

import Box from '@mui/material/Box';

// TODO: Remove need for Lodash
import get from 'lodash/get';

import sidekick from '@last-rev/contentful-sidekick-util';

import ErrorBoundary from '../ErrorBoundary';
import ContentModule from '../ContentModule';
import ConditionalWrapper from '../ConditionalWrapper';

import useThemeProps from '../utils/useThemeProps';

import { SectionProps } from './Section.types';
import Grid from '../Grid';

// TODO: Cleanup
const VARIANTS_GRID_ITEM: Record<string, any> = {
  'one-per-row': { xs: 12 },
  'two-per-row': { xs: 12, sm: 6 },
  'three-per-row': { xs: 12, sm: 6, md: 4 },
  'default': { xs: 12, sm: true }
};

const Section = (inProps: SectionProps) => {
  const theme = useTheme();
  const {
    introText,
    contents,
    styles,
    background,
    backgroundColor,
    contentWidth,
    contentDirection,
    contentSpacing,
    variant,
    testId,
    sidekickLookup,
    ...props
  } = useThemeProps({ name: 'Section', props: inProps });
  const gridItemStyle = variant && VARIANTS_GRID_ITEM[variant] ? VARIANTS_GRID_ITEM[variant] : {};

  return (
    <ErrorBoundary>
      <Root
        {...sidekick(sidekickLookup)}
        data-testid={testId}
        sx={{
          ...styles?.root,
          ...rootStyles({ backgroundColor, theme })
        }}
        backgroundColor={backgroundColor}
        variant={variant}
        // TODO: Fix this workaround needed to prevent the theme from breaking the root styles
        {...props}>
        {background ? <BackgroundMedia {...background} /> : null}

        <ContentGrid className={`section-grid-${variant === 'onePerRow' ? 'single' : 'columns'}`}>
          {contents?.map((content) => (
            <GridItem key={content.id} {...content} />
          ))}
        </ContentGrid>
      </Root>
    </ErrorBoundary>
  );
};

const rootStyles = ({ backgroundColor, theme }: { backgroundColor?: string; theme: Theme }) => {
  if (backgroundColor?.includes('gradient') && get(theme.palette, backgroundColor)) {
    return {
      background: get(theme.palette, backgroundColor)?.main,
      color: `${backgroundColor}.contrastText`
    };
  }
  const parsedBGColor = backgroundColor?.includes('.') ? backgroundColor : `${backgroundColor}.main`;
  const paletteColor = backgroundColor?.includes('.') ? backgroundColor.split('.')[0] : `${backgroundColor}`;

  if (backgroundColor && get(theme.palette, parsedBGColor)) {
    return {
      bgcolor: parsedBGColor,
      color: `${paletteColor}.contrastText`
    };
  }
  return {};
};

// Define the pieces of the Section customizable through Theme

const Root = styled(Box, {
  name: 'Section',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ variant?: string; backgroundColor?: string }>(() => ({
  width: '100%'
}));

const ContentGrid = styled(Grid, {
  name: 'Section',
  slot: 'ContentGrid',
  overridesResolver: (_, styles) => [styles.contentGrid]
})<{ variant?: string }>(() => ({
  zIndex: 1
}));

const BackgroundMedia = styled(ContentModule, {
  name: 'Section',
  slot: 'BackgroundMedia',
  overridesResolver: (_, styles) => [styles.backgroundImage]
})(() => ({
  zIndex: 0,
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'block',
  objectFit: 'cover'
}));

const GridItem = styled(ContentModule, {
  name: 'Section',
  slot: 'GridItem',
  overridesResolver: (_, styles) => [styles.gridItem]
})(() => ({}));

export default Section;
