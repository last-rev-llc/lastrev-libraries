import { createCommand } from 'commander';
import { runContentfulReports, getReportNames } from '@last-rev/contentful-reports';
import { resolve } from 'path';
const run = async () => {
  const program = createCommand();

  const reportNames = await getReportNames();

  program
    .description(
      `Run reports on a Contentful export

You must first have a file location of an existing contentful export, using the contentful-cli (https://www.npmjs.com/package/contentful-cli)
Run the following steps to generate the export:
    
contentful login (make sure that you are logged into an account with access to the space you want to export)
contentful space export --space-id {spaceId} --environment-id {envId} --export-dir {exportDir} --include-drafts
    `
    )
    .requiredOption('-s, --spaceId <spaceId>', 'Contentful space ID')
    .requiredOption('-i, --input-file <inputFile>', 'Input file')
    .option('-e, --environment <environment>', 'Contentful environment', 'master')
    .option('-o, --output-dir <outputDir>', 'Output directory')
    .option(
      '-r, --reports <reports>',
      `Reports to run, comma separated. Leave blank for all. Available reports: ${reportNames.join(', ')}`
    )
    .parse(process.argv);

  const opts = program.opts();

  await runContentfulReports({
    spaceId: opts.spaceId,
    environment: opts.environment,
    outputDir: opts.outputDir ? resolve(process.cwd(), opts.outputDir) : process.cwd(),
    inputFile: resolve(process.cwd(), opts.inputFile),
    reports: opts.reports ? opts.reports.split(',').map((r: string) => r.trim()) : reportNames
  });
};

run()
  .then(() => {
    process.exit(0);
  })
  .catch((err: any) => {
    console.error(err);
    process.exit(1);
  });
