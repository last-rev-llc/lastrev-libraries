import { Octokit } from '@octokit/rest';
import express from 'express';
import open from 'open';
import axios from 'axios';
import querystring from 'querystring';
import { isString } from 'lodash';
import ora from 'ora';
import BaseApiWrapper from './BaseApiWrapper';
import LastRevConfig from '../LastRevConfig';

// TODO: move these to .env
const clientId = '9e9744be4720ed8d9958';
const clientSecret = 'e1d4e09925a7a3ad0208849816eb4d7188ebfb51';

export default class GithubApiWrapper extends BaseApiWrapper {
  octokit: Octokit;

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
}
