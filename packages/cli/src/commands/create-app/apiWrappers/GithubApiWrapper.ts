import { Octokit } from '@octokit/rest';
import express from 'express';
import open from 'open';
import axios from 'axios';
import querystring from 'querystring';
import { isString } from 'lodash';
import ora from 'ora';
import BaseApiWrapper from './BaseApiWrapper';
import LastRevConfig, {
  VAL_GITHUB_REPO,
  VAL_NETLIFY_SITE,
  VAL_GITHUB_REPO_NAME,
  VAL_GITHUB_REPO_PRIVACY,
  VAL_GITHUB_REPO_ORG,
  VAL_GITHUB_REPO_DESCRIPTION,
  VAL_GITHUB_REPO_HOMEPAGE,
  VAL_NETLIFY_DEPLOY_KEY
} from '../LastRevConfig';
import Messager from '../Messager';

const messager = Messager.getInstance();

// TODO: move these to .env
const clientId = '9e9744be4720ed8d9958';
const clientSecret = 'e1d4e09925a7a3ad0208849816eb4d7188ebfb51';

export default class GithubApiWrapper extends BaseApiWrapper {
  private octokit: Octokit;

  constructor(config: LastRevConfig) {
    super(config, 'Github');
    this.octokit = new Octokit({
      auth: this.getToken()
    });
  }

  resetApi() {
    this.octokit = new Octokit({
      auth: this.getToken()
    });
  }

  async login(): Promise<string> {
    const spinner = ora('Authenticating with Github').start();
    try {
      const app = express();

      let resolve: (value: unknown) => void;

      const resolveCallback = new Promise((_resolve) => {
        resolve = _resolve;
      });

      app.get('/oauth', function (req, res) {
        resolve(req.query.code);
        res.end(
          '<html><body><p>You have been authenticated. please close this window and return to the terminal to finish.</p></body></html>'
        );
      });

      const port = 53212;

      const server = await app.listen(port);

      const redirect = encodeURIComponent(`http://localhost:${port}/oauth`);
      const scope = encodeURIComponent('repo,public_repo');

      open(`https://github.com/login/oauth/authorize?client_id=${clientId}&scope=${scope}&redirect_uri=${redirect}`);

      const code = await resolveCallback;

      const res = await axios.post(
        'https://github.com/login/oauth/access_token',
        `client_id=${clientId}&client_secret=${clientSecret}&code=${code}&redirect_uri=${redirect}`
      );

      const { access_token } = querystring.parse(res.data);

      await server.close();

      if (!access_token || !isString(access_token)) throw Error('Unable to get token!');

      spinner.succeed();
      return access_token;
    } catch (e) {
      spinner.fail();
      throw e;
    }
  }

  async createDeployKey() {
    await this.ensureLoggedIn();
    const spinner = ora('Adding netlify deploy key in Github').start();
    const githubRepo = this.config.getStateValue(VAL_GITHUB_REPO);
    const key = this.config.getStateValue(VAL_NETLIFY_DEPLOY_KEY);

    try {
      await this.octokit.repos.createDeployKey({
        title: 'Netlify Deploy Key',
        key: key.public_key,
        owner: githubRepo.owner.login,
        repo: githubRepo.name,
        read_only: true
      });

      spinner.succeed();
    } catch (error: any) {
      spinner.fail();
      let message = `Github createDeployKey Failed: ${error.message}`;
      if (error.status === 404) {
        throw Error(
          `${message}. Does the repository ${githubRepo.owner.login} exist and do ${githubRepo.name} has the correct permissions to set up deploy keys?`
        );
      }
      throw Error(message);
    }
  }

  async createWebhook() {
    await this.ensureLoggedIn();
    const spinner = ora('Creating deploy webhook in Github').start();
    const deployHook = this.config.getStateValue(`${VAL_NETLIFY_SITE}.deploy_hook`);
    const githubRepo = this.config.getStateValue(VAL_GITHUB_REPO);
    try {
      await this.octokit.repos.createWebhook({
        owner: githubRepo.owner.login,
        repo: githubRepo.name,
        name: 'web',
        config: {
          url: deployHook,
          content_type: 'json'
        },
        events: ['push', 'pull_request', 'delete'],
        active: true
      });
      spinner.succeed();
    } catch (error: any) {
      spinner.fail();
      if (!error.message.includes('Hook already exists on this repository')) {
        let message = `Failed creating repo hook: ${error.message}`;
        if (error.status === 404) {
          message = `${message}. Do the repository and owner have the correct permissions to set up hooks?`;
        }
        throw Error(`Github createWebhook error: ${message}`);
      }
    }
  }

