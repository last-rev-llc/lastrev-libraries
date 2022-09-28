import { readFileSync, outputFile } from 'fs-extra';
import { compile } from 'handlebars';
import { join, resolve } from 'path';
import { Sitemap } from '@last-rev/types';
import { map } from 'lodash';
import sitemapIndexGenerator from './sitemapIndexGenerator';
import sitemapPageGenerator from './sitemapPageGenerator';
import LastRevAppConfig from '@last-rev/app-config';
import { GraphQLClient } from 'graphql-request';
import { buildPagePath } from './helpers';

const indexTemplate = compile(readFileSync(resolve(__dirname, './sitemap-index.hbs'), 'utf8'));
const pageTemplate = compile(readFileSync(resolve(__dirname, './sitemap-page.hbs'), 'utf8'));

const generateIndex = async (sitemap: Sitemap, outDir: string) => {
  const filename = join(outDir, 'sitemap.xml');
  const content = indexTemplate(sitemap);
  await outputFile(filename, content);
};

const generatePages = async (sitemap: Sitemap, outDir: string) => {
  await Promise.all(
    map(sitemap.pages, async (page) => {
      const filename = join(outDir, page.filename);
      const content = pageTemplate(page);
      await outputFile(filename, content);
    })
  );
};

type SitemapGenParams = {
  config: LastRevAppConfig;
  graphqlEndpoint: string;
  site: string;
  outdir: string;
};

async function generateSitemap(params: SitemapGenParams): Promise<void>;

/**
 * @deprecated
 */
async function generateSitemap(sitemap: Sitemap, outdir: string): Promise<void>;

async function generateSitemap(p: SitemapGenParams | Sitemap, outdir?: string) {
  if (outdir) {
    await generateSitemapLegacy(p as Sitemap, outdir);
  }
  await performQueriesAndGenerateSitemap(p as SitemapGenParams);
}

const performQueriesAndGenerateSitemap = async ({ outdir, site, graphqlEndpoint, config }: SitemapGenParams) => {
  const client = new GraphQLClient(graphqlEndpoint);
  const sitemapRootDir = join(outdir, config.sitemap.indexRootPath);
  const sitemapRootFile = join(sitemapRootDir, 'sitemap.xml');
  const { sitemapXml, pageData } = await sitemapIndexGenerator({ client, config });
  await outputFile(sitemapRootFile, sitemapXml);
  await Promise.all(
    pageData.map(async ({ contentType, locale, page }: { contentType: string; locale: string; page: number }) => {
      const { sitemapXml } = await sitemapPageGenerator({ client, config, contentType, locale, page, site });
      const filename = join(outdir, buildPagePath(config, contentType, locale, page));
      await outputFile(filename, sitemapXml);
    })
  );
};

const generateSitemapLegacy = async (sitemap: Sitemap, outdir: string) => {
  await Promise.all([generateIndex(sitemap, outdir), generatePages(sitemap, outdir)]);
};

export { generateSitemap, generateIndex, generatePages };
