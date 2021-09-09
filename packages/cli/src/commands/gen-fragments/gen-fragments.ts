import generate from '@last-rev/contentful-fragment-gen';

import program from 'commander';
import dotenv from 'dotenv';

dotenv.config(); //

import { resolve } from 'path';

program
  .requiredOption('-i --input-dir <Input Directory>', 'Path to a directory with contentJson files')
  .requiredOption('-o --output-dir <Output Directory>', 'Path to a directory where generated files will be written')
  .requiredOption(
    '-e --contentful-environment <Contentful Environment>',
    'Contentful environment to use, defaults to CONTENTFUL_ENV environment variable, or "master"',
    process.env.CONTENTFUL_ENV || 'master'
  )
  .requiredOption(
    '-t --contentful-delivery-token <Contentful Delivery Token>',
    'Contentful delivery access token, defaults to CONTENTFUL_DELIVERY_TOKEN environment variable',
    process.env.CONTENTFUL_DELIVERY_TOKEN
  )
  .requiredOption(
    '-s --contentful-space-id <Contentful Space ID>',
    'Contentful space ID, defaults to CONTENTFUL_SPACE_ID environment variable',
    process.env.CONTENTFUL_SPACE_ID
  )
  .option(
    '-l, --link-content-type <Link Content Type ID>',
    'The ID of the Link or Element Link content type to convert'
  )
  .parse(process.argv);

const { inputDir, outputDir, contentfulEnvironment, contentfulDeliveryToken, contentfulSpaceId, linkContentType } =
  program.opts();

generate({
  inputDir: resolve(process.cwd(), inputDir),
  outputDir: resolve(process.cwd(), outputDir),
  contentfulDeliveryToken,
  contentfulEnvironment,
  contentfulSpaceId,
  linkContentType
})
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e.message);
    process.exit(1);
  });
