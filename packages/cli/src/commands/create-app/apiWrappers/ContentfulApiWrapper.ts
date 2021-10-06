import { prompt } from 'inquirer';
import open from 'open';
// import { Space } from 'contentful';
import { createClient, ClientAPI } from 'contentful-management';
import BaseApiWrapper from './BaseApiWrapper';
import LastRevConfig, {
  VAL_CONTENTFUL_DELIVERY_KEY,
  VAL_CONTENTFUL_PREVIEW_KEY,
  VAL_CONTENTFUL_SPACE_ID
} from '../LastRevConfig';
import { map } from 'lodash';
import { ApiKey } from 'contentful-management/dist/typings/export-types';

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

  async createApiKeys() {
    await this.ensureLoggedIn();
    try {
      const space = await this.client.getSpace(this.config.getStateValue(VAL_CONTENTFUL_SPACE_ID));

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
}
