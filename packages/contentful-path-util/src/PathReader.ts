import { each, flatMap } from 'lodash';
import PathTree from './PathTree';
import { PathNode } from './PathNode';
import { PathStore } from './PathStore';
import { DEFAULT_SITE_KEY } from './constants';
import { PagePathsParam } from 'packages/types';

export default class PathReader {
  trees: { [site: string]: PathTree } = {};
  pathStore: PathStore;

  constructor(pathStore: PathStore) {
    this.pathStore = pathStore;
  }

  async load(site: string): Promise<void> {
    const tree = (this.trees[site] = new PathTree());
    const serialized = await this.pathStore.load(site);
    tree.rebuildFromSerialized(serialized);
  }

  async ensureLoaded(site: string): Promise<void> {
    if (!this.trees[site]) {
      await this.load(site);
    }
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

  async getNodeByPath(path: string, site: string = DEFAULT_SITE_KEY): Promise<PathNode | undefined> {
    await this.ensureLoaded(site);
    return this.trees[site]!.getNodeByPath(path);
  }

  async getTree(filter?: (node: PathNode) => boolean, site: string = DEFAULT_SITE_KEY): Promise<PathTree> {
    await this.ensureLoaded(site);
    return filter ? this.trees[site]!.filter(filter) : this.trees[site]!;
  }

  async getSitemap(locales: string[], defaultLocale: string, site: string = DEFAULT_SITE_KEY): Promise<string[]> {
    await this.ensureLoaded(site);
    const sitemap: string[] = [];
    this.trees[site]!.bfs((node: PathNode) => {
      if (!node.data) return;
      const data = node.data!;
      each(locales, (locale) => {
        const prefix = locale === defaultLocale ? '' : `/${locale}`;
        if (data.excludedLocales.includes(locale)) return;
        sitemap.push(`${prefix}${data.fullPath}`);
      });
    });
    return sitemap;
  }
}
