import { FragmentDataMapping, MergedJsonRepresentationMap } from './types';
import Node from './Node';
import { SimpleTimer as Timer } from '@last-rev/timer';
import { each } from 'lodash';
import { getWinstonLogger } from '@last-rev/logging';

const logger = getWinstonLogger({
  package: 'contentful-fragment-gen',
  module: 'generateFragmentData'
});

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
  allStatics: string[],
  typeMappings: Record<string, string>
): FragmentDataMapping => {
  const fragmentDataMapping: FragmentDataMapping = {};
  const timer = new Timer();
  each(mergedJsonRepresentationMap, (jsonRepresentation, contentTypeId) => {
    generateFragmentDataDfs(new Node(jsonRepresentation, contentTypeId, allStatics, typeMappings), fragmentDataMapping);
  });
  logger.debug('Generated fragment data', {
    caller: 'generateFragmentData',
    time: timer.end().millis
  });
  return fragmentDataMapping;
};

export default generateFragmentData;
