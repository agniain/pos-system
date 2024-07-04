// webpack.config.js
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js', 
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', 
  },
  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      buffer: require.resolve('buffer/'),
      stream: require.resolve('stream-browserify'),
      assert: require.resolve('assert/'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      os: require.resolve('os-browserify/browser'),
      url: require.resolve('url/'),
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
