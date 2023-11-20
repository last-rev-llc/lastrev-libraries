import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import type { ApolloContext } from '@last-rev/types';
import { collectOptions } from './collectOptions';
import { queryContentful } from './queryContentful';
import { ItemsConnectionArgs, CollectionSettings, logger } from '../Collection.extension';

export const collectionItemsResolver = async (
  _: any,
  { id, locale, settings: querySettings = {}, preview, limit, offset, filter }: ItemsConnectionArgs,
  ctx: ApolloContext
) => {
  ctx.locale = locale;
  ctx.preview = preview;
  const collection = id ? await ctx.loaders.entryLoader.load({ id, preview: !!preview }) : null;
  let items = getLocalizedField(collection?.fields, 'items', ctx) ?? [];
  try {
    const {
      contentType,
      filters,
      order,
      filter: settingsFilter
    } = (getLocalizedField(collection?.fields, 'settings', ctx) as CollectionSettings) || querySettings;
    // Get all possible items from Contentful
    // Need all to generate the possible options for all items. Not just the current page.
    console.log('CollectionItems', {
      id,
      locale,
      querySettings,
      preview,
      limit,
      offset,
      settingsFilter,
      filter,
      filters
    });

    if (contentType) {
      const matchingItems = await queryContentful({
        contentType,
        filters,
        order,
        // limit,
        // offset,
        filter: { ...{ ...settingsFilter, ...filter } },
        ctx
      });

      // const allItems = await ctx.loaders.entriesByContentTypeLoader.load({
      //   id: contentType,
      //   preview: !!ctx.preview
      // });
      // const allOptions = await collectOptions({ filters, items: allItems, ctx });
      // Paginate results
      items = matchingItems;

      if (items?.length) {
        items = await ctx.loaders.entryLoader.loadMany(
          items.map((x: any) => ({ id: x?.sys?.id, preview: !!ctx.preview }))
        );
      }

      const options = await collectOptions({ filters, items, ctx });

      if (offset || limit) {
        items = items?.slice(offset ?? 0, (offset ?? 0) + (limit ?? items?.length));
      }
      console.log('Pagination');
      console.log(items);

      const itemsVariant = getLocalizedField(collection?.fields, 'itemsVariant', ctx) ?? [];
      const fullItemsWithVariant = items?.map((x: any) => ({ ...x, variant: itemsVariant }));
      console.log(fullItemsWithVariant);
      return {
        pageInfo: {
          total: matchingItems?.length,
          options
          // allOptions
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
};
