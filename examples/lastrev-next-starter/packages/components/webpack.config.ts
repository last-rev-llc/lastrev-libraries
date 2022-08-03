import path from 'path';
import webpack from 'webpack';

const toPath = (_path) => path.join(process.cwd(), _path);

export default {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(js|jsx|mjs|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['istanbul']
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
    fallback: {
      path: require.resolve('path-browserify')
    },
    alias: {
      'react': toPath('../../node_modules/react'),
      '@emotion/core': toPath('../../node_modules/@emotion/react'),
      'emotion-theming': toPath('../../node_modules/@emotion/react')
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser'
    }),
    new webpack.DefinePlugin({
      'process.env.__NEXT_IMAGE_OPTS': JSON.stringify({
        experimentalFuture: true,
        experimentalUnoptimized: true,
        deviceSizes: [320, 420, 768, 1024, 1200],
        imageSizes: [20, 40, 60, 70, 200, 400, 440],
        domains: ['anydomain.com'],
        path: '/_next/image/',
        loader: 'default'
      })
    })
  ]
};
