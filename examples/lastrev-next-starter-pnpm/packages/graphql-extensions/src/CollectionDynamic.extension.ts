import gql from 'graphql-tag';
import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import type { Mappers } from '@last-rev/types';
import type { ApolloContext } from './types';

import { pascalCase } from './utils/pascalCase';
import { collectOptions } from './utils/collectOptions';
// import { queryContentful } from './utils/queryContentful';
import { getWinstonLogger } from '@last-rev/logging';
import { defaultResolver } from './utils/defaultResolver';

const logger = getWinstonLogger({
  package: 'graphql-contentful-extensions',
  module: 'CollectionDynamic'
});

// Note: If you want anything other than the below, this is where you will add it
const COLLECTION_DYNAMIC_ITEM_TYPES = ['Card'];

export const typeDefs = gql`
  extend type CollectionDynamic {
    items: [CollectionDynamicItem]
    introText: Text
    itemsConnection(limit: Int, offset: Int, filter: CollectionDynamicFilterInput): CollectionDynamicItemConnection
    backgroundImage: Media
    isCarouselDesktop: Boolean
    isCarouselTablet: Boolean
    isCarouselMobile: Boolean
    itemsPerRow: Int
    numItems: Int,
    algoliaSettings: JSON
  }

  type CollectionDynamicOptions {
    tags: [CollectionDynamicOption]
    topics: [CollectionDynamicOption]
    sector: [CollectionDynamicOption]
  }

  type CollectionDynamicOption {
    label: String
    value: String
  }
  
  type CollectionDynamicConnectionPageInfo {
    options: CollectionDynamicOptions
    allOptions: CollectionDynamicOptions
    total: Int
  }

  type CollectionDynamicItemConnection {
    pageInfo: CollectionDynamicConnectionPageInfo
    items: [CollectionDynamicItem]
  }

  input CollectionDynamicFilterInput {
    topics: [String]
    tags: [String]
    sector: [String]
    body: String
  }

  union CollectionDynamicItem = ${COLLECTION_DYNAMIC_ITEM_TYPES.join('| ')}
`;

interface ItemsConnectionArgs {
  limit?: number;
  offset?: number;
  filter?: any;
}

