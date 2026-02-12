import type { API, FileInfo, Options, Collection, JSCodeshift, MemberExpression } from 'jscodeshift';
import { LOADER_MAPPINGS, REMOVED_METHODS } from '../constants';

/**
 * Transform loader API calls from Contentful-style to Sanity-native
 *
 * Transforms:
 * - ctx.loaders.entryLoader -> ctx.sanityLoaders.documentLoader
 * - ctx.loaders.assetLoader -> ctx.sanityLoaders.documentLoader
 * - ctx.loaders.entriesByContentTypeLoader -> ctx.sanityLoaders.documentsByTypeLoader
 * - ctx.loaders.entryByFieldValueLoader -> ctx.sanityLoaders.documentByFieldValueLoader
 * - ctx.loaders.entriesRefByLoader -> ctx.sanityLoaders.documentsRefByLoader
 * - fetchAllContentTypes() -> Removed with TODO comment
 */
const transform = (file: FileInfo, api: API, _options: Options): string | null => {
  const j: JSCodeshift = api.jscodeshift;
  const root: Collection = j(file.source);
  let hasChanges = false;

  // Transform loader property accesses
  LOADER_MAPPINGS.forEach(({ old: oldName, new: newName }) => {
    // Find all member expressions that end with the old loader name
    root
      .find(j.MemberExpression, {
        property: {
          type: 'Identifier',
          name: oldName
        }
      })
      .forEach((path) => {
        const node = path.node as MemberExpression;

        // Check if the object is a loaders access (e.g., ctx.loaders, loaders, context.loaders)
        if (isLoadersAccess(j, node.object)) {
          // Rename the property
          if (node.property.type === 'Identifier') {
            node.property.name = newName;
            hasChanges = true;
          }

          // Also rename the object from .loaders to .sanityLoaders
          renameLoadersObject(j, node);
        }
      });
  });

  // Handle fetchAllContentTypes removal
  REMOVED_METHODS.forEach((methodName) => {
    root
      .find(j.CallExpression, {
        callee: {
          type: 'MemberExpression',
          property: {
            type: 'Identifier',
            name: methodName
          }
        }
      })
      .forEach((path) => {
        // Add a TODO comment before the statement
        const statement = path.parent;
        if (statement && statement.node) {
          const comment = j.commentLine(
            ' TODO: fetchAllContentTypes removed - use config.sanity.schemaTypes instead',
            true,
            false
          );

          // Try to add comment to the containing statement
          if (statement.node.comments) {
            statement.node.comments.push(comment);
          } else {
            statement.node.comments = [comment];
          }
          hasChanges = true;
        }
      });
  });

  if (!hasChanges) {
    return null;
  }

  return root.toSource({ quote: 'single' });
};

/**
 * Check if a node is a loaders access (ctx.loaders, loaders, context.loaders)
 */
function isLoadersAccess(_j: JSCodeshift, node: any): boolean {
  // Direct identifier 'loaders'
  if (node.type === 'Identifier' && node.name === 'loaders') {
    return true;
  }

  // Member expression like ctx.loaders or context.loaders
  if (node.type === 'MemberExpression') {
    const memberExpr = node as MemberExpression;
    if (memberExpr.property.type === 'Identifier' && memberExpr.property.name === 'loaders') {
      return true;
    }
  }

  return false;
}

/**
 * Rename the loaders object to sanityLoaders
 */
function renameLoadersObject(_j: JSCodeshift, node: MemberExpression): void {
  const obj = node.object;

  // If object is direct 'loaders' identifier
  if (obj.type === 'Identifier' && obj.name === 'loaders') {
    obj.name = 'sanityLoaders';
    return;
  }

  // If object is member expression like ctx.loaders
  if (obj.type === 'MemberExpression') {
    const memberObj = obj as MemberExpression;
    if (memberObj.property.type === 'Identifier' && memberObj.property.name === 'loaders') {
      memberObj.property.name = 'sanityLoaders';
    }
  }
}

export default transform;
