import { Octokit } from '@octokit/rest';
import ora from 'ora';

const checkExampleExists = async (octokit: Octokit, example: string): Promise<void> => {
  const spinner = ora('Checking for example').start();
  try {
    await octokit.rest.repos.getContent({
      owner: 'last-rev-llc',
      repo: 'lastrev-libraries',
      ref: 'main',
      path: `examples/${example}`
    });
  } catch (e) {
    spinner.fail();
    if (e.message === 'Not Found') throw Error(`Example ${example} does not exist in the repo`);
    throw e;
  }
  spinner.succeed();
};

export default checkExampleExists;
