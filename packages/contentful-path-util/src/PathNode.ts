import { PathData } from '@last-rev/types';

export class PathNode {
  data?: PathData;
  key: string;
  parent?: PathNode;
  children: Map<string, PathNode> = new Map();

  constructor(key: string, data?: PathData) {
    this.key = key;
    this.data = data;
  }

  hasChildren() {
    return this.children.size > 0;
  }
}