interface CollectionDynamicSettings {
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
  CollectionDynamic: {
    CollectionDynamic: {
      algoliaSettings: async (collection: any, args: any, ctx: ApolloContext) => {
        return {
          indexName: 'articles',
          showCurrentRefinements: true,
          useInfiniteHits: false,
          showPagination: false,
          showSearchBox: true,
          searchAsYouType: false,
          showFilters: true,
          filters: [
            {
              type: 'hierarchialMenu',
              limit: 100,
              attributes: ['categories.level-1', 'categories.level-2', 'categories.level-3']
            }
          ],
          configure: {
            hitsPerPage: 4,
            filters: `locale:"en-US"`
          },
          initialUiState: {
            query: 'viewability',

            hierarchicalMenu: {
              'categories.level-1': ['Advertiser + Agency Solutions']
            }
          }
        };
      },
      items: async (collection: any, args: any, ctx: ApolloContext) => {
        let items = getLocalizedField(collection.fields, 'items', ctx) ?? [];

        const itemsVariantFn = defaultResolver('itemsVariant');
        const itemsVariant = itemsVariantFn(collection, args, ctx);

        // try {
        //   const { contentType, limit, offset, order, filter } =
        //     (getLocalizedField(collection.fields, 'settings', ctx) as CollectionDynamicSettings) || {};
        //   if (contentType) {
        //     // items = await queryContentful({ contentType, ctx, order, filter, limit, skip: offset });
        //     // items = await ctx.loaders.entryLoader.loadMany(
        //     //   queryItems?.map((x: any) => ({ id: x?.sys?.id, preview: !!ctx.preview }))
        //     // );
        //   }
        // } catch (error: any) {
        //   logger.error(error.message, {
        //     caller: 'Collection.items',
        //     stack: error.stack
        //   });
        // }
        // if (!!items?.length) {
        //   items = await ctx.loaders.entryLoader.loadMany(
        //     items.map((x: any) => ({ id: x?.sys?.id, preview: !!ctx.preview }))
        //   );
        // }
        const returnItems = items?.map((x: any) => ({ ...x, variant: itemsVariant }));

        return returnItems;
      },

      isCarouselDesktop: async (collectionDynamic: any, _args: any, ctx: ApolloContext) => {
        let carouselBreakpoints = getLocalizedField(collectionDynamic.fields, 'carouselBreakpoints', ctx) ?? [];
        return carouselBreakpoints.includes('Desktop');
      },

      isCarouselTablet: async (collectionDynamic: any, _args: any, ctx: ApolloContext) => {
        let carouselBreakpoints = getLocalizedField(collectionDynamic.fields, 'carouselBreakpoints', ctx) ?? [];
        return carouselBreakpoints.includes('Tablet');
      },

      isCarouselMobile: async (collectionDynamic: any, _args: any, ctx: ApolloContext) => {
        let carouselBreakpoints = getLocalizedField(collectionDynamic.fields, 'carouselBreakpoints', ctx) ?? [];
        return carouselBreakpoints.includes('Mobile');
      },

      numItems: async (collectionDynamic: any, args: any, ctx: ApolloContext) => {
        let items = getLocalizedField(collectionDynamic.fields, 'items', ctx) ?? [];
        return items.length;
      },

      itemsPerRow: async (collectionDynamic: any, args: any, ctx: ApolloContext) => {
        const variantFn = defaultResolver('variant');
        const variant = variantFn(collectionDynamic, args, ctx);
        let items = getLocalizedField(collectionDynamic.fields, 'items', ctx) ?? [];
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

      variant: async (collectionDynamic: any, args: any, ctx: ApolloContext) => {
        let carouselBreakpoints = getLocalizedField(collectionDynamic.fields, 'carouselBreakpoints', ctx) ?? [];

        const variantFn = defaultResolver('variant');
        const variant = variantFn(collectionDynamic, args, ctx);

        if (!!carouselBreakpoints.length) return `${variant}Carousel`;

        return variant;
      },

      itemsConnection: async (collection: any, { limit, offset, filter }: ItemsConnectionArgs, ctx: ApolloContext) => {
        let items = getLocalizedField(collection.fields, 'items', ctx) ?? [];

        // try {
        //   const { contentType, filters } =
        //     (getLocalizedField(collection.fields, 'settings', ctx) as CollectionDynamicSettings) || {};
        //   // Get all possible items from Contentful
        //   // Need all to generate the possible options for all items. Not just the current page.
        //   if (contentType) {
        //     items = await queryContentful({ contentType, filters, filter, ctx });
        //     const allItems = await ctx.loaders.entriesByContentTypeLoader.load({
        //       id: contentType,
        //       preview: !!ctx.preview
        //     });
        //     // const options = await collectOptions({ filters, items, ctx });
        //     const options = {};
        //     const allOptions = await collectOptions({ filters, items: allItems, ctx });
        //     console.log({ filters, allItems, allOptions });

        //     // Paginate results
        //     if (offset || limit) {
        //       items = items?.slice(offset ?? 0, (offset ?? 0) + (limit ?? items?.length));
        //     }

        //     if (!!items?.length) {
        //       items = await ctx.loaders.entryLoader.loadMany(
        //         items.map((x: any) => ({ id: x?.sys?.id, preview: !!ctx.preview }))
        //       );
        //     }
        //     const itemsVariant = getLocalizedField(collection.fields, 'itemsVariant', ctx) ?? [];
        //     const fullItemsWithVariant = items?.map((x: any) => ({ ...x, variant: itemsVariant }));

        //     return {
        //       pageInfo: {
        //         options,
        //         allOptions
        //       },
        //       items: fullItemsWithVariant
        //     };
        //   }
        // } catch (error: any) {
        //   logger.error(error.message, {
        //     caller: 'Collection.itemsConnection',
        //     stack: error.stack
        //   });
        // }

        return items;
      }
    }
  }
};

// TODO: support variant for resolving the CollectionDynamicItem type
const ITEM_MAPPING: { [key: string]: string } = {
  Page: 'Card',
  Blog: 'Card',
  Media: 'Card',
  Person: 'Card',
  PageProperty: 'Card'
};

export const resolvers = {
  CollectionDynamicItem: {
    __resolveType: (item: any) => {
      const type =
        ITEM_MAPPING[pascalCase(item?.sys?.contentType?.sys?.id) ?? ''] ?? pascalCase(item?.sys?.contentType?.sys?.id);

      if (COLLECTION_DYNAMIC_ITEM_TYPES.includes(type)) return type;

      return 'Card';
    }
  }
};
