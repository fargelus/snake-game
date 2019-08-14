const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  target: 'node',

  entry: ['babel-polyfill', './src/jsx/app.jsx'],

  resolve: {
    extensions: ['.js', '.jsx', '.css']
  },

  output: {
    filename: 'app.bundle.js',
    publicPath: path.resolve(__dirname, 'public'),
    path: path.resolve(__dirname, 'public'),
  },

  optimization: {
    minimize: true,
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  plugins: [
    new CopyWebpackPlugin([{
      from: './index.html',
      to: '.',
    }])
  ],
};
