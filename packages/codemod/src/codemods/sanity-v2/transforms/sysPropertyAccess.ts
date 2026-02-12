import type { API, FileInfo, Options, Collection, JSCodeshift, MemberExpression } from 'jscodeshift';
import { SYS_PROPERTY_MAPPINGS } from '../constants';

type AnyMemberExpression = MemberExpression & { optional?: boolean };

const isMemberExpressionType = (type: string): boolean =>
  type === 'MemberExpression' || type === 'OptionalMemberExpression';

/**
 * Transform sys property access from Contentful-style to Sanity-native
 *
 * Transforms (in order):
 * - entry.sys.contentType.sys.id -> entry._type
 * - entry.sys.id -> entry._id
 * - entry?.sys?.id -> entry?._id
 * - entry?.sys?.contentType?.sys?.id -> entry?._type
 *
 * Handles any object accessor pattern including optional chaining:
 * - item.sys.id, doc?.sys?.id, entry.sys.id, etc.
 */
const transform = (file: FileInfo, api: API, _options: Options): string | null => {
  const j: JSCodeshift = api.jscodeshift;
  const root: Collection = j(file.source);
  let hasChanges = false;

  // Process each mapping in order (longer patterns first)
  SYS_PROPERTY_MAPPINGS.forEach(({ pattern, replacement }) => {
    // Find both regular and optional member expressions
    root.find(j.MemberExpression).forEach((path) => {
      processPath(j, path, pattern, replacement, () => {
        hasChanges = true;
      });
    });

    root.find(j.OptionalMemberExpression).forEach((path) => {
      processPath(j, path, pattern, replacement, () => {
        hasChanges = true;
      });
    });
  });

  if (!hasChanges) {
    return null;
  }

  return root.toSource({ quote: 'single' });
};

function processPath(
  j: JSCodeshift,
  path: any,
  pattern: string[],
  replacement: string,
  onChanged: () => void
): void {
  const { chain, hasOptional } = getMemberExpressionChain(path.node);

  // Check if the chain ends with our pattern
  if (matchesPattern(chain, pattern)) {
    // Get the root object (everything before the pattern)
    const rootObject = getRootObject(j, path.node, pattern.length);

    if (rootObject) {
      // Replace with: rootObject._type or rootObject._id
      // Preserve optional chaining if the original had it
      const newNode = hasOptional
        ? j.optionalMemberExpression(rootObject, j.identifier(replacement))
        : j.memberExpression(rootObject, j.identifier(replacement));

      j(path).replaceWith(newNode);
      onChanged();
    }
  }
}

/**
 * Extract the chain of property names from a MemberExpression or OptionalMemberExpression
 * e.g., entry.sys.contentType.sys.id -> ['sys', 'contentType', 'sys', 'id']
 * Also tracks if any part of the chain used optional chaining
 */
function getMemberExpressionChain(node: AnyMemberExpression): { chain: string[]; hasOptional: boolean } {
  const chain: string[] = [];
  let current: any = node;
  let hasOptional = false;

  while (current && isMemberExpressionType(current.type)) {
    if (current.property?.type === 'Identifier') {
      chain.unshift(current.property.name);
    }
    if (current.optional || current.type === 'OptionalMemberExpression') {
      hasOptional = true;
    }
    current = current.object;
  }

  return { chain, hasOptional };
}

/**
 * Check if the chain ends with the given pattern
 */
function matchesPattern(chain: string[], pattern: string[]): boolean {
  if (chain.length < pattern.length) return false;

  const startIndex = chain.length - pattern.length;
  return pattern.every((prop, i) => chain[startIndex + i] === prop);
}

/**
 * Get the root object by traversing up the MemberExpression chain
 */
function getRootObject(j: JSCodeshift, node: AnyMemberExpression, depth: number): any {
  let current: any = node;

  for (let i = 0; i < depth; i++) {
    if (!current || !isMemberExpressionType(current.type)) return null;
    current = current.object;
  }

  // Clone the node to avoid mutation issues
  return current ? j(current).nodes()[0] : null;
}

export default transform;
