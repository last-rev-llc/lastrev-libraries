import { prompt } from 'inquirer';
import LastRevConfig from '../LastRevConfig';

export default abstract class BaseApiWrapper {
  config: LastRevConfig;
  tokenKey: string;
  serviceName: string;
  shouldCheckForLogin: boolean = true;

  constructor(config: LastRevConfig, serviceName: string) {
    this.tokenKey = `cli.providers.${serviceName.toLowerCase()}.token`;
    this.serviceName = serviceName;
    this.config = config;
  }

  public getToken(): string | undefined {
    return this.config.get(this.tokenKey);
  }

  private setToken(token: string | undefined): void {
    this.config.set(this.tokenKey, token || null);
    this.resetApi();
  }

  abstract login(): Promise<string>;

  abstract resetApi(): void;

  public async ensureLoggedIn(): Promise<void> {
    if (this.getToken() && this.shouldCheckForLogin) {
      this.shouldCheckForLogin = false;
      const { proceed } = await prompt([
        {
          name: 'proceed',
          message: `You are already logged in to ${this.serviceName}. Would you like to proceed with this token? If not, you will be logged out and go through the login process again`,
          type: 'confirm'
        }
      ]);
      if (!proceed) {
        await this.logout();
      }
    }

    if (!this.getToken()) {
      this.shouldCheckForLogin = false;
      const token = await this.login();
      this.setToken(token);
    }
  }

  private async logout() {
    this.setToken(undefined);
    this.resetApi();
  }
}
