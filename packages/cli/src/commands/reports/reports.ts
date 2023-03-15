import { createCommand } from 'commander';
import { runContentfulReports, getReportNames, dumpSqlFiles } from '@last-rev/contentful-reports';
import { basename, resolve } from 'path';
import { readFile } from 'fs-extra';
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
    .option('-s, --spaceId <spaceId>', 'Contentful space ID')
    .option('-i, --input-file <inputFile>', 'Input file')
    .option('-e, --environment <environment>', 'Contentful environment', 'master')
    .option('-o, --output-dir <outputDir>', 'Output directory')
    .option('-d, --dump-sql-files', 'Dump sql files to output directory')
    .option(
      '-r, --reports <reports>',
      `Reports to run, comma separated. Leave blank for all. Available reports: ${reportNames.join(
        ', '
      )}, or include a path to a custom sql file`
    )
    .parse(process.argv);

  const opts = program.opts();

  if (opts.dumpSqlFiles) {
    await dumpSqlFiles(opts.outputDir ? resolve(process.cwd(), opts.outputDir) : process.cwd());
    return;
  }

  if (!opts.spaceId) {
    throw new Error('spaceId is required');
  }

  if (!opts.inputFile) {
    throw new Error('inputFile is required');
  }

  const { reports, externalFiles } = (
    opts.reports ? opts.reports.split(',').map((r: string) => r.trim()) : reportNames
  ).reduce(
    (acc: any, reportName: string) => {
      if (reportName.endsWith('.sql')) {
        acc.externalFiles.push(reportName);
      } else {
        acc.reports.push(reportName);
      }
      return acc;
    },
    {
      reports: [],
      externalFiles: []
    }
  );

  await runContentfulReports({
    spaceId: opts.spaceId,
    environment: opts.environment,
    outputDir: opts.outputDir ? resolve(process.cwd(), opts.outputDir) : process.cwd(),
    inputFile: resolve(process.cwd(), opts.inputFile),
    reports,
    externalReports: await Promise.all(
      // report = stripped filename, no paths or extnesions
      externalFiles.map(async (f: string) => ({
        report: basename(f).replace('.sql', ''),
        reportSql: await readFile(resolve(process.cwd(), f), 'utf8')
      }))
    )
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
