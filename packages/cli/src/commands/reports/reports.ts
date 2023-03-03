import { createCommand } from 'commander';
import { runContentfulReports, getReportNames } from '@last-rev/contentful-reports';
import { resolve } from 'path';
const run = async () => {
  const program = createCommand();

  const reportNames = await getReportNames();

  program
    .requiredOption('-s, --spaceId <spaceId>', 'Contentful space ID')
    .requiredOption('-t, --accessToken <accessToken>', 'Contentful delivery access token')
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
    accessToken: opts.accessToken,
    outputDir: opts.outputDir ? resolve(process.cwd(), opts.outputDir) : process.cwd(),
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
