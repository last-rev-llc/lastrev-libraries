import { GenerateSchemaParams } from './types';
import { compile } from 'handlebars';
import { readFileSync, writeFile, ensureDir } from 'fs-extra';
import fetch from './fetchers';
import { resolve, dirname } from 'path';

const schemaTemplate = readFileSync(resolve(__dirname, './template.hbs'), 'utf-8');

export default async ({ source, connectionParams, outFile }: GenerateSchemaParams) => {
  const generatorInput = await fetch(source, connectionParams);
  const out = compile(schemaTemplate)({ items: generatorInput });
  await ensureDir(dirname(outFile));
  await writeFile(outFile, out);
};
