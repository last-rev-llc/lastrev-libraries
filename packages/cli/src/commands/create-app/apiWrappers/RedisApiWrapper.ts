import BaseApiWrapper from './BaseApiWrapper';
import { prompt } from 'inquirer';
import Redis from 'ioredis';
import LastRevConfig, {
  VAL_CREATE_APP_CONFIG,
  VAL_REDIS_HOST,
  VAL_REDIS_PASSWORD,
  VAL_REDIS_PORT,
  VAL_REDIS_USERNAME
} from '../LastRevConfig';
import { CreateAppConfig } from '../types';
import Messager from '../Messager';

const messager = Messager.getInstance();

export default class RedisApiWrapper extends BaseApiWrapper {
  private redis: Redis;

  constructor(config: LastRevConfig) {
    super(config, 'Redis');
    const connectionUrl = this.getToken();
    if (connectionUrl) {
      this.redis = new Redis(connectionUrl);
    } else {
      // doing this to avoid type checking all over the place
      this.redis = undefined as unknown as Redis;
    }
  }

  async login(): Promise<string> {
    const { host, port, password } = await prompt([
      {
        type: 'input',
        name: 'host',
        message:
          'Paste the host of your redis admin account (if you are using an upstash instance, this can be found in the upstash console).',
        validate: (val) => !!val.trim() || 'Please enter a host.'
      },
      {
        type: 'input',
        name: 'port',
        message:
          'Paste the port of your redis admin account (if you are using an upstash instance, this can be found in the upstash console).',
        validate: (val) => /^[0-9]{4,5}$/.test(val.trim()) || 'Please enter a valid port consisting of 4-5 numbers.'
      },
      {
        type: 'password',
        name: 'password',
        message:
          'Paste the password of your redis admin account (if you are using an upstash instance, this can be found in the upstash console).',
        validate: (val) => /^[a-zA-Z0-9]+$/.test(val.trim()) || 'Please enter a valid password.'
      }
    ]);

    const connectionUrl = `rediss://:${password}@${host}:${port}`;

    return connectionUrl;
  }

  resetApi(): void {
    this.redis = undefined as unknown as Redis;
    // doing this to avoid type checking all over the place
    this.redis = this.getToken() ? new Redis(this.getToken()!) : (undefined as unknown as Redis);
  }

  async generateAclPassword(): Promise<void> {
    await this.ensureLoggedIn();
    try {
      const pass = await this.redis.acl('GENPASS', '64');
      this.config.updateStateValue(VAL_REDIS_PASSWORD, pass);
    } catch (err: any) {
      throw Error(`Error generating ACL password: ${err.message}`);
    }
  }

  async createAclUser(): Promise<void> {
    await this.ensureLoggedIn();
    try {
      const { app }: CreateAppConfig = this.config.getStateValue(VAL_CREATE_APP_CONFIG);

      const contentfulSpaceId = app?.contentfulSpaceId!;

      const username = `${app?.name}-redis-user`;
      this.config.updateStateValue(VAL_REDIS_USERNAME, username);

      const pass = this.config.getStateValue(VAL_REDIS_PASSWORD);

      const rules = ['on', `~${contentfulSpaceId}:*`, `+@all`, `-@dangerous`, `>${pass}`];

      await this.redis.acl('SETUSER', username, ...rules);
      messager.log(`Created Redis ACL user: ${username}`);
    } catch (err: any) {
      throw Error(`Error creating Redis ACL user: ${err.message}`);
    }
  }

  async saveHost(): Promise<void> {
    await this.ensureLoggedIn();
    const connectionUrlString = this.getToken()!;
    const host = connectionUrlString.split('@')[1].split(':')[0];
    this.config.updateStateValue(VAL_REDIS_HOST, host);
  }

  async savePort(): Promise<void> {
    await this.ensureLoggedIn();
    const connectionUrlString = this.getToken()!;
    const port = connectionUrlString.split('@')[1].split(':')[1];
    this.config.updateStateValue(VAL_REDIS_PORT, port);
  }
}
