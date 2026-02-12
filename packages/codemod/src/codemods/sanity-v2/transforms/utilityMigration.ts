import type { API, FileInfo, Options, Collection, JSCodeshift } from 'jscodeshift';

/**
 * Transform utility function calls from Contentful-style to Sanity-native patterns.
 *
 * Transforms:
 * - getLocalizedField(entry.fields, 'field', ctx) -> getLocalizedField(entry, 'field', ctx)
 * - getLocalizedField(entry?.fields, 'field', ctx) -> getLocalizedField(entry, 'field', ctx)
 * - entry.fields.fieldName -> entry.fieldName
 * - entry.fields?.fieldName -> entry?.fieldName
 * - const { field } = entry.fields -> const { field } = entry
 */
const transform = (file: FileInfo, api: API, _options: Options): string | null => {
  const j: JSCodeshift = api.jscodeshift;
  const root: Collection = j(file.source);
  let hasChanges = false;

  // 1. Transform getLocalizedField(x.fields, ...) -> getLocalizedField(x, ...)
  root
    .find(j.CallExpression, {
      callee: {
        type: 'Identifier',
        name: 'getLocalizedField'
      }
    })
    .forEach((path) => {
      const firstArg = path.node.arguments[0];
      if (!firstArg) return;

      // Handle x.fields (MemberExpression)
      if (
        firstArg.type === 'MemberExpression' &&
        firstArg.property.type === 'Identifier' &&
        firstArg.property.name === 'fields'
      ) {
        path.node.arguments[0] = firstArg.object;
        hasChanges = true;
      }

      // Handle x?.fields (OptionalMemberExpression)
      if (
        firstArg.type === 'OptionalMemberExpression' &&
        firstArg.property.type === 'Identifier' &&
        firstArg.property.name === 'fields'
      ) {
        path.node.arguments[0] = firstArg.object;
        hasChanges = true;
      }
    });

  // 2. Transform getSanityField(x.fields, ...) -> getSanityField(x, ...)
  root
    .find(j.CallExpression, {
      callee: {
        type: 'Identifier',
        name: 'getSanityField'
      }
    })
    .forEach((path) => {
      const firstArg = path.node.arguments[0];
      if (!firstArg) return;

      if (
        firstArg.type === 'MemberExpression' &&
        firstArg.property.type === 'Identifier' &&
        firstArg.property.name === 'fields'
      ) {
        path.node.arguments[0] = firstArg.object;
        hasChanges = true;
      }

      if (
        firstArg.type === 'OptionalMemberExpression' &&
        firstArg.property.type === 'Identifier' &&
        firstArg.property.name === 'fields'
      ) {
        path.node.arguments[0] = firstArg.object;
        hasChanges = true;
      }
    });

  // 3. Transform entry.fields.fieldName -> entry.fieldName
  // Find member expressions where the object is x.fields or x?.fields
  root
    .find(j.MemberExpression, {
      object: {
        type: 'MemberExpression',
        property: {
          type: 'Identifier',
          name: 'fields'
        }
      }
    })
    .forEach((path) => {
      const fieldsAccess = path.node.object as any;

      // Skip if this is already part of a call to getLocalizedField (handled above)
      if (path.parent?.node?.type === 'CallExpression') {
        const callExpr = path.parent.node as any;
        if (
          callExpr.callee?.type === 'Identifier' &&
          (callExpr.callee.name === 'getLocalizedField' || callExpr.callee.name === 'getSanityField')
        ) {
          return;
        }
      }

      // Replace entry.fields.fieldName with entry.fieldName
      // Create new member expression: fieldsAccess.object.property
      const newNode = j.memberExpression(fieldsAccess.object, path.node.property, path.node.computed);

      j(path).replaceWith(newNode);
      hasChanges = true;
    });

  // 4. Transform entry?.fields.fieldName or entry.fields?.fieldName
  root
    .find(j.MemberExpression, {
      object: {
        type: 'OptionalMemberExpression',
        property: {
          type: 'Identifier',
          name: 'fields'
        }
      }
    })
    .forEach((path) => {
      const fieldsAccess = path.node.object as any;

      // Replace entry?.fields.fieldName with entry?.fieldName
      const newNode = j.optionalMemberExpression(fieldsAccess.object, path.node.property, path.node.computed);

      j(path).replaceWith(newNode);
      hasChanges = true;
    });

  // 5. Transform destructuring: const { field } = entry.fields -> const { field } = entry
  root
    .find(j.VariableDeclarator, {
      id: { type: 'ObjectPattern' },
      init: {
        type: 'MemberExpression',
        property: {
          type: 'Identifier',
          name: 'fields'
        }
      }
    })
    .forEach((path) => {
      const initExpr = path.node.init as any;
      path.node.init = initExpr.object;
      hasChanges = true;
    });

  // Also handle optional chaining in destructuring
  root
    .find(j.VariableDeclarator, {
      id: { type: 'ObjectPattern' },
      init: {
        type: 'OptionalMemberExpression',
        property: {
          type: 'Identifier',
          name: 'fields'
        }
      }
    })
    .forEach((path) => {
      const initExpr = path.node.init as any;
      path.node.init = initExpr.object;
      hasChanges = true;
    });

  if (!hasChanges) {
    return null;
  }

  return root.toSource({ quote: 'single' });
};

export default transform;
