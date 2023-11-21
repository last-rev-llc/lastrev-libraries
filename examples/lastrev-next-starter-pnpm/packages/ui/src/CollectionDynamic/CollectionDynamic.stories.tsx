import React from 'react';

import Box from '@mui/material/Box';

import CollectionDynamic from './CollectionDynamic';
import Grid from '../Grid';

import { collectionDynamicBaseMock } from './CollectionDynamic.mock';
import { CollectionDynamicVariants } from './CollectionDynamic.types';
import { CardVariants } from '../Card/Card.types';

import { theme } from '../ThemeRegistry/theme';

export default {
  title: 'Components/CollectionDynamic',
  component: CollectionDynamic,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      table: {
        disable: true
      }
    }
  }
};

const CollectionDynamicTemplate = {
  render: ({
    variant,
    itemsVariant: argItemsVariant,
    ...args
  }: {
    variant: CollectionDynamicVariants;
    itemsVariant: CardVariants;
  }) => {
    if (argItemsVariant) {
      return <CollectionDynamic {...collectionDynamicBaseMock({ variant, itemsVariant: argItemsVariant })} />;
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
                backgroundColor: theme.vars.palette.primary.main,
                color: theme.vars.palette.primary.contrastText,
                ...theme.typography.display6,
                zIndex: 500,
                p: 1
              }}>
              CollectionDynamic &quot;{itemsVariant}&quot; Items Variant
            </Box>
            <Grid>
              <CollectionDynamic
                key={`${variant}_${itemsVariant}`}
                {...collectionDynamicBaseMock({ variant, itemsVariant })}
              />
            </Grid>
          </>
        ))}
      </div>
    );
  }
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = {
  ...CollectionDynamicTemplate,
  args: {
    variant: CollectionDynamicVariants.default
  }
};

export const OnePerRow = {
  ...CollectionDynamicTemplate,
  args: { variant: CollectionDynamicVariants.onePerRow }
};
export const TwoPerRow = {
  ...CollectionDynamicTemplate,
  args: { variant: CollectionDynamicVariants.twoPerRow }
};
export const ThreePerRow = {
  ...CollectionDynamicTemplate,
  args: { variant: CollectionDynamicVariants.threePerRow }
};
export const FourPerRow = {
  ...CollectionDynamicTemplate,
  args: { variant: CollectionDynamicVariants.fourPerRow }
};
export const FivePerRow = {
  ...CollectionDynamicTemplate,
  args: { variant: CollectionDynamicVariants.fivePerRow }
};
