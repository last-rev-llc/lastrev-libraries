import { Linter } from 'eslint';
import parser from 'eslint-plugin-json-es';
import noOutsideWorkspacesRule from './noOutsideWorkspaces';

const linter = new Linter();

// ESLint 9+ flat config
const config = [
  {
    files: ['**/*.json'],
    languageOptions: {
      parser: parser,
      ecmaVersion: 2020,
      sourceType: 'module'
    },
    plugins: {
      '@last-rev/last-rev': {
        rules: {
          'no-outside-workspaces': noOutsideWorkspacesRule
        }
      }
    },
    rules: {
      '@last-rev/last-rev/no-outside-workspaces': ['error']
    }
  }
] as any; // Type assertion for compatibility

const verify = (packageJson: string) => {
  return linter.verify(packageJson, config, { filename: 'test.json' });
};

const verifyAndFix = (packageJson: string) => {
  return linter.verifyAndFix(packageJson, config, { filename: 'test.json' });
};

describe('noOutsideWorkspaces', () => {
  it('hsa no errors using standard workspaces', () => {
    const packageJson = `{
  "workspaces": [
    "packages/*"
  ]
}`;
    const messages = verify(packageJson);
    expect(messages.length).toBe(0);
  });

  it('has no errors using object workspaces', () => {
    const packageJson = `{
  "workspaces": {
    "packages": [
      "packages/*"
    ]
  }
}`;
    const messages = verify(packageJson);
    expect(messages.length).toBe(0);
  });

  it('has no errors if workspaces field is not at the root level, standard workspaces', () => {
    const packageJson = `{
  "someOtherProp": {
    "workspaces": [
      "packages/*",
      "../some/file"
    ]
  }
}`;
    const messages = verify(packageJson);
    expect(messages.length).toBe(0);
  });

  it('has no errors if workspaces field is not at the root level, object workspaces', () => {
    const packageJson = `{
  "someOtherProp": {
    "workspaces": {
      "packages": [
        "packages/*",
        "../some/file"
      ]
    }
  }
}`;
    const messages = verify(packageJson);
    expect(messages.length).toBe(0);
  });

  it('has errors when outside workspace is included in standard workspaces', () => {
    const packageJson = `{
  "workspaces": [
    "packages/*",
    "../outside/package/*"
  ]
}`;
    const messages = verify(packageJson);
    expect(messages.length).toBe(1);
    expect(messages[0]).toMatchObject({
      ruleId: '@last-rev/last-rev/no-outside-workspaces',
      severity: 2,
      message: 'Entry "../outside/package/*" in workspaces refers to a file outside the monorepo.',
      line: 4,
      column: 5,
      nodeType: 'Literal',
      endLine: 4,
      endColumn: 27
    });
  });

  it('has errors when outside workspace is included in object workspaces', () => {
    const packageJson = `{
    "workspaces": {
    "packages": [
      "packages/*",
      "../outside/package/*"
    ]
  }
}`;
    const messages = verify(packageJson);
    expect(messages.length).toBe(1);
    expect(messages[0]).toMatchObject({
      ruleId: '@last-rev/last-rev/no-outside-workspaces',
      severity: 2,
      message: 'Entry "../outside/package/*" in workspaces.packages refers to a file outside the monorepo.',
      line: 5,
      column: 7,
      nodeType: 'Literal',
      endLine: 5,
      endColumn: 29
    });
  });

  it('errors get fixed when using standard workspaces', () => {
    const packageJson = `{
  "workspaces": [
    "../first-in-array",
    "packages/*",
    "../middle-in-array",
    "../last-in-array"
  ]
}`;
    const out = verifyAndFix(packageJson);

    expect(out.output).toBe(`{
  "workspaces": [
    "packages/*"
  ]
}`);
  });

  it('errors get fixed when using object workspaces', () => {
    const packageJson = `{
  "workspaces": {
    "packages": [
      "../first-in-array",
      "packages/*",
      "../middle-in-array",
      "../last-in-array"
    ]
  }
}`;
    const out = verifyAndFix(packageJson);

    expect(out.output).toBe(`{
  "workspaces": {
    "packages": [
      "packages/*"
    ]
  }
}`);
  });
});
