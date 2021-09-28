import { prompt } from 'inquirer';
import open from 'open';
import { createClient, ClientAPI } from 'contentful-management';
import BaseApiWrapper from './BaseApiWrapper';
import LastRevConfig from '../LastRevConfig';

// TODO: create a contentful oauth app?
const APP_ID = '9f86a1d54f3d6f85c159468f5919d6e5d27716b3ed68fd01bd534e3dea2df864';
const REDIRECT_URI = 'https://www.contentful.com/developers/cli-oauth-page/';
const oAuthURL = `https://be.contentful.com/oauth/authorize?response_type=token&client_id=${APP_ID}&redirect_uri=${REDIRECT_URI}&scope=content_management_manage`;

export default class ContentfulApiWrapper extends BaseApiWrapper {
  client: ClientAPI;

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
}
