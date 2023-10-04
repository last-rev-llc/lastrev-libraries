import gql from 'graphql-tag';
import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import type { ApolloContext, Mappers } from '@last-rev/types';

import { pascalCase } from './utils/pascalCase';
import { collectOptions } from './utils/collectOptions';
import { queryContentful } from './utils/queryContentful';
import { getWinstonLogger } from '@last-rev/logging';

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
  }

  type CollectionOptions {
    tags: [Option]
    topics: [Option]
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
      items: async (collection: any, _args: any, ctx: ApolloContext) => {
        let items = getLocalizedField(collection.fields, 'items', ctx) ?? [];
        const itemsVariant = getLocalizedField(collection.fields, 'itemsVariant', ctx) ?? [];
        try {
          const { contentType, limit, offset, order, filter } =
            (getLocalizedField(collection.fields, 'settings', ctx) as CollectionSettings) || {};
          if (contentType) {
            items = await queryContentful({ contentType, ctx, order, filter, limit, skip: offset });

            return ctx.loaders.entryLoader.loadMany(
              items?.map((x: any) => ({ id: x?.sys?.id, preview: !!ctx.preview }))
            );
          }
        } catch (error: any) {
          logger.error(error.message, {
            caller: 'Collection.items',
            stack: error.stack
          });
        }

        const returnItems = items?.map((x: any) => ({ ...x, variant: itemsVariant }));

        return returnItems;
      },

      itemsConnection: async (collection: any, { limit, offset, filter }: ItemsConnectionArgs, ctx: ApolloContext) => {
        let items = getLocalizedField(collection.fields, 'items', ctx) ?? [];
        try {
          const { contentType, filters } =
            (getLocalizedField(collection.fields, 'settings', ctx) as CollectionSettings) || {};
          // Get all possible items from Contentful
          // Need all to generate the possible options for all items. Not just the current page.
          if (contentType) {
            items = await queryContentful({ contentType, filters, filter, ctx });
            const allItems = await ctx.loaders.entriesByContentTypeLoader.load({
              id: contentType,
              preview: !!ctx.preview
            });
            // const options = await collectOptions({ filters, items, ctx });
            const options = {};
            const allOptions = await collectOptions({ filters, items: allItems, ctx });

            // Paginate results
            if (offset || limit) {
              items = items?.slice(offset ?? 0, (offset ?? 0) + (limit ?? items?.length));
            }

            let fullItemsWithVariant = [];

            if (!!items?.length) {
              const itemsVariant = getLocalizedField(collection.fields, 'itemsVariant', ctx) ?? [];

              const fullItems = await ctx.loaders.entryLoader.loadMany(
                items.map((x: any) => ({ id: x?.sys?.id, preview: !!ctx.preview }))
              );

              fullItemsWithVariant = fullItems?.map((x: any) => ({ ...x, variant: itemsVariant }));
            }

            return {
              pageInfo: {
                options,
                allOptions
              },
              items: fullItemsWithVariant
            };
          }
        } catch (error: any) {
          logger.error(error.message, {
            caller: 'Collection.itemsConnection',
            stack: error.stack
          });
        }

        return items;
      }
    }
  }
};

// TODO: support variant for resolving the CollectionItem type
const ITEM_MAPPING: { [key: string]: string } = {
  Page: 'Card',
  Blog: 'Card',
  Media: 'Card',
  Person: 'Card'
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
