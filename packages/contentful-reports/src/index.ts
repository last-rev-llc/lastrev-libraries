import { initDb, runReport } from './db';
import { resolve } from 'path';
import { ensureDir, readdir } from 'fs-extra';
import { toCsv } from './formatter';
import parseExport from './parseExport';

export const getReportNames = async () =>
  await readdir(resolve(__dirname, '../sql')).then((files) =>
    files.filter((f) => f.endsWith('.sql')).map((f) => f.replace('.sql', ''))
  );

export const runContentfulReports = async ({
  spaceId,
  environment,
  reports,
  inputFile,
  outputDir
}: {
  spaceId: string;
  environment: string;
  reports: string[];
  inputFile: string;
  outputDir: string;
}) => {
  console.log(`Running report for environment: ${environment} in space: ${spaceId}.\n`);
  console.log(`Running the following reports: ${reports.join(', ')}.\n`);
  console.log(`Writing reports to: ${outputDir}.`);

  const store = await parseExport(inputFile);

  const db = await initDb(store);

  await ensureDir(outputDir);

  for (const report of reports) {
    const location = resolve(outputDir, `${report}.csv`);
    const data = await runReport(report, db);
    await toCsv(data, location);
  }

  db.close();
};
