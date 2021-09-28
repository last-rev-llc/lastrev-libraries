import open from 'open';
import NetlifyApi from 'netlify';
import BaseApiWrapper from './BaseApiWrapper';
import LastRevConfig from '../LastRevConfig';

// TODO: create a netlify oauth app?
const NETLIFY_CLIENT_ID = 'd6f37de6614df7ae58664cfca524744d73807a377f5ee71f1a254f78412e3750';

export default class NetlifyApiWrapper extends BaseApiWrapper {
  api: NetlifyApi;

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
    console.log(`Logging into your Netlify account...`);

    // Create ticket for auth
    const ticket = await this.api.createTicket({
      clientId: NETLIFY_CLIENT_ID
    });

    // Open browser for authentication
    const authLink = `https://app.netlify.com/authorize?response_type=ticket&ticket=${ticket.id}`;

    console.log(`Opening ${authLink}`);
    await open(authLink);

    return await this.pollForToken(ticket);

    // TODO: may need this: await this.api.getCurrentUser();
  }
}
