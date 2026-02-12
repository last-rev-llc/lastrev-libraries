import type { API, FileInfo, Options, Collection, JSCodeshift } from 'jscodeshift';
import { SANITY_MAPPER_PACKAGE } from '../constants';

/**
 * Remove usage of @last-rev/sanity-mapper
 *
 * Transforms:
 * - Removes import { convertSanityDoc, ... } from '@last-rev/sanity-mapper'
 * - Replaces convertSanityDoc(doc) with doc (use native format)
 * - Replaces mapSanityTypesToContentfulTypes(types) with types
 * - Removes processTranslations() calls
 */
const transform = (file: FileInfo, api: API, _options: Options): string | null => {
  const j: JSCodeshift = api.jscodeshift;
  const root: Collection = j(file.source);
  let hasChanges = false;

  // Track which functions are imported from sanity-mapper
  const importedFunctions = new Set<string>();

  // Find and remove imports from @last-rev/sanity-mapper
  root
    .find(j.ImportDeclaration, {
      source: {
        value: SANITY_MAPPER_PACKAGE
      }
    })
    .forEach((path) => {
      const specifiers = path.node.specifiers;
      if (specifiers) {
        specifiers.forEach((specifier) => {
          if (specifier.type === 'ImportSpecifier') {
            if (specifier.imported && specifier.imported.type === 'Identifier') {
              importedFunctions.add(specifier.imported.name);
              // Also track the local name if aliased
              if (specifier.local && specifier.local.type === 'Identifier') {
                importedFunctions.add(specifier.local.name);
              }
            }
          }
        });
      }

      // Remove the entire import declaration
      j(path).remove();
      hasChanges = true;
    });

  // Replace convertSanityDoc(doc) with just doc
  root.find(j.CallExpression).forEach((path) => {
    const callee = path.node.callee;

    if (callee.type === 'Identifier' && importedFunctions.has(callee.name)) {
      const funcName = callee.name;

      // For convertSanityDoc and mapSanityTypesToContentfulTypes, replace with the first argument
      if (funcName === 'convertSanityDoc' || funcName === 'mapSanityTypesToContentfulTypes') {
        const args = path.node.arguments;
        if (args.length > 0) {
          // Replace the call expression with just the first argument
          j(path).replaceWith(args[0]);
          hasChanges = true;
        }
      }

      // For processTranslations, remove the call entirely or replace with the document
      if (funcName === 'processTranslations') {
        const args = path.node.arguments;
        if (args.length > 0) {
          // Replace with the first argument (the document)
          j(path).replaceWith(args[0]);
          hasChanges = true;
        } else {
          // If no arguments, add a comment
          const parent = path.parent;
          if (parent && parent.node) {
            const comment = j.commentLine(' TODO: processTranslations removed - i18n is now field-level', true, false);
            if (parent.node.comments) {
              parent.node.comments.push(comment);
            } else {
              parent.node.comments = [comment];
            }
          }
        }
      }
    }
  });

  // Also handle cases where functions are called via member expressions
  // e.g., sanityMapper.convertSanityDoc(doc)
  root.find(j.CallExpression).forEach((path) => {
    const callee = path.node.callee;

    if (callee.type === 'MemberExpression') {
      const property = callee.property;
      if (property.type === 'Identifier') {
        const methodName = property.name;

        if (methodName === 'convertSanityDoc' || methodName === 'mapSanityTypesToContentfulTypes') {
          const args = path.node.arguments;
          if (args.length > 0) {
            j(path).replaceWith(args[0]);
            hasChanges = true;
          }
        }

        if (methodName === 'processTranslations') {
          const args = path.node.arguments;
          if (args.length > 0) {
            j(path).replaceWith(args[0]);
            hasChanges = true;
          }
        }
      }
    }
  });

  // Remove require('@last-rev/sanity-mapper')
  root
    .find(j.CallExpression, {
      callee: {
        type: 'Identifier',
        name: 'require'
      }
    })
    .forEach((path) => {
      const args = path.node.arguments;
      // Handle both 'StringLiteral' (babel) and 'Literal' (default parser) types
      const arg = args[0];
      if (args.length > 0 && (arg.type === 'StringLiteral' || arg.type === 'Literal')) {
        const argValue = 'value' in arg ? arg.value : undefined;
        if (argValue === SANITY_MAPPER_PACKAGE) {
          // Find the parent variable declaration and remove it
          const parent = path.parent;
          if (parent && parent.node.type === 'VariableDeclarator') {
            const grandParent = parent.parent;
            if (grandParent && grandParent.node.type === 'VariableDeclaration') {
              j(grandParent).remove();
              hasChanges = true;
            }
          }
        }
      }
    });

  if (!hasChanges) {
    return null;
  }

  return root.toSource({ quote: 'single' });
};

export default transform;
