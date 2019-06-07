const path = require('path');

module.exports = {
  mode: 'development',

  entry: {

  },

  devServer: {
    contentBase: path.join(__dirname, 'build'),
    port: 3000,
    watchContentBase: true,
    writeToDisk: true,
  },

  output: {
    filename: '[name].bundle.js',
    publicPath: makeAbsolutePath('build'),
    path: makeAbsolutePath('build'),
  },

  optimization: {
    minimize: true,
  },

  devtool: 'source-map',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: makeAbsolutePath('node_modules'),
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
