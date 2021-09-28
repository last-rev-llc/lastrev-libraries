import tar from 'tar';
import ora from 'ora';
import https from 'https';
import GithubApiWrapper from './apiWrappers/GithubApiWrapper';

type DAEAProps = {
  githubApiWrapper: GithubApiWrapper;
  root: string;
  example: string;
};

const downloadAndExtractArchive = async ({ githubApiWrapper, root, example }: DAEAProps): Promise<void> => {
  const spinner = ora('Downloading and extracting archive').start();
  try {
    const result = await githubApiWrapper.octokit.rest.repos.downloadTarballArchive({
      owner: 'last-rev-llc',
      repo: 'lastrev-libraries',
      ref: 'main'
    });

    const regex = new RegExp(`^[^/]*/examples/${example}/.*`);

    await new Promise((resolve, reject) => {
      https.get(result.url, (res) => {
        res.on('end', resolve);

        res.on('error', reject);

        res.pipe(
          tar.extract({
            cwd: root,
            strip: 3,
            filter: (path: string) => regex.test(path)
          })
        );
      });
    });
  } catch (e: any) {
    spinner.fail();
    throw e;
  }
  spinner.succeed();
};

export default downloadAndExtractArchive;
