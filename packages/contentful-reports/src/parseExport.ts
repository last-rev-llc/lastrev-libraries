import { Asset, ContentType, Entry } from 'contentful-management';
import { readFile } from 'fs-extra';

export type ContentfulData = {
  entries: Entry[];
  assets: Asset[];
  contentTypes: ContentType[];
};

const parseExport = async (exportFile: string): Promise<ContentfulData> => {
  const data = await readFile(exportFile, 'utf8');
  const store = JSON.parse(data);
  return store;
};

export default parseExport;
