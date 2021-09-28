import chalk from 'chalk';
import LastRevConfig from './LastRevConfig';

export default class Messager {
  messages: string[] = [];

  private constructor() {}

  static instance: Messager | null = null;

  log(message: string) {
    console.log(message);
  }

  error(message: string) {
    console.error(chalk.red(message));
  }

  warn(message: string) {
    console.warn(chalk.yellow(message));
  }

  delayed = (message: string) => {
    this.messages.push(message);
  };

  flush() {
    this.messages.forEach((m) => console.log(m));
    this.messages = [];
  }

  store(config: LastRevConfig) {
    config.setStateMessages(this.messages);
  }

  load(config: LastRevConfig) {
    this.messages.push(...config.getStateMessages());
    config.setStateMessages([]);
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Messager();
    }
    return this.instance;
  }
}
