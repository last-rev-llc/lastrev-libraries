import { createClient } from 'contentful';
import { readFile } from 'fs-extra';
import { each, every, map, reduce, flatMap } from 'lodash';
import { join } from 'path';
import { FileMatcher } from 'file-matcher';
import generateFragmentData from './generateFragmentData';
import { ContentTypeMap, FragmentDataMapping, MergedJsonRepresentationMap, QueryJson } from './types';
import writeFragmentData from './writeFragmentData';
import writePageQuery from './writePageQuery';
import logger from 'loglevel';
import Timer from '@last-rev/timer';
import writeStandardFragments from './writeStandardFragments';
import writeLinkFragment from './writeLinkFragment';
import extractNonReferenceFields from './extractNonReferenceFields';
import mergeContentTypeJsons from './mergeContentTypeJsons';
import buildReferenceTree from './buildReferenceTree';
import capitalizeFirst from './capitalizeFirst';

logger.setLevel('info');

const fileMatcher = new FileMatcher();

type RunProps = {
  inputDirs: string[];
  outputDir: string;
  contentfulDeliveryToken: string;
  contentfulSpaceId: string;
  contentfulEnvironment: string;
  linkContentType?: string;
};

const writeAllFragments = async (
  fragmentDataMapping: FragmentDataMapping,
  outputDir: string,
  linkContentType?: string
): Promise<void> => {
  await Promise.all([
    writeStandardFragments(outputDir),
    ...(linkContentType ? [writeLinkFragment(outputDir, linkContentType)] : []),
    ...map(fragmentDataMapping, (fragmentData, fragmentName) =>
      writeFragmentData(fragmentName, fragmentData, join(outputDir, 'fragments'), fragmentDataMapping)
    )
  ]);
};

const gatherStaticTypes = (
  allContentTypes: ContentTypeMap,
  mergedJsonRepresentationMap: MergedJsonRepresentationMap
): string[] => {
  const staticTypes = extractNonReferenceFields(allContentTypes);
  const referenceTree = buildReferenceTree(mergedJsonRepresentationMap);
  let changed = 1;
  while (changed > 0) {
    changed = 0;
    each(referenceTree, (referredBy, contentTypeId) => {
      if (staticTypes.includes(contentTypeId)) return;
      if (every(referredBy, (referredByContentTypeId) => staticTypes.includes(referredByContentTypeId))) {
        staticTypes.push(contentTypeId);
        changed++;
      }
    });
  }
  return staticTypes;
};

const getInputJsons = async (inputDir: string): Promise<QueryJson[]> => {
  const inputFiles = await fileMatcher.find({
    path: inputDir,
    recursiveSearch: true,
    fileFilter: {
      fileNamePattern: '**/*.json'
    }
  });

  return await Promise.all(
    inputFiles.map((inputFile) =>
      (async () => {
        return JSON.parse(await readFile(inputFile, 'utf-8')) as QueryJson;
      })()
    )
  );
};

const updateWithLinkFragment = (fragmentDataMapping: FragmentDataMapping, linkContentType?: string) => {
  if (!linkContentType) return;
  fragmentDataMapping[`${capitalizeFirst(linkContentType)}Fragment`] = {
    contentType: linkContentType,
    static: true,
    root: true,
    simpleValueFields: new Set(['href', 'as', 'target', 'isModal', 'download']),
    locationFields: new Set(),
    richTextFields: new Set(),
    assetFields: new Set(),
    referenceFields: {}
  };
};

const writeOutput = async (fragmentDataMapping: FragmentDataMapping, outputDir: string) => {
  const timer = new Timer('Wrote output files');
  await Promise.all([
    writeAllFragments(fragmentDataMapping, outputDir),
    writePageQuery(fragmentDataMapping, outputDir)
  ]);
  logger.info(timer.end());
};

const run = async ({
  inputDirs,
  outputDir,
  contentfulDeliveryToken,
  contentfulSpaceId,
  contentfulEnvironment,
  linkContentType
}: RunProps) => {
  const client = createClient({
    space: contentfulSpaceId,
    accessToken: contentfulDeliveryToken,
    environment: contentfulEnvironment,
    host: 'cdn.contentful.com'
  });

  const { items } = await client.getContentTypes();

  const allContentTypes: ContentTypeMap = reduce(
    items,
    (map, contentType) => {
      map[contentType.sys.id] = contentType;
      return map;
    },
    {} as ContentTypeMap
  );

  const inputJsons = flatMap(await Promise.all(map(inputDirs, (inputDir) => getInputJsons(inputDir))));

  const mergedJsonRepresentationMap = mergeContentTypeJsons(inputJsons, allContentTypes);

  const allStatics = gatherStaticTypes(allContentTypes, mergedJsonRepresentationMap);

  const fragmentDataMapping = generateFragmentData(mergedJsonRepresentationMap, allStatics);

  updateWithLinkFragment(fragmentDataMapping, linkContentType);

  await writeOutput(fragmentDataMapping, outputDir);
};

/*
  - list of types that only need one fragment
*/

export default run;
