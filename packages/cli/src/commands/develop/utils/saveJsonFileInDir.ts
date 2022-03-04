import { join } from 'path';
import { writeFile, existsSync } from 'fs-extra';

const saveJsonFileInDir = async (cwd: string, filename: string, content: any) => {
  const jsonPath = join(cwd, filename);
  if (!existsSync(jsonPath)) {
    throw Error(`No ${filename} found in ${cwd}`);
  }
  try {
    await writeFile(jsonPath, JSON.stringify(content, null, 2));
  } catch (err: any) {
    throw Error(`unable to write to ${jsonPath}: ${err.message}`);
  }
};

export default saveJsonFileInDir;
