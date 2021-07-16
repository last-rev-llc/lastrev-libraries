import React from 'react';
import Box from '@material-ui/core/Box';
import styled from '@material-ui/system/styled';
import Grid from '@material-ui/core/Grid';
import { SystemCssProperties } from '@material-ui/system/styleFunctionSx';
import get from 'lodash/get';
// import BackgroundImage from '../BackgroundImage';
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

interface Props {
  contents: Array<{ __typename: string; id: string }>;
  background: Media;
  // Enables exposing inner `sx` prop through content
  styles?: {
    root?: SystemCssProperties;
    gridContainer?: SystemCssProperties & { spacing: any };
    gridItem?: Array<SystemCssProperties & { xs: any; sm: any; md: any }>;
  };
}

const Section = ({ contents, styles, background }: Props) => {
  const { spacing } = styles?.gridContainer ?? {};
  console.log('contents: ', contents);

  return (
    <Root sx={styles?.root}>
      {/* <Background {...media} /> */}
      {background ? (
        <Box>
          <Image {...background} />
        </Box>
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
