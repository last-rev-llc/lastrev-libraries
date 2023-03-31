import { StatusNode } from '../statusChecks/types';

const findNode = (query: string, node: StatusNode): StatusNode | undefined => {
  // query is a dot separated string
  const [first, ...rest] = query.split('.');
  if (first === node.id) {
    if (rest.length === 0) {
      return node;
    }
    if (node.services) {
      return node.services.find((service) => findNode(rest.join('.'), service));
    }
  }
};

export default findNode;
