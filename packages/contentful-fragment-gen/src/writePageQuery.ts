import { ensureDir, readFileSync, writeFile } from 'fs-extra';
import { compile } from 'handlebars';
import { pickBy } from 'lodash';
import { join, resolve } from 'path';
import { FragmentDataMapping } from './types';

const template = compile(readFileSync(resolve(__dirname, './pageQuery.hbs'), 'utf8'));

const writePageQuery = async (fragmentDataMapping: FragmentDataMapping, outputDir: string): Promise<void> => {
  const queriesDir = join(outputDir, 'queries');

  await ensureDir(queriesDir);

  const rootFramentMap = pickBy(fragmentDataMapping, (fragmentData) => fragmentData.root);

  const output = template({ data: rootFramentMap });

  await writeFile(join(queriesDir, 'page.ts'), output);
};

export default writePageQuery;
