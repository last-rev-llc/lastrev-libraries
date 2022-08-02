import { prompt } from 'inquirer';
import open from 'open';
// import { Space } from 'contentful';
import { createClient, ClientAPI } from 'contentful-management';
import BaseApiWrapper from './BaseApiWrapper';
import LastRevConfig, {
  VAL_CONTENTFUL_DELIVERY_KEY,
  VAL_CONTENTFUL_PREVIEW_KEY,
  VAL_CONTENTFUL_DEFAULT_SITE_ID,
  VAL_CONTENTFUL_DEFAULT_SITE_KEY,
  VAL_CREATE_APP_CONFIG,
  VAL_NETLIFY_SITE,
  VAL_NETLIFY_BUILD_HOOK
} from '../LastRevConfig';
import { map } from 'lodash';
import { ApiKey } from 'contentful-management/dist/typings/export-types';
import { CreateAppConfig } from '../types';
import axios from 'axios';
import { Extension } from 'contentful-management/dist/typings/entities/extension';
import ora from 'ora';

const LASTREV_APIKEY_NAME = 'LastRev API Key';

// TODO: create a contentful oauth app?
const APP_ID = '9f86a1d54f3d6f85c159468f5919d6e5d27716b3ed68fd01bd534e3dea2df864';
const REDIRECT_URI = 'https://www.contentful.com/developers/cli-oauth-page/';
const oAuthURL = `https://be.contentful.com/oauth/authorize?response_type=token&client_id=${APP_ID}&redirect_uri=${REDIRECT_URI}&scope=content_management_manage`;

export default class ContentfulApiWrapper extends BaseApiWrapper {
  private client: ClientAPI;

  constructor(config: LastRevConfig) {
    super(config, 'Contentful');
    this.client = createClient({
      accessToken: this.getToken() || 'dummy'
    });
  }

  resetApi() {
    this.client = createClient({
      accessToken: this.getToken() || 'dummy'
    });
  }

  async login(): Promise<string> {
    await open(oAuthURL, {
      wait: false
    });

    const { token } = await prompt([
      {
        type: 'password',
        name: 'token',
        message: 'Paste your token here:',
        validate: (val) => /^[a-zA-Z0-9_-]{43,64}$/i.test(val.trim()) // token is 43 to 64 characters and accepts lower/uppercase characters plus `-` and `_`
      }
    ]);

    return token;
  }

  async getSpaces() {
    await this.ensureLoggedIn();
    try {
      const { items } = await this.client.getSpaces();
      return items;
    } catch (err: any) {
      throw new Error(`Contentful getSpaces error: ${err.message}`);
    }
  }

  async getSpace(spaceId: string) {
    await this.ensureLoggedIn();
    try {
      return await this.client.getSpace(spaceId);
    } catch (err: any) {
      throw new Error(`Contentful getSpaces error: ${err.message}, ${err.code}`);
    }
  }

  async setSiteValues() {
    await this.ensureLoggedIn();
    try {
      const createAppConfig: CreateAppConfig = this.config.getStateValue(VAL_CREATE_APP_CONFIG);
      const space = await this.client.getSpace(createAppConfig.app!.contentfulSpaceId!);
      const env = await space.getEnvironment(createAppConfig.app!.contentfulEnv || 'master');
      const { items } = await env.getEntries({
        content_type: 'site'
      });
      const defaultSite = items ? items[0] : null;
      const siteId = defaultSite ? defaultSite.sys.id : '';
      const siteKey = defaultSite ? defaultSite.fields.siteKey['en-US'] : '';

      this.config.updateStateValue(VAL_CONTENTFUL_DEFAULT_SITE_ID, siteId);
      this.config.updateStateValue(VAL_CONTENTFUL_DEFAULT_SITE_KEY, siteKey);
    } catch (err: any) {
      throw new Error(`Contentful setSiteValues error: ${err.message}`);
    }
  }

  async createApiKeys() {
    await this.ensureLoggedIn();
    try {
      const createAppConfig: CreateAppConfig = this.config.getStateValue(VAL_CREATE_APP_CONFIG);
      const space = await this.client.getSpace(createAppConfig.app!.contentfulSpaceId!);

      let apiKey: ApiKey | undefined;
      const { items: existingKeys } = await space.getApiKeys();
      apiKey = existingKeys.find((key) => key.name === LASTREV_APIKEY_NAME);

      if (!apiKey) {
        const { items: envs } = await space.getEnvironments();
        apiKey = await space.createApiKey({
          name: 'LastRev API Key',
          environments: map(envs, 'sys.id')
        });
      }
      this.config.updateStateValue(VAL_CONTENTFUL_DELIVERY_KEY, apiKey.accessToken);

      const previewKey = await space.getPreviewApiKey(apiKey.preview_api_key.sys.id);
      this.config.updateStateValue(VAL_CONTENTFUL_PREVIEW_KEY, (previewKey as any).accessToken);
    } catch (err: any) {
      throw new Error(`Contentful createApiKeys error: ${err.message}`);
    }
  }

