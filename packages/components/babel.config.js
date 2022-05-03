module.exports = {
  presets: [['@babel/env', { modules: false }], '@babel/preset-typescript', '@babel/preset-react'],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-nullish-coalescing-operator'
  ],
  exclude: /node_modules/,
  env: {
    test: {
      plugins: ['istanbul']
    }
  }
};
