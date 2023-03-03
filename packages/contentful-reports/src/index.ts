import { createClient } from 'contentful';
import { initDb, runReport } from './db';
import { resolve } from 'path';
import { updateStore } from './syncStore';
import { ensureDir, readdir } from 'fs-extra';
import { toCsv } from './formatter';

export const getReportNames = async () =>
  await readdir(resolve(__dirname, '../sql')).then((files) =>
    files.filter((f) => f.endsWith('.sql')).map((f) => f.replace('.sql', ''))
  );

export const runContentfulReports = async ({
  spaceId,
  environment,
  accessToken,
  reports,
  outputDir
}: {
  spaceId: string;
  environment: string;
  accessToken: string;
  reports: string[];
  outputDir: string;
}) => {
  const client = createClient({
    space: spaceId,
    accessToken,
    environment,
    host: 'cdn.contentful.com',
    resolveLinks: false
  });

  const space = await client.getSpace();

  console.log(`Running report for environment: ${environment} in space: ${space.name} (${space.sys.id}).`);
  console.log();
  console.log(`Running the following reports: ${reports.join(', ')}.`);
  console.log();
  console.log(`Writing reports to: ${outputDir}.`);

  const store = await updateStore(spaceId, environment, client);

  const db = await initDb(store);

  await ensureDir(outputDir);

  for (const report of reports) {
    const location = resolve(outputDir, `${report}.csv`);
    const data = await runReport(report, db);
    await toCsv(data, location);
  }

  db.close();
};
