import gql from 'graphql-tag';
import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import type { Mappers } from '@last-rev/types';
import type { ApolloContext } from './types';

import { pascalCase } from './utils/pascalCase';
import { getWinstonLogger } from '@last-rev/logging';
import { defaultResolver } from './utils/defaultResolver';
import { createType } from './utils/createType';

const logger = getWinstonLogger({
  package: 'graphql-contentful-extensions',
  module: 'Collection'
});

// Note: If you want anything other than the below, this is where you will add it
const COLLECTION_ITEM_TYPES = ['Card'];

export const typeDefs = gql`
  extend type Collection {
    items: [CollectionItem]
    introText: Text
    itemsConnection(limit: Int, offset: Int, filter: CollectionFilterInput): CollectionItemConnection
    backgroundImage: Media
    isCarouselDesktop: Boolean
    isCarouselTablet: Boolean
    isCarouselMobile: Boolean
    itemsPerRow: Int
    numItems: Int,
    algoliaSettings: JSON
  }


  type CollectionOptions {
    tags: [Option]
    topics: [Option]
    sector: [Option]
  }

  type Option {
    label: String
    value: String
  }
  
  type ConnectionPageInfo {
    options: CollectionOptions
    allOptions: CollectionOptions
    total: Int
  }

  type CollectionItemConnection {
    pageInfo: ConnectionPageInfo
    items: [CollectionItem]
  }

  input CollectionFilterInput {
    topics: [String]
    tags: [String]
    sector: [String]
    body: String
  }

  union CollectionItem = ${COLLECTION_ITEM_TYPES.join('| ')}
`;

interface ItemsConnectionArgs {
  limit?: number;
  offset?: number;
  filter?: any;
}

interface CollectionSettings {
  contentType: string;
  limit?: number;
  offset?: number;
  filter?: any;
  order?: string;
  filters: Array<{
    id: string;
    key: string;
  }>;
}

export const mappers: Mappers = {
  Collection: {
    Collection: {
      items: async (collection: any, args: any, ctx: ApolloContext) => {
        let items = getLocalizedField(collection.fields, 'items', ctx) ?? [];
        let imageItemsRef = getLocalizedField(collection.fields, 'images', ctx) ?? [];
        const imageItems =
          imageItemsRef?.length &&
          (
            await ctx.loaders.assetLoader.loadMany(
              imageItemsRef.map((x: any) => ({ id: x.sys.id, preview: !!ctx.preview }))
            )
          )
            .filter((r) => r !== null)
            .map((asset: any) => createType('Media', { asset }));
        const finalItems = (items || []).concat(imageItems || []);

        return finalItems;
      },

      isCarouselDesktop: async (collection: any, _args: any, ctx: ApolloContext) => {
        let carouselBreakpoints = getLocalizedField(collection.fields, 'carouselBreakpoints', ctx) ?? [];
        return carouselBreakpoints.includes('Desktop');
      },

      isCarouselTablet: async (collection: any, _args: any, ctx: ApolloContext) => {
        let carouselBreakpoints = getLocalizedField(collection.fields, 'carouselBreakpoints', ctx) ?? [];
        return carouselBreakpoints.includes('Tablet');
      },

      isCarouselMobile: async (collection: any, _args: any, ctx: ApolloContext) => {
        let carouselBreakpoints = getLocalizedField(collection.fields, 'carouselBreakpoints', ctx) ?? [];
        return carouselBreakpoints.includes('Mobile');
      },

      numItems: async (collection: any, args: any, ctx: ApolloContext) => {
        let items = getLocalizedField(collection.fields, 'items', ctx) ?? [];
        return items.length;
      },

      itemsPerRow: async (collection: any, args: any, ctx: ApolloContext) => {
        const variantFn = defaultResolver('variant');
        const variant = variantFn(collection, args, ctx);
        let items = getLocalizedField(collection.fields, 'items', ctx) ?? [];
        let itemsPerRow = 3;
        const numItems = items?.length ?? 3;

        switch (variant) {
          case 'onePerRow':
            itemsPerRow = 1;
            break;

          case 'twoPerRow':
            itemsPerRow = numItems >= 2 ? 2 : numItems;
            break;

          case 'threePerRow':
            itemsPerRow = numItems >= 3 ? 3 : numItems;
            break;

          case 'fourPerRow':
            itemsPerRow = numItems >= 4 ? 4 : numItems;
            break;

          case 'fivePerRow':
            itemsPerRow = numItems >= 5 ? 5 : numItems;
            break;

          default:
            itemsPerRow = 3;
        }

        return itemsPerRow;
      },

      itemsVariant: defaultResolver('itemsVariant'),

      itemsAspectRatio: defaultResolver('itemsAspectRatio'),

      variant: async (collection: any, args: any, ctx: ApolloContext) => {
        let carouselBreakpoints = getLocalizedField(collection.fields, 'carouselBreakpoints', ctx) ?? [];

        const variantFn = defaultResolver('variant');
        const variant = variantFn(collection, args, ctx);

        if (!!carouselBreakpoints.length) return `${variant}Carousel`;

        return variant;
      }
    }
  }
};

// TODO: support variant for resolving the CollectionItem type
const ITEM_MAPPING: { [key: string]: string } = {
  Page: 'Card',
  Blog: 'Card',
  PageAsset: 'Card',
  Media: 'Card',
  Person: 'Card',
  PageProperty: 'Card'
};

export const resolvers = {
  CollectionItem: {
    __resolveType: (item: any) => {
      const type =
        ITEM_MAPPING[pascalCase(item?.sys?.contentType?.sys?.id) ?? ''] ?? pascalCase(item?.sys?.contentType?.sys?.id);

      if (COLLECTION_ITEM_TYPES.includes(type)) return type;

      return 'Card';
    }
  }
};
