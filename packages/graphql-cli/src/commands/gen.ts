#! /usr/bin/env node
import dotenv from 'dotenv';
import program from 'commander';
import generateSchema from '@last-rev/graphql-schema-gen';

dotenv.config();

program
  .description('Generates the GraphQL type definitions from your CMS. Currently supported: Contentful')
  .option('--cms <string>', 'Which CMS to use', 'Contentful')
  .option('-o, --out <outputDirectory>', 'Path to output file to generate', 'schema.ts')
  .parse(process.argv);

const opts = program.opts();

switch (opts.cms) {
  case 'Contentful':
    break;
  default:
    console.log(`Unsupported CMS: ${opts.cms}. Please run with -h flag for more info.`);
    process.exit();
}

generateSchema({
  source: opts.cms,
  connectionParams: {
    accessToken: process.env.CONTENTFUL_ACCESSTOKEN || '',
    space: process.env.CONTENTFUL_SPACE_ID || '',
    host: process.env.CONTENTFUL_HOST || 'cdn.contentful.com',
    environment: process.env.CONTENTFUL_ENV || 'master'
  },
  outFile: opts.out
});

console.log('TODO: generate schema.');
