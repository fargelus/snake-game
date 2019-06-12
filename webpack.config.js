const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  target: 'node',

  entry: './src/jsx/app.jsx',

  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 3000,
    watchContentBase: true,
    writeToDisk: true,
  },

  resolve: {
    extensions: ['.js', '.jsx']
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
      }
    ],
  },

  plugins: [
    new HTMLWebpackPlugin({
      title: 'Snake the game',
      template: 'index.ejs'
    }),
  ],
};
