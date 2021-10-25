import React from 'react';
import Box from '@mui/material/Box';
import styled from '@mui/system/styled';
import useTheme from '@mui/system/useTheme';
import { Theme } from '@mui/system/createTheme';
// import { Theme } from '@mui/material';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { SystemCssProperties } from '@mui/system/styleFunctionSx';
import get from 'lodash/get';
import omit from 'lodash/omit';
// import BackgroundMedia from '../BackgroundMedia';
import ErrorBoundary from '../ErrorBoundary';
import ContentModule from '../ContentModule';
import { Breakpoint } from '@mui/material';
import { MediaProps } from '../Media';
import Media from '../Media';
import sidekick from '../../utils/sidekick';
import { TextProps } from '../Text';
import ConditionalWrapper from '../ConditionalWrapper';
// interface Image {
//   src: string;
// }

export interface SectionProps {
  introText?: TextProps;
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
  theme?: [Theme];
}

export interface SectionOverrides {}

const VARIANTS_GRID_ITEM: Record<string, any> = {
  'one-per-row': { xs: 12 },
  'two-per-row': { xs: 12, sm: 6 },
  'three-per-row': { xs: 12, sm: 6, md: 4 },
  'default': { xs: 12, sm: true }
};
const Section = ({
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
}: SectionProps) => {
  const theme = useTheme();
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
        variant={variant}
        // TODO: Fix this workaround needed to prevent the theme from breaking the root styles
        {...omit(props, 'theme')}>
        {background ? <BackgroundMedia {...background} /> : null}
        <ConditionalWrapper
          condition={!!contentWidth}
          wrapper={(children) => <ContentContainer maxWidth={contentWidth}>{children}</ContentContainer>}>
          {introText && (
            <IntroText {...introText} {...sidekick(sidekickLookup?.introText)} data-testid="Section-introText" />
          )}
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
        </ConditionalWrapper>
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
  overridesResolver: (_, styles) => [styles.root]
})<{ variant?: string }>(() => ({ width: '100%', display: 'flex', justifyContent: 'center' }));

const ContentContainer = styled(Container, {
  name: 'Section',
  slot: 'ContentContainer',
  overridesResolver: (_, styles) => [styles.contentContainer]
})<{ variant?: string }>(() => ({
  zIndex: 1
}));

const BackgroundMedia = styled(Media, {
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

const GridContainer = styled(Grid, {
  name: 'Section',
  slot: 'GridContainer',
  overridesResolver: (_, styles) => [styles.gridContainer]
})(() => ({}));

const GridItem = styled(Grid, {
  name: 'Section',
  slot: 'GridItem',
  overridesResolver: (_, styles) => [styles.gridItem]
})(() => ({}));

const IntroText = styled(ContentModule, {
  name: 'Section',
  slot: 'IntroText',
  overridesResolver: (_, styles) => [styles.introText]
})(() => ({}));

export default Section;
