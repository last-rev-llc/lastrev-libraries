module.exports = {
  presets: [
    [
      '@babel/env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/react',
    '@babel/preset-typescript'
  ],
  plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-proposal-object-rest-spread']
};
