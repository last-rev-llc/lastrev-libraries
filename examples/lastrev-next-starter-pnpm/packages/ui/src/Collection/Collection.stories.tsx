import React from 'react';

import Box from '@mui/material/Box';

import Collection from './Collection';
import Grid from '../Grid';

import { collectionBaseMock } from './Collection.mock';

import { CollectionVariants } from './Collection.types';
import { CardVariants } from '../Card/Card.types';

import theme from '../ThemeRegistry/theme';

export default {
  title: 'Components/Collection',
  component: Collection,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      table: {
        disable: true
      }
    }
  }
};

const CollectionTemplate = {
  render: ({
    variant,
    itemsVariant: argItemsVariant,
    ...args
  }: {
    variant: CollectionVariants;
    itemsVariant: CardVariants;
  }) => {
    if (argItemsVariant) {
      return <Collection {...collectionBaseMock({ variant, itemsVariant: argItemsVariant })} />;
    }
    const itemsVariants = Object.values(CardVariants).filter((v) => isNaN(Number(v)));
    return (
      <div>
        {itemsVariants?.map((itemsVariant: CardVariants) => (
          <>
            <Box
              key={itemsVariant}
              sx={{
                position: 'sticky',
                top: 0,
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                ...theme.typography.display6,
                zIndex: 500,
                p: 1
              }}>
              Collection &quot;{itemsVariant}&quot; Items Variant
            </Box>
            <Grid>
              <Collection key={`${variant}_${itemsVariant}`} {...collectionBaseMock({ variant, itemsVariant })} />
            </Grid>
          </>
        ))}
      </div>
    );
  }
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = {
  ...CollectionTemplate,
  args: {
    variant: CollectionVariants.default
  }
};

export const OnePerRow = {
  ...CollectionTemplate,
  args: { variant: CollectionVariants.onePerRow }
};
export const TwoPerRow = {
  ...CollectionTemplate,
  args: { variant: CollectionVariants.twoPerRow }
};
export const ThreePerRow = {
  ...CollectionTemplate,
  args: { variant: CollectionVariants.threePerRow }
};
export const FourPerRow = {
  ...CollectionTemplate,
  args: { variant: CollectionVariants.fourPerRow }
};
export const FivePerRow = {
  ...CollectionTemplate,
  args: { variant: CollectionVariants.fivePerRow }
};
