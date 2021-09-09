import { each, isString, pickBy } from 'lodash';
import { MergedJsonRepresentation, MergedJsonRepresentationMap, ReferenceTree } from './types';

type ToProcess = {
  contentType: string;
  data: MergedJsonRepresentation;
};

const dfs = (contentType: string, data: MergedJsonRepresentation, downTree: ReferenceTree) => {
  const stack: ToProcess[] = [];
  stack.unshift({ data, contentType });
  while (stack.length > 0) {
    const current = stack.shift() as ToProcess;
    const withChildren = pickBy(current.data, (value) => !isString(value));
    downTree[current.contentType] = downTree[current.contentType] || [];
    each(withChildren, (child) => {
      each(child as MergedJsonRepresentationMap, (nested, nestedType) => {
        if (!downTree[current.contentType].includes(nestedType)) {
          downTree[current.contentType].push(nestedType);
        }
        stack.unshift({ data: nested, contentType: nestedType });
      });
    });
  }
};

const buildReferenceTree = (data: MergedJsonRepresentationMap) => {
  const tree: ReferenceTree = {};
  each(data, (value, contentType) => {
    dfs(contentType, value, tree);
  });
  return tree;
};

export default buildReferenceTree;
