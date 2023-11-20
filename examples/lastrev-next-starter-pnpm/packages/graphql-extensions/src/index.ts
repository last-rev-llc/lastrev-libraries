import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import type { Source, DocumentNode, GraphQLSchema } from 'graphql';

import fs from 'fs';
import path from 'path';
import { deepMerge } from './utils/deepMerge';

export type GraphQlExtension = {
  typeDefs?: string | DocumentNode | Source | GraphQLSchema;
  resolvers?: {};
  mappers?: {};
  typeMappings?: {};
  pathsConfigs?: {};
  [key: string]: any;
};

function loadFiles() {
  let dirPath = '';
  const modules: { [key: string]: any } = {};

  if (__dirname.includes('.next')) {
    dirPath = path.resolve(process.cwd(), '../../packages/graphql-extensions/src');
    console.warn('Dynamic Extension Files are not supported in NextJS');
    console.warn('Update graphql-extensions/src/index.ts to load ALL extension files manually');

    modules['Algolia'] = require('./Algolia.extension');
    modules['Block'] = require('./Block.extension');
    modules['Blog'] = require('./Blog.extension');
    modules['Card'] = require('./Card.extension');
    modules['CategoryBlog'] = require('./CategoryBlog.extension');
    modules['Collection'] = require('./Collection.extension');
    modules['CollectionExpandable'] = require('./CollectionExpandable.extension');
    modules['CollectionExpandableItem'] = require('./CollectionExpandableItem.extension');
    modules['Footer'] = require('./Footer.extension');
    modules['Form'] = require('./Form.extension');
    modules['Header'] = require('./Header.extension');
    modules['Hero'] = require('./Hero.extension');
    modules['Link'] = require('./Link.extension');
    modules['Media'] = require('./Media.extension');
    modules['NavigationItem'] = require('./NavigationItem.extension');
    modules['Page'] = require('./Page.extension');
    modules['PathsConfigs'] = require('./PathsConfigs.extension');
    modules['Person'] = require('./Person.extension');
    modules['Preview'] = require('./Preview.extension');
    modules['PageResource'] = require('./PageResource.extension');
    modules['Quote'] = require('./Quote.extension');
    modules['PricingPlan'] = require('./PricingPlan.extension');
    modules['RichText'] = require('./RichText.extension');
    modules['Redirect'] = require('./Redirect.extension');
    modules['Section'] = require('./Section.extension');
    modules['SEO'] = require('./SEO.extension');
    modules['Sidekick'] = require('./Sidekick.extension');
    modules['Site'] = require('./Site.extension');
    modules['Text'] = require('./Text.extension');
    modules['Theme'] = require('./Theme.extension');

    //TODO: Find out a way to do dynamic imports in nextjs
    // console.log('Loading files from', dirPath);
    // const extensionFiles = fs.readdirSync(dirPath).filter((file) => /\.extension\.ts$/.test(file));
    // extensionFiles.forEach((file) => {
    // const modulePath = path.join(dirPath, file);
    //   const modulePath = `./${file.replace('.ts', '')}`;
    //   try {
    //     const module = require(modulePath);
    //     console.log({ module });
    //     modules.push(module);
    //   } catch (error) {
    //     console.error(`Failed to load module: ${modulePath}`, error);
    //   }
    // });
  } else {
    dirPath = path.join(__dirname);
    // console.log('Loading files from', dirPath);
    const extensionFiles = fs.readdirSync(dirPath).filter((file) => /\.extension\.js$/.test(file));
    extensionFiles.forEach((file) => {
      const modulePath = path.join(dirPath, file);
      try {
        const module = require(modulePath);
        modules[file.replace('.extension.js', '')] = module;
      } catch (error) {
        console.error(`Failed to load module: ${modulePath}`, error);
      }
    });
  }
  // console.log(`Loaded ${Object.keys(modules)?.length} modules`, Object.keys(modules));
  return Object.values(modules);
}

const extensions: GraphQlExtension[] = loadFiles();

const getNonNullPropertiesFromExtensions = (property: any) =>
  extensions.map((ext: GraphQlExtension) => ext[property]).filter(Boolean);

export const typeDefs = mergeTypeDefs(getNonNullPropertiesFromExtensions('typeDefs'));

// Assuming mergeResolvers can handle an array input. If it doesn't, consider using reduce like below for mappers, typeMappings, and pathsConfigs.
export const resolvers = mergeResolvers(getNonNullPropertiesFromExtensions('resolvers')) as Record<string, any>;
export const mappers = deepMerge({}, ...getNonNullPropertiesFromExtensions('mappers'));
export const typeMappings = deepMerge({}, ...getNonNullPropertiesFromExtensions('typeMappings'));
export const pathsConfigs = deepMerge({}, ...getNonNullPropertiesFromExtensions('pathsConfigs'));
