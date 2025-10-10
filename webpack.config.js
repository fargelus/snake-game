const path = require('path');

module.exports = {
  mode: 'development',
  entry: ['babel-polyfill', './src/jsx/app.jsx'],

  devServer: {
    port: 8080,
    hot: true,
    static: {
      directory: path.join(__dirname, 'public'),
      watch: true,
    },
    devMiddleware: {
      writeToDisk: true,
    },
  },

  resolve: {
    extensions: ['.js', '.jsx', '.css']
  },

  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, 'public'), // куда Webpack будет складывать bundle
    publicPath: '/', // путь для Dev Server
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
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          publicPath: '/',
          name: '[name].[ext]',
        },
      },
    ],
  },
};
