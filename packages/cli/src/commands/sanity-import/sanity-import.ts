import program from 'commander';
import { writeFile, ensureDir } from 'fs-extra';
import { resolve } from 'path';
import { createClient } from 'contentful-management';

interface Options {
  spaceId: string;
  environment: string;
  managementToken: string;
  sanityProjectId: string;
  sanityDataset: string;
  sanityToken?: string;
  outputDir: string;
}

const mapField = (field: any) => {
  const base = { name: field.id, title: field.name };
  switch (field.type) {
    case 'Symbol':
    case 'Text':
      return { ...base, type: 'string' };
    case 'Integer':
    case 'Number':
      return { ...base, type: 'number' };
    case 'Boolean':
      return { ...base, type: 'boolean' };
    case 'Date':
      return { ...base, type: 'datetime' };
    case 'Location':
      return { ...base, type: 'geopoint' };
    case 'Object':
      return { ...base, type: 'object' };
    case 'RichText':
      return { ...base, type: 'array', of: [{ type: 'block' }] };
    case 'Link':
      if (field.linkType === 'Asset') {
        return { ...base, type: 'image' };
      }
      return { ...base, type: 'reference', to: [{ type: field.linkType }] };
    case 'Array': {
      const item = field.items || {};
      if (item.type === 'Link' && item.linkType === 'Asset') {
        return { ...base, type: 'array', of: [{ type: 'image' }] };
      }
      if (item.type === 'Link' && item.linkType === 'Entry') {
        const toType = (item.validations && item.validations[0]?.linkContentType?.[0]) || 'content';
        return { ...base, type: 'array', of: [{ type: 'reference', to: [{ type: toType }] }] };
      }
      return { ...base, type: 'array', of: [{ type: 'string' }] };
    }
    default:
      return { ...base, type: 'string' };
  }
};

const run = async (opts: Options) => {
  const client = createClient({ accessToken: opts.managementToken });
  const space = await client.getSpace(opts.spaceId);
  const env = await space.getEnvironment(opts.environment);
  const types = await env.getContentTypes();

  await ensureDir(opts.outputDir);

  for (const ct of types.items) {
    const fields = ct.fields.map(mapField);
    const schema = `export default {\n  name: '${ct.sys.id}',\n  title: '${ct.name}',\n  type: 'document',\n  fields: ${JSON.stringify(fields, null, 2)}\n};\n`;
    const file = resolve(opts.outputDir, `${ct.sys.id}.ts`);
    await writeFile(file, schema);
  }
};

program
  .requiredOption('-s, --space-id <spaceId>', 'Contentful space id')
  .requiredOption('-e, --environment <environment>', 'Contentful environment', process.env.CONTENTFUL_ENV || 'master')
  .requiredOption('-m, --management-token <managementToken>', 'Contentful management token', process.env.CONTENTFUL_MANAGEMENT_TOKEN)
  .requiredOption('-p, --sanity-project-id <sanityProjectId>', 'Sanity project id', process.env.SANITY_PROJECT_ID)
  .requiredOption('-d, --sanity-dataset <sanityDataset>', 'Sanity dataset', process.env.SANITY_DATASET)
  .option('-t, --sanity-token <sanityToken>', 'Sanity token', process.env.SANITY_TOKEN)
  .option('-o, --output-dir <outputDir>', 'Output directory', 'schemas')
  .parse(process.argv);

const opts = program.opts() as Options;

run({
  spaceId: opts.spaceId,
  environment: opts.environment,
  managementToken: opts.managementToken,
  sanityProjectId: opts.sanityProjectId,
  sanityDataset: opts.sanityDataset,
  sanityToken: opts.sanityToken,
  outputDir: resolve(process.cwd(), opts.outputDir)
})
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
