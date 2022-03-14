import { ApolloContext } from '@last-rev/types';
import { getDefaultFieldValue } from '@last-rev/graphql-contentful-core';

const ROOT_CATEGORY_ID = process.env.ROOT_CATEGORY_ID || '1d36wf7VTxu5K8BxjJHEY4';

const categoryArticleLevelResolver = async (categoryItem: any, _args: any, ctx: ApolloContext) => {
  const categoryItemId = categoryItem.sys.id;
  let categoryItemLevel: number = -1; // Default level in case not found in the logic below

  // Get all categories
  const allCategoriesArray = await ctx.loaders.entriesByContentTypeLoader.load({
    id: 'categoryArticle',
    preview: !!ctx.preview
  });

  // Create lookup by id for categories
  const allCategories = allCategoriesArray.reduce((aggr: any, category: any) => {
    aggr[category.sys.id] = category;
    return aggr;
  }, {});

  const rootCategory = allCategories[ROOT_CATEGORY_ID];

  if (!rootCategory) {
    return categoryItemLevel;
  } else {
    const rootCategories = getDefaultFieldValue(rootCategory, 'categoryItems', ctx.defaultLocale);

    firstLevelLoop: for (let level1CategoryRef of rootCategories) {
      const level1Category = allCategories[level1CategoryRef.sys.id];

      if (!level1Category) continue; // can't get content detail here

      if (level1Category?.sys?.id === categoryItemId) {
        categoryItemLevel = 1;
        break firstLevelLoop;
      }

      const level2Categories = getDefaultFieldValue(level1Category, 'categoryItems', ctx.defaultLocale);

      if (!level2Categories) continue;

      secondLevelLoop: for (let level2CategoryRef of level2Categories) {
        const level2Category = allCategories[level2CategoryRef.sys.id];

        if (!level2Category) continue; // can't get content detail here

        if (level2Category?.sys?.id === categoryItemId) {
          categoryItemLevel = 2;
          break firstLevelLoop; // found the exact child so breaking out of all loops
        }

        const level3Categories = getDefaultFieldValue(level2Category, 'categoryItems', ctx.defaultLocale);
        if (!level3Categories) continue; // no child categories so no need to go through loop anymore

        for (let level3CategoryRef of level3Categories) {
          const level3Category = allCategories[level3CategoryRef.sys.id];

          if (level3Category && level3Category.sys.id === categoryItemId) {
            categoryItemLevel = 3;
            break firstLevelLoop; // found the exact child so breaking out of all loops
          }
        }
      }
    }
  }

  return categoryItemLevel;
};

export default categoryArticleLevelResolver;