  async loadGithubRepo(repoOwner: string, repoName: string) {
    await this.ensureLoggedIn();
    const spinner = ora(`Loading Github repo ${repoOwner}/${repoName}`).start();
    try {
      const { data } = await this.octokit.repos.get({
        owner: repoOwner,
        repo: repoName
      });
      this.config.updateStateValue(VAL_GITHUB_REPO, data);
      spinner.succeed();
    } catch (error: any) {
      spinner.fail();
      let message = `Github loadGithubRepo error: ${error.message}`;
      if (error.status === 404) {
        message = `${message}. Does the repository ${repoName} exist and accessible by ${repoOwner}`;
      }
      throw Error(message);
    }
  }

  async downloadLastrevLibrariesTarballArchive(): Promise<any> {
    await this.ensureLoggedIn();
    const spinner = ora('Downloading example tarball archive from Github').start();
    try {
      const archive = await this.octokit.rest.repos.downloadTarballArchive({
        owner: 'last-rev-llc',
        repo: 'lastrev-libraries',
        ref: 'main'
      });
      spinner.succeed();
      return archive;
    } catch (err: any) {
      spinner.fail();
      throw Error(`Github downloadTarballArchive error: ${err.message}`);
    }
  }

  async listOrgsForAuthenticatedUser(): Promise<any[]> {
    await this.ensureLoggedIn();
    try {
      const orgs = await this.octokit.orgs.listForAuthenticatedUser();
      return orgs.data;
    } catch (err: any) {
      throw Error(`Github listOrgsForAuthenticatedUser error: ${err.message}`);
    }
  }

  async createGithubRepoInOrg(orgs: any[]): Promise<any> {
    await this.ensureLoggedIn();
    const org = orgs.find((org) => org.login === this.config.getStateValue(VAL_GITHUB_REPO_ORG))!;
    const spinner = ora(`Creating Github repo in ${org.login}`).start();
    const name = this.config.getStateValue(VAL_GITHUB_REPO_NAME);
    const description = this.config.getStateValue(VAL_GITHUB_REPO_DESCRIPTION);
    const homepage = this.config.getStateValue(VAL_GITHUB_REPO_HOMEPAGE);
    const isPrivate = this.config.getStateValue(VAL_GITHUB_REPO_PRIVACY) === 'private';
    try {
      const created = await this.octokit.repos.createInOrg({
        org: org.login,
        name,
        description,
        homepage,
        private: isPrivate,
        allow_squash_merge: true,
        allow_auto_merge: false,
        allow_merge_commit: false,
        allow_rebase_merge: false,
        delete_branch_on_merge: true,
        default_branch: 'main'
      });
      const githubRepo = created.data;
      messager.delayed(`Your github repository can be found at ${githubRepo.html_url}`);
      this.config.updateStateValue(VAL_GITHUB_REPO, githubRepo);
      spinner.succeed();
    } catch (err: any) {
      spinner.fail();
      throw Error(`Github createInOrg error: ${err.message}`);
    }
  }

  async checkExampleExists(example: string): Promise<void> {
    await this.ensureLoggedIn();
    const spinner = ora('Checking for example').start();
    try {
      await this.octokit.rest.repos.getContent({
        owner: 'last-rev-llc',
        repo: 'lastrev-libraries',
        ref: 'main',
        path: `examples/${example}`
      });
      spinner.succeed();
    } catch (err: any) {
      spinner.fail();
      if (err.message === 'Not Found')
        throw Error(`Github checkExampleExists error: ${example} does not exist in the repo`);
      throw Error(`Github checkExampleExists error: ${err.message}`);
    }
  }

  async updateBranchProtectionRules(): Promise<void> {
    await this.ensureLoggedIn();
    const spinner = ora('Updating branch protection rules').start();

    try {
      const githubRepo = this.config.getStateValue(VAL_GITHUB_REPO);
      await this.octokit.repos.updateBranchProtection({
        owner: githubRepo.owner.login,
        repo: githubRepo.name,
        branch: 'main',
        required_status_checks: {
          strict: true,
          contexts: []
        },
        required_pull_request_reviews: {
          required_approving_review_count: 1
        },
        enforce_admins: null,
        restrictions: null
      });
      spinner.succeed();
    } catch (err: any) {
      spinner.fail();
      throw Error(`Github updateBranchProtectionRules error: ${err.message}`);
    }
  }
}