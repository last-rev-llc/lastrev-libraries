import { GenerateSchemaParams } from './types';
import { compile } from 'handlebars';
import { readFileSync, writeFileSync } from 'fs';
import fetch from './fetchers';
import { resolve } from 'path';

const schemaTemplate = readFileSync(resolve(__dirname, './template.hbs'), 'utf-8');

export default async ({ source, connectionParams, outFile }: GenerateSchemaParams) => {
  const generatorInput = await fetch(source, connectionParams);
  const out = compile(schemaTemplate)({ items: generatorInput });
  writeFileSync(outFile, out);
};
