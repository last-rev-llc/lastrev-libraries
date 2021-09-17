import { each } from 'lodash';
import { PathData, PathDataMap } from '@last-rev/types';
import { PathNode } from '../PathNode';
import { PathNodeVisitor } from '../types';

export default class PathTree {
  root: PathNode = new PathNode('');
  locateNodeByPath: Map<string, PathNode> = new Map();
  locateNodesById: Map<string, PathNode[]> = new Map();

  appendNewNode(data: PathData) {
    const pathSegments = data.fullPath.replace(/^\//, '').split('/');
    let node = this.root;

    while (pathSegments.length > 0) {
      const currentSegment = pathSegments.shift()!;
      if (!node.children.has(currentSegment)) {
        node.children.set(currentSegment, new PathNode(currentSegment));
      }
      const parentNode = node.children.get(currentSegment)!;
      node.parent = parentNode;
      node = parentNode;
    }
    node.data = data;

    this.locateNodeByPath.set(data.fullPath, node);
    const nodes = this.locateNodesById.get(data.contentId) || [];
    nodes.push(node);
    this.locateNodesById.set(data.contentId, nodes);
  }

  getNodesById(contentId: string): PathNode[] {
    return this.locateNodesById.get(contentId) || [];
  }

  getNodeByPath(path: string): PathNode | undefined {
    return this.locateNodeByPath.get(path);
  }

  serialize(): PathDataMap {
    const serializedTree: PathDataMap = {};
    this.locateNodeByPath.forEach((node, path) => {
      if (node.data) {
        serializedTree[path] = node.data;
      }
    });
    return serializedTree;
  }

  rebuildFromSerialized(serializedTree: PathDataMap) {
    this.locateNodeByPath.clear();
    this.locateNodesById.clear();
    this.root = new PathNode('');
    each(serializedTree, (data) => {
      this.appendNewNode(data);
    });
  }

  bfs(visitor: PathNodeVisitor) {
    const queue: PathNode[] = [this.root];
    while (queue.length > 0) {
      const node = queue.pop()!;
      visitor(node);
      node.children.forEach((child) => {
        queue.unshift(child);
      });
    }
  }

  filter(predicate: (node: PathNode) => boolean): PathTree {
    const tree = new PathTree();
    this.bfs((node) => {
      if (node.data && predicate(node)) {
        tree.appendNewNode(node.data);
      }
    });
    return tree;
  }

  getPathDataArray(): PathData[] {
    const pathData: PathData[] = [];
    this.locateNodeByPath.forEach((node) => {
      if (node.data) {
        pathData.push(node.data);
      }
    });
    return pathData;
  }
}
