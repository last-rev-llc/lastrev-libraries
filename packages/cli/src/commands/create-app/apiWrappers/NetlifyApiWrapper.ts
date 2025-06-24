import open from 'open';
import NetlifyApi from 'netlify';
import BaseApiWrapper from './BaseApiWrapper';
import ora from 'ora';
import {
  LastRevConfig,
  VAL_GITHUB_REPO,
  VAL_NETLIFY_DEPLOY_KEY,
  VAL_ENV_VARS,
  VAL_NETLIFY_SITE,
  VAL_NETLIFY_BUILD_HOOK
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

  async createSiteInTeam(siteName: string | undefined, accountSlug: string, type: string): Promise<void> {
    await this.ensureLoggedIn();
    try {
      const site = await this.api.createSiteInTeam({
        accountSlug,
        body: {
          name: siteName
        }
      });
      this.config.updateStateValue(`${VAL_NETLIFY_SITE}-${type}`, site);

      messager.log(chalk.greenBright.bold.underline(`Netlify ${type} site created`));

      messager.delayed(`You can administer your netlify ${type} site at: ${site.admin_url}`);
      messager.delayed(`You can view your published ${type} website, once deployed, at: ${site.ssl_url || site.url}`);
    } catch (error: any) {
      if (error.status === 422) {
        if (siteName) {
          messager.log(`${siteName}.netlify.app already exists. Generating a random name...`);
          await this.createSiteInTeam(undefined, accountSlug, type);
        } else {
          throw Error(
            `Unable to create ${type} site. Please create it manually and alert the LastRev team about this issue.`
          );
        }
      } else {
        throw Error(`Netlify createSiteInTeam ${type} error: ${error.status}: ${error.message}`);
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

  async createHookBySiteId(event: string, githubToken: string, type: string): Promise<void> {
    await this.ensureLoggedIn();
    const siteKey = `${VAL_NETLIFY_SITE}-${type}`;
    const siteId = this.config.getStateValue(`${siteKey}.id`);
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
      throw Error(
        `Netlify createHookBySiteId error for ${type} site : ${err.status}: ${err.message} - event ${err.event}`
      );
    }
  }

  async updateSiteWithRepo(type: string) {
    await this.ensureLoggedIn();
    const siteKey = `${VAL_NETLIFY_SITE}-${type}`;
    const spinner = ora(`Updating Netlify ${type} site with Github repository`).start();
    const githubRepo = this.config.getStateValue(VAL_GITHUB_REPO);
    const deployKey = this.config.getStateValue(VAL_NETLIFY_DEPLOY_KEY);
    const siteId = this.config.getStateValue(`${siteKey}.id`);

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
            base: type === 'storybook' ? './packages/components' : '.',
            dir: type === 'storybook' ? './packages/components' : './packages/web',
            functions_dir: './packages/functions/src'
          }
        }
      });

      this.config.updateStateValue(siteKey, updatedSite);
      spinner.succeed();
    } catch (error: any) {
      spinner.fail();
      const message = `Netlify updateSiteWithRepo for ${type} site error: ${error.status}, ${error.message}`;
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

  async userHasAccountAccess(accountSlug: string): Promise<boolean> {
    await this.ensureLoggedIn();
    const accounts = await this.api.listAccountsForUser();
    return accounts.some((account: any) => account.slug === accountSlug);
  }

  async addBuildHookForSite(type: string): Promise<void> {
    await this.ensureLoggedIn();
    try {
      const siteKey = `${VAL_NETLIFY_SITE}-${type}`;
      const siteId = this.config.getStateValue(`${siteKey}.id`);
      const { url } = await this.api.createSiteBuildHook({
        siteId: siteId,
        body: {
          name: 'Contentful Build Hook',
          branch: 'main'
        }
      });

      this.config.updateStateValue(`${VAL_NETLIFY_BUILD_HOOK}-${type}`, url);
    } catch (err: any) {
      throw Error(`Netlify addBuildHookForSite ${type} error: ${err.message}`);
    }
  }

  async updateSiteWithEnvVars(type: string): Promise<void> {
    await this.ensureLoggedIn();

    const siteKey = `${VAL_NETLIFY_SITE}-${type}`;

    const spinner = ora(`Updating Netlify ${type} build environment variables`).start();

    const envVars = this.config.getStateValue(VAL_ENV_VARS);

    try {
      const site = this.config.getStateValue(`${siteKey}`);
      const siteId = site.id;

      const siteResult = await this.api.updateSite({
        siteId,
        body: {
          build_settings: {
            env: {
              ...envVars,
              LOG_LEVEL: type === 'prod' ? 'error' : 'info',
              NEXT_PUBLIC_CONTENTFUL_SPACE_ID: envVars.CONTENTFUL_SPACE_ID,
              NEXT_PUBLIC_CONTENTFUL_ENV: envVars.CONTENTFUL_ENV,
              GRAPHQL_SERVER_URL: '/.netlify/functions/graphql',
              DOMAIN: site.ssl_url || site.url,
              YARN_FLAGS: '--prefer-offline',
              ...(type !== 'prod'
                ? {
                    PAGES_REVALIDATE: '60',
                    CONTENTFUL_USE_PREVIEW: 'true'
                  }
                : {})
            }
          }
        }
      });

      this.config.updateStateValue(siteKey, siteResult);
      spinner.succeed();
    } catch (err: any) {
      spinner.fail();
      throw Error(`Netlify updateSiteWithEnvVars Error: ${err.message}`);
    }
  }
}
