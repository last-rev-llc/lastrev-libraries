import open from 'open';
import NetlifyApi from 'netlify';
import BaseApiWrapper from './BaseApiWrapper';
import ora from 'ora';
import LastRevConfig, {
  VAL_NETLIFY_SITE_NAME,
  VAL_NETLIFY_ACCOUNT_SLUG,
  VAL_NETLIFY_SITE,
  VAL_GITHUB_REPO,
  VAL_NETLIFY_DEPLOY_KEY,
  VAL_ENV_VARS
} from '../LastRevConfig';
import chalk from 'chalk';
import Messager from '../Messager';

// TODO: create a netlify oauth app?
const NETLIFY_CLIENT_ID = 'd6f37de6614df7ae58664cfca524744d73807a377f5ee71f1a254f78412e3750';

const messager = Messager.getInstance();

export default class NetlifyApiWrapper extends BaseApiWrapper {
  private api: NetlifyApi;

  constructor(config: LastRevConfig) {
    super(config, 'Netlify');
    this.api = new NetlifyApi(this.getToken() || '');
  }

  resetApi(): void {
    this.api = new NetlifyApi(this.getToken() || '');
  }

  async pollForToken(ticket: string): Promise<string> {
    try {
      const token = await this.api.getAccessToken(ticket, { timeout: 3e5 });
      if (!token) {
        throw Error('Could not retrieve access token');
      }
      return token;
    } catch (error: any) {
      if (error.name === 'TimeoutError') {
        throw Error(`Timed out waiting for authorization.`);
      } else {
        throw Error(error);
      }
    }
  }

  async login(): Promise<string> {
    messager.log(`Logging into your Netlify account...`);

    // Create ticket for auth
    const ticket = await this.api.createTicket({
      clientId: NETLIFY_CLIENT_ID
    });

    // Open browser for authentication
    const authLink = `https://app.netlify.com/authorize?response_type=ticket&ticket=${ticket.id}`;

    messager.log(`Opening ${authLink}`);
    await open(authLink);

    return await this.pollForToken(ticket);
  }

  async createSiteInTeam(): Promise<{ shouldRerun: boolean }> {
    await this.ensureLoggedIn();
    const siteName = this.config.getStateValue(VAL_NETLIFY_SITE_NAME);
    const accountSlug = this.config.getStateValue(VAL_NETLIFY_ACCOUNT_SLUG);
    try {
      const site = await this.api.createSiteInTeam({
        accountSlug,
        body: {
          name: siteName
        }
      });
      this.config.updateStateValue(VAL_NETLIFY_SITE, site);

      messager.log(chalk.greenBright.bold.underline(`Netlify Site Created`));

      messager.delayed(`You can administer your netlify site at: ${site.admin_url}`);
      messager.delayed(`You can view your published website, once deployed, at: ${site.ssl_url || site.url}`);

      return { shouldRerun: false };
    } catch (error: any) {
      if (error.status === 422) {
        messager.log(`${siteName}.netlify.app already exists. Please try a different slug.`);
        this.config.updateStateValue(VAL_NETLIFY_SITE_NAME, undefined);
        return { shouldRerun: true };
      } else {
        throw Error(`Netlify createSiteInTeam error: ${error.status}: ${error.message}`);
      }
    }
  }

  async createDeployKey(): Promise<void> {
    await this.ensureLoggedIn();
    const spinner = ora('Creating Netlify deploy key.').start();
    try {
      const key = await this.api.createDeployKey();
      this.config.updateStateValue(VAL_NETLIFY_DEPLOY_KEY, key);
      spinner.succeed();
    } catch (err: any) {
      spinner.fail();
      throw Error(`Netlify createDeployKey error: ${err.status}: ${err.message}`);
    }
  }

  async createHookBySiteId(event: string, githubToken: string): Promise<void> {
    await this.ensureLoggedIn();
    const siteId = this.config.getStateValue(`${VAL_NETLIFY_SITE}.id`);
    try {
      await this.api.createHookBySiteId({
        site_id: siteId,
        body: {
          type: 'github_commit_status',
          event,
          data: {
            access_token: githubToken
          }
        }
      });
    } catch (err: any) {
      throw Error(`Netlify createHookBySiteId error: ${err.status}: ${err.message} - event ${err.event}`);
    }
  }

  async updateSiteWithRepo() {
    await this.ensureLoggedIn();
    const spinner = ora('Updating Netlify site with Github repository').start();
    const githubRepo = this.config.getStateValue(VAL_GITHUB_REPO);
    const deployKey = this.config.getStateValue(VAL_NETLIFY_DEPLOY_KEY);
    const siteId = this.config.getStateValue(`${VAL_NETLIFY_SITE}.id`);

    try {
      const updatedSite = await this.api.updateSite({
        siteId: siteId,
        body: {
          repo: {
            id: githubRepo.id,
            provider: 'github',
            repo_path: githubRepo.full_name,
            repo_branch: githubRepo.default_branch,
            allowed_branches: [githubRepo.default_branch],
            deploy_key_id: deployKey.id,
            base: '.',
            dir: './packages/web',
            functions_dir: './packages/functions/src'
          }
        }
      });

      this.config.updateStateValue(VAL_NETLIFY_SITE, updatedSite);
      spinner.succeed();
    } catch (error: any) {
      spinner.fail();
      const message = `Netlify updateSiteWithRepo error: ${error.status}, ${error.message}`;
      throw Error(message);
    }
  }

  async listAccountsForUser(): Promise<any[]> {
    await this.ensureLoggedIn();
    try {
      return await this.api.listAccountsForUser();
    } catch (err: any) {
      throw Error(`Netlify listAccountsForUser error: ${err.status}: ${err.message}`);
    }
  }

  async updateSiteWithEnvVars(): Promise<void> {
    await this.ensureLoggedIn();

    const spinner = ora('Updating Netlify build environment variables').start();

    const envVars = this.config.getStateValue(VAL_ENV_VARS);

    try {
      const siteId = this.config.getStateValue(`${VAL_NETLIFY_SITE}.id`);

      const siteResult = await this.api.updateSite({
        siteId,
        body: {
          build_settings: {
            env: {
              ...envVars,
              LOG_LEVEL: 'info'
            }
          }
        }
      });

      this.config.updateStateValue(VAL_NETLIFY_SITE, siteResult);
      spinner.succeed();
    } catch (err: any) {
      spinner.fail();
      throw Error(`Netlify updateSiteWithEnvVars Error: ${err.message}`);
    }
  }
}
