import { writeFile } from 'fs-extra';
import { parse } from 'json2csv';

export const toCsv = async (data: any, fileLocation: string) => {
  const csv = parse(data);
  await writeFile(fileLocation, csv);
};
