import { Linter } from 'eslint';
import noOutsideWorkspacesRule from './rules/noOutsideWorkspaces';

const rules = {
  'no-outside-workspaces': noOutsideWorkspacesRule
};

const configs: Record<string, Linter.BaseConfig> = {
  recommended: {
    plugins: ['@last-rev/last-rev'],
    overrides: [
      {
        files: ['package.json'],
        parser: 'eslint-plugin-json-es',
        rules: {
          '@last-rev/last-rev/no-outside-workspaces': ['error']
        }
      }
    ]
  }
};

export default {
  rules,
  configs
};
