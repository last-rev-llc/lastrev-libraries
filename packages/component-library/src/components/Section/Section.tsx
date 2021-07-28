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
// import BackgroundImage from '../BackgroundImage';
import ErrorBoundary from '../ErrorBoundary';
import ContentModule from '../ContentModule';
import { Breakpoint } from '@material-ui/core';
import { MediaProps } from '../Media';
// import Image from '../Image';

// interface Image {
//   src: string;
// }

export interface SectionProps {
  contents?: Array<{ __typename: string; id?: string }>;
  background?: MediaProps;
  backgroundColor?: string;
  variant?: string;
  contentWidth?: false | Breakpoint | undefined;
  contentDirection?: 'row' | 'column' | undefined;
  contentSpacing?: number;
  // Enables exposing inner `sx` prop through content
  styles?: {
    root?: SystemCssProperties;
    gridContainer?: SystemCssProperties & { spacing: any };
    gridItem?: Array<SystemCssProperties & { xs: any; sm: any; md: any }>;
  };
}

export interface SectionOverrides {}

const Section = ({
  contents,
  styles,
  backgroundColor,
  contentWidth,
  contentDirection,
  contentSpacing,
  variant
}: SectionProps) => {
  const theme = useTheme();
  const content = (
    <GridContainer
      container
      sx={{ ...styles?.gridContainer, flexDirection: contentDirection }}
      spacing={contentSpacing ?? 2}
      // spacing={contentSpacing?.toString() ?? 2}
    >
      {contents?.map((content, idx) => {
        const itemStyle = get(styles?.gridItem, idx);
        return (
          <GridItem
            item
            key={content?.id}
            xs={itemStyle?.xs ?? true}
            md={itemStyle?.md}
            sm={itemStyle?.sm}
            sx={itemStyle}>
            <ContentModule {...content} />
          </GridItem>
        );
      })}
    </GridContainer>
  );

  return (
    <ErrorBoundary>
      <Root
        sx={{
          ...styles?.root,
          ...rootStyles({ backgroundColor, theme })
        }}
        variant={variant}>
        {!contentWidth ? content : <ContentContainer maxWidth={contentWidth}>{content}</ContentContainer>}
      </Root>
    </ErrorBoundary>
  );
};

const rootStyles = ({ backgroundColor, theme }: { backgroundColor?: string; theme: Theme }) => {
  // console.log('RootStyles', { backgroundColor, theme });
  if (backgroundColor?.includes('gradient') && theme.palette[backgroundColor]) {
    return { background: theme.palette[backgroundColor]?.main, color: `${backgroundColor}.contrastText` };
  } else if (backgroundColor && theme.palette[backgroundColor]) {
    return { bgcolor: `${backgroundColor}.main`, color: `${backgroundColor}.contrastText` };
  }
  return {};
};

// Define the pieces of the Section customizable through Theme

const Root = styled(Box, {
  name: 'Section',
  slot: 'Root',
  overridesResolver: (_, styles) => ({
    ...styles.root,
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
})<{ variant?: string }>(() => ({}));

// const Background = styled(BackgroundImage, {
//   name:"Section",
//   slot: "BackgroundImage",
// })(() => ({
//   position: 'relative'
// }));

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
