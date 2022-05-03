const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  root: true,
  extends: [
    'airbnb',
    'plugin:jsx-a11y/recommended',
    'prettier',
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array,
    'plugin:@next/next/recommended',
    'plugin:@last-rev/last-rev/recommended'
  ],
  plugins: ['jsx-a11y', 'prettier', '@last-rev/last-rev', 'react', 'import'],
  env: {
    jest: true
  },
  ignorePatterns: ['out/', 'storybook-static', 'node_modules/'],
  rules: {
    'react/jsx-props-no-spreading': 0,
    'react/jsx-filename-extension': 0,
    'function-paren-newline': 0,
    'global-require': 0,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-underscore-dangle': 0,
    'react/jsx-one-expression-per-line': 0,
    'import/no-cycle': 0,
    'react/jsx-max-props-per-line': [1, { maximum: 4, when: 'always' }],
    'react/jsx-indent-props': [2, 2],
    'array-callback-return': 0,
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'react/jsx-indent': ['error', 2],
    'semi': ['error', 'always'],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto'
      }
    ],
    '@last-rev/last-rev/no-outside-workspaces': isProduction ? 2 : 0
  }
};
