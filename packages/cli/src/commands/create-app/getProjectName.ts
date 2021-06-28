import { prompt } from 'inquirer';
import { resolve } from 'path';
import { existsSync } from 'fs-extra';

const getProjectName = async (directory: string): Promise<string> => {
  const { name } = await prompt([
    {
      name: 'name',
      message: 'What is the name of the new project to create?',
      type: 'input'
    }
  ]);

  const fullPath = resolve(directory, name);
  const pathExists = existsSync(fullPath);

  if (pathExists) throw Error(`A directory called ${name} already exists in ${directory}`);

  return name;
};

export default getProjectName;
