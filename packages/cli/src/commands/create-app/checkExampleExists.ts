import ora from 'ora';
import GithubApiWrapper from './apiWrappers/GithubApiWrapper';

const checkExampleExists = async (githubApiWrapper: GithubApiWrapper, example: string): Promise<void> => {
  const spinner = ora('Checking for example').start();
  try {
    await githubApiWrapper.octokit.rest.repos.getContent({
      owner: 'last-rev-llc',
      repo: 'lastrev-libraries',
      ref: 'main',
      path: `examples/${example}`
    });
  } catch (e: any) {
    spinner.fail();
    if (e.message === 'Not Found') throw Error(`Example ${example} does not exist in the repo`);
    throw e;
  }
  spinner.succeed();
};

export default checkExampleExists;
