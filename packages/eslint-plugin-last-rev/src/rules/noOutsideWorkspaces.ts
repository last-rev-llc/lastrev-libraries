'use strict';

import { Rule } from 'eslint';
import { Literal, ArrayExpression } from 'estree';

const isFirstLevel = (property: any) => {
  return property?.parent?.parent?.type === 'Program';
};

function* removeOffendingNode(
  fixer: Rule.RuleFixer,
  context: Rule.RuleContext,
  literalNode: Literal,
  arrayNode: ArrayExpression
) {
  const sourceCode = context.getSourceCode();
  const priorToken = sourceCode.getTokenBefore(literalNode)!;
  const currentToken = sourceCode.getLastToken(literalNode)!;
  const nextToken = sourceCode.getTokenAfter(literalNode)!;
  const isFollowedByComma = nextToken.value === ',';
  const isPrecededByComma = priorToken.value === ',';
  yield fixer.replaceTextRange(
    [priorToken.range[1], isFollowedByComma ? nextToken.range[1] : currentToken.range[1]],
    ''
  );
  const isLastItemInArray = arrayNode.elements[arrayNode.elements.length - 1] === literalNode;
  if (isLastItemInArray && isPrecededByComma) {
    yield fixer.remove(priorToken);
  }
}

const noOutsideWorkspacesRule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    fixable: 'code',
    schema: []
  },
  create: function (context: Rule.RuleContext) {
    return {
      Literal: function (literalNode) {
        if (typeof literalNode.value !== 'string') return;
        if (!literalNode.value.startsWith('../')) return;

        if (literalNode.parent.type !== 'ArrayExpression') return;
        const arrayNode = literalNode.parent;
        if (arrayNode.parent.type !== 'Property') return;

        const propertyNode = arrayNode.parent;

        if (propertyNode.key.type !== 'Literal') return;
        if (propertyNode.key.value === 'workspaces') {
          if (!isFirstLevel(propertyNode)) return;
          context.report({
            node: literalNode,
            message: `Entry "${literalNode.value}" in workspaces refers to a file outside the monorepo.`,
            *fix(fixer) {
              for (const a of removeOffendingNode(fixer, context, literalNode, arrayNode)) {
                yield a;
              }
            }
          });
        } else if (propertyNode.key.value === 'packages') {
          if (propertyNode.parent.parent.type !== 'Property') return;
          const parentPropertyNode = propertyNode.parent.parent;
          if (parentPropertyNode.key.type !== 'Literal') return;
          if (parentPropertyNode.key.value !== 'workspaces') return;
          if (!isFirstLevel(parentPropertyNode)) return;
          context.report({
            node: literalNode,
            message: `Entry "${literalNode.value}" in workspaces.packages refers to a file outside the monorepo.`,
            *fix(fixer) {
              for (const a of removeOffendingNode(fixer, context, literalNode, arrayNode)) {
                yield a;
              }
            }
          });
        }
      }
    };
  }
};

export default noOutsideWorkspacesRule;
