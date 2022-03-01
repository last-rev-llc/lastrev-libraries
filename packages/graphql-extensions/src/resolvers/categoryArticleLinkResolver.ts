import { ApolloContext } from '@last-rev/types';
import { getDefaultFieldValue } from '@last-rev/graphql-contentful-core';
import createPath from '../utils/createPath';

const ROOT_CATEGORY_ID = process.env.ROOT_CATEGORY_ID || '1d36wf7VTxu5K8BxjJHEY4';

const categoryArticleLinkResolver = async (categoryItem: any, _args: any, ctx: ApolloContext) => {
  const categoryItemId = categoryItem.sys.id;
  const categoryItemSlug = getDefaultFieldValue(categoryItem, 'slug', ctx.defaultLocale);
  let categoryItemPath: Array<string> = []; // root path for all category articles

  const allCategoriesArray = await ctx.loaders.entriesByContentTypeLoader.load({
    id: 'categoryArticle',
    preview: !!ctx.preview
  });

  const allCategories = allCategoriesArray.reduce((aggr: any, category: any) => {
    aggr[category.sys.id] = category;
    return aggr;
  }, {});

  const rootCategory = allCategories[ROOT_CATEGORY_ID];

  if (!rootCategory) {
    categoryItemPath.push(categoryItemSlug);
  } else {
    const rootCategories = getDefaultFieldValue(rootCategory, 'categoryItems', ctx.defaultLocale);

    firstLevelLoop: for (let level1CategoryRef of rootCategories) {
      const level1Category = allCategories[level1CategoryRef.sys.id];

      if (!level1Category) continue; // can't get content detail here

      if (level1Category?.sys?.id === categoryItemId) {
        categoryItemPath.push(categoryItemSlug);
        break firstLevelLoop;
      }

      const level2Categories = getDefaultFieldValue(level1Category, 'categoryItems', ctx.defaultLocale);

      if (!level2Categories) continue;

      secondLevelLoop: for (let level2CategoryRef of level2Categories) {
        const level2Category = allCategories[level2CategoryRef.sys.id];

        if (!level2Category) continue; // can't get content detail here

        if (level2Category?.sys?.id === categoryItemId) {
          categoryItemPath.push(getDefaultFieldValue(level1Category, 'slug', ctx.defaultLocale));
          categoryItemPath.push(categoryItemSlug);
          break firstLevelLoop; // found the exact child so breaking out of all loops
        }

        const level3Categories = getDefaultFieldValue(level2Category, 'categoryItems', ctx.defaultLocale);
        if (!level3Categories) continue; // no child categories so no need to go through loop anymore

        for (let level3CategoryRef of level3Categories) {
          const level3Category = allCategories[level3CategoryRef.sys.id];

          if (level3Category && level3Category.sys.id === categoryItemId) {
            categoryItemPath.push(getDefaultFieldValue(level1Category, 'slug', ctx.defaultLocale));
            categoryItemPath.push(getDefaultFieldValue(level2Category, 'slug', ctx.defaultLocale));
            categoryItemPath.push(categoryItemSlug);
            break firstLevelLoop; // found the exact child so breaking out of all loops
          }
        }
      }
    }
  }

  const path = await createPath('topics', categoryItemPath.join('/'));

  return path;
};

export default categoryArticleLinkResolver;
