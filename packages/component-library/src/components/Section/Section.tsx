import React from 'react';
import { styled } from '@material-ui/system';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { SystemCssProperties } from '@material-ui/system/styleFunctionSx';
import get from 'lodash/get';
// import BackgroundImage from '../BackgroundImage';
import ContentModule from '../ContentModule';

interface Image {
  src: string;
}
interface Media {
  desktop: Image;
  tablet?: Image;
  mobile?: Image;
}

interface Props {
  contents: Array<{ __typename: string; id: string }>;
  background: Media;
  // Enables exposing inner `sx` prop through content
  styles?: {
    root?: SystemCssProperties;
    gridContainer?: SystemCssProperties;
    gridItem?: Array<SystemCssProperties>;
  };
}

const Section = ({ contents, styles }: Props) => {
  return (
    <Root sx={styles?.root}>
      {/* <Background {...media} /> */}
      <GridContainer container sx={styles?.gridContainer}>
        {contents?.map((content, idx) => (
          <GridItem item key={content?.id} sx={get(styles?.gridItem, idx)}>
            <ContentModule {...content} />
          </GridItem>
        ))}
      </GridContainer>
    </Root>
  );
};

// Define the pieces of the Section customizable through Theme

const Root = styled(Box, {
  name: 'Section',
  slot: 'Root',
  overridesResolver: (_, styles) => ({
    ...styles.root
  })
})(() => ({}));

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
