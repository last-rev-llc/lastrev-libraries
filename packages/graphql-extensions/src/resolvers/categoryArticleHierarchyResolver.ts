import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import { ApolloContext } from '@last-rev/types';
import getCategoryArticleLevelOneResolver from './getCategoryArticleLevelOneResolver';

// Loops through category hierarchy tree to find the Level 1 category for any given category
// Opted to not use path reader to future proof changes to how paths are generated.
const categoryArticleHierarchyResolver = async (category: any, _args: any, ctx: ApolloContext) => {
    const topLevelCategory = await getCategoryArticleLevelOneResolver(category, _args, ctx);
    
    if (!topLevelCategory) return null;

    const childCategoriesRef = getLocalizedField(topLevelCategory.fields, 'categoryItems', ctx);

    if (!childCategoriesRef) return null;

    const childIds = childCategoriesRef.map((content: any) => {
      return { id: content?.sys.id, preview: !!ctx.preview };
    });

    const subCategoriesRef = await ctx.loaders.entryLoader.loadMany(childIds);

    if (!subCategoriesRef) return null;

    return subCategoriesRef;
};

export default categoryArticleHierarchyResolver;
