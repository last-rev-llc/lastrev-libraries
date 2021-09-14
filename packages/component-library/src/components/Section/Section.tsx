import React from 'react';
import Box from '@material-ui/core/Box';
import styled from '@material-ui/system/styled';
import useTheme from '@material-ui/system/useTheme';
import { Theme } from '@material-ui/system/createTheme';
// import { Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { SystemCssProperties } from '@material-ui/system/styleFunctionSx';
import get from 'lodash/get';
// import BackgroundMedia from '../BackgroundMedia';
import ErrorBoundary from '../ErrorBoundary';
import ContentModule from '../ContentModule';
import { Breakpoint } from '@material-ui/core';
import { MediaProps } from '../Media';
import Media from '../Media';
import sidekick from '../../utils/sidekick';
// interface Image {
//   src: string;
// }

export interface SectionProps {
  contents?: Array<{ __typename: string; id?: string }>;
  background?: MediaProps;
  backgroundColor?: string;
  variant?: string;
  testId?: string;
  contentWidth?: false | Breakpoint | undefined;
  contentDirection?: 'row' | 'column' | undefined;
  contentSpacing?: number;
  // Enables exposing inner `sx` prop through content
  styles?: {
    root?: SystemCssProperties;
    gridContainer?: SystemCssProperties & { spacing: any };
    gridItem?: SystemCssProperties & { xs: any; sm: any; md: any };
    gridItems?: Array<SystemCssProperties & { xs: any; sm: any; md: any }>;
  };
  sidekickLookup?: any;
}

export interface SectionOverrides {}

const VARIANTS_GRID_ITEM: Record<string, any> = {
  'one-per-row': { xs: 12 },
  'two-per-row': { xs: 12, sm: 6 },
  'three-per-row': { xs: 12, sm: 6, md: 4 },
  'default': { xs: 12, sm: true }
};
const Section = ({
  contents,
  styles,
  background,
  backgroundColor,
  contentWidth,
  contentDirection,
  contentSpacing,
  variant,
  testId,
  sidekickLookup
}: SectionProps) => {
  const theme = useTheme();
  const gridItemStyle = variant && VARIANTS_GRID_ITEM[variant] ? VARIANTS_GRID_ITEM[variant] : {};
  const content = (
    <GridContainer
      container
      sx={{ ...styles?.gridContainer, flexDirection: contentDirection }}
      {...(contentSpacing && { spacing: contentSpacing })}>
      {contents?.map((content, idx) => {
        const itemStyle = get(styles?.gridItems, idx);
        return (
          <GridItem
            item
            key={content.id}
            {...(contentDirection === 'column'
              ? { width: '100%' }
              : {
                  xs: gridItemStyle?.xs ?? itemStyle?.xs ?? true,
                  md: gridItemStyle?.md ?? itemStyle?.md ?? false,
                  sm: gridItemStyle?.sm ?? itemStyle?.sm ?? false
                })}
            sx={{
              ...styles?.gridItem,
              ...itemStyle
            }}>
            <ContentModule {...content} />
          </GridItem>
        );
      })}
    </GridContainer>
  );

  return (
    <ErrorBoundary>
      <Root
        {...sidekick(sidekickLookup)}
        data-testid={testId}
        sx={{
          ...styles?.root,
          ...rootStyles({ backgroundColor, theme })
        }}
        variant={variant}>
        {background ? <BackgroundMedia {...background} /> : null}
        {!contentWidth ? content : <ContentContainer maxWidth={contentWidth}>{content}</ContentContainer>}
      </Root>
    </ErrorBoundary>
  );
};

const rootStyles = ({ backgroundColor, theme }: { backgroundColor?: string; theme: Theme }) => {
  if (backgroundColor?.includes('gradient') && theme.palette[backgroundColor]) {
    return {
      'background': theme.palette[backgroundColor]?.main,
      'color': `${backgroundColor}.contrastText`,
      // TODO find out a better way to override text color
      '& p, h1, h2, h3, h4, h5, h6, a': {
        color: `${backgroundColor}.contrastText`
      }
    };
  }
  const parsedBGColor = backgroundColor?.includes('.') ? backgroundColor : `${backgroundColor}.main`;
  const paletteColor = backgroundColor?.includes('.') ? backgroundColor.split('.')[0] : `${backgroundColor}`;

  if (backgroundColor && get(theme.palette, parsedBGColor)) {
    return {
      'bgcolor': parsedBGColor,
      '& p, h1, h2, h3, h4, h5, h6, a': {
        color: `${paletteColor}.contrastText`
      }
    };
  }
  return {};
};

// Define the pieces of the Section customizable through Theme

const Root = styled(Box, {
  name: 'Section',
  slot: 'Root',
  overridesResolver: (_, styles) => ({
    ...styles.root,
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  })
})<{ variant?: string }>(() => ({}));

const ContentContainer = styled(Container, {
  name: 'Section',
  slot: 'ContentContainer',
  overridesResolver: (_, styles) => ({
    ...styles.contentContainer
  })
})<{ variant?: string }>(() => ({
  zIndex: 1
}));

const BackgroundMedia = styled(Media, {
  name: 'Section',
  slot: 'BackgroundMedia',
  overridesResolver: (_, styles) => ({
    ...styles.backgroundImage
  })
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

const GridContainer = styled(Grid, {
  name: 'Section',
  slot: 'GridContainer',
  overridesResolver: (_, styles) => ({
    ...styles.gridContainer
  })
})(() => ({}));

const GridItem = styled(Grid, {
  name: 'Section',
  slot: 'GridItem',
  overridesResolver: (_, styles) => ({
    ...styles.gridItem
  })
})(() => ({}));

export default Section;
