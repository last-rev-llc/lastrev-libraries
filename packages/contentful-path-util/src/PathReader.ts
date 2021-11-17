import { each, flatMap } from 'lodash';
import PathTree from './PathTree';
import { PathNode } from './PathNode';
import { PathStore } from './PathStore';
import { DEFAULT_SITE_KEY } from './constants';
import { iPathReader, PagePathsParam, SitemapPathEntry } from 'packages/types';
import AsyncLock from 'async-lock';

const lock = new AsyncLock();

export default class PathReader implements iPathReader {
  trees: { [site: string]: PathTree } = {};
  pathStore: PathStore;

  constructor(pathStore: PathStore) {
    this.pathStore = pathStore;
  }

  async getTree(site: string = DEFAULT_SITE_KEY): Promise<PathTree | undefined> {
    await this.ensureLoaded(site);
    return this.trees[site];
  }

  async load(site: string = DEFAULT_SITE_KEY): Promise<void> {
    const tree = new PathTree();
    const serialized = await this.pathStore.load(site);
    tree.rebuildFromSerialized(serialized);
    this.trees[site] = tree;
  }

  async ensureLoaded(site: string): Promise<void> {
    await lock.acquire(site, async () => {
      if (!this.trees[site]) {
        await this.load(site);
      }
    });
  }

  async getPathsByContentId(contentId: string, locale?: string, site: string = DEFAULT_SITE_KEY): Promise<string[]> {
    await this.ensureLoaded(site);
    const tree = this.trees[site]!;
    const nodes = tree.getNodesById(contentId);
    const paths: string[] = [];
    each(nodes, (node) => {
      if (!node.data) return;
      if (locale && node.data.excludedLocales.includes(locale)) return;
      paths.push(node.data.fullPath);
    });
    return paths;
  }

  async getAllPaths(locales: string[], site: string = DEFAULT_SITE_KEY): Promise<PagePathsParam[]> {
    await this.ensureLoaded(site);
    const tree = this.trees[site]!;
    return flatMap(tree.getPathDataArray(), (data) => {
      const items: PagePathsParam[] = [];
      each(locales, (locale) => {
        if (data.excludedLocales.includes(locale)) return;
        items.push({
          params: {
            slug: data.fullPath.replace(/^\//, '').split('/'),
            locale
          }
        });
      });
      return items;
    });
  }

  normalizePath(path: string): string {
    if (path != '/' && path[path.length - 1] === '/') path = path.slice(0, -1);
    if (path[0] !== '/' && path != '/') path = '/' + path;
    return path;
  }

  async getNodeByPath(path: string, site: string = DEFAULT_SITE_KEY): Promise<PathNode | undefined> {
    await this.ensureLoaded(site);
    return this.trees[site]!.getNodeByPath(this.normalizePath(path));
  }

  async getFilteredTree(filter?: (node: PathNode) => boolean, site: string = DEFAULT_SITE_KEY): Promise<PathTree> {
    await this.ensureLoaded(site);
    return filter ? this.trees[site]!.filter(filter) : this.trees[site]!;
  }

  async getSitemap(locales: string[], site: string = DEFAULT_SITE_KEY): Promise<SitemapPathEntry[]> {
    await this.ensureLoaded(site);
    const sitemap: SitemapPathEntry[] = [];
    this.trees[site]!.bfs((node: PathNode) => {
      if (!node.data) return;
      const data = node.data!;
      each(locales, (locale) => {
        if (data.excludedLocales.includes(locale)) return;
        sitemap.push({
          path: data.fullPath,
          locale,
          contentId: data.contentId
        });
      });
    });
    return sitemap;
  }
}
