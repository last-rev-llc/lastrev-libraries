import type { API, FileInfo, Options, Collection, JSCodeshift } from 'jscodeshift';
import { TYPE_MAPPINGS } from '../constants';

/**
 * Transform type imports and annotations from Contentful-style to Sanity-native
 *
 * Transforms:
 * - Entry -> SanityDocument
 * - BaseEntry -> SanityDocument
 * - Asset -> SanityDocument
 * - BaseAsset -> SanityDocument
 * - ContentfulLoaders -> SanityLoaders
 * - CmsLoaders -> SanityLoaders
 */
const transform = (file: FileInfo, api: API, _options: Options): string | null => {
  const j: JSCodeshift = api.jscodeshift;
  const root: Collection = j(file.source);
  let hasChanges = false;

  // Track which new types we need to add to imports
  const newTypesNeeded = new Set<string>();
  const typesToRemove = new Set<string>();

  // Process import declarations from @last-rev/types
  root
    .find(j.ImportDeclaration, {
      source: {
        value: '@last-rev/types'
      }
    })
    .forEach((path) => {
      const specifiers = path.node.specifiers;
      if (!specifiers) return;

      specifiers.forEach((specifier) => {
        if (specifier.type !== 'ImportSpecifier') return;
        if (!specifier.imported || specifier.imported.type !== 'Identifier') return;

        const importedName = specifier.imported.name;

        // Check if this is a type we need to transform
        const mapping = TYPE_MAPPINGS.find((m) => m.old === importedName);
        if (mapping) {
          typesToRemove.add(importedName);
          newTypesNeeded.add(mapping.new);
          hasChanges = true;
        }
      });
    });

  // Update the import declaration
  if (typesToRemove.size > 0) {
    root
      .find(j.ImportDeclaration, {
        source: {
          value: '@last-rev/types'
        }
      })
      .forEach((path) => {
        const specifiers = path.node.specifiers;
        if (!specifiers) return;

        // Filter out old types and add new ones
        const newSpecifiers = specifiers.filter((specifier) => {
          if (specifier.type !== 'ImportSpecifier') return true;
          if (!specifier.imported || specifier.imported.type !== 'Identifier') return true;
          return !typesToRemove.has(specifier.imported.name);
        });

        // Add new type imports
        newTypesNeeded.forEach((typeName) => {
          // Check if it's already imported
          const alreadyImported = newSpecifiers.some(
            (s) =>
              s.type === 'ImportSpecifier' &&
              s.imported &&
              s.imported.type === 'Identifier' &&
              s.imported.name === typeName
          );

          if (!alreadyImported) {
            newSpecifiers.push(j.importSpecifier(j.identifier(typeName)));
          }
        });

        path.node.specifiers = newSpecifiers;
      });
  }

  // Transform type references in the code
  TYPE_MAPPINGS.forEach(({ old: oldType, new: newType }) => {
    // Transform type annotations (TSTypeReference)
    root
      .find(j.TSTypeReference, {
        typeName: {
          type: 'Identifier',
          name: oldType
        }
      })
      .forEach((path) => {
        if (path.node.typeName.type === 'Identifier') {
          path.node.typeName.name = newType;
          hasChanges = true;
        }
      });

    // Transform generic type parameters
    root
      .find(j.Identifier, {
        name: oldType
      })
      .forEach((path) => {
        // Only transform if it's in a type context
        const parent = path.parent;
        if (
          parent &&
          (parent.node.type === 'TSTypeReference' ||
            parent.node.type === 'TSTypeParameterInstantiation' ||
            parent.node.type === 'TSTypeAnnotation')
        ) {
          path.node.name = newType;
          hasChanges = true;
        }
      });
  });

  if (!hasChanges) {
    return null;
  }

  return root.toSource({ quote: 'single' });
};

export default transform;
