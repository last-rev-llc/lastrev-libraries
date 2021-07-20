import React from 'react';
import Box from '@material-ui/core/Box';
import styled from '@material-ui/system/styled';
import Grid from '@material-ui/core/Grid';
import { SystemCssProperties } from '@material-ui/system/styleFunctionSx';
import get from 'lodash/get';
// import BackgroundImage from '../BackgroundImage';
import ErrorBoundary from '../ErrorBoundary';
import Image from '../Image';
import ContentModule from '../ContentModule';

interface Image {
  src: string;
}

interface Media {
  desktop: Image;
  tablet?: Image;
  mobile?: Image;
}

export interface SectionProps {
  // variant?: any;
  contents: Array<{ __typename: string; id: string }>;
  background?: Media;
  variant?: string;
  spacing: any;
  // Enables exposing inner `sx` prop through content
  styles?: {
    root?: SystemCssProperties;
    gridContainer?: SystemCssProperties & { spacing: any };
    gridItem?: Array<SystemCssProperties & { xs: any; sm: any; md: any }>;
  };
}

export interface SectionOverrides {}
const Section = ({ contents, styles, spacing, background, variant }: SectionProps) => {
  // console.log('variant: ', variant);

  return (
    <ErrorBoundary>
      <Root sx={styles?.root} variant={variant}>
        {/* <Background {...media} /> */}
        {background ? (
          <ImageWrap>
            <Image {...background?.desktop} />
          </ImageWrap>
        ) : null}
        <GridContainer container sx={styles?.gridContainer} spacing={spacing}>
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
      </Root>
    </ErrorBoundary>
  );
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

// const Background = styled(BackgroundImage, {
//   name:"Section",
//   slot: "BackgroundImage",
// })(() => ({
//   position: 'relative'
// }));

const ImageWrap = styled(Grid, {
  name: 'Section',
  slot: 'ImageWrap',
  overridesResolver: (_, styles) => ({
    ...styles.imageWrap
  })
})(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%'
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
