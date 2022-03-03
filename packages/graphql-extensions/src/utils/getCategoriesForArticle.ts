import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import { ApolloContext } from '@last-rev/types';
import getPathUrl from './getPathUrl';

type AlgoliaCategoryMapping = {
  [id: string]: { name: string; breadCrumbName: string; href?: string; level: number; relativeIds: string[] };
};

const ROOT_CATEGORY_ID = '1d36wf7VTxu5K8BxjJHEY4';

const getAlgoliaCategoryMapping = (() => {
  let algoliaCategoriesByState: { [key: string]: AlgoliaCategoryMapping } = {};

  return async (ctx: ApolloContext): Promise<AlgoliaCategoryMapping> => {
    const state = ctx.preview ? 'preview' : 'prod';

    if (algoliaCategoriesByState[state]) {
      return algoliaCategoriesByState[state] as AlgoliaCategoryMapping;
    }

    const allCategories = await ctx.loaders.entriesByContentTypeLoader.load({
      id: 'categoryArticle',
      preview: !!ctx.preview
    });

    const categoriesById = allCategories.reduce((acc: any, category: any) => {
      acc[category.sys.id] = category;
      return acc;
    }, {});

    const result: AlgoliaCategoryMapping = {};

    const root = categoriesById[ROOT_CATEGORY_ID];

    if (!root) {
      algoliaCategoriesByState[state] = result;
      return result;
    }

    let stack: { category: any; prefix: string; level: number; relativeIds: string[] }[] = [
      { category: root, prefix: '', level: 0, relativeIds: [] }
    ];

    while (stack.length) {
      const { category, prefix, level, relativeIds } = stack.pop()!;
      const id = category?.sys?.id;
      const name = getLocalizedField(category?.fields, 'title', ctx);

      // don't add root category
      if (level > 0) {
        const url = await getPathUrl(category, ctx);

        if (id && name) {
          result[id] = { breadCrumbName: `${prefix}${name}`, name, href: url, level, relativeIds };
        }
      }
      const childrenIds = (getLocalizedField(category.fields, 'categoryItems', ctx) || []).map(
        (item: any) => item.sys.id
      );

      childrenIds.forEach((childId: any) => {
        const child = categoriesById[childId];
        if (child) {
          stack.push({
            category: child,
            prefix: level === 0 ? '' : `${prefix}${name} > `,
            level: level + 1,
            relativeIds: [...relativeIds, id]
          });
        }
      });
    }

    algoliaCategoriesByState[state] = result;
    return result;
  };
})();

type AlgoliaCategories = { [levelKey: string]: string[] };
type CategoryLink = { name: string; href: string };

const getCategoriesForArticle = async (
  article: any,
  ctx: ApolloContext
): Promise<{ categories: AlgoliaCategories; categoryLinks: CategoryLink[] }> => {
  const categoryIds: string[] = (getLocalizedField(article?.fields, 'categories', ctx) || []).map(
    (category: any) => category.sys.id
  );
  if (!categoryIds?.length) return { categories: {}, categoryLinks: [] };

  const categoryMapping = await getAlgoliaCategoryMapping(ctx);

  const categoryLinks = categoryIds
    .map((id) => {
      const category = categoryMapping[id];
      if (!category || !category.href) return null;
      return { name: category.name, href: category.href };
    })
    .filter((category) => !!category) as CategoryLink[];

  const categories = categoryIds.reduce((accum, categoryId) => {
    const categoryInfo = categoryMapping[categoryId];

    if (!categoryInfo) return accum;

    if (!accum[`level-${categoryInfo.level}`]) {
      accum[`level-${categoryInfo.level}`] = [];
    }

    if (!accum[`level-${categoryInfo.level}`].includes(categoryInfo.breadCrumbName)) {
      accum[`level-${categoryInfo.level}`].push(categoryInfo.breadCrumbName);
    }

    categoryInfo.relativeIds.forEach((relativeId: any) => {
      const relCategoryInfo = categoryMapping[relativeId];
      if (!relCategoryInfo) return;

      if (!accum[`level-${relCategoryInfo.level}`]) {
        accum[`level-${relCategoryInfo.level}`] = [];
      }

      if (!accum[`level-${relCategoryInfo.level}`].includes(relCategoryInfo.breadCrumbName)) {
        accum[`level-${relCategoryInfo.level}`].push(relCategoryInfo.breadCrumbName);
      }
    });

    return accum;
  }, {} as AlgoliaCategories);

  return { categories, categoryLinks };
};

export default getCategoriesForArticle;
