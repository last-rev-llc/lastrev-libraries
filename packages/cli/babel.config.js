module.exports = {
  presets: [['@babel/env', { modules: false }], '@babel/preset-typescript'],
  plugins: ['@babel/plugin-transform-runtime'],
  exclude: /node_modules/
  // env: {
  //   test: {
  //     plugins: ['istanbul']
  //   }
  // }
};
