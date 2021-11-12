import { writeFile, readFileSync, ensureDir } from 'fs-extra';
import { compile } from 'handlebars';
import { each, pick, uniq } from 'lodash';
import { join, resolve } from 'path';
import { FragmentData, FragmentDataMapping } from './types';
import capitalizeFirst from './capitalizeFirst';

const template = compile(readFileSync(resolve(__dirname, './fragment.hbs'), 'utf8'));

const gatherSubFragments = (
  fragmentData: FragmentData,
  fragmentDataMapping: FragmentDataMapping
): FragmentDataMapping => {
  const outKeys: string[] = [];
  each(fragmentData.referenceFields, (fragmentNames) => outKeys.push(...Array.from(fragmentNames)));
  return pick(fragmentDataMapping, uniq(outKeys));
};

const writeFragmentData = async (
  fragmentName: string,
  fragmentData: FragmentData,
  outputDir: string,
  fragmentDataMapping: FragmentDataMapping,
  typeMappings: Record<string, string>
): Promise<void> => {
  const contentTypeDir = join(outputDir, capitalizeFirst(fragmentData.contentType, typeMappings));

  await ensureDir(contentTypeDir);

  const outputPath = join(contentTypeDir, `${fragmentName}.ts`);

  const importedFragments = gatherSubFragments(fragmentData, fragmentDataMapping);
  const standardImports = [];

  if (fragmentData.richTextFields.size > 0) {
    standardImports.push('RichTextFragment');
  }
  if (fragmentData.locationFields.size > 0) {
    standardImports.push('LocationFragment');
  }
  if (fragmentData.assetFields.size > 0) {
    standardImports.push('MediaFragment');
  }

  const output = template({
    importedFragments,
    standardImports,
    fragmentName,
    ...fragmentData
  });

  await writeFile(outputPath, output);
};

export default writeFragmentData;
