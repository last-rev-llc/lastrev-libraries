import type { API, FileInfo, Options, Collection, JSCodeshift } from 'jscodeshift';
import { GENERIC_TYPE_NAMES } from '../constants';

/**
 * Transform generic type usages to include <SanityDocument> parameter
 *
 * Transforms:
 * - CmsPathsGenerator -> CmsPathsGenerator<SanityDocument>
 * - ObjectBasedCmsPathsGenerator -> ObjectBasedCmsPathsGenerator<SanityDocument>
 * - loadPathsForContentFunction -> loadPathsForContentFunction<SanityDocument>
 * - PathEntries -> PathEntries<SanityDocument>
 *
 * Only transforms types that don't already have generic parameters.
 */
const transform = (file: FileInfo, api: API, _options: Options): string | null => {
  const j: JSCodeshift = api.jscodeshift;
  const root: Collection = j(file.source);
  let hasChanges = false;
  let needsSanityDocumentImport = false;

  // Find all type references that match our target types
  GENERIC_TYPE_NAMES.forEach((typeName) => {
    root
      .find(j.TSTypeReference, {
        typeName: {
          type: 'Identifier',
          name: typeName
        }
      })
      .forEach((path) => {
        // Skip if already has type parameters
        if (path.node.typeParameters && path.node.typeParameters.params.length > 0) {
          return;
        }

        // Add <SanityDocument> type parameter
        path.node.typeParameters = j.tsTypeParameterInstantiation([j.tsTypeReference(j.identifier('SanityDocument'))]);

        hasChanges = true;
        needsSanityDocumentImport = true;
      });
  });

  // If we made changes, ensure SanityDocument is imported
  if (needsSanityDocumentImport) {
    const lastRevImports = root.find(j.ImportDeclaration, {
      source: {
        value: '@last-rev/types'
      }
    });

    if (lastRevImports.length > 0) {
      // Check if SanityDocument is already imported
      let alreadyImported = false;
      lastRevImports.forEach((path) => {
        const specifiers = path.node.specifiers;
        if (!specifiers) return;

        specifiers.forEach((specifier) => {
          if (specifier.type !== 'ImportSpecifier') return;
          if (!specifier.imported || specifier.imported.type !== 'Identifier') return;
          if (specifier.imported.name === 'SanityDocument') {
            alreadyImported = true;
          }
        });
      });

      if (!alreadyImported) {
        // Add SanityDocument to existing import
        lastRevImports.forEach((path) => {
          const specifiers = path.node.specifiers || [];
          specifiers.push(j.importSpecifier(j.identifier('SanityDocument')));
          path.node.specifiers = specifiers;
        });
      }
    } else {
      // Add new import declaration for SanityDocument
      const newImport = j.importDeclaration(
        [j.importSpecifier(j.identifier('SanityDocument'))],
        j.literal('@last-rev/types')
      );

      // Insert at the top of the file after any existing imports
      const existingImports = root.find(j.ImportDeclaration);
      if (existingImports.length > 0) {
        existingImports.at(-1).insertAfter(newImport);
      } else {
        root.get().node.program.body.unshift(newImport);
      }
    }
  }

  if (!hasChanges) {
    return null;
  }

  return root.toSource({ quote: 'single' });
};

export default transform;
