import { map } from 'lodash';
import { PathData } from '@last-rev/types';
import PathTree from './PathTree';
import { PathNodeVisitor } from '../types';

const home: PathData = {
  fullPath: '/',
  contentId: 'home',
  excludedLocales: [],
  isPrimary: true
};

const about: PathData = {
  fullPath: '/about',
  contentId: 'about',
  excludedLocales: [],
  isPrimary: true
};

const careers: PathData = {
  fullPath: '/about/careers',
  contentId: 'careers',
  excludedLocales: ['de'],
  isPrimary: true
};

const about2: PathData = {
  fullPath: '/about-2',
  contentId: 'about',
  excludedLocales: [],
  isPrimary: false
};

describe('PathTree', () => {
  test('should be able to create a PathTree', () => {
    const tree = new PathTree();
    expect(tree).toBeInstanceOf(PathTree);
  });

  test('should be able to append nodes to root and locate them', () => {
    const tree = new PathTree();

    tree.appendNewNode(home);
    tree.appendNewNode(about);

    expect(tree.root.children.size).toBe(2);

    expect(tree.root.children.get('')?.data).toEqual(home);
    expect(tree.root.children.get('about')?.data).toEqual(about);

    expect(tree.getNodeByPath(home.fullPath)?.data).toEqual(home);
    expect(tree.getNodeByPath(about.fullPath)?.data).toEqual(about);

    expect(tree.getNodesById(home.contentId).length).toEqual(1);
    expect(tree.getNodesById(about.contentId).length).toEqual(1);

    expect(tree.getNodesById(home.contentId)[0]?.data).toEqual(home);
    expect(tree.getNodesById(about.contentId)[0]?.data).toEqual(about);
  });

  test('should be able to append nested nodes', () => {
    const tree = new PathTree();

    tree.appendNewNode(about);
    tree.appendNewNode(careers);

    expect(tree.root.children.size).toBe(1);

    expect(tree.root.children.get('about')?.data).toEqual(about);
    expect(tree.root.children.get('about')?.children?.get('careers')?.data).toEqual(careers);

    expect(tree.getNodeByPath(about.fullPath)?.data).toEqual(about);
    expect(tree.getNodeByPath(careers.fullPath)?.data).toEqual(careers);

    expect(tree.getNodesById(about.contentId).length).toEqual(1);
    expect(tree.getNodesById(careers.contentId).length).toEqual(1);

    expect(tree.getNodesById(about.contentId)[0]?.data).toEqual(about);
    expect(tree.getNodesById(careers.contentId)[0]?.data).toEqual(careers);
  });

  test('should be able to append two nodes with same content id', () => {
    const tree = new PathTree();

    tree.appendNewNode(about);
    tree.appendNewNode(about2);

    expect(tree.root.children.size).toBe(2);

    expect(tree.root.children.get('about')?.data).toEqual(about);
    expect(tree.root.children.get('about-2')?.data).toEqual(about2);

    expect(tree.getNodeByPath(about.fullPath)?.data).toEqual(about);
    expect(tree.getNodeByPath(about2.fullPath)?.data).toEqual(about2);

    expect(tree.getNodesById(about.contentId).length).toEqual(2);

    expect(map(tree.getNodesById(about.contentId), 'data')).toContain(about);
    expect(map(tree.getNodesById(about.contentId), 'data')).toContain(about2);
  });

  test('should be able to serialize the tree', () => {
    const tree = new PathTree();

    tree.appendNewNode(home);
    tree.appendNewNode(about);
    tree.appendNewNode(careers);
    tree.appendNewNode(about2);

    const serialized = tree.serialize();

    expect(serialized).toEqual({
      '/': home,
      '/about': about,
      '/about/careers': careers,
      '/about-2': about2
    });
  });

  test('should be able to build the tree from serialized data', () => {
    const tree = new PathTree();

    const serialized = {
      '/': home,
      '/about': about,
      '/about/careers': careers,
      '/about-2': about2
    };

    tree.rebuildFromSerialized(serialized);

    expect(tree.root.children.size).toBe(3);

    expect(tree.root.children.get('')?.data).toEqual(home);
    expect(tree.root.children.get('about')?.data).toEqual(about);
    expect(tree.root.children.get('about-2')?.data).toEqual(about2);

    const aboutNode = tree.root.children.get('about')!;

    expect(aboutNode.children.size).toBe(1);

    expect(aboutNode.children.get('careers')?.data).toEqual(careers);

    expect(tree.getNodeByPath(home.fullPath)?.data).toEqual(home);
    expect(tree.getNodeByPath(about.fullPath)?.data).toEqual(about);
    expect(tree.getNodeByPath(careers.fullPath)?.data).toEqual(careers);
    expect(tree.getNodeByPath(about2.fullPath)?.data).toEqual(about2);

    expect(tree.getNodesById(home.contentId).length).toEqual(1);
    expect(tree.getNodesById(about.contentId).length).toEqual(2);
    expect(tree.getNodesById(careers.contentId).length).toEqual(1);

    expect(map(tree.getNodesById(home.contentId), 'data')).toContain(home);
    expect(map(tree.getNodesById(about.contentId), 'data')).toContain(about);
    expect(map(tree.getNodesById(about.contentId), 'data')).toContain(about2);
    expect(map(tree.getNodesById(careers.contentId), 'data')).toContain(careers);
  });

  test('BFS should visit every node', () => {
    const tree = new PathTree();

    tree.appendNewNode(home);
    tree.appendNewNode(about);
    tree.appendNewNode(careers);
    tree.appendNewNode(about2);

    const visited: string[] = [];

    const visitor: PathNodeVisitor = (node) => node.data && visited.push(node.data?.fullPath);

    tree.bfs(visitor);

    expect(visited).toHaveLength(4);

    expect(visited).toEqual([home.fullPath, about.fullPath, about2.fullPath, careers.fullPath]);
  });

  test('Filter should return the filtered tree', () => {
    const tree = new PathTree();

    tree.appendNewNode(home);
    tree.appendNewNode(about);
    tree.appendNewNode(careers);
    tree.appendNewNode(about2);

    const filtered = tree.filter((node) => {
      return !!node.data?.fullPath.startsWith('/about');
    });

    expect(filtered.root.children.size).toBe(2);

    expect(filtered.root.children.get('about')?.data).toEqual(about);
    expect(filtered.root.children.get('about-2')?.data).toEqual(about2);
    expect(filtered.locateNodeByPath.get('/about/careers')?.data).toEqual(careers);
  });
});
