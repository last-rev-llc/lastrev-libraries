import type { API, FileInfo, Options, Collection, JSCodeshift } from 'jscodeshift';
import { I18N_FIELD_PATTERNS } from '../constants';

/**
 * Transform document-level i18n patterns to field-level
 *
 * Transforms:
 * - doc.__i18n_lang -> Add TODO comment
 * - doc._translations -> Add TODO comment
 * - doc.__i18n_refs -> Add TODO comment
 * - Suggests using getLocalizedField instead
 */
const transform = (file: FileInfo, api: API, _options: Options): string | null => {
  const j: JSCodeshift = api.jscodeshift;
  const root: Collection = j(file.source);
  let hasChanges = false;

  // Find member expressions accessing i18n fields
  I18N_FIELD_PATTERNS.forEach((fieldName) => {
    root
      .find(j.MemberExpression, {
        property: {
          type: 'Identifier',
          name: fieldName
        }
      })
      .forEach((path) => {
        // Add a TODO comment
        const parent = findStatementParent(path);
        if (parent && parent.node) {
          const comment = j.commentLine(
            ` TODO: ${fieldName} removed - use getLocalizedField(doc, 'fieldName', ctx) instead`,
            true,
            false
          );

          if (!parent.node.comments) {
            parent.node.comments = [];
          }

          // Check if comment already exists
          const hasComment = parent.node.comments.some((c: any) => c.value && c.value.includes(fieldName));

          if (!hasComment) {
            parent.node.comments.push(comment);
            hasChanges = true;
          }
        }
      });

    // Also check for computed property access like doc['__i18n_lang']
    root
      .find(j.MemberExpression, {
        property: {
          type: 'StringLiteral',
          value: fieldName
        }
      })
      .forEach((path) => {
        const parent = findStatementParent(path);
        if (parent && parent.node) {
          const comment = j.commentLine(
            ` TODO: ${fieldName} removed - use getLocalizedField(doc, 'fieldName', ctx) instead`,
            true,
            false
          );

          if (!parent.node.comments) {
            parent.node.comments = [];
          }

          const hasComment = parent.node.comments.some((c: any) => c.value && c.value.includes(fieldName));

          if (!hasComment) {
            parent.node.comments.push(comment);
            hasChanges = true;
          }
        }
      });
  });

  // Transform comparison expressions like doc.__i18n_lang === locale
  root.find(j.BinaryExpression).forEach((path) => {
    const { left, right } = path.node;

    const isI18nComparison = (node: any): boolean => {
      if (node.type === 'MemberExpression') {
        if (node.property.type === 'Identifier') {
          return I18N_FIELD_PATTERNS.includes(node.property.name);
        }
        if (node.property.type === 'StringLiteral') {
          return I18N_FIELD_PATTERNS.includes(node.property.value);
        }
      }
      return false;
    };

    if (isI18nComparison(left) || isI18nComparison(right)) {
      const parent = findStatementParent(path);
      if (parent && parent.node) {
        const comment = j.commentLine(
          ' TODO: i18n comparison removed - field-level i18n does not filter by language at document level',
          true,
          false
        );

        if (!parent.node.comments) {
          parent.node.comments = [];
        }

        const hasComment = parent.node.comments.some(
          (c: any) => c.value && c.value.includes('i18n comparison removed')
        );

        if (!hasComment) {
          parent.node.comments.push(comment);
          hasChanges = true;
        }
      }
    }
  });

  // Check for destructuring of i18n fields
  root.find(j.ObjectPattern).forEach((path) => {
    const properties = path.node.properties;

    properties.forEach((prop: any) => {
      if (prop.type === 'ObjectProperty' || prop.type === 'Property') {
        const key = prop.key;
        if (key && key.type === 'Identifier' && I18N_FIELD_PATTERNS.includes(key.name)) {
          const parent = findStatementParent(path);
          if (parent && parent.node) {
            const comment = j.commentLine(
              ` TODO: ${key.name} destructuring removed - use getLocalizedField instead`,
              true,
              false
            );

            if (!parent.node.comments) {
              parent.node.comments = [];
            }

            const hasComment = parent.node.comments.some((c: any) => c.value && c.value.includes(key.name));

            if (!hasComment) {
              parent.node.comments.push(comment);
              hasChanges = true;
            }
          }
        }
      }
    });
  });

  if (!hasChanges) {
    return null;
  }

  return root.toSource({ quote: 'single' });
};

/**
 * Find the nearest statement parent for adding comments
 */
function findStatementParent(path: any): any {
  let current = path;
  while (current) {
    const nodeType = current.node?.type;
    if (
      nodeType === 'ExpressionStatement' ||
      nodeType === 'VariableDeclaration' ||
      nodeType === 'IfStatement' ||
      nodeType === 'ReturnStatement' ||
      nodeType === 'AssignmentExpression'
    ) {
      return current;
    }
    current = current.parent;
  }
  return path.parent;
}

export default transform;
