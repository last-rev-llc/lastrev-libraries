import { readFileSync, ensureDir, writeFile } from 'fs-extra';
import { compile } from 'handlebars';
import { join, resolve } from 'path';
import { Sitemap } from '@last-rev/types';
import { map } from 'lodash';

const indexTemplate = compile(readFileSync(resolve(__dirname, './sitemap-index.hbs'), 'utf8'));
const pageTemplate = compile(readFileSync(resolve(__dirname, './sitemap-page.hbs'), 'utf8'));

const generateIndex = async (sitemap: Sitemap, outDir: string) => {
  const filename = join(outDir, 'sitemap.xml');
  const content = indexTemplate(sitemap);
  await writeFile(filename, content);
};

const generatePages = async (sitemap: Sitemap, outDir: string) => {
  await Promise.all(
    map(sitemap.pages, async (page) => {
      const filename = join(outDir, page.filename);
      const content = pageTemplate(page);
      await writeFile(filename, content);
    })
  );
};

const generateSitemap = async (sitemap: Sitemap, outDir: string) => {
  await ensureDir(outDir);
  await Promise.all([generateIndex(sitemap, outDir), generatePages(sitemap, outDir)]);
};

export default generateSitemap;