  async createCacheUpdateWebhook() {
    await this.ensureLoggedIn();
    const spinner = ora('Creating cache update webhook').start();
    try {
      const { app }: CreateAppConfig = this.config.getStateValue(VAL_CREATE_APP_CONFIG);
      const netlifyDevSite = this.config.getStateValue(`${VAL_NETLIFY_SITE}-dev`);

      const devDomainUrl = netlifyDevSite ? netlifyDevSite.ssl_url || netlifyDevSite.url : app!.devDomainUrl!;

      const space = await this.client.getSpace(app!.contentfulSpaceId!);

      await space.createWebhookWithId(`${app!.name}-cache-update`, {
        name: 'Last Rev Cache Update Webhook',
        url: `${devDomainUrl}/.netlify/functions/contentful-webhook`,
        topics: ['ContentType.*', 'Entry.*', 'Asset.*'],
        active: true
      });
      spinner.succeed();
    } catch (err: any) {
      spinner.fail();
      throw new Error(`Contentful setupWebhooks error: ${err.message}`);
    }
  }

  async createDevelopWebhook() {
    await this.ensureLoggedIn();
    const spinner = ora('Creating Netlify auto-publish dev webhook').start();
    try {
      const { app }: CreateAppConfig = this.config.getStateValue(VAL_CREATE_APP_CONFIG);
      const buildHook = this.config.getStateValue(`${VAL_NETLIFY_BUILD_HOOK}-dev`);

      const space = await this.client.getSpace(app!.contentfulSpaceId!);

      await space.createWebhookWithId(`${app!.name}-auto-publish-dev`, {
        name: 'Last Rev Auto Publish Develop Webhook',
        url: buildHook,
        topics: ['ContentType.*', 'Entry.*', 'Asset.*'],
        active: true
      });
      spinner.succeed();
    } catch (err: any) {
      spinner.fail();
      throw new Error(`Contentful setupWebhooks error: ${err.message}`);
    }
  }

  async createProdWebhook() {
    await this.ensureLoggedIn();
    const spinner = ora('Creating Netlify auto-publish prod webhook').start();
    try {
      const { app }: CreateAppConfig = this.config.getStateValue(VAL_CREATE_APP_CONFIG);
      const buildHook = this.config.getStateValue(`${VAL_NETLIFY_BUILD_HOOK}-prod`);
      const space = await this.client.getSpace(app!.contentfulSpaceId!);

      await space.createWebhookWithId(`${app!.name}-auto-publish-prod`, {
        name: 'Last Rev Auto Publish Production Webhook',
        url: buildHook,
        topics: [
          'ContentType.publish',
          'ContentType.unpublish',
          'Entry.publish',
          'Entry.unpublish',
          'Asset.publish',
          'Asset.unpublish'
        ],
        active: true
      });
      spinner.succeed();
    } catch (err: any) {
      spinner.fail();
      throw new Error(`Contentful setupWebhooks error: ${err.message}`);
    }
  }

  async importExtensions() {
    await this.ensureLoggedIn();

    try {
      const { app, contentfulImport }: CreateAppConfig = this.config.getStateValue(VAL_CREATE_APP_CONFIG);
      const targetSpaceId = app ? app.contentfulSpaceId! : contentfulImport?.targetSpaceId!;
      const targetEnv = (app ? app.contentfulEnv : contentfulImport?.targetEnv) || 'master';
      const sourceSpaceId = contentfulImport!.sourceSpaceId!;
      const sourceEnv = contentfulImport!.sourceEnv || 'master';
      const sourceUrl = createExtensionsBaseUrl(sourceSpaceId, sourceEnv);
      const targetUrl = createExtensionsBaseUrl(targetSpaceId, targetEnv);
      const authHeader = `Bearer ${this.getToken()}`;

      const { data } = await axios.get(sourceUrl, {
        headers: {
          Authorization: authHeader
        }
      });
      const extensions = data?.items || [];

      await Promise.all(
        extensions.map(async (extension: Extension) => {
          const url = `${targetUrl}/${extension.sys.id}`;
          await axios.put(
            url,
            { extension: extension.extension },
            {
              headers: {
                Authorization: authHeader
              }
            }
          );
        })
      );
    } catch (err: any) {
      throw new Error(`Contentful importExtensions error: ${err.message}`);
    }
  }
}

const createExtensionsBaseUrl = (spaceId: string, env: string) =>
  `https://api.contentful.com/spaces/${spaceId}/environments/${env}/extensions`;
