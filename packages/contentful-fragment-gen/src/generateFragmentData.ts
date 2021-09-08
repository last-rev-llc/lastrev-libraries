import { FragmentDataMapping, MergedJsonRepresentationMap } from './types';
import Node from './Node';
import Timer from '@last-rev/timer';
import { each } from 'lodash';
import logger from 'loglevel';

const generateFragmentDataDfs = (root: Node, fragmentMapping: FragmentDataMapping) => {
  const stack: Node[] = [];
  stack.unshift(root);
  while (stack.length > 0) {
    const node = stack[0] as Node;
    const children = node.children;
    if (children.length === 0 || node.numChildrenVisited === children.length) {
      // don't parse a node until all of its children have been visited or it has no children
      node.parseAndUpdateFragmentData(fragmentMapping);
      stack.shift();
    } else {
      for (var i = children.length - 1; i >= 0; i--) {
        var child = children[i];
        stack.unshift(child);
      }
    }
  }
};

const generateFragmentData = (
  mergedJsonRepresentationMap: MergedJsonRepresentationMap,
  allStatics: string[]
): FragmentDataMapping => {
  const fragmentDataMapping: FragmentDataMapping = {};
  const timer = new Timer('Generated fragment data');
  each(mergedJsonRepresentationMap, (jsonRepresentation, contentTypeId) => {
    generateFragmentDataDfs(new Node(jsonRepresentation, contentTypeId, allStatics), fragmentDataMapping);
  });
  logger.info(timer.end());
  return fragmentDataMapping;
};

export default generateFragmentData;
