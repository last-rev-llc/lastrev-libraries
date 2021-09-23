import { Octokit } from '@octokit/rest';
import { Stream } from 'stream';
import { promisify } from 'util';
import got from 'got';
import tar from 'tar';
import ora from 'ora';
import { URL } from 'url';

const pipeline = promisify(Stream.pipeline);

type DAEAProps = {
  octokit: Octokit;
  root: string;
  example: string;
};

const downloadAndExtractArchive = async ({ octokit, root, example }: DAEAProps): Promise<void> => {
  const spinner = ora('Downloading and extracting archive').start();
  try {
    const result = await octokit.rest.repos.downloadTarballArchive({
      owner: 'last-rev-llc',
      repo: 'lastrev-libraries',
      ref: 'main'
    });

    const regex = new RegExp(`^[^/]*/examples/${example}/.*`);

    await pipeline(
      got.stream(new URL(result.url)),
      tar.extract({
        cwd: root,
        strip: 3,
        filter: (path: string) => regex.test(path)
      })
    );
  } catch (e: any) {
    spinner.fail();
    throw e;
  }
  spinner.succeed();
};

export default downloadAndExtractArchive;
