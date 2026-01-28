export * from './patterns';
export * from './i18nTransform';

import { transformGroqI18n, isGroqQuery } from './i18nTransform';
import type { API, FileInfo, Options, JSCodeshift } from 'jscodeshift';

/**
 * Transform GROQ queries in a file
 *
 * This transform finds string literals and template literals that contain GROQ queries
 * and transforms them to remove document-level i18n patterns.
 */
export function transformGroqQuery(
  file: FileInfo,
  api: API,
  _options: Options
): string | null {
  const j: JSCodeshift = api.jscodeshift;
  const root = j(file.source);
  let hasChanges = false;

  // Transform string literals containing GROQ
  // Handle both StringLiteral (babel) and Literal (default parser) types
  const transformStringLiteral = (path: any) => {
    const value = path.node.value;
    if (typeof value !== 'string') return;

    if (isGroqQuery(value)) {
      const result = transformGroqI18n(value);
      if (result.changed) {
        path.node.value = result.query;
        hasChanges = true;

        // Add warning comments
        if (result.warnings.length > 0) {
          const parent = path.parent;
          if (parent && parent.node) {
            result.warnings.forEach((warning) => {
              const comment = j.commentLine(` WARNING: ${warning}`, true, false);
              if (!parent.node.comments) {
                parent.node.comments = [];
              }
              parent.node.comments.push(comment);
            });
          }
        }
      }
    }
  };

  root.find(j.StringLiteral).forEach(transformStringLiteral);
  root.find(j.Literal).forEach(transformStringLiteral);

  // Transform template literals containing GROQ
  root.find(j.TemplateLiteral).forEach((path) => {
    // Build the full template string to check if it's GROQ
    const quasis = path.node.quasis;
    const fullString = quasis.map((q) => q.value.raw).join('${...}');

    if (isGroqQuery(fullString)) {
      // Transform each quasi part
      quasis.forEach((quasi) => {
        const result = transformGroqI18n(quasi.value.raw);
        if (result.changed) {
          quasi.value.raw = result.query;
          quasi.value.cooked = result.query;
          hasChanges = true;
        }
      });
    }
  });

  // Transform tagged template literals (groq`...`)
  root.find(j.TaggedTemplateExpression).forEach((path) => {
    const tag = path.node.tag;

    // Check if tag is 'groq'
    if (tag.type === 'Identifier' && tag.name === 'groq') {
      const quasi = path.node.quasi;
      const quasis = quasi.quasis;

      quasis.forEach((q) => {
        const result = transformGroqI18n(q.value.raw);
        if (result.changed) {
          q.value.raw = result.query;
          q.value.cooked = result.query;
          hasChanges = true;
        }
      });
    }
  });

  if (!hasChanges) {
    return null;
  }

  return root.toSource({ quote: 'single' });
}
