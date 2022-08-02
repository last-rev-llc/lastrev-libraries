import { join } from 'path';
import { readFile, existsSync } from 'fs-extra';

const readJsonFileInDir = async (cwd: string, filename: string) => {
  const jsonPath = join(cwd, filename);
  if (!existsSync(jsonPath)) {
    throw Error(`No ${filename} found in ${cwd}`);
  }
  try {
    const json = JSON.parse(await readFile(jsonPath, 'utf-8'));
    return json;
  } catch (err: any) {
    throw Error(`unable to read ${jsonPath}: ${err.message}`);
  }
};

export default readJsonFileInDir;
