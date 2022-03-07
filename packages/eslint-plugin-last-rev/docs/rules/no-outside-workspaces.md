# Ensures that your monorepo has no outside workspaces (no-outside-workspaces)

Please describe the origin of the rule here.

## Rule Details

This rule aims to prevent outside workspaces, which may be used for local development when testing changes to an external library, to be committed to the monorepo.

Examples of **incorrect** code for this rule:

`package.json`

```json
{
  "name": "my-package",
  "version": "1.0.0",
  "workspaces": ["packages/*", "../lastrev-libraries/packages/*"]
}
```

_or_

```json
{
  "name": "my-package",
  "version": "1.0.0",
  "workspaces": {
    "packages": ["packages/*", "../lastrev-libraries/packages/*"]
  }
}
```

Examples of **correct** code for this rule:

`package.json`

```json
{
  "name": "my-package",
  "version": "1.0.0",
  "workspaces": ["packages/*"]
}
```

_or_

```json
{
  "name": "my-package",
  "version": "1.0.0",
  "workspaces": {
    "packages": ["packages/*"]
  }
}
```

## When Not To Use It

This rule should generally only be applied in a production environment or post-commit hook, since you will want to add external libraries for local development at times.

This can be achieved in your .eslintrc.js file:

```js
const isProduction = process.env.NODE_ENV === 'production';
module.exports = {
  extends: ['plugin:@last-rev/last-rev/recommended'],
  plugins: ['@last-rev/last-rev'],
  rules: {
    '@last-rev/last-rev/no-outside-workspaces': isProduction ? 2 : 0
  }
};
```

And then you can use something like a husky hook to set the correct env when pushing to git:

`package.json`:

```json
{
  "husky": {
    "hooks": {
      "pre-push": "cross-env NODE_ENV=production yarn lint"
    }
  }
}
```
