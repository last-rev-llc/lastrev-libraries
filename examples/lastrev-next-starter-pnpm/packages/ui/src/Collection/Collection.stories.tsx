import React from 'react';
import Collection from './Collection';
import { collectionBaseMock } from './Collection.mock';
import type { CollectionProps, CollectionVariants } from './Collection.types';
import type { CardVariants } from '../Card/Card.types';

export default {
  title: '3. Modules/Collection',
  component: Collection,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],

  argTypes: {
    variant: {
      table: {
        disable: true
      }
      // name: 'LayoutStyle',
      // control: {
      //   type: 'select',
      //   options: ['onePerRow', 'twoPerRow', 'threePerRow', 'fourPerRow']
      // }
    }
    // background: { name: 'Background' }
  }
};

const CollectionTemplate = {
  render: ({ variant, itemsVariant: argItemsVariant, ...args }: { variant: CollectionVariants }) => {
    if (argItemsVariant) {
      return <Collection {...collectionBaseMock({ variant, itemsVariant: argItemsVariant })} />;
    }
    const itemsVariants = Object.values(CardVariants).filter((v) => isNaN(Number(v)));
    return (
      <div>
        {itemsVariants?.map((itemsVariant: CardVariants) => (
          <>
            ## {itemsVariant}
            <Collection key={`${variant}_${itemsVariant}`} {...collectionBaseMock({ variant, itemsVariant })} />
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
