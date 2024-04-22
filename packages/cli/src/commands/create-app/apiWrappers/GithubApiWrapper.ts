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
  VAL_NETLIFY_DEPLOY_KEY,
  VAL_CREATE_APP_CONFIG
} from '../LastRevConfig';
import Messager from '../Messager';
import { CreateAppConfig } from '../types';

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
    } catch (error) {
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

  async createWebhookForNetlifSite(type: string) {
    await this.ensureLoggedIn();
    const siteKey = `${VAL_NETLIFY_SITE}-${type}`;
    const spinner = ora(`Creating deploy webhook for ${type} site in Github`).start();
    const deployHook = this.config.getStateValue(`${siteKey}.deploy_hook`);
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
    } catch (error) {
      if (!error.message.includes('Hook already exists on this repository')) {
        spinner.fail();
        let message = `Failed creating repo hook for ${type} site: ${error.message}`;
        if (error.status === 404) {
          message = `${message}. Do the repository and owner have the correct permissions to set up hooks?`;
        }
        throw Error(`Github createWebhook error for ${type} site: ${message}`);
      } else {
        // nothing to do. hook already exists.
        spinner.succeed();
      }
    }
  }

  async getMembershipForUser(org: string) {
    await this.ensureLoggedIn();

    const {
      data: { state, permissions }
    } = await this.octokit.orgs.getMembershipForAuthenticatedUser({
      org
    });
    return { state, permissions };
  }

  async userHasRepoAccess(repoOwner: string, repoName: string) {
    await this.ensureLoggedIn();
    try {
      const { data } = await this.octokit.repos.get({
        owner: repoOwner,
        repo: repoName
      });
      return data && data.name === repoName;
    } catch (error) {
      return false;
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
    } catch (error) {
      spinner.fail();
      let message = `Github loadGithubRepo error: ${error.message}`;
      if (error.status === 404) {
        message = `${message}. Does the repository ${repoName} exist and accessible by ${repoOwner}`;
      }
      throw Error(message);
    }
  }

  async downloadLastrevStarterTarballArchive(): Promise<any> {
    await this.ensureLoggedIn();
    const spinner = ora('Downloading starter tarball archive from Github').start();
    try {
      const archive = await this.octokit.rest.repos.downloadTarballArchive({
        owner: 'last-rev-llc',
        repo: 'lastrev-starter-v2',
        ref: 'main'
      });
      spinner.succeed();
      return archive;
    } catch (err) {
      spinner.fail();
      throw Error(`Github downloadTarballArchive error: ${err.message}`);
    }
  }

  async listOrgsForAuthenticatedUser(): Promise<any[]> {
    await this.ensureLoggedIn();
    try {
      const orgs = await this.octokit.orgs.listForAuthenticatedUser();
      return orgs.data;
    } catch (err) {
      throw Error(`Github listOrgsForAuthenticatedUser error: ${err.message}`);
    }
  }

  async userCanCreateInOrg(repoOwner: string): Promise<boolean> {
    await this.ensureLoggedIn();
    try {
      const { data } = await this.octokit.orgs.listForAuthenticatedUser();
      return data.some((org) => org.login === repoOwner);
    } catch (err) {
      throw Error(`Github listOrgsForAuthenticatedUser error: ${err.message}`);
    }
  }

  async getCurrentUserLogin(): Promise<any> {
    await this.ensureLoggedIn();
    try {
      const { data } = await this.octokit.users.getAuthenticated();
      return data.login;
    } catch (err) {
      throw Error(`Github getCurrentUserLogin error: ${err.message}`);
    }
  }

  async createGithubRepoInOrg(org: string): Promise<any> {
    await this.ensureLoggedIn();
    const { app }: CreateAppConfig = this.config.getStateValue(VAL_CREATE_APP_CONFIG);
    const spinner = ora(`Creating Github repo in ${org}`).start();
    try {
      const created = await this.octokit.repos.createInOrg({
        org: org,
        name: app!.name!,
        description: `Monorepo for ${app!.name}`,
        private: true,
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
    } catch (err) {
      spinner.fail();
      throw Error(`Github createInOrg error: ${err.message}`);
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
    } catch (err) {
      spinner.fail();
      messager.error(`Github updateBranchProtectionRules error: ${err.message}. Skipping this step.`);
    }
  }
}
