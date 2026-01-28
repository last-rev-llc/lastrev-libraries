import type { API, FileInfo, Options, Collection, JSCodeshift } from 'jscodeshift';
import { DIRECTORY_MAPPINGS, REDIS_KEY_MAPPINGS } from '../constants';

/**
 * Transform directory and Redis key constants
 *
 * Transforms:
 * - 'entries' -> 'documents'
 * - 'assets' -> 'documents'
 * - 'entry_ids_by_content_type' -> 'document_ids_by_type'
 * - Template literals with these patterns
 */
const transform = (file: FileInfo, api: API, _options: Options): string | null => {
  const j: JSCodeshift = api.jscodeshift;
  const root: Collection = j(file.source);
  let hasChanges = false;

  // Transform exact match string literals for directory mappings
  // Handle both StringLiteral (babel) and Literal (default parser) types
  Object.entries(DIRECTORY_MAPPINGS).forEach(([oldDir, newDir]) => {
    // Try StringLiteral first
    root
      .find(j.StringLiteral, {
        value: oldDir
      })
      .forEach((path) => {
        path.node.value = newDir;
        hasChanges = true;
      });

    // Also try Literal for parsers that use that type
    root.find(j.Literal).forEach((path) => {
      if (typeof path.node.value === 'string' && path.node.value === oldDir) {
        path.node.value = newDir;
        hasChanges = true;
      }
    });
  });

  // Transform string literals containing Redis key patterns
  // Handle both StringLiteral and Literal types
  root.find(j.StringLiteral).forEach((path) => {
    const value = path.node.value;
    if (typeof value === 'string') {
      Object.entries(REDIS_KEY_MAPPINGS).forEach(([oldKey, newKey]) => {
        if (value.includes(oldKey)) {
          path.node.value = value.replace(oldKey, newKey);
          hasChanges = true;
        }
      });
    }
  });

  root.find(j.Literal).forEach((path) => {
    const value = path.node.value;
    if (typeof value === 'string') {
      Object.entries(REDIS_KEY_MAPPINGS).forEach(([oldKey, newKey]) => {
        if (value.includes(oldKey)) {
          path.node.value = value.replace(oldKey, newKey);
          hasChanges = true;
        }
      });
    }
  });

  // Transform template literals
  root.find(j.TemplateLiteral).forEach((path) => {
    const quasis = path.node.quasis;

    quasis.forEach((quasi) => {
      let value = quasi.value.raw;
      let cooked = quasi.value.cooked || value;
      let changed = false;

      // Replace directory patterns
      Object.entries(DIRECTORY_MAPPINGS).forEach(([oldDir, newDir]) => {
        if (value.includes(oldDir)) {
          value = value.replace(new RegExp(oldDir, 'g'), newDir);
          cooked = cooked.replace(new RegExp(oldDir, 'g'), newDir);
          changed = true;
        }
      });

      // Replace Redis key patterns
      Object.entries(REDIS_KEY_MAPPINGS).forEach(([oldKey, newKey]) => {
        if (value.includes(oldKey)) {
          value = value.replace(new RegExp(escapeRegExp(oldKey), 'g'), newKey);
          cooked = cooked.replace(new RegExp(escapeRegExp(oldKey), 'g'), newKey);
          changed = true;
        }
      });

      if (changed) {
        quasi.value.raw = value;
        quasi.value.cooked = cooked;
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
 * Escape special characters for use in RegExp
 */
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default transform;
