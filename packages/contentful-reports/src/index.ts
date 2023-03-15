import { initDb, runReport } from './db';
import { resolve } from 'path';
import { ensureDir, readdir, readFile, writeFile } from 'fs-extra';
import { toCsv } from './formatter';
import parseExport from './parseExport';

export const getReportNames = async () =>
  await readdir(resolve(__dirname, '../sql')).then((files) =>
    files.filter((f) => f.endsWith('.sql') && f !== 'db.schema.sql').map((f) => f.replace('.sql', ''))
  );

export const dumpSqlFiles = async (outputDir: string) => {
  const reportNames = await getReportNames();
  await ensureDir(outputDir);
  for (const reportName of reportNames) {
    // copy file to outputDir
    const sql = await readFile(resolve(__dirname, `../sql/${reportName}.sql`), 'utf8');
    await writeFile(resolve(outputDir, `${reportName}.sql`), sql);
  }
};

export const runContentfulReports = async ({
  spaceId,
  environment,
  reports,
  inputFile,
  outputDir,
  externalReports
}: {
  spaceId: string;
  environment: string;
  reports: string[];
  inputFile: string;
  outputDir: string;
  externalReports: { report: string; reportSql: string }[];
}) => {
  console.log(`Running report for environment: ${environment} in space: ${spaceId}.\n`);
  console.log(`Running the following reports: ${reports.join(', ')}.\n`);
  console.log(`Writing reports to: ${outputDir}.`);

  const store = await parseExport(inputFile);

  const db = await initDb(store);

  await ensureDir(outputDir);

  const reportData = [
    ...(await Promise.all(
      reports.map(async (report) => ({
        report,
        reportSql: await readFile(resolve(__dirname, `../sql/${report}.sql`), 'utf8')
      }))
    )),
    ...externalReports
  ];

  for (const { report, reportSql } of reportData) {
    const location = resolve(outputDir, `${report}.csv`);
    const data = await runReport(reportSql, db, report);
    await toCsv(data, location);
  }

  db.close();
};
